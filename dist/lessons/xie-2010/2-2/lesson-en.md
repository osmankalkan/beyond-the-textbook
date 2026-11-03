# §2.2 · Transformation of variables

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.2, printed pp.20–30 / PDF pp.38–48, Examples 2.4–2.12. This is an original English study adaptation.

## Study sequence

Classify the first-order equation first: is the right side a function of y/x alone, are numerator and denominator linear, or is there a repeated special term such as x+y, x−y, y³/x, xy, or x²−y²? Choose the matching transformation, build the derivative chain correctly, separate and integrate, substitute back, apply the initial datum, verify by differentiation, and state the interval. At every division, test the constant branches that could be lost in the original equation. The exam section practises these decisions on four timed, scored problems.

## 1. Homogeneous equations: v=y/x

The equation is homogeneous when the right side depends only on the ratio y/x. Put y=vx and differentiate with the product rule; x and v then become separable:

$$\frac{dy}{dx}=f\left(\frac{y}{x}\right)$$

$$y=vx,\qquad \frac{dy}{dx}=v+x\frac{dv}{dx}$$

$$ \frac{dv}{f(v)-v}=\frac{dx}{x}$$

The last step divides by f(v)−v. Solve f(v)−v=0 before dividing. Each root v₀ gives a candidate line y=v₀x; substitute it into the original equation. Such a branch may belong to the general family or may have to be stated separately. Points with x=0 or where f(v)−v is undefined lie outside the solution interval.

## 2. Example 2.4 · A homogeneous initial-value problem

The equation is defined for x≠0 and y≠0:

$$\frac{dy}{dx}+\frac{x}{y}+2=0,\qquad y(0)=1$$

Write the right side as f(v)=−(1/v+2). Under y=vx:

$$v+x\frac{dv}{dx}=-\left(\frac{1}{v}+2\right)$$

$$x\frac{dv}{dx}=-\frac{(v+1)^2}{v}$$

Here f(v)−v=−(v+1)²/v. The root v=−1, that is y=−x, is a genuine solution of the equation, but it does not satisfy y(0)=1. On the branch v≠−1, separate:

$$\frac{v}{(v+1)^2}\,dv=-\frac{dx}{x}$$

Since v/(v+1)²=1/(v+1)−1/(v+1)², integrating both sides gives:

$$\ln|v+1|+\frac{1}{v+1}=-\ln|x|+C$$

Put back v=y/x and combine the logarithms to obtain the implicit family:

$$\ln|y+x|+\frac{x}{y+x}=C$$

Substituting the initial point (0,1) gives ln1+0=C, so C=0. The branch has y+x>0. To verify, differentiate implicitly: y′=−(x+2y)/y, which is y′+x/y+2=0. For the interval, let u=y+x. The family with C=0 gives x=−u ln u and y=u(1+ln u); the point (0,1) corresponds to u=1. For u>1/e, x<1/e and y>0; as u→1/e⁺, x→1/e⁻ and y→0⁺, while as u→∞, x→−∞ and y→∞. At x=1/e, y=0 and the original equation is undefined. The maximal solution interval is x<1/e with y>0.

## 3. Example 2.5 · A logarithmic homogeneous equation

On x>0 and y>0:

$$x(\ln x-\ln y)\,dy-y\,dx=0,\qquad x>0,\ y>0$$

Divide by x and put v=y/x. Then ln x−ln y=−ln v and y′=−v/ln v. The product rule gives:

$$x\frac{dv}{dx}=-\frac{v(1+\ln v)}{\ln v}$$

On the branch ln v≠0 and v>0, separate:

$$\frac{\ln v}{v(1+\ln v)}\,dv=-\frac{dx}{x}$$

With u=ln v, ∫u/(1+u)du=u−ln|1+u|. Hence ln v−ln|1+ln v|=−ln x+C; exponentiation gives xv/(1+ln v)=C, that is y/(1+ln y−ln x)=C. The root 1+ln v=0 gives v=1/e, a singular solution that no finite C produces in the general family:

$$\frac{y}{1+\ln y-\ln x}=C,\qquad y=\frac{x}{e}$$

Verify by differentiation: the implicit derivative of the family recovers the original equation. On y=x/e, y′=1/e is constant and the equation holds. The value v=0, that is y=0, is undefined in the original logarithm.

## 4. Example 2.6 · A homogeneous equation with arctangent

$$(y+x)\,dy+(x-y)\,dx=0$$

y=−x is not a solution. On x≠0, divide numerator and denominator by x; the right side becomes (v−1)/(v+1). With v=y/x, v+xv′=(v−1)/(v+1), hence xv′=−(v²+1)/(v+1). Separate and use (v+1)/(v²+1)=v/(v²+1)+1/(v²+1):

$$\ln(x^2+y^2)+2\arctan\frac{y}{x}=C$$

The integration gives (1/2)ln(v²+1)+arctan v=−ln|x|+C; multiply by two and combine ln|x| to obtain the family above. Since v²+1>0, no constant branch is lost. Keep x=0 and the selected arctangent branch out of the interval; implicit differentiation recovers the original differential form.

