# §2.3 · Exact differential equations and integrating factors

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.3, printed pp.31–54 / PDF pp.49–72, Examples 2.13–2.29. This is an original English study adaptation.

## Study sequence

Write the equation as \(M(x,y)\,dx+N(x,y)\,dy=0\) and compare the two partial derivatives: if \(M_y=N_x\), the equation is exact and the solution is a level curve \(u(x,y)=C\) of a single potential. If it is not exact, predict the factor: when the quotient depends on x alone use \(\mu(x)\), when it depends on y alone use \(\mu(y)\), and when it depends on both variables use the inspection formulas or the method of groups. After finding the factor, build the potential, verify by differentiation, and test in the original equation any branch where the factor vanishes. The exam section practises these decisions on four timed, scored problems.

## 1. Exact differentials and the potential function

Write the first-order equation in differential form:

$$M(x,y)\,dx+N(x,y)\,dy=0$$

The equation is **exact** when the left side is the exact differential of a single function \(u(x,y)\). The chain rule gives:

$$du=\frac{\partial u}{\partial x}\,dx+\frac{\partial u}{\partial y}\,dy$$

Thus \(u_x=M\) and \(u_y=N\). Equality of the mixed partial derivatives gives the necessary and sufficient condition:

$$\frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}$$

When this condition holds, the solution is a level curve of the potential:

$$u(x,y)=C$$

The exactness test only guarantees that a potential exists. To find it, integrate \(M\) with respect to x, differentiate the result with respect to y, and compare with \(N\). Alternatively, group the terms into known differentials such as \(d(xy)\) or \(d(y/x)\). Both routes give the same \(u\).

## 2. Example 2.13 · An exact equation, two methods

$$(6xy^2+4x^3y)\,dx+(6x^2y+x^4+e^y)\,dy=0$$

Here \(M=6xy^2+4x^3y\) and \(N=6x^2y+x^4+e^y\). The partial derivatives are:

$$\frac{\partial M}{\partial y}=12xy+4x^3=\frac{\partial N}{\partial x}$$

The equation is exact. While integrating \(M\) with respect to x, y is constant and the integration constant becomes \(g(y)\):

$$u(x,y)=3x^2y^2+x^4y+g(y),\qquad \frac{\partial u}{\partial y}=6x^2y+x^4+g'(y)$$

