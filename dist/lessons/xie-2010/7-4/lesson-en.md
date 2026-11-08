# §7.4 The Matrix Method: Eigenvalues, Eigenvectors, Fundamental Matrix, and Variation of Parameters

In engineering dynamics, coupled multi-variable phenomena—such as seismic floor vibrations in multi-storey structures, multi-loop electrical networks, or interconnected chemical reaction vessels—are modeled as systems of first-order differential equations rather than isolated higher-order scalar equations. The most general, systematic, and geometrically insightful approach to these coupled systems is the **Matrix Method**.

Any first-order linear system with constant coefficients governing an \(n\)-dimensional state vector \(\mathbf{x}(t) = [x_1(t), x_2(t), \dots, x_n(t)]^T\) and system matrix \(\mathbf{A} \in \mathbb{R}^{n \times n}\) is expressed in standard state-space matrix form:

$$\mathbf{\dot{x}}(t) = \mathbf{A}\,\mathbf{x}(t) + \mathbf{f}(t), \quad \mathbf{x}(t_0) = \mathbf{x}_0$$

In scalar 1D dynamics, \(\dot{x} = a x\) yields the exponential solution \(x(t) = C e^{at}\). In multi-dimensional matrix spaces, we hypothesize a modal exponential ansatz \(\mathbf{x}(t) = e^{\lambda t}\mathbf{v}\), where \(\lambda\) is a scalar eigenvalue and \(\mathbf{v} \neq \mathbf{0}\) is a directional eigenvector. Substituting this ansatz into the homogeneous equation leads to \((\mathbf{A} - \lambda \mathbf{I})\mathbf{v} = \mathbf{0}\). For non-trivial solutions (\(\mathbf{v} \neq \mathbf{0}\)) to exist, the coefficient matrix must be singular, requiring its characteristic determinant to vanish:

$$\det(\mathbf{A} - \lambda\,\mathbf{I}) = \lambda^2 - \operatorname{tr}(\mathbf{A})\,\lambda + \det(\mathbf{A}) = 0$$

> **MENTAL MODEL (Geometric Intuition of Eigenvectors):** When a general matrix acts on an arbitrary vector, it both stretches/shrinks and rotates the vector. However, when it acts on an **eigenvector**, no rotation occurs: the matrix acts exactly like a scalar scaling factor, stretching or contracting the vector by \(\lambda\) (\(\mathbf{A}\mathbf{v} = \lambda \mathbf{v}\)). Consequently, if a particle in the phase plane starts on an eigenvector ray, its velocity \(\mathbf{\dot{x}} = \lambda \mathbf{x}\) remains strictly colinear with its position at every instant. The particle cannot bend or turn; it stays permanently on this invariant straight rail, contracting toward the origin (\(\lambda < 0\)) or escaping to infinity (\(\lambda > 0\)). Every curved trajectory in the phase portrait is simply the linear superposition of these invariant straight rails!

---

## 1. Case 1: Distinct Real Eigenvalues and Saddle Point Dynamics

When the characteristic polynomial yields \(n\) distinct real eigenvalues \(\lambda_1, \lambda_2, \dots, \lambda_n\), the corresponding eigenvectors \(\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n\) are linearly independent and form a basis for \(\mathbb{R}^n\). The general homogeneous solution is the superposition of these independent modes:

$$\mathbf{x}_H(t) = C_1\,e^{\lambda_1 t}\,\mathbf{v}_1 + C_2\,e^{\lambda_2 t}\,\mathbf{v}_2 = \sum_{k=1}^n C_k\,e^{\lambda_k t}\,\mathbf{v}_k$$

### Textbook Example 7.14
Consider the 2×2 differential system \(\dot{x}_1 = x_1 + 4x_2\), \(\dot{x}_2 = x_1 - 2x_2\) subject to \(x_1(0) = 1, x_2(0) = 2\). The coefficient matrix and characteristic equation are:

$$\mathbf{A} = \begin{bmatrix} 1 & 4 \\ 1 & -2 \end{bmatrix}, \quad \det(\mathbf{A} - \lambda\,\mathbf{I}) = \lambda^2 + \lambda - 6 = (\lambda + 3)(\lambda - 2) = 0$$

The characteristic roots are \(\lambda_1 = -3\) and \(\lambda_2 = 2\). Solving \((\mathbf{A} - \lambda \mathbf{I})\mathbf{v} = \mathbf{0}\) for each eigenvalue yields two linearly independent eigenvectors:

