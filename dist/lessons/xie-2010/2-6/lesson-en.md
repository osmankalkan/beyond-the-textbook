# §2.6 · Simple higher-order differential equations

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.6, printed pp.68–73 / PDF pp.86–91. Examples 2.40–2.45. This is an original English study adaptation.

## What you will learn

- To solve \(y^{(n)}=f(x)\) by integrating \(n\) times, with one constant added at every integration.
- To recognize that the dependent variable is absent and to reduce the order to \(n-k\) with \(u=y^{(k)}\).
- To make \(y\) the new independent variable when \(x\) is absent, and to build the chain \(y''=u\,du/dy\) correctly.
- To tell which absence leads to which substitution: is \(y\) missing, or is \(x\) missing?
- To apply initial conditions at the right moment and to state the branch and the domain.
- To verify the solution by substituting it back into the original equation.

## Decision map

The whole section begins with one question: **which variable is not explicitly present?** The answer fixes the substitution.

| Form you see | What is absent | Substitution | New equation |
| --- | --- | --- | --- |
| \(y^{(n)}=f(x)\) | only the highest derivative is present | integrate \(n\) times | \(y^{(n-1)}=\int f\,dx+C_1\) |
| \(f(x;y^{(k)},\dots,y^{(n)})=0\) | \(y,y',\dots,y^{(k-1)}\) | \(u=y^{(k)}\) | \(f(x;u,u',\dots,u^{(n-k)})=0\) |
| \(f(y,y',\dots,y^{(n)})=0\) | \(x\) | \(y\) independent, \(u=y'\) | \(g(y;u,du/dy,\dots)=0\) |

> **One shared idea.** Both absences lead to the same move: choose a new variable that removes the missing one and lower the order. If \(x\) is absent, \(y\) becomes the independent variable; if \(y\) is absent, \(x\) stays independent and \(u=y^{(k)}\) is enough.

## 1. Equations immediately integrable

If the highest derivative depends only on \(x\), the equation can be integrated directly:

$$ \frac{d^n y}{dx^n}=f(x) $$

Every integration adds one constant; after \(n\) integrations there are \(n\) independent constants. That is exactly the number expected in the general solution of an \(n\)-th order equation:

$$ y=\int\cdots\int f(x)\,dx\cdots dx+C_1\frac{x^{n-1}}{(n-1)!}+\cdots+C_n $$

> **Why so many constants?** Differentiation destroys information. Reconstructing a function after \(n\) derivatives requires \(n\) pieces of information, and the constants carry exactly that information. Differentiating the answer \(n\) times removes every constant and returns \(f(x)\).

## 2. Example 2.40 · Three integrations

$$ x^2y'''=120x^3+8x^2e^{2x}+1,\qquad x\neq0 $$

The right side depends only on \(x\), so isolate \(y'''\). The point \(x=0\) is excluded; the solution is written on one interval, \(x>0\) or \(x<0\).

