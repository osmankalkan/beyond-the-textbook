# §4.3 · Particular Solutions: Undetermined Coefficients, D-Operator, and Variation of Parameters

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §4.3, print pp. 153–177 / PDF pp. 171–195. Examples 4.12–4.29. This is an adapted study text.

## What you will learn in this section

- Why the general solution of a forced linear system splits naturally into \(y(x) = y_C(x) + y_P(x)\).
- **Method of Undetermined Coefficients (§4.3.1):** Identifying the derivative family of \(F(x)\), setting up Table 4.1 candidate templates, reducing trigonometric powers, and applying the \(x^p\) multiplication rule in resonance (Examples 4.12–4.18).
- **\(D\)-Operator Method (§4.3.2):** Replacing tedious systems of equations with the algebraic inverse operator \(\frac{1}{\phi(D)}F(x)\): Theorem 1 (exponential rule), Theorem 2 (exponential shift and polynomial series), Theorem 3 (sinusoidal \(D^2\to -\beta^2\) rule), and Theorem 4 (resonance derivative rule) (Examples 4.19–4.26).
- **Method of Variation of Parameters (§4.3.3):** Solving equations with non-elementary or non-finite derivative right-hand sides like \(\ln x, \tan x, \sec x, \csc x\) or variable coefficients using the Wronskian determinant (Examples 4.27–4.29).

## Decision map: The intuition behind the 3 methods

Think of a linear differential equation like a car suspension:
- **Left-hand side (\(\phi(D)y = 0\)):** Represents the internal structure of the system (mass, spring stiffness, damping). Its solution, the **complementary solution \(y_C(x)\)**, describes how the system oscillates or dies out naturally when no external force acts on it (§4.2).
- **Right-hand side (\(F(x)\)):** Represents the external forcing function (road bumps, motor vibration, wind). Its solution, the **particular solution \(y_P(x)\)**, describes the forced motion compelled by this external input.
- **General solution:** The total behavior is simply the superposition of the two: \(y(x) = y_C(x) + y_P(x)\).

Looking at the forcing function \(F(x)\), we select the most direct method using this decision tree:

| Forcing function \(F(x)\) type | Recommended method | Mental model and rule |
| --- | --- | --- |
| Polynomial, exponential, \(\cos\beta x, \sin\beta x\) | Undetermined coefficients (§4.3.1) or \(D\)-operator (§4.3.2) | Derivatives remain in the same family; use Table 4.1. If in resonance, multiply by \(x^p\). |
| Pure exponential \(e^{ax}\) or shifted polynomial \(e^{ax}P_m(x)\) | \(D\)-operator (Theorems 1, 2) | If \(\phi(a)\neq 0\), write \(\frac{e^{ax}}{\phi(a)}\) in one step; truncate series at \(D^m\). |
| Sinusoidal waves \(\sin\beta x, \cos\beta x\) | \(D\)-operator (Theorems 3, 4) | Replace \(D^2\to -\beta^2\); rationalize a remaining \(p+qD\) denominator with conjugate. |
| \(\ln x, \tan x, \sec x, \csc x\) or variable coefficients | Variation of parameters (§4.3.3) | Derivative family is infinite, guessing fails! Integrate directly with the Wronskian. |

> **Golden rule.** Undetermined coefficients and \(D\)-operator shortcuts apply exclusively to **constant-coefficient** equations with **well-behaved functions** whose derivatives close in a finite family. Variation of parameters works on **every linear equation** whose homogeneous solutions are known; however, because its integrals can be demanding, operator methods are much faster when applicable.

---

## 1. Method of undetermined coefficients (§4.3.1) · "Guess and equate"

Let us write the constant-coefficient linear ODE in operator form:

$$ \phi(D)y = (a_n D^n + a_{n-1}D^{n-1} + \cdots + a_1 D + a_0)y = F(x) $$

