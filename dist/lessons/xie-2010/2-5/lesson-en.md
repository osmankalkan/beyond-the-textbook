# §2.5 · Equations solvable for the dependent or independent variable

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.5, printed pp.61–67 / PDF pp.79–85. Examples 2.35–2.39. This is an original English study adaptation.

## What you will learn

- To read a first-order equation as \(F(x,y,p)=0\) with the parameter \(p=y'\).
- To solve for \(y\) or for \(x\) and pass to an equation that is **separable** in \(p\).
- To keep the answer **parametric** when \(p\) cannot be eliminated, and to see that this is not an incomplete answer.
- To separate the line family of a Clairaut equation from its **singular solution**.
- To state the branch and the domain of the singular solution and verify it by differentiation.

## Decision map

The whole section rests on one habit: write the equation in terms of the derivative \(p\), then choose the variable you can actually isolate.

$$F(x,y,p)=0,\qquad p=y'$$

| Convenient form of the equation | Differentiate with respect to | Resulting equation |
| --- | --- | --- |
| \(y=f(x,p)\) | \(x\) | \(p=f_x+f_p\,dp/dx\) |
| \(x=g(y,p)\) | \(y\) | \(1/p=g_y+g_p\,dp/dy\) |
| \(y=xp+f(p)\) | \(x\) | \((x+f'(p))\,dp/dx=0\) |

> **One shared idea.** All three rows say the same thing: write the curve as a function of \(p\), then solve a separable equation in \(p\). In the Clairaut row the equation already has this shape, so only the factor split remains.

## 1. The parameter p and the singular solution

The general solution is a one-parameter family of curves carrying a free constant \(C\):

$$y=\phi(x,C)$$

Some equations have an extra solution that no value of \(C\) produces. It is called the **singular solution** and it is the envelope of the family:

$$y=\psi(x),\qquad \psi(x)\neq\phi(x,C)\quad\forall C$$

> **Intuition.** The singular solution is not a "better" solution; it is the curve that bounds the family. Every curve of the family touches the envelope at one point, where both the value and the slope agree. That is why the singular solution is written separately from the general family.

## 2. Equations solvable for y

If the equation can be solved explicitly for \(y\), write

$$y=f(x,p)$$

Differentiating with respect to \(x\) turns \(p=y'\) into an equation for \(p\) itself:

$$p=\frac{\partial f}{\partial x}+\frac{\partial f}{\partial p}\frac{dp}{dx}$$

The same line in differential form returns the equation above after dividing by \(dx\):

$$dy=\frac{\partial f}{\partial x}\,dx+\frac{\partial f}{\partial p}\,dp$$

This is a first-order equation between \(x\) and \(p\); its solution carries one parameter, written \(\varphi(x,p,C)=0\). From here there are two exits.

- If \(p\) isolates easily, eliminate it and write the closed solution: \(y=f(x,p(x,C))\).
- If it does not, keep \(x\) and \(y\) parametric.

$$x=x(p),\qquad y=f\bigl(x(p),p\bigr)$$

> **A common misreading.** A parametric answer is not half a solution. Here \(p\) is a free parameter: each value of \(p\) gives one point of the curve, and the slope at that point is exactly \(p\).

## 3. Equations solvable for x

If the equation can be solved for \(x\), write

$$x=g(y,p)$$

and differentiate with respect to \(y\) this time. Since \(dx/dy=1/p\), the chain rule becomes

$$\frac1p=\frac{\partial g}{\partial y}+\frac{\partial g}{\partial p}\frac{dp}{dy}$$

In differential form:

$$dx=\frac{\partial g}{\partial y}\,dy+\frac{\partial g}{\partial p}\,dp$$

The solution is \(\psi(y,p,C)=0\); when \(p\) cannot be eliminated, switch to the parametric form:

$$y=y(p),\qquad x=g\bigl(y(p),p\bigr)$$

The choice is algebraic: **isolate whichever variable leaves the equation with less work.** The aim is always a separable equation in the derivative of \(p\); the appearance of the equation decides the route.

## 4. Example 2.35 · An equation solvable for x

$$x=p+p^4,\qquad p=y'$$

The equation is already solved for \(x\), so differentiate with respect to \(y\). Two auxiliary derivatives are needed:

$$\frac{dx}{dp}=1+4p^3,\qquad \frac{dy}{dp}=p+4p^4$$

The second comes from the chain \(dx/dy=1/p\). Writing the chain separates the variables, and the integral is immediate:

$$\frac1p=\left(1+4p^3\right)\frac{dp}{dy}\quad\Longrightarrow\quad dy=\left(p+4p^4\right)dp$$

$$y=\frac12p^2+\frac45p^5+C$$

Because \(p\) cannot be eliminated algebraically, the general solution stays parametric:

$$x=p+p^4,\qquad y=\frac12p^2+\frac45p^5+C$$

The derivative ratio agrees exactly with the definition \(p=y'\):

$$\frac{dy}{dx}=\frac{dy/dp}{dx/dp}=\frac{p+4p^4}{1+4p^3}=p$$

> **Outcome.** This family has no singular solution: every \(p\) sits on a curve of the \(C\)-family and no envelope forms. The parametric answer is the natural, complete answer for this equation.

## 5. Example 2.36 · An equation solvable for y

$$xp^2-2yp-x=0$$

> **First check**
>
> Setting \(p=0\) leaves \(-x=0\). That holds only at the single point \(x=0\) and defines no solution curve, so take \(p\neq0\).

Solve for \(y\):

$$y=\frac{x\left(p^2-1\right)}{2p}=\frac{x}{2}\left(p-\frac1p\right)$$

Differentiating with respect to \(x\) and rearranging puts the factor \((p^2+1)\) on both sides:

$$p=\frac12\left(p-\frac1p\right)+\frac{x}{2}\left(1+\frac1{p^2}\right)\frac{dp}{dx}$$

$$p^2+1\neq0\quad\Longrightarrow\quad \frac{p^2+1}{p}=\frac{x\left(p^2+1\right)}{p^2}\frac{dp}{dx}\quad\Longrightarrow\quad \frac{dp}{p}=\frac{dx}{x}$$

The integral collects the logarithms into one line:

$$\ln|p|=\ln|x|+\ln|C|\quad\Longrightarrow\quad p=Cx$$

$$2y=Cx^2-\frac1C$$

Solving for \(x\) as a function of \(y\) as a second route gives the same family under \(C\mapsto1/C\), so one general solution suffices. The special values \(p=\pm1\) give \(y=0\), but \(y=0\) does not satisfy the original equation and is excluded.

## 6. Example 2.37 · A Clairaut-type equation and a singular circle

$$y=xp+\sqrt{1+p^2}$$

Differentiating with respect to \(x\) and cancelling \(p\) leaves two factors:

$$p=p+\left(x+\frac{p}{\sqrt{1+p^2}}\right)\frac{dp}{dx}\quad\Longrightarrow\quad \left(x+\frac{p}{\sqrt{1+p^2}}\right)\frac{dp}{dx}=0$$

The first branch is \(dp/dx=0\), that is \(p=C\); it gives the lines of slope \(C\) with \(y\)-intercept \(\sqrt{1+C^2}\):

$$y=Cx+\sqrt{1+C^2}$$

On the second branch \(x=-p/\sqrt{1+p^2}\). Substituting into \(y\) gives \(y=1/\sqrt{1+p^2}\), and the squares add to a constant:

$$x^2+y^2=1,\qquad y>0$$

> **Branch warning.** Only the upper semicircle is valid: the square root is taken on its positive branch, so \(y<0\) does not satisfy the equation. Every line is tangent to the circle at one point, and that point satisfies \(x_0^2+y_0^2=1\), \(y_0>0\). The derivative check gives \(y'=-x/y\).

## 7. The Clairaut equation

An equation of the form

$$y=xp+f(p)$$

is called a **Clairaut equation**. Differentiating with respect to \(x\) leaves \(p\) as a product of two factors:

$$p=p+\left(x+f'(p)\right)\frac{dp}{dx}\quad\Longrightarrow\quad \left(x+f'(p)\right)\frac{dp}{dx}=0$$

The first branch \(dp/dx=0\) means \(p=C\): the general solution is a **family of lines**.

$$y=Cx+f(C)$$

The second branch \(x=-f'(p)\) gives the singular solution parametrically:

$$x=-f'(p),\qquad y=f(p)-p f'(p)$$

> **The edge of the envelope.** This curve is the envelope of the line family, and every line is tangent to it. Its domain is the interval where \(f\) is differentiable and \(p\) stays real; it is stated independently of the general family.

## 8. Example 2.38 · The p=0 branch and a singular solution

$$y^2p^2+3xp-y=0$$

> **First check**
>
> This leaves \(-y=0\), so \(y=0\) really is a solution. That branch has to be stated separately from the general family.

For \(p\neq0\), solve for \(x\) and differentiate with respect to \(y\):

$$x=\frac{y-y^2p^2}{3p}=\frac13\left(\frac{y}{p}-y^2p\right)$$

$$\frac1p=\frac13\left(\frac1p-2yp\right)-\frac13\left(\frac{y}{p^2}+y^2\right)\frac{dp}{dy}$$

Rearranging splits the equation into two independent factors:

$$\left(yp^2+1\right)\left(\frac{y}{p}\frac{dp}{dy}+2\right)=0$$

The second factor produces the general family:

$$\frac{dp}{p}=-\frac{2\,dy}{y}\quad\Longrightarrow\quad p=\frac{C}{y^2}\quad\Longrightarrow\quad y^3-3Cx-C^2=0$$

The first factor \(yp^2+1=0\) leads to the singular solution. There \(p^2=-1/y\) is real only for \(y<0\); using \(y^2p^2=-y\) in the square of the \(x\)-expression gives the curve in closed form:

$$x^2=-\frac{4y^3}{9}\quad\Longrightarrow\quad 9x^2+4y^3=0$$

> **A branch that is easily lost.** The singular curve lies on \(y\le0\) and never comes out of the general family for any \(C\). The solution \(y=0\) meets this curve at \(x=0\); remember to state it as a separate branch.

## 9. Example 2.39 · A Clairaut equation and a singular parabola

$$y=xp+\frac{a^2}{p},\qquad p\neq0$$

Differentiate with respect to \(x\):

$$p=p+\left(x-\frac{a^2}{p^2}\right)\frac{dp}{dx}\quad\Longrightarrow\quad \left(x-\frac{a^2}{p^2}\right)\frac{dp}{dx}=0$$

The first branch \(p=C\) gives the line family of slope \(C\):

$$y=Cx+\frac{a^2}{C}$$

On the second branch \(p^2=a^2/x\), so \(x=a^2/p^2\) and \(y=2a^2/p\). Eliminating \(p\) turns the singular solution into a parabola:

$$y^2=4a^2x$$

> **Branch and verification.** The parabola is real for \(x>0\) only. For \(a>0\), positive \(C\) lines touch the upper branch \(y=2a\sqrt x\) and negative \(C\) lines touch the lower branch \(y=-2a\sqrt x\). The derivative check gives \(2yy'=4a^2\), that is \(y'=2a^2/y\).

## 10. Decision summary

| Form of the equation | Route | General solution | Singular solution |
| --- | --- | --- | --- |
| \(y=f(x,p)\) | differentiate with respect to \(x\) | \(y=f(x,p(x,C))\) or \(x=x(p)\), \(y=f(x(p),p)\) | usually none; check separately |
| \(x=g(y,p)\) | differentiate with respect to \(y\) | \(y=y(p)\), \(x=g(y(p),p)\) | may arise from a zero factor |
| \(y=xp+f(p)\) | Clairaut: split the factors | \(y=Cx+f(C)\) | \(x=-f'(p)\), \(y=f(p)-pf'(p)\) |

In every case the last step is the same: substitute the general solution and any singular solution back into the original equation.

$$F\bigl(x,y(x),y'(x)\bigr)=0,\qquad p=y'$$

## 11. Experiment: compare the four families

The four families in the workshop represent the four decisions of this section.

| Family | Equation | General solution | Singular solution |
| --- | --- | --- | --- |
| Clairaut square | \(y=xp+p^2\) | \(y=Cx+C^2\) | \(y=-x^2/4\) |
| Clairaut inverse | \(y=xp+1/p\) | \(y=Cx+1/C\) | \(y^2=4x\) |
| Solvable for \(x\) | \(y^2p^2+3xp-y=0\) | \(y^3=3Cx+C^2\) | \(9x^2+4y^3=0\) |
| Solvable for \(y\) | \(xp^2-2yp-x=0\) | \(2y=Cx^2-1/C\) | none |

A and B are two values of the parameter \(C\) in the same family. At the chosen inspection point you read the value of the curve, its slope \(p\), the value of the envelope and the tangency point together. The dashed gold curve is the singular solution, and the general curve is tangent to it. Do not conclude that a solution ends when the curve leaves the plot window; the real boundary is the domain of the family.

## Midterm preparation

The four worked cases cover, in order, the parametric equation, the equation solvable by two routes, the \(p=0\) branch together with a singular solution, and the Clairaut equation. Keep the same order in each case: decide which variable to isolate, build the derivative chain, solve the separable equation, eliminate or keep \(p\) parametric, state the singular solution separately, and verify by differentiation. Then test yourself with the eleven questions in the practice section.

## Checklist

- Is the equation easier to solve for \(y\) or for \(x\)?
- Is the \(p=y'\) chain correct, with the terms \(\partial f/\partial p\) and \(\partial g/\partial p\) in place?
- Was \(dx/dy=1/p\) used, and was \(p=0\) checked separately?
- Can \(p\) be eliminated, or was a parametric form needed?
- In a Clairaut equation, were the branches \(dp/dx=0\) and \(x=-f'(p)\) separated?
- Is the singular solution independent of the general family, with its branch, domain and envelope property stated?
- Was the result verified in the original equation and by differentiation?
