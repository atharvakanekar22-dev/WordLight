# Copilot Agent Task Completion

For every coding task, follow this workflow:

1. Before editing, run `git status --short --branch` and identify existing user changes. Never overwrite, discard, stage, or commit those changes. If a file already has user changes, do not stage the whole file; leave it out of the commit if the task changes cannot be staged separately with confidence.
2. Implement only the requested change.
3. Run the relevant tests, lint checks, or build. This project has no test script; use `npm run lint` and `npm run build` for application changes. For documentation-only changes, validation is not required unless documentation tests exist.
4. Before staging, inspect `git status`, `git diff --check`, and the complete diffs for the files to be committed. Confirm every change is task-related, check for secrets or credentials, and exclude generated files and unrelated changes.
5. If any relevant check fails, a secret is found, or the changes cannot be safely separated from existing user work, do not commit. Explain the blocker and leave the worktree intact.
6. When checks pass and the changes are safe, stage only the explicitly reviewed task files using `git add -- <file paths>`. Do not use `git add -A` or stage the entire worktree. Review the staged diff before committing.
7. Create a local commit with a concise Conventional Commit message, such as `feat: add ...`, `fix: resolve ...`, `docs: update ...`, `test: cover ...`, `refactor: improve ...`, or `chore: configure ...`.
8. Never amend an existing commit or use destructive Git commands. Do not push to GitHub unless the user explicitly asks.
9. After committing, report the commit hash, commit message, files committed, checks performed, and any remaining issues. Do not claim checks passed unless they were run successfully.
