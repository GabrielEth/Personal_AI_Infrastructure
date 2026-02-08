# PAI Tools - CLI Utilities Reference

This file documents single-purpose CLI utilities that have been consolidated from individual skills. These are pure command-line tools that wrap APIs or external commands.

**Philosophy:** Simple utilities don't need separate skills. Document them here, execute them directly.

**Model:** Following the `Tools/fabric/` pattern - 242+ Fabric patterns documented as utilities rather than individual skills.

---

## Inference.ts - Unified AI Inference Tool

**Location:** `~/.claude/skills/CORE/Tools/Inference.ts`

Single inference tool with three run levels for different speed/capability trade-offs.

**Usage:**
```bash
# Fast (Haiku) - quick tasks, simple generation
bun ~/.claude/skills/CORE/Tools/Inference.ts --level fast "System prompt" "User prompt"

# Standard (Sonnet) - balanced reasoning, typical analysis
bun ~/.claude/skills/CORE/Tools/Inference.ts --level standard "System prompt" "User prompt"

# Smart (Opus) - deep reasoning, strategic decisions
bun ~/.claude/skills/CORE/Tools/Inference.ts --level smart "System prompt" "User prompt"

# With JSON output
bun ~/.claude/skills/CORE/Tools/Inference.ts --json --level fast "Return JSON" "Input"

# Custom timeout
bun ~/.claude/skills/CORE/Tools/Inference.ts --level standard --timeout 60000 "Prompt" "Input"
```

**Run Levels:**
| Level | Model | Default Timeout | Use Case |
|-------|-------|-----------------|----------|
| **fast** | Haiku | 15s | Quick tasks, simple generation, basic classification |
| **standard** | Sonnet | 30s | Balanced reasoning, typical analysis, decisions |
| **smart** | Opus | 90s | Deep reasoning, strategic decisions, complex analysis |

**Programmatic Usage:**
```typescript
import { inference } from '../skills/CORE/Tools/Inference';

const result = await inference({
  systemPrompt: 'Analyze this',
  userPrompt: 'Content to analyze',
  level: 'standard',  // 'fast' | 'standard' | 'smart'
  expectJson: true,   // optional: parse JSON response
  timeout: 30000,     // optional: custom timeout
});

if (result.success) {
  console.log(result.output);
  console.log(result.parsed);  // if expectJson: true
}
```

**When to Use:**
- "quick inference" → fast
- "analyze this" → standard
- "deep analysis" → smart
- Hooks use this for sentiment analysis, tab titles, work classification

**Technical Details:**
- Uses Claude CLI with subscription (not API key)
- Disables tools and hooks to prevent recursion
- Returns latency metrics for monitoring

---

## TruffleHog - Scan for Exposed Secrets

**Location:** System-installed CLI tool (`brew install trufflehog`)

Scan directories for 700+ types of credentials and secrets.

**Usage:**
```bash
# Scan directory
trufflehog filesystem /path/to/directory

# Scan git repository
trufflehog git file:///path/to/repo

# Scan with verified findings only
trufflehog filesystem /path/to/directory --only-verified
```

**Installation:**
```bash
brew install trufflehog
```

**When to Use:**
- "check for secrets"
- "scan for sensitive data"
- "find API keys"
- "detect credentials"
- "security audit before commit"

**What It Detects:**
- API keys (OpenAI, AWS, GitHub, Stripe, 700+ services)
- OAuth tokens
- Private keys (SSH, PGP, SSL/TLS)
- Database connection strings
- Passwords in code
- Cloud provider credentials

**Technical Details:**
- Scans files, git history, and commits
- Uses entropy detection + regex patterns
- Verifies findings when possible (calls APIs to check if keys are valid)
- No API key required (standalone CLI tool)

---

## Integration with Other Skills

### Security Workflows
- Secret scanning: `trufflehog` (system tool)

---

## Adding New Tools

When adding a new utility tool to this system:

1. **Add tool file:** Place `.ts` or `.py` file directly in `~/.claude/skills/CORE/Tools/`
   - Use **Title Case** for filenames (e.g., `Inference.ts`, not `inference.ts`)
   - Keep the directory flat - NO subdirectories

2. **Document here:** Add section to this file with:
   - Tool location (e.g., `~/.claude/skills/CORE/Tools/ToolName.ts`)
   - Usage examples
   - When to use triggers
   - Environment variables (if any)

3. **Update CORE/SKILL.md:** Ensure SYSTEM/TOOLS.md is in the documentation index

4. **Test:** Verify tool works from new location

**Don't create a separate skill** if the entire functionality is just a CLI command with parameters.

---

## Deprecated Skills

The following skills have been consolidated into this Tools system:

- **Sensitive** → `trufflehog` system tool (2024-12-22)

See `~/.claude/skills/Deprecated/` for archived skill files.

---

**Last Updated:** 2026-01-12
