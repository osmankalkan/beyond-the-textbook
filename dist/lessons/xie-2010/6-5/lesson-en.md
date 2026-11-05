# §6.5 Solving Differential Equations Using the Laplace Transform

The most powerful engineering application of the Laplace transform is its ability to solve initial value problems (IVPs) directly. Classical methods require finding the general complementary solution first, computing a particular integral via undetermined coefficients or variation of parameters, and finally solving an algebraic system for arbitrary constants by enforcing initial conditions. The Laplace transform unifies all three stages into a single streamlined algebraic operation.

Transform properties for derivatives convert a linear differential equation in time into an algebraic rational equation in the complex frequency variable \(s\).

## 1. The Laplace Transform of Derivatives

The Laplace transform of derivatives of \(y(t)\) is derived directly by integration by parts:

1. Transform of the first derivative:

$$ \mathcal{L}\{y'(t)\} = s Y(s) - y(0) $$

2. Transform of the second derivative:

$$ \mathcal{L}\{y''(t)\} = s^2 Y(s) - s y(0) - y'(0) $$

3. Transform of the third derivative:

$$ \mathcal{L}\{y'''(t)\} = s^3 Y(s) - s^2 y(0) - s y'(0) - y''(0) $$

4. General \(n\)-th order derivative:

$$ \mathcal{L}\left\{y^{(n)}(t)\right\} = s^n Y(s) - s^{n-1} y(0) - s^{n-2} y'(0) - \dots - y^{(n-1)}(0) $$

Notice that the initial conditions \(y(0), y'(0), \dots, y^{(n-1)}(0)\) are naturally embedded as an algebraic polynomial during the transformation process.

## 2. Algebraic Structure of Initial Value Problems

Consider a general linear constant-coefficient \(n\)-th order differential equation:

$$ a_n y^{(n)} + a_{n-1} y^{(n-1)} + \dots + a_1 y' + a_0 y = f(t) $$

Applying the Laplace transform to both sides:

$$ P(s) Y(s) - Q(s) = F(s) $$

Here \(P(s) = a_n s^n + \dots + a_1 s + a_0\) is the characteristic polynomial; \(Q(s)\) is the initial condition polynomial; and \(F(s) = \mathcal{L}\{f(t)\}\) is the transform of the external forcing input. Solving algebraically for \(Y(s)\):

$$ Y(s) = \frac{Q(s)}{P(s)} + \frac{F(s)}{P(s)} $$

This yields the fundamental decomposition of dynamic systems:

$$ y(t) = y_{\text{free}}(t) + y_{\text{forced}}(t) = \mathcal{L}^{-1}\left\{\frac{Q(s)}{P(s)}\right\} + \mathcal{L}^{-1}\left\{\frac{F(s)}{P(s)}\right\} $$

1. **Zero-Input Response (ZIR / Free Response):** With zero external excitation (\(F(s) = 0\)), motion is driven entirely by initial stored energy.
2. **Zero-State Response (ZSR / Forced Response):** With zero initial conditions (\(Q(s) = 0\)), motion is driven strictly by external forcing.

Defining the transfer function as \(H(s) = 1 / P(s)\), the forced response can also be viewed as a convolution integral:

$$ H(s) = \frac{1}{P(s)} \implies y_{\text{forced}}(t) = \mathcal{L}^{-1}\{H(s) F(s)\} = (h * f)(t) $$

> **MENTAL MODEL (WHAT ARE ZIR AND ZSR?):** Imagine a guitar string: Pluck and release it; the sound is pure initial stored energy (ZIR - Zero-Input Response). Tap it rhythmically while initially at rest; that is external forcing (ZSR - Zero-State Response). The total response is their linear superposition!

## 3. Example 6.16: Resonant Second-Order Oscillator

Solve the initial value problem:

$$ y'' - 8y' + 25y = e^{4t} \sin 3t, \quad y(0) = 1, \quad y'(0) = 4 $$

Transform both sides into the \(s\)-domain:

$$ (s^2 Y(s) - s - 4) - 8(s Y(s) - 1) + 25 Y(s) = \frac{3}{(s - 4)^2 + 9} $$

Collecting the initial condition terms:

$$ (s^2 - 8s + 25) Y(s) = (s - 4) + \frac{3}{(s - 4)^2 + 9} $$

Because \(s^2 - 8s + 25 = (s - 4)^2 + 9\), dividing through yields:

$$ Y(s) = \frac{s - 4}{(s - 4)^2 + 9} + \frac{3}{((s - 4)^2 + 9)^2} $$

The first term inverts via the first shifting theorem to \(e^{4t} \cos 3t\). The second term inverts via the repeated quadratic resonance theorem (Example 6.13) combined with first shifting:

$$ y(t) = e^{4t} \cos 3t + \frac{1}{18} e^{4t} (\sin 3t - 3t \cos 3t) $$

The secular term \(t \cos 3t\) embodies resonance produced by exact matching between external forcing and the system natural frequency.

## 4. Example 6.17: Piecewise and Discontinuous Forcing

The most striking advantage of the Laplace transform over classical calculus is that piecewise and step excitations require no boundary stitching:

$$ y'' + 4y = f(t), \quad y(0) = 0, \quad y'(0) = 0 $$

Here \(f(t)\) is piecewise defined: \(f(t) = 4t\) for \(0 \le t < 1\), and \(f(t) = 4\) for \(t \ge 1\).

> **QUICK TIP (WHY USE LAPLACE AT ALL?):** Under classical calculus, we would solve for separate constants for *t* < 1 and *t* ≥ 1, matching position and velocity at the boundary over 3 pages. Laplace unifies the entire piecewise timeline into a single algebraic line via the Heaviside step!

Using the Heaviside step function:

$$ f(t) = 4t - 4(t - 1) H(t - 1) $$

Transforming via the second shifting theorem:

$$ F(s) = \frac{4}{s^2} - \frac{4 e^{-s}}{s^2} = \frac{4(1 - e^{-s})}{s^2} $$

The output transform becomes:

$$ Y(s) = \frac{4(1 - e^{-s})}{s^2(s^2 + 4)} = (1 - e^{-s}) \left[\frac{1}{s^2} - \frac{1}{s^2 + 4}\right] $$

Inverting the kernel bracket yields \(g(t) = t - \frac{1}{2}\sin 2t\). Applying the inverse second shifting theorem:

$$ y(t) = \left(t - \frac{1}{2} \sin 2t\right) - \left[(t - 1) - \frac{1}{2} \sin 2(t - 1)\right] H(t - 1) $$

Classical calculus would demand solving separate ODEs for \(t < 1\) and \(t > 1\), followed by matching position and velocity at \(t = 1\); Laplace solves the full trajectory in a unified formula.

## 5. Example 6.18: Delayed Polynomial Forcing & Taylor Expansion

A third-order initial value problem with delayed excitation:

$$ y''' - y'' + 4y' - 4y = 40(t^2 + t + 1) H(t - 2) $$

Initial conditions: \(y(0) = 5, y'(0) = 0, y''(0) = 10\).

To apply the second shifting theorem, expand the polynomial around \(t = (t - 2) + 2\):

$$ t^2 + t + 1 = (t - 2)^2 + 5(t - 2) + 7 $$

The Laplace transform incorporates the delay factor \(e^{-2s}\):

$$ F(s) = 40 e^{-2s} \left(\frac{2}{s^3} + \frac{5}{s^2} + \frac{7}{s}\right) $$

Factoring the characteristic polynomial \((s - 1)(s^2 + 4)\) and computing inverse residues produces the complete exact trajectory.

## 6. Example 6.19: Dirac Delta Impulse and Velocity Jump

An initially undisturbed damped oscillator subjected to an ideal impulse at \(t = a\):

$$ y'' + 2\zeta \omega_0 y' + \omega_0^2 y = I \delta(t - a), \quad y(0) = 0, \quad y'(0) = 0 $$

Transforming gives the RHS as \(I e^{-as}\), and with damped frequency \(\omega_d = \omega_0 \sqrt{1 - \zeta^2}\):

$$ y(t) = \frac{I}{\omega_d} e^{-\zeta \omega_0 (t - a)} \sin[\omega_d (t - a)] H(t - a) $$

At impact \(t = a\), displacement remains continuous with \(y(a) = 0\), while velocity jumps instantaneously by \(y'(a^+) - y'(a^-) = I\). This reflects the impulse-momentum theorem in closed analytic form.
