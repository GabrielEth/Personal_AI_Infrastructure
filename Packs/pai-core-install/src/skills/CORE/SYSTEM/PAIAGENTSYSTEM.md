# PAI Agent System

**Authoritative reference for agent routing in PAI.**

---

## Task Tool Subagent Types

PAI uses Claude Code's built-in Task tool with subagent_types for delegating work to specialized agents. Each subagent_type brings a different perspective and capability.

| Subagent Type | Purpose | When Used |
|---------------|---------|-----------|
| `Architect` | System design | Development skill workflows |
| `Designer` | UX/UI design | Development skill workflows |
| `Engineer` | Code implementation | Development skill workflows |
| `Intern` | General-purpose parallel work | Parallel grunt work, research |
| `Explore` | Codebase exploration | Finding files, understanding structure |
| `Plan` | Implementation planning | Plan mode |
| `QATester` | Quality assurance | Browser testing workflows |
| `Pentester` | Security testing | WebAssessment workflows |
| `ClaudeResearcher` | Claude-based research | Research skill workflows |
| `GeminiResearcher` | Gemini-based research | Research skill workflows |
| `GrokResearcher` | Grok-based research | Research skill workflows |

---

## Routing Rules

| User Says | Action | Implementation |
|-----------|--------|----------------|
| "agents", "launch agents", "parallel agents" | Generic Interns | `Task({ subagent_type: "Intern" })` |
| "interns", "use interns" | Intern agents | `Task({ subagent_type: "Intern" })` |
| (Internal workflow calls) | Task subagent_types | `Task({ subagent_type: "Engineer" })` etc. |

---

## Intern Agents (Parallel Work)

The Intern agent is the workhorse for parallel execution. Use Intern agents when you need to:

- Research multiple topics simultaneously
- Update multiple files at once
- Test multiple approaches in parallel
- Process multiple items from a list

**How to launch parallel interns:**

```typescript
// Send as SINGLE message with MULTIPLE Task calls
Task({ prompt: "Research topic A...", subagent_type: "Intern", model: "haiku" })
Task({ prompt: "Research topic B...", subagent_type: "Intern", model: "haiku" })
Task({ prompt: "Research topic C...", subagent_type: "Intern", model: "haiku" })
// All run in parallel
```

**CRITICAL: Interns vs Engineers:**
- **INTERNS:** Research, analysis, investigation, file reading, testing, coordinating
- **ENGINEERS:** Writing ANY code, building features, implementing changes
- If task involves writing code → Use Engineer subagent_type

---

## Model Selection

Always specify the appropriate model for agent work:

| Task Type | Model | Speed |
|-----------|-------|-------|
| Simple checks, grunt work | `haiku` | 10-20x faster |
| Standard analysis, implementation | `sonnet` | Balanced |
| Deep reasoning, architecture | `opus` | Maximum intelligence |

```typescript
// Haiku for simple parallel work
Task({ prompt: "Check file exists", subagent_type: "Intern", model: "haiku" })

// Sonnet for standard coding
Task({ prompt: "Implement login form", subagent_type: "Engineer", model: "sonnet" })

// Opus for architecture decisions
Task({ prompt: "Design caching strategy", subagent_type: "Architect", model: "opus" })
```

---

## Spotcheck Pattern

**Always launch a spotcheck agent after parallel work:**

```typescript
Task({
  prompt: "Verify consistency across all agent outputs: [results]",
  subagent_type: "Intern",
  model: "haiku"
})
```

---

## References

- **Delegation Workflow:** `skills/CORE/Workflows/Delegation.md` — Delegation patterns
- **Background Delegation:** `skills/CORE/Workflows/BackgroundDelegation.md` — Background agent patterns

---

*Last updated: 2026-02-08*
