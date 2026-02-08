# CreateCustomAgent Workflow

**Creates custom agents with unique personalities using AgentFactory.**

## When to Use

{principal.name} says:
- "Create custom agents to do X"
- "Spin up custom agents for Y"
- "I need specialized agents with Z expertise"
- "Generate N custom agents to analyze..."

**KEY TRIGGER: The word "custom" is critical - this distinguishes from generic Intern agents.**

## The Workflow

### Step 1: Determine Agent Count & Requirements

Extract from {principal.name}'s request:
- How many agents? (Default: 1 if not specified)
- What's the task?
- Are specific traits mentioned? (security, legal, skeptical, thorough, etc.)

### Step 2: For EACH Agent, Run AgentFactory with DIFFERENT Traits

**CRITICAL: Each agent MUST have different trait combinations to get unique personalities.**

```bash
# Example for 3 custom research agents:

# Agent 1 - Enthusiastic Explorer
bun run ~/.claude/skills/Agents/Tools/AgentFactory.ts \
  --traits "research,enthusiastic,exploratory" \
  --task "Research quantum computing applications" \
  --output json

# Agent 2 - Skeptical Analyst
bun run ~/.claude/skills/Agents/Tools/AgentFactory.ts \
  --traits "research,skeptical,systematic" \
  --task "Research quantum computing applications" \
  --output json

# Agent 3 - Thorough Synthesizer
bun run ~/.claude/skills/Agents/Tools/AgentFactory.ts \
  --traits "research,analytical,synthesizing" \
  --task "Research quantum computing applications" \
  --output json
```

### Step 3: Extract Prompt from Each

AgentFactory returns JSON with:
```json
{
  "name": "Research Enthusiastic Explorer",
  "traits": ["research", "enthusiastic", "exploratory"],
  "prompt": "# Dynamic Agent: Research Enthusiastic Explorer\n\nYou are a specialized agent..."
}
```

### Step 4: Launch Agents with Task Tool

**Use a SINGLE message with MULTIPLE Task calls for parallel execution:**

```typescript
// Send all in ONE message:
Task({
  description: "Research agent 1 - enthusiastic",
  prompt: <agent1_full_prompt>,
  subagent_type: "Intern",
  model: "sonnet"  // or "haiku" for speed
})
Task({
  description: "Research agent 2 - skeptical",
  prompt: <agent2_full_prompt>,
  subagent_type: "Intern",
  model: "sonnet"
})
Task({
  description: "Research agent 3 - analytical",
  prompt: <agent3_full_prompt>,
  subagent_type: "Intern",
  model: "sonnet"
})
```

### Step 5: Spotcheck (Optional but Recommended)

After all agents complete, launch one more to verify consistency:

```typescript
Task({
  description: "Spotcheck custom agent results",
  prompt: "Review these results for consistency and completeness: [results]",
  subagent_type: "Intern",
  model: "haiku"
})
```

## Trait Variation Strategies

When creating multiple custom agents, vary traits to ensure different perspectives:

**For Research Tasks:**
- Agent 1: research + enthusiastic + exploratory (energetic)
- Agent 2: research + skeptical + thorough (intellectual)
- Agent 3: research + analytical + systematic (professional)
- Agent 4: research + creative + bold (charismatic)
- Agent 5: research + empathetic + synthesizing (gentle)

**For Security Analysis:**
- Agent 1: security + adversarial + bold (offensive)
- Agent 2: security + skeptical + meticulous (analytical)
- Agent 3: security + cautious + systematic (defensive)

**For Business Strategy:**
- Agent 1: business + bold + rapid (assertive)
- Agent 2: business + analytical + comparative (balanced)
- Agent 3: business + pragmatic + consultative (advisory)

## Model Selection

| Task Complexity | Model | Reason |
|----------------|-------|--------|
| Simple checks, quick research | `haiku` | 10-20x faster, sufficient for grunt work |
| Standard analysis, investigation | `sonnet` | Balanced speed + capability |
| Deep reasoning, strategic planning | `opus` | Maximum intelligence |

**Parallel custom agents benefit from `sonnet` or `haiku` for speed.**

## Example Execution

**{principal.name}:** "Create 5 custom science agents to analyze this climate data"

**{daidentity.name}'s Internal Execution:**
```bash
# Agent 1 - Climate Science Enthusiast
bun run AgentFactory.ts --traits "research,enthusiastic,thorough" --task "Analyze climate data patterns" --output json
# Returns: enthusiastic research agent

# Agent 2 - Skeptical Data Analyst
bun run AgentFactory.ts --traits "data,skeptical,systematic" --task "Analyze climate data patterns" --output json
# Returns: skeptical data agent

# Agent 3 - Creative Pattern Finder
bun run AgentFactory.ts --traits "data,creative,exploratory" --task "Analyze climate data patterns" --output json
# Returns: creative data agent

# Agent 4 - Meticulous Validator
bun run AgentFactory.ts --traits "research,meticulous,comparative" --task "Analyze climate data patterns" --output json
# Returns: meticulous research agent

# Agent 5 - Synthesizing Strategist
bun run AgentFactory.ts --traits "research,analytical,synthesizing" --task "Analyze climate data patterns" --output json
# Returns: analytical research agent

# Launch all 5 in parallel (single message, 5 Task calls)
# Each agent has unique personality
```

**Result:** 5 distinct agents with different analytical approaches analyzing the data from different perspectives.

## Common Mistakes to Avoid

**❌ WRONG: Using same traits for all agents**
```bash
# All agents get same personality!
bun run AgentFactory.ts --traits "research,analytical" # Agent 1
bun run AgentFactory.ts --traits "research,analytical" # Agent 2 (same!)
bun run AgentFactory.ts --traits "research,analytical" # Agent 3 (same!)
```

**✅ RIGHT: Varying traits for unique personalities**
```bash
# Each agent gets different personality
bun run AgentFactory.ts --traits "research,enthusiastic,exploratory"
bun run AgentFactory.ts --traits "research,skeptical,systematic"
bun run AgentFactory.ts --traits "research,creative,synthesizing"
```

**❌ WRONG: Launching agents sequentially**
```typescript
// Slow - waits for each to finish
await Task({ ... }); // Agent 1
await Task({ ... }); // Agent 2 (waits for 1)
await Task({ ... }); // Agent 3 (waits for 2)
```

**✅ RIGHT: Launching agents in parallel**
```typescript
// Fast - all run simultaneously (single message, multiple calls)
Task({ ... })  // Agent 1
Task({ ... })  // Agent 2
Task({ ... })  // Agent 3
```

## Trait Composition Logic

AgentFactory automatically composes agent personalities from trait combinations. The more varied the traits across agents, the more diverse their analytical perspectives will be.

## Related Workflows

- **ListTraits** - Show available traits for composition
- **SpawnParallelAgents** - Launch generic Intern agents (not custom)

## References

- Trait definitions: `~/.claude/skills/Agents/Data/Traits.yaml`
- Agent template: `~/.claude/skills/Agents/Templates/DynamicAgent.hbs`
- AgentFactory tool: `~/.claude/skills/Agents/Tools/AgentFactory.ts`
- Personalities: `~/.claude/skills/Agents/AgentPersonalities.md`