$$\lambda_1 = -3 \implies \mathbf{v}_1 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}, \quad \lambda_2 = 2 \implies \mathbf{v}_2 = \begin{bmatrix} 4 \\ 1 \end{bmatrix}$$

The general solution is \(\mathbf{x}(t) = C_1 e^{-3t} \mathbf{v}_1 + C_2 e^{2t} \mathbf{v}_2\). Imposing the initial conditions \(C_1 \mathbf{v}_1 + C_2 \mathbf{v}_2 = [1, 2]^T\) determines \(C_1 = -7/5\) and \(C_2 = 3/5\):

$$\mathbf{x}(t) = -\frac{7}{5}\,e^{-3t}\begin{bmatrix} 1 \\ -1 \end{bmatrix} + \frac{3}{5}\,e^{2t}\begin{bmatrix} 4 \\ 1 \end{bmatrix} = \begin{bmatrix} -\frac{7}{5}\,e^{-3t} + \frac{12}{5}\,e^{2t} \\ \frac{7}{5}\,e^{-3t} + \frac{3}{5}\,e^{2t} \end{bmatrix}$$

> **PRACTICAL CHECK (Saddle Point Topology):** Because one eigenvalue is negative (\(\lambda_1 = -3\)) and the other is positive (\(\lambda_2 = 2\)), the origin is a **Saddle Point**. In the phase portrait, trajectories initialized along \(\mathbf{v}_1 = [1, -1]^T\) converge directly toward the origin (stable manifold). Any perturbation off this line activates the growing exponential \(e^{2t}\), asymptotically aligning trajectories parallel to \(\mathbf{v}_2 = [4, 1]^T\) as they escape toward infinity (unstable manifold).

---

## 2. Case 2: Complex Conjugate Eigenvalues and Damped Spiral Sinks

For real-coefficient matrices, complex eigenvalues always occur in conjugate pairs: \(\lambda_{1,2} = \alpha \pm i\beta\). The corresponding eigenvector separates into real and imaginary vector components: \(\mathbf{v} = \mathbf{u} + i\mathbf{w}\). Applying Euler's formula expands the complex exponential into sinusoids:

$$\lambda = \alpha \pm i\,\beta, \quad e^{(\alpha + i\beta)t} = e^{\alpha t}\left(\cos\beta t + i\,\sin\beta t\right)$$

Because the differential operator preserves real and imaginary parts independently, two real linearly independent solutions are extracted:

$$\mathbf{x}_1(t) = e^{\alpha t}\left(\mathbf{u}\cos\beta t - \mathbf{w}\sin\beta t\right), \quad \mathbf{x}_2(t) = e^{\alpha t}\left(\mathbf{u}\sin\beta t + \mathbf{w}\cos\beta t\right)$$

### Textbook Example 7.15
For the system \(\dot{x}_1 = -3x_1 - 2x_2\), \(\dot{x}_2 = 8x_1 - 3x_2\), the matrix and characteristic equation are:

$$\mathbf{A} = \begin{bmatrix} -3 & -2 \\ 8 & -3 \end{bmatrix}, \quad \det(\mathbf{A} - \lambda\,\mathbf{I}) = (\lambda + 3)^2 + 16 = 0 \implies \lambda_{1,2} = -3 \pm 4i$$

Solving \((\mathbf{A} - \lambda \mathbf{I})\mathbf{v} = \mathbf{0}\) for \(\lambda = -3 + 4i\) isolates the complex eigenvector into real and imaginary parts:

$$(\mathbf{A} - (-3+4i)\mathbf{I})\,\mathbf{v} = \mathbf{0} \implies \mathbf{v} = \begin{bmatrix} 5 \\ -2 \end{bmatrix} + i\begin{bmatrix} 0 \\ 4 \end{bmatrix}$$

Superposing the real decoupled solutions gives the general spiral solution:

$$\mathbf{x}(t) = e^{-3t}\left( C_1\begin{bmatrix} 5\cos 4t \\ -2\cos 4t - 4\sin 4t \end{bmatrix} + C_2\begin{bmatrix} 5\sin 4t \\ -2\sin 4t + 4\cos 4t \end{bmatrix} \right)$$

The negative real part \(\alpha = -3 < 0\) contracts the phase amplitude, while the imaginary frequency \(\beta = 4\) produces continuous rotation, resulting in a **Stable Spiral Sink**.

---

## 3. Case 3: Repeated Roots, Defective Matrices, and Generalized Eigenvectors

