# §2.4 · First-order linear equations and Bernoulli equations

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.4, printed pp.55–60 / PDF pp.73–78, Examples 2.30–2.34. This is an original English study adaptation.

## What you will learn

- To bring an equation to the standard form \(y'+P(x)y=Q(x)\) and read off \(P\) and \(Q\).
- To build the integrating factor \(\mu=e^{\int P\,dx}\) and write the line \((\mu y)'=\mu Q\).
- To recognise when making \(x\) the dependent variable shortens the work.
- To read \(n\) from a \(y^n\) term and set up the transformation \(u=y^{1-n}\).
- To state the branch \(y=0\), the poles and the connected interval separately.

## Decision map

The whole section reduces to two questions: **is the equation linear, and if not, which transformation linearises it?**

| Shape of the equation | Route | Result |
| --- | --- | --- |
| \(y'+P(x)y=Q(x)\) | \(\mu=e^{\int P\,dx}\) | \(\mu y=\int\mu Q\,dx+C\) |
| \(x'+P(y)x=Q(y)\) | Same factor, variables swapped | \(x=e^{-\int P\,dy}\left(\int Qe^{\int P\,dy}dy+C\right)\) |
| A \(y^n\) term with \(n=0\) | Already linear | The \(\mu\) route |
| A \(y^n\) term with \(n=1\) | Separable | \(y'=(Q-P)y\) |
| A \(y^n\) term with \(n\neq0,1\) | \(u=y^{1-n}\) | \(u'+(1-n)Pu=(1-n)Q\) |
| \(n>0\) | \(y=0\) is a separate solution | Write it before dividing |

> **One shared idea.** A linear equation is finished by a single factor; in a Bernoulli equation you first find the transformation that makes it linear and only then the factor. In both cases the real work hides in the integral and in the root of whatever you divided by.

## 1. The first-order linear equation

Write the standard form so that \(y\) and \(y'\) appear to the first power and the coefficients depend on \(x\) alone:

$$y'+P(x)y=Q(x)$$

Turning the equation into differential form and running the exactness test shows that it is usually not exact, but the quotient depends on one variable only:

$$M(x,y)=P(x)y-Q(x),\qquad N(x,y)=1,\qquad \frac{M_y-N_x}{N}=P(x)$$

So a factor depending on \(x\) alone always exists, and it always has the same shape:

$$\mu(x)=e^{\int P(x)\,dx}$$

Multiplying by \(\mu\) turns the left side into the derivative of a product; this is the only trick in the method:

$$(\mu y)'=\mu Q$$

Integrating both sides gives the general solution:

$$\mu y=\int \mu Q\,dx+C$$

$$y=e^{-\int P\,dx}\left(\int Q e^{\int P\,dx}\,dx+C\right)$$

> **Why does \(\mu\) have this shape?** Put \((\mu y)'=\mu y'+\mu' y\) beside \(\mu(y'+Py)=\mu y'+\mu P y\); what remains is the condition \(\mu'=\mu P\). That separable equation gives \(\mu=e^{\int P\,dx}\), so the factor is not a formula to memorise but the result of a one-line derivation.

Sometimes solving for \(x\) as a function of \(y\) shortens the integral. The rule is the same; only the variables swap roles:

$$\frac{dx}{dy}+P(y)x=Q(y)$$

$$x=e^{-\int P(y)\,dy}\left(\int Q(y)e^{\int P(y)\,dy}\,dy+C\right)$$

The solution interval is the connected interval on which \(P\) and \(Q\) are defined and which contains the initial datum. The sign of a logarithm with absolute value stays fixed on the chosen interval; poles are never included.

## 2. Example 2.30 · A linear equation with tan x

$$y'=1+3y\tan x$$

Bring the equation to standard form and read off \(P\) and \(Q\):

$$y'-3\tan x\,y=1,\qquad P(x)=-3\tan x,\quad Q(x)=1$$

The integral needed for the factor is the logarithm of \(\tan x\):

$$\int P\,dx=\int-3\tan x\,dx=3\ln|\cos x|$$

The exponential and the logarithm cancel, so the factor becomes an algebraic power:

$$\mu=e^{3\ln|\cos x|}=\cos^3x$$

Multiplying the equation by \(\cos^3x\) makes the left side a single differential:

$$d(y\cos^3x)=\cos^3x\,dx$$

To integrate the right side, write \(\cos^3x=(1-\sin^2x)\cos x\) and put \(u=\sin x\). The two lines merge into one step:

$$\int\cos^3x\,dx=\int(1-\sin^2x)\,d(\sin x)\quad\Longrightarrow\quad \int\cos^3x\,dx=\sin x-\frac{\sin^3x}{3}$$

The implicit solution and the general solution then follow in turn:

$$y\cos^3x=\sin x-\frac{\sin^3x}{3}+C\quad\Longrightarrow\quad y=\sec^3x\left(\sin x-\frac{\sin^3x}{3}+C\right)$$

> **Interval and verification.** On the connected interval between the poles \(x=\pm\pi/2\) we have \(\cos x\neq0\), so \(\mu\) is defined. Differentiating returns \(y'=1+3y\tan x\), and both sides hold on that same interval.

## 3. Example 2.31 · Solving for x as a function of y

$$y\,dx-(e^y+2xy-2x)\,dy=0$$

Isolate the branch \(y=0\) first; it satisfies the original equation and must be written before any division:

$$y=0$$

For \(y\neq0\), divide by \(y\) and make \(x\) the dependent variable. Collect the coefficient in front of \(x\):

$$\frac{dx}{dy}+\frac{2(1-y)}{y}x=\frac{e^y}{y}$$

Now \(P\) and \(Q\) can be read off directly:

$$P(y)=\frac{2(1-y)}{y},\qquad Q(y)=\frac{e^y}{y}$$

The integral splits into two simple pieces:

$$\int P\,dy=\int\left(\frac2y-2\right)dy=2\ln|y|-2y$$

The factor and the resulting right side simplify together:

$$\mu=e^{2\ln|y|-2y}=y^2e^{-2y},\qquad \mu Q=ye^{-y}$$

The equation is now a single differential:

$$d(xy^2e^{-2y})=ye^{-y}\,dy$$

One integration by parts is enough:

$$\int ye^{-y}\,dy=-(y+1)e^{-y}$$

Writing the implicit solution and multiplying by \(e^{2y}\) simplifies the family:

$$xy^2e^{-2y}=C-(y+1)e^{-y}\quad\Longrightarrow\quad xy^2=Ce^{2y}-e^y(y+1)$$

The branch \(y=0\) joins the general family through a single choice of the constant:

$$C=1\quad\Longrightarrow\quad y=0$$

> **Why is this branch written separately?** Dividing by \(y\) loses the case \(y=0\). Choosing \(C=1\) in the family brings it back; even so, if the initial datum selects the branch \(y>0\), the solution cannot cross \(y=0\) and the interval stays inside \(y>0\).

## 4. Example 2.32 · Swapping roles when cos y appears in the coefficient

$$y'=\frac{1}{x\cos y+\sin2y},\qquad \cos y\neq0$$

Invert the equation and write \(x\) as a function of \(y\); the sign of the coefficient changes:

$$\frac{dx}{dy}-\cos y\,x=\sin2y$$

$$P(y)=-\cos y,\qquad Q(y)=\sin2y$$

The integral and the factor come out in one line:

$$\int P\,dy=-\sin y,\qquad \mu=e^{-\sin y}$$

The left side is again the derivative of a product:

$$d(xe^{-\sin y})=\sin2y\,e^{-\sin y}\,dy$$

To integrate the right side, use \(\sin2y=2\sin y\cos y\) and put \(u=\sin y\):

$$\int\sin2y\,e^{-\sin y}\,dy=\int2u e^{-u}\,du$$

Integration by parts:

$$\int2u e^{-u}\,du=-2e^{-u}(u+1)$$

Back-substitution and multiplication by \(e^{\sin y}\) give the general solution:

$$xe^{-\sin y}=C-2e^{-\sin y}(\sin y+1)\quad\Longrightarrow\quad x=Ce^{\sin y}-2(\sin y+1)$$

> **Domain limit.** At the points with \(\cos y=0\) the derivative \(dx/dy\) is undefined, so initial data cannot be placed there. Differentiation returns the inverted original equation exactly.

## 5. Bernoulli equations

A Bernoulli equation is a linear term with a \(y^n\) factor attached:

$$y'+P(x)y=Q(x)y^n$$

The special cases \(n=0\) and \(n=1\) are treated separately, because neither needs a transformation:

$$n=0:\quad y'+P(x)y=Q(x),\qquad n=1:\quad y'=(Q(x)-P(x))y$$

| \(n\) | Type of equation | What to do |
| --- | --- | --- |
| \(0\) | Linear | \(\mu=e^{\int P\,dx}\) |
| \(1\) | Separable | Separate the variables |
| \(n\neq0,1\) | Nonlinear | \(u=y^{1-n}\) |

When \(n>0\) the line \(y=0\) is a solution; write it separately before dividing by \(y^n\):

$$y=0\quad(n>0)$$

For \(y\neq0\) the transformation is \(u=y^{1-n}\):

$$u=y^{1-n}$$

The derivative chain comes from the exponent \(1-n\):

$$y^{1-n}=u,\qquad y^{-n}\frac{dy}{dx}=\frac{1}{1-n}\frac{du}{dx}$$

Multiplying the equation by \(y^{-n}\) brings it to linear form:

$$\frac{du}{dx}+(1-n)P(x)u=(1-n)Q(x)$$

> **Order matters.** Write the branch \(y=0\) first, then set up \(u=y^{1-n}\). After the transformation, solve the first-order linear equation for \(u\); restore \(u=y^{1-n}\) at the very end, where the initial datum decides which branch of \(y\) is selected.

## 6. Example 2.33 · A Bernoulli initial-value problem

$$2xyy'=y^2-2x^3,\qquad y(1)=2$$

Dividing by \(2xy\) reveals \(n=-1\):

$$y'-\frac{1}{2x}y=-x^2y^{-1},\qquad n=-1$$

Since \(n=-1\), choose \(u=y^{1-n}=y^2\). First multiply the equation by \(y\) so that \(yy'\) and \(y^2\) become visible:

$$yy'-\frac{1}{2x}y^2=-x^2$$

The transformation and its derivative:

$$u=y^2,\qquad u'=2yy'$$

Substitution gives a linear equation:

$$u'-\frac1xu=-2x^2$$

Here \(P=-1/x\); the factor and the resulting line are written together:

$$\mu=\frac1x,\qquad \left(\frac{u}{x}\right)'=-2x$$

The integral, the back-substitution and the return to \(y^2\) form one chain:

$$\frac{u}{x}=-x^2+C\quad\Longrightarrow\quad u=x(C-x^2)\quad\Longrightarrow\quad y^2=x(C-x^2)$$

The initial datum \(y(1)=2\) fixes the constant:

$$4=1(C-1)\quad\Longrightarrow\quad C=5$$

The upper branch is selected:

$$y^2=x(5-x^2),\qquad y=\sqrt{x(5-x^2)}$$

The connected interval is where the root and the denominator are defined:

$$1<x<\sqrt5$$

> **Open endpoint.** At \(x=\sqrt5\) we get \(y=0\), but that point does not satisfy the original equation, so the interval is written open. The point \(x=0\) also lies outside it because of the initial datum.

## 7. Example 2.34 · A Bernoulli equation with n=4 and integration by parts

$$3y\,dx-(x+3x^4y\ln y)\,dy=0,\qquad y>0$$

Dividing by \(3y\) and making \(x\) the dependent variable reveals \(n=4\):

$$\frac{dx}{dy}-\frac{1}{3y}x=x^4\ln y,\qquad n=4$$

Dividing by \(x^4\) prepares the left side for the transformation:

$$x^{-4}\frac{dx}{dy}-\frac{1}{3y}x^{-3}=\ln y$$

The transformation \(u=x^{-3}\) and its derivative carry the equation to linear form:

$$u=x^{-3},\qquad u'=-3x^{-4}x'\quad\Longrightarrow\quad u'+\frac1yu=-3\ln y$$

The factor comes out in one line:

$$\mu=e^{\int\frac1y\,dy}=y$$

The left side is again the derivative of a product:

$$d(yu)=-3y\ln y\,dy$$

The integration by parts settles in two lines:

$$\int-3y\ln y\,dy=-3\left(\frac{y^2}{2}\ln y-\frac{y^2}{4}\right)\quad\Longrightarrow\quad \int-3y\ln y\,dy=\frac34y^2(1-2\ln y)$$

The implicit solution and the explicit form for \(u\):

$$yu=\frac34y^2(1-2\ln y)+C\quad\Longrightarrow\quad u=\frac1y\left[C-\frac34y^2(2\ln y-1)\right]$$

Restoring \(u=x^{-3}\) gives the general solution:

$$x^3=\frac{4y}{4C-3y^2(2\ln y-1)}$$

> **Domain.** \(y>0\) is required, since \(\ln y\) and the division by \(y\) demand it. Differentiation returns the original equation.

## 8. Decision summary

Bring the equation to standard form first. If \(y'\) and \(y\) appear to the first power, take the linear route:

$$y'+P(x)y=Q(x)\quad\Longrightarrow\quad\mu=e^{\int P\,dx}$$

If a \(y^n\) term is present with \(n\neq0,1\), take the Bernoulli route:

$$y'+P(x)y=Q(x)y^n,\;n\neq0,1\quad\Longrightarrow\quad u=y^{1-n}$$

If solving for \(x\) as a function of \(y\) is easier, the same factor rule applies with the variables swapped:

$$\frac{dx}{dy}+P(y)x=Q(y)\quad\Longrightarrow\quad\mu=e^{\int P\,dy}$$

| Door | When to use it | What it does |
| --- | --- | --- |
| Standard form | Always the first step | Makes \(P\) and \(Q\) visible |
| \(\mu=e^{\int P}\) | The equation is linear | Turns the left side into \((\mu y)'\) |
| Swapping roles | The integral in \(x\) is hard | Makes \(x\) the dependent variable |
| \(u=y^{1-n}\) | A \(y^n\) term with \(n\neq0,1\) | Linearises the Bernoulli equation |

In every case, state the lost branches and the domain limits separately:

$$y=0\quad(n>0),\qquad \cos x\neq0,\qquad y\neq0$$

## 9. Experiment: compare four families

The workshop contains four analytic families, and A and B choose different initial data within the same family:

- **tan family:** \(y'=1+3y\tan x\), solution \(y=\sec^3x(\sin x-\sin^3x/3+C)\). The poles \(x=\pm\pi/2\) are excluded.
- **x(y) family:** \(y\,dx-(e^y+2xy-2x)dy=0\), solution \(xy^2=Ce^{2y}-e^y(y+1)\). The branch \(y=0\) is separate.
- **Bernoulli n=−1:** \(2xyy'=y^2-2x^3\), solution \(y^2=x(C-x^2)\). The positive branch and the interval \(0<x<\sqrt5\) are shown.
- **Bernoulli n=4:** \(3y\,dx-(x+3x^4y\ln y)dy=0\), solution \(x^3=4y/[4C-3y^2(2\ln y-1)]\). \(y>0\) is required.

Predict first: in which family does a growing \(C\) widen the curve at both ends, and in which does only one end move? At the chosen initial point, the value of \(C\), of the factor or of \(u\), the solution at the inspection point and the slope are read together.

> **Prediction.** In the tan family the interval is squeezed between two poles, so \(C\) only shifts the curve; in the Bernoulli \(n=-1\) family the interval reaches up to \(\sqrt5\) and a growing \(C\) pushes the right end. Do not conclude that the solution ends where the curve leaves the window; the real limits are the domains stated above.

## Midterm preparation

The four worked cases cover, in order, the linear tan equation, the equation with \(x\) dependent, the \(n=-1\) Bernoulli initial-value problem and the \(n=4\) Bernoulli equation. Keep the same order in each case: identify the type, reach standard form, build the factor or the transformation, integrate with the intermediate steps, apply the initial datum, write the lost branch and verify by differentiation. Then test yourself with the eleven questions in the practice section.

## Checklist

- Is the equation really in the form \(y'+P(x)y=Q(x)\), and did I read \(P\) and \(Q\) correctly?
- If a \(y^n\) term is present, what is \(n\); did I separate the special cases \(n=0\) and \(n=1\)?
- Was \(\mu\) built with the correct sign, and are the absolute value and the interval consistent?
- Did I build the derivative chain correctly in the transformation \(u=y^{1-n}\)?
- Did I write the lost branches and domain limits such as \(y=0\), \(\cos x=0\), \(\cos y=0\) and \(y>0\)?
- Which branch does the initial datum select, and what is the connected interval?


---

Study support: open the lesson workshop for guided reasoning and the practice screen for worked problems. Keep your own explanation in the per-lesson notebook.
