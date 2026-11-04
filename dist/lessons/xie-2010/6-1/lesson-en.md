# §6.1 The Laplace Transform: Definition, Properties, and Elementary Transform Table

Differential equations model engineering dynamics—such as vibrations, electric circuits, heat conduction, and fluid transport—in the time domain (\(t\)). However, when dealing with constant-coefficient derivative terms, discontinuous forcing functions, or impulsive loads, traditional time-domain methods and complementary-particular solution splits often become cumbersome.

**The Laplace transform** is an integral-based linear operator that converts differentiation and integration operations in the time domain into **elementary algebraic operations** in the complex frequency domain (\(s\)):

$$ F(s) = \mathcal{L}\{f(t)\} = \int_0^\infty e^{-st} f(t)\,\mathrm{d}t = \lim_{M \to \infty} \int_0^M e^{-st} f(t)\,\mathrm{d}t $$

Through this transform, a linear differential equation reduces directly to an algebraic equation in the unknown \(F(s)\). Initial conditions \(f(0)\) and \(f'(0)\) are automatically embedded into the transformed equation via derivative properties, eliminating the post-solution struggle of fitting free constants.

---

## 1. Definition, Convergence Criterion, and Exponential Order

The Laplace integral is an **improper integral** over the half-line \(t \ge 0\). For this integral to converge to a finite value, two standard conditions must be satisfied:

1. **Piecewise continuity:** The function \(f(t)\) must be piecewise continuous on every finite interval \([0, M]\), having at most a finite number of jump discontinuities.
2. **Exponential order:** For sufficiently large \(t \ge T\), there must exist a positive constant \(M\) and a real constant \(s_0\) such that the function is bounded by an exponential envelope:

$$ |f(t)| \le M e^{s_0 t}, \qquad t \ge T $$

The parameter \(s_0\) is known as the **exponential order** (or **abscissa of convergence**). As long as the real part satisfies \(s > s_0\), the kernel \(e^{-st}\) dominates and dampens the growth of \(f(t)\), rendering the integral absolutely convergent. For example:
- For \(f(t) = 1, t^n, \sin\omega t, \cos\omega t\), the order is \(s_0 = 0\) (converges for \(s > 0\)).
- For \(f(t) = e^{at}\) and \(e^{at}\sin\omega t\), the order is \(s_0 = a\) (converges for \(s > a\)).
- However, \(f(t) = e^{t^2}\) is not of exponential order; its Laplace transform does not exist for any real \(s\).

---

## 2. Elementary Transforms (Example 6.1)

### 2.1 Constant Function: \(f(t) = 1\)

Applying the defining integral directly:

$$ \mathcal{L}\{1\} = \int_0^\infty e^{-st} 1\,\mathrm{d}t = \left[-\frac{1}{s}e^{-st}\right]_0^\infty = \frac{1}{s}, \qquad s > 0 $$

Since \(s > 0\), the upper limit vanishes (\(e^{-st} \to 0\)) as \(t \to \infty\), leaving \(1/s\) from the lower limit.

### 2.2 Exponential Function: \(f(t) = e^{at}\)

Combining the exponential bases inside the integrand:

$$ \mathcal{L}\{e^{at}\} = \int_0^\infty e^{-st} e^{at}\,\mathrm{d}t = \int_0^\infty e^{-(s-a)t}\,\mathrm{d}t = \frac{1}{s-a}, \qquad s > a $$

For convergence, the exponent coefficient must be strictly negative: \(s - a > 0 \Longrightarrow s > a\).

### 2.3 Sine and Cosine: Simultaneous Derivation via Euler's Identity

Rather than evaluating two separate integration-by-parts calculations for \(\cos\omega t\) and \(\sin\omega t\), Euler's formula unifies both transforms into a single exponential integral:

$$ e^{i\omega t} = \cos\omega t + i\sin\omega t $$

The Laplace transform of \(e^{i\omega t}\) follows directly from the exponential rule (\(a = i\omega\)):

$$ \mathcal{L}\{e^{i\omega t}\} = \int_0^\infty e^{-(s-i\omega)t}\,\mathrm{d}t = \left[-\frac{1}{s-i\omega}e^{-(s-i\omega)t}\right]_0^\infty = \frac{1}{s-i\omega}, \qquad s > 0 $$

Multiplying numerator and denominator by the complex conjugate \((s + i\omega)\) real-values the denominator:

$$ \frac{1}{s-i\omega} = \frac{s+i\omega}{(s-i\omega)(s+i\omega)} = \frac{s+i\omega}{s^2+\omega^2} $$

Equating real and imaginary parts produces both transforms simultaneously:

$$ \mathcal{L}\{\cos\omega t\} = \frac{s}{s^2+\omega^2}, \qquad \mathcal{L}\{\sin\omega t\} = \frac{\omega}{s^2+\omega^2}, \qquad s > 0 $$

---

## 3. Core Properties of the Laplace Transform

### 3.1 Linearity Property

Because integration is linear, the Laplace transform is a **linear operator**. Scalar constants factor out and sums decompose:

$$ \mathcal{L}\{c_1 f_1(t) + c_2 f_2(t)\} = c_1 \mathcal{L}\{f_1(t)\} + c_2 \mathcal{L}\{f_2(t)\} $$

### 3.2 Transform of Derivatives (Algebraizing Differential Equations)

The transform of \(f'(t)\) is evaluated via integration by parts (\(u = e^{-st}\), \(\mathrm{d}v = f'(t)\mathrm{d}t\)):

