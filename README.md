# Beyond the Textbook

A bilingual learning workspace for studying textbooks through notes, guided reasoning, interactive experiments, worked problems, and a personal notebook.

Twenty-two sections of Wei-Chau Xie's *Differential Equations for Engineers* are available in Turkish and English:

| Chapter | Section | Topic | Core Focus & Interactive Lab |
| :--- | :--- | :--- | :--- |
| **Ch 1** | **§1.1** | Motivating Examples | Projectile & tank dynamics, model building |
| | **§1.2** | General Concepts | ODE/PDE classification, existence & uniqueness |
| **Ch 2** | **§2.1** | Separation of Variables | Analytic families, maximal intervals, equilibria |
| | **§2.2** | Transformation of Variables | Homogeneous & special substitutions |
| | **§2.3** | Exact Differential Equations | Integrating factors μ(x), μ(y), level curves |
| | **§2.4** | Linear & Bernoulli | Integrating factor μ = e^∫P, Bernoulli substitution |
| | **§2.5** | Solvable for x or y | Clairaut envelopes, singular solutions |
| | **§2.6** | Simple Higher-Order | Missing-y / missing-x reductions |
| | **§2.7** | Summary: Method Selection | 10-method decision tree & diagnostic simulator |
| **Ch 3** | **§3.1** | Heating and Cooling | Newton cooling, calibration, transient analysis |
| **Ch 4** | **§4.1** | General Linear ODEs | Linearity tests, D-operator, superposition |
| | **§4.2** | Homogeneous Solutions | Real, complex & repeated characteristic roots |
| | **§4.3** | Nonhomogeneous Solutions | Undetermined coefficients, inverse D, Wronskian |
| | **§4.5** | Summary: Linear ODEs | Cauchy–Euler, 10-method linear diagnostic |
| **Ch 6** | **§6.1** | The Laplace Transform | Improper kernel integral, convergence abscissa s₀ |
| | **§6.2** | Heaviside Step Function | Unit step H(t - a), pulse windows, 2nd shift theorem |
| | **§6.3** | Dirac Delta Function | Instantaneous impulse limit, sifting property, spectrum |
| | **§6.4** | Inverse Laplace Transform | Partial fractions, 1st shift, convolution theorem f * g |
| | **§6.5** | Solving ODEs via Laplace | Algebraic IVP, ZIR/ZSR decomposition, RK4 check |
| | **§6.6** | Engineering Applications | SDOF oscillator, shock blast, RLC circuit, beam deflection |
| | **§6.7** | Summary: Laplace Methods | 10-method Laplace matrix & diagnostic simulator |
| **Ch 7** | **§7.1** | Introduction: Systems of ODEs | Particle motion, polar kinematics, shear-building M/C/K, state space |
| | **§7.2** | The Method of Operator | Operator determinant φ(D), constant elimination, Cramer's rule, resonance |

Every developed lesson includes guided derivations with conceptual predictions, an interactive dual-curve SVG laboratory, four fully worked exam clinic problems (with trap analysis and scoring rubric), and a section-aware derivative/integral reference drawer in Turkish and English.

Other sections remain a searchable contents map. Browser storage keeps per-lesson notes, progress, and language preference. No account is required.

## Run locally

Run `npm start`, then open the address printed in the terminal (normally http://127.0.0.1:4317). No install or build is needed. `npm test` runs the mathematical, bilingual, and lifecycle checks. `python3 build_math.py` validates paired LaTeX blocks and regenerates reviewed MathML.

## Architecture

The app uses native ES modules and no runtime dependencies. Lesson data lives under `dist/lessons/`, pure models under `dist/models/`, and lab controllers under `dist/labs/`. `dist/core/study-guide.js` renders topic-authored predictions and derivations; it does not own navigation or persistent progress. See [ARCHITECTURE.md](ARCHITECTURE.md).

Current review: Chapter 2, Chapter 4, and Chapter 6 are fully developed to the §3.1 depth standard (§6.1–§6.7), and Chapter 7 development continues with §7.1 and §7.2. See [the revision record](docs/QUALITY-REVISION.md). Recent developments remain local until explicitly requested for GitHub.
