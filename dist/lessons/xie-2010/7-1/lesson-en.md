# §7.1 Introduction: Particle Motion in a Plane and Multi-Story Shear Buildings

Until now most problems have been written with a single independent variable \(t\) and a single dependent variable \(x(t)\) or \(y(t)\). Real engineering systems change several quantities at once: the horizontal and vertical position of a particle moving in a plane, the displacement of every floor of a multi-story building, or several currents in an electrical network. The unknowns are then not one function but a family of functions.

Section 7.1 introduces this transition through two motivating examples:

1. **A particle in a plane:** The same motion produces two simple equations in rectangular coordinates, but two coupled and nonlinear equations in polar coordinates.
2. **An n-story shear building:** The free-body diagram of each floor is written separately, then all floor equations are assembled into one matrix equation.

In both examples the common goal is the same: **convert second-order equations into a first-order state space.** That conversion is the common language of the operator, Laplace, and matrix methods that follow.

---

## 1. What is a system of differential equations?

A system contains one independent variable and more than one dependent variable. Collecting the dependent variables into a vector gives the most general first-order linear system:

$$ \dot{\mathbf{x}} = \mathbf{A}(t)\mathbf{x} + \mathbf{f}(t) $$

Here \(\mathbf{x}\) is the unknown vector, \(\mathbf{A}(t)\) is the coefficient matrix, and \(\mathbf{f}(t)\) is the external forcing vector. Coefficients depending on \(t\) do not by themselves destroy linearity; products of unknowns or nonlinear functions of unknowns do.

Mechanical systems usually produce second-order equations. With mass, damping, and stiffness matrices the typical form is

$$ \mathbf{M}\ddot{\mathbf{x}} + \mathbf{C}\dot{\mathbf{x}} + \mathbf{K}\mathbf{x} = \mathbf{F}(t) $$

This is the multi-degree-of-freedom version of the single-degree-of-freedom equation \(m\ddot{x}+c\dot{x}+kx=F(t)\). For an \(n\)-story system the vector \(\mathbf{x}\) has \(n\) components. Each second-order equation expands into two first-order equations, so the state-space dimension is \(2n\).

> **MENTAL MODEL:** Moving from one equation to a system is like watching every floor of a building at once instead of watching a single body. Each floor has its own displacement, but neighbouring floors pull on each other through springs and dashpots. Matrices store that neighbourhood structure in an orderly way.

---

## 2. Particle in a plane: rectangular coordinates

Let a particle of mass \(m\) move in the \(x\)-\(y\) plane. Its position is \((x(t),y(t))\), and the external forces are \(F_x(x,y,t)\) and \(F_y(x,y,t)\). Newton's second law is written separately in each direction:

$$ m\ddot{x} = F_x(x,y,t), \qquad m\ddot{y} = F_y(x,y,t) $$

This is a system of two second-order ordinary differential equations. If the forces depend only on \(t\), the two equations decouple and can be solved independently. If the forces also depend on \(x\) and \(y\), the equations couple; the system remains linear as long as the unknowns appear only to the first power.

In rectangular coordinates the acceleration components are simply \(\ddot{x}\) and \(\ddot{y}\). In polar coordinates the same acceleration becomes much richer because the direction vectors themselves rotate.

---

## 3. Polar coordinates: the derivation

Let the polar coordinates of the particle be \((r,\theta)\). The relation to rectangular coordinates is

$$ x = r\cos\theta, \qquad y = r\sin\theta $$

Both \(r\) and \(\theta\) are functions of time. Treating either one as constant is the most common mistake in the polar derivation.

The direction of the position vector is described by two unit vectors:

$$ \mathbf{e}_r = \cos\theta\,\mathbf{i} + \sin\theta\,\mathbf{j}, \qquad \mathbf{e}_\theta = -\sin\theta\,\mathbf{i} + \cos\theta\,\mathbf{j} $$

\(\mathbf{e}_r\) points outward from the origin, while \(\mathbf{e}_\theta\) is tangential in the direction of increasing angle. Both vectors rotate with \(\theta\); the extra acceleration terms come precisely from this rotation.

Differentiating once by the chain rule gives the velocity components:

$$ \dot{x} = \dot{r}\cos\theta - r\dot{\theta}\sin\theta, \qquad \dot{y} = \dot{r}\sin\theta + r\dot{\theta}\cos\theta $$

Differentiating again brings in the product rule. The derivative of \(r\dot{\theta}\) produces two terms, and the derivatives of \(\cos\theta\) and \(\sin\theta\) bring in the angular velocity:

$$ \ddot{x} = (\ddot{r} - r\dot{\theta}^2)\cos\theta - (2\dot{r}\dot{\theta} + r\ddot{\theta})\sin\theta $$

