# §2.1 · The method of separation of variables

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.1, printed pp.16–19 / PDF pp.34–37, Examples 2.1–2.3. This is an original English study adaptation.

## Study sequence

Factor a first-order ODE into an x-factor and a y-factor; move each variable to its own side; check every factor before dividing; integrate; use the initial condition; then differentiate and substitute the result back. The exam section practices method choice and common lost-solution errors.

## 1. When can variables be separated?

A first-order equation is separable when its right side factors into a function of x times a function of y:

$$\frac{dy}{dx}=f(x)\,\phi(y)$$

$$e^{x+y^2}=e^x e^{y^2}$$

The right-hand side is a product of an x-only and a y-only factor. By contrast, expressions such as <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi mathvariant="normal">ln</mi><mo>(</mo><mi>x</mi><mo>+</mo><mn>2</mn><mi>y</mi><mo>)</mo></mrow></math>, <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi mathvariant="normal">sin</mi><mo>(</mo><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mi>y</mi><mo>)</mo></mrow></math>, and <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>x</mi><msup><mi>y</mi><mn>2</mn></msup><mo>+</mo><msup><mi>x</mi><mn>2</mn></msup></mrow></math> generally do not factor this way. Moving terms across the equality is not sufficient: each side must depend on only one variable.

## 2. Separate, but check what you divide by

On a region where <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>φ</mi><mo>(</mo><mi>y</mi><mo>)</mo><mo>≠</mo><mn>0</mn></mrow></math>, move the y-factor left and the x-factor right, then integrate:

$$\frac{1}{\phi(y)}\,dy=f(x)\,dx$$

$$\int\frac{dy}{\phi(y)}=\int f(x)\,dx+C$$

The result may be implicit. An implicit family can still be a complete solution. Preserve the interval where the integrals are defined and the absolute values required by logarithms.

**Exam check:** Before dividing by <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>φ</mi><mo>(</mo><mi>y</mi><mo>)</mo></mrow></math>, solve <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>φ</mi><mo>(</mo><mi>y</mi><mo>)</mo><mo>=</mo><mn>0</mn></mrow></math> and test each root in the original equation. Division can discard constant solutions. A root may already be included in the general family; otherwise, state it separately.

## 3. Example 2.1 · An exponential equation

The book gives <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>′</mo><mo>+</mo><mfrac><mn>1</mn><mi>y</mi></mfrac><msup><mi>e</mi><mrow><msup><mi>y</mi><mn>2</mn></msup><mo>+</mo><mn>3</mn><mi>x</mi></mrow></msup><mo>=</mo><mn>0</mn></mrow></math>, with <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>≠</mo><mn>0</mn></mrow></math>. Thus the equation is separated by rearranging it, while respecting its stated domain:

$$-y e^{-y^2}\,dy=e^{3x}\,dx$$

$$\frac12e^{-y^2}=\frac13e^{3x}+C$$

Use <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>u</mi><mo>=</mo><mo>−</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></math> on the left and <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>v</mi><mo>=</mo><mn>3</mn><mi>x</mi></mrow></math> on the right. The constant C remains arbitrary. The equation is defined on regions where <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>≠</mo><mn>0</mn></mrow></math>; state the interval and the condition that makes the implicit expression real.

## 4. Example 2.2 · A trigonometric equation

For <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi mathvariant="normal">tan</mi><mi>y</mi><mspace width="0.16em"/><mi>d</mi><mi>x</mi><mo>−</mo><mi mathvariant="normal">cot</mi><mi>x</mi><mspace width="0.16em"/><mi>d</mi><mi>y</mi><mo>=</mo><mn>0</mn></mrow></math>, separate and integrate on regions satisfying the nonzero-denominator conditions. This gives the family

$$\cos x\,\sin y=C$$

If an intermediate step divides by <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi mathvariant="normal">sin</mi><mi>y</mi></mrow></math>, check <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi mathvariant="normal">sin</mi><mi>y</mi><mo>=</mo><mn>0</mn></mrow></math>, or <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>=</mo><mi>k</mi><mi>π</mi></mrow></math>, in the original differential form. In this example those solutions are already included as the C=0 members of the family. Always check roots; do not assume they are lost or included.

## 5. Example 2.3 · A solution outside the family

For <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>x</mi><msup><mi>y</mi><mn>3</mn></msup><mspace width="0.16em"/><mi>d</mi><mi>x</mi><mo>+</mo><mo>(</mo><mi>y</mi><mo>+</mo><mn>1</mn><mo>)</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>x</mi></mrow></msup><mspace width="0.16em"/><mi>d</mi><mi>y</mi><mo>=</mo><mn>0</mn></mrow></math>, the branch <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>≠</mo><mn>0</mn></mrow></math> separates. Integration, including integration by parts, gives

$$ (x-1)e^x=\frac1y+\frac{1}{2y^2}+C$$

