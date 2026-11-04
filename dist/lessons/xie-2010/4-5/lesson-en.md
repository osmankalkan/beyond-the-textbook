# §4.5 · Summary: method selection in linear ODEs and Cauchy–Euler reduction

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §§4.4–4.5, printed pp. 178–187 / PDF pp. 196–205 (Examples 4.30–4.31 and Chapter 4 Summary). This is an original English study and synthesis adaptation.

## What you will learn

- To synthesize every linear ODE method of Chapter 4 into a single decision tree ordered by **coefficient type → characteristic roots → right-hand side \(F(x)\) structure**.
- To construct the complementary solution \(y_C(x)\) basis accurately for distinct real, hyperbolic (\(\cosh,\sinh\)), complex conjugate, and \(p\)-fold repeated roots.
- To choose the fastest path for the particular solution \(y_P(x)\) in 60 seconds among **Undetermined Coefficients (§4.3.1)**, **D-Operator Shortcuts (§4.3.2, Theorems 1–4)**, and **Variation of Parameters (§4.3.3)**.
- To reduce variable-coefficient **Cauchy–Euler (equidimensional) equations (§4.4)** to constant-coefficient ODEs via the transformation \(x=e^z\) (\(z=\ln x\)) and the operator identity \(x^k D^k = \mathcal{D}(\mathcal{D}-1)\cdots(\mathcal{D}-k+1)\) (Examples 4.30 and 4.31).

## Chapter 4 Master Decision Map

When facing an \(n\)-th order linear differential equation, apply this four-stage decision map before starting calculations:

| Stage | Diagnostic Question | Structure / Condition | Fastest Method to Select |
| --- | --- | --- | --- |
| **1. Coefficients** | Are coefficients constant or variable? | Constant: \(a_k = c_k\)<br>Equidimensional: \(a_k x^k D^k y\) | If constant, write \(\varphi(D)y=F(x)\) directly.<br>If Cauchy–Euler, reduce to constant coefficients via \(x=e^z, z=\ln x\) (§4.4). |
| **2. Homogeneous Roots** | What are the roots of \(\varphi(\lambda)=0\)? | Distinct: \(\lambda_1\neq\lambda_2\)<br>Symmetric: \(\lambda=\pm\beta\)<br>Complex: \(\alpha\pm\mathrm{i}\beta\)<br>\(p\)-fold: \((\lambda-a)^p=0\) | \(e^{\lambda_i x}\)<br>\(\cosh\beta x, \sinh\beta x\)<br>\(e^{\alpha x}(A\cos\beta x+B\sin\beta x)\)<br>\((C_0+C_1 x+\cdots+C_{p-1}x^{p-1})e^{ax}\) |
| **3. Forcing \(F(x)\)** | Is \(F(x)\) in the Table 4.1 family? | \(e^{\alpha x}P_k(x)\{\cos\beta x,\sin\beta x\}\)<br>or a sum of such terms | **Yes:** D-Operator (Theorems 1–4) or Undetermined Coefficients.<br>**No** (\(\tan x, \sec x, \ln x, \frac{e^{2x}}{(e^x+1)^2}\)): **Variation of Parameters** is mandatory! |
| **4. Fastest \(y_P\)** | Which operator rule collapses the algebra? | Pure exponential \(e^{ax}\) (\(\varphi(a)\neq 0\))<br>Pure exponential \(e^{ax}\) (\(\varphi(a)=0\))<br>Sinusoidal \(\sin\beta x, \cos\beta x\)<br>Product \(e^{ax}f(x)\) | **Theorem 1:** \(e^{ax}/\varphi(a)\)<br>**Theorem 4:** \(x^p e^{ax}/\varphi^{(p)}(a)\)<br>**Theorem 3:** \(D^2\to -\beta^2\)<br>**Theorem 2:** \(e^{ax}\frac{1}{\varphi(D+a)}f(x)\) |

## 1. Architecture of the general solution and complementary root (\(y_C\)) atlas

An \(n\)-th order constant-coefficient linear ODE is written in standard operator form with \(D=\frac{\mathrm{d}}{\mathrm{d}x}\) as:

$$ \varphi(D)y = (a_n D^n + a_{n-1}D^{n-1} + \cdots + a_1 D + a_0)y = F(x) $$

By linearity and superposition (§4.1), the general solution is always the sum of two pieces:

$$ y(x) = y_C(x) + y_P(x) $$

Here the **complementary solution** \(y_C(x)\) solves the homogeneous equation \(\varphi(D)y_C = 0\) and houses **all \(n\) arbitrary constants** (\(C_1,\dots,C_n\)). The **particular solution** \(y_P(x)\) is any specific solution satisfying \(\varphi(D)y_P = F(x)\) and contains **no arbitrary constants**.

