# Heating and cooling

This study note is based on Wei-Chau Xie, *Differential Equations for Engineers* (Cambridge University Press, 2010), **§3.1, printed pages 87–90 / PDF pages 105–108**. It is an interactive study adaptation rather than a verbatim reproduction of the entire textbook. The two models below follow Examples 3.1 and 3.2 in the book; the interactive laboratory, conceptual prediction scenarios, and exam exercises have been prepared for this workspace.

## 1. From physics to the differential equation

The temperature difference between a body and its surrounding medium drives heat transfer. Let us adopt a lumped-capacitance model where the temperature throughout the body is approximately uniform (Biot number Bi ≪ 1) and the ambient medium remains at a constant temperature. Newton's Law of Cooling states that the rate of change of temperature is proportional to this difference:

$$
\frac{dT}{dt}=-k(T-T_m)
$$

- **T(t):** Temperature of the body at time t (°C).
- **Tₘ:** Constant ambient temperature of the surrounding medium (°C).
- **k > 0:** Thermal response coefficient (constant of proportionality). When time is measured in minutes, its unit is min⁻¹.

When T > Tₘ, the derivative dT/dt is negative and the body cools. When T < Tₘ, the derivative is positive and the body warms up. When T = Tₘ, the rate of change is zero and thermal equilibrium is maintained. A single differential equation governs all three regimes.

## 2. From differential equation to analytical solution

First, note the constant equilibrium solution T(t) = Tₘ. For T ≠ Tₘ, we separate variables and integrate both sides:

$$
\ln|T-T_m|=-kt+C
$$

Applying the initial condition T(0) = Tᵢ yields the exact analytical solution:

$$
T(t)=T_m+(T_i-T_m)e^{-kt}
$$

Notice that the quantity decaying exponentially is **not the temperature itself, but the temperature difference relative to the medium**, θ(t) = T(t) − Tₘ. After one thermal time constant τ = 1/k, this initial difference drops to e⁻¹ ≈ 36.8% of its starting value. The half-life of the temperature difference is:

$$
t_{1/2}=\frac{\ln 2}{k}
$$

Mathematically, if the body does not start at equilibrium, it approaches Tₘ asymptotically and never reaches exact equality in finite time. Physical thermometer measurements, however, have finite resolution.

## 3. Body cooling in air · Example 3.1

In the textbook example, a body cools in air of constant temperature Tₘ = 20 °C from an initial temperature of Tᵢ = 100 °C, reaching 60 °C in 20 minutes. We first calibrate the proportionality constant k from this intermediate observation:

$$
k=-\frac{1}{20}\ln\left(\frac{60-20}{100-20}\right)=\frac{\ln 2}{20}
$$

Thus k ≈ 0.034657 min⁻¹, which means the temperature difference relative to the room halves every 20 minutes. Successive temperature differences of 80 → 40 → 20 → 10 °C correspond to body temperatures of 100 → 60 → 40 → 30 °C.

**Key takeaway:** The body reaches 30 °C at **t = 60 minutes from the start**, which requires **40 more minutes** after the 20-minute observation. Distinguishing between total elapsed time from t = 0 and additional remaining time after an intermediate measurement is essential in exam problems.

Clicking **Load book example (Example 3.1)** in the laboratory sets these exact parameters. Move the timeline slider to 20, 40, and 60 minutes to verify each halving step.

## 4. Heating in a building · Example 3.2

In the second model, the outside atmospheric temperature varies with time and a feedback heating system responds proportionally to the indoor temperature deviation. By conservation of energy, the rate of heat stored in the building equals heat supplied minus heat lost to the outside:

$$
c\frac{dT_B}{dt}=Q+K_2(T_S-T_B)-K_1(T_B-T_A)
$$

Here c is the thermal capacity of the building, K₁ is the heat-loss conductance to the outside, K₂ is the proportional feedback gain of the thermostat/heater, Tₛ is the target ("set") temperature, and Q is the baseline heating rate. Choosing **Q = K₁(Tₛ − T₀)** ensures that the building stays at Tₛ when the outside temperature is held at its mean value T₀.

With a sinusoidal outdoor temperature Tₐ(t) = T₀ + T₁ sin(ωt), temperature deviation θ = Tʙ − Tₛ, natural thermal time constant τ = c/K₁, and dimensionless feedback ratio r = K₂/K₁, the governing equation becomes a standard linear first-order ODE:

$$
\tau\frac{d\theta}{dt}+(1+r)\theta=T_1\sin(\omega t)
$$

Using the integrating factor e^((1+r)t/τ), the general solution is the sum of a decaying exponential transient term and a sinusoidal steady-state oscillation. Once the transient dies out, the amplitude of the steady-state indoor temperature fluctuation is:

$$
A=\frac{T_1}{\sqrt{(1+r)^2+(\tau\omega)^2}}
$$

The steady-state phase lag is φ = arctan[τω/(1+r)], corresponding to a time delay of φ/ω hours behind the outdoor cycle. Increasing the feedback ratio r or having a larger thermal time constant τ attenuates indoor fluctuations. Note that A bounds the **steady-state** oscillation; during the initial transient period, indoor peaks can slightly exceed Tₛ + A.

In Example 3.2, T₁ = 12 °C, τ = 4 hours, and the period is 24 hours (ω = π/12 hr⁻¹, so τω = π/3). To keep the steady-state fluctuation within A ≤ 3 °C, the feedback ratio must satisfy:

$$
r\geq\sqrt{16-(\pi/3)^2}-1\approx 2.86049
$$

Clicking **Load book boundary condition (Example 3.2)** in the building lab loads this threshold. The plotted curve shows the complete solution starting from Tʙ(0) = Tₛ, alongside the pure steady-state curve. The values T₀ = 10 °C and Tₛ = 22 °C are chosen for visualization; in a linear constant-coefficient model without heater saturation, the steady-state amplitude A is independent of T₀ and Tₛ.

## 5. How to use the interactive laboratory

1. Select a scenario in the **Conceptual Prediction** panel and test your intuition before changing sliders.
2. Enable **Compare two scenarios (A/B)** or **Plot pure steady-state** to inspect how parameters alter transient decay, half-life, and phase lag.
3. Use the **Experimental Calibration** and **Step-by-Step Derivation** panels to connect physical assumptions with each algebraic step.
4. Study the **Midterm & Final Exam Clinic** (Problems 3.1 and 3.2 on page 130) and solve the 8 graded problems.

The dashed orange curve in the cooling lab illustrates the forward Euler numerical method, updating temperature via Tₙ₊₁ = Tₙ − hk(Tₙ − Tₘ). Reducing the step size h demonstrates convergence toward the exact analytical curve, linking §3.1 to numerical IVP methods in §10.1.

## 6. Prerequisites and scope

Required background: differentiation, exponential and logarithmic functions, indefinite integration, and initial value problems. Within the textbook, the mathematical prerequisites are **§2.1 Method of Separation of Variables (p. 16)** for constant-medium cooling and **§2.4 Linear First-Order Equations (p. 55)** for time-varying environments and forced building response.


---

Study support: open the lesson workshop for guided reasoning and the practice screen for worked problems. Keep your own explanation in the per-lesson notebook.
