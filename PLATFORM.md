# PAI Platform Compatibility Status

This document tracks platform-specific considerations across PAI.

**Last Updated:** 2026-02-07

---

## Platform Support Matrix

| Platform | Status | Notes |
|----------|--------|-------|
| **macOS** | ✅ Fully Supported | Primary development platform |
| **Linux** | ✅ Fully Supported | Ubuntu/Debian tested, other distros via community |
| **Windows** | ❌ Not Supported | Community contributions welcome |

---

## Platform Detection Patterns

**Recommended pattern (used throughout PAI):**

```bash
# Shell scripts
OS_TYPE="$(uname -s)"
if [ "$OS_TYPE" = "Darwin" ]; then
  # macOS-specific code
elif [ "$OS_TYPE" = "Linux" ]; then
  # Linux-specific code
else
  echo "Unsupported platform: $OS_TYPE"
fi
```

```typescript
// TypeScript/Bun code
if (process.platform === 'darwin') {
  // macOS-specific code
} else if (process.platform === 'linux') {
  // Linux-specific code
} else if (process.platform === 'win32') {
  // Windows-specific code (future)
}
```

**Anti-patterns to avoid:**
- Hardcoding paths that only exist on one platform
- Assuming package manager locations (Homebrew, apt, etc.)
- Using platform-specific syntax without detection (sed -i '', etc.)
- Skipping platform checks in documentation examples

---

## Testing Requirements

Contributors fixing platform issues should:

1. **Test on target platform** - Don't submit untested code
2. **Document limitations** - Be honest about what you couldn't test
3. **Follow PAI principles** - Simple, transparent, UNIX philosophy
4. **Maintain backward compatibility** - Don't break existing platforms
5. **Add to this document** - Update the inventory with your fixes

---

## How to Report Platform Issues

1. Check this document to see if the issue is already known
2. Test on a clean installation (not your dev environment)
3. Open a GitHub issue with:
   - Platform details (OS, version, package manager)
   - Error message or unexpected behavior
   - Steps to reproduce
   - Proposed solution (if you have one)