Comparing with \(N\), the terms \(6x^2y+x^4\) cancel and only \(g'(y)=e^y\) remains:

$$g'(y)=e^y,\qquad u(x,y)=3x^2y^2+x^4y+e^y$$

The general solution is:

$$3x^2y^2+x^4y+e^y=C$$

**The same result by grouping.** Split the terms into three groups:

$$(6xy^2\,dx+6x^2y\,dy)+(4x^3y\,dx+x^4\,dy)+e^y\,dy=0$$

Each group is an exact differential: \(6xy^2\,dx+6x^2y\,dy=d(3x^2y^2)\), \(4x^3y\,dx+x^4\,dy=d(x^4y)\), and \(e^y\,dy=d(e^y)\). Hence \(d(3x^2y^2+x^4y+e^y)=0\). Verify by differentiation: \(u_x=M\), \(u_y=N\). No division occurred, so no branch is lost; the solution is implicit on the whole plane.

## 3. Example 2.14 · A trigonometric exact equation

$$(-y\sin x+e^x\sin2y)\,dx+(\cos x+2e^x\cos2y)\,dy=0$$

Here \(M_y=-\sin x+2e^x\cos2y\) and \(N_x=-\sin x+2e^x\cos2y\), so the equation is exact. Split the terms into two groups:

$$\left(-y\sin x\,dx+\cos x\,dy\right)+\left(e^x\sin2y\,dx+2e^x\cos2y\,dy\right)=0$$

The first group is \(d(-y\cos x)\) and the second is \(d(e^x\sin2y)\). Therefore:

$$-y\cos x+e^x\sin2y=C$$

Verification: implicit differentiation gives \(y'=(y\sin x-e^x\sin2y)/(\cos x+2e^x\cos2y)\), which is the original equation. No division occurred, so there is no singular branch.

## 4. Example 2.15 · An exact equation with an exponential term

$$2x(3x+y-ye^{-x^2})\,dx+(x^2+3y^2+e^{-x^2})\,dy=0$$

Here \(M=6x^2+2xy-2xye^{-x^2}\) and \(N=x^2+3y^2+e^{-x^2}\). The partial derivatives are:

$$\frac{\partial M}{\partial y}=2x-2xe^{-x^2}=\frac{\partial N}{\partial x}$$

The equation is exact. Split the terms into three groups:

$$(2xy\,dx+x^2\,dy)+(e^{-x^2}\,dy-2xye^{-x^2}\,dx)+(6x^2\,dx+3y^2\,dy)=0$$

The groups are \(d(x^2y)\), \(d(ye^{-x^2})\), and \(d(2x^3+y^3)\). The general solution is:

$$x^2y+ye^{-x^2}+2x^3+y^3=C$$

In the second group it is easier to pick \(e^{-x^2}\,dy\) first, integrate its coefficient with respect to y, and then differentiate with respect to x. Verify by differentiation; no division occurred.

## 5. Example 2.16 · An exact equation with x/y and y/x

$$ \left(\frac1y\sin\frac xy-\frac{y}{x^2}\cos\frac yx+1\right)dx+\left(\frac1x\cos\frac yx-\frac{x}{y^2}\sin\frac xy+\frac1{y^2}\right)dy=0$$

The equation is defined for \(x\neq0\) and \(y\neq0\). The condition \(M_y=N_x\) holds. Split the terms into four groups:

$$\left(\frac1y\sin\frac xy\,dx-\frac{x}{y^2}\sin\frac xy\,dy\right)+\left(-\frac{y}{x^2}\cos\frac yx\,dx+\frac1x\cos\frac yx\,dy\right)+dx+\frac{dy}{y^2}=0$$

The groups are \(d(-\cos(x/y))\), \(d(\sin(y/x))\), \(dx\), and \(d(-1/y)\). The general solution is:

$$-\cos\frac xy+\sin\frac yx+x-\frac1y=C$$

In the verification, exclude the points where x or y is zero; there is no logarithm, but the original coefficients are undefined there.

## 6. Integrating factors: μ(x) and μ(y)

When the equation is not exact, look for a factor \(\mu(x,y)\) that makes it exact:

$$\mu(x,y)M(x,y)\,dx+\mu(x,y)N(x,y)\,dy=0$$

The exactness condition \((\mu M)_y=(\mu N)_x\) gives a partial differential equation for \(\mu\). In two special cases it becomes separable. If \(\mu\) depends on x alone:

$$\frac1\mu\frac{d\mu}{dx}=\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)$$

If the right side depends on x alone, integrate:

$$\mu(x)=\exp\left(\int\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)dx\right)$$

Similarly, if \(\mu\) depends on y alone:

$$\mu(y)=\exp\left(\int\frac1M\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)dy\right)$$

If the quotient does not actually depend on a single variable, this route fails; switch to inspection or grouping. Once the factor is found, multiply every term of the equation by it.

## 7. Example 2.17 · μ(y)=e^y

$$3(x^2+y^2)\,dx+x(x^2+3y^2+6y)\,dy=0$$

Here \(M=3(x^2+y^2)\) and \(N=x^3+3xy^2+6xy\). Since \(M_y=6y\) and \(N_x=3x^2+3y^2+6y\), the equation is not exact. Compute the y-quotient:

$$\frac1M\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)=\frac{(3x^2+3y^2+6y)-6y}{3(x^2+y^2)}=1,\qquad \mu(y)=e^y$$

Multiplying by \(e^y\) makes the equation exact, and the potential is \(e^yx(x^2+3y^2)\):

$$e^yx(x^2+3y^2)=C$$

Verify by differentiation: \(u_x=e^y(3x^2+3y^2)\) and \(u_y=e^y(x^3+3xy^2+6xy)\). Since \(e^y>0\), the factor loses no branch.

## 8. Example 2.18 · μ(x)=e^x

$$y(2x-y+2)\,dx+2(x-y)\,dy=0$$

Here \(M=2xy-y^2+2y\) and \(N=2x-2y\). Since \(M_y=2x-2y+2\) and \(N_x=2\), the equation is not exact. The x-quotient is:

$$\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)=\frac{(2x-2y+2)-2}{2(x-y)}=1,\qquad \mu(x)=e^x$$

Multiplying by \(e^x\) gives the potential \(e^xy(2x-y)\):

$$e^xy(2x-y)=C$$

In addition, \(y=0\) and \(y=2x\) are solutions of the original equation. Since \(e^x>0\), they are not lost; nevertheless, initial data cannot lie on these lines:

$$y=0,\qquad y=2x$$

To verify, differentiate \(u=e^xy(2x-y)\) implicitly: \(u_x=e^xy(2x-y+2)\) and \(u_y=2e^x(x-y)\).

## 9. Example 2.19 · μ(x)=sec²x

$$y(\cos^3x+y\sin x)\,dx+\cos x(\sin x\cos x+2y)\,dy=0$$

Here \(M=y\cos^3x+y^2\sin x\) and \(N=\sin x\cos^2x+2y\cos x\). Since \(M_y=\cos^3x+2y\sin x\) and \(N_x=\cos^3x-2\sin^2x\cos x-2y\sin x\), the equation is not exact. The x-quotient simplifies:

$$\frac1N\left(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}\right)=\frac{2\sin x}{\cos x},\qquad \mu(x)=\sec^2x$$

Multiplying by \(\sec^2x\) gives the potential \(y\sin x+y^2/\cos x\):

$$y\sin x+\frac{y^2}{\cos x}=C$$

The points where \(\cos x=0\) are undefined in the original equation and in the factor; the solution interval excludes these poles. Verify by differentiation.

## 10. Example 2.20 · μ=e^{y/x}

First a theorem: if

$$\frac{x^2}{xM+yN}\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)=F\left(\frac yx\right)$$

then, with \(u=y/x\), an integrating factor is:

$$\mu(x,y)=\exp\left(\int F(u)\,du\right),\qquad u=\frac yx$$

Now apply the theorem to:

$$(2x+2xy-y-y^2)\,dx+(x^2+x+xy)\,dy=0$$

Here \(M=2x+2xy-y-y^2\) and \(N=x^2+x+xy\). Then \(N_x-M_y=(2x+1+y)-(2x+1-2y)=3y\). Also \(xM+yN=2x^2+3x^2y=x^2(2+3y)\). Therefore:

$$\frac{x^2}{xM+yN}\left(\frac{\partial N}{\partial x}-\frac{\partial M}{\partial y}\right)=1,\qquad \mu=e^{y/x}$$

Multiplying by \(e^{y/x}\) gives the potential \(x^2(1+y)e^{y/x}\):

$$x^2(1+y)e^{y/x}=C$$

The value \(x=0\) is undefined in the original equation and in the factor. Verify by differentiation; since \(e^{y/x}>0\), no additional branch is lost.

## 11. The method of inspection: five basic differentials

In some equations the factor appears as soon as the terms are separated into known differentials. Five formulas to remember:

$$d(xy)=y\,dx+x\,dy$$

$$d\left(\frac yx\right)=\frac{x\,dy-y\,dx}{x^2},\qquad d\left(\frac xy\right)=\frac{y\,dx-x\,dy}{y^2}$$

$$d\left(\arctan\frac yx\right)=\frac{x\,dy-y\,dx}{x^2+y^2}$$

$$d\left(\frac12\ln(x^2+y^2)\right)=\frac{x\,dx+y\,dy}{x^2+y^2}$$

$$d\left(\sqrt{x^2\pm y^2}\right)=\frac{x\,dx\pm y\,dy}{\sqrt{x^2\pm y^2}}$$

Rule: if you see \(x^2+y^2\), \(x^2\), \(y^2\), or \(\sqrt{x^2\pm y^2}\) in a denominator, match it against these formulas first. The factor often appears after a division; test the roots of every expression you divided by.

## 12. Example 2.21 · Exact by inspection

$$(3x^4+y)\,dx+(2x^2y-x)\,dy=0$$

Factor \(x^2\) out of the first pair:

$$x^2(3x^2\,dx+2y\,dy)+(y\,dx-x\,dy)=0$$

Divide by \(x^2\); the second part becomes \(-(x\,dy-y\,dx)/x^2=-d(y/x)\):

$$3x^2\,dx+2y\,dy-\frac{x\,dy-y\,dx}{x^2}=0$$

Thus \(d(x^3)+d(y^2)-d(y/x)=0\). The general solution is:

$$x^3+y^2-\frac yx=C$$

Here \(\mu=1/x^2\). The value \(x=0\) is undefined in the original equation; the solution interval lies in \(x\neq0\). Verify by differentiation.

## 13. Example 2.22 · μ=1/(x²+y²)

$$(x+x^2y+y^3)\,dx+(y+x^3+xy^2-x^2y^2-y^4)\,dy=0$$

