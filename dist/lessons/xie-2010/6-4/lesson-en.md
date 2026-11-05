# §6.4 The Inverse Laplace Transform

In solving differential equations by the Laplace transform, the final and most algebraically demanding step is returning from the frequency domain function \(F(s)\) to the time domain solution \(f(t) = \mathcal{L}^{-1}\{F(s)\}\).

The inverse Laplace operator \(\mathcal{L}^{-1}\) is a linear operator:

$$ \mathcal{L}^{-1}\{c_1 F_1(s) + c_2 F_2(s)\} = c_1 \mathcal{L}^{-1}\{F_1(s)\} + c_2 \mathcal{L}^{-1}\{F_2(s)\} $$

## 1. Fundamental Properties of the Inverse Transform

Forward properties translate directly into inverse operational rules:

1. Inverse of the first frequency shifting property:

$$ \mathcal{L}^{-1}\{F(s - a)\} = e^{at} f(t) $$

2. Inverse of differentiation in the frequency domain:

$$ \mathcal{L}^{-1}\left\{F^{(n)}(s)\right\} = (-1)^n t^n f(t) $$

3. Inverse of the second shifting theorem (Heaviside step delay):

$$ \mathcal{L}^{-1}\{e^{-as} F(s)\} = f(t - a) H(t - a) $$

## 2. Examples 6.11 and 6.12 (Shifting and Step Inversion)

**Example 6.11:** A fraction with a higher-order repeated pole:

$$ F(s) = \frac{s}{(s - 2)^5} = \frac{(s - 2) + 2}{(s - 2)^5} = \frac{1}{(s - 2)^4} + \frac{2}{(s - 2)^5} $$

Using the first shift and \(\mathcal{L}^{-1}\{1/s^n\} = t^{n-1}/(n-1)!\):

$$ f(t) = e^{2t}\mathcal{L}^{-1}\left\{\frac{1}{s^4}\right\} + 2e^{2t}\mathcal{L}^{-1}\left\{\frac{1}{s^5}\right\} = e^{2t}\left[\frac{t^3}{3!} + 2\frac{t^4}{4!}\right] $$

Factoring out yields the compact solution:

$$ f(t) = \frac{1}{12} e^{2t} t^3 (2 + t) $$

**Example 6.12:** Inversion involving delayed step components:

$$ F(s) = \frac{1 + e^{-3s}}{s^4} = \frac{1}{s^4} + \frac{e^{-3s}}{s^4} $$

Applying the second shifting property term by term:

$$ f(t) = \frac{1}{6} t^3 + \frac{1}{6} (t - 3)^3 H(t - 3) $$

## 3. The Convolution Integral Theorem

If \(\mathcal{L}^{-1}\{F(s)\} = f(t)\) and \(\mathcal{L}^{-1}\{G(s)\} = g(t)\), the product in the s-domain maps to the convolution integral in the time domain:

$$ \mathcal{L}^{-1}\{F(s)G(s)\} = (f * g)(t) = \int_0^t f(u) g(t - u) du = \int_0^t g(u) f(t - u) du $$

> **MENTAL MODEL (NOT POINTWISE MULTIPLICATION, BUT ACCUMULATED MEMORY):** The frequency product *F*(*s*)*G*(*s*) does NOT invert to a simple product *f*(*t*)*g*(*t*)! Convolution is a continuous memory integral that blends and accumulates all past impulse responses.

**Example 6.13 (Resonance Analysis):** Fraction with repeated quadratic poles:

$$ \mathcal{L}^{-1}\left\{\frac{s}{(s^2 + 4)^2}\right\} = \frac{1}{2} \mathcal{L}^{-1}\left\{\frac{2}{s^2 + 2^2} \cdot \frac{s}{s^2 + 2^2}\right\} = \frac{1}{2} (\sin 2t * \cos 2t) $$

Applying the product-to-sum trigonometric identity:

$$ \frac{1}{2}\int_0^t \sin 2u \cos(2(t - u)) du = \frac{1}{4} \int_0^t [\sin 2t + \sin(4u - 2t)] du $$

Integration causes oscillating boundary terms to cancel out, leaving secular resonance growth:

$$ \mathcal{L}^{-1}\left\{\frac{s}{(s^2 + 4)^2}\right\} = \frac{1}{4} t \sin 2t $$

## 4. Partial Fraction Decomposition

In solving differential equations, rational expressions are strictly proper (\(m < n\)):

$$ \frac{N(s)}{D(s)} = \frac{a_m s^m + \dots + a_0}{b_n s^n + \dots + b_0}, \quad m < n $$

1. **Distinct Real Roots:** For distinct linear factors:

$$ \frac{N(s)}{(s - r_1)(s - r_2)\dots(s - r_n)} = \frac{A_1}{s - r_1} + \frac{A_2}{s - r_2} + \dots + \frac{A_n}{s - r_n} $$

Each residue coefficient is evaluated rapidly via the Heaviside cover-up method:

$$ A_k = \lim_{s \to r_k} (s - r_k) \frac{N(s)}{D(s)} $$

> **QUICK TIP (THE HEAVISIDE THUMB RULE):** For simple poles (*s* − *rₖ*), never solve tedious linear systems! Mask the pole factor with your thumb and substitute *s* = *rₖ* into the remaining expression; the residue coefficient appears in one second!

2. **Repeated Roots:** For a repeated factor \((s - r)^m\), write descending powers:

$$ \frac{N(s)}{(s - r)^m} = \frac{A_m}{(s - r)^m} + \frac{A_{m-1}}{(s - r)^{m-1}} + \dots + \frac{A_1}{s - r} $$

3. **Irreducible Quadratic Factors:** Complete the square:

$$ s^2 + \alpha s + \beta = (s - a)^2 + \omega^2, \quad a = -\frac{\alpha}{2}, \quad \omega = \sqrt{\beta - \frac{\alpha^2}{4}} $$

Decompose the linear numerator into damped cosine and sine kernels:

$$ \frac{A s + B}{(s - a)^2 + \omega^2} = A \frac{s - a}{(s - a)^2 + \omega^2} + \frac{B + A a}{\omega} \frac{\omega}{(s - a)^2 + \omega^2} $$

## 5. Solutions to Examples 6.14 and 6.15

**Example 6.14:** Combination of a real pole and complex conjugate poles:

$$ \frac{4}{(s - 1)(s^2 + 2s + 5)} = \frac{A}{s - 1} + \frac{B s + C}{(s + 1)^2 + 4} $$

Using cover-up and matching coefficients:

$$ A = \frac{1}{2}, \quad B = -\frac{1}{2}, \quad C = -\frac{3}{2} $$

Taking the inverse Laplace transform gives the time response:

$$ f(t) = \frac{1}{2} e^t - \frac{1}{2} e^{-t}(\cos 2t + \sin 2t) $$

**Example 6.15:** Bi-quadratic denominators with distinct frequencies:

$$ \frac{s + 1}{(s^2 + 1)(s^2 + 9)} = \frac{1}{8}\left[\frac{s + 1}{s^2 + 1} - \frac{s + 1}{s^2 + 9}\right] $$

Inverting term-by-term yields the bi-harmonic oscillation:

$$ f(t) = \frac{1}{8}\left[\cos t + \sin t - \cos 3t - \frac{1}{3}\sin 3t\right] $$
