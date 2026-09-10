# Casa de Vista — sample guidebook demo

Frontend-only demo of a digital guidebook for a fictional beach house. See `DEMO_ARCHITECTURE.md` for the full plan.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
```

Deploy: import the repo into Vercel. `vercel.json` is already set up for a static Vite build.

## Build status

| Phase | Status |
|---|---|
| 0 Project setup | Done. Vite + React + TS, Tabler webfont, self-hosted fonts (Alegreya + Instrument Sans), `vercel.json` |
| 1 Data & types | Done. All 12 sections written in `src/data/casaDeVista.ts` |
| 2 Theme system | Done. Daytime / Golden Hour / Reef, tokens in `src/theme/themes.ts` |
| 3 Blocks | Done. All 9 block types; clipboard and tel/sms links are real |
| 4 Mobile shell | Done. Tile grid, section screens, Guide/Places/Host tabs, search |
| 5 Desktop shell | Done. Sidebar + content pane, live PhoneFrame via the Desktop/Phone toggle |
| 6 Assets | Not started. Cover is an original SVG illustration placeholder; host shows a monogram; no video block in the data yet |
| 7 Polish & QA | Partly. Focus rings and reduced motion are in; still needs a real-device pass and deploy |

## Notes for Phase 6 / 7

- Swap `property.coverImage` and `host.photo` in the data file; components already handle both.
- Add a `{ type: "video", provider: "youtube", videoId, title }` block to Kitchen or Explore once a freely usable clip is chosen.
- The Tabler webfont ships every icon (~460 KB woff2). Before launch, consider `@tabler/icons-react` so only the ~40 icons used get bundled.
- Phone numbers are samples. Replace `HOST_PHONE` before any real use. The email uses the reserved `.example` domain.
- Nearby places are real landmarks in San Juan / San Fernando, La Union so the Maps links genuinely work; worth a quick fact-check of the notes.

## Deliberate deviations from the architecture doc

- `Block` is a discriminated union (same JSON shape, typed props per block) instead of `[key: string]: unknown`.
- In Phone view on desktop, the sidebar hides and the phone is centered, rather than the phone sitting inside the content pane beside the sidebar (the sidebar couldn't drive the phone, so it read as broken).
- Tablets (641–1023px) get the mobile shell, centered at 640px max.
- On phones the theme switcher collapses to a single swatch button so it doesn't cover text.
