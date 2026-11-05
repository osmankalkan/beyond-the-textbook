# §6.2 The Heaviside Step Function and the Second Shifting Theorem

In engineering systems, external excitations and input signals are rarely smooth and continuous for all time. Sudden switch closures in electric circuits, wind gusts and blast shocks impacting structural frames, or engines starting and stopping over prescribed time intervals all produce **piecewise continuous** and **discontinuous** driving forces.

Classical time-domain ODE methods require solving a separate initial-value problem on each subinterval and stitching the boundary conditions together. **The Heaviside unit step function** condenses these piecewise inputs into a single analytical formula and, via the **Second Shifting Theorem (Time Delay)**, enables direct solutions of the differential equation in a single algebraic stroke.

---

## 1. Definition of the Heaviside Step Function

The unit step function \(H(t - a)\) is an ideal switching function that jumps abruptly from \(0\) to \(1\) at delay onset \(a \ge 0\):

$$ H(t - a) = 0 \quad (t < a), \qquad H(t - a) = 1 \quad (t > a) $$

For \(a = 0\), \(H(t)\) denotes the standard unit step activating at \(t = 0\). At the discontinuity \(t = a\), the value is conventionally taken as \(1/2\); however, in integral transforms, isolated point values do not affect the result.

---

## 2. Laplace Transform of the Step Function

In the defining integral, the integrand vanishes identically for \(t < a\); consequently, the lower integration limit shifts directly to \(t = a\):

$$ \mathcal{L}\{H(t - a)\} = \int_0^\infty e^{-st} H(t - a)\,\mathrm{d}t = \int_a^\infty e^{-st}\,\mathrm{d}t = \left[-\frac{1}{s}e^{-st}\right]_a^\infty = \frac{e^{-as}}{s}, \qquad s > 0 $$

For \(a = 0\), the transform reduces to the familiar constant-function result:

$$ \mathcal{L}\{H(t)\} = \frac{1}{s}, \qquad s > 0 $$

Every time-domain shift by \(a\) translates into an exponential attenuation factor \(e^{-as}\) in the \(s\)-domain.

---

## 3. Second Shifting Theorem (Time Delay)

### 3.1 Statement and Proof of the Theorem

For a time-delayed signal \(f(t - a)H(t - a)\) that is shifted right by \(a\) and held at zero until \(t = a\), the Laplace transform is:

$$ \mathcal{L}\{f(t - a) H(t - a)\} = \int_0^\infty e^{-st} f(t - a) H(t - a)\,\mathrm{d}t = \int_a^\infty e^{-st} f(t - a)\,\mathrm{d}t $$

Applying the time-shift substitution \(\tau = t - a\):

$$ \tau = t - a \quad \Longleftrightarrow \quad t = \tau + a, \qquad \mathrm{d}t = \mathrm{d}\tau $$

The limits transform to \(t = a \Longrightarrow \tau = 0\) and \(t \to \infty \Longrightarrow \tau \to \infty\). Factoring the exponential kernel:

$$ \int_a^\infty e^{-st} f(t - a)\,\mathrm{d}t = \int_0^\infty e^{-s(\tau + a)} f(\tau)\,\mathrm{d}\tau = e^{-as} \int_0^\infty e^{-s\tau} f(\tau)\,\mathrm{d}\tau = e^{-as} F(s) $$

This establishes the **Second Shifting Theorem**:

$$ \mathcal{L}\{f(t - a) H(t - a)\} = e^{-as} F(s), \qquad s > s_0 \ge 0 $$

> **Core Comparison:**
> - **1st Shift (Frequency Shift, §6.1):** \(\mathcal{L}\{e^{at}f(t)\} = F(s - a)\). Multiplying by an exponential in time shifts the complex frequency \(s\).
> - **2nd Shift (Time Delay, §6.2):** \(\mathcal{L}\{f(t - a)H(t - a)\} = e^{-as}F(s)\). Delaying by \(a\) in time multiplies the \(s\)-spectrum by \(e^{-as}\).

---

## 4. Modeling Piecewise Functions with Steps

### 4.1 Rectangular Pulse (Windowing)

A signal active only on the interval \(a < t < b\) and zero elsewhere is represented as the difference of two Heaviside steps:

$$ p(t) = H(t - a) - H(t - b) = 1 \quad (a < t < b), \qquad p(t) = 0 \quad (t < a, \, t > b) $$

By linearity, its Laplace transform follows immediately:

$$ \mathcal{L}\{H(t - a) - H(t - b)\} = \frac{e^{-as} - e^{-bs}}{s}, \qquad s > 0 $$

### 4.2 Jump Formula for General Piecewise Functions

A function defined by piecewise segments \(f_1(t), f_2(t), \dots, f_n(t)\) across successive intervals is condensed into a single formula via step transitions:

$$ f(t) = f_1(t) + [f_2(t) - f_1(t)] H(t - t_1) + [f_3(t) - f_2(t)] H(t - t_2) + \cdots + [f_n(t) - f_{n-1}(t)] H(t - t_{n-1}) $$

> **MENTAL MODEL (THE LIGHT-SWITCH ANALOGY):** Think of each H(*t* − *tₖ*) as an electric toggle switch: at instant *t* = *tₖ*, the old signal turns off (−*fₖ*) and the new signal switches on (+*fₖ*₊₁). That is the secret to encoding an entire piecewise timeline in a single line!

### 4.3 Example 6.6: Stepped Staircase Signal

A staircase signal equal to \(1\) on \(0 < t < 1\), \(2\) on \(1 < t < 2\), and \(0\) for \(t > 2\):

$$ f(t) = 1\cdot[H(t) - H(t - 1)] + 2\cdot[H(t - 1) - H(t - 2)] = H(t) + H(t - 1) - 2H(t - 2) $$

Its transform is evaluated directly:

$$ \mathcal{L}\{f(t)\} = \frac{1 + e^{-s} - 2e^{-2s}}{s}, \qquad s > 0 $$

---

## 5. Textbook Worked Examples and Argument Alignment

### 5.1 Example 6.7: Evaluating \(t H(t - 2)\) by Three Distinct Methods

Because the step argument is \(t - 2\) while the function argument is \(t\), the expression is not immediately in \(f(t - a)H(t - a)\) form. It can be evaluated in three ways:

**Method 1 (Defining Integral / Integration by Parts):**

$$ \mathcal{L}\{t H(t - 2)\} = \int_2^\infty t e^{-st}\,\mathrm{d}t = \left[-\frac{t}{s}e^{-st}\right]_2^\infty + \frac{1}{s}\int_2^\infty e^{-st}\,\mathrm{d}t = e^{-2s}\left(\frac{1}{s^2} + \frac{2}{s}\right) $$

**Method 2 (\(s\)-Domain Differentiation):**
Applying \(\mathcal{L}\{t g(t)\} = -\frac{\mathrm{d}}{\mathrm{d}s}G(s)\) with \(g(t) = H(t - 2)\):

$$ \mathcal{L}\{t H(t - 2)\} = -\frac{\mathrm{d}}{\mathrm{d}s}\mathcal{L}\{H(t - 2)\} = -\frac{\mathrm{d}}{\mathrm{d}s}\left(\frac{e^{-2s}}{s}\right) = e^{-2s}\left(\frac{1}{s^2} + \frac{2}{s}\right) $$

**Method 3 (Argument Alignment for the 2nd Shift):**
Decomposing \(t\) in terms of \(t - 2\):

$$ t = (t - 2) + 2 \quad \Longrightarrow \quad t H(t - 2) = (t - 2)H(t - 2) + 2H(t - 2) $$

Applying the Second Shifting Theorem directly:

$$ \mathcal{L}\{t H(t - 2)\} = e^{-2s}\mathcal{L}\{t\} + 2e^{-2s}\mathcal{L}\{1\} = e^{-2s}\left(\frac{1}{s^2} + \frac{2}{s}\right), \qquad s > 0 $$

> **QUICK TIP (EXAM SHORTCUT):** When facing *t*ⁿ H(*t* − *a*) on an exam, never waste time integrating! Simply rewrite *t* = (*t* − *a*) + *a*. The 2nd shifting theorem yields the answer directly without any calculus!

### 5.2 Example 6.8: Unmatched Exponential \(e^{at}H(t - b)\)

