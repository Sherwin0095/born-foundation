# BORN FOUNDATION Workspace Engineering Rule

This workspace mirrors the mandatory standards in `AGENTS.md`:

- Always inspect `src/app/globals.css`, `src/components/ui/index.tsx`, `src/lib/site-config.ts`, `src/lib/media-register.ts`, and `docs/content-register.md` before modifying UI or content.
- Keep `.private/` (`source-archive/` and `media-previews/`) strictly outside Git and outside `public/`. Never expose unapproved photographs showing identifiable minors on any public route or public API.
- Always run `npm run type-check`, `npm run lint`, `npm run build`, and `npm test` after substantive changes, and verify live rendered output in a headless browser before concluding work.
- Never invent unverified statistics, stories, donors, emails, bank/UPI details, or legal claims.
- Keep `docs/implementation-status.md` truthful about what is VERIFIED, IMPLEMENTED, BLOCKED, or NOT IMPLEMENTED.
