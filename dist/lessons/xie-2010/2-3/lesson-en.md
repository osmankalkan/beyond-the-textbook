# §2.3 · Exact differential equations and integrating factors

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.3, printed pp.31–54 / PDF pp.49–72, Examples 2.13–2.29. This is an original English study adaptation.

## What you will learn

- To write the equation as \(M\,dx+N\,dy=0\) and run the \(M_y=N_x\) test.
- To build the potential \(u(x,y)\) when the equation is exact, carrying the constant as a function of the other variable.
- To try the \(\mu(x)\), \(\mu(y)\), \(F(y/x)\) and group doors in that order when it is not exact.
- To recognise the basic differentials of the inspection method.
- To state the branches lost to a vanishing factor and to verify by implicit differentiation.

## Decision map

The whole section follows one order: **exactness test first, factor second.**

| Situation | Tool | Result |
| --- | --- | --- |
| \(M_y=N_x\) | Build the potential | \(u(x,y)=C\) |
| \((M_y-N_x)/N\) depends on \(x\) only | \(\mu(x)\) | \(\mu M\,dx+\mu N\,dy\) is exact |
| \((N_x-M_y)/M\) depends on \(y\) only | \(\mu(y)\) | \(\mu M\,dx+\mu N\,dy\) is exact |
| The ratio has the form \(F(y/x)\) | \(\mu=e^{\int F(u)du}\) | \(u=y/x\) |
| Denominator \(x^2+y^2\), \(x^2\), \(y^2\) | Inspection | Group into known differentials |
| None of these works | Group method | \(\mu_1g_1(v_1)=\mu_2g_2(v_2)\) |

> **One shared idea.** In an exact equation the solution is a level curve of a height map. Finding a factor means rescaling the map: the curves stay the same, only \(u\) is read on a different scale. A factor does not change the solution; it makes it visible.

## 1. Exact differential and potential function

Write the first-order equation in differential form:

$$M(x,y)\,dx+N(x,y)\,dy=0$$

If the left side is the exact differential of a single function \(u(x,y)\), the equation is **exact**. The chain rule, together with \(u_x=M\) and \(u_y=N\), forces the mixed partials to agree; when the condition holds, the solution is a level curve of the potential:

$$du=\frac{\partial u}{\partial x}\,dx+\frac{\partial u}{\partial y}\,dy,\qquad \frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}\quad\Longrightarrow\quad u(x,y)=C$$

The test only says that a potential exists. To find it, integrate \(M\) with respect to \(x\), differentiate the result with respect to \(y\) and compare with \(N\). Alternatively, group the terms into known differentials such as \(d(xy)\) or \(d(y/x)\). Both routes give the same \(u\).

## 2. Example 2.13 · An exact equation, two ways

$$(6xy^2+4x^3y)\,dx+(6x^2y+x^4+e^y)\,dy=0$$

Here \(M=6xy^2+4x^3y\) and \(N=6x^2y+x^4+e^y\). The partial derivatives agree:

$$\frac{\partial M}{\partial y}=12xy+4x^3=\frac{\partial N}{\partial x}$$

The equation is exact. Integrating \(M\) with respect to \(x\) treats \(y\) as a constant, so the constant of integration is \(g(y)\):

$$u(x,y)=3x^2y^2+x^4y+g(y),\qquad \frac{\partial u}{\partial y}=6x^2y+x^4+g'(y)$$