But <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>=</mo><mn>0</mn></mrow></math> also solves the original differential form. No finite C puts it in the displayed family, so it must be listed separately as a singular solution. A complete answer includes the general family and any exceptional branches exposed by division.

## 6. Initial data and verification

An initial condition may select C, but substitute it directly into the implicit family and check its domain:

$$y(x_0)=y_0$$

Differentiate the candidate and substitute it into the original equation. State the interval where the identity holds and verify that factors divided out are nonzero there. Check separately whether the interval can include a point where a divided factor vanishes.

## Detailed integration and verification

### Example 2.1 · Exponential

**1. Identify domain and factors**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><msup><mrow><mi>y</mi></mrow><mrow><mo>′</mo></mrow></msup><mo>=</mo><mo>−</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>3</mn><mi>x</mi></mrow></msup><mfrac><mrow><msup><mrow><mi>e</mi></mrow><mrow><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></msup></mrow><mrow><mi>y</mi></mrow></mfrac></mrow></math>

Example 2.1 is defined only for y≠0. Zero is not an equilibrium here; the original expression is undefined there.

**2. Separate variables**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mo>−</mo><mi>y</mi><msup><mrow><mi>e</mi></mrow><mrow><mo>−</mo><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></msup><mi>d</mi><mi>y</mi><mo>=</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>3</mn><mi>x</mi></mrow></msup><mi>d</mi><mi>x</mi></mrow></math>

Move the y-dependent factor left. The left side depends only on y and the right only on x.

**3. Make two substitutions**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mtable columnalign="left"><mtr><mtd><mrow><mi>u</mi><mo>=</mo><mo>−</mo><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></mtd></mtr><mtr><mtd><mrow><mi>d</mi><mi>u</mi><mo>=</mo><mo>−</mo><mn>2</mn><mi>y</mi><mi>d</mi><mi>y</mi></mrow></mtd></mtr><mtr><mtd><mrow><mi>z</mi><mo>=</mo><mn>3</mn><mi>x</mi></mrow></mtd></mtr><mtr><mtd><mrow><mi>d</mi><mi>z</mi><mo>=</mo><mn>3</mn><mi>d</mi><mi>x</mi></mrow></mtd></mtr></mtable></mrow></math>

On the left −y e^(−y²)dy=(1/2)eᵘdu; on the right dx=dz/3. Preserve signs and factors.

**4. Integrate and state the implicit family**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mfrac><mrow><mn>1</mn></mrow><mrow><mn>2</mn></mrow></mfrac><msup><mrow><mi>e</mi></mrow><mrow><mo>−</mo><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></msup><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>3</mn></mrow></mfrac><msup><mrow><mi>e</mi></mrow><mrow><mn>3</mn><mi>x</mi></mrow></msup><mo>+</mo><mi>C</mi></mrow></math>

One arbitrary constant is sufficient. You need not solve explicitly for y at this point.

**5. Differentiate and restrict the domain**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mo>−</mo><mi>y</mi><msup><mrow><mi>e</mi></mrow><mrow><mo>−</mo><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></msup><msup><mrow><mi>y</mi></mrow><mrow><mo>′</mo></mrow></msup><mo>=</mo><msup><mrow><mi>e</mi></mrow><mrow><mn>3</mn><mi>x</mi></mrow></msup></mrow></math>

Implicit differentiation recovers the original equation. A real explicit branch with y≠0 requires 0<2e^(3x)/3+2C<1; equality would reach excluded y=0.

### Example 2.3 · Singular solution

**1. Check the excluded branch first**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mtable columnalign="left"><mtr><mtd><mrow><mi>x</mi><msup><mrow><mi>y</mi></mrow><mrow><mn>3</mn></mrow></msup><mi>d</mi><mi>x</mi><mo>+</mo><mrow><mo>(</mo><mi>y</mi><mo>+</mo><mn>1</mn><mo>)</mo></mrow><msup><mrow><mi>e</mi></mrow><mrow><mo>−</mo><mi>x</mi></mrow></msup><mi>d</mi><mi>y</mi><mo>=</mo><mn>0</mn></mrow></mtd></mtr><mtr><mtd><mrow><mi>y</mi><mo>=</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></math>

In Example 2.3, y=0 with dy=0 satisfies the original differential form. Dividing by y³ loses this branch.

**2. Separate the nonzero branch**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>x</mi><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi></mrow></msup><mi>d</mi><mi>x</mi><mo>=</mo><mo>−</mo><mfrac><mrow><mi>y</mi><mo>+</mo><mn>1</mn></mrow><mrow><msup><mrow><mi>y</mi></mrow><mrow><mn>3</mn></mrow></msup></mrow></mfrac><mi>d</mi><mi>y</mi></mrow></math>

Multiply by eˣ/y³; only y=0 is excluded. No division by y+1 is needed here.

**3. Left integral: integration by parts**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mo>∫</mo><mi>x</mi><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi></mrow></msup><mi>d</mi><mi>x</mi><mo>=</mo><mi>x</mi><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi></mrow></msup><mo>−</mo><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi></mrow></msup></mrow></math>