### Characteristic root atlas (§4.2)

Substituting \(y=e^{\lambda x}\) into the homogeneous ODE gives the characteristic equation \(\varphi(\lambda)=0\). Depending on the root structure, the basis for \(y_C(x)\) follows four rules:

1. **Distinct real roots (\(\lambda_1 \neq \lambda_2 \neq \cdots\)):** Each simple real root contributes \(C_i e^{\lambda_i x}\). When a symmetric pair \(\lambda = \pm\beta\) occurs, replacing the exponentials with the hyperbolic basis \(A\cosh\beta x + B\sinh\beta x\) simplifies boundary value problems on finite intervals.
2. **Simple complex conjugate roots (\(\lambda = \alpha \pm \mathrm{i}\beta\)):** Expressed in Cartesian or polar amplitude–phase form:
   - Cartesian form: \(e^{\alpha x}(A\cos\beta x + B\sin\beta x)\)
   - Polar form: \(C e^{\alpha x}\cos(\beta x - \Phi)\)
3. **\(p\)-fold repeated real root (\((\lambda - a)^p = 0\)):** By the exponential shift identity \((D-a)^p y = e^{ax}D^p(e^{-ax}y) = 0\), a root of multiplicity \(p\) generates \(p\) linearly independent solutions:

$$ y_C(x) = (C_0 + C_1 x + C_2 x^2 + \cdots + C_{p-1} x^{p-1})e^{ax} $$

4. **\(p\)-fold repeated complex conjugate roots (\(\lambda = \alpha \pm \mathrm{i}\beta\), multiplicity \(p\)):** Both the \(\cos\beta x\) and \(\sin\beta x\) components are multiplied by polynomials of degree \(p-1\): \(e^{\alpha x}\sum_{k=0}^{p-1} x^k (A_k\cos\beta x + B_k\sin\beta x)\).