Arrange the terms with respect to \(x^2+y^2\):

$$\left[x+y(x^2+y^2)\right]dx+\left[y+x(x^2+y^2)-y^2(x^2+y^2)\right]dy=0$$

Dividing by \(x^2+y^2\) leaves three exact differentials:

$$\frac{x\,dx+y\,dy}{x^2+y^2}+(y\,dx+x\,dy)-y^2\,dy=0$$

That is, \(d(\tfrac12\ln(x^2+y^2))+d(xy)-\tfrac13d(y^3)=0\). The general solution is:

$$\frac12\ln(x^2+y^2)+xy-\frac13y^3=C$$

Here \(\mu=1/(x^2+y^2)\). The origin, where \(x^2+y^2=0\), is excluded; initial data cannot be placed there.

## 14. Example 2.23 · μ=1/[√x(x²+y²)]

$$(2x\sqrt{x}+x^2+y^2)\,dx+2y\sqrt{x}\,dy=0$$

Arrange the terms with respect to \(\sqrt{x}\) and \(x^2+y^2\):

$$2\sqrt{x}(x\,dx+y\,dy)+(x^2+y^2)\,dx=0$$

Divide by \(\sqrt{x}(x^2+y^2)\):

$$2\frac{x\,dx+y\,dy}{x^2+y^2}+\frac{dx}{\sqrt{x}}=0$$

That is, \(2d(\tfrac12\ln(x^2+y^2))+d(2\sqrt{x})=0\). The general solution is:

$$\ln(x^2+y^2)+2\sqrt{x}=C$$

Here \(\mu=1/[\sqrt{x}(x^2+y^2)]\). The requirements are \(x>0\) and \(x^2+y^2>0\); \(x=0\) and the origin are excluded.

## 15. Example 2.24 · μ=1/y and a lost branch

$$y^2\,dx+(xy+y^2-1)\,dy=0$$

Factor \(y\) out of the first pair:

$$y(y\,dx+x\,dy)+(y^2-1)\,dy=0$$

The value \(y=0\) satisfies the equation and is a separate solution:

$$y=0$$

On the branch \(y\neq0\), divide by \(y\) to get \(d(xy)+\tfrac12d(y^2)-d(\ln|y|)=0\). The general family and the separate branch are:

$$xy+\frac12y^2-\ln|y|=C,\qquad y=0$$

Here \(\mu=1/y\), which excludes \(y=0\), so that branch must be stated separately. For \(y<0\) the logarithm is still defined through the absolute value.

## 16. Example 2.25 · Arctangent and logarithm

$$xy\,dx-(x^2+x^2y+y^3)\,dy=0$$

Separate the terms as \(x(y\,dx-x\,dy)\) and \(y(x^2+y^2)\,dy\):

$$x(y\,dx-x\,dy)-y(x^2+y^2)\,dy=0$$

Divide by \(x^2+y^2\); the differential of the arctangent appears:

$$x\,d\left(\arctan\frac xy\right)-y\,dy=0$$

For \(y\neq0\), divide by \(y\), put \(u=x/y\), and use \(u\,d(\arctan u)=\tfrac12d\ln(1+u^2)\):

$$\ln\left(1+\frac{x^2}{y^2}\right)-2y=C,\qquad y=0$$

The value \(y=0\) is a solution of the original equation and is stated separately. On the branch \(y\neq0\) the solution is the implicit family above.

## 17. Integrating factors by groups

Split the equation into two groups: \((M_1\,dx+N_1\,dy)+(M_2\,dx+N_2\,dy)=0\). If each group has its own factor and potential, then:

$$\mu_1M_1\,dx+\mu_1N_1\,dy=dv_1,\qquad \mu_2M_2\,dx+\mu_2N_2\,dy=dv_2$$

The theorem says that \(\mu_1g_1(v_1)\) and \(\mu_2g_2(v_2)\) are also factors of their groups. Choose \(g_1,g_2\) so that the factors coincide:

$$\mu_1g_1(v_1)=\mu_2g_2(v_2)=\mu(x,y)$$

In practice, taking \(g_1(v)=v^\alpha\) and \(g_2(v)=v^\beta\) and equating exponents is usually enough.

## 18. Example 2.26 · The common factor x²y

$$(4xy+3y^4)\,dx+(2x^2+5xy^3)\,dy=0$$

Build two groups and notice that the first is exact:

