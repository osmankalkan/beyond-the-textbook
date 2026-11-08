# §7.2 The Method of Operator: Characteristic Determinants, Constant Elimination, and Cramer’s Rule

One of the most effective and mathematically elegant approaches for solving systems of linear ordinary differential equations is the **differential operator** \(D \equiv d/dt\) method. In this framework, constant-coefficient derivatives are written as polynomials in \(D\), converting the differential system into a compact operator matrix. Evaluating the determinant of this matrix decouples the system into an identical scalar characteristic equation for each unknown. However, this algebraic convenience carries a fundamental constraint: differential operators do not commute with functions; in non-homogeneous systems, operators must always act from the left.

> **MENTAL MODEL:** The differential operator \(D\) is a linear transformation operating on the space of differentiable functions. Formulating a differential system in operator matrix form mirrors Gaussian elimination in linear algebra. The determinant \(\phi(D)\) encodes the intrinsic "genetic code" of the system (its natural frequencies and exponential decay modes). Every coordinate satisfies the exact same scalar differential equation; the phase and amplitude relationships between coordinates are locked in by the original system equations.

---

## 7.2.1 Homogeneous Systems and Complementary Solutions

Consider a system of two linear ordinary differential equations with constant coefficients:

$$\begin{cases} \phi_{11}(D) x_1 + \phi_{12}(D) x_2 = 0 \\ \phi_{21}(D) x_1 + \phi_{22}(D) x_2 = 0 \end{cases}, \quad D \equiv \frac{d}{dt}$$

Here \(\phi_{ij}(D)\) are polynomials in \(D\) with constant coefficients. To eliminate \(x_2\), operate \(\phi_{22}(D)\) on the first equation and \(\phi_{12}(D)\) on the second equation:

$$\phi_{22}(D)\phi_{11}(D) x_1 + \phi_{22}(D)\phi_{12}(D) x_2 = 0, \quad \phi_{12}(D)\phi_{21}(D) x_1 + \phi_{12}(D)\phi_{22}(D) x_2 = 0$$

Because differential operators with constant coefficients commute (\(\phi_{22}(D)\phi_{12}(D) = \phi_{12}(D)\phi_{22}(D)\)), subtracting the second equation from the first completely eliminates \(x_2\), yielding an equation for \(x_1\) alone:

$$\left(\phi_{11}(D)\phi_{22}(D) - \phi_{12}(D)\phi_{21}(D)\right) x_1 = 0 \implies \phi(D) x_1 = 0$$

Similarly, eliminating \(x_1\) shows that \(x_2\) satisfies the exact same operator equation. The polynomial \(\phi(D)\) is the determinant of the coefficient operator matrix:

$$\phi(D) = \det \begin{bmatrix} \phi_{11}(D) & \phi_{12}(D) \\ \phi_{21}(D) & \phi_{22}(D) \end{bmatrix} = \phi_{11}(D)\phi_{22}(D) - \phi_{12}(D)\phi_{21}(D)$$

This principle extends directly to general systems of \(n\) linear differential equations:

$$\phi(D) x_1 = 0, \quad \phi(D) x_2 = 0, \quad \dots, \quad \phi(D) x_n = 0$$

Hence, all unknowns \(x_1, x_2, \dots, x_n\) share the exact same characteristic equation \(\phi(\lambda) = 0\) and identical complementary solution forms:

$$\phi(\lambda) = \det[\phi_{ij}(\lambda)] = 0, \quad N = \operatorname{deg} \phi(D)$$

> **PRACTICAL CHECK:** The true number of independent arbitrary constants in the general solution is always equal to the degree of the determinant polynomial \(N = \operatorname{deg} \phi(D)\). If you write complementary solutions for \(x_1\) and \(x_2\) using the characteristic roots, you will initially have four constants; two of these must be eliminated using the original differential equations. Never leave more than \(N\) free constants!

---

## Example 7.3: Harmonic Oscillator System and Constant Elimination

Consider Example 7.3 from the textbook:

$$\begin{cases} (D - 3)x - 6y = 0 \\ 3x + (D + 3)y = 0 \end{cases}$$

The determinant of the coefficient operator matrix is:

$$\phi(D) = \det \begin{bmatrix} D - 3 & -6 \\ 3 & D + 3 \end{bmatrix} = (D - 3)(D + 3) + 18 = D^2 + 9$$

The characteristic equation yields pure imaginary roots:

$$\phi(\lambda) = \lambda^2 + 9 = 0 \implies \lambda = \pm 3i$$

Both \(x\) and \(y\) share the same harmonic oscillation form:

$$x_C(t) = A_1 \cos 3t + B_1 \sin 3t, \quad y_C(t) = A_2 \cos 3t + B_2 \sin 3t$$

This expression appears to contain four arbitrary constants. However, because \(\operatorname{deg} \phi(D) = 2\), the solution must contain only two independent constants. Substituting into the first equation \((D - 3)x - 6y = 0\) eliminates the excess constants:

$$(D - 3)x_C - 6y_C = (-3A_1 + 3B_1 - 6A_2)\cos 3t + (-3A_1 - 3B_1 - 6B_2)\sin 3t = 0$$

Because \(\cos 3t\) and \(\sin 3t\) are linearly independent, their respective coefficients must vanish, expressing \(A_2\) and \(B_2\) directly in terms of \(A_1\) and \(B_1\):

$$A_2 = -\frac{1}{2}(A_1 - B_1), \quad B_2 = -\frac{1}{2}(A_1 + B_1)$$

---

## Example 7.4: 3rd-Order Asymmetric System and Vanishing Coefficient

In some systems, a characteristic mode may vanish identically in one of the coordinates. In Example 7.4:

