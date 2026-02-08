# Retrieve Workflow

Content retrieval system using Claude Code's built-in WebFetch and WebSearch tools.

**USE WHEN** user indicates difficulty accessing content: 'can't get this', 'having trouble', 'site is blocking', 'won't load'.

**DO NOT** use for simple 'read this page' or 'get content from' — use WebFetch directly for those.

## When to Use This Workflow

**DO USE when user indicates difficulty:**
- "I can't get this content"
- "Having trouble retrieving this"
- "Won't load for me"
- "Getting errors when fetching"

**DO NOT use for simple requests:**
- "Read this page" -> Use WebFetch directly
- "Get content from [URL]" -> Use WebFetch directly
- "Fetch this article" -> Use WebFetch directly

## Retrieval Strategy

### Step 1: WebFetch (Primary)

```typescript
WebFetch({
  url: "https://example.com/page",
  prompt: "Extract the main article content"
})
```

**Best for:** HTML pages, public content, articles, documentation.

### Step 2: WebSearch (Fallback)

If WebFetch fails or returns empty content, use WebSearch to find cached or alternative versions:

```typescript
WebSearch({
  query: "site:example.com article title"
})
```

**Best for:** Finding alternative URLs, cached versions, or mirrors.

### Step 3: Report to User

If both WebFetch and WebSearch fail to retrieve the content:
- Report what was tried and what failed
- Suggest the user try accessing manually and pasting the content
- Suggest alternative sources if available

## Error Handling

| Error | Action |
|-------|--------|
| HTTP 403/401 | Try WebSearch for cached version |
| Empty content | Retry with different prompt, try WebSearch |
| Timeout | Retry once, then report to user |
| All methods fail | Report to user with suggestions |

## Quick Reference

- **First try:** WebFetch with targeted prompt
- **If blocked:** WebSearch for cached/alternative versions
- **If all fail:** Report to user with what was tried