When an eigenvalue has algebraic multiplicity \(m=2\) but yields only a single linearly independent eigenvector \(\mathbf{v}_1\), the matrix is termed **Defective**:

$$k = \operatorname{dim}\,\operatorname{ker}(\mathbf{A} - \lambda\,\mathbf{I}) = 1 < m = 2$$

With only one eigenvector, the first solution is \(\mathbf{x}_1(t) = e^{\lambda t}\mathbf{v}_1\). The second solution cannot be merely \(t e^{\lambda t}\mathbf{v}_1\) because the product rule generates an unbalanced derivative term \(e^{\lambda t}\mathbf{v}_1\). Balancing this requires adding a **generalized eigenvector** \(\mathbf{v}_2\): \(\mathbf{x}_2(t) = e^{\lambda t}(t\mathbf{v}_1 + \mathbf{v}_2)\), producing the classic **Jordan chain**:

$$(\mathbf{A} - \lambda\,\mathbf{I})\,\mathbf{v}_1 = \mathbf{0}, \quad (\mathbf{A} - \lambda\,\mathbf{I})\,\mathbf{v}_2 = \mathbf{v}_1$$

### Textbook Example 7.18
$$\mathbf{A} = \begin{bmatrix} 1 & -4 \\ 1 & -3 \end{bmatrix}, \quad \det(\mathbf{A} - \lambda\,\mathbf{I}) = (\lambda + 1)^2 = 0 \implies \lambda = -1$$

For the repeated root \(\lambda = -1\), solving \((\mathbf{A} + \mathbf{I})\mathbf{v}_1 = \mathbf{0}\) provides the single eigenvector \(\mathbf{v}_1\). The generalized eigenvector \(\mathbf{v}_2\) is then determined from the chain:

$$\mathbf{v}_1 = \begin{bmatrix} 2 \\ 1 \end{bmatrix}, \quad (\mathbf{A} + \mathbf{I})\,\mathbf{v}_2 = \mathbf{v}_1 \implies \mathbf{v}_2 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$$

> **SIGN RULE AND CHAIN ORDER:** When solving \((\mathbf{A} - \lambda \mathbf{I})\mathbf{v}_2 = \mathbf{v}_1\), the RHS must strictly be \(\mathbf{v}_1\) rather than \(\mathbf{0}\). Adding any multiple of \(\mathbf{v}_1\) to \(\mathbf{v}_2\) preserves the solution space, amounting merely to a redefinition of the arbitrary constant \(C_1\).

---

## 4. The Fundamental Matrix \(\mathbf{X}(t)\) and Variation of Parameters

Arranging \(n\) linearly independent solution vectors as columns of an \(n \times n\) matrix produces the **Fundamental Matrix**:

$$\mathbf{X}(t) = \begin{bmatrix} \mathbf{x}_1(t) & \mathbf{x}_2(t) & \cdots & \mathbf{x}_n(t) \end{bmatrix}, \quad \mathbf{\dot{X}}(t) = \mathbf{A}\,\mathbf{X}(t), \quad \det\mathbf{X}(t) \neq 0$$

The homogeneous solution is \(\mathbf{x}_H(t) = \mathbf{X}(t)\mathbf{C}\). To solve the nonhomogeneous system \(\mathbf{\dot{x}} = \mathbf{A}\mathbf{x} + \mathbf{f}(t)\), we promote the constant vector \(\mathbf{C}\) to a time-dependent parameter vector \(\mathbf{c}(t)\) (**Variation of Parameters**):

$$\mathbf{x}_P(t) = \mathbf{X}(t)\,\mathbf{c}(t) = \sum_{k=1}^n c_k(t)\,\mathbf{x}_k(t)$$

Substituting into the system and applying the product rule yields:

$$\mathbf{\dot{x}}_P = \mathbf{\dot{X}}\,\mathbf{c} + \mathbf{X}\,\mathbf{\dot{c}} = \mathbf{A}\,\mathbf{X}\,\mathbf{c} + \mathbf{X}\,\mathbf{\dot{c}} = \mathbf{A}\,\mathbf{x}_P + \mathbf{f}(t) \implies \mathbf{X}(t)\,\mathbf{\dot{c}}(t) = \mathbf{f}(t)$$

Because \(\mathbf{\dot{X}} = \mathbf{A}\mathbf{X}\), the terms \(\mathbf{A}\mathbf{X}\mathbf{c}\) cancel identically! Multiplying by \(\mathbf{X}^{-1}(t)\) isolates the parameter derivatives:

