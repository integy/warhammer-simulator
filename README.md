# Warhammer Simulator

Battlefield / deployment / line-of-sight / terrain simulator for Warhammer 40,000.

**Backbone:** forked verbatim from [Rapid Ingress](https://rapidingress.com/battlefield) (React + Vite SPA),
a free 40k deployment / LOS / terrain tool. All source + data copied locally and made self-contained,
then rebranded to **Warhammer Simulator**.

## Run

```bash
python3 serve.py 8080     # SPA dev server (fallback to index.html)
# open http://127.0.0.1:8080/battlefield
```

## Deploy

Live: **https://integy.github.io/warhammer-simulator/** (GitHub Pages, `main` branch root).

- Assets use **relative paths**, so the same build works at localhost root and the GH Pages subpath.
- SPA routing under the subpath is handled by injecting a router `basename` at runtime:
  `index.html` sets `window.__APP_BASENAME = '/warhammer-simulator'` (or `''` on localhost),
  and the router reads it (`assets/main-DG1ErbsX.js`).
- `404.html` = `index.html` + hardcoded `<base href="/warhammer-simulator/">`; GitHub serves
  it for deep links (e.g. `/battlefield`) so the SPA router can render them.

## Cross-device sync (Firebase Realtime Database)

`sync.js` adds realtime multi-device board sync. Two devices that open the same **room**
(`?room=<id>`) see each other's board live — bases, measurements, LOS/radius overlays,
and layout/deployment selection.

- **Start**: click the "Start sync" pill (bottom-right) → generates a room + gives a share link.
- **Join**: open a shared `?room=` link.
- Board state is serialized from the Zustand store (`window.__store`, exposed by a patch to
  the bundle) and stored as a **single JSON string** under `/rooms/<id>/board` (Firebase
  mangles raw arrays into keyed objects, so we stringify).
- Echo suppression + a "joining" grace period prevent self-echo loops and the app's own
  init (it picks a layout on load) from clobbering a remote board.
- Firebase config lives at the top of `sync.js`. DB rules are **test mode (public read/write)**
  — fine for a shared board tool; lock down before any public/production use.

### Patching the minified bundle

The app is a prebuilt minified React bundle (`assets/main-DG1ErbsX.js`). Notable patches:
- `window.__store=U9(...)` — expose the Zustand store.
- `hasActiveSubscription: ()=>true` + a synthetic `guest@warhammer-simulator` user — remove the paywall.
- `basename: window.__APP_BASENAME` — GH Pages subpath routing.

## Architecture

Single-page React app. The shell is `index.html`; the app bundle is `assets/main-DG1ErbsX.js`
(minified Vite build). Game data lives in four plain-JS files loaded via `<script defer>` —
they define **global consts** the bundle reads at runtime (no build step, no imports):

| File | Size | Exports | Purpose |
|---|---|---|---|
| `terrain-data.js` | 560 KB | `TERRAIN_LAYOUT_1..8`, `WTC_*`, `UKTC_LAYOUT_*` | 10th-ed terrain layouts (GW / WTC / UKTC sets) |
| `terrain-data-11e.js` | 4.4 MB | `ELEVEN_E_LAYOUTS` (45) | 11th-ed Event-Companion terrain layouts |
| `measurements-11e.js` | 71 KB | `ELEVEN_E_MEASUREMENTS` | 11e dimension lines + labels (reference overlay) |
| `deployment-data.js` | 15 KB | `DEPLOYMENT_*` (8) | Deployment-zone polygons |

Lazy-loaded route chunks (already fetched): `BadApple`, `HeatMapPage`, `HeatMapsHub`,
`LayoutUpdates`, `NovaPage`, `ReferenceGallery`, `ReferenceLayoutPage`, `tracking`.

### Coordinate system

Board is **60 × 44 units** (landscape, 44" × 60" table). `terrain-data.js` uses origin
top-left with a Y-flip helper (`boardToSVG`). `terrain-data-11e.js` uses origin
bottom-left, Y-up (source Event Companion; transform `app.x = ec.y, app.y = ec.x`).

## Data model

### 11e layout (`ELEVEN_E_LAYOUTS[i]`)

```
id                 "TH-TH-A"   (attackerFD-defenderFD-variant)
edition            "11e"
category           "11e"
name               "Layout A"
matchup            ["TH","TH"]        (FD codes, attacker first)
variant            "A" | "B" | "C"
missions           {FD: "Battlefield Dominance"}
dispositionLabel   "Take and Hold (mirror)"
attackerEdge       "top"
defenderEdge       "bottom"
boardWidth/Height  60 / 44
centerX/centerY    30 / 22
deploymentZones    [...]
objectives         [...]
terrain            [piece, ...]
eyeBadges          [...]
```

### Terrain piece (`layout.terrain[i]`)

```
id           "TH-TH-A-T01-fp0"   (footprint polygon, many points)
areaId       "TH-TH-A-T01"       (grouping key — one footprint per piece)
shape        "polygon"
points       [{x,y}, ...]        (footprint outline)
losPoints    [{x,y}, ...]        (8 points, LOS-relevant)
pieceType    "large_rect_7x11.5" | "long_line_10x2.5" | "med_rect_6x4" |
             "polygon_8x11.5" | "short_line_6x2" | ...
base         true                (ruin/obstacle footprint vs non-base polygon)
obscuring    true                (DENSE = Solid@3" + Obscuring; LIGHT = Obscuring)
objective    {type: "home"|"expansion"|"central", owner: "attacker"|"defender"|null, number}
```

### Fixed Dispositions (FD) — 5 codes, 15 matchup combos

`TH` Take and Hold · `PF` Purge the Foe · `DI` Disruption · `RE` Reconnaissance · `PA` Priority Assets.

45 layouts = 15 unique matchups × 3 variants (A/B/C). Mirror matchups (TH-TH, PF-PF, DI-DI,
RE-RE, PA-PA) + the 10 asymmetric pairings.

### Deployment zones (`DEPLOYMENT_*`)

8 types: crucible_of_battle, dawn_of_war, hammer_and_anvil, search_and_destroy,
sweeping_engagement, tipping_point, hidden_supplies, wtc_hidden_supplies. Zones are
polygons/rectangles with `type: "player"|"opponent"`, fill/stroke color, plus `objectives[]`.

## Feature surface (from UI)

- **Base sizes** — circle (25–160mm), oval (60×35.5 → 170×109), rect (78×116, 130×182), custom.
- **Add units** by faction (all 40k factions) → place bases on board.
- **Deployment side** — deploy to blue/red zone.
- **Edition toggle** — 11th ed / 10th ed.
- **FD matchup picker** — set Player A/B Fixed Dispositions.
- **Battlefield layout** — A / B / C / random.
- **Map options** — measure distance, snap-to-grid, territory line, terrain-setup
  measurements, threat-map overlay, save board as image.
- **Import list** (BCP integration) · Convert to Playbook · Save / Clone · zoom.

## Notes / gotchas

- Data files are hand-`defer`-loaded globals, **not** ES modules — the bundle expects
  `window`-scope consts. Keep that contract if you regenerate data.
- `terrain-data-11e.js` / `measurements-11e.js` are machine-generated (see header comments).
- Analytics/Reddit-pixel scripts in `index.html` are inert locally (localhost guard present).
- Original is closed-source; this local copy is for personal use / re-skinning, not redistribution.
