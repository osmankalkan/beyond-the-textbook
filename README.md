# Beyond the Textbook

A bilingual learning workspace for studying textbooks through notes, guided reasoning, interactive experiments, worked problems, and a personal notebook.

Eleven sections of Wei-Chau Xie's *Differential Equations for Engineers* are available in Turkish and English:

- **§1.1 — Motivating Examples:** six model walkthroughs, projectile and tank experiments, two guided derivations with predictions, two worked exam cases, and six checks.
- **§1.2 — General Concepts and Definitions:** classification, families/conditions, existence/uniqueness, and ODE/PDE verification; two guided reasoning paths, two worked exam cases, and fourteen checks.
- **§2.1 — Separation of Variables:** source Examples 2.1–2.3, guided integration and excluded branches, four analytic families with A/B comparison and maximal intervals, four fully worked midterm problems, and eleven checks.
- **§2.2 — Transformation of Variables:** source Examples 2.4–2.12, homogeneous and special-term transformations, four analytic families with A/B comparison and lost-branch checks, four fully worked midterm problems, and eleven checks.
- **§2.3 — Exact Differential Equations and Integrating Factors:** source Examples 2.13–2.29, the M_y=N_x test, μ(x)/μ(y), inspection and grouping factors, four level-curve families with A/B comparison, four fully worked midterm problems, and eleven checks.
- **§2.4 — Linear First-Order and Bernoulli Equations:** source Examples 2.30–2.34, standard form y′+P(x)y=Q(x), the integrating factor μ=e^∫P dx, x-as-a-function-of-y problems, the Bernoulli substitution u=y^{1−n}, four analytic families with A/B comparison and branch checks, four fully worked midterm problems, and eleven checks.
- **§2.5 — Equations Solvable for the Independent or Dependent Variable:** source Examples 2.35–2.39, the parameter p=y′, the routes y=f(x,p) and x=g(y,p), Clairaut equations with their line families and envelopes, singular solutions, four analytic families with A/B comparison and tangency checks, four fully worked midterm problems, and eleven checks.
- **§2.6 — Simple Higher-Order Equations:** direct integration of y^(n)=f(x), missing-y reduction u=y^(k), missing-x reduction y″=u du/dy, three analytic families with A/B and residual checks, four fully worked midterm problems, and eleven checks.
- **§2.7 — Summary: The Art of Choosing Methods:** the ten-method decision tree and reduction matrix, an interactive ten-card diagnostic simulator, two synthesis paths, four master-level clinic cases, and eleven checks.
- **§3.1 — Heating and Cooling:** guided temperature experiments, A/B comparison, calibration, transient and steady-state analysis, an exam clinic, and eight checks.
- **§4.1 — General Linear Ordinary Differential Equations:** linearity tests, the D operator and φ(D), the fundamental superposition theorem, the general solution y_C+y_P, a variable-coefficient noncommutation lab, four worked midterm cases, and twelve checks.

Every developed lesson also has a section-aware quick-reference drawer in its reading aside. It opens the derivative and integral rules that the current lesson actually uses, in Turkish or English.

Other sections remain a searchable contents map. Browser storage keeps per-lesson notes, progress, and language preference. No account is required.

## Run locally

Run `npm start`, then open the address printed in the terminal (normally http://127.0.0.1:4317). No install or build is needed. `npm test` runs the mathematical, bilingual, and lifecycle checks. `python3 build_math.py` validates paired LaTeX blocks and regenerates reviewed MathML.

## Architecture

The app uses native ES modules and no runtime dependencies. Lesson data lives under `dist/lessons/`, pure models under `dist/models/`, and lab controllers under `dist/labs/`. `dist/core/study-guide.js` renders topic-authored predictions and derivations; it does not own navigation or persistent progress. See [ARCHITECTURE.md](ARCHITECTURE.md).

Current review: the depth and learning flow of §1.1, §1.2 and §2.1 have been revised using §3.1 as the reference; §2.2–§2.7 are committed and pushed. §2.2–§2.5 notes were redesigned to the §2.5 standard, and §4.1 has now been added with its own operator lab and clinic. See [the revision record](docs/QUALITY-REVISION.md). §4.1 changes remain local until explicitly requested for GitHub.
