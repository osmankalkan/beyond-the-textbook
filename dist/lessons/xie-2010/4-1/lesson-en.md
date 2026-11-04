# §4.1 · General linear ordinary differential equations

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §4.1, printed pp.140–142 / PDF pp.158–160. Example 4.1. This is an original English study adaptation.

## What you will learn

- To write an \(n\)-th order linear equation in standard form and to read which variable its coefficients depend on.
- To recognise linearity with three quick tests: power, product and nonlinear function.
- To define the operator \(D=d/dx\), use its linearity and build the polynomial operator \(\phi(D)\).
- To prove the fundamental theorem: if \(L[u]=F\) and \(L[v]=0\), then \(L[u+v]=F\).
- To see why the general solution is \(y=y_C+y_P\), and where the \(n\) constants live.
- To avoid the variable-coefficient trap: \(D\) and \(x\) do not commute.

## Decision map

The whole section begins with one question: **is the equation linear in \(y\)?** If yes, move to operator language; if no, the tools of this section do not apply directly.

| Form you see | Question to ask | Conclusion |
| --- | --- | --- |
| \(a_n(x)y^{(n)}+\cdots+a_0(x)y=F(x)\) | Is \(a_n(x)\neq0\)? | standard form and interval of validity |
| \(y,y',\dots,y^{(n)}\) only to the first power | Do the coefficients depend only on \(x\)? | linear |
| \(y^2,\ yy',\ (y')^2,\ \sin y,\ e^y\) | Is any such term present? | not linear |
| \(\phi(D)y=F(x)\) | Are solutions \(u\) and \(v\) known? | superposition \(L[u+v]\) |
| \(y_C\) and \(y_P\) are known | Do both belong to the same \(L\)? | \(y=y_C+y_P\) |

> **One shared idea.** Linearity is not about the derivatives themselves; it is about how the equation is built from \(y\). Coefficients depending on \(x\) do not destroy linearity; multiplying \(y\) by itself does.

## 1. Definition of a linear equation

The general \(n\)-th order linear equation is

$$ a_n(x)\frac{d^n y}{dx^n}+a_{n-1}(x)\frac{d^{n-1}y}{dx^{n-1}}+\cdots+a_1(x)\frac{dy}{dx}+a_0(x)y=F(x) $$

Here \(y\) and all of its derivatives appear **to the first power**. The coefficients \(a_0(x),a_1(x),\dots,a_n(x)\) and the right-hand side \(F(x)\) depend only on the independent variable.

To put the equation in standard form, divide by the leading coefficient:

$$ y^{(n)}+p_{n-1}(x)y^{(n-1)}+\cdots+p_1(x)y'+p_0(x)y=g(x),\qquad a_n(x)\neq0 $$

Points where the leading coefficient vanishes are **singular points** of the equation; the solution interval excludes them. If the coefficients are constant, the equation has **constant coefficients**; if at least one depends on \(x\), it has **variable coefficients**.

> **What linearity means.** The symbol \(L[y]\) denotes an operation that sends one function \(y\) to another function. If the equation is linear, this operation obeys two rules: it sends a sum to the sum, and it pulls out a constant factor. Those two rules are the source of every superposition argument in the rest of the chapter.

## 2. The linearity test

Before converting to an operator, apply three tests:

