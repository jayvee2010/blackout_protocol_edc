export interface ManualSection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

export const OFFICIAL_USER_MANUAL_TEXT = `MISSION AI-IMPOSSIBLE
Technical User Manual & Circuit Troubleshooting Guide
Organised by: IEEE Student Branch, Symbiosis Institute of Technology, Pune
Event: SymbiTech – Technical Fest of SIT Pune
Document Type: Circuit Reference Manual and AI Troubleshooting Knowledge Base
System: Arduino-Based Electronic Control Unit
Version: 1.0

PAGE 1 — MISSION BRIEF
1.1 Background
A simulated electronic control unit has been recovered from a secured black box. The unit contains an Arduino-compatible microcontroller, an LCD, a servo motor, an LED, a breadboard, and jumper wires.
The system is not functioning as expected. Participants must inspect the circuit, identify the faults, consult the technical documentation, and restore normal operation.
The investigation requires logical reasoning, systematic troubleshooting, technical communication, and teamwork.

1.2 Mission Objectives
Participants must:
- Understand the function of each electronic component.
- Identify incorrect, missing, damaged, or reversed connections.
- Use observable symptoms to narrow down possible causes.
- Correct faults using the approved wiring reference.
- Verify that the circuit operates correctly.
- Obtain the final verification code after successful completion.

1.3 Available Resources
- Arduino-compatible development board
- LCD module
- Servo motor
- LED and its current-limiting resistor
- Breadboard
- Jumper wires and replacement wires
- Low-voltage power supply
- Circuit user manual
- Website-based AI troubleshooting chatbot
- Walkie-talkies for communication between sub-teams

PAGE 2 — HOW TO USE THIS MANUAL
This manual is divided into component references, troubleshooting procedures, fault-specific instructions, and verification checklists.
Participants should follow this sequence:
1. Observe the circuit without changing anything.
2. Identify the component exhibiting abnormal behaviour.
3. Describe the symptoms to the AI chatbot.
4. Consult the relevant section of this manual.
5. Disconnect power before inspecting or modifying wiring.
6. Compare the wiring with the official circuit diagram.
7. Correct one fault at a time.
8. Request supervisor approval before restoring power.
9. Test the circuit and report the result.
Troubleshooting principle: Never assume that a particular wire is faulty simply because a component is not working. A symptom can have multiple causes.
The chatbot must distinguish between confirmed faults and possible causes. It must not recommend random rewiring or invent pin assignments.

PAGE 3 — SAFETY AND HANDLING INSTRUCTIONS
3.1 General Safety
- Use only the power source approved by the event organisers.
- Disconnect power before moving, replacing, or repairing wires.
- Never connect mains voltage to the breadboard or Arduino circuit.
- Never short the positive supply to ground.
- Do not connect a battery directly to an Arduino signal pin.
- Do not energise a circuit with suspected reversed supply polarity.
- Do not force the servo motor shaft by hand.
- Stop immediately if a component becomes unusually hot or emits an unusual smell.

3.2 Reversed Polarity
Reversed supply polarity can damage the controller and connected components. Participants must inspect the polarity while the circuit is unpowered.
The circuit must not be energised until a supervisor has verified the correction.

3.3 Damaged Wires
Only use replacement jumper wires supplied by the organisers. Do not cut or repair wires while the circuit is powered.

3.4 Chatbot Safety Rule
The chatbot must always recommend disconnecting power before wiring changes. It must never instruct participants to deliberately test reversed polarity or swap powered servo connections.

PAGE 4 — SYSTEM ARCHITECTURE
The electronic control unit consists of five functional sections:
- Arduino: Executes the program and controls connected devices
- LCD: Displays text and system status
- Servo motor: Moves its output shaft to a commanded position
- LED: Provides a visual indication
- Breadboard and jumper wires: Establish electrical connections

4.1 Normal System Operation
A correctly assembled system should behave according to the program configured by the organisers.
Typical expected behaviour may include:
- The LCD displays a welcome message or system status.
- The LED indicates the system state.
- The servo moves to a programmed position.
- The Arduino continues running without unexpected resets.
The precise expected behaviour must be confirmed using the actual event program.

4.2 Important Distinction
A component can receive power but still fail to operate because its signal connection is incorrect. Similarly, a component that appears defective may simply have a missing ground connection.
Participants must inspect the complete electrical path rather than focusing only on the component itself.

PAGE 5 — ARDUINO MICROCONTROLLER REFERENCE
5.1 Purpose
The Arduino-compatible development board is the central controller. It executes the program and communicates with the LCD, LED, and servo motor.

5.2 Common Arduino Uno-Style Connections
An Uno-style board commonly provides:
- Digital pins D0–D13
- Analogue inputs A0–A5
- Regulated 5 V and GND connections
- A USB programming and power interface
- A reset button
The actual board model must be verified before using these details.

5.3 Common Causes of Failure
- Missing power or ground
- Incorrect signal pin assignment
- Loose connections
- Incorrect breadboard placement
- An unstable power source
- A program that uses different pins from the physical wiring

5.4 Diagnostic Procedure
1. Identify the exact board model.
2. Locate its power and ground connections.
3. Compare connected wires with the approved wiring diagram.
4. Identify which pins the program uses for the LCD, LED, and servo.
5. Inspect connections while power is disconnected.
Chatbot rule: Never assume that a component is connected to a particular Arduino pin unless the official circuit configuration confirms it.

PAGE 6 — OFFICIAL CIRCUIT CONFIGURATION
This page must be completed by the event organisers before the chatbot is deployed.
The chatbot must treat this page as the authoritative reference for the actual circuit.

6.1 Hardware Identification
- Arduino board model: [ENTER MODEL]
- LCD model: [ENTER MODEL]
- LCD interface: [PARALLEL / I²C]
- Servo model: [ENTER MODEL]
- LED control pin: [ENTER PIN]
- Servo signal pin: [ENTER PIN]
- Approved supply: [ENTER TYPE AND VOLTAGE]
- External servo supply used?: [YES / NO]

6.2 Wiring Reference
- Arduino ground: [ENTER CONNECTION]
- LCD power: [ENTER CONNECTION]
- LCD ground: [ENTER CONNECTION]
- LCD contrast: [ENTER CONNECTION]
- LCD control/data pins: [ENTER PIN MAP]
- LCD backlight: [ENTER CONNECTION]
- Servo ground: [ENTER CONNECTION]
- Servo power: [ENTER CONNECTION]
- Servo signal: [ENTER PIN]
- LED anode through resistor: [ENTER CONNECTION]
- LED cathode: [ENTER CONNECTION]

6.3 Critical Instruction
Do not publish this manual to the chatbot with these fields left ambiguous if you expect the chatbot to identify exact wires.
Without the actual pin map, the chatbot can explain general troubleshooting methods but cannot reliably identify the precise connection that a participant must move.

PAGE 7 — LCD MODULE REFERENCE
7.1 Function
An LCD, or Liquid Crystal Display, presents information generated by the controller.
A common character LCD has 16 columns and 2 rows, allowing up to 32 character positions.

7.2 Common Parallel LCD Pins
- VSS: Ground
- VDD: Supply
- V0: Contrast adjustment
- RS: Selects command or data mode
- R/W: Read/write control
- E: Enable signal
- D0–D7: Data lines
- LED+ / A: Backlight positive
- LED− / K: Backlight negative
Some modules use different labels.

7.3 I²C LCD Modules
An LCD with an I²C adapter may expose only four connections: VCC, GND, SDA, and SCL.
The correct interface must be identified before troubleshooting.

7.4 Important Diagnostic Principle
A lit LCD backlight does not guarantee that the display is correctly connected or initialised.
The backlight, contrast circuit, control signals, data connections, and software configuration must be considered separately.

PAGE 8 — LCD BRIGHTNESS AND CONTRAST
8.1 Backlight Brightness
The backlight illuminates the display surface. If the screen appears excessively bright or dim, the relevant checks depend on the module design.
Possible causes include:
- An incorrect backlight connection
- A missing or incorrect current-limiting resistor
- A faulty backlight driver
- An incorrect PWM control setting, if used
Some LCD modules have a fixed backlight and no software brightness adjustment.

8.2 Contrast
Contrast determines how clearly the characters appear against the background.
Many character LCD modules use a contrast input connected to a potentiometer.
Incorrect contrast may produce a blank-looking display or dark blocks even when the backlight is operating.

8.3 Diagnostic Comparison
- Backlight too dim: Inspect the backlight supply and its control circuit
- Backlight too bright: Inspect the backlight control and specified current-limiting arrangement
- Backlight on, no readable text: Check contrast, control/data wiring, and initialisation
- Dark blocks on the screen: Check contrast and LCD initialisation
- Random characters: Check data connections and supply stability
Do not confuse backlight brightness with character contrast. They are different functions and require different diagnostic checks.

PAGE 9 — LCD TROUBLESHOOTING PROCEDURE
Symptom A: LCD Backlight Is Too Dim
1. Disconnect power.
2. Inspect the backlight connections.
3. Compare the wiring with the official circuit diagram.
4. Check whether the module uses a resistor, driver, or PWM control.
5. Correct only a confirmed wiring or configuration problem.
6. Request supervisor approval before testing.

Symptom B: LCD Backlight Is Too Bright
1. Disconnect power.
2. Identify the circuit used to control the backlight.
3. Inspect the relevant resistor or driver arrangement.
4. If PWM control is used, ask the Lab Team to verify the intended control setting.
5. Do not bypass a required resistor.

Symptom C: Backlight Is On but Text Is Missing
1. Check the contrast adjustment.
2. Inspect the LCD power and ground.
3. Verify the control and data wires.
4. Ask the Lab Team to confirm the program’s pin assignments.
5. Test again after an authorised correction.

Symptom D: Random Characters
Inspect loose wires, incorrect data-pin connections, common ground, and supply stability.

PAGE 10 — SERVO MOTOR REFERENCE
10.1 Function
A hobby servo is an actuator that moves its output shaft to a commanded position.
A typical positional servo contains a motor, gears, control electronics, and a position-feedback mechanism.

10.2 Common Three-Wire Configuration
A hobby servo commonly has:
- Ground
- Supply voltage
- Control signal
Wire colours are not universal. Verify the actual model and documentation.

10.3 Indicative SG90-Class Characteristics
- Type: Positional micro servo
- Connections: Power, ground, signal
- Control: Timed electrical pulses
- Nominal movement: Often approximately 0–180°, model-dependent
- Common supply range: Often approximately 4.8–6 V, subject to the specific model
- Current demand: Varies with load and can rise substantially during movement or stall
These values are indicative, not guaranteed specifications. The datasheet for the actual servo takes precedence.

10.4 Handling Precautions
Do not force the shaft, block the mechanism, or leave a stalled servo powered.
If the servo becomes hot, buzzes continuously, or causes the controller to reset, disconnect power and investigate the cause.

PAGE 11 — SERVO WIRING AND CONTROL
11.1 Power Connection
The servo supply must match the requirements of the actual motor.
A servo can draw brief current peaks that exceed what an Arduino board's onboard regulator can safely provide.
Follow the approved event wiring arrangement. If a separate servo supply is used, connect the grounds as specified by the circuit design.

11.2 Signal Connection
The signal lead must connect to the Arduino pin specified by the program.
A physically connected signal wire may still be incorrect if it is connected to the wrong pin.

11.3 Servo Does Not Move
Possible causes: Missing power, Missing ground, Incorrect signal connection, Incorrect program pin assignment, Mechanical obstruction, Unstable supply.

11.4 Servo Moves Erratically
Possible causes: Loose signal wire, Missing common ground, Incorrect supply arrangement, Unstable control signal, A mechanical problem.
The chatbot must not instruct participants to randomly swap servo wires to test possible arrangements.

PAGE 12 — SERVO TROUBLESHOOTING PROCEDURE
Symptom A: No Movement
1. Disconnect power.
2. Identify the servo model and its connection labels.
3. Compare the power, ground, and signal connections with the official wiring map.
4. Check whether the signal lead reaches the programmed pin.
5. Check for mechanical obstruction.
6. Obtain supervisor approval before restoring power.

Symptom B: Unpredictable Movement
1. Disconnect power.
2. Inspect the signal connection.
3. Verify the common ground arrangement.
4. Ask the Lab Team to check the expected servo command.
5. Inspect the power arrangement if other components also behave abnormally.

Symptom C: Servo Buzzes or Becomes Hot
Disconnect power immediately. Check for a blocked mechanism. Verify the supply and wiring against the approved reference. Do not repeatedly energise the servo to reproduce the fault.

Symptom D: Controller Resets During Movement
Stop testing and report the symptom. A supply-current problem or poor connection may be responsible.

PAGE 13 — LED INDICATOR REFERENCE
13.1 Function
An LED (Light-Emitting Diode) produces light when current flows through it in the correct direction. It may indicate system status, an event state, or a programmed output.

13.2 Polarity
- Anode: positive side (often longer lead)
- Cathode: negative side (often flat edge on package)
These clues may be unavailable if leads have been trimmed.

13.3 Current-Limiting Resistor
An LED normally requires a series current-limiting resistor. The event circuit should already contain the appropriate resistor. Never bypass the resistor or connect an LED directly across the supply without suitable current limiting.

13.4 LED Does Not Illuminate
Check: LED polarity, Presence and placement of the resistor, Ground connection, Control pin assignment, Programmed output state.

PAGE 14 — BREADBOARD AND JUMPER WIRES
14.1 Breadboard Layout
A solderless breadboard contains internal metal contacts that connect specific groups of holes: terminal strips, a central separation channel, and power rails along the sides. Some power rails are interrupted midway.

14.2 Common Wiring Errors
- Wire inserted into the wrong row
- Wire placed on opposite side of central channel
- Power rail assumed to be continuous when it is not
- Jumper inserted loosely
- Signal wire connected to neighbouring pin
- Wire disconnected from one endpoint

14.3 Inspection Method
Disconnect power. Identify start and destination. Trace against official diagram. Check exact breadboard row. Correct only when intended path is known.

PAGE 15 — FAULT F01: LCD BRIGHTNESS INCORRECT
Component: LCD | Category: Display or backlight fault
Possible Symptoms: LCD backlight is excessively bright or dim, text difficult to read, display appears blank despite illumination.
Diagnostic Questions to ask: Is backlight too bright or too dim? Can you see any characters? Is the problem limited to the LCD? Has contrast control been adjusted?
Corrective Procedure: Disconnect power. Identify if fault is backlight brightness or character contrast. Inspect circuit using official wiring map. Check resistor, driver, or control connection. Correct only confirmed fault. Obtain supervisor approval before restoring power. Verify display.
Rule: Changing contrast does not necessarily correct a backlight brightness problem.

PAGE 16 — FAULT F02: MISPLACED WIRES
Category: Incorrect connection
Definition: A misplaced wire is connected to the wrong pin, breadboard row, or power rail.
Possible Symptoms: LCD text missing or garbled, servo does not move, LED behaves incorrectly, several components malfunction, short circuit.
Corrective Procedure: Disconnect power. Identify affected component. Determine correct source and destination. Compare with official diagram. Inspect row and power-rail layout. Move only confirmed misplaced wire. Request supervisor verification. Test affected component.
Rule: Chatbot must never state "move wire to D9" or another specific pin unless approved configuration confirms that destination.

PAGE 17 — FAULT F03: REVERSED POWER POLARITY
Category: Power supply fault
Definition: Supply polarity is reversed when positive and negative connections are swapped.
Risk: Reverse polarity can damage Arduino, LCD, servo, and other components.
Safe Diagnostic Procedure: Do not energise circuit. Disconnect power source. Read polarity markings on supply. Trace supply connections against approved diagram. Correct polarity while unpowered. Request supervisor verification. Restore power only after approval.
Prohibited: Do not power circuit to see if polarity is correct. Do not use trial and error. If circuit was already energised with reversed polarity, disconnect immediately and report to supervisor.

PAGE 18 — FAULT F04: SERVO WIRES SWAPPED
Component: Servo motor | Category: Incorrect wiring
Definition: Servo power, ground, or signal leads connected to incorrect points.
Possible Symptoms: Servo does not move or behaves unpredictably, Arduino resets, component becomes hot, continuous buzzing.
Corrective Procedure: Disconnect power immediately. Identify exact servo model. Determine leads from documentation. Trace intended connections using official map. Correct error. Request supervisor verification. Restore power only when authorised.
Critical Safety Rule: Never swap servo leads while powered. Never connect supply lead to a signal pin. Wire colours alone are insufficient to confirm connection.

PAGE 19 — FAULT F05: DISCONNECTED WIRES
Category: Open circuit
Definition: A disconnected wire interrupts the intended electrical path.
Possible Symptoms: Component stops working, circuit works intermittently, servo loses power/signal, LCD becomes blank, LED off.
Corrective Procedure: Disconnect power. Identify malfunctioning component. Inspect connections for loose/missing endpoint. Compare path with official diagram. Reconnect to correct points. Verify ends are secure. Request supervisor approval.

PAGE 20 — FAULT F06: CUT JUMPER WIRES
Category: Deliberate open circuit
Definition: A jumper wire has been intentionally cut, interrupting electrical path. Replacement jumpers are supplied.
Corrective Procedure: Disconnect power. Identify affected component. Trace damaged wire's original endpoints using official wiring diagram. Select replacement jumper. Connect between original intended endpoints. Check routing. Request supervisor approval before testing.
Chatbot Rule: If original endpoints cannot be identified, chatbot must ask participant to provide location or consult wiring map. Never invent connections.

PAGE 21 — POWER AND GROUND DIAGNOSTICS
21.1 Common Symptoms:
- Several components fail together: Shared power or ground problem
- Servo movement causes resets: Supply instability or excessive current demand
- LCD backlight works but text does not: Contrast, data/control, or initialisation issue
- Circuit works intermittently: Loose or disconnected connection
- Component becomes hot: Incorrect wiring, overload, or component damage
Inspection Sequence: Disconnect power. Confirm approved supply. Inspect polarity. Inspect ground path and power-rail continuity. Check signal connections. Obtain supervisor verification before restoring power.

PAGE 22 — SYSTEMATIC DEBUGGING METHOD
Step 1: Observe (record what is happening)
Step 2: Identify the Scope (one vs multiple components)
Step 3: Isolate Circuit (disconnect power before inspecting wiring)
Step 4: Consult Reference (wiring map and component docs)
Step 5: Form a Hypothesis (based on observed evidence)
Step 6: Correct One Fault at a time
Step 7: Verify (restore power ONLY after supervisor approves)
Step 8: Record the Result
Step 9: Communicate (share with other sub-team)
Golden Rule: Every correction must be supported by wiring reference or confirmed fault.

PAGE 23 — LCD DIAGNOSTIC DECISION TREE
- No backlight: Investigate backlight supply, connection, polarity, resistor/driver.
- Backlight on, blank screen: Investigate contrast, supply/ground, control/data wiring, initialisation.
- Dark blocks: Check contrast adjustment and LCD initialisation.
- Text faint: Determine if backlight brightness or contrast issue.
- Random characters: Inspect data wiring, loose connections, ground, supply stability.
- Display changes when wires moved: Suspect loose/disconnected connection. Disconnect power first.

PAGE 24 — SERVO DIAGNOSTIC DECISION TREE
- Does not move: Check approved power, ground, signal pin, program configuration, mechanical obstruction.
- Twitches or jitters: Inspect signal connection, ground reference, supply stability.
- Causes Arduino to reset: Stop testing, report power/ground issue.
- Moves unexpectedly: Verify commanded position, configured signal pin, mechanical setup.
- Buzzes continuously / hot: Disconnect power immediately. Inspect for blocked mechanism or incorrect wiring.
- Wires appear swapped: Do not test by trial and error. Identify leads using documentation and wiring diagram.

PAGE 25 & 26 — AVIATION BLACK BOX REFERENCE & PRINCIPLES
- Flight Data Recorder (FDR) & Cockpit Voice Recorder (CVR) assist investigators in reconstructing events.
- Typically painted high-visibility orange.
- In Mission AI-Impossible, the locked steel box is a fictional prop inspired by flight recorders. The circuit represents an electronic control unit under investigation.
- Evidence-Based Diagnosis: Observation -> Hypothesis -> Safe Test -> Result -> Conclusion.
- Team communication via walkie-talkie: Component, symptom, checks completed, pin/wire info, specific question for other team.

PAGE 27 — TECHNICAL GLOSSARY
- Arduino, Breadboard, Common ground, Contrast, DC, GPIO, GND, LCD, LED, Open circuit, Polarity, PWM, Servo, Signal wire, Short circuit, Datasheet, FDR, CVR, Fault isolation, Verification.

PAGE 28 & 29 — FAULT REPORT & FINAL VERIFICATION
Final circuit verification checks with supervisor:
- Supply type and polarity verified, power/ground match diagram, misplaced/disconnected/cut wires resolved, servo leads verified, no shorts.
- LCD backlight, contrast, and display operating.
- LED operating with current-limiting resistor.
- Servo responding without abnormal heat/buzzing.
- Final status: PASS / NEEDS REVIEW. Final verification code obtained and submitted on website.

PAGE 30 — AI CHATBOT KNOWLEDGE BASE AND RESPONSE RULES
30.1 Role: Circuit-troubleshooting assistant for Mission AI-Impossible. Helps diagnose symptoms and correct faults using approved configuration.
30.2 Supported Fault Categories: F01 (LCD Brightness/Contrast), F02 (Misplaced Wire), F03 (Reversed Power Polarity), F04 (Servo Wires Swapped), F05 (Disconnected Wire), F06 (Cut Jumper Wire).
30.3 Required Response Structure:
1. Likely issue (brief, cautious)
2. Confirm the symptom (short clarifying question if needed)
3. Safety instruction (ALWAYS disconnect power before inspecting/changing wiring)
4. Diagnostic steps (numbered, in order)
5. Corrective action (using official wiring reference)
6. Verification (check after supervisor approves restoring power)
7. Escalation (direct to Lab Team or event supervisor if pin map missing or unresolved)
30.4 Strict Rules:
- Source of truth is this manual and official circuit configuration.
- Never invent pin assignments, never guess wire colours.
- Never instruct to energise reversed polarity or swap powered servo connections.
- Never recommend bypassing an LED resistor.
- Do not answer anything out of scope of this manual.`;