The general transform \(e^{at}H(t - b)\) can be evaluated via three approaches:
1. **Defining integral:**

$$ \mathcal{L}\{e^{at} H(t - b)\} = \int_b^\infty e^{-st} e^{at}\,\mathrm{d}t = \int_b^\infty e^{-(s-a)t}\,\mathrm{d}t = \frac{e^{-b(s-a)}}{s - a}, \qquad s > a $$

2. **1st Shift (replace s by s − a):**

$$ \mathcal{L}\{e^{at} H(t - b)\} = \left.\mathcal{L}\{H(t - b)\}\right|_{s \to s - a} = \left.\frac{e^{-bs}}{s}\right|_{s \to s - a} = \frac{e^{-b(s-a)}}{s - a} $$

3. **Factoring for the 2nd Shift:**

$$ e^{at} H(t - b) = e^{ab} e^{a(t - b)} H(t - b) \quad \Longrightarrow \quad e^{ab}\left[e^{-bs}\frac{1}{s - a}\right] = \frac{e^{-b(s-a)}}{s - a} $$

The midterm problem \(e^{2t}H(t) - e^{-3t}H(t - 4)\) evaluates in one step:

$$ \mathcal{L}\{e^{2t} H(t) - e^{-3t} H(t - 4)\} = \frac{1}{s - 2} - \frac{e^{-4(s + 3)}}{s + 3}, \qquad s > 2 $$

### 5.3 Example 6.9-A: Trigonometric Phase Alignment (\(\cos 2t H(t - \frac{\pi}{8})\))

The angle is aligned to the shift \(2(t - \frac{\pi}{8})\):

$$ 2t = 2\left(t - \frac{\pi}{8}\right) + \frac{\pi}{4} \quad \Longrightarrow \quad \cos 2t = \frac{1}{\sqrt{2}}\left[\cos 2\left(t - \frac{\pi}{8}\right) - \sin 2\left(t - \frac{\pi}{8}\right)\right] $$

Applying the Second Shifting Theorem:

$$ \mathcal{L}\left\{\cos 2t H\left(t - \frac{\pi}{8}\right)\right\} = \frac{e^{-\frac{\pi}{8}s}}{\sqrt{2}}\left[\frac{s}{s^2 + 4} - \frac{2}{s^2 + 4}\right] = \frac{e^{-\frac{\pi}{8}s}(s - 2)}{\sqrt{2}(s^2 + 4)}, \qquad s > 0 $$

### 5.4 Example 6.9-B: Delayed Polynomial via Taylor Expansion (\((9t^2 + 2t - 1)H(t - 2)\))

Expanding in powers of \((t - 2)\):

$$ 9t^2 + 2t - 1 = 9(t - 2)^2 + 38(t - 2) + 39 $$

Factoring out \(e^{-2s}\) via the Second Shifting Theorem:

$$ \mathcal{L}\{(9t^2 + 2t - 1)H(t - 2)\} = e^{-2s}\mathcal{L}\{9t^2 + 38t + 39\} = e^{-2s}\left(\frac{18}{s^3} + \frac{38}{s^2} + \frac{39}{s}\right) = e^{-2s}\frac{39s^2 + 38s + 18}{s^3} $$

---

## 6. Exam Pitfalls and Clinical Checklist

1. **Argument Mismatch Trap:** \(\mathcal{L}\{f(t)H(t - a)\} \neq e^{-as}\mathcal{L}\{f(t)\}\)! Always rewrite \(f(t)\) as \(f(t - a + a)\) to lock it to the \((t - a)\) argument.
2. **Unmatched Exponential Error:** Writing \(e^{-bs}/(s-a)\) for \(e^{at}H(t - b)\) is false; the correct result is \(e^{-b(s-a)}/(s-a)\) with shifted numerator exponent (\(s - a\)).
3. **Pulse Order:** A window on \(a < t < b\) requires \(H(t - a) - H(t - b)\); reversing the order negates the pulse.
4. **Trigonometric Coefficient Factor:** In expanding \(\cos[\omega(t - a) + \phi]\), remember to factor the angular frequency \(\omega\) correctly outside \((t - a)\).
