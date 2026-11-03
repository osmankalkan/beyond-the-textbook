# Beyond the Textbook

A bilingual learning workspace for studying textbooks through notes, guided reasoning, interactive experiments, worked problems, and a personal notebook.

Four sections of Wei-Chau Xie's *Differential Equations for Engineers* are available in Turkish and English:

- **§1.1 — Motivating Examples:** six model walkthroughs, projectile and tank experiments, two guided derivations with predictions, two worked exam cases, and six checks.
- **§1.2 — General Concepts and Definitions:** classification, families/conditions, existence/uniqueness, and ODE/PDE verification; two guided reasoning paths, two worked exam cases, and fourteen checks.
- **§2.1 — Separation of Variables:** source Examples 2.1–2.3, guided integration and excluded branches, four analytic families with A/B comparison and maximal intervals, four fully worked midterm problems, and eleven checks.
- **§3.1 — Heating and Cooling:** guided temperature experiments, A/B comparison, calibration, transient and steady-state analysis, an exam clinic, and eight checks.

Other sections remain a searchable contents map. Browser storage keeps per-lesson notes, progress, and language preference. No account is required.

## Run locally

Run `npm start`, then open the address printed in the terminal (normally http://127.0.0.1:4317). No install or build is needed. `npm test` runs the mathematical, bilingual, and lifecycle checks. `python3 build_math.py` validates paired LaTeX blocks and regenerates reviewed MathML.

## Architecture

The app uses native ES modules and no runtime dependencies. Lesson data lives under `dist/lessons/`, pure models under `dist/models/`, and lab controllers under `dist/labs/`. `dist/core/study-guide.js` renders topic-authored predictions and derivations; it does not own navigation or persistent progress. See [ARCHITECTURE.md](ARCHITECTURE.md).

Current review: the depth and learning flow of §1.1, §1.2 and §2.1 have been revised using §3.1 as the reference. See [the revision record](docs/QUALITY-REVISION.md). Changes remain local until explicitly requested for GitHub.
