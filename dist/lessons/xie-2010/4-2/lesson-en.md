# §4.2 · Complementary solutions and characteristic equation

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §4.2, printed pp.143–152 / PDF pp.161–170. Examples 4.2–4.11. This is an original English study adaptation.

## What you will learn

- To reduce a constant-coefficient homogeneous linear differential equation to the algebraic characteristic equation \(\phi(\lambda)=0\) via the exponential trial \(y=e^{\lambda x}\).
- To construct exponential solutions from distinct real roots and to express symmetric real pairs \(\lambda=\pm\beta\) in terms of hyperbolic functions (\(\cosh\beta x,\sinh\beta x\)).
- To convert complex conjugate roots \(\lambda=\alpha\pm i\beta\) into purely real solutions \(e^{\alpha x}(A\cos\beta x+B\sin\beta x)\) via Euler's formula.
- To extract \(n\)-th roots of complex numbers using polar form, De Moivre's theorem, and half-angle identities.
- To prove via the reduction-of-order substitution \(y=v(x)e^{ax}\) why a \(p\)-fold repeated root reduces to \(D^p v=0\) and generates the polynomial factors \(x,x^2,\dots,x^{p-1}\).

## Decision map

When solving a constant-coefficient homogeneous equation \(\phi(D)y=0\), the first step is to replace \(D\) by \(\lambda\) and find all \(n\) roots of the characteristic polynomial \(\phi(\lambda)=0\). Each root family contributes its own linearly independent terms to the general solution:

| Characteristic root family | Form of the roots | Contribution to the general solution | Constant count |
| --- | --- | --- | --- |
| Distinct real roots | \(\lambda_1,\lambda_2,\dots,\lambda_k\) (all distinct) | \(C_1e^{\lambda_1 x}+C_2e^{\lambda_2 x}+\cdots+C_ke^{\lambda_k x}\) | \(k\) |
| Symmetric real pair | \(\lambda=\pm\beta\) (\(\beta>0\)) | \(C_1e^{\beta x}+C_2e^{-\beta x}\) or \(A\cosh\beta x+B\sinh\beta x\) | \(2\) |
| Simple complex conjugate pair | \(\lambda=\alpha\pm i\beta\) (\(\beta>0\)) | \(e^{\alpha x}\left(A\cos\beta x+B\sin\beta x\right)\) | \(2\) |
| \(p\)-fold repeated real root | \(\lambda=a,a,\dots,a\) (\(p\) times) | \(\left(C_0+C_1x+C_2x^2+\cdots+C_{p-1}x^{p-1}\right)e^{ax}\) | \(p\) |
| \(p\)-fold zero root | \(\lambda=0,0,\dots,0\) (\(p\) times) | \(C_0+C_1x+C_2x^2+\cdots+C_{p-1}x^{p-1}\) | \(p\) |
| \(p\)-fold complex conjugate pair | \(\lambda=\alpha\pm i\beta\) (\(p\) times) | \(e^{\alpha x}\left[\left(A_0+\cdots+A_{p-1}x^{p-1}\right)\cos\beta x+\left(B_0+\cdots+B_{p-1}x^{p-1}\right)\sin\beta x\right]\) | \(2p\) |

> **Fundamental audit.** By the fundamental theorem of algebra, the characteristic polynomial of an \(n\)-th order homogeneous equation has exactly \(n\) roots (counted with multiplicity), and the complementary solution \(y_C(x)\) must contain exactly \(n\) linearly independent functions and \(n\) arbitrary constants.

## 1. Deriving the characteristic equation and distinct real roots

Consider the \(n\)-th order constant-coefficient homogeneous linear differential equation:

$$ \phi(D)y=\left(a_nD^n+a_{n-1}D^{n-1}+\cdots+a_1D+a_0\right)y=0 $$

