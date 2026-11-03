# Beyond the Textbook

A project I started to keep lesson notes, small experiments, and exercises in one place while studying books. It's still early, and I plan to add more books over time.

Two bilingual lessons are available from Wei-Chau Xie's *Differential Equations for Engineers*:

- **§1.1 — Motivating Examples:** six model-formulation walkthroughs, interactive projectile and mixing-tank plots, and six concept checks. This is the current review checkpoint; §1.2 has not been added.
- **§3.1 — Heating and Cooling:** two guided temperature experiments with A/B comparison, a worked exam clinic, eight exercises, and a notebook.

Everything is available in **Turkish and English** (`TR | EN`). Other sections remain a searchable contents map. See [the §1.1 review notes](docs/REVIEW-1-1.md) for scope, checks, and the incremental architecture.

Notes, language preference, and progress are saved in your browser.

## Running locally

You'll need Node.js installed.

```sh
npm start
```

Open http://127.0.0.1:4317 in your browser.

To run the tests:

```sh
npm test
```

## Adding lessons

Lesson content is registered in `dist/content.js`; §1.1 owns a separate module under `dist/lessons/xie-2010/1-1/`. Lab controllers implement a small `mount / update / destroy` contract. Models remain pure functions, lesson fetching is separate from DOM rendering, and no runtime dependencies were added. The existing heating lab is adapted to this lifecycle without a wholesale rewrite.

Run `python3 build_math.py` to validate all registered TR/EN LaTeX pairs and regenerate their MathML maps. See [ARCHITECTURE.md](ARCHITECTURE.md) for the contract.
