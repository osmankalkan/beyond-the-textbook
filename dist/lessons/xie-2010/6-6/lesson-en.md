# §6.6 Applications of the Laplace Transform

The Laplace transform provides an ideal framework for analyzing complex excitations encountered in structural dynamics, mechanical vibrations, electric circuits, and continuum mechanics. Piecewise continuous pulses, abrupt shock loads, periodic waveforms, and concentrated point forces convert directly into algebraic rational expressions in Laplace space.

This section explores the three major engineering applications covered in Wei-Chau Xie's textbook: single-degree-of-freedom (SDOF) vibration systems, electric circuits driven by periodic waveforms, and beams supported on elastic foundations.

## 1. Vibration of Single-Degree-of-Freedom (SDOF) Systems

The equation of motion of a single-degree-of-freedom mechanical oscillator with mass \(m\), viscous damping \(c\), and spring stiffness \(k\) is:

$$ m x''(t) + c x'(t) + k x(t) = f(t) $$

Dividing through by mass \(m\) recasts the equation into canonical modal form:

$$ x''(t) + 2\zeta \omega_n x'(t) + \omega_n^2 x(t) = \frac{1}{m} f(t) $$

Here the modal parameters are defined as:

$$ \omega_n = \sqrt{\frac{k}{m}}, \quad \zeta = \frac{c}{2\sqrt{km}}, \quad \omega_d = \omega_n \sqrt{1 - \zeta^2} $$

Under quiescent zero initial conditions, the system transfer function is:

$$ H(s) = \frac{1}{m(s^2 + 2\zeta \omega_n s + \omega_n^2)} $$

The inverse Laplace transform of this transfer function yields the fundamental unit impulse response (Green function):

$$ h(t) = \mathcal{L}^{-1}\{H(s)\} = \frac{1}{m \omega_d} e^{-\zeta \omega_n t} \sin \omega_d t $$

For an arbitrary excitation \(f(t)\), the forced response is computed directly via the convolution integral:

$$ x(t) = (h * f)(t) = \int_0^t h(u) f(t - u) du $$

## 2. Example 6.20: Structural Response Under Ramp Loading

A piecewise linear ramp force applied to a building rises linearly to \(F_0\) over duration \(t_1\), then remains constant for \(t \ge t_1\):

$$ f(t) = \frac{F_0}{t_1} \left[t - (t - t_1) H(t - t_1)\right] $$

Transforming via the second shifting theorem:

$$ F(s) = \frac{F_0}{t_1 s^2} \left(1 - e^{-t_1 s}\right) $$

For an undamped oscillator (\(\zeta = 0\)), the displacement transform is:

$$ X(s) = \frac{F_0}{m t_1} \frac{1 - e^{-t_1 s}}{s^2(s^2 + \omega_n^2)} $$

The elementary ramp response kernel inverts via partial fractions to:

$$ x_{\text{ramp}}(t) = \frac{F_0}{k t_1} \left(t - \frac{1}{\omega_n} \sin \omega_n t\right) $$

Superposition yields the full two-stage closed-form trajectory:

$$ x(t) = x_{\text{ramp}}(t) - x_{\text{ramp}}(t - t_1) H(t - t_1) $$

When the rise time \(t_1\) matches an integer multiple of the natural period \(T_n = 2\pi / \omega_n\) (\(t_1 = n T_n\)), residual vibration completely vanishes for \(t \ge t_1\), and the system settles seamlessly into static equilibrium.

> **MENTAL MODEL (THE PERFECT ELEVATOR RIDE):** If a load ramps up gradually and the rise time matches an integer multiple of the natural period (*t*₁ = *n* *Tₙ*), residual vibration vanishes identically when the ramp ends! High-speed elevator velocity profiles exploit this exact mathematical cancellation.

## 3. Example 6.21: Shock and Blast Half-Sine Pulse

A blast shock pulse of duration \(t_0\) is modeled by a half-sine waveform:

$$ f(t) = F_0 \sin\left(\frac{\pi t}{t_0}\right) \left[H(t) - H(t - t_0)\right] $$

Defining the pulse frequency \(\omega_p = \pi / t_0\) and applying trigonometric phase shift:

$$ F(s) = F_0 \frac{\omega_p}{s^2 + \omega_p^2} \left(1 + e^{-t_0 s}\right), \quad \omega_p = \frac{\pi}{t_0} $$

The response in the time domain is written with a delayed step:

$$ x(t) = g(t) + g(t - t_0) H(t - t_0) $$

Here the fundamental pulse kernel is:

$$ g(t) = \frac{F_0}{m(\omega_n^2 - \omega_p^2)} \left[\frac{\omega_p}{\omega_n} \sin \omega_n t - \sin \omega_p t\right] $$

In the limit as pulse duration \(t_0 \to 0\), this solution converges to the response of an ideal Dirac delta impulse with net momentum \(I = 2 F_0 t_0 / \pi\).

## 4. Example 6.22: Periodic Square-Wave Driven Electric Circuits

In a series RLC circuit, the governing equation for charge \(q(t)\) and current \(i(t) = q'(t)\) is:

$$ L q''(t) + R q'(t) + \frac{1}{C} q(t) = v(t), \quad i(t) = q'(t) $$

The Laplace transform of any periodic waveform \(f_{\text{per}}(t)\) with period \(T\) is given by:

$$ \mathcal{L}\{f_{\text{per}}(t)\} = \frac{1}{1 - e^{-sT}} \int_0^T e^{-st} f(t) dt $$

> **QUICK TIP (THE SECRET OF PERIODIC TRANSFORMS):** When facing an infinite periodic wave, never integrate to infinity! Simply integrate over the single fundamental period ([0, *T*]) and scale by 1 / (1 − *e*⁻ˢᵀ). That factor is nothing more than the closed-form sum of the infinite geometric series!

For a symmetric square wave with pulse width \(T/2\) and amplitude \(V_0\), the voltage transform is:

$$ V(s) = \frac{V_0}{s(1 + e^{-sT/2})} $$

The current transform follows from \(I(s) = s Q(s)\):

$$ I(s) = \frac{s V(s)}{L s^2 + R s + 1/C} = \frac{V_0}{1 + e^{-sT/2}} \frac{1}{L s^2 + R s + 1/C} $$

At each switching instant, circuit poles are excited, producing a damped high-frequency ringing oscillation across every half-period.

## 5. Section 6.6.3: Beams on Elastic Foundation

The deflection of a beam supported continuously on an elastic foundation (Winkler foundation) satisfies a 4th-order ODE:

$$ EI y^{(4)}(x) + k y(x) = w(x) $$

Here \(EI\) is the beam flexural rigidity and \(k\) is the subgrade reaction modulus. The characteristic equation is:

$$ s^4 + 4\beta^4 = 0 \implies \beta = \left(\frac{k}{4EI}\right)^{1/4} $$

The four complex conjugate roots are:

$$ s = \pm \beta (1 \pm i) $$

A concentrated point load \(P_0\) at \(x = a\) is modeled via a spatial Dirac delta:

$$ w(x) = P_0 \delta(x - a) \implies W(s) = P_0 e^{-as} $$

Enforcing boundedness conditions as \(x \to \pm \infty\) yields the deflection curve:

$$ y(x) = \frac{P_0 \beta}{2k} e^{-\beta |x - a|} \left[\cos(\beta |x - a|) + \sin(\beta |x - a|)\right] $$

Maximum deflection occurs directly beneath the point load, decaying exponentially symmetrically with distance.