Comparing this with \(N\) cancels the terms \(6x^2y+x^4\) and leaves only \(g'(y)=e^y\):

$$g'(y)=e^y\quad\Longrightarrow\quad 3x^2y^2+x^4y+e^y=C$$

**The same result by grouping.** Split the terms into three groups:

$$(6xy^2\,dx+6x^2y\,dy)+(4x^3y\,dx+x^4\,dy)+e^y\,dy=0$$

Each group is an exact differential: \(6xy^2\,dx+6x^2y\,dy=d(3x^2y^2)\), \(4x^3y\,dx+x^4\,dy=d(x^4y)\) and \(e^y\,dy=d(e^y)\). Verify by differentiation: \(u_x=M\), \(u_y=N\).

> **Is any branch lost?** None, because nothing was divided out; the solution is implicit on the whole plane. When a factor is used, its zeros must always be tested separately.

## 3. Example 2.14 · A trigonometric exact equation

$$(-y\sin x+e^x\sin2y)\,dx+(\cos x+2e^x\cos2y)\,dy=0$$

\(M_y=-\sin x+2e^x\cos2y\) and \(N_x=-\sin x+2e^x\cos2y\) agree. Split the terms into two groups; the first is \(d(-y\cos x)\) and the second is \(d(e^x\sin2y)\):

$$\left(-y\sin x\,dx+\cos x\,dy\right)+\left(e^x\sin2y\,dx+2e^x\cos2y\,dy\right)=0\quad\Longrightarrow\quad -y\cos x+e^x\sin2y=C$$

> **Verification.** Implicit differentiation gives \(y'=(y\sin x-e^x\sin2y)/(\cos x+2e^x\cos2y)\), which is the original equation. No division was performed, so there is no singular branch.

## 4. Example 2.15 · An exact equation with exponentials

$$2x(3x+y-ye^{-x^2})\,dx+(x^2+3y^2+e^{-x^2})\,dy=0$$

Here \(M=6x^2+2xy-2xye^{-x^2}\) and \(N=x^2+3y^2+e^{-x^2}\). The partial derivatives agree:

$$\frac{\partial M}{\partial y}=2x-2xe^{-x^2}=\frac{\partial N}{\partial x}$$

Split the terms into three groups:

$$(2xy\,dx+x^2\,dy)+(e^{-x^2}\,dy-2xye^{-x^2}\,dx)+(6x^2\,dx+3y^2\,dy)=0$$

The groups are \(d(x^2y)\), \(d(ye^{-x^2})\) and \(d(2x^3+y^3)\) respectively:

$$x^2y+ye^{-x^2}+2x^3+y^3=C$$

> **An ordering tip.** In the second group, taking \(e^{-x^2}\,dy\) first makes it easier to integrate with respect to \(y\) and then differentiate with respect to \(x\). Always start a group with the term that is easiest to integrate.

## 5. Example 2.16 · An exact equation with x/y and y/x

$$\left(\frac1y\sin\frac xy-\frac{y}{x^2}\cos\frac yx+1\right)dx+\left(\frac1x\cos\frac yx-\frac{x}{y^2}\sin\frac xy+\frac1{y^2}\right)dy=0$$

The equation is defined for \(x\neq0\) and \(y\neq0\), and \(M_y=N_x\) holds. Split the terms into four groups:

$$\left(\frac1y\sin\frac xy\,dx-\frac{x}{y^2}\sin\frac xy\,dy\right)+\left(-\frac{y}{x^2}\cos\frac yx\,dx+\frac1x\cos\frac yx\,dy\right)+dx+\frac{dy}{y^2}=0$$

The groups are \(d(-\cos(x/y))\), \(d(\sin(y/x))\), \(dx\) and \(d(-1/y)\):

$$-\cos\frac xy+\sin\frac yx+x-\frac1y=C$$

> **Domain.** Exclude the points where \(x\) or \(y\) vanishes during verification. There is no logarithm, but the original coefficients are undefined there.

## 6. Integrating factor: μ(x) and μ(y)

If the equation is not exact we look for a factor \(\mu(x,y)\) that makes it exact:

$$\mu(x,y)M(x,y)\,dx+\mu(x,y)N(x,y)\,dy=0$$

Writing the exactness condition \((\mu M)_y=(\mu N)_x\) produces a partial differential equation for \(\mu\). When \(\mu\) depends on \(x\) alone this equation separates, and two special cases integrate directly:

$$\frac1\mu\frac{d\mu}{dx}=\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)$$

$$\mu(x)=\exp\left(\int\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)dx\right),\qquad \mu(y)=\exp\left(\int\frac1M\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)dy\right)$$

> **When does this stall?** If the quotient in the formula does not really depend on one variable, this route stalls; switch to the \(F(y/x)\) inspection or the group method. Once the factor is found, multiply every term of the equation.

## 7. Example 2.17 · μ(y)=e^y

$$3(x^2+y^2)\,dx+x(x^2+3y^2+6y)\,dy=0$$

\(M=3(x^2+y^2)\) and \(N=x^3+3xy^2+6xy\). Since \(M_y=6y\) and \(N_x=3x^2+3y^2+6y\), the equation is not exact. The \(y\)-quotient is constant:

$$\frac1M\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)=\frac{(3x^2+3y^2+6y)-6y}{3(x^2+y^2)}=1\quad\Longrightarrow\quad \mu(y)=e^y,\qquad e^yx(x^2+3y^2)=C$$

> **Verification.** \(u_x=e^y(3x^2+3y^2)\) and \(u_y=e^y(x^3+3xy^2+6xy)\). Because \(e^y>0\), the factor loses no branch.

## 8. Example 2.18 · μ(x)=e^x

$$y(2x-y+2)\,dx+2(x-y)\,dy=0$$

\(M=2xy-y^2+2y\) and \(N=2x-2y\); since \(M_y=2x-2y+2\) and \(N_x=2\), the equation is not exact. The \(x\)-quotient is again constant:

$$\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)=\frac{(2x-2y+2)-2}{2(x-y)}=1\quad\Longrightarrow\quad \mu(x)=e^x,\qquad e^xy(2x-y)=C$$

The lines \(y=0\) and \(y=2x\) are also solutions of the original equation. Because \(e^x>0\), they are not lost:

$$y=0,\qquad y=2x$$

> **Initial data.** Initial data cannot be placed on these two lines: there the gradient of \(u\) vanishes and the solution no longer pins down a single curve. Verification: \(u_x=e^xy(2x-y+2)\), \(u_y=2e^x(x-y)\).

## 9. Example 2.19 · μ(x)=sec²x

$$y(\cos^3x+y\sin x)\,dx+\cos x(\sin x\cos x+2y)\,dy=0$$

With \(M=y\cos^3x+y^2\sin x\) and \(N=\sin x\cos^2x+2y\cos x\), we get \(M_y=\cos^3x+2y\sin x\) and \(N_x=\cos^3x-2\sin^2x\cos x-2y\sin x\); the equation is not exact. The \(x\)-quotient simplifies:

$$\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)=\frac{2\sin x}{\cos x}\quad\Longrightarrow\quad \mu(x)=\sec^2x,\qquad y\sin x+\frac{y^2}{\cos x}=C$$

> **Poles.** The points with \(\cos x=0\) are undefined in the original equation and in the factor; the solution interval excludes these poles. Verify by differentiation.

## 10. Example 2.20 · μ=e^{y/x}

First a theorem: if the following ratio is a function of \(y/x\), then the factor is the integral of that function:

$$\frac{x^2}{xM+yN}\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)=F\left(\frac yx\right)\quad\Longrightarrow\quad \mu(x,y)=\exp\left(\int F(u)\,du\right),\qquad u=\frac yx$$

Now apply the theorem to the equation

$$(2x+2xy-y-y^2)\,dx+(x^2+x+xy)\,dy=0$$

For \(M=2x+2xy-y-y^2\) and \(N=x^2+x+xy\) we have \(N_x-M_y=(2x+1+y)-(2x+1-2y)=3y\), and also \(xM+yN=x^2(2+3y)\):

$$\frac{x^2}{xM+yN}\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)=1\quad\Longrightarrow\quad \mu=e^{y/x},\qquad x^2(1+y)e^{y/x}=C$$

> **Domain.** \(x=0\) is undefined in the original equation and in the factor. Since \(e^{y/x}>0\), no extra branch is lost; verify by differentiation.

## 11. The inspection method: basic differentials

In some equations the factor appears by itself once the terms are split into known differentials. The basic formulas worth memorising:

| Differential | Where it shows up |
| --- | --- |
| \(d(xy)=y\,dx+x\,dy\) | The pair \(y\,dx+x\,dy\) |
| \(d(y/x)=(x\,dy-y\,dx)/x^2\) | Denominator \(x^2\) |
| \(d(x/y)=(y\,dx-x\,dy)/y^2\) | Denominator \(y^2\) |
| \(d(\arctan(y/x))=(x\,dy-y\,dx)/(x^2+y^2)\) | Denominator \(x^2+y^2\) |
| \(d(\frac12\ln(x^2+y^2))=(x\,dx+y\,dy)/(x^2+y^2)\) | \(x\,dx+y\,dy\) on top |
| \(d(\sqrt{x^2\pm y^2})=(x\,dx\pm y\,dy)/\sqrt{x^2\pm y^2}\) | Squares under a root |