$$\mathbf{\dot{c}}(t) = \mathbf{X}^{-1}(t)\,\mathbf{f}(t) \implies \mathbf{c}(t) = \mathbf{C} + \int_{t_0}^t \mathbf{X}^{-1}(\tau)\,\mathbf{f}(\tau)\,d\tau$$

### Textbook Example 7.18 Nonhomogeneous Particular Solution
Applying forcing \(\mathbf{f}(t) = [2, 0]^T e^{-t}\) to Example 7.18 and integrating via \(\mathbf{X}^{-1}(t)\) produces the exact particular solution:

$$\mathbf{x}_P(t) = \begin{bmatrix} 2 & 2t+1 \\ 1 & t \end{bmatrix} e^{-t}\begin{bmatrix} \int 2t\,dt \\ \int -2\,dt \end{bmatrix} = \begin{bmatrix} 2(t^2 - 2t - 1) \\ t^2 - 2t \end{bmatrix} e^{-t}$$

---

## 5. Non-Standard Forcing: \(\sec t\) and Logarithmic Dynamics

The Method of Undetermined Coefficients is confined to families whose derivatives close under differentiation. For non-standard inputs such as \(\sec t, \tan t, 1/t\), the derivative family is infinite; Variation of Parameters serves as the sole analytic pathway.

### Textbook Example 7.19
$$\mathbf{\dot{x}} = \begin{bmatrix} 1 & -1 \\ 2 & -1 \end{bmatrix}\mathbf{x} + \begin{bmatrix} \sec t \\ 0 \end{bmatrix}, \quad \lambda_{1,2} = \pm i, \quad \det\mathbf{A} = 1$$

The homogeneous system forms an undamped neutral center. Multiplying the inverse fundamental matrix by the forcing vector yields parameter derivatives that evaluate directly via ∫ tan t dt = −ln|cos t|:

$$\mathbf{X}^{-1}(t)\,\mathbf{f}(t) = \begin{bmatrix} 1 - \tan t \\ 1 + \tan t \end{bmatrix} \implies \mathbf{x}(t) = \begin{bmatrix} (1+t)\cos t + t\sin t + (\cos t - \sin t)\ln|\cos t| \\ \cos t + (1+2t)\sin t + 2\cos t\ln|\cos t| \end{bmatrix}$$

> **COMMON TRAP (Trigonometric Fundamental Matrix Inversion):** Always account for the determinant sign when inverting \(\mathbf{X}(t)\) and evaluating its determinant \(\det\mathbf{X}(t)\). In Example 7.19, \(\det\mathbf{X}(t) = -1\). Overlooking this negative sign flips the signs of the \(\tan t\) components, creating severe physical errors in the logarithmic \(\ln|\cos t|\) trajectories.

---

## 6. Engineering Application: Modal Decoupling in Multi-DOF Systems

Multi-storey buildings and distributed mechanical assemblies are modeled by second-order coupled systems containing mass matrix \(\mathbf{M}\) and stiffness matrix \(\mathbf{K}\):

$$\mathbf{M}\,\mathbf{\ddot{x}} + \mathbf{K}\,\mathbf{x} = \mathbf{0}, \quad \mathbf{x}(t) = \mathbf{\Phi}\,\mathbf{q}(t) \implies \mathbf{\ddot{q}} + \mathbf{\Omega}^2\,\mathbf{q} = \mathbf{0}$$

Because mode shapes are mutually orthogonal with respect to both \(\mathbf{M}\) and \(\mathbf{K}\), transforming into modal coordinates completely eliminates cross-coupling, reducing the complex structure into independent 1-DOF harmonic oscillators.

---

## 7. Numerical and Analytical Verification

Every analytical trajectory computed in the workbench is subjected to live residual vector \(\mathbf{E}(t)\) verification against the governing differential equation:

$$\mathbf{E}(t) = \mathbf{\dot{x}}(t) - \mathbf{A}\,\mathbf{x}(t) - \mathbf{f}(t) \equiv \begin{bmatrix} 0 \\ 0 \end{bmatrix}, \quad |\mathbf{E}(t)| < 10^{-14}$$

> **INDEPENDENT VERIFICATION (Cross-Checking with RK4):** The matrix formulations and fundamental matrix integrals are independently benchmarked against a 4th-order Runge-Kutta (RK4) numerical integrator. In the interactive workbench, analytical and numerical curves overlay with differences bounded by \(< 10^{-6}\), confirming analytical precision.