Choose u=x and dv=eˣdx, so du=dx and v=eˣ. Use ∫u dv=uv−∫v du.

**4. Right integral: power rule**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mo>−</mo><mo>∫</mo><mrow><mo>(</mo><msup><mrow><mi>y</mi></mrow><mrow><mo>−</mo><mn>2</mn></mrow></msup><mo>+</mo><msup><mrow><mi>y</mi></mrow><mrow><mo>−</mo><mn>3</mn></mrow></msup><mo>)</mo></mrow><mi>d</mi><mi>y</mi><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>2</mn><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></mfrac></mrow></math>

−∫y⁻²dy=1/y and −∫y⁻³dy=1/(2y²). The two negative signs yield positive terms.

**5. Include the family and singular solution**

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mtable columnalign="left"><mtr><mtd><mrow><mrow><mo>(</mo><mi>x</mi><mo>−</mo><mn>1</mn><mo>)</mo></mrow><msup><mrow><mi>e</mi></mrow><mrow><mi>x</mi></mrow></msup><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>2</mn><msup><mrow><mi>y</mi></mrow><mrow><mn>2</mn></mrow></msup></mrow></mfrac><mo>+</mo><mi>C</mi></mrow></mtd></mtr><mtr><mtd><mrow><mi>y</mi><mo>=</mo><mn>0</mn></mrow></mtd></mtr></mtable></mrow></math>

No finite C in the implicit family gives y=0. Differentiation gives x eˣ=−(y+1)y′/y³, an important sign check.

### Example 2.2 · From logarithms to the implicit family

The separated equation is sin x/cos x dx = cos y/sin y dy. The left antiderivative is −ln|cos x| and the right is ln|sin y|. Thus ln|cos x sin y| is constant. On exponentiation, absorb the sign into a new constant: cos x sin y=C. The intermediate calculation requires nonzero cos x and sin y. Check the C=0 branches separately against the original domain sin x≠0, cos y≠0; in particular, y=kπ is a valid solution.

Differentiate to verify: −sin x sin y + cos x cos y y′=0. On a branch with cos x≠0, this gives y′=tan x tan y, matching the normal form of the original equation. Do not include undefined points merely because the implicit product is defined there.

## Midterm practice

Suggested time: 18 minutes. Total: 20 points. Try each question before opening its worked solution. Credit is awarded for the separation, exceptional cases, initial data, verification, and domain—not only the final expression.

### Problem 1 · Choose the method (4 points, 3 minutes)

Separate <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>′</mo><mo>=</mo><mi>x</mi><mo>(</mo><mn>1</mn><mo>+</mo><msup><mi>y</mi><mn>2</mn></msup><mo>)</mo></mrow></math> and give the general solution. Explain why choosing a different integration constant convention does not change the family.

### Problem 2 · Division by zero (5 points, 4 minutes)

Solve <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>′</mo><mo>=</mo><mi>y</mi><mo>(</mo><mn>1</mn><mo>−</mo><mi>y</mi><mo>)</mo></mrow></math>. Which solutions must be checked before dividing by <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>(</mo><mn>1</mn><mo>−</mo><mi>y</mi><mo>)</mo></mrow></math>? Are these constant solutions already contained in the general family?

### Problem 3 · Initial condition (5 points, 5 minutes)

Solve <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>′</mo><mo>=</mo><mi>x</mi><mi>y</mi></mrow></math>, <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>(</mo><mn>0</mn><mo>)</mo><mo>=</mo><mn>2</mn></mrow></math>. Determine C and verify by differentiation. Is the solution defined for every real x?

### Problem 4 · Exceptional solution (6 points, 6 minutes)

For <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>′</mo><mo>=</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></math>, <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>y</mi><mo>(</mo><mn>0</mn><mo>)</mo><mo>=</mo><mn>0</mn></mrow></math>, identify the possible loss during separation. Give a solution satisfying the initial condition and state which theorem’s assumptions you would inspect before claiming uniqueness.

**Marking:** Problem 1: separation 1, integral 1, interval 1, derivative check 1. Problem 2: equilibria 1, partial fractions 1, integral 1, explicit family 1, complete answer/domain 1. Problem 3: zero branch 1, integral 1, constant 1, verification 1, interval 1. Problem 4: excluded branch 2, nonzero family 1, initial datum 1, uniqueness 1, conclusion/interval 1. Open the worked solutions on the Midterm preparation screen.

## Checklist

- Does the right side really factor as <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mi>φ</mi><mo>(</mo><mi>y</mi><mo>)</mo></mrow></math>?
- Can the factor I divide by be zero, and does its root solve the original equation?
- Did I integrate correctly and preserve logarithm domains?
- Did I apply the initial condition?
- Did I substitute back and state the interval?

Completing this step completes §2.1 only. The next topic follows after review.


---

Study support: open the lesson workshop for guided reasoning and the practice screen for worked problems. Keep your own explanation in the per-lesson notebook.