Functions whose derivatives generate only terms of the same family are called **UC functions**: \(x^m\), \(e^{ax}\), \(\cos\beta x\), \(\sin\beta x\), \(\cosh\beta x\), \(\sinh\beta x\), and their products. The logic is simple: *The output must belong to the exact same family as the input.*

### Table 4.1 · Basic candidate forms in the absence of resonance

When no term in \(F(x)\) appears in the complementary solution \(y_C(x)\) (\(p=0\)), use these standard templates directly:

| Forcing function \(F(x)\) | Basic candidate \(y_P(x)\) | Intuition and key rule |
| --- | --- | --- |
| Polynomial \(P_m(x)=b_0 x^m+\cdots+b_m\) | \(A_0 x^m + A_1 x^{m-1} + \cdots + A_m\) | Derivatives generate all lower degrees; all terms down to the constant must be included. |
| Exponential \(c\,e^{ax}\) | \(A\,e^{ax}\) | The derivative of an exponential is itself; finding the scalar multiplier is enough. |
| Sinusoid \(c\cos\beta x + d\sin\beta x\) | \(A\cos\beta x + B\sin\beta x\) | Even if only \(\cos\) or only \(\sin\) is on the right, \(y'\) generates the other, so both are required. |
| Hyperbolic \(c\cosh\beta x + d\sinh\beta x\) | \(A\cosh\beta x + B\sinh\beta x\) | Alternatively solved as two separate exponentials via \(e^{\beta x}, e^{-\beta x}\). |
| Polynomial \(\times\) Exponential \(P_m(x)e^{ax}\) | \((A_0 x^m + \cdots + A_m)e^{ax}\) | Full polynomial degree multiplied by the exponential envelope. |
| Exponential \(\times\) Sinusoid \(e^{ax}(c\cos\beta x + d\sin\beta x)\) | \(e^{ax}(A\cos\beta x + B\sin\beta x)\) | Damped oscillation template; keep the full trigonometric pair. |
| Polynomial \(\times\) Exponential \(\times\) Sinusoid | \(e^{ax}\bigl[(A_0 x^m+\cdots)\cos\beta x + (B_0 x^m+\cdots)\sin\beta x\bigr]\) | Requires two distinct degree-\(m\) polynomials (\(2m+2\) undetermined coefficients). |

### Examples 4.12 and 4.13 · Applying basic candidates

**Example 4.12 (Pure exponential input).** Consider \((D^2+9)y=3e^{2x}\). The characteristic equation \(\lambda^2+9=0\Longrightarrow \lambda=\pm 3i\) gives natural frequency \(3\). The forcing exponent \(a=2\) is not a root. Thus, we test \(y_P=Ae^{2x}\) directly:

$$ (D^2+9)(Ae^{2x}) = (2^2+9)Ae^{2x} = 13Ae^{2x} = 3e^{2x} \quad\Longrightarrow\quad A=\frac{3}{13},\qquad y_P(x)=\frac{3}{13}e^{2x} $$

**Example 4.13 (Polynomial-exponential product).** In \((D^2+2D+4)y = 8x^2 e^{3x}\), the roots of \(\lambda^2+2\lambda+4=0\) are \(\lambda=-1\pm\sqrt{3}i\) (\(a=3\) is not a root). Even though only \(x^2 e^{3x}\) appears on the right, product rule derivatives inevitably produce \(x e^{3x}\) and \(e^{3x}\). Therefore, a complete second-degree polynomial trial is required:

$$ y_P = (Ax^2 + Bx + C)e^{3x} \quad\Longrightarrow\quad 19Ax^2 + (16A+19B)x + (2A+8B+19C) = 8x^2 $$

Equating coefficients gives \(A=\frac{8}{19}\), \(B=-\frac{128}{361}\), and \(C=\frac{736}{6859}\).

### Examples 4.14 and 4.15 · Why both sine and cosine are required

**Example 4.14 (Trigonometric pairing requirement).** In \((D^2+2D+4)y = 111e^{-x}\cos 3x\), only \(\cos 3x\) appears on the right. Why can we not try only \(A\cos 3x\)? Because the operator contains the first derivative \(2Dy = 2y'\), which turns cosine into sine! Without a corresponding sine term to cancel it, the left side can never match the right side. Hence, both terms are mandatory:

$$ y_P(x) = e^{-x}(A\cos 3x + B\sin 3x) $$

Substituting and grouping \(\cos 3x\) and \(\sin 3x\) coefficients yields a \(2\times 2\) system where both \(A\) and \(B\) turn out to be non-zero.

**Example 4.15 (Reducing trigonometric powers).** In \((D^2+4)y = 4\cos^3 2x\), the power \(\cos^3 2x\) is not directly in Table 4.1. Using the triple-angle identity \(4\cos^3 2x = \cos 6x + 3\cos 2x\), we convert the right-hand side into a sum of first-degree terms:

$$ (D^2+4)y = \cos 6x + 3\cos 2x $$

The complementary solution from roots \(\lambda=\pm 2i\) is \(y_C = C_1\cos 2x + C_2\sin 2x\). The \(\cos 6x\) term is non-resonant; however, \(3\cos 2x\) matches the natural frequency of the system (resonance!). Thus, the resonant term is multiplied by \(x\):

$$ y_P(x) = -\frac{1}{32}\cos 6x + \frac{3}{4}x\sin 2x $$

### Resonance (\(x^p\) multiplication rule) · Examples 4.16, 4.17, and 4.18

If you push a swing at its natural frequency, the amplitude grows linearly with time (\(x\)); this is the exact physical mechanism responsible for resonant structural failures.

Mathematically: If a candidate term in \(y_P\) already lives in \(y_C\), applying \(\phi(D)\) produces zero! You would get \(\phi(D)y_P = 0\), an impossible contradiction. To break this degeneracy, multiply the basic candidate by \(x\), or by \(x^p\) if the root has multiplicity \(p\):

1. **Example 4.16 (\(\lambda=0\) is a root with polynomial input):** \((D^2+2D)y = 4x^2+2x+3\). The characteristic equation \(\lambda(\lambda+2)=0\) has \(\lambda=0\) as a simple root (\(p=1\), because there is no zero-order \(y\) term, and the derivative of a constant is zero). The polynomial candidate is multiplied by \(x^1\):

$$ y_P(x) = x(Ax^2 + Bx + C) = Ax^3 + Bx^2 + Cx \quad\Longrightarrow\quad y_P(x) = \frac{2}{3}x^3 - \frac{1}{2}x^2 + 2x $$

2. **Example 4.17 (Triple-root resonance, \(p=3\)):** \((D^3-6D^2+12D-8)y = xe^{2x} + x^2\). Because the operator is \((D-2)^3\), \(\lambda=2\) has multiplicity \(p=3\), but \(\lambda=0\) is not a root (\(p=0\)). Thus, only the \(e^{2x}\) term is multiplied by \(x^3\), while \(x^2\) is untouched:

$$ y_P(x) = x^3(Ax+B)e^{2x} + (Cx^2+Ex+F) = (Ax^4+Bx^3)e^{2x} + Cx^2+Ex+F $$

3. **Example 4.18 (Resonance in two separate families):** \((D^4-4D^2)y = \sinh 2x + 2x^2\). The characteristic roots are \(\lambda=0,0,2,-2\):

$$ y_C(x) = C_0 + C_1 x + C_2\cosh 2x + C_3\sinh 2x $$

Here, \(\sinh 2x\) is in resonance with simple roots \(\lambda=\pm 2\) (\(p=1\)), while \(2x^2\) is in resonance with the double zero root \(\lambda=0\) (\(p=2\)):

$$ y_P(x) = x(A\sinh 2x + B\cosh 2x) + x^2(Ex^2 + Fx + G) = \frac{1}{32}x\cosh 2x - \frac{1}{24}x^4 - \frac{1}{8}x^2 $$

---

## 2. D-operator method (§4.3.2) · "The art of algebraic shortcuts"

Taking derivatives repeatedly and solving simultaneous equations can be tedious and error-prone. The \(D\)-operator method treats the differential equation as an algebraic relation and solves for \(y_P\) via the inverse operator:

$$ y_P(x) = \frac{1}{\phi(D)}F(x) \qquad\Longleftrightarrow\qquad \phi(D)y_P(x) = F(x) $$

The inverse operator is linear; if the right side is a sum, apply it term by term. Four algebraic shortcuts resolve the solution in seconds:

### Theorem 1 · Exponential rule: Replace D with a!

Because \(D(e^{ax}) = a e^{ax}\), taking a derivative is simply multiplication by \(a\). Hence, as long as \(\phi(a)\neq 0\), replace \(D\) directly with the scalar \(a\):

$$ \frac{1}{\phi(D)}e^{ax} = \frac{1}{\phi(a)}e^{ax},\qquad \phi(a)\neq 0 $$

For example, \(\frac{1}{D^2+9}e^{2x} = \frac{1}{2^2+9}e^{2x} = \frac{1}{13}e^{2x}\). Done in one line!

### Theorem 2 · Exponential shift and polynomial series

When \(e^{ax}\) is multiplied by another function, we can factor the exponential out to the left of the operator. The only adjustment is replacing every \(D\) with \(D+a\):

$$ \frac{1}{\phi(D)}\bigl[e^{ax}f(x)\bigr] = e^{ax}\frac{1}{\phi(D+a)}f(x) $$

If the remaining function \(f(x)\) is a polynomial, expand \(\frac{1}{\phi(D+a)}\) as a geometric series:

$$ \frac{1}{1+u} = 1 - u + u^2 - u^3 + \cdots,\qquad \frac{1}{1-u} = 1 + u + u^2 + u^3 + \cdots $$

Because derivatives higher than the degree of the polynomial vanish identically, the series truncates naturally in a finite number of steps!

**Examples 4.19, 4.20, and 4.21.** In \((D^2+5D+4)y = e^{2x} + x^2 e^{-2x}\) (Example 4.19), the first term yields \(\frac{1}{18}e^{2x}\) by Theorem 1. For the second term, shift \(e^{-2x}\) to the left and expand the operator:

$$ y_{P2} = e^{-2x}\frac{1}{D^2+D-2}x^2 = -\frac{e^{-2x}}{2}\frac{1}{1 - \left(\frac{1}{2}D + \frac{1}{2}D^2\right)}x^2 = -\frac{e^{-2x}}{2}\left(1 + \frac{1}{2}D + \frac{3}{4}D^2 + \cdots\right)x^2 = -\frac{1}{4}(2x^2+2x+3)e^{-2x} $$

### Theorem 3 · Sine and cosine rule (\(D^2 \to -\beta^2\))

Because two derivatives of sine or cosine produce a factor of \(-\beta^2\), substitute \(-\beta^2\) for every occurrence of \(D^2\):

$$ \frac{1}{\phi_1(D^2) + D\phi_2(D^2)}\sin\beta x = \frac{1}{\phi_1(-\beta^2) + \phi_2(-\beta^2)D}\sin\beta x,\qquad \frac{1}{\phi_1(D^2) + D\phi_2(D^2)}\cos\beta x = \frac{1}{\phi_1(-\beta^2) + \phi_2(-\beta^2)D}\cos\beta x $$

If a first-degree operator \(p + qD\) remains in the denominator, multiply numerator and denominator by the conjugate \(p - qD\) to turn the denominator into a pure scalar!

**Examples 4.22, 4.23, and 4.24.** In \((D^2+3D-4)y = 6\sin 3x\), set \(D^2 \to -3^2 = -9\):

$$ y_P = \frac{1}{-9 + 3D - 4}(6\sin 3x) = \frac{1}{3D - 13}(6\sin 3x) = \frac{3D + 13}{9D^2 - 169}(6\sin 3x) = \frac{3D+13}{9(-9)-169}(6\sin 3x) = -\frac{3}{125}(9\cos 3x + 13\sin 3x) $$

### Theorem 4 · Resonance derivative rule

If setting \(D=a\) yields zero in the denominator (\(\phi(a)=0\)), resonance has occurred. The rule is clean: multiply the numerator by \(x^p\) and replace the denominator by the \(p\)-th derivative of \(\phi\):

$$ \frac{1}{\phi(D)}e^{ax} = \frac{1}{(D-a)^p\psi(D)}e^{ax} = \frac{x^p}{p!\,\psi(a)}e^{ax} = \frac{x^p}{\phi^{(p)}(a)}e^{ax},\qquad \phi^{(p)}(a)\neq 0 $$

**Examples 4.25 and 4.26.** In \((D^2+4D+13)y = e^{-2x}\sin 3x\), shift \(e^{-2x}\) to the left via Theorem 2, then apply Theorem 4 to the imaginary part of \(e^{i3x}\):

$$ \frac{1}{D^2+9}e^{i3x} = \frac{x}{6i}e^{i3x} = -\frac{ix}{6}(\cos 3x + i\sin 3x) = \frac{x}{6}\sin 3x - i\frac{x}{6}\cos 3x \quad\Longrightarrow\quad y_P(x) = -\frac{1}{6}x e^{-2x}\cos 3x $$

---

## 3. Method of variation of parameters (§4.3.3) · "The universal master key"

When the forcing function is \(\ln x, \tan x, \sec x, \csc x\), its derivatives generate infinite new forms and candidate guessing is impossible. In this situation, the universal method of **variation of parameters** is applied.

### Intuitive derivation

Write the second-order equation in standard form (divide through by the leading coefficient):

$$ a_2(x)y'' + a_1(x)y' + a_0(x)y = F(x) \qquad\Longrightarrow\qquad y'' + p_1(x)y' + p_0(x)y = \frac{F(x)}{a_2(x)} $$

Suppose the complementary solution \(y_C(x) = C_1 y_1(x) + C_2 y_2(x)\) is known. The big idea is: *Can we replace the arbitrary constants \(C_1, C_2\) by unknown functions \(c_1(x), c_2(x)\) that satisfy the nonhomogeneous equation?*

$$ y(x) = c_1(x)y_1(x) + c_2(x)y_2(x) $$

Differentiating yields \(y' = (c_1'y_1 + c_2'y_2) + (c_1 y_1' + c_2 y_2')\). To prevent second derivatives \(c_1'', c_2''\) from appearing, we impose the auxiliary condition that the first bracket vanishes. Substituting into the ODE gives a clean \(2\times 2\) algebraic system for \(c_1', c_2'\):

$$ c_1'(x)y_1(x) + c_2'(x)y_2(x) = 0,\qquad c_1'(x)y_1'(x) + c_2'(x)y_2'(x) = \frac{F(x)}{a_2(x)} $$

Because the fundamental solutions \(y_1, y_2\) are linearly independent, the Wronskian \(W(y_1,y_2) = y_1 y_2' - y_2 y_1' \neq 0\). The system is solved and integrated directly.

### Examples 4.27, 4.28, and 4.29 · Worked examples

1. **Example 4.27 (\(y''+y=\csc^3 x\)):** Homogeneous solutions are \(y_1=\cos x, y_2=\sin x\) (\(W=1\)). The system:

$$ c_1'\cos x + c_2'\sin x = 0,\qquad -c_1'\sin x + c_2'\cos x = \csc^3 x \quad\Longrightarrow\quad c_1' = -\csc^2 x,\qquad c_2' = \cos x\csc^3 x $$

Integrating gives \(c_1(x) = \cot x\) and \(c_2(x) = -\frac{1}{2}\csc^2 x\); combining them yields \(y_P(x) = -\frac{1}{2}\csc x\).

2. **Example 4.28 (\(y''-2y'+y = e^x\ln x,\ x>0\)):** Repeated root \(\lambda=1,1\) gives \(y_1=e^x, y_2=xe^x\). Solving the system yields \(c_2' = \ln x\) and \(c_1' = -x\ln x\). Integrating by parts gives:

$$ c_1(x) = -\frac{1}{2}x^2\ln x + \frac{1}{4}x^2 + C_1,\qquad c_2(x) = x\ln x - x + C_2 \quad\Longrightarrow\quad y_P(x) = x^2 e^x\left(\frac{1}{2}\ln x - \frac{3}{4}\right) $$

3. **Example 4.29 (Third-order equation):** For \((D^3-D)y = \frac{e^x}{1+e^x}\), solutions are \(y_1=1, y_2=e^x, y_3=e^{-x}\). The \(3\times 3\) system:

$$ c_1' + c_2'e^x + c_3'e^{-x} = 0,\qquad c_2'e^x - c_3'e^{-x} = 0,\qquad c_2'e^x + c_3'e^{-x} = \frac{e^x}{1+e^x} $$

Solving for \(c_1', c_2', c_3'\) and integrating yields the complete general solution.

---

## 4. Lab: Particular solutions and resonance workshop

In the workshop, compare the total response \(y(x) = y_C(x) + y_P(x)\) (solid green curve) with the pure particular response \(y_P(x)\) (dashed copper curve) across four representative equation families:

| Family | Model equation | Core mechanism |
| --- | --- | --- |
| Exponential forcing (Example 4.12) | \((D^2+9)y=3e^{2x}\) | No resonance; \(y_P=\frac{3}{13}e^{2x}\) forms the backbone while \(y_C\) oscillates around it. |
| Polynomial resonance (Example 4.16) | \((D^2+2D)y=4x^2+2x+3\) | Because \(\lambda=0\) is a root, the \(x\) factor lifts the polynomial degree to \(x^3\). |
| Shift + resonance (Example 4.26) | \((D^2+4D+13)y=e^{-2x}\sin 3x\) | By Theorems 2 and 4, the amplitude grows linearly via \(-\frac{1}{6}xe^{-2x}\cos 3x\). |
| Variation of parameters (Example 4.28) | \((D^2-2D+1)y=e^x\ln x\) | Non-elementary logarithmic forcing; solution is valid strictly on \(x>0\). |

> **What should you test in the lab?** Click “Zero homogeneous (\(y=y_P\))” to set initial data exactly to \(y_0=y_P(x_0)\) and \(v_0=y_P'(x_0)\); this zeroes out \(y_C(x)\equiv 0\) and collapses the two curves together. Drag the \(y_0\) and \(v_0\) sliders and observe that the dashed \(y_P(x)\) curve **never moves**, proving that initial condition memory is carried exclusively by the free response \(y_C\)!

## Checklist

- Before setting up the \(y_P\) template, did I solve the characteristic equation and record the roots and their multiplicities (\(p\))?
- Did I reduce higher powers of trigonometric functions (\(\cos^3 2x, \sin^2 x\)) to first-degree terms using sum formulas?
- Even when only \(\cos\beta x\) appears on the right, did I include **both \(\cos\) and \(\sin\)** in the trial?
- In resonance, did I multiply the basic trial by \(x^p\) to make it linearly independent of the homogeneous solution?
- In \(D\)-operator Theorem 3, did I replace only \(D^2\) with \(-\beta^2\) while keeping odd powers of \(D\)?
- In variation of parameters, did I divide by the leading coefficient to put the forcing term into standard form?
