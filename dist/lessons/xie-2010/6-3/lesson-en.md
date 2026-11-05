# §6.3 Impulse Functions and the Dirac Delta Function

In engineering systems, forces acting over very brief durations or concentrated point loads on structures occur frequently. For example, consider an elastic ball of mass \(m\) moving at velocity \(v_0\) colliding with a rigid wall. During a short contact period \(\epsilon\), the wall exerts an intense opposing contact force \(f(t)\). The area under the force-time curve is the total impulse \(I\):

$$ I = \int_{t_0}^{t_0+\epsilon} f(t) dt $$

By the Impulse-Momentum Principle, the change in momentum equals the total impulse:

$$ m(v_1 - v_0) = I $$

## 1. From Rectangular Pulse to the Dirac Delta

As a mathematical idealization, consider a rectangular pulse of width \(\epsilon\) and height \(I/\epsilon\):

$$ f_\epsilon(t) = \frac{I}{\epsilon}\left[H(t - t_0) - H(t - (t_0 + \epsilon))\right] $$

As duration \(\epsilon\) shrinks (\(\epsilon \to 0\)), the pulse narrows and peak height \(I/\epsilon \to \infty\), while the enclosed area remains invariant at \(I\). For unit impulse \(I = 1\), the limiting function is called the unit impulse function or Dirac delta function, denoted by \(\delta(t - t_0)\):

$$ \delta(t - t_0) = \lim_{\epsilon \to 0} \frac{H(t - t_0) - H(t - (t_0 + \epsilon))}{\epsilon} $$

## 2. Properties of the Dirac Delta Function

The Dirac delta is not a function in the ordinary sense, but a generalized function (distribution). Its fundamental properties are:

1. It vanishes everywhere except at \(t = a\), where it diverges:

$$ \delta(t - a) = 0 \quad (t \neq a), \qquad \lim_{t \to a} \delta(t - a) = +\infty $$

2. Its total area (impulse) is strictly unity:

$$ \int_{a-\alpha}^{a+\alpha} \delta(t - a) dt = 1 \quad (\alpha > 0) $$

3. Sifting (Sampling) Property: For any continuous function \(g(t)\), integration extracts strictly the instantaneous value at the impulse time:

$$ \int_{a-\alpha}^{a+\alpha} g(t)\delta(t - a) dt = g(a) \quad (\alpha > 0) $$

4. Distributional derivative of the Heaviside unit step:

$$ \frac{dH(t - a)}{dt} = \delta(t - a) $$

> **MENTAL MODEL (THE CAMERA SNAPSHOT PROPERTY):** Integrating against δ(*t* − *a*) is like pausing a video and capturing a single snapshot at instant *t* = *a*. It destroys the integral sign completely, leaving only the instantaneous sample value *g*(*a*)!

## 3. Laplace Transform of the Dirac Delta

Using the sifting property with the Laplace kernel \(g(t) = e^{-st}\):

$$ \mathcal{L}\{\delta(t - a)\} = \int_0^\infty e^{-st} \delta(t - a) dt = e^{-as} \quad (a \ge 0) $$

In particular, a unit impulse at the origin \(a = 0\) gives \(\mathcal{L}\{\delta(t)\} = 1\), corresponding to a completely flat frequency spectrum.

For a modulated impulse multiplied by an arbitrary function \(f(t)\):

$$ \mathcal{L}\{f(t)\delta(t - a)\} = \int_0^\infty e^{-st} f(t)\delta(t - a) dt = e^{-as} f(a) \quad (a \ge 0) $$

Because the unilateral Laplace transform integrates over \(t \ge 0\), impulses occurring at negative times contribute zero:

$$ a < 0 \implies \mathcal{L}\{\delta(t - a)\} = \int_0^\infty e^{-st}\delta(t - a)dt = 0 $$

> **QUICK TIP (THE NUMBER ONE EXAM TRAP):** The unilateral Laplace transform only looks forward in time (*t* ≥ 0). If an exam throws δ(*t* + 2) or δ(*t* + 1) at you, write 0 immediately without calculating! An impulse at *t* = −2 lies strictly outside the integration domain.

## 4. Example 6.10 (Textbook Solution)

Evaluate the transform from textbook Example 6.10:

$$ F(s) = \mathcal{L}\left\{\cos \pi t \, \delta(t + 1) + 2\cos\left(\frac{\pi t}{6}\right)\delta(t - 2) + (t^3 - 2t^2 + 5)e^{4t}\delta(t - 3)\right\} $$

1. The first term has \(a = -1 < 0\), which lies outside the unilateral domain:

$$ \mathcal{L}\{\cos \pi t \, \delta(t + 1)\} = 0 $$

2. For the second term at \(a = 2\), the coefficient is \(2\cos(2\pi/6) = 2\cos(\pi/3) = 1\):

$$ \mathcal{L}\left\{2\cos\left(\frac{\pi t}{6}\right)\delta(t - 2)\right\} = 2\cos\left(\frac{\pi}{3}\right)e^{-2s} = e^{-2s} $$

3. For the third term at \(a = 3\), the coefficient is \((3^3 - 2\cdot 3^2 + 5)e^{12} = 14 e^{12}\):

$$ \mathcal{L}\left\{(t^3 - 2t^2 + 5)e^{4t}\delta(t - 3)\right\} = (27 - 18 + 5)e^{12}e^{-3s} = 14 e^{12} e^{-3s} $$

Summing all components yields the final result:

$$ F(s) = e^{-2s} + 14 e^{12} e^{-3s} $$

## 5. Engineering Applications: Beam and Vibration Models

A distributed load approaches a concentrated load \(W\) in the limit \(\epsilon \to 0\):

$$ W = \lim_{\epsilon \to 0} \int_{a - \epsilon/2}^{a + \epsilon/2} w(x) dx = \int_{a - \epsilon/2}^{a + \epsilon/2} W\delta(x - a)dx = W $$

The fourth-order differential equation for beam deflection with flexural rigidity \(EI\) is:

$$ \frac{d^2}{dx^2}\left(EI(x)\frac{d^2 y}{dx^2}\right) = w(x) $$

Combined beam loading with both distributed and point loads:

$$ w(x) = w_0\left[H(x - b_1) - H(x - b_2)\right] + W_1\delta(x - a_1) + W_2\delta(x - a_2) $$

Taking the Laplace transform, concentrated loads produce pure exponentials without an \(s\) divisor:

$$ W(s) = w_0\frac{e^{-b_1 s} - e^{-b_2 s}}{s} + W_1 e^{-a_1 s} + W_2 e^{-a_2 s} $$

In structural vibration, an oscillator subjected to an impulse \(m x'' + k x = I\delta(t - t_0)\):

$$ m x''(t) + k x(t) = I \delta(t - t_0), \quad x(0) = 0, \quad x'(0) = 0 $$

The Laplace transform response:

$$ X(s) = \frac{I}{m}\frac{e^{-t_0 s}}{s^2 + \omega_0^2}, \quad \omega_0 = \sqrt{\frac{k}{m}} $$

The time-domain Green impulse response:

$$ x(t) = \frac{I}{m\omega_0}\sin(\omega_0(t - t_0))H(t - t_0) $$

This solution proves position remains continuous at impact, while velocity exhibits a jump discontinuity of \(\Delta v = I/m\):

$$ \Delta x' = x'(t_0^+) - x'(t_0^-) = \frac{I}{m} $$
