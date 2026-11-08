# Chapter 7 Summary: Linear Systems Decision Engine and Methods Synthesis

In engineering, coupled mechanical oscillators, electrical networks, and structural vibrations are governed by **systems of linear differential equations** coupling multiple dependent variables through their rates of change. Throughout Chapter 7, we formulated three foundational analytical strategies to solve these systems:

1. **The Method of Operator (§7.2):** Reduction to higher-order scalar differential equations via the differential \(D = d/dt\) operator and Cramer's rule.
2. **The Method of Laplace Transform (§7.3):** Converting time-domain differential operators directly into linear algebraic systems in the complex frequency \(s\)-plane.
3. **The Matrix Method (§7.4):** First-order state-space vector-matrix formulation \(\mathbf{\dot{x}} = \mathbf{A}\mathbf{x} + \mathbf{f}(t)\), eigenvalue spectrum, generalized eigenvector chains, and fundamental matrix inversion.

> **MENTAL MODEL (60-Second Method Selection Compass):** When encountering a new differential system on exams or in engineering practice, ask the following three questions within the first 60 seconds:
> 1. **Is the problem an Initial Value Problem (IVP) and does the forcing contain discontinuities (steps, impulses)?** If yes, the **Method of Laplace Transform** is undeniably optimal; it absorbs initial conditions directly and eliminates boundary stitching.
> 2. **Is the system 2×2, homogeneous, and seeking an arbitrary general solution without initial data?** If yes, the **Method of Operator** provides the characteristic roots and independent modes in seconds via operator determinant \(\phi(D)\).
> 3. **Is the system an \(n \ge 3\) high-dimensional state-space model or structural vibration (MDOF) oscillator?** If yes, the **Matrix Method** is the only systematic, computationally scalable approach; modal decoupling separates the system into independent single degree-of-freedom oscillators.

---

## 1. Method 1: Operator Method Synthesis and Constant Elimination

A linear differential system with \(n\) dependent variables \((x_1, x_2, \dots, x_n)\) is expressed in terms of the differential operator \(D = d/dt\) in the general form:

$$\sum_{j=1}^n \phi_{ij}(D)x_j(t) = f_i(t), \quad i = 1, 2, \dots, n$$

The determinant of the operator coefficient matrix is the system's characteristic differential operator:

$$\phi(D) = \det[\phi_{ij}(D)], \quad N = \deg \phi(D)$$

### Homogeneous Solution and Characteristic Roots

The characteristic equation \(\phi(\lambda) = 0\) is a polynomial of degree \(N\), yielding \(N\) characteristic numbers \(\lambda_1, \lambda_2, \dots, \lambda_N\). Every dependent variable \(x_i(t)\) is a linear combination of the corresponding modal shapes:

$$x_i(t) = \sum_{k=1}^N C_{ik} e^{\lambda_k t}$$

> **SIGN CONVENTION AND CONSTANT ELIMINATION PROTOCOL:** Writing \(N\) constants separately for each dependent variable yields \(n \times N\) nominal coefficients. However, the system's general solution strictly contains **only \(N = \deg \phi(D)\) independent arbitrary constants**! The \((n - 1)N\) redundant constants must be eliminated by substituting the general forms back into one of the original differential equations and equating coefficients term by term.

### Particular Solutions and Operator Cramer's Rule

When the forcing functions \(f_i(t)\) are exponential, polynomial, or sinusoidal, particular solutions are obtained directly via inverse operator determinants:

$$x_{iP}(t) = \frac{1}{\phi(D)}\Delta_i(t)$$

Here \(\Delta_i(t)\) is the operator determinant formed by replacing the \(i\)-th column of the coefficient matrix with the forcing vector \(\mathbf{f}(t)\).

> **FREQUENT MISTAKE (Operator Precedence):** Differential operators are not scalar numbers; they differentiate the functions they act upon. In expanding Cramer determinants, operator blocks must strictly precede forcing functions on the left (\(\phi_{ij}(D)f_k(t)\)). Inverting this order obliterates derivatives and causes lethal sign errors!

---

## 2. Method 2: Laplace Transform Method Synthesis

The Laplace transform method provides the most direct and mechanical procedure for initial value problems (IVP). By the derivative theorem:

$$\mathcal{L}\{\dot{x}(t)\} = s X(s) - x(0), \quad \mathcal{L}\{\ddot{x}(t)\} = s^2 X(s) - s x(0) - \dot{x}(0)$$