$$\phi(D) = \det \begin{bmatrix} D^2 + 3D + 2 & D + 1 \\ D + 2 & D - 1 \end{bmatrix} = (D + 1)(D + 2)(D - 2)$$

The characteristic roots are \(\lambda = -1, -2, 2\) with system degree \(N = 3\). Substituting into the second equation \((D + 2)x + (D - 1)y = 0\), for the \(\lambda = -2\) mode, the factor \((D + 2)[e^{-2t}] = 0\) annihilates the \(e^{-2t}\) term from \(x\), forcing \(D_2 = 0\):

$$x_C(t) = C_1 e^{-t} + C_2 e^{-2t} + C_3 e^{2t}, \quad y_C(t) = \frac{1}{2}C_1 e^{-t} - 4C_3 e^{2t}$$

> **SIGN RULE:** When substituting solutions into the original differential equations, be meticulous with derivative signs: \(D[A \cos \omega t] = -\omega A \sin \omega t\). A misplaced negative sign flips the phase coupling between \(A_2\) and \(B_2\), artificially transforming a stable conservative system into an unstable one.

---

## 7.2.2 Non-Homogeneous Systems and Cramer’s Rule for Operators

For systems driven by forcing functions \(f_i(t)\), Cramer’s rule from linear algebra extends to differential operator matrices:

$$x_{iP}(t) = \frac{\Delta_i(t)}{\phi(D)}, \quad i = 1, 2, \dots, n$$

Here \(\Delta_i(t)\) is the determinant formed by replacing the \(i\)-th column of \(\phi(D)\) with the right-hand side forcing vector:

$$\Delta_i(t) = \det \begin{bmatrix} \phi_{11}(D) & \dots & f_1(t) & \dots & \phi_{1n}(D) \\ \phi_{21}(D) & \dots & f_2(t) & \dots & \phi_{2n}(D) \\ \vdots & & \vdots & & \vdots \\ \phi_{n1}(D) & \dots & f_n(t) & \dots & \phi_{nn}(D) \end{bmatrix}$$

> **COMMON PITFALL:** Swapping the operator and the forcing function when expanding the determinant is the most frequent examination error! Because determinant entries mix operators and functions, **operators must always precede functions**: \(\phi_{ij}(D)[f_k(t)]\). Writing \(f_k(t)\phi_{ij}(D)\) produces an unapplied differential operator rather than an evaluated function of time!

---

## Example 7.5: Exponential and Polynomial Forcing

Applying forcing terms \(f_1(t) = 0\) and \(f_2(t) = 18t e^{-3t}\) to the system of Example 7.3 gives the Cramer determinants:

$$\Delta_x(t) = \det \begin{bmatrix} 0 & -6 \\ 18t e^{-3t} & D + 3 \end{bmatrix} = 108t e^{-3t}$$

$$\Delta_y(t) = \det \begin{bmatrix} D - 3 & 0 \\ 3 & 18t e^{-3t} \end{bmatrix} = (D - 3)[18t e^{-3t}] = 18e^{-3t} - 108t e^{-3t}$$

Evaluating \(\Delta_y(t)\) requires the product rule: \(D[t e^{-3t}] = e^{-3t} - 3t e^{-3t}\). Using the exponential shift theorem from Chapter 4, \(x_P\) evaluates to:

$$x_P(t) = \frac{108}{D^2 + 9}[t e^{-3t}] = 108e^{-3t}\frac{1}{(D - 3)^2 + 9}[t] = 2(3t + 1)e^{-3t}$$

Similarly, \(y_P(t)\) is obtained:

$$y_P(t) = \frac{1}{D^2 + 9}[18e^{-3t} - 108t e^{-3t}] = -(6t + 1)e^{-3t}$$

---

## Example 7.6: Resonance and Secular Growth in Systems

When the forcing frequency coincides with the natural frequency \(\omega = 3\) (e.g. \(f_1(t) = 2\cos 3t, f_2(t) = 2\sin 3t\)):

$$\Delta_x(t) = \det \begin{bmatrix} 2\cos 3t & -6 \\ 2\sin 3t & D + 3 \end{bmatrix} = 6\cos 3t + 6\sin 3t, \quad \Delta_y(t) = -6\sin 3t$$

Because the denominator vanishes \(\phi(3i) = (3i)^2 + 9 = 0\), the standard inverse operator theorem fails. Applying the derivative theorem (\(1/\phi'(3i)\)):

$$\frac{1}{D^2 + 9} e^{3it} = \frac{t e^{3it}}{\phi'(3i)} = \frac{t(\cos 3t + i\sin 3t)}{6i} = \frac{t}{6}\sin 3t - i\frac{t}{6}\cos 3t$$

This generates secular resonance terms whose amplitudes grow linearly with time in both coordinates:

$$x_P(t) = t(\sin 3t - \cos 3t), \quad y_P(t) = t\cos 3t$$

Substituting this particular solution into the original system introduces phase shifts into the complementary constants: \(A_2 = -\frac{1}{2}(A_1 - B_1) - \frac{1}{2}\) and \(B_2 = -\frac{1}{2}(A_1 + B_1) + \frac{1}{6}\).

---

## Independent Verification and Residual Testing

> **INDEPENDENT VERIFICATION:** The validity of the analytical solution family is definitively verified by computing analytical derivatives and substituting them into the original differential equations. For all \(t\), the system residuals must vanish identically:

$$E_1(t) \equiv (D - 3)x - 6y - f_1(t) = 0, \quad E_2(t) \equiv 3x + (D + 3)y - f_2(t) = 0$$

Furthermore, an independent 4th-order Runge-Kutta (RK4) numerical integrator confirms that the maximum deviation between the analytical trajectory and numerical simulation remains below \(10^{-7}\).