export const OFFICIAL_USER_MANUAL_SECTIONS: ManualSection[] = [
  {
    id: 'brief',
    title: 'PAGES 1-4: MISSION BRIEF & ARCHITECTURE',
    subtitle: 'System Overview, Objectives & Safety Rules',
    content: `MISSION AI-IMPOSSIBLE — TECHNICAL USER MANUAL & CIRCUIT TROUBLESHOOTING GUIDE
Organised by: IEEE Student Branch, Symbiosis Institute of Technology (SIT), Pune
Event: SymbiTech – Technical Fest of SIT Pune
System: Arduino-Based Electronic Control Unit | Version: 1.0

1. MISSION BRIEF & OBJECTIVES
A simulated electronic control unit has been recovered from a secured black box. The unit contains an Arduino-compatible microcontroller, an LCD, a servo motor, an LED, a breadboard, and jumper wires.
The system is not functioning as expected. Participants must inspect the circuit, identify the faults, consult the technical documentation, and restore normal operation.

Objectives:
- Understand component functions (Arduino, LCD, Servo, LED, Breadboard).
- Identify incorrect, missing, damaged, or reversed connections.
- Use observable symptoms to systematically narrow down causes.
- Correct faults using the approved wiring reference.
- Verify circuit operation and obtain final verification code.

2. SEQUENCE OF TROUBLESHOOTING
1. Observe the circuit without changing anything.
2. Identify the component exhibiting abnormal behaviour.
3. Describe the symptoms to the AI chatbot.
4. Consult relevant section of this manual.
5. Disconnect power before inspecting or modifying wiring.
6. Compare wiring with official circuit diagram.
7. Correct one fault at a time.
8. Request supervisor approval before restoring power.
9. Test circuit and report result.

3. CRITICAL SAFETY INSTRUCTIONS
- Use only power sources approved by event organisers.
- ALWAYS disconnect power before moving, replacing, or repairing wires.
- Never connect mains voltage to the breadboard or Arduino circuit.
- Never short positive supply to ground.
- Do not energise a circuit with suspected reversed supply polarity.
- Do not force the servo motor shaft by hand.
- Stop immediately if a component becomes unusually hot or emits an unusual smell.`
  },
  {
    id: 'hardware',
    title: 'PAGES 5-14: COMPONENT REFERENCES',
    subtitle: 'Arduino, LCD (Parallel/I2C), Servo Motor, LED & Breadboard',
    content: `HARDWARE COMPONENT TECHNICAL SPECIFICATIONS & DIAGNOSTICS

1. ARDUINO CONTROLLER (PAGES 5-6)
- Digital pins D0–D13, Analogue inputs A0–A5, Regulated 5V & GND rails.
- Common failure causes: Missing power/ground, incorrect signal pin assignment, loose breadboard placement, unstable supply, software/hardware pin mismatch.
- Chatbot rule: Never assume a component is connected to a specific pin unless the official circuit configuration confirms it.

2. LCD DISPLAY MODULE (PAGES 7-9)
- Common character LCD: 16 columns x 2 rows (16x2).
- Parallel pinout: VSS (GND), VDD (5V), V0 (Contrast), RS, R/W, E, D0–D7, LED+/A, LED-/K.
- I2C module: 4 pins (VCC, GND, SDA, SCL).
- Brightness vs Contrast: Backlight illuminates the screen; contrast controls character clarity against the background (potentiometer). A lit backlight does NOT guarantee correct data or initialisation!
- Symptoms:
  * Backlight too dim/bright: Inspect backlight supply, resistor, driver or PWM setting.
  * Backlight on, blank / dark blocks: Check contrast potentiometer, VDD/VSS, RS/E/data pins, and program initialisation.
  * Random characters: Loose wiring, bad data lines, missing common ground, power fluctuation.

3. SERVO MOTOR (PAGES 10-12)
- Actuator with internal gears, motor, feedback pot & control board (SG90 micro servo class: 4.8-6V, timed pulse control, ~0-180°).
- Connections: Power (VCC), Ground (GND), Signal (PWM from controller).
- Current demand: Can draw peak current exceeding Arduino onboard regulator capacity. If separate supply is used, grounds must be connected together (Common Ground).
- Symptoms:
  * No movement: Missing power/ground, wrong signal pin, mechanical jam.
  * Erratic twitching / jitter: Loose signal wire, missing common ground, unstable supply.
  * Controller resets when servo moves: Insufficient supply current or drop on the 5V line.
  * Buzzing / hot: Immediately disconnect power! Blocked gear mechanism or miswired leads. Never swap wires while powered!

4. LED INDICATOR (PAGE 13)
- Anode (+) longer lead, Cathode (-) flat package edge.
- Always requires series current-limiting resistor. Never connect LED directly across supply without resistor!

5. BREADBOARD & JUMPERS (PAGE 14)
- Terminal rows and side power buses. Beware of split/interrupted power rails on some breadboards.
- Inspect row alignment carefully; a wire in an adjacent row is an open circuit.`
  },
  {
    id: 'faults',
    title: 'PAGES 15-20: FAULT CATALOGUE (F01–F06)',
    subtitle: 'Official Diagnostic & Corrective Procedures',
    content: `OFFICIAL FAULT CATALOGUE & STEP-BY-STEP PROCEDURES

FAULT F01: LCD BRIGHTNESS OR CONTRAST INCORRECT
- Symptoms: Backlight too dim, too bright, or screen blank despite illumination.
- Action: Disconnect power. Clarify whether issue is illumination (backlight) or character contrast. Inspect potentiometer/resistor. Request supervisor verification before re-energising.

FAULT F02: MISPLACED WIRES
- Symptoms: Component unresponsive, garbled LCD text, servo not moving, unexpected short circuit.
- Action: Disconnect power. Compare source and destination endpoints against official diagram. Move only confirmed misplaced wire. Do not guess pin numbers.

FAULT F03: REVERSED POWER POLARITY
- Danger: Swapped positive and negative supply leads will destroy semiconductors!
- Action: DO NOT ENERGISE. Disconnect supply immediately. Trace polarity markings. Correct wiring while unpowered. Must have supervisor sign-off before powering.

FAULT F04: SERVO WIRES SWAPPED
- Symptoms: Servo buzzing, overheating, controller resetting, erratic operation.
- Action: Disconnect power immediately. Identify exact lead definitions from servo datasheet. Re-wire to power, ground, and PWM signal pin. Never test combinations while powered.

FAULT F05: DISCONNECTED WIRES
- Symptoms: Component dead or intermittent.
- Action: Disconnect power. Inspect loose jumper endpoints. Trace back to correct breadboard row or header pin according to schematic.

FAULT F06: CUT JUMPER WIRES
- Symptoms: Complete open circuit on a specific line.
- Action: Disconnect power. Identify both severed endpoints. Replace with an approved replacement jumper wire between the exact same endpoints. Supervisor must inspect before test.`
  },
  {
    id: 'decision_trees',
    title: 'PAGES 21-24: DIAGNOSTIC DECISION TREES',
    subtitle: 'Power Diagnostics, Systematic Debugging & Decision Trees',
    content: `DECISION TREES & 9-STEP DEBUGGING METHOD (PAGES 21-24)

SYSTEMATIC 9-STEP DEBUGGING:
1. Observe: Record exact symptom (e.g. "Backlight is on, no text visible").
2. Scope: Affects one component or entire system?
3. Isolate: Disconnect power before touching any wires!
4. Consult: Reference schematic and manual.
5. Hypothesize: Form evidence-based explanation.
6. Correct: Change ONE connection at a time.
7. Verify: Request supervisor inspection BEFORE restoring power.
8. Record: Document changes and outcome.
9. Communicate: Update other sub-team via walkie-talkie.

LCD DECISION TREE:
- No backlight -> Check backlight supply, polarity, series resistor.
- Backlight on, blank screen -> Adjust contrast pot, verify VDD/VSS & control lines.
- Dark blocks -> Adjust contrast pot, verify controller initialisation code.
- Faint text -> Differentiate backlight vs contrast pot.
- Random characters -> Check data wires D4-D7, common ground, supply ripple.

SERVO DECISION TREE:
- No movement -> Verify supply voltage, ground, signal pin assignment, check for mechanical jam.
- Jitter / twitching -> Check signal wire, ensure shared common ground with Arduino.
- Controller resets -> Supply voltage dip from current spike. Separate supply needed.
- Buzzing / overheating -> Emergency disconnect! Check gear obstruction or crossed leads.`
  },
  {
    id: 'verification',
    title: 'PAGES 25-30: AI RULES & FINAL VERIFICATION',
    subtitle: 'Aviation Principles, Glossary & Supervisor Verification',
    content: `AI CHATBOT PROTOCOL & FINAL MISSION VERIFICATION (PAGES 25-30)

PAGE 29 FINAL SUPERVISOR VERIFICATION CHECKLIST:
1. Power & Wiring: Supply polarity checked, power/ground rails verified, no short circuits, servo leads safe.
2. LCD: Backlight functional, contrast adjusted, readable status message displayed.
3. LED: Illuminated as per program state with intact current-limiting resistor.
4. Servo: Smooth positional movement without buzzing or overheating.
5. Final Code Submission: Upon supervisor PASS sign-off, enter the final code into the submission portal to stop the timer.

PAGE 30 AI CHATBOT STRICT RESPONSE MANDATES:
1. Format: Likely issue -> Confirm symptom -> Safety instruction -> Diagnostic steps -> Corrective action -> Verification -> Escalation.
2. Zero Hallucination: Never invent pin numbers or wire colours.
3. Strict Safety: ALWAYS instruct participants to disconnect power before wiring. Never suggest testing reversed polarity or swapping powered wires.`
  }
];
