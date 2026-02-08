# Delegation Workflow

Comprehensive guide to delegating tasks to agents using Task tool subagent_types.

## Agent Type Selection

**Determine the right subagent_type for the task:**

| User Says | Action | Tool |
|-------------|--------|------|
| "spin up agents", "launch agents", "bunch of agents" | Use **Intern** agents for parallel work | `Task(subagent_type="Intern")` |
| "interns", "use interns" | Use **Intern** agents | `Task(subagent_type="Intern")` |
| "build this", "implement", "code" | Use **Engineer** agents | `Task(subagent_type="Engineer")` |
| "design the architecture" | Use **Architect** agents | `Task(subagent_type="Architect")` |
| "research this" | Use **Researcher** agents | `Task(subagent_type="ClaudeResearcher")` |

---

## How the User Interacts

**Users just talk naturally.** Examples:

- "Research these 5 companies for me" → I spawn 5 parallel Intern agents
- "Build the login page" → I use an Engineer agent
- "Design the system architecture" → I use an Architect agent
- "Get someone to investigate this" → I use a Researcher agent

**Users never touch CLI tools.** The system routes to the right subagent_type based on intent.

## Triggers

- "delegate", "spawn agents", "launch agents" → Interns
- "use an intern", "use researcher" → Appropriate subagent_type
- "in parallel", "parallelize" → Multiple Intern agents
- "build", "implement", "code" → Engineer
- "design", "architecture" → Architect

## Available Subagent Types

| Subagent Type | Purpose | Best For |
|---------------|---------|----------|
| `Intern` | General-purpose parallel work | Grunt work, research, file operations |
| `Engineer` | Code implementation | Writing code, building features |
| `Architect` | System design | Architecture decisions, design review |
| `Designer` | UX/UI design | Interface design, visual review |
| `Explore` | Codebase exploration | Finding files, understanding structure |
| `Pentester` | Security testing | Vulnerability assessment |
| `ClaudeResearcher` | Claude-based research | Web research, analysis |
| `GeminiResearcher` | Gemini-based research | Multi-perspective research |
| `GrokResearcher` | Grok-based research | Contrarian analysis |

## Model Selection

**CRITICAL FOR SPEED**: Always specify the right model for the task.

| Task Type | Model | Why |
|-----------|-------|-----|
| Deep reasoning, architecture | `opus` | Maximum intelligence |
| Standard implementation, analysis | `sonnet` | Balance of speed + capability |
| Simple checks, parallel grunt work | `haiku` | 10-20x faster, sufficient |

```typescript
// WRONG - defaults to Opus, takes minutes
Task({ prompt: "Check if file exists", subagent_type: "Intern" })

// RIGHT - Haiku for simple task
Task({ prompt: "Check if file exists", subagent_type: "Intern", model: "haiku" })
```

**Rule of Thumb:**
- Grunt work or verification → `haiku`
- Implementation or research → `sonnet`
- Strategic/architectural → `opus` or default

## Foreground Delegation

Standard blocking delegation - waits for agent to complete.

### Single Agent

```typescript
Task({
  description: "Research competitor",
  prompt: "Investigate Acme Corp's recent product launches...",
  subagent_type: "ClaudeResearcher",
  model: "sonnet"
})
// Blocks until complete, returns result
```

### Parallel Agents

**ALWAYS use a single message with multiple Task calls for parallel work:**

```typescript
// Send as SINGLE message with multiple tool calls
Task({
  description: "Research company A",
  prompt: "Investigate Company A...",
  subagent_type: "Intern",
  model: "haiku"
})
Task({
  description: "Research company B",
  prompt: "Investigate Company B...",
  subagent_type: "Intern",
  model: "haiku"
})
Task({
  description: "Research company C",
  prompt: "Investigate Company C...",
  subagent_type: "Intern",
  model: "haiku"
})
// All run in parallel, all results returned together
```

### Spotcheck Pattern

**ALWAYS launch a spotcheck intern after parallel work:**

```typescript
// After parallel agents complete
Task({
  description: "Spotcheck parallel results",
  prompt: "Review these results for consistency and completeness: [results]",
  subagent_type: "Intern",
  model: "haiku"
})
```

## Background Delegation

Non-blocking delegation - agents run while you continue working.

See: `Workflows/BackgroundDelegation.md` for full details.

```typescript
Task({
  description: "Background research",
  prompt: "Research X...",
  subagent_type: "ClaudeResearcher",
  model: "haiku",
  run_in_background: true  // Returns immediately
})
// Returns { agent_id: "abc123", status: "running" }

// Check later
TaskOutput({ agentId: "abc123", block: false })

// Retrieve when ready
TaskOutput({ agentId: "abc123", block: true })
```

## Decision Matrix

### Subagent Type Selection

| Situation | Choice | Reason |
|-----------|--------|--------|
| "Research AI news" | ClaudeResearcher | Standard research |
| "Build the login form" | Engineer | Code implementation |
| "Design the API" | Architect | System design |
| "Create 5 parallel researchers" | Intern (x5) | Parallel grunt work |
| "Security test this" | Pentester | Security expertise |
| "Explore the codebase" | Explore | Built for this |

### Foreground vs Background

| Situation | Choice | Reason |
|-----------|--------|--------|
| Need results immediately | Foreground | Blocking is fine |
| Have other work to do | Background | Don't want to wait |
| 3+ parallel tasks | Background | More flexible |
| Single quick task | Foreground | Simpler |
| Newsletter research | Background | Write while researching |

## Full Context Requirements

When delegating, ALWAYS include:

1. **WHY** - Business context, why this matters
2. **WHAT** - Current state, existing implementation
3. **EXACTLY** - Precise actions, file paths, patterns
4. **SUCCESS CRITERIA** - What good output looks like

```typescript
Task({
  description: "Audit auth security",
  prompt: `
    ## Context
    We're preparing for SOC 2 audit. Need to verify our auth implementation.

    ## Current State
    Auth is in src/auth/, uses JWT with refresh tokens.

    ## Task
    1. Review all auth-related code
    2. Check for OWASP Top 10 vulnerabilities
    3. Verify token handling is secure
    4. Check for timing attacks in password comparison

    ## Success Criteria
    - Comprehensive security assessment
    - Specific file:line references for any issues
    - Severity ratings for each finding
    - Remediation recommendations
  `,
  subagent_type: "Pentester",
  model: "sonnet"
})
```

## Related

- Background delegation: `~/.claude/skills/CORE/Workflows/BackgroundDelegation.md`
- Agent system reference: `~/.claude/skills/CORE/SYSTEM/PAIAGENTSYSTEM.md`