$$ \ddot{y} = (\ddot{r} - r\dot{\theta}^2)\sin\theta + (2\dot{r}\dot{\theta} + r\ddot{\theta})\cos\theta $$

Grouping the acceleration vector along \(\mathbf{e}_r\) and \(\mathbf{e}_\theta\) identifies the radial and angular accelerations:

$$ a_r = \ddot{r} - r\dot{\theta}^2, \qquad a_\theta = 2\dot{r}\dot{\theta} + r\ddot{\theta} $$

The term \(r\dot{\theta}^2\) is the **centripetal acceleration**; it is nonzero even at constant radius and acts inward. The term \(2\dot{r}\dot{\theta}\) is the Coriolis-like contribution produced by changing the radius while the angle is also changing.

Writing Newton's second law as \(m a_r=F_r\) and \(m a_\theta=F_\theta\) gives the polar equations of motion:

$$ m(\ddot{r} - r\dot{\theta}^2) = F_r(r,\theta,t), \qquad m(2\dot{r}\dot{\theta} + r\ddot{\theta}) = F_\theta(r,\theta,t) $$

### 3.1 The linearity trap

The unknowns are \(r\) and \(\theta\). The terms \(r\dot{\theta}^2\) and \(\dot{r}\dot{\theta}\) contain products of these unknowns (or their derivatives). Therefore **the general polar system is nonlinear.** Time-varying coefficients alone do not destroy linearity; products do.

To expand the system into first-order state space, use four state variables:

$$ \mathbf{y} = \begin{bmatrix} r \\ \theta \\ \dot{r} \\ \dot{\theta} \end{bmatrix}, \qquad \dot{\mathbf{y}} = \begin{bmatrix} \dot{r} \\ \dot{\theta} \\ r\dot{\theta}^2 + F_r/m \\ (F_\theta/m - 2\dot{r}\dot{\theta})/r \end{bmatrix} $$

The last row has \(r\) in the denominator, so this representation requires \(r\neq 0\). The singular case at the origin must be treated separately.

As a special case, if the angular velocity is constant, \(\dot{\theta}=\omega\), then \(\ddot{\theta}=0\) and the equations become linear in \(r\) and \(\dot{r}\):

$$ \ddot{r} - \omega^2 r = \frac{F_r}{m}, \qquad 2\omega\dot{r} = \frac{F_\theta}{m} $$

This shows clearly why the heading "linear systems" is conditional for the polar example. Without the constant-angular-velocity assumption the system is nonlinear.

> **PRACTICAL CHECK:** When checking signs in the polar equations, ask two questions. (1) Should the acceleration point toward the centre? Then \(r\dot{\theta}^2\) must carry a minus sign. (2) Does the angular acceleration come from a changing \(\dot{\theta}\) or from differentiating the product \(r\dot{\theta}\)? Together they produce \(2\dot{r}\dot{\theta}+r\ddot{\theta}\).

---

## 4. The n-story shear building

In the shear-building model each floor is assumed rigid and the columns carry only horizontal shear. For floor \(r\), the mass is \(m_r\), the horizontal displacement is \(x_r(t)\), and the external load is \(F_r(t)\). The total column stiffness between floors \((r-1)\) and \(r\) is \(k_r\), and the damping coefficient is \(c_r\).

First define the relative displacements between neighbouring floors:

$$ \Delta_r = x_r - x_{r-1}, \qquad \Delta_{r+1} = x_{r+1} - x_r $$

The lower column pulls floor \(r\) to the left, while the upper column pulls it to the right. This choice of directions is the source of the signs. The free-body diagram of floor \(r\) gives the equation of motion

$$ m_r\ddot{x}_r + (c_r+c_{r+1})\dot{x}_r - c_r\dot{x}_{r-1} - c_{r+1}\dot{x}_{r+1} + (k_r+k_{r+1})x_r - k_r x_{r-1} - k_{r+1}x_{r+1} = F_r(t) $$

The boundary conditions fix the two ends of the model:

$$ x_0 = 0, \qquad c_{n+1} = 0, \qquad k_{n+1} = 0 $$

\(x_0=0\) states that the ground does not move. \(c_{n+1}=k_{n+1}=0\) states that there is no column above the top floor. These two conditions keep the matrices tridiagonal.

All floor equations are assembled into one matrix equation:

$$ \mathbf{M}\ddot{\mathbf{x}} + \mathbf{C}\dot{\mathbf{x}} + \mathbf{K}\mathbf{x} = \mathbf{F}(t), \qquad \mathbf{x} = \begin{bmatrix} x_1 \\ \vdots \\ x_n \end{bmatrix}, \quad \mathbf{F} = \begin{bmatrix} F_1 \\ \vdots \\ F_n \end{bmatrix} $$