$$(4xy\,dx+2x^2\,dy)+(3y^4\,dx+5xy^3\,dy)=0,\qquad 2d(x^2y)=4xy\,dx+2x^2\,dy$$

For the first group, \(\mu_1=1\) and \(v_1=x^2y\). For the second, \((M_y-N_x)/N=7/(5x)\), so \(\mu_2=x^{7/5}\) and the group is the differential of \(x^{12/5}y^4\):

$$\mu_2(x)=x^{7/5},\qquad v_2=x^{12/5}y^4$$

The identity \((x^2y)^\alpha=x^{12\beta/5+7/5}y^{4\beta}\) gives \(\alpha=1\) and \(\beta=1/4\). The common factor is:

$$\mu=x^2y$$

Multiplying leaves two exact differentials, \(d(x^4y^2)+d(x^3y^5)=0\). The general solution is:

$$x^4y^2+x^3y^5=C$$

The branches \(x=0\) and \(y=0\), where \(\mu\) vanishes, are inspected separately; initial data cannot lie on these lines.

## 19. Example 2.27 · The common factor √(xy)

$$(5xy-3y^3)\,dx+(3x^2-7xy^2)\,dy=0$$

Two groups:

$$(5xy\,dx+3x^2\,dy)+(-3y^3\,dx-7xy^2\,dy)=0$$

For the first group \((M_y-N_x)/N=-1/(3x)\), and for the second \(2/(7x)\). The group factors and potentials are:

$$\mu_1=x^{-1/3},\quad v_1=x^{5/3}y,\qquad \mu_2=x^{2/7},\quad v_2=x^{9/7}y^3$$

Matching exponents gives \(\alpha=3\beta\) and \(-1/3+5\alpha/3=2/7+9\beta/7\). Hence \(\alpha=1/2\), \(\beta=1/6\), and:

$$\alpha=\frac12,\quad\beta=\frac16,\quad\mu=x^{1/2}y^{1/2}$$

Multiplying gives the potential \(x^{3/2}y^{3/2}(x-y^2)\):

$$x^{3/2}y^{3/2}(x-y^2)=C$$

The branches \(x=0\) and \(y=0\) are zeros of the factor and are inspected separately. Verify by differentiation.

## 20. Example 2.28 · Inspection and groups together

$$(y\,dx-x\,dy)+\sqrt{xy}\,dy=0,\qquad x>0,\ y>0$$

Divide by \(x^2\); the first group becomes \(d(y/x)\):

$$-d\left(\frac yx\right)+x^{-3/2}y^{1/2}\,dy=0$$

For the first group, \(\mu_1=1\) and \(v_1=y/x\); for the second, \(\mu_2=x^{3/2}y^{-1/2}\) and \(v_2=y\). Matching exponents gives \(\mu=x^{3/2}y^{-3/2}\). After multiplication:

$$x^{-1/2}y^{-1/2}\,dx+\left(-x^{1/2}y^{-3/2}+\frac1y\right)dy=0$$

The general solution is:

$$2\sqrt{\frac xy}+\ln y=C$$

On \(x>0\), \(y>0\) the logarithm and the root are defined; the boundary \(y=0\) is excluded.

## 21. Example 2.29 · A logarithmic group

$$\left(xye^{x/y}+y^4\right)dx-x^2e^{x/y}\,dy=0,\qquad y\neq0$$

Separate the terms as \(xe^{x/y}(y\,dx-x\,dy)\) and \(y^4\,dx\), then divide by \(xy^2\):

$$e^{x/y}\,d\left(\frac xy\right)+\frac{y^2}{x}\,dx=0$$

For the first group, \(\mu_1=1\) and \(v_1=e^{x/y}\); for the second, \(\mu_2=1/y^2\) and \(v_2=x\). Choosing \(g_1(v)=\ln v\) and \(g_2(v)=v^2\) gives the common factor. Multiply by \(x^2/y^2\):

$$\frac{x^2}{y^2}e^{x/y}\,d\left(\frac xy\right)+x\,dx=0$$

With \(z=x/y\), the remaining integral is computed by parts:

$$\int z^2e^z\,dz=e^z(z^2-2z+2)$$

The general solution is:

$$e^{x/y}\left(\frac{x^2}{y^2}-\frac{2x}{y}+2\right)+\frac{x^2}{2}=C$$

The value \(y=0\) is undefined in the original equation; the solution is valid on the branch \(y\neq0\). Verify by differentiation.

