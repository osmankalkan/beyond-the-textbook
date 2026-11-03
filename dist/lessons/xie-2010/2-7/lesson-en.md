# §2.7 · Summary: the art of choosing a method

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §2.7, printed p.74 / PDF pp.92–96. This is an original English study adaptation.

## What you will learn

- To identify the type, order and missing variable before solving.
- To choose the **first move** among separable, homogeneous, linear, Bernoulli, exact and higher-order reductions.
- To see why every method works and which form it produces, all in one decision chain.
- To verify a solution, count its constants and catch lost branches.
- To replace memorized recipes with a sequence of questions that transfers to a new equation.

## 1. The one idea of the chapter

Every method in this chapter does the same job: **it turns an equation you cannot solve into a form you can solve.** A separable equation integrates directly; a homogeneous equation becomes separable with \(v=y/x\); a Bernoulli equation becomes linear with \(u=y^{1-n}\); a non-exact equation becomes exact with a factor; a Clairaut equation becomes separable in \(p\); and a higher-order equation with a missing variable drops to a lower order.

$$ F\left(x,y,y',\dots,y^{(n)}\right)=0 $$

> **One shared aim.** Every row asks the same question: “Which transformation reduces this equation to a form I already know?” The methods are not separate recipes; they are different doors into the same reduction.

## 2. The decision map

| Form of the equation | First move | Why it works | Final check |
| --- | --- | --- | --- |
| \(y'=f(x)g(y)\) | separate the variables | each side depends only on its own variable | branches \(g(y)=0\) |
| \(y'=f(y/x)\) | \(v=y/x\) | homogeneity collects \(x\) into one variable | \(x=0\), range of \(v\) |
| \(y'+P(x)y=Q(x)\) | \(\mu=e^{\int P\,dx}\) | the left side becomes \((\mu y)'\) | \(\mu>0\), domain |
| \(y'+P(x)y=Q(x)y^n\) | \(u=y^{1-n}\) | Bernoulli becomes linear | \(y=0\), \(n=0,1\) |
| \(M\,dx+N\,dy=0\), \(M_y=N_x\) | build a potential | \(du=M\,dx+N\,dy\) | exactness, domain |
| \(M\,dx+N\,dy=0\), not exact | find \(\mu\) | \(\mu M\,dx+\mu N\,dy\) becomes exact | \(\mu=0\), domain of the factor |
| \(F(x,y,p)=0\) | \(p=y'\); solve for \(x\) or \(y\) | a separable equation in \(p\) | elimination of \(p\), parametric form |
| \(y=xp+f(p)\) | differentiate with respect to \(x\) | \((x+f'(p))p'=0\) | line family + envelope |
| \(y^{(n)}=f(x)\) | integrate \(n\) times | every integration adds one constant | number of constants |
| \(y\) absent | \(u=y^{(k)}\) | the order drops to \(n-k\) | the branch \(u=0\) |
| \(x\) absent | \(u=y'\), \(y''=u\,du/dy\) | the order drops by one | \(dy/dx=u(y)\) |

> **How to use the table.** Do not memorize it; use it as a two-question scan: (1) Is the equation first-order or higher-order? (2) Which variable is missing, or which term collapses to a single letter under a transformation? The answer selects the row, and the row gives the first move.

## 3. The four-question scan

Approach every equation in the same order. This scan turns method choice from intuition into a checkable decision.

1. **What is the order?** Is the highest derivative \(y''\), or is \((y')^2\) a power? A power does not raise the order; it only destroys linearity.
2. **Is it linear?** Do \(y\) and its derivatives appear only to the first power, with coefficients depending only on \(x\)? If so, put it in the \(P(x)\), \(Q(x)\) form.
3. **Which special structure is present at first order?** Is it separable, homogeneous, exact, or does it need a factor?
4. **Which variable is missing at higher order?** Is \(y\) absent, is \(x\) absent, or is only \(y^{(n)}\) present?

| Question | If yes | If no |
| --- | --- | --- |
| Does the highest derivative depend only on \(x\)? | integrate \(n\) times | go to the next question |
| Are \(y\) and its lower derivatives absent? | \(u=y^{(k)}\) | go to the next question |
| Is \(x\) explicitly absent? | \(y\) independent, \(u=y'\) | try the exact and linear routes |
| Is the equation of the form \(y'=f(y/x)\)? | \(v=y/x\) | test separability and exactness |
| Is \(M_y=N_x\)? | build a potential | look for a factor |

> **A small but expensive distinction.** \((y')^2\) is the square of the first derivative; the order is still 1. \(y''\) is the second derivative; the order is 2. The most common lost point on an exam is confusing these two notations.

## 4. The reduction chain

The methods of the chapter are linked by this chain. Every arrow points in the same direction: from a harder equation to an easier one.

| Starting point | Transformation | Reduced form |
| --- | --- | --- |
| Homogeneous | \(v=y/x\) | separable |
| Bernoulli | \(u=y^{1-n}\) | linear |
| Non-exact | \(\mu(x)\) or \(\mu(y)\) | exact |
| Clairaut | \(p=y'\) | separable in \(p\) |
| \(y\) absent | \(u=y^{(k)}\) | lower order |
| \(x\) absent | \(u=y'\) | first order |

Do not try to run the chain backwards: turning a separable equation into a Bernoulli equation on purpose only makes the work longer. **Choose the shortest reduction.**

## 5. The shared skeleton: five steps

Whatever the method, the skeleton of a solution is the same.

1. **Standard form and interval.** Put the equation into the form \(y'=\cdots\), \(M\,dx+N\,dy=0\) or \(y^{(n)}=\cdots\); state the interval where divisions are safe.
2. **Classify and choose.** Apply the four-question scan and decide the first move.
3. **Apply the transformation or integral.** Transform the differentials too; add one constant at every integration.
4. **Solve and state the branches.** Solve for \(y\) explicitly or implicitly; write the special branches \(u=0\), \(y=0\), \(C=0\) separately.
5. **Verify.** Substitute back into the original equation; check the initial condition and the domain.

> **Why five steps?** Because most errors happen at the beginning and at the end, not in the middle: the wrong method and the unverified answer. The skeleton keeps both ends visible.

## 6. Six traps

| Trap | Where it appears | How to prevent it |
| --- | --- | --- |
| Division by zero | \(y=0\), \(u=0\), \(x=0\), \(\cos x=0\) | test the special value before dividing |
| Lost branch | \(p=0\), \(u=0\), \(C=0\) | write every factor that can vanish |
| Order confusion | \((y')^2\) versus \(y''\) | separate the highest derivative from its power |
| Wrong constant count | too few constants at order \(n\) | add one constant per integration |
| Wrong condition | \(y(0)\) versus \(y'(0)\) | apply the condition to the correct derivative |
| Missing singular solution | a Clairaut envelope | separate \(dp/dx=0\) from \(x=-f'(p)\) |

> **The most common mistake is not algebra; it is judgement.** Choosing the right method and then writing the wrong branch is more common than choosing the wrong method. At the end of every solution ask: “Which values did I exclude?”

## 7. Quick reference

Frequently used integrals and transformations:

$$ \int\frac{dx}{x}=\ln|x|,\qquad \int\sec x\,dx=\ln|\sec x+\tan x| $$

$$ \int\ln x\,dx=x\ln x-x $$

The integrating factor of a linear equation and the Bernoulli substitution:

$$ \mu(x)=e^{\int P(x)\,dx} $$

$$ u=y^{1-n}\quad\Longrightarrow\quad u'+(1-n)P(x)u=(1-n)Q(x) $$

The potential of an exact equation:

$$ \frac{\partial u}{\partial x}=M,\qquad \frac{\partial u}{\partial y}=N,\qquad u(x,y)=C $$

The two branches of a Clairaut equation:

$$ y=Cx+f(C),\qquad x=-f'(p),\qquad y=f(p)-pf'(p) $$

The derivative chain when the independent variable is absent:

$$ u=y',\qquad y''=u\frac{du}{dy} $$

## 8. Experiment: choosing a method

The ten cards in the workshop represent ten separate decisions of the chapter. On each card, choose the family first and then the first move; the feedback explains why your move works or why it is wrong.

| Equation | Family | First move |
| --- | --- | --- |
| \(y'=x^2(1+y^2)\) | separable | separate the variables |
| \(y'=(x+y)/(x-y)\) | homogeneous | \(v=y/x\) |
| \(y'+2y/x=x^3\) | linear | \(\mu=x^2\) |
| \(y'+y/x=y^3\) | Bernoulli | \(u=y^{-2}\) |
| \((2x+y)\,dx+(x+2y)\,dy=0\) | exact | build a potential |
| \(y\,dx-x\,dy=0\) | not exact | \(\mu=1/y^2\) or \(1/x^2\) |
| \(x=p+p^4\) | solvable for \(x\) | differentiate with respect to \(y\) |
| \(y=xp+p^2\) | Clairaut | differentiate with respect to \(x\) |
| \(y'''=e^x\) | immediately integrable | integrate three times |
| \(yy''=(y')^2\) | \(x\) absent | \(u=y'\), \(y''=u\,du/dy\) |

You do not have to work through the cards in order; pick them at random. The aim is not to finish the calculation but to choose the **first move quickly and with a reason**. After each card ask the same question: “If I had not chosen this move, which route would be longer?”

## 9. The sixty-second exam scan

When you meet an equation, run this sequence before you start writing:

- What is the order; which is the highest derivative?
- Is it linear; can \(P(x)\) and \(Q(x)\) be written immediately?
- Is it separable; does it split as \(f(x)g(y)\)?
- Is it homogeneous; does \(y/x\) collect into one variable?
- Is it exact; does \(M_y=N_x\) hold?
- Does a transformation collapse a term to a single letter?
- At higher order, which variable is missing?
- How many constants do I expect; which values do I exclude?
- How will I verify the answer?

> **The sixty-second rule.** If this scan takes longer than a minute, you are probably asking the wrong question. Most equations need only two or three questions; the rest is detail.

## 10. Closing: not a method, a decision

The real output of this chapter is not a list of formulas but a **habit of decision**. When you meet a new equation, ask for its type, choose the first move, then verify the result. You may forget a formula; do not forget the order.

| Stage | Question | Output |
| --- | --- | --- |
| Recognise | Which family is this equation in? | method |
| Move | What is the first transformation? | reduced equation |
| Solve | Constants and branches? | general solution |
| Verify | Does it satisfy the equation? | a trustworthy answer |

> **Transfer.** The same habit works in the later chapters of this book: when you meet a new type of equation, first ask “which form I already know does this reduce to?” The method changes; the idea of reduction does not.

## Checklist

- Did I write the order and the linearity of the equation?
- Did I test separability, homogeneity and exactness before choosing the first move?
- If I chose a transformation, did I transform the differentials too?
- Did every integration add one constant, and does the total match the order?
- Did I write the special branches \(y=0\), \(u=0\), \(C=0\), \(\cos x=0\) separately?
- In a Clairaut equation, did I separate the line family from the envelope?
- Did I apply each initial condition to the correct derivative?
- Did I verify the answer in the original equation and on its domain?
