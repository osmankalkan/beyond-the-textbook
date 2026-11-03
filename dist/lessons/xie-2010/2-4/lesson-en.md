# §2.4 · Linear first-order equations and Bernoulli equations

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.4, printed pp.55–60 / PDF pp.73–78. Examples 2.30–2.34. This is an original English study adaptation.

## Your study plan for this topic

First put the equation into the standard form \(y'+P(x)y=Q(x)\). If \(y\) and \(y'\) occur only to the first power, the equation is linear and a single integrating factor is enough. If a \(y^n\) term appears, identify \(n\): \(n=0\) is linear and \(n=1\) is separable; for other values the substitution \(u=y^{1-n}\) linearizes the equation. After building the factor or substitution, integrate, apply the initial datum, and state the lost \(y=0\) branch and the domain separately. The midterm section works through these decisions in four timed, scored problems.

## 1. Linear first-order equations

Standard form:

$$y'+P(x)y=Q(x)$$

Here \(y\) and \(y'\) occur to the first power, and the coefficients depend only on \(x\). In differential form,

$$M(x,y)=P(x)y-Q(x),\qquad N(x,y)=1$$

Since \(M_y=P(x)\) and \(N_x=0\), the equation is generally not exact. However, the quotient depends only on \(x\):

$$\frac{M_y-N_x}{N}=P(x)$$

Therefore an integrating factor depending only on \(x\) exists:

$$\mu(x)=e^{\int P(x)\,dx}$$

Multiplying the equation by \(\mu\) turns the left side into the derivative of a product:

$$(\mu y)'=\mu Q$$

Integrating both sides gives

$$\mu y=\int \mu Q\,dx+C$$

and hence the general solution

$$y=e^{-\int P\,dx}\left(\int Q e^{\int P\,dx}\,dx+C\right)$$

Sometimes it is easier to solve for \(x\) as a function of \(y\). The same method works in the form

$$\frac{dx}{dy}+P(y)x=Q(y)$$

$$x=e^{-\int P(y)\,dy}\left(\int Q(y)e^{\int P(y)\,dy}\,dy+C\right)$$

The solution interval is the connected interval where \(P\) and \(Q\) are defined and which contains the initial datum. In logarithms with absolute values the sign stays fixed on the chosen interval; poles are not included.

## 2. Example 2.30 · A linear equation with a tan x coefficient

$$y'=1+3y\tan x$$

Put the equation into standard form:

$$y'-3\tan x\,y=1,\qquad P(x)=-3\tan x,\quad Q(x)=1$$

The integral needed for the factor is

$$\int P\,dx=\int-3\tan x\,dx=3\ln|\cos x|$$

Therefore

$$\mu=e^{3\ln|\cos x|}=\cos^3x$$

Multiplying by \(\cos^3x\) makes the left side an exact differential:

$$d(y\cos^3x)=\cos^3x\,dx$$

To integrate the right side, write \(\cos^3x=(1-\sin^2x)\cos x\) and set \(u=\sin x\):

$$\int\cos^3x\,dx=\int(1-\sin^2x)\,d(\sin x)$$

$$\int\cos^3x\,dx=\sin x-\frac{\sin^3x}{3}$$

Thus

$$y\cos^3x=\sin x-\frac{\sin^3x}{3}+C$$

and the general solution is

$$y=\sec^3x\left(\sin x-\frac{\sin^3x}{3}+C\right)$$

The solution interval is the connected interval between the poles \(x=\pm\pi/2\). Differentiate and check that it satisfies the original equation:

$$y'=1+3y\tan x,\qquad \cos x\neq0$$

## 3. Example 2.31 · Solving for x as a function of y

$$y\,dx-(e^y+2xy-2x)\,dy=0$$

First separate the branch \(y=0\):

$$y=0$$

This branch satisfies the original equation. For \(y\neq0\), divide by \(y\) and treat \(x\) as the dependent variable:

$$\frac{dx}{dy}+\frac{2(1-y)}{y}x=\frac{e^y}{y}$$

Here

$$P(y)=\frac{2(1-y)}{y},\qquad Q(y)=\frac{e^y}{y}$$

The integral is

$$\int P\,dy=\int\left(\frac2y-2\right)dy=2\ln|y|-2y$$

so the factor is

$$\mu=e^{2\ln|y|-2y}=y^2e^{-2y}$$

The right side becomes

$$\mu Q=y^2e^{-2y}\cdot\frac{e^y}{y}=ye^{-y}$$

The equation is now

$$d(xy^2e^{-2y})=ye^{-y}\,dy$$

Integration by parts gives

$$\int ye^{-y}\,dy=-(y+1)e^{-y}$$

Hence

$$xy^2e^{-2y}=C-(y+1)e^{-y}$$

and multiplying by \(e^{2y}\) gives the general solution

$$xy^2=Ce^{2y}-e^y(y+1)$$

The branch \(y=0\) is included in the general solution by the choice

$$C=1\quad\Longrightarrow\quad y=0$$

If the initial datum selects the branch \(y>0\), the solution cannot cross \(y=0\). Implicit differentiation recovers the original equation:

$$\frac{dx}{dy}=\frac{e^y}{y}+2x\left(1-\frac1y\right),\qquad y\neq0$$

## 4. Example 2.32 · Exchanging roles with a cos y coefficient

$$\frac{dy}{dx}=\frac{1}{x\cos y+\sin2y},\qquad \cos y\neq0$$

Invert the equation and write \(x\) as a function of \(y\):

$$\frac{dx}{dy}-\cos y\,x=\sin2y$$

Here

$$P(y)=-\cos y,\qquad Q(y)=\sin2y$$

The integral and factor are

$$\int P\,dy=-\sin y,\qquad \mu=e^{-\sin y}$$

The left side becomes \(d(xe^{-\sin y})\):

$$d(xe^{-\sin y})=\sin2y\,e^{-\sin y}\,dy$$

To integrate the right side, use \(\sin2y=2\sin y\cos y\) and \(u=\sin y\):

$$\int\sin2y\,e^{-\sin y}\,dy=\int2u e^{-u}\,du$$

Integration by parts:

$$\int2u e^{-u}\,du=-2e^{-u}(u+1)$$

Restoring \(u=\sin y\) gives

$$xe^{-\sin y}=C-2e^{-\sin y}(\sin y+1)$$

and the general solution

$$x=Ce^{\sin y}-2(\sin y+1)$$

At points with \(\cos y=0\), \(dx/dy\) is undefined; initial data cannot be chosen there. Differentiation recovers the inverted original equation.

## 5. Bernoulli equations

A Bernoulli equation has the form

$$y'+P(x)y=Q(x)y^n$$

where \(n\) is a constant. The special cases \(n=0\) and \(n=1\) are treated separately:

$$n=0:\quad y'+P(x)y=Q(x)$$

$$n=1:\quad y'=(Q(x)-P(x))y$$

The first is linear and the second is separable. For \(n\neq0,1\) the equation is nonlinear. When \(n>0\), \(y=0\) is a solution:

$$y=0\quad(n>0)$$

State this branch separately before dividing by \(y^n\). For \(y\neq0\), set \(u=y^{1-n}\):

$$u=y^{1-n}$$

Since the chain rule gives

$$y^{1-n}=u,\qquad y^{-n}\frac{dy}{dx}=\frac{1}{1-n}\frac{du}{dx}$$

the equation becomes linear:

$$\frac{du}{dx}+(1-n)P(x)u=(1-n)Q(x)$$

Now solve the first-order linear equation for \(u\), then restore \(u=y^{1-n}\).

## 6. Example 2.33 · A Bernoulli initial-value problem

$$2xyy'=y^2-2x^3,\qquad y(1)=2$$

Divide the equation by \(2xy\):

$$y'-\frac{1}{2x}y=-x^2y^{-1},\qquad n=-1$$

Since \(n=-1\), choose \(u=y^{1-n}=y^2\). First multiply the equation by \(y\):

$$yy'-\frac{1}{2x}y^2=-x^2$$

The substitution is

$$u=y^2,\qquad u'=2yy'$$

Substitution gives the linear equation

$$u'-\frac1xu=-2x^2$$

Here \(P=-1/x\), so

$$\mu=\frac1x$$

and

$$\left(\frac{u}{x}\right)'=-2x$$

Integrating,

$$\frac{u}{x}=-x^2+C$$

and

$$u=x(C-x^2)$$

Restoring \(u=y^2\),

$$y^2=x(C-x^2)$$

The initial datum \(y(1)=2\) gives

$$4=1(C-1)\quad\Longrightarrow\quad C=5$$

Thus

$$y^2=x(5-x^2),\qquad y=\sqrt{x(5-x^2)}$$

The upper branch is selected; the connected solution interval is

$$1<x<\sqrt5$$

At \(x=\sqrt5\), \(y=0\) appears, but that point does not satisfy the original equation, so the endpoint is open. Verify by differentiation.

## 7. Example 2.34 · A Bernoulli equation with n=4 and integration by parts

$$3y\,dx-(x+3x^4y\ln y)\,dy=0,\qquad y>0$$

Divide by \(3y\) and treat \(x\) as the dependent variable:

$$\frac{dx}{dy}-\frac{1}{3y}x=x^4\ln y,\qquad n=4$$

Divide by \(x^4\):

$$x^{-4}\frac{dx}{dy}-\frac{1}{3y}x^{-3}=\ln y$$

The substitution and its derivative are

$$u=x^{-3},\qquad u'=-3x^{-4}x'$$

Substitution gives

$$u'+\frac1yu=-3\ln y$$

The factor is

$$\mu=e^{\int\frac1y\,dy}=y$$

The left side becomes \(d(yu)\):

$$d(yu)=-3y\ln y\,dy$$

Integration by parts:

$$\int-3y\ln y\,dy=-3\left(\frac{y^2}{2}\ln y-\frac{y^2}{4}\right)$$

$$\int-3y\ln y\,dy=\frac34y^2(1-2\ln y)$$

Thus

$$yu=\frac34y^2(1-2\ln y)+C$$

and

$$u=\frac1y\left[C-\frac34y^2(2\ln y-1)\right]$$

Restoring \(u=x^{-3}\) gives the general solution

$$x^3=\frac{4y}{4C-3y^2(2\ln y-1)}$$

The condition \(y>0\) is required; differentiation recovers the original equation.

## 8. Decision summary

Put the equation into standard form first. If \(y'\) and \(y\) occur to the first power, use the linear route:

$$y'+P(x)y=Q(x)\quad\Longrightarrow\quad\mu=e^{\int P\,dx}$$

If a \(y^n\) term appears with \(n\neq0,1\), use the Bernoulli route:

$$y'+P(x)y=Q(x)y^n,\;n\neq0,1\quad\Longrightarrow\quad u=y^{1-n}$$

If it is easier to make \(x\) a function of \(y\), the same factor rule applies:

$$\frac{dx}{dy}+P(y)x=Q(y)\quad\Longrightarrow\quad\mu=e^{\int P\,dy}$$

In every case, state lost branches and domain boundaries separately:

$$y=0\quad(n>0),\qquad \cos x\neq0,\qquad y\neq0$$

## 9. Experiment: compare four families

The workshop contains four analytic families:

- **tan family:** \(y'=1+3y\tan x\), solution \(y=\sec^3x(\sin x-\sin^3x/3+C)\). The poles \(x=\pm\pi/2\) are excluded.
- **x(y) family:** \(y\,dx-(e^y+2xy-2x)dy=0\), solution \(xy^2=Ce^{2y}-e^y(y+1)\). The branch \(y=0\) is separate.
- **Bernoulli n=−1:** \(2xyy'=y^2-2x^3\), solution \(y^2=x(C-x^2)\). The positive branch and \(0<x<\sqrt C\) are shown.
- **Bernoulli n=4:** \(3y\,dx-(x+3x^4y\ln y)dy=0\), solution \(x^3=4y/[4C-3y^2(2\ln y-1)]\). The condition \(y>0\) is required.

A and B are different initial data in the same family. At the selected datum, read the constant \(C\), the factor or \(u\), the solution at the inspection point, and the slope together. If a curve leaves the window, do not conclude that the solution ends; the true boundaries are the domains stated above.

## Midterm preparation

The four worked cases cover the linear tan equation, the equation with \(x\) dependent, the Bernoulli initial-value problem with \(n=-1\), and the Bernoulli equation with \(n=4\). In each case, identify the type, build the factor or substitution, integrate with intermediate work, apply the initial datum, and state the lost branch. Then test yourself with the 11-question check.

## Checklist

- Is the equation really in the form \(y'+P(x)y=Q(x)\)?
- If \(y^n\) appears, what is \(n\); did you separate the special cases \(n=0\) and \(n=1\)?
- Is \(\mu\) built with the correct sign, and are the absolute value and interval consistent?
- Is the derivative chain correct in the substitution \(u=y^{1-n}\)?
- Did you state lost branches and domain boundaries such as \(y=0\), \(\cos x=0\), \(\cos y=0\), \(y>0\)?
- Which branch does the initial datum select, and what is the connected interval?
- Did you verify the solution by differentiation?
