#!/usr/bin/env bun
/**
 * StopOrchestrator.hook.ts - Single Entry Point for Stop Hooks
 *
 * PURPOSE:
 * Orchestrates Stop event handlers by reading and parsing the transcript
 * ONCE, then distributing the parsed data to isolated handlers.
 *
 * TRIGGER: Stop (fires after Claude generates a response)
 *
 * HANDLERS (in hooks/handlers/):
 * - capture.ts: Updates current-work.json and WORK/ items
 */

import { parseTranscript } from '../skills/CORE/Tools/TranscriptParser';
import { handleCapture } from './handlers/capture';

interface HookInput {
  session_id: string;
  transcript_path: string;
  hook_event_name: string;
}

async function readStdin(): Promise<HookInput | null> {
  try {
    const decoder = new TextDecoder();
    const reader = Bun.stdin.stream().getReader();
    let input = '';

    const timeoutPromise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 500);
    });

    const readPromise = (async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        input += decoder.decode(value, { stream: true });
      }
    })();

    await Promise.race([readPromise, timeoutPromise]);

    if (input.trim()) {
      return JSON.parse(input) as HookInput;
    }
  } catch (error) {
    console.error('[StopOrchestrator] Error reading stdin:', error);
  }
  return null;
}

async function main() {
  const hookInput = await readStdin();

  if (!hookInput || !hookInput.transcript_path) {
    console.error('[StopOrchestrator] No transcript path provided');
    process.exit(0);
  }

  // SINGLE READ, SINGLE PARSE
  const parsed = parseTranscript(hookInput.transcript_path);

  console.error(`[StopOrchestrator] Parsed transcript: ${parsed.plainCompletion.slice(0, 50)}...`);

  // Run handlers with pre-parsed data (isolated failures)
  const results = await Promise.allSettled([
    handleCapture(parsed, hookInput),
  ]);

  // Log any failures
  results.forEach((result, index) => {
    const handlerNames = ['Capture'];
    if (result.status === 'rejected') {
      console.error(`[StopOrchestrator] ${handlerNames[index]} handler failed:`, result.reason);
    }
  });

  process.exit(0);
}

main().catch((error) => {
  console.error('[StopOrchestrator] Fatal error:', error);
  process.exit(0);
});