The mass matrix is diagonal; each floor mass appears only in its own row:

$$ \mathbf{M} = \diag(m_1, m_2, \ldots, m_n) $$

The damping matrix carries the dashpots between neighbouring floors:

$$ \mathbf{C} = \begin{bmatrix} c_1+c_2 & -c_2 & & \\ -c_2 & c_2+c_3 & -c_3 & \\ & \ddots & \ddots & \ddots \\ & & -c_n & c_n \end{bmatrix} $$

The stiffness matrix has the same banded structure:

$$ \mathbf{K} = \begin{bmatrix} k_1+k_2 & -k_2 & & \\ -k_2 & k_2+k_3 & -k_3 & \\ & \ddots & \ddots & \ddots \\ & & -k_n & k_n \end{bmatrix} $$

Diagonal entries collect the total spring or dashpot value attached to that floor by its lower and upper neighbours. Off-diagonal entries represent the element shared by two adjacent floors. \(\mathbf{M}\) is symmetric and diagonal; \(\mathbf{C}\) and \(\mathbf{K}\) are symmetric and tridiagonal. This structure underpins energy conservation and modal decomposition.

> **SIGN RULE:** In the equation for floor \(r\), terms from the lower neighbour start with a minus sign and terms from the upper neighbour start with a plus sign. After collecting terms, the diagonal entry of that floor is \((k_r+k_{r+1})\) and \((c_r+c_{r+1})\). Do not memorize the signs; draw the free-body diagram.

---

## 5. Two-story building: statics, frequencies, and mode shapes

For the two-story special case the matrices can be written by hand:

$$ \mathbf{K} = \begin{bmatrix} k_1+k_2 & -k_2 \\ -k_2 & k_2 \end{bmatrix}, \qquad \mathbf{C} = \begin{bmatrix} c_1+c_2 & -c_2 \\ -c_2 & c_2 \end{bmatrix} $$

In statics \(\ddot{\mathbf{x}}=\dot{\mathbf{x}}=0\), leaving only \(\mathbf{K}\mathbf{x}_s=\mathbf{F}\). The two static floor displacements are therefore

$$ x_{1s} = \frac{F_1+F_2}{k_1}, \qquad x_{2s} = \frac{F_1+F_2}{k_1} + \frac{F_2}{k_2} $$

The ground spring \(k_1\) carries the sum of all external loads. The second floor adds its own spring deformation \(F_2/k_2\) to the first-floor displacement.

### 5.1 Numerical example

Take \(m_1=2\), \(m_2=1\), \(k_1=4\), \(k_2=2\), \(F_1=4\), \(F_2=2\). The static solution is \(x_{1s}=(4+2)/4=1.5\) and \(x_{2s}=1.5+2/2=2.5\).

For undamped free vibration, the assumption \(\mathbf{x}=\mathbf{\phi}e^{i\omega t}\) gives the condition \(\det(\mathbf{K}-\omega^2\mathbf{M})=0\):

$$ \det(\mathbf{K} - \omega^2\mathbf{M}) = 0 \quad\Longrightarrow\quad 2\omega^4 - 10\omega^2 + 8 = 0 $$

The equation factors as \(2(\omega^2-1)(\omega^2-4)=0\). The positive roots and the corresponding mode shapes are

$$ \omega_1 = 1, \quad \omega_2 = 2; \qquad \mathbf{\phi}_1 = \begin{bmatrix} 1 \\ 2 \end{bmatrix}, \quad \mathbf{\phi}_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix} $$

In the first mode the two floors move in the same direction; in the second mode they move in opposite directions. The amplitude of a mode shape is arbitrary; only the ratio of its components matters. Here the ratio \(x_2=2x_1\) is preserved for \(\mathbf{\phi}_1\), and \(x_2=-x_1\) for \(\mathbf{\phi}_2\).

> **COMMON MISTAKE:** Do not confuse the static equation \(\mathbf{K}\mathbf{x}=\mathbf{F}\) with the eigenvalue equation \(\det(\mathbf{K}-\omega^2\mathbf{M})=0\). The first gives equilibrium under load; the second gives the frequencies of free vibration without load. Damping \(\mathbf{C}\) does not enter the static solution, and it drops out of the undamped free-vibration problem.

---

## 6. First-order state space

Reduce the two-story system to first order for \(n=2\). Choose the state vector as positions followed by velocities:

$$ \mathbf{y} = \begin{bmatrix} x_1 \\ x_2 \\ \dot{x}_1 \\ \dot{x}_2 \end{bmatrix}, \qquad \dot{\mathbf{y}} = \begin{bmatrix} 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \\ -\frac{k_1+k_2}{m_1} & \frac{k_2}{m_1} & -\frac{c_1+c_2}{m_1} & \frac{c_2}{m_1} \\ \frac{k_2}{m_2} & -\frac{k_2}{m_2} & \frac{c_2}{m_2} & -\frac{c_2}{m_2} \end{bmatrix}\mathbf{y} + \begin{bmatrix} 0 \\ 0 \\ \frac{1}{m_1} \\ \frac{1}{m_2} \end{bmatrix}\mathbf{F}(t) $$

The structure of the state matrix \(\mathbf{A}\) is the same for general \(n\):

- The upper-left block is \(0\), and the upper-right block is the identity matrix \(\mathbf{I}\).
- The lower-left block is \(-\mathbf{M}^{-1}\mathbf{K}\), and the lower-right block is \(-\mathbf{M}^{-1}\mathbf{C}\).
- The lower block of the input matrix \(\mathbf{B}\) is \(\mathbf{M}^{-1}\), and its upper block is \(0\).

An \(n\)-story system has \(2n\) state variables: \(n\) displacements and \(n\) velocities. For a two-story building this number is \(2n=4\); for a three-story building it is \(6\).

> **INDEPENDENT VERIFICATION:** In the undamped case the eigenvalues of \(\mathbf{A}\) should be \(\pm i\omega_1,\pm i\omega_2\). Comparing your computed frequencies with these eigenvalues checks both the matrix assembly and the frequency equation at once. With damping, the real parts must be negative; a positive real part signals a sign error.

---

## 7. Exam and application checklist

1. **Count the variables:** How many dependent variables are there? What is the order? Is the state dimension \(2n\)?
2. **Diagnose linearity:** Are there products of unknowns or nonlinear functions of unknowns? Terms such as \(r\dot{\theta}^2\) and \(\dot{r}\dot{\theta}\) make the system nonlinear.
3. **Draw the free-body diagram:** The lower neighbour acts in the minus direction and the upper neighbour in the plus direction. Diagonal entries must be \((k_r+k_{r+1})\) and \((c_r+c_{r+1})\).
4. **Apply the boundary conditions:** \(x_0=0\) and \(k_{n+1}=c_{n+1}=0\). Without them the last row of the matrix is assembled incorrectly.
5. **Separate statics from dynamics:** Statics uses \(\mathbf{K}\mathbf{x}_s=\mathbf{F}\); free vibration uses \(\det(\mathbf{K}-\omega^2\mathbf{M})=0\).
6. **Build the state space:** \(\mathbf{y}=[\mathbf{x};\dot{\mathbf{x}}]\), with lower-left block \(-\mathbf{M}^{-1}\mathbf{K}\) and lower-right block \(-\mathbf{M}^{-1}\mathbf{C}\).
7. **Verify the result:** Check dimension, signs, symmetry, and eigenvalues. Produce an independent check from energy or static equilibrium.

---

## 8. Reinforcement

The following short checks target the three critical transitions in this section. Produce each answer yourself first, then compare it with the laboratory and clinic steps.

1. **Polar sign:** If \(r=R\) is constant and \(\dot{\theta}=\omega\) is constant, what is \(a_r\)? The answer is \(-R\omega^2\); even with \(\ddot{r}=0\), the centripetal term remains.
2. **Linearity:** Why is the general polar system nonlinear? Because \(r\dot{\theta}^2\) and \(\dot{r}\dot{\theta}\) are products of unknowns.
3. **Shear-building matrix:** Why are the diagonal entries of \(\mathbf{K}\) equal to \(k_1+k_2\) and \(k_2\) in a two-story building? The first floor is attached to both the ground and the second floor, while the second floor is attached only to the first.
4. **Static solution:** For \(F_1=4\), \(F_2=2\), \(k_1=4\), \(k_2=2\), the result is \(x_{1s}=1.5\) and \(x_{2s}=2.5\). The total load is carried through \(k_1\), and the second floor adds its own spring deformation.
5. **State dimension:** A three-story building has \(2n=6\) first-order equations. Each floor contributes one displacement and one velocity.
6. **Eigenvalue check:** For the same example, \(\omega_1=1\), \(\omega_2=2\), and the modes are \([1,2]\), \([1,-1]\). The undamped \(\mathbf{A}\) should have eigenvalues \(\pm i\) and \(\pm 2i\).

**Laboratory task:** In particle mode, select the "Circular" preset and observe that \(a_r\) stays negative while \(r\) remains constant. Then switch to building mode, load the "Exam" preset, and verify that the static lines settle at \(1.5\) and \(2.5\) while the frequency cards report \(1\) and \(2\).

**Clinic task:** Work through the four cases in order: polar derivation, floor equation, static/frequency calculation, and state-space conversion. At every step write the unit, the sign, and the dimension; show not only the result but also why it is correct.