> **The rule.** If you see \(x^2+y^2\), \(x^2\), \(y^2\) or \(\sqrt{x^2\pm y^2}\) in a denominator, match it against this table first. The factor usually appears after the division; test the zeros of whatever you divided by.

## 12. Example 2.21 · An exact equation by inspection

$$(3x^4+y)\,dx+(2x^2y-x)\,dy=0$$

Factor out \(x^2\):

$$x^2(3x^2\,dx+2y\,dy)+(y\,dx-x\,dy)=0\quad\Longrightarrow\quad 3x^2\,dx+2y\,dy-\frac{x\,dy-y\,dx}{x^2}=0$$

That is \(d(x^3)+d(y^2)-d(y/x)=0\). The general solution is

$$x^3+y^2-\frac yx=C$$

> **Factor and interval.** Here \(\mu=1/x^2\) was used. \(x=0\) is undefined in the original equation, so the interval lies in the region \(x\neq0\). Verify by differentiation.

## 13. Example 2.22 · μ=1/(x²+y²)

$$(x+x^2y+y^3)\,dx+(y+x^3+xy^2-x^2y^2-y^4)\,dy=0$$

Arrange the terms around \(x^2+y^2\):

$$\left[x+y(x^2+y^2)\right]dx+\left[y+x(x^2+y^2)-y^2(x^2+y^2)\right]dy=0$$

Dividing by \(x^2+y^2\) leaves three exact differentials:

$$\frac{x\,dx+y\,dy}{x^2+y^2}+(y\,dx+x\,dy)-y^2\,dy=0\quad\Longrightarrow\quad \frac12\ln(x^2+y^2)+xy-\frac13y^3=C$$

> **The origin.** Here \(\mu=1/(x^2+y^2)\) and \(x^2+y^2=0\), that is the origin, is excluded; initial data cannot be placed there.

## 14. Example 2.23 · μ=1/[√x(x²+y²)]

$$(2x\sqrt{x}+x^2+y^2)\,dx+2y\sqrt{x}\,dy=0$$

Arrange the terms around \(\sqrt{x}\) and \(x^2+y^2\):

$$2\sqrt{x}(x\,dx+y\,dy)+(x^2+y^2)\,dx=0\quad\Longrightarrow\quad 2\frac{x\,dx+y\,dy}{x^2+y^2}+\frac{dx}{\sqrt{x}}=0$$

That is \(2d(\frac12\ln(x^2+y^2))+d(2\sqrt{x})=0\). The general solution is

$$\ln(x^2+y^2)+2\sqrt{x}=C$$

> **Domain.** Here \(\mu=1/[\sqrt{x}(x^2+y^2)]\), so \(x>0\) and \(x^2+y^2>0\) are required. The line \(x=0\) and the origin are excluded.

## 15. Example 2.24 · μ=1/y and a lost branch

$$y^2\,dx+(xy+y^2-1)\,dy=0$$

Factor out \(y\):

$$y(y\,dx+x\,dy)+(y^2-1)\,dy=0$$

The line \(y=0\) satisfies the equation and is a separate solution. On the branch \(y\neq0\), dividing by \(y\) gives \(d(xy)+\frac12d(y^2)-d(\ln|y|)=0\). The general solution and the separate branch are stated together:

$$xy+\frac12y^2-\ln|y|=C,\qquad y=0$$

> **The zero of the factor.** Here \(\mu=1/y\); because it excludes the branch \(y=0\), that branch is written separately. For \(y<0\) the logarithm is still defined through the absolute value.

## 16. Example 2.25 · Arctangent and logarithm

$$xy\,dx-(x^2+x^2y+y^3)\,dy=0$$

Split the terms into \(x(y\,dx-x\,dy)\) and \(y(x^2+y^2)\,dy\), then divide by \(x^2+y^2\):

$$x(y\,dx-x\,dy)-y(x^2+y^2)\,dy=0\quad\Longrightarrow\quad x\,d\left(\arctan\frac xy\right)-y\,dy=0$$

For \(y\neq0\), divide by \(y\), put \(u=x/y\) and use \(u\,d(\arctan u)=\frac12d\ln(1+u^2)\):

$$\ln\left(1+\frac{x^2}{y^2}\right)-2y=C,\qquad y=0$$

> **Two branches.** \(y=0\) solves the original equation and is stated separately; on \(y\neq0\) the solution is the implicit family above. The chosen branch of the arctangent also fixes the interval.

