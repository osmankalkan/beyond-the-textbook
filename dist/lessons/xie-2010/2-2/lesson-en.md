# §2.2 · Transformation of variables

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.2, printed pp.20–30 / PDF pp.38–48, Examples 2.4–2.12. This is an original English study adaptation.

## What you will learn

- To read the **repeating structure** of a first-order equation and choose the transformation that fits it.
- To build the chains for \(v=y/x\), \(v=x+y\), \(v=y^3/x\), \(v=xy\) and \(v^2=x^2-y^2\).
- To test the root of every divided factor as a separate solution candidate.
- To state the back-substitution, the initial datum and the widest interval.
- To verify the result by implicit differentiation.

## Decision map

The whole section reduces to one question: **which expression repeats in the equation?**

| Shape of the equation | Transformation | Reduced equation |
| --- | --- | --- |
| \(y'=f(y/x)\) | \(v=y/x\) | \(dv/[f(v)-v]=dx/x\) |
| Numerator and denominator linear, lines intersect | Shift the axes to the intersection, \(v=Y/X\) | Homogeneous form |
| Numerator and denominator linear, lines parallel | \(v=a_1x+b_1y\) | Separable |
| Repetition of \(x+y\) | \(v=x+y\) | \(v'=1+y'\) |
| Repetition of \(y^3/x\) | \(v=y^3/x\) | \(3y^2y'=v+xv'\) |
| \((x/y)\,y'=f(xy)\) | \(v=xy\) | \(xv'=v(1+f(v))\) |
| \(\sqrt{x^2-y^2}\) | \(v^2=x^2-y^2\) | \(2x-2yy'=2vv'\) |

> **One shared habit.** Every row performs the same move: give the repeating expression a single name, write the derivative chain, and separate what is left. The difficulty is not applying the transformation but saying which one you chose and why.

## 1. Homogeneous equations: v=y/x

If the right side depends only on the ratio \(y/x\), the equation is homogeneous. Putting \(y=vx\) and differentiating with the product rule makes \(x\) and \(v\) separable:

$$\frac{dy}{dx}=f\left(\frac{y}{x}\right),\qquad y=vx\quad\Longrightarrow\quad \frac{dy}{dx}=v+x\frac{dv}{dx}$$

> **Why this transformation?** Writing \(y=vx\) reduces a two-variable equation to a single ratio. The scale \(x\) stays outside; what remains is a separable link between \(v\) and \(x\).

$$\frac{dv}{f(v)-v}=\frac{dx}{x}$$

The last step divides by \(f(v)-v\), so solve \(f(v)-v=0\) first. Each root \(v_0\) gives a line candidate \(y=v_0x\); test it in the original equation. That branch may belong to the general family or may have to be stated separately. Points with \(x=0\) or where \(f(v)-v\) is undefined lie outside the solution interval.

## 2. Example 2.4 · A homogeneous initial-value problem

The equation is defined for \(x\neq0\) and \(y\neq0\):

$$\frac{dy}{dx}+\frac{x}{y}+2=0,\qquad y(0)=1$$

Write the right side as \(f(v)=-(1/v+2)\); under \(y=vx\):

$$v+x\frac{dv}{dx}=-\left(\frac1v+2\right)\quad\Longrightarrow\quad x\frac{dv}{dx}=-\frac{(v+1)^2}{v}$$

Here \(f(v)-v=-(v+1)^2/v\). The root \(v=-1\), that is \(y=-x\), is a genuine solution of the equation, but it does not satisfy \(y(0)=1\), so it is dropped. On the branch \(v\neq-1\), separate:

$$\frac{v}{(v+1)^2}\,dv=-\frac{dx}{x}\quad\Longrightarrow\quad \ln|v+1|+\frac{1}{v+1}=-\ln|x|+C$$

The split \(v/(v+1)^2=1/(v+1)-1/(v+1)^2\) breaks the integral into two parts. Restoring \(v=y/x\) and combining the logarithms gives the implicit family:

$$\ln|y+x|+\frac{x}{y+x}=C$$

The initial point \((0,1)\) gives \(\ln 1+0=C\), so \(C=0\); the branch has \(y+x>0\). To verify, differentiate implicitly: \(y'=-(x+2y)/y\), which returns the original equation.

> **How is the interval found?** Put \(u=y+x\). The family with \(C=0\) becomes \(x=-u\ln u\) and \(y=u(1+\ln u)\), and \((0,1)\) corresponds to \(u=1\). For \(u>1/e\), \(x<1/e\) and \(y>0\); as \(u\to 1/e^+\), \(x\to 1/e^-\) and \(y\to 0^+\). At \(x=1/e\), \(y=0\) and the original equation is undefined. Widest interval: \(x<1/e\), \(y>0\).

## 3. Example 2.5 · A logarithmic homogeneous equation

$$x(\ln x-\ln y)\,dy-y\,dx=0,\qquad x>0,\ y>0$$

Divide by \(x\) and put \(v=y/x\): then \(\ln x-\ln y=-\ln v\) and \(y'=-v/\ln v\). With the product rule:

$$x\frac{dv}{dx}=-\frac{v(1+\ln v)}{\ln v}\quad\Longrightarrow\quad \frac{\ln v}{v(1+\ln v)}\,dv=-\frac{dx}{x}$$

On the branch \(\ln v\neq0\) with \(v>0\) the variables separate. With \(u=\ln v\), \(\int u/(1+u)\,du=u-\ln|1+u|\); exponentiation gives \(xv/(1+\ln v)=C\), that is \(y/(1+\ln y-\ln x)=C\). The root \(1+\ln v=0\) gives \(v=1/e\), the **singular solution** that no finite \(C\) produces:

$$\frac{y}{1+\ln y-\ln x}=C,\qquad y=\frac{x}{e}$$

> **Verification.** The implicit derivative of the family returns the original equation. On \(y=x/e\), \(y'=1/e\) is constant and the equation holds. The value \(v=0\), that is \(y=0\), is undefined in the original logarithm.

## 4. Example 2.6 · A homogeneous equation with arctangent

$$(y+x)\,dy+(x-y)\,dx=0$$

\(y=-x\) is not a solution. On \(x\neq0\), divide numerator and denominator by \(x\); the right side becomes \((v-1)/(v+1)\). With \(v=y/x\), \(v+xv'=(v-1)/(v+1)\), hence \(xv'=-(v^2+1)/(v+1)\). The split \((v+1)/(v^2+1)=v/(v^2+1)+1/(v^2+1)\) gives the integral:

$$\ln(x^2+y^2)+2\arctan\frac{y}{x}=C$$

The integration gives \((1/2)\ln(v^2+1)+\arctan v=-\ln|x|+C\); multiplying by two and combining \(\ln|x|\) brings the family to the form above. Since \(v^2+1>0\), no constant branch is lost.

> **Limits.** \(x=0\) and the selected arctangent branch stay outside the interval. Implicit differentiation returns the original differential form exactly.

## 5. Example 2.7 · Intersecting lines: shift the axes first

$$\frac{dy}{dx}=\frac{2x-y+1}{x-2y+1}$$

The lines \(2x-y+1=0\) and \(x-2y+1=0\) meet at \((-1/3,1/3)\). Shift the axes to that point to remove the constant terms: \(x=X-1/3\) and \(y=Y+1/3\). The new equation is \(dY/dX=(2X-Y)/(X-2Y)\), which is homogeneous. With \(v=Y/X\), \(Xv'=2(v^2-v+1)/(1-2v)\); integrating \((1-2v)/(v^2-v+1)\,dv=2\,dX/X\) gives \(-\ln(v^2-v+1)=2\ln|X|+C\), hence \(X^2(v^2-v+1)=A\). Back-substitution:

$$x^2-xy+y^2+x-y+\frac13=A$$

For \(A>0\) this is an ellipse with a shifted centre.

> **The lost line.** \(X=0\), that is \(x=-1/3\), makes the denominator vanish and is excluded from the interval. The case \(A=0\) collapses to a single point.

## 6. Example 2.8 · Parallel lines: v=x−y

$$\frac{dy}{dx}=\frac{x-y+5}{2x-2y-2}$$

Numerator and denominator repeat \(x-y\); the lines are parallel and have no finite intersection. With \(v=x-y\), \(v'=1-y'\), and the equation reduces to \(dv/dx=(v-7)/(2(v-1))\). On \(v\neq7\), \(2(v-1)/(v-7)\,dv=dx\); the split \((v-1)/(v-7)=1+6/(v-7)\) gives \(2v+12\ln|v-7|=x+C\):

$$\frac{x}{2}-y+6\ln|x-y-7|=C,\qquad x-y=7$$

> **A dangerous but valid branch.** \(x-y=7\) looks like a vanishing denominator, yet the original equation makes both sides \(1\); it is a genuine singular solution. The line \(x-y=1\) does make the original denominator vanish and lies outside the domain.

## 7. Example 2.9 · A special term: v=x+y

$$\frac{dy}{dx}=(x+y)^2$$

The equation is neither separable nor a function of \(y/x\) alone. The repeated term is \(x+y\); with \(v=x+y\), \(v'=1+y'=1+v^2\). Since \(1+v^2\) never vanishes, the division loses no constant branch. Then \(\arctan v=x+C\), that is:

$$y=\tan(x+C)-x$$

Verification: \(y'=\sec^2(x+C)-1=\tan^2(x+C)=(x+y)^2\).

> **Interval.** The solution lives on the connected interval where cosine does not vanish. The poles are \(x+C=\pi/2+k\pi\) and the interval is written open.

## 8. Example 2.10 · A special term: v=y³/x

$$\frac{dy}{dx}=\frac{y^6-2x^2}{2xy^5+x^2y^2}$$

On \(x>0\), \(y\neq0\) and \(2y^3+x\neq0\), divide numerator and denominator by \(x^2\); the special term \(y^3/x\) appears. Put \(v=y^3/x\), that is \(y^3=vx\); then \(3y^2y'=v+xv'\). The reduced equation is \((1/3)(v+xv')=(v^2-2)/(2v+1)\), hence \(xv'=(v^2-v-6)/(2v+1)\). The roots of \(v^2-v-6=(v-3)(v+2)\) are \(v=3\) and \(v=-2\), giving the branches \(y^3=3x\) and \(y^3=-2x\). On \(v\neq3,-2\), integrate \((2v+1)/(v^2-v-6)\,dv=dx/x\):

$$(y^3-3x)^7(y^3+2x)^3=Cx^{15}$$

The partial fractions \((2v+1)/[(v-3)(v+2)]=7/[5(v-3)]+3/[5(v+2)]\) give \((v-3)^7(v+2)^3=Cx^5\); restoring \(v\) yields the family above.

> **Where are the branches?** \(v=3\) and \(v=-2\) are the \(C=0\) members, so they belong to the general family and need no separate line. The denominator \(2y^3+x=0\) bounds the solution interval.

## 9. Example 2.11 · A special term: v=xy

$$\frac{x}{y}\frac{dy}{dx}=f(xy),\qquad v=xy\quad\Longrightarrow\quad x\frac{dv}{dx}=v\bigl(1+f(v)\bigr)$$

With \(v=xy\), \(dv/dx=y+xy'=y[1+f(v)]\); since \(y=v/x\), \(xv'=v(1+f(v))\). Any roots of \(f(v)+1=0\) give line solutions \(xy=v_0\); otherwise the variables separate. In the book’s example \(f(v)=(2+v^2)/(2-v^2)\), so \(xv'=4v/(2-v^2)\) and \((1/(2v)-v/4)\,dv=dx/x\). The integral is \((1/2)\ln|v|-v^2/8=\ln|x|+C\); multiplying by two:

$$\ln\left|\frac{y}{x}\right|-\frac{x^2y^2}{4}=C$$

> **Lost-branch check.** \(f(v)+1=4/(2-v^2)\) never vanishes, so no constant branch is lost. The value \(v=0\), that is \(y=0\), is excluded; \(v=\pm\sqrt2\) are poles of the original equation, not solutions.

## 10. Example 2.12 · A radical expression: v²=x²−y²

$$\frac{dy}{dx}=\frac{\sqrt{x+y}-\sqrt{x-y}}{\sqrt{x+y}+\sqrt{x-y}},\qquad x>0,\ |y|<x$$

Multiplying numerator and denominator by the conjugate makes the numerator \(x^2-y^2\) and the denominator \(y\); the equation becomes \(y'=(x-\sqrt{x^2-y^2})/y\). To remove the radical put \(v^2=x^2-y^2\). Differentiation gives \(2x-2yy'=2vv'\), that is \(y'=(x-vv')/y\). Substituting this into the reduced equation gives \(vv'=v\). On \(v\neq0\), \(v'=1\), so \(v=x+C\). Back-substitution:

$$y^2=-2Cx-C^2$$

This is the parabolic family \(x^2-y^2=(x+C)^2\).

> **Envelope and edge.** On the branch \(v>0\), \(x>-C\) and \(|y|<x\) are preserved. The lines \(y=\pm x\) on the boundary \(v=0\) are singular solutions; \(y=0\) is the \(C=0\) member. At \(x=-C\), \(v=0\), so the interval is open.

## 11. Decision summary

| Situation | Route | Result |
| --- | --- | --- |
| Homogeneous | \(v=y/x\), then separate | \(\ln|x|+C=\int dv/[f(v)-v]\) |
| Intersecting lines | Shift the axes, then \(v=Y/X\) | Homogeneous family; an ellipse after the shift back |
| Parallel lines | \(v=a_1x+b_1y\) | Separable; a root of \(v\) is a singular-branch candidate |
| Special term | Turn the term into a single \(v\) | \(v'\) written in terms of \(y'\) |

When numerator and denominator are linear, the coefficients decide which transformation is needed:

$$\frac{dy}{dx}=\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}$$

If \(a_1b_2-a_2b_1\neq0\) the lines intersect: shift the axes and homogenise. If it vanishes the lines are parallel: take \(v=a_1x+b_1y\). In every case, test the root of every divided factor in the original equation and state singular branches separately from the general family.

## 12. Experiment: compare four families

In the workshop \(x_0=1\) is fixed; the A and B sliders change the initial value \(y(1)\). Predict first: as the initial value grows, in which family does the interval expand at both ends, and in which does only one end move?

> **Prediction.** In the circle the interval is \((0,A)\), so a growing \(A\) pushes both ends. In the radical family the left end depends on \(-C\) while the right end runs to infinity, so only the left end moves.

The circle family is \(x^2+y^2=Ax\); its centre is \((A/2,0)\) and its radius is \(A/2\):

$$x^2+y^2=Ax,\qquad A=\frac{x_0^2+y_0^2}{x_0}$$

In the ellipse family \(A\) grows the ellipse and the connected interval stays between two poles:

$$x^2-xy+y^2=A$$

In the sum family each branch lives between two vertical poles; the vertical boundaries in the plot are genuine poles:

$$y+x=\tan(x+C)$$

In the radical family \(C\) is negative; the connected interval is \((-C,\infty)\) and \(v=0\) is approached at \(x=-C\):

$$x^2-y^2=(x+C)^2$$

Questions for observation: as \(A\) grows, why is the circle interval \((0,A)\)? Why do both ends of the ellipse move together? Why is the sum interval bounded by poles? Why does only the left end move in the radical family? Record your answers in the lesson notebook, then compare the same initial value across all four families.

## Midterm preparation

The four worked cases cover, in order, a homogeneous initial-value problem, a homogeneous equation with arctangent, intersecting lines, and the radical transformation. Keep the same order in each case: classify the equation, choose the transformation, build the derivative chain, separate and integrate, substitute back, apply the initial datum, test the lost branch, verify implicitly and state the interval. Then test yourself with the eleven questions in the practice section.

## Checklist

- Is the right side a function of \(y/x\) alone, or is there a special term?
- Did I build the derivative chain correctly after the transformation?
- Where can the factor I divided by vanish, and does its root solve the original equation?
- Did I apply the back-substitution and the initial datum correctly?
- Did I verify by implicit differentiation and state the interval with poles excluded?


---

Study support: open the lesson workshop for guided reasoning and the practice screen for worked problems. Keep your own explanation in the per-lesson notebook.
