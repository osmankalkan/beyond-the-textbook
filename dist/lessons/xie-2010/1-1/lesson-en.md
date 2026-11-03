# §1.1 · Motivating examples

**Source:** Wei-Chau Xie, *Differential Equations for Engineers* (2010), §1.1, printed pp.1–6 / PDF pp.19–24. This is an original English study adaptation explaining the physical reasoning behind six examples, not a verbatim reproduction. Conditions for the sixth example appear at the top of printed p.6, before §1.2 starts.

## Learning goals

Identify an unknown function, name its independent variable, formulate a physical balance, and explain the assumptions that make a model valid. Solving every equation is not the goal at this stage.

Ask four questions for every example:

1. **What changes?** Choose an unknown such as position, concentration, shape or deflection.
2. **With respect to what?** Time, position, or both?
3. **What governs the change?** State a physical law such as force or material balance.
4. **Where does it start, and where is it valid?** Specify initial/boundary data and assumptions.

## 1. Projectile with air resistance · pp.1–2

A body is launched with speed v₀ at an angle θ₀ above the horizontal. Its position is x(t), y(t); velocity components are x′, y′ and acceleration components x″, y″. Choose upward as positive y.

The book assumes drag proportional to velocity: the resistance vector is −βv. The units of β are kg/s; β/m has units s⁻¹. Drag opposes each velocity component. Apply Newton's second law separately in each direction:


$$
m\ddot{x}+\beta\dot{x}=0
$$



$$
m\ddot{y}+\beta\dot{y}=-mg
$$

Initial conditions are x(0)=y(0)=0, x′(0)=v₀ cos θ₀ and y′(0)=v₀ sin θ₀. Gravity has no horizontal component. Setting β=0 gives x″=0 but leaves y″=−g. Only horizontal velocity is constant.

**Experiment:** Increase β in the lab and compare trajectories with and without drag. For fixed β, greater mass reduces β/m. Numerical parameters are exploratory values rather than textbook data. The analytical curves are additional visualizations derived from this model. Each curve stops when the body returns to the ground; it does not continue as an underground flight. Linear drag is not suitable for every real flow regime.

## 2. Mixing tank · pp.2–3

Liquid enters at flow rate Qin with pollutant fraction cin and leaves at Qout. Perfect mixing makes the outlet fraction equal to the tank fraction c(t). For constant flow rates the volume is:


$$
V(t)=V_0+(Q_{in}-Q_{out})t
$$

Write pollutant amount as M=Vc. Pollutant enters at Qin cin and leaves at Qout c, so M′=Qin cin−Qout c. If volume changes, differentiation requires the **product rule**: M′=Vc′+V′c. Substituting V′=Qin−Qout and simplifying gives:


$$
V(t)\frac{dc}{dt}+Q_{in}c=Q_{in}c_{in}
$$

The coefficient of c becomes Qin. Outflow has not lost its influence: Qout remains inside V(t). With Qin=Qout the volume is constant and c′=(Qin/V₀)(cin−c).

The lab computes concentration as a fraction between 0 and 1 and displays percentages. For example, 10%=0.10. With V₀=100 L, Qin=Qout=5 L/min, c₀=10% and cin=2%, the initial concentration rate is −0.004 fraction/min, or **−0.4 percentage points/min**. Do not confuse relative percent change with percentage points.

Initial data are V(0)=V₀ and c(0)=c₀. If the tank empties, V=0 and this model ends. A physical tank also has finite capacity; overflow requires reformulating the model. The lab examines an ideal tank with no capacity limit and stops before emptying.

## 3. Suspension-bridge cable · pp.3–4

Loads transfer from the deck through hangers to the cable. Place the origin at the lowest cable point. Let y(x) denote height, w(x) the load per horizontal length and H the constant horizontal tension component. Vertical equilibrium gives:


$$
\frac{d^2y}{dx^2}=\frac{w(x)}{H}
$$

Derivatives are with respect to **horizontal position, not time**. Differential equations can describe a stationary structure's shape. With the origin at the lowest point, use y(0)=0 and y′(0)=0.

For constant w the second derivative is constant; two integrations give y=wx²/(2H). Do not confuse constant load per horizontal length with the self-weight-only cable model: they are different assumptions. Greater H reduces the profile’s second derivative y″ for the same applied load. The second derivative and geometric curvature are not the same quantity.

## 4. Single-storey building under earthquake excitation · p.4

Let x(t) be absolute floor motion and x₀(t) ground motion. Choose the relative coordinate y=x−x₀ to express spring and damper effects simply. Then x″=y″+x₀″. Newton's law becomes:


$$
m\ddot{y}+c\dot{y}+ky=-m\ddot{x}_0
$$

The three left-hand terms represent relative inertia, damping and spring action. The right-hand term −m x₀″ is ground excitation in this coordinate. Total building motion must not be confused with x₀ alone or y alone.

Specify initial y and y′. If the ground moves at constant velocity, x₀″=0 and there is no continuing forcing term, though initial conditions may still create a free vibration response. This is a linear, small-motion, single-degree-of-freedom model.

## 5. Attached vibration absorber · pp.4–5

Let x(t) describe the equipment and xₐ(t) the attached mass. Their connecting spring and damper respond to relative displacement and velocity. Formulate a separate force balance for each mass:


$$
m\ddot{x}+(c+c_a)\dot{x}+(k+k_a)x-c_a\dot{x}_a-k_ax_a=F_0\sin(\Omega t)
$$



$$
m_a\ddot{x}_a+c_a\dot{x}_a+k_ax_a-c_a\dot{x}-k_ax=0
$$

Coupling forces act with equal magnitude and opposite direction. Adding the equations cancels the internal forces from cₐ and kₐ. This is a physical sign check.

The motions are coupled and cannot be solved independently of each other. Initial data consist of two positions and two velocities. Vibration reduction depends on frequency and parameter choice; improvement is not guaranteed for every case. This lesson explains formulation and does not simulate the coupled vibration solution.

## 6. Bridge under a moving load · pp.5–6

Bridge deflection depends on both where and when it is measured: v(x,t). Consider a simply supported beam of length L, flexural rigidity EI and mass per unit length ρA, crossed by a vehicle of weight P at constant speed U:


$$
\rho A\frac{\partial^2v}{\partial t^2}+EI\frac{\partial^4v}{\partial x^4}=P\delta(x-Ut)
$$

vtt is the second time derivative and vxxxx the fourth position derivative. Pδ(x−Ut) represents the point load at x=Ut as a distribution. The Dirac delta is not an ordinary function with finite height. The vehicle is on the span for 0≤t≤L/U.

If the bridge starts at rest:


$$
v(x,0)=\frac{\partial v}{\partial t}(x,0)=0
$$

At simple supports, deflection and bending moment vanish. For constant EI the conditions are:


$$
v(0,t)=v(L,t)=\frac{\partial^2v}{\partial x^2}(0,t)=\frac{\partial^2v}{\partial x^2}(L,t)=0
$$

Initial information alone is not enough; the behavior at the ends of the beam also matters. The model assumes a small-deflection, undamped Euler–Bernoulli beam. This lesson explains its meaning and conditions without simulating the moving-beam solution.

## Before completing the topic

For each example, describe the unknown, independent variable, physical balance and one assumption in your own words. Predict what will happen before changing a parameter in either interactive plot. Then complete the six concept checks.

This update adds only §1.1. §1.2, “General Concepts and Definitions,” is reserved for after this topic has been reviewed.


---

Study support: open the lesson workshop for guided reasoning and the practice screen for worked problems. Keep your own explanation in the per-lesson notebook.