## 22. Decision summary

Run the exactness test first. If the equation is not exact, try three doors in order:

$$\mu(x)=\exp\left(\int\frac{M_y-N_x}{N}\,dx\right),\qquad \mu(y)=\exp\left(\int\frac{N_x-M_y}{M}\,dy\right)$$

If the quotients do not depend on a single variable, use the inspection formulas: \(d(xy)\), \(d(y/x)\), \(d(\arctan(y/x))\), \(d(\tfrac12\ln(x^2+y^2))\). The last resort is grouping: find each group’s factor and match \(\mu_1g_1(v_1)=\mu_2g_2(v_2)\). In every case, test in the original equation the branches where the factor vanishes, and verify by implicit differentiation.

## 23. Experiment: compare four families

In the workshop \(x_0=1\) is fixed; the A and B sliders change the initial value \(y(1)\). Predict first: why are the level curves ellipses in the exact family? How does the factor change the level curve in the \(\mu(x)=e^x\) family? Why does the \(\mu(y)=1/y\) family require \(y>0\)? Why does the inspection family require \(x>0\) and \(y\neq0\)? Then open each family in turn and record what you observe.

The exact family has the potential \(u=x^2+xy+y^2\); its level curves are ellipses for \(C>0\):

$$u(x,y)=x^2+xy+y^2$$

In the \(\mu(x)=e^x\) family the potential is \(e^xy(2x-y)\); the initial values \(y=0\) and \(y=2x\) are invalid:

$$u(x,y)=e^xy(2x-y)$$

In the \(\mu(y)=1/y\) family the potential is \(xy+\tfrac12y^2-\ln y\); it requires \(y>0\):

$$u(x,y)=xy+\frac12y^2-\ln y$$

In the inspection family the potential is \(\ln(x^2+y^2)+2\sqrt{x}\); it requires \(x>0\) and \(y\neq0\):

$$u(x,y)=\ln(x^2+y^2)+2\sqrt{x}$$

Questions for observation: when A and B select different values of \(C\), which level curves of the same potential appear? Does the factor change the scale of the potential or its level curves? Record your answers in the lesson notebook.

## Midterm practice

Suggested time: 18 minutes. Total: 20 points. Try each problem before opening its worked solution. Credit is awarded for the exactness test, choosing the factor, checking lost branches, verifying, and stating the interval—not only for the final expression.

### Problem 1 · Exact equation (5 points, 4 minutes)

Solve \((6xy^2+4x^3y)\,dx+(6x^2y+x^4+e^y)\,dy=0\). Run the \(M_y=N_x\) test, integrate \(M\), find \(g'(y)\), and verify by differentiation.

### Problem 2 · μ(x)=e^x (5 points, 4 minutes)

Solve \(y(2x-y+2)\,dx+2(x-y)\,dy=0\) by finding \(\mu(x)\). Compute \((M_y-N_x)/N\) and state the branches \(y=0\) and \(y=2x\).

### Problem 3 · Inspection (5 points, 5 minutes)

Solve \((3x^4+y)\,dx+(2x^2y-x)\,dy=0\) by inspection. Factor \(x^2\), show that \((y\,dx-x\,dy)/x^2=-d(y/x)\), and state the interval \(x\neq0\).

### Problem 4 · Groups (5 points, 5 minutes)

Solve \((4xy+3y^4)\,dx+(2x^2+5xy^3)\,dy=0\) by grouping. Find each group’s factor separately, equate the exponents, and verify \(\mu=x^2y\).

**Marking:** Each problem is worth 5 points: exactness/factor choice 1, intermediate equation 1, integration 1, potential and solution 1, verification and branches 1. Open the worked solutions on the Midterm preparation screen.

## Checklist

- Did I write the equation as \(M\,dx+N\,dy=0\) and run the \(M_y=N_x\) test?
- If it is not exact, did I try \(\mu(x)\), \(\mu(y)\), inspection, and grouping in order?
- Once the factor is found, did I multiply **every** term of the equation by it?
- When building the potential, did I keep the integration constant as a function of the other variable?
- Did I test in the original equation the branches where the factor or a denominator vanishes?
- Did I verify by implicit differentiation and state the domain?

Completing this step completes §2.3 only. The next topic follows after review.

---

Study support: open the lesson workshop for guided reasoning and the practice screen for worked problems. Keep your own explanation in the per-lesson notebook.