$$ y'''=120x+8e^{2x}+\frac{1}{x^2} $$

First integration:

$$ y''=60x^2+4e^{2x}-\frac1x+C_1 $$

Second integration:

$$ y'=20x^3+2e^{2x}-\ln|x|+C_1x+C_2 $$

The third integration uses \(\int\ln x\,dx=x\ln x-x\):

$$ y=5x^4+e^{2x}-x\ln x+x+\frac{C_1}{2}x^2+C_2x+C_3 $$

On the last line the \(x\) term is absorbed into \(C_1x\), and \(C_1x^2/2\) is absorbed into a new \(C_2x^2\); the constants are renamed. This gives the compact form used in the book:

$$ y=C_0+C_1x+C_2x^2+5x^4+e^{2x}-x\ln x $$

> **Counting constants.** A third-order equation must carry three independent constants. The last line shows \(C_0,C_1,C_2\), and each is a combination of the earlier constants; independence is not lost, only the names change.

## 3. Example 2.41 · Two integrations with initial data

$$ e^{-x}y''-\sin x=2,\qquad y(0)=y'(0)=1 $$

Since \(e^{-x}\neq0\), division is safe:

$$ y''=e^x\sin x+2e^x $$

Two standard integrals are needed. Integration by parts twice returns the original integral:

$$ \int e^x\sin x\,dx=\frac{1}{2}e^x(\sin x-\cos x),\qquad \int e^x\cos x\,dx=\frac{1}{2}e^x(\sin x+\cos x) $$

First integration and the condition \(y'(0)=1\):

$$ y'=\frac{1}{2}e^x(\sin x-\cos x)+2e^x+C_1 $$

$$ 1=\frac{1}{2}(0-1)+2+C_1\quad\Longrightarrow\quad C_1=-\frac{1}{2} $$

In the second integration the \(e^x\sin x\) and \(e^x\cos x\) integrals combine:

$$ y=-\frac{1}{2}e^x\cos x+2e^x-\frac x2-\frac{1}{2} $$

Final check: \(y(0)=-\frac{1}{2}+2-\frac{1}{2}=1\) and \(y'(0)=-\frac{1}{2}+2-\frac{1}{2}=1\). Both conditions hold, and the solution is valid for every real \(x\).

> **Use the condition early.** Applying the initial condition right after the first integration avoids carrying an unnecessary constant through the second one. Either order is correct; the important point is not to confuse which derivative the condition belongs to.

## 4. The dependent variable absent

If \(y\) and its lower derivatives do not appear, let \(y^{(k)}\) be the lowest derivative that does appear:

$$ f\left(x;y^{(k)},y^{(k+1)},\dots,y^{(n)}\right)=0 $$

Choose \(u=y^{(k)}\). The chain rule gives \(u^{(j)}=y^{(k+j)}\), and the equation drops to order \(n-k\):

$$ u=y^{(k)},\qquad f\left(x;u,u',\dots,u^{(n-k)}\right)=0 $$

> **What does “absent” mean?** It is not enough for \(y\) alone to be missing: every derivative below \(y^{(k)}\) must also be missing. In \(y''''+y'=g(x)\), \(y\) is absent, so \(u=y'\) and the order falls from 4 to 3. In \(y''''+y''=g(x)\), both \(y\) and \(y'\) are absent, so \(u=y''\) and the order falls from 4 to 2.

## 5. Example 2.42 · y absent: initial data and branch choice

$$ 2y''=(y')^3\sin 2x,\qquad y(0)=y'(0)=1 $$

Here \(y\) is absent; \(u=y'\), \(u'=y''\):

$$ 2u'=u^3\sin 2x\quad\Longrightarrow\quad \frac{du}{u^3}=\frac{1}{2}\sin 2x\,dx $$

Because \(u(0)=1\neq0\), the branch \(u=0\) is incompatible with this initial datum. Integrate:

$$ -\frac{1}{2u^2}=-\frac{1}{4}\cos 2x+C_1 $$

The condition \(u(0)=1\) gives:

$$ -\frac{1}{2}=-\frac{1}{4}+C_1\quad\Longrightarrow\quad C_1=-\frac{1}{4} $$

The right side simplifies with \(\cos 2x+1=2\cos^2x\):

$$ -\frac{1}{2u^2}=-\frac{1}{2}\cos^2x\quad\Longrightarrow\quad u^2=\sec^2x $$

At the initial point \(u(0)=1>0\), so take the positive branch, not the negative one:

$$ u=\sec x $$

The equation is now “immediately integrable” again:

$$ y=\ln|\sec x+\tan x|+C_2 $$

Use \(y(0)=1\):

$$ 1=\ln 1+C_2\quad\Longrightarrow\quad C_2=1 $$

$$ y=\ln|\sec x+\tan x|+1 $$

> **Branch and interval.** \(\sec x\) and \(\tan x\) are undefined where \(\cos x=0\). Since the initial point is \(x=0\), the solution lives on \((-\pi/2,\pi/2)\). On that interval \(\sec x+\tan x>0\), so the absolute value can be dropped. On any other interval the sign and the absolute value must be checked again.

## 6. Example 2.43 · y absent: Bernoulli and a circle family

$$ xy''-y'-(y')^3=0 $$

Here \(y\) is absent; \(u=y'\), \(u'=y''\):

$$ xu'-u-u^3=0 $$

**Case 1.** \(u=0\):

$$ u=0\quad\Longrightarrow\quad y=C_3 $$

**Case 2.** \(u\neq0\). Divide every term by \(u^3\) and set \(v=1/u^2\):

$$ \frac{u'}{u^3}-\frac{1}{xu^2}=\frac1x $$

$$ v=\frac{1}{u^2},\qquad v'+\frac2x v=-\frac2x $$

This is first-order linear with integrating factor \(x^2\):

$$ \left(x^2v\right)'=-2x\quad\Longrightarrow\quad x^2v=-x^2+C_1 $$

$$ u^2=\frac{x^2}{C_1-x^2} $$

This requires \(C_1>0\) and \(|x|<\sqrt{C_1}\). Since \(u=y'\):

$$ y=\pm\int\frac{x}{\sqrt{C_1-x^2}}\,dx+C_2=\mp\sqrt{C_1-x^2}+C_2 $$

Squaring gives a closed family of curves:

$$ x^2+(y-C_2)^2=C_1 $$

> **Two kinds of solution.** The lines \(y=C_3\) and the circles \(x^2+(y-C_2)^2=C_1\) are separate solutions. The circle family needs \(C_1>0\); \(C_1=0\) collapses to a single point and gives no curve. The branch \(u=0\) is not obtained by shrinking the circle radius to zero, so it must be written separately.

## 7. The independent variable absent

If \(x\) does not appear explicitly, make \(y\) the new independent variable and \(u=y'\) the new dependent variable:

$$ f\left(y,y',\dots,y^{(n)}\right)=0 $$

The chain rule turns the derivatives into derivatives with respect to \(y\):

$$ y'=u,\qquad y''=u\frac{du}{dy},\qquad y'''=u\left(\frac{du}{dy}\right)^2+u^2\frac{d^2u}{dy^2} $$

In general the order drops by one:

$$ g\left(y;u,\frac{du}{dy},\dots,\frac{d^{n-1}u}{dy^{n-1}}\right)=0 $$

Once \(u(y)\) is found, \(dy/dx=u(y)\) is a separable equation; the answer often stays implicit.

> **Why make \(y\) independent?** If \(x\) is missing, the equation says nothing directly about how \(x\) changes, but it does relate \(y\) to its derivatives. Making \(y\) the independent variable puts that relation to work. Then \(dy/dx=u(y)\) brings \(x\) back.

## 8. Example 2.44 · x absent: an implicit solution and two cases

$$ 3yy'y''-(y')^3+1=0 $$