1. **Power test.** Do \(y\) and its derivatives appear only to the first power? Terms such as \((y')^2\), \(y^3\), \(y''y'''\) destroy linearity.
2. **Product test.** Is \(y\) multiplied by its own derivative or by another \(y\)? Terms such as \(yy'\), \(y^2\), \(y\,y''\) are nonlinear.
3. **Function test.** Is there a nonlinear function of \(y\)? Terms such as \(\sin y\), \(e^y\), \(\sqrt{y}\), \(\ln y\) destroy linearity.

| Equation | Linear? | Reason |
| --- | --- | --- |
| \(x^2y''+(\sin x)y'+e^xy=x^3\) | Yes | Coefficients depend on \(x\); \(y\) and its derivatives are first power |
| \(y''+xy'+y=\cos x\) | Yes | The right side looks nonlinear but depends only on \(x\) |
| \(y''+3y'+2y=e^x\) | Yes | Constant-coefficient, nonhomogeneous linear equation |
| \(y''+y^2=0\) | No | The term \(y^2\) is present |
| \(y'+\sin y=x\) | No | A nonlinear function of \(y\) is present |
| \(yy'=x\) | No | \(y\) is multiplied by \(y'\) |
| \((y')^2+y=x\) | No | The derivative is squared |

> **A commonly confused point.** Having \(F(x)=\cos x\) or \(F(x)=e^x\) does not make the equation nonlinear. Linearity is about how the **unknown \(y\)** appears, not about how complicated the right side is as a function of \(x\).

## 3. The D-operator

The operator \(D\) packages differentiation into a single symbol:

$$ D=\frac{d}{dx},\qquad Dy=y',\qquad D^2y=y'',\qquad D^ky=y^{(k)} $$

\(D\) is not a number; it is an **operation**. The following three properties say that it is linear:

$$ D(u+v)=Du+Dv,\qquad D(cu)=c\,Du,\qquad D(c_1u+c_2v)=c_1Du+c_2Dv $$

These properties let us build an operator that behaves like a polynomial:

$$ \phi(D)=a_n(x)D^n+a_{n-1}(x)D^{n-1}+\cdots+a_1(x)D+a_0(x) $$

$$ \phi(D)y=F(x) $$

> **Variable-coefficient warning.** \(D(xy)=xy'+y\), while \(xDy=xy'\). Thus \(Dx\neq xD\). With constant coefficients this distinction is invisible; with variable coefficients, remember that \(D^k\) acts on **everything to its right** when \(\phi(D)\) is expanded.

## 4. Example 4.1 · Operator form

**(1)** The equation is

$$ 6x^2\frac{d^2y}{dx^2}+2x\frac{dy}{dx}-3y=x^3e^{2x} $$

The independent variable is \(x\) and the dependent variable is \(y\). With \(D=d/dx\):

$$ \left(6x^2D^2+2xD-3\right)y=x^3e^{2x} $$

**(2)** The equation is

$$ 5\frac{d^3x}{dt^3}+2\frac{d^2x}{dt^2}-7\frac{dx}{dt}+3x=\sin 8t $$

Here the roles change: \(t\) is independent and \(x\) is dependent. Hence \(D=d/dt\):

$$ \left(5D^3+2D^2-7D+3\right)x=\sin 8t,\qquad D=\frac{d}{dt} $$

> **The letter's name does not matter.** The operator always differentiates with respect to the **independent variable**. In the first equation \(x\) is independent; in the second, \(x\) is dependent. The same letter plays a different role. Label the dependent and independent variables first, then define \(D\).

## 5. The fundamental theorem

Let \(\phi(D)\) be a linear operator. Suppose \(u(x)\) is a solution of \(\phi(D)y=F(x)\), and \(v(x)\) is a solution of the homogeneous equation \(\phi(D)y=0\). Then \(u+v\) is also a solution of the original equation:

$$ \phi(D)(u+v)=\phi(D)u+\phi(D)v=F+0=F $$

The proof is one line, because \(\phi(D)\) distributes over sums. This result is also called the **superposition principle**.

The second half of the theorem is discussed less often but matters more. If \(y\) is any solution of the original equation and \(u\) is one known particular solution, then

$$ \phi(D)(y-u)=\phi(D)y-\phi(D)u=F-F=0 $$

So \(y-u\) is a solution of the homogeneous equation. Therefore **every** solution is the sum of a particular solution and a homogeneous solution. Superposition does not only produce new solutions; it describes all of them.

> **Think in both directions.** The statement “\(u+v\) is a solution” is the easy half. The statement “every solution has the form \(u+v\)” explains why the general solution is written \(y_C+y_P\). Skip the second half and you cannot check whether your family is complete.

## 6. The general solution: \(y_C+y_P\)

The fundamental theorem justifies splitting the solution into two parts:

$$ y(x)=y_C(x)+y_P(x) $$

- \(y_P\): **any one** particular solution of \(\phi(D)y=F(x)\). It contains no arbitrary constants; it carries the forcing.
- \(y_C\): the **general** solution of the homogeneous equation \(\phi(D)y=0\). At order \(n\), all \(n\) independent constants live here.
- Initial conditions determine only the constants in \(y_C\); \(y_P\) does not change.

**Worked example.** Let \(L=D^2-3D+2\) and \(L[y]=e^{3x}\). First try \(y_P\):

$$ L\left[e^{3x}\right]=\left(9-9+2\right)e^{3x}=2e^{3x}\quad\Longrightarrow\quad y_P=\frac{1}{2}e^{3x} $$

For the homogeneous equation, try \(y=e^{\lambda x}\):

$$ \lambda^2-3\lambda+2=(\lambda-1)(\lambda-2)=0\quad\Longrightarrow\quad y_C=C_1e^x+C_2e^{2x} $$

The general solution is

$$ y=\frac{1}{2}e^{3x}+C_1e^x+C_2e^{2x} $$

Check: \(L[y]=e^{3x}+0+0=e^{3x}\). Now impose \(y(0)=1\), \(y'(0)=0\):

$$ \frac{1}{2}+C_1+C_2=1,\qquad \frac{3}{2}+C_1+2C_2=0 $$

These two equations give \(C_1=5/2\), \(C_2=-2\):

$$ y=\frac{1}{2}e^{3x}+\frac{5}{2}e^x-2e^{2x} $$

> **Where should the constants go?** Adding arbitrary constants to \(y_P\) is redundant; those constants are already counted in \(y_C\). Keep the particular solution simple and collect all freedom in the homogeneous part. Then the constant count is easy to audit and the initial conditions are solved in one place.

## 7. The limits of linearity

The power of linear equations comes from superposition; that power **fails** for nonlinear equations. Even if \(y_1\) and \(y_2\) solve \(L[y]=0\), the sum \(L[y_1+y_2]=0\) is guaranteed only when \(L\) is linear.

| Situation | Linear equation | Nonlinear equation |
| --- | --- | --- |
| \(L[u]=F\), \(L[v]=0\) | \(L[u+v]=F\) | Usually false |
| Sum of two homogeneous solutions | Again a homogeneous solution | Usually not a solution |
| Multiplication by a constant | Still a solution | Usually not a solution |
| Solving for initial data | \(n\) constants, \(n\) conditions | No linear algebra |

For example, \(y_1=1/(1-x)\) and \(y_2=1/(2-x)\) both solve \(y'=y^2\), but \(y_1+y_2\) does not. The right side is quadratic in \(y\), so the superposition principle is absent.

> **The interval is part of linearity too.** If coefficients are discontinuous or the leading coefficient vanishes, the same formula may describe different solutions on different intervals. Linearity is an algebraic property; the interval of validity is an analytic one. State both.

## 8. Experiment: operator and superposition

In the workshop you choose an operator \(L\), two functions \(u,v\) and two coefficients \(\alpha,\beta\). The plot draws \(L[\alpha u+\beta v]\) together with \(\alpha L[u]+\beta L[v]\); if the equation is linear, the two curves coincide and the residual is zero. When \(v\) is chosen as a homogeneous solution, \(L[v]=0\) and the fundamental theorem runs on screen: \(L[\alpha u+\beta v]=\alpha F\).

| Operator | Coefficients | Distinguishing feature |
| --- | --- | --- |
| \(L=D^2-3D+2\) | constant | \(e^x\) and \(e^{2x}\) are homogeneous solutions |
| \(L=D^2+1\) | constant | \(\sin x\) and \(\cos x\) are homogeneous solutions |
| \(L=xD^2+D-1\) | variable | \(D\) and \(x\) do not commute |

> **What to look for on screen.** If the residual is not zero, either the chosen function lies outside the operator's domain or the linearity test was applied incorrectly. A residual of exactly zero shows that both sides went through the same algebraic operation; it is not a plotting trick but a numerical proof of linearity.

## Midterm preparation

The four worked cases cover, in order, linearity classification, conversion to operator form, solving \(y_C+y_P\) with initial conditions, and the order of \(D\) with variable coefficients. Keep the same order in each case: label the dependent and independent variables, apply the linearity test, build the operator, verify the particular and homogeneous parts separately, fix the constants from the conditions, and state the interval. Then test yourself with the twelve questions in the practice section.

## Checklist

- Did I label the dependent and independent variables correctly; with respect to which variable does \(D\) differentiate?
- Are \(y\) and all its derivatives first power; is there a term such as \(yy'\), \(y^2\), \((y')^2\)?
- Is there a nonlinear function of \(y\) such as \(\sin y\), \(e^y\), \(\sqrt{y}\)?
- Do the coefficients depend only on \(x\); on which interval is the leading coefficient nonzero?
- When building \(\phi(D)\), did I account for \(D^k\) acting on everything to its right?
- With variable coefficients, did I preserve the distinction \(D(xy)\neq xDy\)?
- Does \(y_P\) really satisfy \(F\); does \(y_C\) really satisfy the homogeneous equation?
- Does the number of independent constants in the general solution equal the order; do the conditions determine only \(y_C\)?
- Did I verify the result in the original equation and on its interval of validity?