## 17. Integrating factors from groups

Split the equation into two groups: \((M_1\,dx+N_1\,dy)+(M_2\,dx+N_2\,dy)=0\). If each group has its own factor and potential,

$$\mu_1M_1\,dx+\mu_1N_1\,dy=dv_1,\qquad \mu_2M_2\,dx+\mu_2N_2\,dy=dv_2$$

the theorem says that \(\mu_1g_1(v_1)\) and \(\mu_2g_2(v_2)\) are also group factors. Choose \(g_1,g_2\) so that the two coincide:

$$\mu_1g_1(v_1)=\mu_2g_2(v_2)=\mu(x,y)$$

> **Practical rule.** Taking \(g_1(v)=v^\alpha\) and \(g_2(v)=v^\beta\) and matching the exponents is usually enough. One equation in one unknown remains; once \(\alpha\) and \(\beta\) are known, the factor is ready.

## 18. Example 2.26 · The common factor x²y

$$(4xy+3y^4)\,dx+(2x^2+5xy^3)\,dy=0$$

Set up two groups and note that the first is exact:

$$(4xy\,dx+2x^2\,dy)+(3y^4\,dx+5xy^3\,dy)=0,\qquad 2d(x^2y)=4xy\,dx+2x^2\,dy$$

In the first group \(\mu_1=1\) and \(v_1=x^2y\). In the second, \((M_y-N_x)/N=7/(5x)\), so the group factor and potential are

$$\mu_2(x)=x^{7/5},\qquad v_2=x^{12/5}y^4$$

The identity \((x^2y)^\alpha=x^{12\beta/5+7/5}y^{4\beta}\) gives \(\alpha=1\) and \(\beta=1/4\):

$$\mu=x^2y\quad\Longrightarrow\quad x^4y^2+x^3y^5=C$$

> **Zero branches.** The branches \(x=0\) and \(y=0\), where \(\mu\) vanishes, are examined separately; initial data cannot be placed on those lines.

## 19. Example 2.27 · The common factor √(xy)

$$(5xy-3y^3)\,dx+(3x^2-7xy^2)\,dy=0$$

Two groups:

$$(5xy\,dx+3x^2\,dy)+(-3y^3\,dx-7xy^2\,dy)=0$$

In the first group \((M_y-N_x)/N=-1/(3x)\), in the second \(2/(7x)\). The group factors and potentials are

$$\mu_1=x^{-1/3},\quad v_1=x^{5/3}y,\qquad \mu_2=x^{2/7},\quad v_2=x^{9/7}y^3$$

Matching exponents gives \(\alpha=3\beta\) and \(-1/3+5\alpha/3=2/7+9\beta/7\), whose solution is \(\alpha=1/2\), \(\beta=1/6\):

$$\alpha=\frac12,\quad\beta=\frac16,\quad\mu=x^{1/2}y^{1/2}\quad\Longrightarrow\quad x^{3/2}y^{3/2}(x-y^2)=C$$

> **Zero branches and verification.** The branches \(x=0\) and \(y=0\) are zeros of the factor and are examined separately. Verify the result by differentiation.

## 20. Example 2.28 · Inspection and groups together

$$(y\,dx-x\,dy)+\sqrt{xy}\,dy=0,\qquad x>0,\ y>0$$

Dividing by \(x^2\) turns the first group into \(d(y/x)\):

$$-d\left(\frac yx\right)+x^{-3/2}y^{1/2}\,dy=0$$

In the first group \(\mu_1=1\) and \(v_1=y/x\); in the second \(\mu_2=x^{3/2}y^{-1/2}\) and \(v_2=y\). Matching exponents gives \(\mu=x^{3/2}y^{-3/2}\). After multiplying, the potential is ready:

$$x^{-1/2}y^{-1/2}\,dx+\left(-x^{1/2}y^{-3/2}+\frac1y\right)dy=0\quad\Longrightarrow\quad 2\sqrt{\frac xy}+\ln y=C$$

> **Domain.** On \(x>0\), \(y>0\) the logarithm and the root are defined; the boundary \(y=0\) is excluded.

## 21. Example 2.29 · A logarithmic group

$$\left(xye^{x/y}+y^4\right)dx-x^2e^{x/y}\,dy=0,\qquad y\neq0$$