## 5. Example 2.7 · Intersecting lines: shift the axes first

$$ \frac{dy}{dx}=\frac{2x-y+1}{x-2y+1}$$

The lines 2x−y+1=0 and x−2y+1=0 intersect at (−1/3,1/3). Shift the axes to this point to remove the constant terms:

$$x=X-\frac13,\qquad y=Y+\frac13$$

The new equation is dY/dX=(2X−Y)/(X−2Y), which is homogeneous. With v=Y/X, Xv′=2(v²−v+1)/(1−2v). Integrating (1−2v)/(v²−v+1)dv=2dX/X gives −ln(v²−v+1)=2ln|X|+C, hence X²(v²−v+1)=A. Back-substitution gives:

$$x^2-xy+y^2+x-y+\frac13=A$$

For A>0 this is an ellipse with a shifted centre. X=0, that is x=−1/3, makes the original denominator vanish and is excluded from the interval. The case A=0 collapses to a point.

## 6. Example 2.8 · Parallel lines: v=x−y

$$ \frac{dy}{dx}=\frac{x-y+5}{2x-2y-2}$$

Numerator and denominator repeat the term x−y; the lines are parallel and have no finite intersection. Put v=x−y, so v′=1−y′; the equation reduces to dv/dx=(v−7)/(2(v−1)). On v≠7, 2(v−1)/(v−7)dv=dx; using (v−1)/(v−7)=1+6/(v−7), the integral is 2v+12ln|v−7|=x+C. Rearranging gives the general family together with the singular branch from v=7:

$$\frac{x}{2}-y+6\ln|x-y-7|=C,\qquad x-y=7$$

Although x−y=7 seems to make a denominator vanish, substituting it into the original equation makes both sides equal to 1; it is a genuine singular solution. The line x−y=1 does make the original denominator vanish and is outside the domain.

## 7. Example 2.9 · A special term: v=x+y

$$ \frac{dy}{dx}=(x+y)^2$$

The equation is neither separable nor a function of y/x alone. The repeated term is x+y; put v=x+y, so v′=1+y′=1+v². Since 1+v² never vanishes, division loses no constant branch. Then arctan v=x+C, that is:

$$y=\tan(x+C)-x$$

Verification: y′=sec²(x+C)−1=tan²(x+C)=(x+y)². The solution lives on a connected interval where cosine does not vanish; the poles are x+C=π/2+kπ and the interval is written open.

## 8. Example 2.10 · A special term: v=y³/x

$$ \frac{dy}{dx}=\frac{y^6-2x^2}{2xy^5+x^2y^2}$$

On x>0, y≠0, and 2y³+x≠0, divide numerator and denominator by x²; the special term y³/x appears. Put v=y³/x, that is y³=vx; then 3y²y′=v+xv′. The reduced equation is (1/3)(v+xv′)=(v²−2)/(2v+1), hence xv′=(v²−v−6)/(2v+1). The roots of v²−v−6=(v−3)(v+2) are v=3 and v=−2, giving the branches y³=3x and y³=−2x. On v≠3,−2, integrate (2v+1)/(v²−v−6)dv=dx/x; partial fractions give:

$$(y^3-3x)^7(y^3+2x)^3=Cx^{15}$$

The partial-fraction decomposition is (2v+1)/[(v−3)(v+2)]=7/[5(v−3)]+3/[5(v+2)]. Exponentiation gives (v−3)⁷(v+2)³=Cx⁵; putting back v=y³/x yields the family above. The branches v=3 and v=−2 are the C=0 members of the general family, so they need not be repeated. The denominator 2y³+x=0 restricts the solution interval.

## 9. Example 2.11 · A special term: v=xy

$$ \frac{x}{y}\frac{dy}{dx}=f(xy),\qquad y\neq0$$

Put v=xy; then dv/dx=y+xy′=y[1+f(v)]. Since y=v/x, x dv/dx=v(1+f(v)). Any roots of f(v)+1=0 give line solutions xy=v₀. Otherwise the variables separate:

$$\frac{dv}{v(1+f(v))}=\frac{dx}{x}$$

In the book’s particular example f(v)=(2+v²)/(2−v²), so x dv/dx=4v/(2−v²) and (1/(2v)−v/4)dv=dx/x. The integral is (1/2)ln|v|−v²/8=ln|x|+C; multiplying by two gives:

$$\ln\left|\frac{y}{x}\right|-\frac{x^2y^2}{4}=C$$

Here f(v)+1=4/(2−v²) never vanishes, so no constant branch is lost. The value v=0, that is y=0, is excluded; v=±√2 are poles of the original equation, not solutions. On the selected branch x>0, the logarithm and the interval are preserved.

## 10. Example 2.12 · A radical expression: v²=x²−y²

$$ \frac{dy}{dx}=\frac{\sqrt{x+y}-\sqrt{x-y}}{\sqrt{x+y}+\sqrt{x-y}},\qquad x>0,\ |y|<x$$