> **Exam rule:** Initial conditions \(y(x_0)=y_0, y'(x_0)=y_1,\dots\) must **never** be applied to \(y_C(x)\) alone! Always compute \(y_P(x)\) first and apply the conditions to the total solution \(y(x) = y_C(x) + y_P(x)\).

## 2. Choosing the particular solution (\(y_P\)) method: comparing the three core tools

When the forcing \(F(x) = F_1(x) + F_2(x) + \cdots + F_m(x)\) is a sum, superposition allows you to pick a **different, optimal** method for each individual term \(F_i(x)\).

| Method | When is it applicable? | Greatest strength | Primary weakness / trap |
| --- | --- | --- | --- |
| **Undetermined Coefficients (§4.3.1)** | Constant coefficients + \(F(x)=e^{\alpha x}P_k(x)\{\cos\beta x,\sin\beta x\}\) | Low-degree polynomials (\(k\le 1\)) and simple non-resonant sums | Product-rule differentiation becomes very tedious when an \(x^p\) resonance factor is present |
| **D-Operator Shortcuts (§4.3.2)** | Constant coefficients + exponentials, polynomials, sinusoids, and their products | Pure exponentials (Theorems 1 & 4), pure sinusoids (Theorem 3), and \(e^{ax}P_k(x)\) products (Theorem 2) | Sign errors when rationalizing remaining \((D-a)\) factors in the denominator |
| **Variation of Parameters (§4.3.3)** | **Always!** (Including variable coefficients and all \(F(x)\) outside Table 4.1) | Non-tabular forcings such as \(F(x) = \tan x, \sec x, \ln x, e^{2x}/(e^x+1)^2\) | High computational overhead from Wronskians and integration by parts at order \(n\ge 3\) |

### Undetermined coefficients and the \(x^p\) resonance rule (Table 4.1)

For \(F(x) = e^{\alpha x}[P_k(x)\cos\beta x + Q_k(x)\sin\beta x]\), inspect the characteristic number \(\sigma = \alpha + \mathrm{i}\beta\) (with \(\beta=0 \implies \sigma=\alpha\) in the purely real case):
- If \(\sigma\) is **not** a characteristic root (\(p=0\)), use the standard trial form.
- If \(\sigma\) is a characteristic root of **multiplicity \(p\)**, multiply the entire standard trial form by **\(x^p\)**:

$$ y_P(x) = x^p e^{\alpha x}\bigl[(A_k x^k + \cdots + A_0)\cos\beta x + (B_k x^k + \cdots + B_0)\sin\beta x\bigr] $$

## 3. The five-tool D-operator playbook (§4.3.2)

The inverse operator notation \(y_P = \frac{1}{\varphi(D)}F(x)\) turns differential equations into algebraic rational operations. Its five core rules are:

1. **1/φ(D) power series expansion for polynomials:** When \(F(x) = P_k(x)\) is a polynomial, factor out the lowest-power term of \(\varphi(D)\) and expand via \((1 + u)^{-1} = 1 - u + u^2 - u^3 + \cdots\) or \((1 - u)^{-1} = 1 + u + u^2 + u^3 + \cdots\). Because \(D^{k+1}(P_k(x)) = 0\), the series terminates exactly at \(D^k\)!
2. **Theorem 1 (Pure exponential forcing — non-resonant):** If \(\varphi(a) \neq 0\), substitute \(a\) directly for \(D\):

$$ \frac{1}{\varphi(D)}e^{ax} = \frac{e^{ax}}{\varphi(a)}, \qquad \varphi(a) \neq 0 $$

3. **Theorem 2 (Exponential shift theorem):** When the forcing is a product \(e^{ax}f(x)\), move \(e^{ax}\) to the left of the inverse operator and replace every \(D\) with \(D+a\):

$$ \frac{1}{\varphi(D)}\bigl[e^{ax}f(x)\bigr] = e^{ax}\frac{1}{\varphi(D+a)}f(x) $$

4. **Theorem 3 (Sinusoidal forcing \(D^2 \to -\beta^2\)):** Since \(D^2(\sin\beta x) = -\beta^2\sin\beta x\) and \(D^2(\cos\beta x) = -\beta^2\cos\beta x\), split \(\varphi(D) = \varphi_1(D^2) + D\varphi_2(D^2)\) into even and odd powers and substitute **\(-\beta^2\) for \(D^2\) only**:

$$ \frac{1}{\varphi_1(D^2) + D\varphi_2(D^2)}\sin\beta x = \frac{1}{\varphi_1(-\beta^2) + D\varphi_2(-\beta^2)}\sin\beta x $$

Eliminate any remaining \(a + bD\) in the denominator by multiplying top and bottom by the conjugate \((a - bD)\), turning the denominator into the constant \(a^2 - b^2 D^2 \to a^2 + b^2\beta^2\).

5. **Theorem 4 (Zero-denominator / resonance derivative rule):** For a pure exponential \(e^{ax}\) where \(a\) is a root of \(\varphi(\lambda)=0\) of multiplicity \(p\) (\(\varphi(a)=\varphi'(a)=\cdots=\varphi^{(p-1)}(a)=0\) and \(\varphi^{(p)}(a)\neq 0\)), differentiate the polynomial \(\varphi(D)\) \(p\) times:

$$ \frac{1}{\varphi(D)}e^{ax} = \frac{x^p e^{ax}}{\varphi^{(p)}(a)}, \qquad \varphi(a)=\cdots=\varphi^{(p-1)}(a)=0,\ \varphi^{(p)}(a)\neq 0 $$

## 4. Variation of parameters (§4.3.3) blueprint

When \(F(x)\) lies outside Table 4.1 (e.g., \(\frac{e^{2x}}{(e^x+1)^2}\), \(\sec x\), \(\ln x\)) or when the ODE has variable coefficients, replace the constants in the homogeneous basis \(y_C(x) = C_1 y_1(x) + \cdots + C_n y_n(x)\) with unknown functions \(c_i(x)\): \(y_P(x) = c_1(x)y_1(x) + \cdots + c_n(x)y_n(x)\).

For a second-order equation \(a_2(x)y'' + a_1(x)y' + a_0(x)y = F(x)\), the 2×2 Wronskian system for \(c_1'(x)\) and \(c_2'(x)\) is:

$$ c_1'(x)y_1(x) + c_2'(x)y_2(x) = 0,\qquad c_1'(x)y_1'(x) + c_2'(x)y_2'(x) = \frac{F(x)}{a_2(x)} $$

> **Critical reminder:** If the leading coefficient \(a_2(x) \neq 1\), never forget to divide the forcing \(F(x)\) by \(a_2(x)\) in the last equation!

## 5. Cauchy–Euler (equidimensional) linear equations (§4.4)

General variable-coefficient linear ODEs cannot be solved in closed form. However, the **Cauchy–Euler equation** (or **equidimensional equation**)—which arises frequently in elasticity, heat conduction, and potential problems with cylindrical or spherical symmetry—reduces directly to constant coefficients via a single change of independent variable:

$$ (a_n x^n D^n + a_{n-1}x^{n-1}D^{n-1} + \cdots + a_1 x D + a_0)y = f(x) $$

Here \(a_n, a_{n-1}, \dots, a_0\) are constants, and in every term **the power of \(x\) equals the order of differentiation \(D^k = \frac{\mathrm{d}^k}{\mathrm{d}x^k}\)**.

### The substitution \(x = e^z\) (\(z = \ln x\)) and the operator identity

For \(x > 0\), introduce the new independent variable \(z\) via

$$ x = e^z \quad \Longleftrightarrow \quad z = \ln x, \qquad \mathcal{D} = \frac{\mathrm{d}}{\mathrm{d}z} $$

Applying the chain rule converts each \(x^k D^k\) term into a polynomial in \(\mathcal{D}\):
- First derivative:

$$ Dy = \frac{\mathrm{d}y}{\mathrm{d}x} = \frac{\mathrm{d}y}{\mathrm{d}z}\frac{\mathrm{d}z}{\mathrm{d}x} = \frac{1}{x}\mathcal{D}y \quad \Longrightarrow \quad xDy = \mathcal{D}y $$

- Second derivative:

$$ D^2 y = \frac{\mathrm{d}}{\mathrm{d}x}\left(e^{-z}\mathcal{D}y\right) = \frac{\mathrm{d}}{\mathrm{d}z}\left(e^{-z}\mathcal{D}y\right)\frac{\mathrm{d}z}{\mathrm{d}x} = e^{-2z}(\mathcal{D}^2 - \mathcal{D})y \quad \Longrightarrow \quad x^2 D^2 y = \mathcal{D}(\mathcal{D}-1)y $$

- By mathematical induction, the **fundamental Cauchy–Euler operator identity** for any order \(k\) is:

$$ x^k D^k = \mathcal{D}(\mathcal{D}-1)(\mathcal{D}-2)\cdots(\mathcal{D}-k+1) $$

Substituting this identity converts the LHS into a **constant-coefficient linear operator** \(\tilde{\varphi}(\mathcal{D})y = f(e^z)\) in the variable \(z\)!

| Cauchy–Euler Term (\(x\)-space) | Transformed Operator (\(z = \ln x\) space) | Expanded Polynomial Form |
| --- | --- | --- |
| \(xDy = x y'\) | \(\mathcal{D}y\) | \(\mathcal{D}y\) |
| \(x^2 D^2 y = x^2 y''\) | \(\mathcal{D}(\mathcal{D}-1)y\) | \((\mathcal{D}^2 - \mathcal{D})y\) |
| \(x^3 D^3 y = x^3 y'''\) | \(\mathcal{D}(\mathcal{D}-1)(\mathcal{D}-2)y\) | \((\mathcal{D}^3 - 3\mathcal{D}^2 + 2\mathcal{D})y\) |
| \(x^4 D^4 y = x^4 y^{(4)}\) | \(\mathcal{D}(\mathcal{D}-1)(\mathcal{D}-2)(\mathcal{D}-3)y\) | \((\mathcal{D}^4 - 6\mathcal{D}^3 + 11\mathcal{D}^2 - 6\mathcal{D})y\) |

### Worked Example 4.30 (Second-order Cauchy–Euler & exponential shift)

**Problem:** Find the general solution of the differential equation \((x^2 D^2 - 2xD + 2)y = x(\ln x)^3\).

**Solution:**
1. **Reduce to constant coefficients:** Set \(x = e^z\) (\(z = \ln x\)) and \(\mathcal{D} = \frac{\mathrm{d}}{\mathrm{d}z}\), so \(x^2 D^2 = \mathcal{D}(\mathcal{D}-1)\), \(xD = \mathcal{D}\), and the RHS becomes \(x(\ln x)^3 = z^3 e^z\):

$$ \bigl[\mathcal{D}(\mathcal{D}-1) - 2\mathcal{D} + 2\bigr]y = (\mathcal{D}^2 - 3\mathcal{D} + 2)y = z^3 e^z $$

2. **Complementary solution \(y_C\):** The characteristic equation \(\lambda^2 - 3\lambda + 2 = (\lambda-1)(\lambda-2) = 0\) has roots \(\lambda_1=1, \lambda_2=2\):
   \(y_C(z) = C_1 e^z + C_2 e^{2z}\).
3. **Particular solution \(y_P\) (Theorem 2 & series expansion):** Because \(e^z\) resonates with \(\lambda_1=1\), apply Theorem 2 to pull \(e^z\) to the left and shift \(\mathcal{D} \to \mathcal{D}+1\):

$$ y_P(z) = \frac{1}{(\mathcal{D}-1)(\mathcal{D}-2)}(z^3 e^z) = e^z \frac{1}{\mathcal{D}(\mathcal{D}-1)}z^3 = -e^z \frac{1}{\mathcal{D}}\bigl(1 + \mathcal{D} + \mathcal{D}^2 + \mathcal{D}^3 + \cdots\bigr)z^3 $$

   Evaluating the derivatives on \(z^3\) and integrating once via \(\frac{1}{\mathcal{D}}\) gives:
   \((1+\mathcal{D}+\mathcal{D}^2+\mathcal{D}^3)z^3 = z^3 + 3z^2 + 6z + 6 \implies y_P(z) = -e^z\left(\frac{1}{4}z^4 + z^3 + 3z^2 + 6z\right)\) (where the constant of integration is absorbed into \(C_1 e^z\)).
4. **Back-substitute to \(x\):** Replace \(e^z = x\) and \(z = \ln x\):

$$ y(x) = C_1 x + C_2 x^2 - x\left[\frac{1}{4}(\ln x)^4 + (\ln x)^3 + 3(\ln x)^2 + 6\ln x\right] $$

### Worked Example 4.31 (Third-order Cauchy–Euler & repeated root)

**Problem:** Find the general solution of the differential equation \((x^3 D^3 + xD - 1)y = 4x^5\).

**Solution:**
1. **Reduce to constant coefficients:** With \(x = e^z\) (\(z = \ln x\)), substitute \(x^3 D^3 = \mathcal{D}(\mathcal{D}-1)(\mathcal{D}-2) = \mathcal{D}^3 - 3\mathcal{D}^2 + 2\mathcal{D}\) and \(xD = \mathcal{D}\), while the RHS becomes \(4x^5 = 4e^{5z}\):

$$ (\mathcal{D}^3 - 3\mathcal{D}^2 + 2\mathcal{D} + \mathcal{D} - 1)y = (\mathcal{D}^3 - 3\mathcal{D}^2 + 3\mathcal{D} - 1)y = (\mathcal{D}-1)^3 y = 4e^{5z} $$

2. **Complementary solution \(y_C\):** The characteristic equation \((\lambda-1)^3 = 0\) has a triple root \(\lambda=1\) (\(p=3\)):
   \(y_C(z) = (C_0 + C_1 z + C_2 z^2)e^z\).
3. **Particular solution \(y_P\) (Theorem 1):** For \(a=5\), \(\varphi(5) = (5-1)^3 = 64 \neq 0\), so Theorem 1 applies immediately:
   \(y_P(z) = \frac{1}{(\mathcal{D}-1)^3}4e^{5z} = \frac{4}{(5-1)^3}e^{5z} = \frac{1}{16}e^{5z}\).
4. **Back-substitute to \(x\):** Replace \(e^z = x\), \(e^{5z} = x^5\), and \(z = \ln x\):

$$ y(x) = \bigl[C_0 + C_1\ln x + C_2(\ln x)^2\bigr]x + \frac{1}{16}x^5 $$

## 6. Interactive diagnostic simulator guide

The workbench below features 10 diagnostic challenge cards representing the 10 core methods of Chapter 4:
- **Diagnostic Challenge tab:** Inspect the order, coefficient structure, and forcing term on each card, then choose the **fastest and most accurate** method out of the 10 options. The simulator immediately reveals the first move, canonical reduced form, and exam trap.
- **Decision Matrix tab:** Filter the 10 methods by *Homogeneous Roots (§4.2)*, *D-Operator Shortcuts (§4.3.2)*, and *General / Cauchy–Euler (§4.3.1, §4.3.3, §4.4)* to compare their canonical formulas side by side.

## Exam checklist

- Does the equation have constant coefficients or the Cauchy–Euler form \(a_k x^k D^k y\)? (If Cauchy–Euler, did I reduce to constant coefficients via \(x=e^z\) first?)
- Did I expand the falling factorials \(x^2 D^2 = \mathcal{D}(\mathcal{D}-1)\) and \(x^3 D^3 = \mathcal{D}(\mathcal{D}-1)(\mathcal{D}-2)\) without dropping lower-order terms?
- Did I count the multiplicity (\(p\)) of every characteristic root and verify that \(y_C(x)\) has exactly \(n\) arbitrary constants?
- Did I check for resonance (overlap) between the forcing \(F(x)\) and the complementary solution \(y_C(x)\)?
- In sinusoidal Theorem 3, did I replace only \(D^2 \to -\beta^2\) and rationalize any remaining first-order \(D\) via its conjugate?
- In Variation of Parameters, did I divide by the leading coefficient \(a_n(x)\) to put the equation in standard form?
- Did I apply the initial conditions to the total solution \(y = y_C + y_P\) rather than to \(y_C\) alone?