Here \(x\) is absent; \(u=y'\), \(y''=u\,du/dy\):

$$ 3yu^2\frac{du}{dy}-u^3+1=0 $$

**Case 1.** \(u^3=1\), that is \(u=1\):

$$ u^3=1\quad\Longrightarrow\quad u=1\quad\Longrightarrow\quad y=x+C $$

This line family satisfies the equation; substituting \(y'=1\), \(y''=0\) gives \(0-1+1=0\).

**Case 2.** \(u^3\neq1\). The variables separate:

$$ \frac{3u^2}{u^3-1}\,du=\frac{dy}{y} $$

Integrate:

$$ \ln|u^3-1|=\ln|y|+\ln|C_1|\quad\Longrightarrow\quad u^3-1=C_1y $$

$$ u=\left(1+C_1y\right)^{1/3},\qquad u\neq0 $$

Write \(dx=dy/u\):

$$ \frac{dx}{dy}=\frac{1}{\left(1+C_1y\right)^{1/3}} $$

Since the derivative of \(1+C_1y\) is \(C_1\), the integral is direct:

$$ x+C_2=\frac{3}{2C_1}\left(1+C_1y\right)^{2/3} $$

$$ 3\left(1+C_1y\right)^{2/3}=2C_1x+C_2 $$

> **Why the two branches stay separate.** If \(C_1=0\), the second formula collapses to a relation such as \(3=C_2\) that does not contain \(x\); it does not recover the line \(u=1\). That is why the line branch is written separately. In the second formula \(x\) is an explicit function of \(y\), but \(y\) need not be a single-valued function of \(x\).

## 9. Example 2.45 · x absent: Bernoulli and a logarithmic family

$$ yy''=(y')^2\left(1-y'\sin y-yy'\cos y\right) $$

Here \(x\) is absent; \(u=y'\), \(y''=u\,du/dy\):

$$ yu\frac{du}{dy}=u^2\left(1-u\sin y-yu\cos y\right) $$

**Case 1.** \(u=0\):

$$ u=0\quad\Longrightarrow\quad y=C $$

**Case 2.** \(u\neq0\). Divide by \(yu\) and rearrange:

$$ \frac{du}{dy}-\frac1y u=-\frac{\sin y+y\cos y}{y}u^2 $$

This is a Bernoulli equation with \(n=2\). The substitution \(v=1/u\) makes it linear:

$$ v=\frac1u,\qquad \frac{dv}{dy}+\frac1y v=\frac{\sin y+y\cos y}{y} $$

The integrating factor is \(y\):

$$ \frac{d}{dy}\left(yv\right)=\sin y+y\cos y\quad\Longrightarrow\quad yv=y\sin y+C_1 $$

$$ v=\sin y+\frac{C_1}{y} $$

Since \(v=1/u=dx/dy\):

$$ \frac{dx}{dy}=\sin y+\frac{C_1}{y} $$

$$ x=-\cos y+C_1\ln|y|+C_2 $$

> **Domain.** The logarithm requires \(y\neq0\) in the second family. The value \(y=0\) belongs to the \(u=0\) branch and is written as a separate solution. Together the two solutions are:

$$ y=C,\qquad x=-\cos y+C_1\ln|y|+C_2 $$

## 10. Decision summary

| What is absent | New variable | Substitution | Order | Final step |
| --- | --- | --- | --- | --- |
| only \(y^{(n)}\) is present | — | direct integration | \(n\to0\) | integrate \(n\) times |
| \(y,y',\dots,y^{(k-1)}\) | \(u=y^{(k)}\) | \(u^{(j)}=y^{(k+j)}\) | \(n\to n-k\) | integrate \(u\) \(k\) times |
| \(x\) | \(y\) independent, \(u=y'\) | \(y''=u\,du/dy\) | \(n\to n-1\) | separate \(dy/dx=u(y)\) |

In every case the last step is the same: substitute the answer into the original equation, check that the derivatives agree, and apply any initial condition.

$$ F\left(x,y,y',\dots,y^{(n)}\right)=0 $$

> **The most expensive mistake.** Confusing the absence of \(x\) with the absence of \(y\). If \(x\) is absent, \(y\) becomes independent and \(u=y'\) is used; if \(y\) is absent, \(x\) stays independent and \(u=y^{(k)}\) is used. Choose the substitution from **which symbol is actually missing**, not from the way the equation looks.

## 11. Experiment: compare three families

The three families in the workshop represent the three decisions of this section.

| Family | Equation | Substitution | General solution | Note |
| --- | --- | --- | --- | --- |
| Immediately integrable | \(y''=6x\) | integrate twice | \(y=x^3+Cx+1\) | \(C=y'(0)\), \(y(0)=1\) |
| Dependent variable absent | \(2y''=(y')^3\sin 2x\) | \(u=y'\) | \(y=\ln|\sec x+\tan x|+C\) | \((-\pi/2,\pi/2)\), \(C=y(0)\) |
| Independent variable absent | \(y''+(y')^2=0\) | \(u=y'\), \(y''=u\,du/dy\) | \(y=\ln(Cx+1)\) | \(Cx+1>0\), \(C=y'(0)\) |

A and B are two values of the parameter \(C\) in the same family. At the chosen inspection point you read \(y\), \(y'\), \(y''\) and the residual of the equation together. If the residual is not zero, either the branch or the domain is wrong. Do not conclude that a solution ends when the curve leaves the plot window; the real boundary is the domain of the family.

## Midterm preparation

The four worked cases cover, in order, an immediately integrable equation, the absence of the dependent variable, a reduction that becomes Bernoulli, and the absence of the independent variable. Keep the same order in each case: identify the missing variable, build the substitution, lower the order, solve, apply the initial condition, state the branch and interval, and verify by differentiation. Then test yourself with the twelve questions in the practice section.

## Checklist

- Is \(x\) missing, is \(y\) missing, or is only \(y^{(n)}\) present?
- When you say “absent”, are all lower derivatives really absent too?
- If you chose \(u=y^{(k)}\), what is \(k\), and by how much should the order fall?
- If \(x\) is absent, did you build \(y''=u\,du/dy\) correctly?
- Did every integration add one constant, and does the total match the order?
- Did you apply each initial condition to the correct derivative, and check the sign of the branch?
- Could a divisor vanish; did you write the special branches \(u=0\) and \(C_1=0\) separately?
- Did you state the domain (logarithm, square root, pole) and verify the solution in the original equation?
