export interface ManualSection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

export const OFFICIAL_USER_MANUAL_TEXT = `MISSION AI-IMPOSSIBLE
ARDUINO CIRCUIT TROUBLESHOOTING MANUAL
Participant edition | Circuit 1 and Circuit 2
A structured, chatbot-readable guide to diagnosing LEDs, push buttons, buzzers, signal wires, and ground connections.
Symbiosis IEEE Student Branch • Symbiosis Institute of Technology, Pune

IMPORTANT: Do not change the program unless the event facilitator specifically tells you to. This challenge is designed to be solved by inspecting and correcting hardware connections.

POWER RULE: Keep the USB cable disconnected from the power bank while inspecting or changing any wire. Connect power only after the circuit has been checked.

How to use this manual
This manual is deliberately detailed. Use the symptom that best matches what you observe, then follow the numbered checks in order. The same troubleshooting principles apply to both circuits, but the digital-pin numbers differ.
1. Read the safety section before touching the circuit.
2. Identify whether your board is Circuit 1 or Circuit 2 from the pin map.
3. Disconnect the power bank before moving wires, reversing an LED, or reconnecting ground.
4. Check one fault at a time. Do not randomly move several wires.
5. After fixing a fault, ask the facilitator before reconnecting power if event rules require approval.
6. If the circuit still does not work, use the symptom table and report exactly what you observed.

Quick answer for the chatbot:
If a participant asks, 'What should I do first?', answer: Disconnect the power bank, identify the circuit and pin map, inspect the Arduino digital-pin wires, check LED polarity and series resistors, confirm the common GND connection, then reconnect power only after the circuit is safe.

Scope and intended behavior:
In both circuits, two LEDs should remain ON continuously. The buzzer should sound only while the push button is pressed. Releasing the button should stop the buzzer. The participant should troubleshoot hardware only; the supplied program is assumed to be correct.

| Circuit   | LED 1 | LED 2 | Push button | Buzzer |
|-----------|-------|-------|-------------|--------|
| Circuit 1 | D8    | D9    | D2 to GND   | D3     |
| Circuit 2 | D5    | D6    | D7 to GND   | D8     |

1. Safety rules before troubleshooting
Safety is the first troubleshooting step. A power bank can supply enough current to damage a wrongly wired component even though the circuit is low voltage.
- Disconnect the USB cable from the power bank before touching, removing, or inserting any jumper wire.
- Never reverse battery or power-bank polarity. In this setup, the power bank connects to the Nano through its USB port; do not connect the power bank's output wires directly to the breadboard.
- Do not connect 5V directly to GND. This is a short circuit.
- Each LED must have its own current-limiting resistor, normally 220–330 ohms for this activity.
- Do not let loose jumper ends touch each other or bridge adjacent pins.
- Do not force a wire into the Nano or breadboard. If a component feels stuck, ask the facilitator.
- If anything becomes hot, smells unusual, flickers unexpectedly, or the board resets repeatedly, disconnect power immediately and call the facilitator.
- Do not troubleshoot a wet, damaged, or visibly burnt board.

Power-off rule:
Power OFF means the USB cable is physically disconnected from the power bank. Merely releasing the button or turning off a power bank switch is not enough if the board is still powered through another cable.

Safe order of work:
1. Disconnect USB from the power bank.
2. Inspect the circuit without moving anything at first.
3. Compare every connection against the correct circuit map.
4. Correct one confirmed problem at a time.
5. Check for loose wires, stray strands, and accidental 5V-to-GND contact.
6. Ask for facilitator approval if required.
7. Connect the Nano to the power bank using the USB cable.
8. Observe the LEDs and test the button.

2. Identify the circuit you have
Do not use Circuit 1 pin numbers when troubleshooting Circuit 2. The two circuits perform the same job but use different Nano digital pins.

Circuit 1 — pin map:
- LED 1 signal: D8 through a 220–330 Ω resistor to LED anode (Expected: LED stays ON)
- LED 2 signal: D9 through a 220–330 Ω resistor to LED anode (Expected: LED stays ON)
- Button input: Push button between D2 and GND (Expected: Pressed = LOW; released = HIGH internally)
- Buzzer signal: Buzzer + to D3; buzzer − to GND (Expected: Sounds only while button is pressed)
- Common ground: Nano GND to breadboard ground rail / component ground (Expected: Completes current paths)

Circuit 2 — pin map:
- LED 1 signal: D5 through a 220–330 Ω resistor to LED anode (Expected: LED stays ON)
- LED 2 signal: D6 through a 220–330 Ω resistor to LED anode (Expected: LED stays ON)
- Button input: Push button between D7 and GND (Expected: Pressed = LOW; released = HIGH internally)
- Buzzer signal: Buzzer + to D8; buzzer − to GND (Expected: Sounds only while button is pressed)
- Common ground: Nano GND to breadboard ground rail / component ground (Expected: Completes current paths)

Important: Circuit 2 uses D8 for the buzzer. Circuit 1 uses D8 for LED 1. Always identify the circuit before deciding whether a D8 connection is correct.

3. Understand the basic parts
- Arduino Nano: The controller. Its digital pins provide signals to the LEDs and buzzer and read the push button. The board also needs a shared ground path for the circuit to behave predictably.
- Digital pin: A numbered connection such as D2, D3, D5, D6, D7, D8, or D9. A jumper wire that is disconnected from the required pin leaves that part of the circuit without its intended signal.
- LED and polarity: An LED is a light-emitting diode, allowing current to flow in one direction. The longer leg is usually the anode (+); the shorter leg is usually the cathode (−). The flat edge on the LED body usually marks the cathode. If reversed, it may not light even when the signal and resistor are correct.
- Resistor: In series with each LED limits current (220–330 Ω). Do not remove or bypass it.
- Push button: Wired between assigned digital pin and GND using INPUT_PULLUP (reads HIGH when released, LOW when pressed).
- Buzzer: Active buzzer compatible with Arduino output. Positive terminal connects to assigned digital pin; negative terminal to GND.
- Ground (GND): The common reference and return path. A ground rail is useful only if connected to a Nano GND pin.

4. Understand the expected behavior
| Situation | LED 1 | LED 2 | Buzzer |
|-----------|-------|-------|--------|
| Power connected; button released | ON | ON | OFF |
| Power connected; button pressed  | ON | ON | ON  |
| Button released again            | ON | ON | OFF |
| USB disconnected                 | OFF| OFF| OFF |

The LEDs are not meant to blink. They should remain on while the Nano is powered. The buzzer is the only part controlled by the button.

5. Troubleshooting decision tree
- Is USB disconnected from the power bank before handling wires? If no, disconnect it first.
- Are both LEDs off? Check common GND, both LED polarities, resistors, and the two LED signal wires.
- Is only one LED off? Check that LED's assigned digital-pin wire, resistor, polarity, and breadboard row.
- Are both LEDs on but buzzer does not sound when pressed? Check button signal wire, button placement, buzzer signal wire, buzzer polarity, and ground.
- Does buzzer sound without pressing button? Check whether button is stuck, misplaced, or permanently connecting the signal pin to GND.
- Does nothing work or board resets? Disconnect power immediately, inspect for short circuit or loose power/ground wiring, and call facilitator.

6. Fault type A — Digital-pin wire disconnected
- Circuit 1 pins: LED 1 = D8, LED 2 = D9, Button = D2, Buzzer = D3.
- Circuit 2 pins: LED 1 = D5, LED 2 = D6, Button = D7, Buzzer = D8.
- Repair: Disconnect USB power. Locate component. Reconnect jumper to documented pin socket and row. Reconnect power after verification.

7. Fault type B — LED reversed
- Anode (+) = longer leg; Cathode (−) = shorter leg / flat edge.
- Repair: Disconnect USB power. Rotate LED so anode faces signal/resistor and cathode faces GND. Never remove or bypass series resistor.

8. Fault type C — Ground connection disconnected
- Symptoms: Both LEDs off, button fails, buzzer fails, or multi-component failure.
- Repair: Disconnect USB power. Follow jumper from Nano GND to breadboard ground rail. Ensure all component grounds return to Nano GND. Never connect 5V to GND!

9. Fault type D — Combined or partial faults
- Tackle independent faults one at a time.
- Power off before any change. Verify circuit after each step.

10. Circuit 1 detailed wiring reference
- LED 1: Nano D8 through 220–330 Ω resistor to LED anode; cathode to GND.
- LED 2: Nano D9 through 220–330 Ω resistor to LED anode; cathode to GND.
- Push button: One side to Nano D2, other side to GND (INPUT_PULLUP).
- Active buzzer: Positive (+) to Nano D3, negative (−) to GND.
- Ground reference: Nano GND to ground rail.

11. Circuit 2 detailed wiring reference
- LED 1: Nano D5 through 220–330 Ω resistor to LED anode; cathode to GND.
- LED 2: Nano D6 through 220–330 Ω resistor to LED anode; cathode to GND.
- Push button: One side to Nano D7, other side to GND (INPUT_PULLUP).
- Active buzzer: Positive (+) to Nano D8, negative (−) to GND.
- Ground reference: Nano GND to ground rail.

12. Power bank connection procedure
- Inspect while disconnected.
- Plug USB cable from power bank into Nano only when wiring is confirmed.
- Verify: Both LEDs ON, buzzer silent when button released, sounds when pressed.

13. Symptoms and likely causes summary
- Both LEDs off, buzzer works: LED pin wires, polarities, resistors, or local LED ground.
- Only LED 1 off: LED 1 pin wire, polarity, resistor, or row.
- Buzzer never sounds: Button wire/placement, buzzer signal wire, buzzer polarity, or ground.
- Buzzer always sounds: Button stuck, miswired, or permanently grounded.
- Board resets / heats up: Short circuit! Disconnect power immediately and call facilitator.

14. Breadboard inspection & button placement
- 4-leg tactile buttons often have paired pins; straddle centre trench so pressing connects intended sides.
- Do not trust rail colours blindly; trace wire path to Nano GND.

15. Participant checklist & final functional test
- Pass criteria: Both LEDs ON continuously; buzzer silent released, active pressed; no heating or resets.
- Enter secret supervisor verification code once complete to stop mission clock.`;