Split the terms into \(xe^{x/y}(y\,dx-x\,dy)\) and \(y^4\,dx\), then divide by \(xy^2\):

$$e^{x/y}\,d\left(\frac xy\right)+\frac{y^2}{x}\,dx=0$$

In the first group \(\mu_1=1\) and \(v_1=e^{x/y}\); in the second \(\mu_2=1/y^2\) and \(v_2=x\). The choice \(g_1(v)=\ln v\), \(g_2(v)=v^2\) produces the common factor; multiply by \(x^2/y^2\):

$$\frac{x^2}{y^2}e^{x/y}\,d\left(\frac xy\right)+x\,dx=0$$

With \(z=x/y\) the remaining integral is computed by parts:

$$\int z^2e^z\,dz=e^z(z^2-2z+2)\quad\Longrightarrow\quad e^{x/y}\left(\frac{x^2}{y^2}-\frac{2x}{y}+2\right)+\frac{x^2}{2}=C$$

> **Branch.** \(y=0\) is undefined in the original equation; the solution is valid on the branch \(y\neq0\). Verify by differentiation.

## 22. Decision summary

Run the exactness test first. If the equation is not exact, try these doors in order:

$$\mu(x)=\exp\left(\int\frac{M_y-N_x}{N}\,dx\right),\qquad \mu(y)=\exp\left(\int\frac{N_x-M_y}{M}\,dy\right)$$

| Door | When it opens | What it does |
| --- | --- | --- |
| \(\mu(x)\) | The quotient depends on \(x\) only | One-variable integral |
| \(\mu(y)\) | The quotient depends on \(y\) only | One-variable integral |
| Inspection | Denominator \(x^2+y^2\), \(x^2\), \(y^2\), a root | Group into known differentials |
| Groups | Nothing else works | \(\mu_1g_1(v_1)=\mu_2g_2(v_2)\) |

If the quotients depend on more than one variable, go to the inspection formulas; the last resort is the group method. In every case, test the branches where the factor vanishes in the original equation and verify by implicit differentiation.

## 23. Experiment: compare four families

In the workshop \(x_0=1\) is fixed; the A and B sliders change the initial value \(y(1)\). Predict first: why are the level curves of the exact family ellipses? How does the factor change the level curve in the \(\mu(x)=e^x\) family?

> **Prediction.** A factor rescales the potential, not the shape of its level curves. That is why different values of \(C\) for the same \(u\) give nested curves of one family.

The exact family has the potential \(u=x^2+xy+y^2\); its level curves are ellipses for \(C>0\):

$$u(x,y)=x^2+xy+y^2$$

In the \(\mu(x)=e^x\) family the potential is \(e^xy(2x-y)\); the data \(y=0\) and \(y=2x\) are invalid:

$$u(x,y)=e^xy(2x-y)$$

In the \(\mu(y)=1/y\) family the potential is \(xy+\frac12y^2-\ln y\); \(y>0\) is required:

$$u(x,y)=xy+\frac12y^2-\ln y$$

In the inspection family the potential is \(\ln(x^2+y^2)+2\sqrt{x}\); \(x>0\) and \(y\neq0\) are required:

$$u(x,y)=\ln(x^2+y^2)+2\sqrt{x}$$

Questions for observation: when A and B choose different values of \(C\), which level curves of the same potential appear? Does the factor change the scale of the potential or the level curves themselves? Record your answers in the lesson notebook.

## Midterm preparation

The four worked cases cover, in order, an exact equation, a \(\mu(x)\) factor, the inspection method and the group method. Keep the same order in each case: write the equation as \(M\,dx+N\,dy=0\), run the \(M_y=N_x\) test, try the factor doors in order, build the potential, test the zeros of the factor and the poles of the denominator, and verify implicitly. Then test yourself with the eleven questions in the practice section.

## Checklist

- Did I write the equation as \(M\,dx+N\,dy=0\) and run the \(M_y=N_x\) test?
- If it is not exact, did I try \(\mu(x)\), \(\mu(y)\), inspection and groups in order?
- Once the factor was found, did I multiply **every** term of the equation?
- Did I keep the integration constant as a function of the other variable?
- Did I test the branches where the factor or the denominator vanishes in the original equation?
- Did I verify implicitly and state the interval?


---

Study support: open the lesson workshop for guided reasoning and the practice screen for worked problems. Keep your own explanation in the per-lesson notebook.
