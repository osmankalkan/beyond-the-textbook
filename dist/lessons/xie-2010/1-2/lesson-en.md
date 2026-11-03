# §1.2 · General concepts and definitions

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §1.2, printed pp.6–15 / PDF pp.24–33. This is an original English study adaptation based on the definitions, Examples 1.1–1.3 and the falling-body discussion. Additional counterexamples are identified explicitly.

## Your study route

First identify what an equation says. Then use conditions to choose a member of a solution family. Separate existence/uniqueness from checking a proposed solution. The lab has four work areas: **Recognize the equation → Families and conditions → Existence and uniqueness → Verify a solution.** Classification and verification work on the examples defined here, not on arbitrary typed equations.

## 1. Equations, variables and order · p.6

A differential equation relates an unknown function and its derivatives. For y=y(x), x is independent and y is dependent. With one independent variable and ordinary derivatives, a general form is:


$$
F(x,y,y',\ldots,y^{(n)})=0
$$

This is an **ordinary differential equation (ODE)**. Not every listed argument must appear explicitly; y′=3 is an ODE too.

**Order** means the highest derivative present. y′′ has order two. In (y′)² the function has been differentiated only once: the equation is first order. The exponent 2 does not make it second order.

## 2. What determines linearity? · pp.6–7

An equation is linear when the dependent variable and its derivatives occur to the first power without multiplying one another. Their coefficients may be known functions of the independent variable. A general linear ODE has the form:


$$
a_n(x)y^{(n)}+\cdots+a_1(x)y'+a_0(x)y=f(x)
$$

The leading coefficient must not vanish on the working interval for the usual nth-order standard-form analysis. Linearity does not mean the graph of y(x) is a straight line.

For constant ω, this equation is linear:


$$
y''+\omega^2y=\sin x
$$

sin x is known and does not destroy linearity. The next equation is nonlinear because y′ is multiplied by itself:


$$
(y')^2+4y=\cos x
$$

This equation is third order and linear; x³ and 5x are coefficients depending on the independent variable. For standard third-order analysis we may, for example, work on x>0:


$$
x^3y'''+5xy'+6y=e^x
$$

**Variable-role trap:** in the following example the unknown is x=x(y), and y is independent. Consequently √y is a known coefficient, not a nonlinear function of the unknown (on y>0):


$$
\frac{d^2x}{dy^2}-\sqrt{y}\,x=5
$$

Identify the unknown function before deciding linearity.

### Constant/variable coefficients and homogeneity

For linear equations, coefficients multiplying the unknown and its derivatives may be constant or variable. A forcing term such as sin x is not a coefficient. For constant ν, Bessel's equation has variable coefficients:


$$
x^2y''+xy'+(x^2-\nu^2)y=0
$$

In this section the book calls an equation homogeneous if the zero function is a solution. **In linear standard form**, this means f(x)≡0. It is not enough to have f(x₀)=0 at one point. Although y′+y−1=0 has a written zero on the right, its standard form is y′+y=1 and it is nonhomogeneous.

The lab's coefficient and homogeneity labels concern linear classification; for the nonlinear example choose “not applied in this classification.” The word “homogeneous” is used with a different meaning in §2.2.

## 3. Partial differential equations · p.8

When u depends on several independent variables and partial derivatives occur, we have a **partial differential equation (PDE)**. For constant α>0, the one-dimensional heat equation concerns u=u(x,t):


$$
u_{xx}=\frac{1}{\alpha}u_t
$$

Its highest derivative is second order. “One spatial dimension” does not remove time as an independent variable. A special case of the two-dimensional Poisson equation with f(x,y)=1 is:


$$
u_{xx}+u_{yy}=1
$$

The book's biharmonic example is fourth order:


$$
u_{xxxx}+2u_{xxyy}+u_{yyyy}=0
$$

The mixed derivative uₓₓᵧᵧ differentiates twice in x and twice in y, four times in total. This equation is linear, constant-coefficient and homogeneous. The book also lists 2D/3D Laplace and 3D heat equations; the same classification principles apply.

## 4. A solution is a function on an interval · pp.8–9

A candidate must have the required derivatives and satisfy the equation at **every point of an interval**. Agreement at one point, or a graph that looks similar, is not proof.

The simplest family in the book is:


$$
y'=3
$$



$$
y=3x+C
$$

Each C gives a different straight line; all slopes equal 3. An initial condition y(x₀)=y₀ selects C=y₀−3x₀. A general solution describes the family; a particular solution fixes the constants. Do not confuse this meaning of “particular solution” with the later term “particular integral” for a nonhomogeneous linear equation.

Integrating the third-order example three times gives:


$$
y'''=48x
$$



$$
y=2x^4+\frac{C_1}{2}x^2+C_2x+C_3
$$

The intermediate steps are y′′=24x²+C₁ and y′=8x³+C₁x+C₂, producing three independent constants. In a regular nth-order problem, n conditions are needed to determine the constants, but counting conditions alone does not guarantee existence or uniqueness.

**Additional counterexample:** every y=C sin x solves y′′+y=0 with y(0)=y(π)=0. Changing the second condition to y(π)=1 gives no solution. Two conditions do not automatically imply one solution.

## 5. Initial and boundary value problems · pp.9–11

The book chooses x **positive downward** for vertical motion. Without medium resistance:


$$
\frac{d^2x}{dt^2}=g
$$



$$
x(t)=C_0+C_1t+\frac{gt^2}{2}
$$

If all conditions are prescribed at the same t, the problem is an **initial value problem (IVP)**. For example:


$$
x(0)=0,\quad x'(0)=v_0
$$

These give C₀=0 and C₁=v₀. Conditions at different t values instead define a **boundary value problem (BVP)**:


$$
x(0)=0,\quad x(T)=L
$$



$$
x(t)=\left(\frac{L}{T}-\frac{gT}{2}\right)t+\frac{gt^2}{2}
$$

Even when the independent variable is time, conditions at different times fit this definition of boundary conditions. Since T>0 in this example, C₁=L/T−gT/2 is uniquely determined.

The book's downward-release interpretation assumes L≥gT²/2, so initial velocity is downward or zero. If the lab uses an L below this threshold, the fitted initial velocity is negative: motion initially points upward. The mathematical BVP remains valid, but it lies outside that downward-release interpretation.

## 6. Existence and uniqueness · pp.11–12

Consider a first-order initial value problem:


$$
y'=f(x,y),\quad y(x_0)=y_0
$$

y′ is the slope of the curve. The short segments in a direction field show f(x,y); solution curves are tangent to them.

The book gives sufficient conditions: f is continuous on the rectangle R: |x−x₀|≤a, |y−y₀|≤b around the initial point, and f satisfies a uniform Lipschitz condition with respect to y there:


$$
|f(x,y_1)-f(x,y_2)|\leq L|y_1-y_2|
$$



$$
h=\min\left(a,\frac{b}{M}\right),\quad M=\max_R|f(x,y)|
$$

A unique solution is then guaranteed at least on |x−x₀|≤h. If M=0, the solution is constant and h may be taken as a. This h is a guaranteed local interval, not the largest possible interval of existence.

Continuity of fᵧ on R is a stronger, convenient sufficient condition for Lipschitz continuity. Failure of this stronger condition alone does not imply nonuniqueness. **Additional example:** f(y)=|y| is not differentiable at zero but is Lipschitz because | |y₁|−|y₂| |≤|y₁−y₂|.

The theorem is **sufficient**, not necessary. When its conditions fail, another argument is needed. “The theorem does not apply” and “there is no solution” are different conclusions.

### The book's singular initial point · Example 1.1, pp.12–14


$$
xy'=2y
$$

For x≠0, write y′=2y/x; the local solution is y=(y₀/x₀²)x². Uniqueness holds on x>0 for x₀>0 and on x<0 for x₀<0. Enlarging the region across x=0 encounters the undefined normal-form function f=2y/x.

Check the original equation at x=0: 0·y′(0)=2y(0), so y(0)=0 is required.

- If x₀=0 and y₀≠0, the equality contradicts the data: no solution exists.
- If x₀=0 and y₀=0, infinitely many solutions exist. For example:


$$
y(x)=\begin{cases}ax^2,&x\geq0,\\bx^2,&x<0.\end{cases}
$$

Even with a≠b, the function and its first derivative are continuous at zero; the first-order equation only requires this C¹ regularity. A second derivative at zero is not required. If x₀≠0 fixes the coefficient on one side, continuation through x=0 to the other side need not be unique. This does not contradict the local theorem.

**Additional counterexample: why continuity alone is not enough.** For y′=√|y|, y(0)=0, the zero solution and this family with τ≥0 all solve the IVP:


$$
y_\tau(x)=\begin{cases}0,&x\leq\tau,\\(x-\tau)^2/4,&x>\tau.\end{cases}
$$

A solution can wait before growing. Different waiting times preserve the same initial data. This family is enough to prove nonuniqueness; it is not claimed to classify every solution.

## 7. Verify an ODE solution by substitution · Example 1.2, p.14


$$
y''+3y'-4y=6\sin(3x)
$$

Use a slightly generalized candidate:


$$
y=C_1e^{-4x}+C_2e^x+A\sin(3x)+B\cos(3x)
$$



$$
y'=-4C_1e^{-4x}+C_2e^x+3A\cos(3x)-3B\sin(3x)
$$



$$
y''=16C_1e^{-4x}+C_2e^x-9A\sin(3x)-9B\cos(3x)
$$



$$
A=-\frac{39}{125},\quad B=-\frac{27}{125}
$$

The C₁ and C₂ terms cancel under the operator y′′+3y′−4y; A and B must generate the forcing. Differentiate twice and subtract the right-hand side from the left:


$$
R(x)=(-13A-9B-6)\sin(3x)+(9A-13B)\cos(3x)
$$

For R≡0 on an interval, both sine and cosine coefficients must vanish. The given A and B satisfy these identities. This is stronger than checking R=0 at one chosen x.

Load a sign error in the lab and inspect the residual. Changing C₁ and C₂ preserves validity because they are free constants of the homogeneous solution. Verification uses analytical derivatives and coefficient identities for this defined candidate family.

## 8. Verify a PDE and its conditions separately · Example 1.3, p.15

The candidate family is:


$$
u(x,t)=A\sin\left(\frac{n\pi x}{L}\right)e^{-\lambda t}
$$



$$
u_t=-\lambda u,\quad u_x=A\frac{n\pi}{L}\cos\left(\frac{n\pi x}{L}\right)e^{-\lambda t},\quad u_{xx}=-\left(\frac{n\pi}{L}\right)^2u
$$



$$
u_t=\frac{1}{9}u_{xx}
$$



$$
\lambda=\frac{n^2\pi^2}{9L^2}
$$



$$
R=u_t-\frac{1}{9}u_{xx}=\left(\frac{n^2\pi^2}{9L^2}-\lambda\right)u
$$

Here n is a positive integer. For A≠0, the required λ follows from the coefficient identity. A sine node at one x can make the pointwise residual zero without making the candidate valid throughout the domain.

The book prescribes these initial and boundary data:


$$
u(x,0)=2\sin\left(\frac{3\pi x}{L}\right),\quad u(0,t)=u(L,t)=0
$$



$$
u(x,t)=2\sin\left(\frac{3\pi x}{L}\right)e^{-\pi^2t/L^2}
$$

This problem requires A=2, n=3 and λ=π²/L². Taking n=1 with its corresponding correct λ still solves the PDE and zero endpoint conditions, but it changes the prescribed initial profile. **Solving the equation and solving the specified initial/boundary value problem are separate checks.**

The lab therefore reports three results: equation identity, endpoint conditions and the book's initial profile. As time changes, compare the candidate with the prescribed initial curve.

## Before completing the topic

State the unknown and interval when classifying an equation. Check differentiability, the identity throughout an interval, and prescribed conditions separately when verifying a solution. Do not infer a definitive existence/uniqueness conclusion merely because a sufficient condition failed.

This step completes §1.2 only. The next topic is reserved for after this work has been reviewed.


---

Study support: open the lesson workshop for guided reasoning and the practice screen for worked problems. Keep your own explanation in the per-lesson notebook.