Here \(a_0,a_1,\dots,a_n\) are real constants with \(a_n\neq0\). Because the first-order equation \(y'-ay=0\) has the exponential solution \(y=Ce^{ax}\), at higher order we likewise try an exponential function whose derivatives are multiples of itself:

$$ y=e^{\lambda x},\qquad D^k\left(e^{\lambda x}\right)=\lambda^k e^{\lambda x} $$

Substituting these derivatives into the differential equation turns every operator power \(D^k\) into the algebraic power \(\lambda^k\):

$$ \phi(D)e^{\lambda x}=\left(a_n\lambda^n+a_{n-1}\lambda^{n-1}+\cdots+a_1\lambda+a_0\right)e^{\lambda x}=\phi(\lambda)e^{\lambda x}=0 $$

Because the exponential function \(e^{\lambda x}\) never vanishes for any real or complex \(x\) (\(e^{\lambda x}\neq0\)), the polynomial factor in parentheses must vanish:

$$ \phi(\lambda)=a_n\lambda^n+a_{n-1}\lambda^{n-1}+\cdots+a_1\lambda+a_0=0 $$

This algebraic equation is called the **characteristic equation**, and \(\phi(\lambda)\) is the **characteristic polynomial**. When all \(n\) roots \(\lambda_1,\lambda_2,\dots,\lambda_n\) are distinct, the functions \(e^{\lambda_1 x},e^{\lambda_2 x},\dots,e^{\lambda_n x}\) are linearly independent and superposition gives the general solution immediately:

$$ y(x)=C_1e^{\lambda_1 x}+C_2e^{\lambda_2 x}+\cdots+C_ne^{\lambda_n x} $$

## 2. Hyperbolic functions and Examples 4.2 – 4.3

In engineering problems, characteristic roots frequently appear in symmetric pairs \(\lambda=\pm\beta\). In that case it is often convenient to replace \(e^{\beta x}\) and \(e^{-\beta x}\) by their symmetric and antisymmetric combinations, the **hyperbolic functions**:

$$ \sinh x=\frac{e^x-e^{-x}}{2},\qquad \cosh x=\frac{e^x+e^{-x}}{2},\qquad \tanh x=\frac{\sinh x}{\cosh x}=\frac{e^x-e^{-x}}{e^x+e^{-x}} $$

Directly from these definitions, \(\cosh x\) is even, \(\sinh x\) is odd, and their values at \(x=0\) greatly simplify initial-value calculations:

$$ \cosh 0=1,\qquad \sinh 0=0,\qquad \cosh(-x)=\cosh x,\qquad \sinh(-x)=-\sinh x $$

Unlike trigonometric functions, the difference of hyperbolic squares equals \(1\) and differentiation introduces no minus sign:

$$ \cosh^2 x-\sinh^2 x=1,\qquad \frac{d}{dx}\sinh x=\cosh x,\qquad \frac{d}{dx}\cosh x=\sinh x $$

Hence for a symmetric real root pair \(\lambda=\pm\beta\), the exponential and hyperbolic forms are completely equivalent:

$$ C_1e^{\beta x}+C_2e^{-\beta x}=A\cosh\beta x+B\sinh\beta x,\qquad A=C_1+C_2,\quad B=C_1-C_2 $$

### Example 4.2 · Biquadratic characteristic equation and hyperbolic form

Let us find the general solution of \(\left(D^4-13D^2+36\right)y=0\). The characteristic equation factors as a quadratic in \(\lambda^2\):

$$ \lambda^4-13\lambda^2+36=\left(\lambda^2-4\right)\left(\lambda^2-9\right)=0\quad\Longrightarrow\quad \lambda=\pm 2,\ \pm 3 $$

With four distinct real roots \(\lambda_1=2,\lambda_2=-2,\lambda_3=3,\lambda_4=-3\), the exponential general solution is:

$$ y(x)=C_1e^{2x}+C_2e^{-2x}+C_3e^{3x}+C_4e^{-3x} $$

Grouping each symmetric \(\pm\beta\) pair in the hyperbolic basis gives the equivalent general solution:

$$ y(x)=A_1\cosh 2x+B_1\sinh 2x+A_2\cosh 3x+B_2\sinh 3x $$

### Example 4.3 · Factoring a cubic characteristic polynomial

Let us solve \(\left(D^3+4D^2+D-6\right)y=0\). The characteristic equation is:

$$ \lambda^3+4\lambda^2+\lambda-6=0 $$

Testing integer divisors \(\pm 1,\pm 2,\pm 3,\pm 6\) of the constant term \(-6\) shows that \(\lambda=1\) satisfies \(1+4+1-6=0\). Dividing the polynomial by \((\lambda-1)\) yields:

$$ \left(\lambda-1\right)\left(\lambda^2+5\lambda+6\right)=\left(\lambda-1\right)\left(\lambda+2\right)\left(\lambda+3\right)=0\quad\Longrightarrow\quad \lambda=1,-2,-3 $$

From the three distinct real roots we write the general solution:

$$ y(x)=C_1e^x+C_2e^{-2x}+C_3e^{-3x} $$

## 3. Complex conjugate roots and Examples 4.4 – 4.5

For a real-coefficient polynomial \(\phi(\lambda)=0\), complex roots always occur in conjugate pairs \(\lambda_1=\alpha+i\beta\) and \(\lambda_2=\alpha-i\beta\) (\(\beta>0\)). The corresponding solution part is:

$$ y(x)=C_1e^{(\alpha+i\beta)x}+C_2e^{(\alpha-i\beta)x}=e^{\alpha x}\left(C_1e^{i\beta x}+C_2e^{-i\beta x}\right) $$

Applying Euler's formula \(e^{\pm i\beta x}=\cos\beta x\pm i\sin\beta x\) and collecting terms in \(\cos\beta x\) and \(\sin\beta x\) gives:

$$ y(x)=e^{\alpha x}\left[\left(C_1+C_2\right)\cos\beta x+i\left(C_1-C_2\right)\sin\beta x\right]=e^{\alpha x}\left(A\cos\beta x+B\sin\beta x\right) $$

Here \(A=C_1+C_2\) and \(B=i(C_1-C_2)\) are the new arbitrary constants. For a real-valued physical solution \(y(x)\), we take \(C_2=C_1^*\); writing \(C_1=c_R+ic_I\) and \(C_2=c_R-ic_I\) makes \(A=2c_R\) and \(B=-2c_I\) purely real numbers. Equivalently, the two sinusoids can be combined into a single phase-shifted cosine wave:

$$ y(x)=Ce^{\alpha x}\cos\left(\beta x-\theta_0\right),\qquad C=\sqrt{A^2+B^2},\qquad \tan\theta_0=\frac{B}{A} $$

> **Physical reading.** The real part \(\alpha\) controls the exponential envelope \(e^{\alpha x}\): if \(\alpha<0\) the oscillation decays to zero, if \(\alpha=0\) it oscillates with constant amplitude, and if \(\alpha>0\) its amplitude grows exponentially. The imaginary part \(\beta\) sets the angular frequency and the zero-crossing spacing (\(\pi/\beta\)).

### Example 4.4 · Damped oscillation and Euler reduction

Let us solve \(\left(D^2+2D+3\right)y=0\). Completing the square in the characteristic equation gives:

$$ \lambda^2+2\lambda+3=\left(\lambda+1\right)^2+2=0\quad\Longrightarrow\quad \lambda=-1\pm i\sqrt{2} $$

Since \(\alpha=-1\) and \(\beta=\sqrt{2}\), the general solution is written directly as:

$$ y(x)=e^{-x}\left(A\cos\sqrt{2}\,x+B\sin\sqrt{2}\,x\right) $$

### Example 4.5 · Combining a real root with a purely imaginary conjugate pair

Let us solve \(\left(D^3+2D^2+9D+18\right)y=0\). Factoring the characteristic polynomial by grouping gives:

$$ \lambda^3+2\lambda^2+9\lambda+18=\lambda^2(\lambda+2)+9(\lambda+2)=(\lambda+2)\left(\lambda^2+9\right)=0 $$

The roots are \(\lambda_1=-2\) and \(\lambda_{2,3}=\pm 3i\) (\(\alpha=0,\beta=3\)). Because \(e^{0x}=1\), the general solution is:

$$ y(x)=C_1e^{-2x}+A\cos 3x+B\sin 3x $$

## 4. Extracting n-th roots of complex numbers and Examples 4.6 – 4.7

Higher-order characteristic equations often lead to intermediate equations such as \(\lambda^n=z_0\) or \(\lambda^2=a+ib\). Writing a nonzero complex number \(z=x+iy\) in polar form with modulus \(r=\sqrt{x^2+y^2}\) and argument \(\theta\), and accounting for \(2\pi\)-periodicity, De Moivre's theorem gives all \(n\) distinct roots:

$$ z=r\,e^{i(\theta+2k\pi)}\quad\Longrightarrow\quad z^{1/n}=r^{1/n}\left[\cos\left(\frac{\theta+2k\pi}{n}\right)+i\sin\left(\frac{\theta+2k\pi}{n}\right)\right],\qquad k=0,1,\dots,n-1 $$

In particular, when taking square roots (\(n=2\)) of a complex number, the **half-angle identities** give \(\cos(\theta/2)\) and \(\sin(\theta/2)\) exactly from \(\cos\theta\) and \(\sin\theta\):

$$ \cos\frac{\theta}{2}=\pm\sqrt{\frac{1+\cos\theta}{2}},\qquad \sin\frac{\theta}{2}=\pm\sqrt{\frac{1-\cos\theta}{2}} $$

### Example 4.6 · Fourth roots in polar form

Let us solve \(\left(D^4+16\right)y=0\). The characteristic equation is \(\lambda^4=-16\). Since \(-16\) has modulus \(r=16\) and principal argument \(\theta=\pi\):

$$ \lambda^4=16\,e^{i(\pi+2k\pi)}\quad\Longrightarrow\quad \lambda_k=2\left[\cos\left(\frac{\pi+2k\pi}{4}\right)+i\sin\left(\frac{\pi+2k\pi}{4}\right)\right],\qquad k=0,1,2,3 $$

For \(k=0,1,2,3\) the angles are \(\pi/4,3\pi/4,5\pi/4,7\pi/4\), and the four roots form two conjugate pairs:

$$ \lambda=\pm\sqrt{2}\pm i\sqrt{2} $$

From the conjugate pairs \(\lambda=\sqrt{2}\pm i\sqrt{2}\) and \(\lambda=-\sqrt{2}\pm i\sqrt{2}\), the general solution is:

$$ y(x)=e^{\sqrt{2}\,x}\left(A_1\cos\sqrt{2}\,x+B_1\sin\sqrt{2}\,x\right)+e^{-\sqrt{2}\,x}\left(A_2\cos\sqrt{2}\,x+B_2\sin\sqrt{2}\,x\right) $$

### Example 4.7 · Complex square roots via half-angle identities

Let us solve \(\left(D^4-16D^2+100\right)y=0\). Completing the square in \(\lambda^2\) first gives:

$$ \left(\lambda^2-8\right)^2+36=0\quad\Longrightarrow\quad \lambda^2=8\pm 6i $$

For \(8+6i\) in the first quadrant, \(r=\sqrt{8^2+6^2}=10\), \(\cos\theta=8/10=4/5\), and \(\sin\theta=6/10=3/5\). By the half-angle formulas:

$$ \cos\frac{\theta}{2}=\sqrt{\frac{1+4/5}{2}}=\frac{3}{\sqrt{10}},\qquad \sin\frac{\theta}{2}=\sqrt{\frac{1-4/5}{2}}=\frac{1}{\sqrt{10}} $$

Hence \(\sqrt{8+6i}=\pm\sqrt{10}\,(3/\sqrt{10}+i/\sqrt{10})=\pm(3+i)\), and together with its conjugate we obtain all four roots:

$$ \lambda=\pm 3\pm i $$

Combining the two conjugate pairs \(\lambda=3\pm i\) and \(\lambda=-3\pm i\) gives the fourth-order general solution:

$$ y(x)=e^{3x}\left(A_1\cos x+B_1\sin x\right)+e^{-3x}\left(A_2\cos x+B_2\sin x\right) $$

## 5. Repeated roots and Examples 4.8 – 4.11

If a root \(\lambda=a\) of \(\phi(\lambda)=0\) is repeated \(p\) times (so \((\lambda-a)^p\) is a factor), the exponential \(e^{ax}\) alone provides only one solution, whereas a \(p\)-fold factor requires \(p\) linearly independent solutions. To find the missing solutions, we apply the **reduction-of-order** substitution \(y(x)=v(x)e^{ax}\).

### Example 4.8 · Reduction of order for a double root

In \(\left(D^2-4D+4\right)y=(D-2)^2y=0\), the root \(\lambda=2,2\) is repeated twice. Substituting \(y=v(x)e^{2x}\) and differentiating gives:

$$ Dy=\left(v'+2v\right)e^{2x},\qquad D^2y=\left(v''+4v'+4v\right)e^{2x} $$

Substituting into the equation cancels the \(v\) and \(v'\) terms completely:

$$ \left(D^2-4D+4\right)\left(ve^{2x}\right)=\left[\left(v''+4v'+4v\right)-4\left(v'+2v\right)+4v\right]e^{2x}=v''e^{2x}=0 $$

Since \(e^{2x}\neq0\), this reduces to \(D^2v=v''=0\). Integrating twice gives \(v(x)=C_0+C_1x\), so the general solution is:

$$ y(x)=\left(C_0+C_1x\right)e^{2x} $$

### The general p-fold root rule

Applying the product rule by induction establishes the **exponential shift identity** for any integer \(p\ge 1\):

$$ (D-a)^p\left[v(x)e^{ax}\right]=e^{ax}D^pv(x)=0\quad\Longrightarrow\quad D^pv(x)=0 $$

Integrating \(D^pv=0\) \(p\) times yields a general polynomial of degree \(p-1\); thus a \(p\)-fold real root \(\lambda=a\) contributes:

$$ y(x)=\left(C_0+C_1x+C_2x^2+\cdots+C_{p-1}x^{p-1}\right)e^{ax} $$

Likewise, if a complex conjugate pair \(\lambda=\alpha\pm i\beta\) is repeated \(p\) times, applying the same rule to each conjugate root and combining via Euler's formula multiplies both \(\cos\beta x\) and \(\sin\beta x\) by polynomials of degree \(p-1\):

$$ y(x)=e^{\alpha x}\left[\left(A_0+A_1x+\cdots+A_{p-1}x^{p-1}\right)\cos\beta x+\left(B_0+B_1x+\cdots+B_{p-1}x^{p-1}\right)\sin\beta x\right] $$

### Examples 4.9 – 4.11 · Higher-order repeated-root examples

- **Example 4.9:** In \(\left(D^4-5D^2-36\right)y=0\), factoring \(\left(\lambda^2-9\right)\left(\lambda^2+4\right)=0\) gives the simple roots \(\lambda=\pm 3\) and \(\lambda=\pm 2i\):

$$ y(x)=C_1e^{3x}+C_2e^{-3x}+A\cos 2x+B\sin 2x $$

- **Example 4.10:** In \(\left(D^8+18D^6+81D^4\right)y=0\), the characteristic equation is \(\lambda^4\left(\lambda^2+9\right)^2=0\). Here \(\lambda=0\) has multiplicity \(4\) and \(\lambda=\pm 3i\) has multiplicity \(2\):

$$ y(x)=C_0+C_1x+C_2x^2+C_3x^3+\left(A_0+A_1x\right)\cos 3x+\left(B_0+B_1x\right)\sin 3x $$

- **Example 4.11:** In \(\left(D^5-D^4-2D^3+2D^2+D-1\right)y=0\), factoring by grouping gives \(\left(\lambda-1\right)^3\left(\lambda+1\right)^2=0\) (\(\lambda=1\) triple, \(\lambda=-1\) double):

$$ y(x)=\left(C_0+C_1x+C_2x^2\right)e^x+\left(D_0+D_1x\right)e^{-x} $$

## 6. Experiment: characteristic root and mode workshop

In the workshop you can compare initial-value problem solutions (\(y(0)=y_0,\ y'(0)=v_0\)) across four characteristic root families:

| Workshop family | Characteristic roots | Solution basis and behavior |
| --- | --- | --- |
| \((D^2-3D+2)y=0\) | \(\lambda=1,2\) | \(C_1e^x+C_2e^{2x}\) — two distinct exponential growth modes |
| \((D^2-4)y=0\) | \(\lambda=\pm 2\) | \(A\cosh 2x+B\sinh 2x\) — even (\(\cosh\)) and odd (\(\sinh\)) hyperbolic modes |
| \((D^2+2D+5)y=0\) | \(\lambda=-1\pm 2i\) | \(e^{-x}(A\cos 2x+B\sin 2x)\) — oscillation inside an exponential decay envelope |
| \((D^2-4D+4)y=0\) | \(\lambda=2,2\) | \((C_0+C_1x)e^{2x}\) — secular bending mode \(xe^{2x}\) from a double root |

> **What to try in the workshop.** Click **Condition A** and **Condition B** in each family to see how initial conditions isolate individual modes; drag the inspection point \(x\) and verify that the analytical residual \(a_2y''+a_1y'+a_0y\) stays identically zero everywhere.

## Midterm preparation and checklist

- Is the equation genuinely **constant-coefficient** and **homogeneous**? With variable coefficients, \(y=e^{\lambda x}\) does not yield an algebraic characteristic equation.
- Does the degree \(n\) of the characteristic polynomial match the total number of roots and the \(n\) independent constants in your solution?
- Did you distinguish symmetric real roots \(\lambda=\pm\beta\) (\(\cosh\beta x,\sinh\beta x\)) from purely imaginary roots \(\lambda=\pm i\beta\) (\(\cos\beta x,\sin\beta x\))?
- Does the exponential factor \(e^{\alpha x}\) from a complex pair \(\lambda=\alpha\pm i\beta\) multiply only its own sinusoids rather than terms from other roots?
- For a \(p\)-fold root \(\lambda=0\), did you include all \(p\) terms \(C_0+C_1x+\cdots+C_{p-1}x^{p-1}\)?
- For a \(p\)-fold complex conjugate pair, did you place separate degree \(p-1\) polynomials in front of both \(\cos\beta x\) and \(\sin\beta x\)?