Multiplying numerator and denominator by the conjugate makes the numerator x²−y² and the denominator y; the equation becomes y′=(x−√(x²−y²))/y. To remove the radical, put v²=x²−y². Differentiation gives 2x−2yy′=2vv′, that is y′=(x−vv′)/y. Substituting this into the reduced equation gives vv′=v. On v≠0, v′=1, so v=x+C. Back-substitution gives:

$$y^2=-2Cx-C^2$$

This is the parabolic family x²−y²=(x+C)². On the branch v>0, x>−C and |y|<x are preserved. The lines y=±x on the boundary v=0 are singular solutions; y=0 is the C=0 member. Differentiation returns v′=1; at x=−C, v=0, so the interval is open.

## 11. Summary of transformation choices

For a homogeneous equation the only decision is v=y/x:

$$\frac{dy}{dx}=f\left(\frac{y}{x}\right)\quad\Longrightarrow\quad v=\frac{y}{x}$$

When numerator and denominator are linear, first check whether the lines intersect:

$$\frac{dy}{dx}=\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}$$

If they intersect, shift the axes to the intersection and then use v=Y/X. If they are parallel, use v=a₁x+b₁y (or a₂x+b₂y). If a special term appears, represent it by a single v: x+y, x−y, y³/x, xy, or v²=x²−y². The general result of the xy transformation is:

$$x\frac{dv}{dx}=v(1+f(v))$$

In every case, test the roots of every divided factor in the original equation and state singular branches separately from the general family. With initial data, identify the connected branch first, then write the interval open up to the poles.

## 12. Experiment: compare four families

In the workshop x₀=1 is fixed; the A and B sliders change the initial value y(1). Predict first: as the initial value grows, in which family does the interval expand at both ends, and in which does only one end move? Then open each family in turn and record what you observe.

The circle family is x²+y²=Ax; the initial datum fixes A=(x₀²+y₀²)/x₀. Its centre is (A/2,0), its radius is A/2, and the connected interval is (0,A). The choice y(1)=0 is invalid; x=0 and y=0 are undefined in the original equation.

$$x^2+y^2=Ax,\qquad A=\frac{x_0^2+y_0^2}{x_0}$$

The ellipse family is x²−xy+y²=A; as A grows the ellipse grows. The connected interval lies between two poles, and 2y(1)=1 is invalid because the initial point hits the denominator.

$$x^2-xy+y^2=A$$

The sum family is y+x=tan(x+C); C shifts the initial point. Each branch lives between two vertical poles at x+C=π/2+kπ, and the vertical boundaries in the plot are genuine poles.

$$y+x=\tan(x+C)$$

The radical family is x²−y²=(x+C)², that is y²=−2Cx−C². Here C is negative; the connected interval is (−C,∞), approaching v=0 at x=−C. The datum must satisfy |y(1)|<1; y(1)=0 is invalid because the transformation degenerates.

$$x^2-y^2=(x+C)^2$$

Questions for observation: as A grows, why is the circle interval (0,A)? Why do both ends of the ellipse move together? Why is the sum interval bounded by poles? Why does only the left end move in the radical family? Record your answers in the lesson notebook, then compare the same initial value across all four families.

## Midterm practice

Suggested time: 18 minutes. Total: 20 points. Try each problem before opening its worked solution. Credit is awarded for choosing the transformation, checking lost branches, verifying, and stating the interval—not only for the final expression.

### Problem 1 · Homogeneous IVP (5 points, 4 minutes)

Solve y′+x/y+2=0 with y(0)=1. Determine C, verify by differentiation, and state the maximal solution interval. Explain why the branch v=−1 does not satisfy this initial datum.

### Problem 2 · Homogeneous general solution (5 points, 4 minutes)

Find the general solution of (y+x)dy+(x−y)dx=0. Split (v+1)/(v²+1) into two parts and verify by implicit differentiation.

### Problem 3 · Intersecting lines (5 points, 5 minutes)

Find the general solution of y′=(2x−y+1)/(x−2y+1). Compute the intersection, shift the axes, apply the homogeneous transformation, and return to x,y.

### Problem 4 · Radical transformation (5 points, 5 minutes)

Solve y′=(√(x+y)−√(x−y))/(√(x+y)+√(x−y)) on x>0, |y|<x. Rationalize, set v²=x²−y², identify the singular branches, and state the interval.

**Marking:** Each problem is worth 5 points: transformation/classification 1, intermediate equation 1, integration 1, back-substitution/initial data 1, verification and interval 1. Open the worked solutions on the Midterm preparation screen.

## Checklist

- Is the right side a function of y/x alone, or is there a special term?
- Did I build the derivative chain correctly after the transformation?
- Where can the factor I divided by vanish, and does its root solve the original equation?
- Did I apply the back-substitution and the initial datum correctly?
- Did I verify by implicit differentiation and state the interval with poles excluded?

Completing this step completes §2.2 only. The next topic follows after review.


---

Study support: open the lesson workshop for guided reasoning and the practice screen for worked problems. Keep your own explanation in the per-lesson notebook.
