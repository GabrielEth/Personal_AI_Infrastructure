---
name: Research
description: Comprehensive research, analysis, and content extraction system. USE WHEN user says 'do research', 'do extensive research', 'quick research', 'minor research', 'research this', 'find information', 'investigate', 'extract wisdom', 'extract alpha', 'analyze content', 'use fabric', OR requests any web/content research. Supports three research modes (quick/standard/extensive), deep content analysis, intelligent retrieval, and 242+ Fabric patterns.
implements: Science
science_cycle_time: meso
context: fork
---

## Customization

**Before executing, check for user customizations at:**
`~/.claude/skills/CORE/USER/SKILLCUSTOMIZATIONS/Research/`

If this directory exists, load and apply any PREFERENCES.md, configurations, or resources found there. These override default behavior. If the directory does not exist, proceed with skill defaults.

# Research Skill

Comprehensive research, analysis, and content extraction system.

## MANDATORY: URL Verification

**READ:** `UrlVerificationProtocol.md` - Every URL must be verified before delivery.

Research agents hallucinate URLs. A single broken link is a catastrophic failure.

---

## Workflow Routing

Route to the appropriate workflow based on the request.

### Research Modes (Primary Workflows)
- Quick/minor research (1 Claude, 1 query) -> `Workflows/QuickResearch.md`
- Standard research - DEFAULT (2 agents: Claude + Gemini) -> `Workflows/StandardResearch.md`
- Extensive research (3 types x 3 threads = 9 agents) -> `Workflows/ExtensiveResearch.md`

### Deep Content Analysis
- Extract alpha / deep analysis / highest-alpha insights -> `Workflows/ExtractAlpha.md`

### Content Retrieval
- Difficulty accessing content -> `Workflows/Retrieve.md`

### Specific Research Types
- Claude WebSearch only (free, no API keys) -> `Workflows/ClaudeResearch.md`
- Interview preparation (Tyler Cowen style) -> `Workflows/InterviewResearch.md`
- AI trends analysis -> `Workflows/AnalyzeAiTrends.md`

### Fabric Pattern Processing
- Use Fabric patterns (242+ specialized prompts) -> `Workflows/Fabric.md`

### Content Enhancement
- Enhance/improve content -> `Workflows/Enhance.md`
- Extract knowledge from content -> `Workflows/ExtractKnowledge.md`

---

## Quick Reference

**READ:** `QuickReference.md` for detailed examples and mode comparison.

| Trigger | Mode | Speed |
|---------|------|-------|
| "quick research" | 1 Claude agent | ~10-15s |
| "do research" | 2 agents (default) | ~15-30s |
| "extensive research" | 9 agents | ~60-90s |

---

## Integration

### Feeds Into
- **blogging** - Research for blog posts
- **newsletter** - Research for newsletters
- **xpost** - Create posts from research

### Uses
- **be-creative** - deep thinking for extract alpha

---

## File Organization

**Scratch (temporary work artifacts):** `~/.claude/MEMORY/WORK/{current_work}/scratch/`
- Read `~/.claude/MEMORY/STATE/current-work.json` to get the `work_dir` value
- All iterative work artifacts go in the current work item's scratch/ subdirectory
- This ties research artifacts to the work item for learning and context

**History (permanent):** `~/.claude/History/research/YYYY-MM/YYYY-MM-DD_[topic]/`
