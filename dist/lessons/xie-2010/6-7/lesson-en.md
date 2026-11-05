# §6.7 Chapter Summary and Method Navigator

The Laplace transform is the most comprehensive analytical framework in engineering for ordinary differential equations, initial value problems (IVPs), discontinuous step and shock excitations, periodic waveforms, and foundation boundary value problems.

All theoretical properties, canonical transform pairs, and practical solution workflows presented throughout Chapter 6 of Wei-Chau Xie's textbook are synthesized in this capstone summary module.

## 1. Fundamental Properties of the Laplace Transform (Table 6.3)

The core operational theorems of the Laplace transform are:

1. Linearity:

$$ \mathcal{L}\{c_1 f_1(t) + c_2 f_2(t)\} = c_1 F_1(s) + c_2 F_2(s) $$

2. First Shifting Theorem (Frequency translation):

$$ \mathcal{L}\{e^{at} f(t)\} = F(s - a) $$

3. Second Shifting Theorem (Time delay):

$$ \mathcal{L}\{f(t - a) H(t - a)\} = e^{-as} F(s) $$

4. Scaling Property:

$$ \mathcal{L}\{f(at)\} = \frac{1}{a} F\left(\frac{s}{a}\right) $$

5. Frequency Differentiation (Multiplication by \(t^n\)):

$$ \mathcal{L}\{t^n f(t)\} = (-1)^n \frac{d^n}{ds^n} F(s) $$

6. Frequency Integration (Division by \(t\)):

$$ \mathcal{L}\left\{\frac{f(t)}{t}\right\} = \int_s^\infty F(\sigma) d\sigma $$

7. Transform of the first derivative:

$$ \mathcal{L}\{f'(t)\} = s F(s) - f(0) $$

8. Transform of the second derivative:

$$ \mathcal{L}\{f''(t)\} = s^2 F(s) - s f(0) - f'(0) $$

9. Transform of the general \(n\)-th derivative:

$$ \mathcal{L}\left\{f^{(n)}(t)\right\} = s^n F(s) - s^{n-1} f(0) - \dots - f^{(n-1)}(0) $$

10. Transform of integrals:

$$ \mathcal{L}\left\{\int_0^t f(u) du\right\} = \frac{F(s)}{s} $$

11. Transform of periodic functions (\(f(t + T) = f(t)\)):

$$ \mathcal{L}\{f_{\text{per}}(t)\} = \frac{1}{1 - e^{-sT}} \int_0^T e^{-st} f(t) dt $$

12. Transform of the Dirac delta impulse:

$$ \mathcal{L}\{\delta(t - a)\} = e^{-as}, \quad \mathcal{L}\{\delta(t)\} = 1 $$

13. Dirac delta sifting integral:

$$ \int_{-\infty}^\infty g(t) \delta(t - a) dt = g(a) $$

14. Convolution Integral Theorem:

$$ \mathcal{L}^{-1}\{F(s) G(s)\} = (f * g)(t) = \int_0^t f(u) g(t - u) du $$

## 2. Differential Equation Solution Architecture

Transforming a linear constant-coefficient initial value problem into the complex \(s\)-domain yields:

$$ P(s) Y(s) = Q(s) + F(s) $$

The solution decomposes into two fundamental physical components:

$$ y(t) = \mathcal{L}^{-1}\left\{\frac{Q(s)}{P(s)}\right\} + \mathcal{L}^{-1}\left\{\frac{F(s)}{P(s)}\right\} = y_{\text{free}}(t) + y_{\text{forced}}(t) $$

1. **Zero-Input Response (ZIR / Free Response):** Natural vibration driven exclusively by initial energy stored in \(y(0), y'(0)\).
2. **Zero-State Response (ZSR / Forced Response):** Forced response driven strictly by external input \(f(t)\) starting from rest.

With transfer function \(H(s) = 1 / P(s)\), the forced response maps directly to convolution:

$$ H(s) = \frac{1}{P(s)} \implies y_{\text{forced}}(t) = (h * f)(t) $$

> **MENTAL MODEL (THE BIRD'S-EYE VIEW OF CHAPTER 6):** The Laplace method is simply a 3-step bridge: Fly the differential equation from time to frequency space (ℒ), solve for *Y*(*s*) algebraically, and fly back to time space via partial fractions or convolution (ℒ⁻¹). Whenever lost, remember the three-step bridge!

## 3. Inverse Laplace Transforms and Resonance

Inverse transformation strategies are governed by pole morphology:

1. **Distinct Real Poles:** Residues are determined directly via the Heaviside cover-up method.
2. **Repeated Quadratic Resonant Poles:** When forcing frequency matches natural frequency, repeated factors \((s^2 + \omega^2)^2\) emerge; the convolution theorem delivers the secular resonance response:

$$ \mathcal{L}^{-1}\left\{\frac{s}{(s^2 + \omega^2)^2}\right\} = \frac{1}{2\omega} t \sin \omega t $$

3. **Irreducible Complex Conjugate Poles:** Denominators are completed into squares, resolving into damped sinusoidal modes:

$$ \frac{Bs + C}{(s - \alpha)^2 + \beta^2} = B \frac{s - \alpha}{(s - \alpha)^2 + \beta^2} + \frac{C + B\alpha}{\beta} \frac{\beta}{(s - \alpha)^2 + \beta^2} $$

4. **Delayed Polynomials and Step Forcing:** Expressions of the form \(P(t) H(t - a)\) transform via Taylor shifting:

$$ P(t) H(t - a) = P((t - a) + a) H(t - a) $$

## 4. Limit and Verification Theorems

Boundary behavior of dynamic trajectories is validated through limit theorems:

1. Initial Value Theorem:

$$ \lim_{t \to 0^+} f(t) = \lim_{s \to \infty} [s F(s)] $$

2. Final Value Theorem (provided all poles reside in the open left half-plane):

$$ \lim_{t \to \infty} f(t) = \lim_{s \to 0} [s F(s)] $$

> **QUICK TIP (THE 10-SECOND EXAM VERIFICATION):** After finding an inverse transform, verify your work in 10 seconds: Check that the *t* → 0 limit matches the given initial condition *y*(0) via the Initial Value Theorem before moving on!

## 5. Engineering Synthesis

The crowning analytical kernels derived across Chapter 6 engineering applications include:

1. Green impulse response of a single-degree-of-freedom (SDOF) damped oscillator:

$$ h(t) = \frac{1}{m \omega_d} e^{-\zeta \omega_n t} \sin \omega_d t $$

2. Deflection profile of an infinite beam on a Winkler elastic foundation under a point load:

$$ y(x) = \frac{P_0 \beta}{2k} e^{-\beta |x - a|} \left[\cos(\beta |x - a|) + \sin(\beta |x - a|)\right] $$