the differential system transforms directly into an algebraic linear system in the complex \(s\)-plane:

$$\mathbf{\Phi}(s)\mathbf{X}(s) = \mathbf{F}(s) + \mathbf{I}_0$$

where \(\mathbf{I}_0\) is the vector of initial state values.

### Unique Advantages of the Laplace Method

1. **Direct Absorption of Initial Data:** Initial values \(x(0), y(0)\) enter the right-hand algebraic terms at step zero. Post-solution constant elimination is completely bypassed!
2. **Discontinuous Forcing and Shock Impulses:** When excitations involve Heaviside steps \(H(t - a)\) or Dirac delta \(\delta(t - a)\) impulses:

$$\mathcal{L}\{f(t - a)H(t - a)\} = e^{-as}F(s), \quad \mathcal{L}\{\delta(t - a)\} = e^{-as}$$

all discontinuities are solved within a single closed-form expression, eliminating piecewise interval stitching.

> **PRACTICAL CHECK (Cramer Numerator Determinants):** In solving the algebraic system:
>
> $$X(s) = \frac{\det \mathbf{\Phi}_1(s)}{\det \mathbf{\Phi}(s)}, \quad Y(s) = \frac{\det \mathbf{\Phi}_2(s)}{\det \mathbf{\Phi}(s)}$$
>
> Always factor and cancel common numerator and denominator roots before inverting; cancelling prevents spurious resonance artifacts.

---

## 3. Method 3: Matrix Method and State Space Synthesis

The matrix method provides the most general formulation, reducing arbitrary differential systems to first-order vector form:

$$\mathbf{\dot{x}}(t) = \mathbf{A}\mathbf{x}(t) + \mathbf{f}(t), \quad \mathbf{x}(t) \in \mathbb{R}^n, \quad \mathbf{A} \in \mathbb{R}^{n \times n}$$

The homogeneous solution \(\mathbf{\dot{x}} = \mathbf{A}\mathbf{x}\) is governed by the eigenvalues (\(\lambda\)) and eigenvectors (\(\mathbf{v}\)) of \(\det(\mathbf{A} - \lambda\mathbf{I}) = 0\):

$$(\mathbf{A} - \lambda\mathbf{I})\mathbf{v} = \mathbf{0}$$

### Three Core Eigenvalue Spectra and Phase Portrait Topology

1. **Distinct Real Eigenvalues (\(\lambda_1 \neq \lambda_2\)):**
   Lineer independent eigenvectors \(\mathbf{v}_1, \mathbf{v}_2\) span the state space:
   $$\mathbf{x}_H(t) = C_1 e^{\lambda_1 t}\mathbf{v}_1 + C_2 e^{\lambda_2 t}\mathbf{v}_2$$
   If the eigenvalues have opposite signs (\(\lambda_1 < 0 < \lambda_2\)), the origin is an unstable **Saddle Point**. The line along \(\mathbf{v}_1\) forms the stable manifold, while \(\mathbf{v}_2\) forms the unstable manifold.
2. **Complex Conjugate Eigenvalues (\(\lambda = \alpha \pm i\beta\)):**
   Euler's formula separates real and imaginary parts into rotational modes:
   $$\mathbf{x}_H(t) = e^{\alpha t}\left[ C_1 (\mathbf{a}\cos\beta t - \mathbf{b}\sin\beta t) + C_2 (\mathbf{a}\sin\beta t + \mathbf{b}\cos\beta t) \right]$$
   When \(\alpha < 0\), the origin is an asymptotically stable **Spiral Sink**.
3. **Defective Repeated Eigenvalues:**
   When geometric multiplicity is strictly less than algebraic multiplicity (\(k < m\)), generalized eigenvector chains complete the eigenspace:
   $$(\mathbf{A} - \lambda\mathbf{I})\mathbf{v}_2 = \mathbf{v}_1 \implies \mathbf{x}_2(t) = e^{\lambda t}(t\mathbf{v}_1 + \mathbf{v}_2)$$

### Fundamental Matrix and Variation of Parameters

The fundamental matrix \(\mathbf{X}(t) = [\mathbf{x}_1(t), \dots, \mathbf{x}_n(t)]\) is strictly non-singular (\(\det \mathbf{X}(t) \neq 0\)). The complete general and initial value solution is encapsulated in a single matrix integral:

$$\mathbf{x}(t) = \mathbf{X}(t)\mathbf{X}^{-1}(t_0)\mathbf{x}_0 + \mathbf{X}(t)\int_{t_0}^t \mathbf{X}^{-1}(\tau)\mathbf{f}(\tau)\,d\tau$$

---

## 4. Comparative Methods Matrix

The synthesis table below charts method selection across key engineering criteria:

| Evaluation Criterion | §7.2 Operator Method | §7.3 Laplace Transform | §7.4 Matrix Method |
| :--- | :--- | :--- | :--- |
| **Mathematical Engine** | Differential operator \(D = d/dt\) and Cramer's rule | Complex frequency transform \(\mathcal{L}\) | Eigenvalues, eigenvectors, and state space |
| **Optimal Domain** | Small (2×2) systems without initial conditions | Initial value problems (IVP) and discontinuous forcing | High-dimensional (MDOF) systems, modal analysis |
| **Initial Conditions** | Handled post-solution; constant elimination required | Embedded at step zero directly into algebraic equations | Direct matrix product: \(\mathbf{X}(t)\mathbf{X}^{-1}(t_0)\mathbf{x}_0\) |
| **Discontinuous Forcing** | Unsuitable; requires piecewise boundary stitching | **Optimal;** handles Heaviside and Dirac impulses | Requires piecewise convolution integrals |
| **High Dimensions (\(n \ge 3\))** | Expanding operator determinants becomes cumbersome | Partial fractions become algebraically unwieldy | **Industry standard;** ideally structured for computers |
| **Critical Pitfall** | Retaining \(2N\) constants instead of \(N = \deg \phi(D)\) | Sign slips in derivative transforms or Cramer terms | Omitting generalized eigenvector chains for defective roots |

---

## 5. Engineering Application: Structural 2-DOF Vibrations and Modal Decoupling

Multi-story buildings or coupled spring-mass systems are modeled by second-order coupled differential systems involving mass matrix \(\mathbf{M}\) and stiffness matrix \(\mathbf{K}\):

$$\mathbf{M}\mathbf{\ddot{x}} + \mathbf{K}\mathbf{x} = \mathbf{0}$$

where \(\mathbf{x}(t) = [x_1(t), x_2(t)]^T\) represents floor displacements.

### Generalized Eigenvalue Problem and Orthogonality

Assuming harmonic motion \(\mathbf{x}(t) = \mathbf{\phi} e^{i\omega t}\) yields the generalized eigenvalue problem:

$$(\mathbf{K} - \omega^2\mathbf{M})\mathbf{\phi} = \mathbf{0} \implies \det(\mathbf{K} - \omega^2\mathbf{M}) = 0$$

Evaluating the determinant yields natural frequencies \(\omega_1, \omega_2\) and mode shapes \(\mathbf{\phi}_1, \mathbf{\phi}_2\). Transforming to modal coordinates via modal matrix \(\mathbf{\Phi} = [\mathbf{\phi}_1, \mathbf{\phi}_2]\):

$$\mathbf{x}(t) = \mathbf{\Phi}\mathbf{q}(t) \implies \mathbf{\Phi}^T\mathbf{M}\mathbf{\Phi}\mathbf{\ddot{q}} + \mathbf{\Phi}^T\mathbf{K}\mathbf{\Phi}\mathbf{q} = \mathbf{0}$$

By mode shape orthogonality, the coupled mass and stiffness matrices diagonalize, decomposing the system into uncoupled single degree-of-freedom oscillators:

$$\ddot{q}_1(t) + \omega_1^2 q_1(t) = 0, \quad \ddot{q}_2(t) + \omega_2^2 q_2(t) = 0$$

---

## 6. Numerical and Analytical Verification

Analytical solutions computed in laboratories and examinations are verified by evaluating the instantaneous residual vector \(\mathbf{E}(t)\):

$$\mathbf{E}(t) = \mathbf{\dot{x}}(t) - \mathbf{A}\mathbf{x}(t) - \mathbf{f}(t) \equiv \begin{bmatrix} 0 \\ 0 \end{bmatrix}, \quad |\mathbf{E}(t)| < 10^{-14}$$

> **INDEPENDENT VERIFICATION (RK4 Cross-Check):** An independent 4th-order Runge-Kutta (RK4) numerical integrator verifies the analytical trajectory. Retaining error margins within machine precision (\(< 10^{-6}\)) proves the mathematical and physical exactness of the theoretical solution.