export const OFFICIAL_USER_MANUAL_SECTIONS: ManualSection[] = [
  {
    id: 'overview',
    title: 'SECTIONS 1–4: OVERVIEW & PIN MAPS',
    subtitle: 'Participant Edition | Circuit 1 & Circuit 2 Specifications',
    content: `MISSION AI-IMPOSSIBLE: ARDUINO CIRCUIT TROUBLESHOOTING MANUAL
Symbiosis IEEE Student Branch • Symbiosis Institute of Technology, Pune

SCOPE & INTENDED BEHAVIOR:
In both circuits, two LEDs should remain ON continuously. The buzzer should sound only while the push button is pressed. Releasing the button should stop the buzzer. The participant should troubleshoot hardware only; the supplied program is assumed to be correct.

PIN SPECIFICATION MAP:
| Circuit   | LED 1 | LED 2 | Push Button | Buzzer |
|-----------|-------|-------|-------------|--------|
| Circuit 1 | D8    | D9    | D2 to GND   | D3     |
| Circuit 2 | D5    | D6    | D7 to GND   | D8     |

CRITICAL SAFETY & POWER RULES:
1. Disconnect the USB cable from the power bank before touching, removing, or inserting any jumper wire.
2. Never reverse power bank polarity. Connect only via Nano USB port.
3. NEVER connect 5V directly to GND (Short Circuit).
4. Each LED MUST have its own 220–330 Ω series resistor.
5. If anything becomes hot, smells unusual, or resets repeatedly, disconnect power immediately and call the facilitator!
6. Do not modify the Arduino program unless explicitly told to do so.`
  },
  {
    id: 'fault_types',
    title: 'SECTIONS 5–9: FAULT DIAGNOSTICS A–D',
    subtitle: 'Disconnected Pins, Reversed LEDs, Ground Faults & Combined Issues',
    content: `FAULT DIAGNOSTIC TAXONOMY (SECTIONS 5–9):

FAULT TYPE A: A DIGITAL-PIN WIRE IS DISCONNECTED
- Symptoms: One LED stays off while other works, buzzer fails to respond, or component works intermittently.
- Circuit 1 Pins: LED 1 = D8 | LED 2 = D9 | Button = D2 | Buzzer = D3
- Circuit 2 Pins: LED 1 = D5 | LED 2 = D6 | Button = D7 | Buzzer = D8
- Procedure: Disconnect power bank USB -> Locate component -> Reconnect jumper to documented Nano digital pin -> Verify resistor & ground -> Re-apply power.

FAULT TYPE B: AN LED IS REVERSED
- Symptoms: One LED is dark despite signal wire and resistor being connected.
- Polarity: Longer leg = Anode (+); Shorter leg / flat edge = Cathode (-).
- Procedure: Disconnect power bank USB -> Rotate LED so Anode connects to resistor/pin and Cathode connects to GND rail -> Never remove resistor -> Re-apply power.

FAULT TYPE C: A GROUND CONNECTION IS DISCONNECTED
- Symptoms: Both LEDs off, button unresponsive, buzzer silent, or multiple components failing together.
- Procedure: Disconnect power bank USB -> Trace jumper from Nano GND to breadboard ground rail -> Confirm all cathodes, button return, and buzzer negative share this rail -> Reconnect -> Re-apply power.
- Caution: Never connect 5V to GND to "test" ground!

FAULT TYPE D: COMBINED OR PARTIAL FAULTS
- Tackle one confirmed problem at a time.
- Power off before every wiring change. Re-verify the circuit against the full pin map.`
  },
  {
    id: 'wiring_ref',
    title: 'SECTIONS 10–13: DETAILED WIRING REFERENCE',
    subtitle: 'Circuit 1 vs Circuit 2 Schematics & Symptom Table',
    content: `CIRCUIT 1 DETAILED WIRING:
- LED 1: Nano D8 through 220–330 Ω resistor to LED Anode; Cathode to GND rail.
- LED 2: Nano D9 through 220–330 Ω resistor to LED Anode; Cathode to GND rail.
- Button: One terminal to Nano D2; other terminal to GND rail (code uses INPUT_PULLUP).
- Buzzer: Positive (+) terminal to Nano D3; negative (-) terminal to GND rail.
- Common Ground: Nano GND pin to breadboard GND rail.

CIRCUIT 2 DETAILED WIRING:
- LED 1: Nano D5 through 220–330 Ω resistor to LED Anode; Cathode to GND rail.
- LED 2: Nano D6 through 220–330 Ω resistor to LED Anode; Cathode to GND rail.
- Button: One terminal to Nano D7; other terminal to GND rail (code uses INPUT_PULLUP).
- Buzzer: Positive (+) terminal to Nano D8; negative (-) terminal to GND rail.
- Common Ground: Nano GND pin to breadboard GND rail.
*Important: In Circuit 2, D8 is for Buzzer! In Circuit 1, D8 is for LED 1. Always verify which circuit you have before changing wires!

SYMPTOMS & LIKELY CAUSES:
- Both LEDs off, buzzer works -> Check both LED pin wires, LED polarities, resistors, or local LED ground.
- Only LED 1 off -> Check LED 1 pin wire, polarity, resistor, or row.
- Buzzer never sounds -> Check button wiring (D2/D7 to GND), button placement, buzzer signal wire (D3/D8), buzzer polarity, or ground.
- Buzzer always sounds -> Button is stuck, miswired, or button signal pin is permanently shorted to GND.
- Board resets / components heat up -> Short circuit! Disconnect power immediately and call the facilitator!`
  },
  {
    id: 'guidance',
    title: 'SECTIONS 14–20: BREADBOARD & TESTING',
    subtitle: 'Breadboard Rows, Button Straddling, Power Bank & Final Test',
    content: `BREADBOARD INSPECTION & TESTING GUIDE (SECTIONS 14–20):

BREADBOARD ROW RULES:
- Terminal strips: 5 connected holes per row. Components in the same row are electrically joined.
- Centre Trench: Separates the two sides. Tactile push buttons MUST straddle this trench so pressing joins the intended circuits without permanent shorts.
- Resistors: Must connect across separate rows in series with the LED. Never insert both resistor legs into the same connected row!

POWER BANK USB CONNECTION:
- Connect USB cable to Nano ONLY after inspecting the circuit while completely unpowered.
- Keep the circuit on a dry, stable surface.
- If anything gets warm or smells unusual, pull the USB cable immediately.

FINAL FUNCTIONAL TEST PROCEDURE (SECTION 20):
1. Connect USB from Nano to power bank -> Nano powers up normally.
2. Leave button released -> Both LEDs remain ON; buzzer OFF.
3. Press and hold button -> Both LEDs remain ON; buzzer ON.
4. Release button -> Both LEDs remain ON; buzzer OFF.
5. Stability -> No heating, smell, resets, or flickering.
6. Upon passing physical inspection, enter supervisor verification code into portal.`
  },
  {
    id: 'chatbot_protocol',
    title: 'SECTIONS 21–29: CHATBOT PROTOCOL & FAQ',
    subtitle: 'AI Operating Guidelines, Dialogues & Verification Rules',
    content: `CHATBOT OPERATING RULES & FAQ (SECTIONS 21–29):

QUICK ANSWER FOR PARTICIPANT FIRST STEP:
"Disconnect the power bank, identify the circuit and pin map, inspect the Arduino digital-pin wires, check LED polarity and series resistors, confirm the common GND connection, then reconnect power only after the circuit is safe."

AI COPILOT RULES:
1. Always mandate disconnecting the USB power bank before wire modifications.
2. Distinguish clearly between Circuit 1 and Circuit 2 pinouts.
3. Never suggest modifying the program code.
4. Never suggest connecting 5V to GND or bypassing LED resistors.
5. Guide participants through one confirmed fault at a time.
6. Escalate immediately to the facilitator if heat, burning smells, or board resets occur.

FINAL SUPERVISOR CODE:
Upon completing all physical circuit repairs and verifying proper operation, obtain the supervisor code and enter it below to stop the mission timer.`
  }
];