$$ \mathcal{L}\{f'(t)\} = \int_0^\infty e^{-st} f'(t)\,\mathrm{d}t = \left[e^{-st} f(t)\right]_0^\infty - \int_0^\infty f(t)(-s e^{-st})\,\mathrm{d}t = s F(s) - f(0) $$

This fundamental formula extends inductively to higher-order derivatives:

$$ \mathcal{L}\{f''(t)\} = s \mathcal{L}\{f'(t)\} - f'(0) = s\bigl(s F(s) - f(0)\bigr) - f'(0) = s^2 F(s) - s f(0) - f'(0) $$

In general, for the \(n\)-th derivative:

$$ \mathcal{L}\{f^{(n)}(t)\} = s^n F(s) - s^{n-1} f(0) - s^{n-2} f'(0) - \cdots - s f^{(n-2)}(0) - f^{(n-1)}(0) $$

> **Core Insight:** The \(n\)-th derivative transforms into the leading algebraic term \(s^n F(s)\) minus a polynomial in \(s\) encoding the initial conditions. This converts differential operations into algebraic multiplication!

### 3.3 First Shifting Property (Frequency Shift)

Multiplying a time-domain signal by \(e^{at}\) shifts the complex frequency variable by \(s \to s - a\):

$$ \mathcal{L}\{e^{at} f(t)\} = \int_0^\infty e^{-st} e^{at} f(t)\,\mathrm{d}t = \int_0^\infty e^{-(s-a)t} f(t)\,\mathrm{d}t = F(s-a) $$

This property allows immediate derivation of damped oscillations (\(e^{at}\cos\omega t\), \(e^{at}\sin\omega t\)) and shifted polynomials (\(t^n e^{at}\)) without re-integrating.

### 3.4 Differentiation in the s-Domain (Multiplication by t)

Differentiating \(F(s)\) under the integral sign with respect to the parameter \(s\):

$$ \frac{\mathrm{d}}{\mathrm{d}s} F(s) = \frac{\mathrm{d}}{\mathrm{d}s} \int_0^\infty e^{-st} f(t)\,\mathrm{d}t = \int_0^\infty (-t)e^{-st} f(t)\,\mathrm{d}t = -\mathcal{L}\{t f(t)\} $$

Therefore, multiplication by \(t\) in the time domain corresponds to differentiation and sign reversal in the \(s\)-domain:

$$ \mathcal{L}\{t f(t)\} = -\frac{\mathrm{d}}{\mathrm{d}s} F(s) = -F'(s) $$

Iterating this rule for \(t^n\):

$$ \mathcal{L}\{t^n f(t)\} = (-1)^n \frac{\mathrm{d}^n}{\mathrm{d}s^n} F(s) = (-1)^n F^{(n)}(s), \qquad n = 1, 2, \dots $$

---

## 4. Textbook Worked Examples

### 4.1 Example 6.2: Polynomial Transform \(f(t) = t^n\) (Two Independent Proofs)

**Method 1 (Derivative Recurrence):**
For \(f(t) = t^n\), the derivative is \(f'(t) = n t^{n-1}\) with \(f(0) = 0\). The derivative transform gives:

$$ \mathcal{L}\{n t^{n-1}\} = s \mathcal{L}\{t^n\} - 0 \quad \Longrightarrow \quad \mathcal{L}\{t^n\} = \frac{n}{s}\mathcal{L}\{t^{n-1}\} $$

Beginning from \(\mathcal{L}\{1\} = 1/s\):
- \(n = 1\): \(\mathcal{L}\{t\} = (1/s)(1/s) = 1/s^2\)
- \(n = 2\): \(\mathcal{L}\{t^2\} = (2/s)(1/s^2) = 2!/s^3\)
- \(n = 3\): \(\mathcal{L}\{t^3\} = (3/s)(2/s^3) = 3!/s^4\)

By mathematical induction:

$$ \mathcal{L}\{t^n\} = \frac{n!}{s^{n+1}}, \qquad s > 0, \quad n = 0, 1, 2, \dots $$

**Method 2 (\(s\)-Domain Differentiation):**
Setting \(t^n = t^n \cdot 1\) with base transform \(F(s) = 1/s\):

$$ \mathcal{L}\{t^n \cdot 1\} = (-1)^n \frac{\mathrm{d}^n}{\mathrm{d}s^n}\left(\frac{1}{s}\right) = (-1)^n \left[\frac{(-1)^n n!}{s^{n+1}}\right] = \frac{n!}{s^{n+1}} $$

Both independent paths confirm the same result.

### 4.2 Example 6.3: Damped Oscillations (\(e^{at}\cos\omega t\) and \(e^{at}\sin\omega t\))

The base transforms are \(\mathcal{L}\{\cos\omega t\} = s/(s^2+\omega^2)\) and \(\mathcal{L}\{\sin\omega t\} = \omega/(s^2+\omega^2)\). Applying the first shifting theorem \(\mathcal{L}\{e^{at}f(t)\} = F(s-a)\):

$$ \mathcal{L}\{e^{at} \cos\omega t\} = \frac{s-a}{(s-a)^2+\omega^2}, \qquad \mathcal{L}\{e^{at} \sin\omega t\} = \frac{\omega}{(s-a)^2+\omega^2}, \qquad s > a $$

Notice that the numerator \(s\) must also be replaced by \((s - a)\).

### 4.3 Example 6.4: Resonant Terms (\(t\sin t\) and \(t^2\sin t\))

For \(f(t) = \sin t\), the base transform is \(F(s) = 1/(s^2+1)\).

**First-Order Multiplication (\(t\sin t\)):**

$$ \mathcal{L}\{t\sin t\} = -\frac{\mathrm{d}}{\mathrm{d}s}\left(\frac{1}{s^2+1}\right) = -\left[-\frac{2s}{(s^2+1)^2}\right] = \frac{2s}{(s^2+1)^2} $$

**Second-Order Multiplication (\(t^2\sin t\)):**

$$ \mathcal{L}\{t^2\sin t\} = \frac{\mathrm{d}^2}{\mathrm{d}s^2}\left(\frac{1}{s^2+1}\right) = \frac{\mathrm{d}}{\mathrm{d}s}\left[-\frac{2s}{(s^2+1)^2}\right] = \frac{6s^2-2}{(s^2+1)^3} $$

Factoring out \((s^2+1)\) before expanding the quotient prevents algebraic mistakes.

### 4.4 Example 6.5: Composite Shifting and Differentiation (\(t e^{at}\sin\omega t\))

Two operational sequences can be followed:
1. Apply the frequency shift first: \(G(s) = \mathcal{L}\{e^{at}\sin\omega t\} = \frac{\omega}{(s-a)^2+\omega^2}\).
2. Apply the \(-d/ds\) differentiation with respect to \(s\) for the factor \(t\):

$$ \mathcal{L}\{t e^{at}\sin\omega t\} = -\frac{\mathrm{d}}{\mathrm{d}s}\left[\frac{\omega}{(s-a)^2+\omega^2}\right] = \frac{2\omega(s-a)}{\bigl((s-a)^2+\omega^2\bigr)^2}, \qquad s > a $$

---

## 5. Laplace Transform Decision and Reference Matrix

| Time Function \(f(t)\) | Laplace Transform \(F(s)\) | Convergence Abscissa | Core Property / Rule |
|---|---|---|---|
| \(1\) | \(\frac{1}{s}\) | \(s > 0\) | Constant kernel integral |
| \(t^n\) (\(n = 0, 1, \dots\)) | \(\frac{n!}{s^{n+1}}\) | \(s > 0\) | Derivative recurrence or \(s\)-derivative |
| \(e^{at}\) | \(\frac{1}{s-a}\) | \(s > a\) | Exponential kernel integral |
| \(\sin\omega t\) | \(\frac{\omega}{s^2+\omega^2}\) | \(s > 0\) | Euler’s identity (imaginary part) |
| \(\cos\omega t\) | \(\frac{s}{s^2+\omega^2}\) | \(s > 0\) | Euler’s identity (real part) |
| \(e^{at}\sin\omega t\) | \(\frac{\omega}{(s-a)^2+\omega^2}\) | \(s > a\) | First frequency shift |
| \(e^{at}\cos\omega t\) | \(\frac{s-a}{(s-a)^2+\omega^2}\) | \(s > a\) | First frequency shift |
| \(t\sin\omega t\) | \(\frac{2\omega s}{(s^2+\omega^2)^2}\) | \(s > 0\) | \(s\)-domain differentiation (\(-F'\)) |
| \(t\cos\omega t\) | \(\frac{s^2-\omega^2}{(s^2+\omega^2)^2}\) | \(s > 0\) | \(s\)-domain differentiation (\(-F'\)) |
| \(f'(t)\) | \(s F(s) - f(0)\) | \(s > s_0\) | Integration by parts |
| \(f''(t)\) | \(s^2 F(s) - s f(0) - f'(0)\) | \(s > s_0\) | Second-order derivative |

---

## 6. Exam Pitfalls and Clinical Checklist

1. **Sign Trap (s-Derivative):** Do not drop the negative sign in \(\mathcal{L}\{t f(t)\} = -F'(s)\). Remember \((-1)^n\) is negative for odd powers and positive for even powers.
2. **Cosine Shift Trap:** When calculating \(\mathcal{L}\{e^{at}\cos\omega t\}\), shift **both** occurrences of \(s\) to \((s-a)\). The numerator is \((s-a)\), never just \(s\)!
3. **Abscissa of Convergence:** Always state \(s > s_0\) alongside the transform to demonstrate understanding of improper integral convergence to the right of poles (\(s = a\)).
4. **Initial Condition Sequence:** In \(\mathcal{L}\{f''\} = s^2 F(s) - s f(0) - f'(0)\), verify that powers of \(s\) decrement and every initial condition term is subtracted.
