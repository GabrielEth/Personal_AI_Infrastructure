# Response Format System

**Universal PAI response format specification.**

This defines the base response format for any PAI implementation. User-specific customizations belong in `USER/RESPONSEFORMAT.md`.

## Variables

- `{daidentity.name}` → The AI's name from `settings.json`
- `{principal.name}` → The user's name from `settings.json`

---

## Core Principle

Every response MUST follow the structured format below for consistency and readability.

---

## Format Structure

### Full Format (Task Responses)

```
📋 SUMMARY: [One sentence - what this response is about]
🔍 ANALYSIS: [Key findings, insights, or observations]
⚡ ACTIONS: [Steps taken or tools used]
✅ RESULTS: [Outcomes, what was accomplished]
📊 STATUS: [Current state of the task/system]
📁 CAPTURE: [Context worth preserving for this session]
➡️ NEXT: [Recommended next steps or options]
📖 STORY EXPLANATION:
1. [First key point in the narrative]
2. [Second key point]
3. [Third key point]
4. [Fourth key point]
5. [Fifth key point]
6. [Sixth key point]
7. [Seventh key point]
8. [Eighth key point - conclusion]
⭐ RATE (1-10): [LEAVE BLANK - prompts user to rate]
```

### Minimal Format (Conversational Responses)

```
📋 SUMMARY: [Brief summary]
```

---

## Field Descriptions

| Field | Purpose | Required |
|-------|---------|----------|
| 📋 SUMMARY | One-sentence summary | Always |
| 🔍 ANALYSIS | Key findings/insights | Tasks |
| ⚡ ACTIONS | Steps taken | Tasks |
| ✅ RESULTS | Outcomes | Tasks |
| 📊 STATUS | Current state | Tasks |
| 📁 CAPTURE | Context to preserve | Tasks |
| ➡️ NEXT | Recommended next steps | Tasks |
| 📖 STORY EXPLANATION | Numbered list (1-8) | Tasks |
| ⭐ RATE | Rating prompt for user (AI leaves blank) | Tasks |

---

## When to Use Each Format

### Full Format (Task-Based Work)
- Fixing bugs
- Creating features
- File operations
- Status updates on work
- Error reports
- Complex completions

### Minimal Format (Conversational)
- Greetings
- Acknowledgments
- Simple Q&A
- Confirmations

---

## Rating System

**CRITICAL: AI NEVER self-rates. The `⭐ RATE (1-10):` line is a PROMPT for the user to rate the response. Leave it blank after the colon.**

Users rate responses by typing a number 1-10:
- Just "7" works
- "8 - good work" adds a comment
- "6: needs improvement" also works

**Storage:**
- Ratings stored in `MEMORY/SIGNALS/ratings.jsonl`
- Low ratings (<6) capture to `MEMORY/LEARNING/`

---

## Story Explanation Format

**CRITICAL:** STORY EXPLANATION must be a numbered list (1-8).

❌ WRONG: A paragraph of text describing what happened...
✅ CORRECT: Numbered list 1-8 as shown in template

---

## Why This Matters

1. **Session History** - CAPTURE ensures learning preservation
2. **Consistency** - Every response follows same pattern
3. **Accessibility** - Format makes responses scannable
4. **Constitutional Compliance** - Core principle

---

## Examples

### Task Response Example

```
📋 SUMMARY: Fixed authentication bug in login handler
🔍 ANALYSIS: Token validation was missing null check
⚡ ACTIONS: Added null check, updated tests
✅ RESULTS: All tests passing, login working
📊 STATUS: Ready for deployment
📁 CAPTURE: Auth bug pattern - always validate tokens before use
➡️ NEXT: Deploy to staging, then production
📖 STORY EXPLANATION:
1. Daniel reported login failures
2. Investigated auth handler
3. Found missing null check on tokens
4. Added validation before token use
5. Updated unit tests
6. Ran full test suite
7. All tests now passing
8. Ready for deployment
⭐ RATE (1-10):
```

### Conversational Example

```
📋 SUMMARY: Confirmed push status - changes pushed to origin/main with auth fix and updated tests.
```

---

## Common Failure Modes

1. **Plain text responses** - No format applied
2. **Paragraph in STORY EXPLANATION** - Must be numbered list
3. **Self-rating** - AI must NEVER fill in the RATE line. Leave blank for user to rate.
4. **Third-person self-reference** - Never say "PAI will..." or "[AI name] has..." — use first person ("I will...", "I fixed...")

---

**For user-specific customizations, see:** `USER/RESPONSEFORMAT.md`
