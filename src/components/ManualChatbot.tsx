import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../lib/audio';
import { 
  Bot, 
  User, 
  Send, 
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

/**
 * Strict, zero-hallucination inference engine based exclusively on
 * the official 30-page "Mission AI-Impossible Technical User Manual & Circuit Troubleshooting Guide".
 *
 * It formats every diagnostic answer in accordance with Section 30.3:
 * 1. Likely issue
 * 2. Confirm the symptom
 * 3. Safety instruction (ALWAYS power off before touching wires)
 * 4. Diagnostic steps
 * 5. Corrective action
 * 6. Verification (supervisor approval required)
 * 7. Escalation
 */
function answerFromManual(rawQuery: string): string {
  const q = rawQuery.toLowerCase().trim();

  // 1. General safety / power rules
  if (q.includes('safety') || q.includes('rule') || q.includes('handling')) {
    return `### 1. Likely Issue: Safety & Circuit Handling Protocol (Manual Page 3)
### 2. Confirm Symptom: Reviewing fundamental event handling and safety constraints.
### 3. Safety Instruction: 
⚠️ **CRITICAL SAFETY DIRECTIVE:** Always disconnect the power source before moving, replacing, or repairing any wire or component. Never short positive supply to ground, and never connect mains voltage to the breadboard.
### 4. Diagnostic Steps:
1. Verify you are using only the low-voltage power source approved by event organizers.
2. Stop immediately if any component becomes unusually hot or produces an abnormal smell.
3. Do not force the servo motor shaft by hand.
### 5. Corrective Action: Inspect and correct all wiring while completely unpowered.
### 6. Verification: Request supervisor inspection and sign-off before restoring power.
### 7. Escalation: If any component exhibits heat or burning smell, report immediately to the event supervisor.`;
  }

  // 2. Reversed polarity (F03)
  if (q.includes('reverse') || q.includes('polarity') || q.includes('f03') || q.includes('wrong power')) {
    return `### 1. Likely Issue: Fault F03 — Reversed Power Polarity (Manual Page 17)
### 2. Confirm Symptom: Have the positive (+) and negative (-) supply leads been swapped or is reversed polarity suspected?
### 3. Safety Instruction:
⚠️ **HAZARDOUS CONDITION:** DO NOT ENERGISE THE CIRCUIT. Disconnect power immediately. Reversed supply polarity can permanently destroy semiconductors including the Arduino, LCD, and servo.
### 4. Diagnostic Steps:
1. Ensure the power source is completely disconnected.
2. Inspect the positive (+) and negative (-) polarity markings on your supply source.
3. Trace both power wires to the breadboard rails and Arduino headers.
4. Compare with the approved circuit diagram.
### 5. Corrective Action:
Correct the supply polarity connections while the circuit remains entirely unpowered. Never use trial-and-error to test polarity.
### 6. Verification:
The circuit MUST NOT be re-energized until an event supervisor has physically verified the correction.
### 7. Escalation:
If the circuit was already energized with reversed polarity, report the incident immediately to the event supervisor for hardware assessment.`;
  }

  // 3. LCD Issues (F01, Decision tree Page 23, Pages 7-9)
  if (q.includes('lcd') || q.includes('screen') || q.includes('display') || q.includes('contrast') || q.includes('backlight') || q.includes('f01')) {
    // Contrast vs Backlight
    if (q.includes('bright') || q.includes('dim') || q.includes('glow')) {
      return `### 1. Likely Issue: Fault F01 — LCD Backlight Brightness Incorrect (Manual Page 8, 15)
### 2. Confirm Symptom: Is the LCD backlight excessively bright, too dim, or unlit, while text readability is secondary?
### 3. Safety Instruction:
⚠️ Disconnect power before inspecting or modifying display wiring.
### 4. Diagnostic Steps:
1. Note that backlight brightness and character contrast are two completely separate circuits.
2. Inspect the backlight connections (Pins LED+ / A and LED- / K on parallel displays).
3. Check whether the module uses an approved series current-limiting resistor, a driver, or PWM control.
4. Do not bypass a required resistor.
### 5. Corrective Action:
Re-route backlight supply through the designated current-limiting resistor or driver according to the official circuit diagram.
### 6. Verification:
Request supervisor verification before restoring power. Confirm display surface is evenly illuminated.
### 7. Escalation:
If PWM control is in use, ask the Lab Team to verify the microcontroller sketch's brightness control setting.`;
    }

    if (q.includes('blank') || q.includes('dark block') || q.includes('black box') || q.includes('no text') || q.includes('read') || q.includes('characters')) {
      return `### 1. Likely Issue: Fault F01 / LCD Initialization & Contrast (Manual Pages 8, 9, 23)
### 2. Confirm Symptom: The backlight is illuminated, but the screen displays dark blocks, faint text, or is completely blank.
### 3. Safety Instruction:
⚠️ Disconnect power before adjusting or touching any control/data jumpers.
### 4. Diagnostic Steps:
1. Recognize that a lit backlight does NOT confirm valid communication or initialisation.
2. If single-row dark blocks appear: check the V0 contrast potentiometer and verify if the Arduino has initialised the display.
3. Verify VDD (5V) and VSS (GND) connections.
4. For parallel displays: check RS, E, and data lines (D4–D7 or D0–D7). For I2C displays: verify VCC, GND, SDA, and SCL.
5. Inspect for loose breadboard rows or missing common ground.
### 5. Corrective Action:
Adjust the contrast potentiometer. If text remains missing, reconnect any loose data wires to their official pin locations.
### 6. Verification:
Obtain supervisor approval, restore power, and verify the welcome status message appears legibly.
### 7. Escalation:
If connections match the schematic but text remains blank, ask the Lab Team to confirm the pin assignments in the uploaded sketch.`;
    }

    return `### 1. Likely Issue: LCD Module Diagnostic Evaluation (Manual Pages 7-9, 23)
### 2. Confirm Symptom: Please specify your exact LCD observation:
- A. No backlight?
- B. Backlight ON, but blank screen?
- C. Dark rectangular blocks on screen?
- D. Text faint / contrast issue?
- E. Random or garbled characters?
### 3. Safety Instruction:
⚠️ Always disconnect power before tracing or reseating any LCD wires.
### 4. Diagnostic Steps:
1. Differentiate backlight (illumination) from contrast (character clarity).
2. Check power (VDD/VCC) and ground (VSS/GND).
3. Check contrast pin (V0) potentiometer.
4. Verify signal lines against the official configuration.
### 5. Corrective Action:
Correct one confirmed loose or misplaced wire at a time.
### 6. Verification:
Have the supervisor verify wiring prior to restoring power.
### 7. Escalation:
Consult the Lab Team if program pin mappings need verification.`;
  }

  // 4. Servo Motor Issues (F04, Pages 10-12, Page 24)
  if (q.includes('servo') || q.includes('motor') || q.includes('f04') || q.includes('shaft')) {
    if (q.includes('buzz') || q.includes('hot') || q.includes('heat') || q.includes('smoke')) {
      return `### 1. Likely Issue: Servo Overload / Swapped Connections (Manual Pages 10, 12, 18, 24)
### 2. Confirm Symptom: The servo motor is buzzing continuously, becoming hot, or causing the Arduino to reset.
### 3. Safety Instruction:
⚠️ **IMMEDIATE SHUTDOWN:** Disconnect power immediately! Do NOT repeatedly energize the servo to reproduce the symptom.
### 4. Diagnostic Steps:
1. Check for physical obstruction blocking the servo output shaft or horn.
2. Never force the servo shaft by hand.
3. Verify servo wire orientation: Ground, Supply Voltage, and Control Signal.
4. Note that wire colors are NOT universal—consult the specific servo datasheet.
### 5. Corrective Action:
Clear any mechanical jam. If leads were swapped, re-wire power, ground, and signal to their designated points while unpowered. Never swap wires while powered!
### 6. Verification:
Request supervisor inspection before re-applying power. Ensure servo shaft moves smoothly without buzzing.
### 7. Escalation:
If the Arduino resets whenever the servo engages, report a supply-current deficit to the supervisor.`;
    }

    if (q.includes('not move') || q.includes('stuck') || q.includes('dead') || q.includes('twitch') || q.includes('jitter')) {
      return `### 1. Likely Issue: Fault F04 / Servo Signal or Ground Fault (Manual Pages 11, 12, 24)
### 2. Confirm Symptom: The servo fails to move or exhibits unpredictable twitching/jittering.
### 3. Safety Instruction:
⚠️ Disconnect power before checking or reseating servo leads. Never connect the supply voltage lead to an Arduino signal pin!
### 4. Diagnostic Steps:
1. Check if the servo has a complete power path (VCC) and ground (GND).
2. Ensure there is a shared Common Ground between the Arduino and the servo supply.
3. Check whether the signal lead is plugged into the exact PWM pin declared in the sketch.
4. Check for mechanical gear jamming.
### 5. Corrective Action:
Reconnect loose signal wires and ensure common ground continuity. Never test lead combinations by random trial and error.
### 6. Verification:
Obtain supervisor clearance before restoring power. Observe if the servo smoothly sweeps to its commanded angle.
### 7. Escalation:
If the signal pin destination is unknown, consult the official circuit configuration on Page 6 or ask the Lab Team.`;
    }

    return `### 1. Likely Issue: Servo Motor Wiring & Control (Manual Pages 10-12, 18, 24)
### 2. Confirm Symptom: What is the observed servo behavior?
- Does it fail to move completely?
- Does it twitch/jitter erratically?
- Does the Arduino reset when it moves?
- Does it buzz continuously or get warm?
### 3. Safety Instruction:
⚠️ Disconnect power immediately. Never force the servo arm by hand and never swap leads on a powered servo.
### 4. Diagnostic Steps:
1. Verify 3 connections: Ground, Supply (4.8V-6V), Signal (PWM pulses).
2. Ensure common ground between Arduino and external servo supply if used.
3. Confirm the control pin matches the official program configuration.
### 5. Corrective Action:
Correct identified misplaced leads against the official schematic.
### 6. Verification:
Have the supervisor verify wiring before restoring power.
### 7. Escalation:
Consult the event supervisor if the motor continues buzzing or drawing excessive current.`;
  }

  // 5. LED Issues (Page 13)
  if (q.includes('led') || q.includes('light') || q.includes('resistor') || q.includes('anode') || q.includes('cathode')) {
    return `### 1. Likely Issue: LED Circuit Configuration & Polarity (Manual Page 13)
### 2. Confirm Symptom: The LED does not illuminate or illuminate unexpectedly.
### 3. Safety Instruction:
⚠️ Disconnect power. **MANDATORY RULE:** Never bypass the series current-limiting resistor or connect an LED directly across power rails without resistance.
### 4. Diagnostic Steps:
1. Check LED polarity: Anode (+) is typically the longer lead; Cathode (-) is the shorter lead / flat edge on the plastic package.
2. Verify the presence and value of the series current-limiting resistor.
3. Inspect ground return and control pin wiring.
4. Confirm whether the program's current state commands the LED ON or OFF.
### 5. Corrective Action:
Orient the anode toward the control pin (through the resistor) and cathode toward ground. Re-insert securely into the breadboard.
### 6. Verification:
Request supervisor verification before re-energizing the circuit.
### 7. Escalation:
Confirm with the Lab Team the expected programmed output state for the LED.`;
  }

  // 6. Cut Jumper Wires (F06, Page 20)
  if (q.includes('cut') || q.includes('broken wire') || q.includes('severed') || q.includes('f06')) {
    return `### 1. Likely Issue: Fault F06 — Cut Jumper Wires (Manual Page 20)
### 2. Confirm Symptom: A jumper wire has been intentionally cut, resulting in a deliberate open circuit.
### 3. Safety Instruction:
⚠️ Disconnect power before removing or installing jumper wires. Do not cut or splice wires while energized.
### 4. Diagnostic Steps:
1. Identify which component or functional section has stopped working.
2. Locate the severed jumper and trace both of its original endpoints.
3. Compare the endpoints with the official wiring diagram.
4. Do not reconnect to nearby arbitrary holes; the replacement must restore the exact intended circuit path.
### 5. Corrective Action:
Remove the damaged wire and connect an approved replacement jumper wire between the exact same original endpoints.
### 6. Verification:
Verify the replacement is secure and correctly seated. Request supervisor approval before turning on power.
### 7. Escalation:
If you cannot determine the original endpoints of the cut wire, consult the official wiring map on Page 6 or ask your supervisor. The chatbot is strictly prohibited from inventing pin locations.`;
  }

  // 7. Misplaced / Disconnected Wires (F02, F05, Page 16, 19)
  if (q.includes('misplaced') || q.includes('loose') || q.includes('disconnected') || q.includes('f02') || q.includes('f05') || q.includes('wrong row') || q.includes('breadboard')) {
    return `### 1. Likely Issue: Fault F02 (Misplaced Wire) / Fault F05 (Disconnected Wire) (Manual Pages 14, 16, 19)
### 2. Confirm Symptom: A jumper is connected to the wrong pin/row, or an endpoint has come loose, causing intermittent or missing functionality.
### 3. Safety Instruction:
⚠️ Always disconnect power before touching, inspecting, or reseating breadboard jumpers.
### 4. Diagnostic Steps:
1. Identify the malfunctioning component and trace each of its wires from source to destination.
2. Check breadboard row alignment: a wire inserted into a neighbouring row is an open circuit.
3. Check for breadboard split power rails (some side power buses are interrupted in the middle).
4. Compare pin numbers with the official circuit configuration.
### 5. Corrective Action:
Move or reconnect only the confirmed misplaced or loose wire. Never guess pin destinations.
### 6. Verification:
Ensure both ends are firmly seated. Request supervisor verification before re-applying power.
### 7. Escalation:
If the destination pin is ambiguous, consult the official pin map on Page 6 or the Lab Team.`;
  }

  // 8. Systematic debugging method (Page 22)
  if (q.includes('debug') || q.includes('method') || q.includes('procedure') || q.includes('step')) {
    return `### 1. Likely Issue: 9-Step Systematic Debugging Method (Manual Page 22)
### 2. Confirm Symptom: Structuring an evidence-based investigation across the sub-teams.
### 3. Safety Instruction:
⚠️ Disconnect power prior to all wiring inspections. Never change multiple wires at once.
### 4. Diagnostic Steps (The Official 9 Steps):
1. **Observe:** Record exactly what is happening (e.g. "Backlight on, no text visible").
2. **Identify Scope:** Does the issue affect one component or multiple modules?
3. **Isolate Circuit:** Disconnect power before touching any wires.
4. **Consult Reference:** Review the component documentation and official wiring map.
5. **Form a Hypothesis:** Deduce plausible causes based on direct evidence.
6. **Correct One Fault:** Make one justified correction at a time.
7. **Verify:** Restore power ONLY after supervisor approves the wiring.
8. **Record Result:** Document whether the symptom cleared or changed.
9. **Communicate:** Relate observations and findings to the other sub-team via walkie-talkie.
### 5. Corrective Action: Apply the 9-step sequence to the active anomaly.
### 6. Verification: Obtain supervisor sign-off before testing.
### 7. Escalation: Contact the event supervisor if progress stalls.`;
  }

  // 9. Black Box Reference & Verification Code (Pages 25, 29)
  if (q.includes('black box') || q.includes('fdr') || q.includes('cvr') || q.includes('code') || q.includes('verification') || q.includes('final')) {
    return `### 1. Likely Issue: Final Circuit Verification & Code Submission (Manual Pages 25, 29)
### 2. Confirm Symptom: Ready for supervisor final audit or seeking verification code submission details.
### 3. Safety Instruction:
⚠️ Ensure all wiring is clean, no exposed conductors or shorts exist, and the circuit is operating stably.
### 4. Diagnostic Steps (Page 29 Verification Checklist):
1. Power & Wiring: Supply type and polarity verified; power and ground match diagram; cut/disconnected wires resolved; servo leads verified.
2. LCD: Backlight functional; contrast adjusted; expected status display text visible.
3. LED: Indicates expected program state with intact current-limiting resistor.
4. Servo: Smooth response to commands without abnormal heating or continuous buzzing.
### 5. Corrective Action:
Present the operating circuit to your event supervisor for final evaluation (PASS / NEEDS REVIEW).
### 6. Verification:
Upon supervisor PASS sign-off, you will obtain the official verification code to submit in the website terminal below.
### 7. Escalation:
Your event supervisor is the authoritative entity for issuing the final verification code upon physical circuit inspection.`;
  }

  // 10. Walkie-talkie / team handover (Page 26, 28)
  if (q.includes('walkie') || q.includes('team') || q.includes('handover') || q.includes('report') || q.includes('lab') || q.includes('classroom')) {
    return `### 1. Likely Issue: Team Handover & Walkie-Talkie Protocol (Manual Pages 26, 28)
### 2. Confirm Symptom: Coordinating diagnostic findings between the Lab Team and Classroom Team.
### 3. Safety Instruction:
⚠️ Never perform unauthorized wiring modifications while receiving unverified instructions over radio.
### 4. Diagnostic Steps (Walkie-Talkie Checklist):
- Component affected (e.g. Servo, LCD, LED).
- Observed symptom (facts only, not assumptions).
- Checks already completed (e.g. "Contrast pot tested, VCC confirmed").
- Relevant pin or wire location.
- Specific, clear question for the other team.
### 5. Corrective Action:
Use the Page 28 Handover Template to communicate verified data and repeat critical instructions.
### 6. Verification:
Inform the partner team once a correction is verified and signed off.
### 7. Escalation:
If radio communications conflict with the written schematic, the supervisor makes the final call.`;
  }

  // Fallback for Out-of-Scope queries (Strict adherence to Section 30.1 & 30.4)
  return `### 1. Likely Issue: Query Out of Scope / Unverified Circuit Data
### 2. Confirm Symptom: "${rawQuery}"
### 3. Safety Instruction:
⚠️ Always ensure the circuit is unpowered before inspecting hardware.
### 4. Diagnostic Steps:
As the official Mission AI-Impossible Circuit Assistant, my knowledge base is strictly limited to the official 30-Page Technical User Manual & Circuit Troubleshooting Guide. I am strictly prohibited from hallucinating pin assignments, guessing wire colours, or providing instructions outside the approved circuit manual.
### 5. Corrective Action:
Please frame your question around:
- **Fault F01:** LCD Brightness or Contrast
- **Fault F02:** Misplaced Wires
- **Fault F03:** Reversed Power Polarity
- **Fault F04:** Servo Wires Swapped
- **Fault F05:** Disconnected Wires
- **Fault F06:** Cut Jumper Wires
- Component checks for **Arduino, LCD, Servo Motor, LED, Breadboard**, or the **9-Step Debugging Procedure**.
### 6. Verification:
Consult your physical circuit manual or request supervisor assistance.
### 7. Escalation:
For specific pinout maps not detailed in the general reference, consult the official circuit configuration on Page 6 or ask your event supervisor.`;
}

export const ManualChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: `### Mission AI-Impossible — Circuit Troubleshooting Assistant Online
Welcome Operative. I am your technical diagnostic copilot for the Arduino-Based Electronic Control Unit recovery challenge (Organised by IEEE SB SIT Pune).

My knowledge is strictly restricted to the **Official Technical User Manual & Circuit Troubleshooting Guide (Pages 1–30)**. I adhere strictly to zero-hallucination protocols and will never guess pin assignments, recommend trial-and-error rewiring, or allow unsafe operations.

Describe the symptom or component anomaly you are observing to begin structured diagnosis.`,
      timestamp: 'NOW',
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    soundFx.playClick();
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'NOW',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = answerFromManual(text);
      soundFx.playClick(1400);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          timestamp: 'NOW',
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  const quickQuestions = [
    'LCD backlight is on but screen is blank or shows dark blocks',
    'Servo motor is buzzing and getting hot',
    'One of the jumper wires is cut (Fault F06)',
    'Suspected reversed power supply polarity (Fault F03)',
    'Explain the 9-step systematic debugging method',
    'What are the checks for final verification (Page 29)?'
  ];

  return (
    <div className="w-full bg-[#0a1124]/95 border-2 border-cyan-400/80 rounded-2xl p-5 md:p-6 shadow-[0_0_40px_rgba(6,182,212,0.35)] backdrop-blur-xl text-white font-mono space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/40 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 border border-cyan-400 rounded-lg text-cyan-300">
            <Bot size={22} />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold tracking-widest text-cyan-300 flex items-center gap-2">
              <span>CIRCUIT TROUBLESHOOTING AI COPILOT</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-200">
                STRICT MANUAL v1.0
              </span>
            </h3>
            <p className="text-[11px] text-gray-400 tracking-wider">
              IEEE SB SIT PUNE // MISSION AI-IMPOSSIBLE KNOWLEDGE BASE (PAGES 1–30)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-emerald-400">ZERO-HALLUCINATION GUARD ON</span>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="flex items-center gap-2 px-3 py-2 bg-amber-950/40 border border-amber-500/40 rounded-lg text-amber-200 text-xs">
        <ShieldAlert size={16} className="text-amber-400 shrink-0" />
        <span>
          <strong>Chatbot Safety Rule:</strong> Always disconnect power before wiring changes. Never swap powered wires or test reversed polarity.
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="h-72 md:h-84 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className={`p-1.5 rounded-lg shrink-0 ${
              msg.sender === 'user' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
            }`}>
              {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div className={`max-w-[90%] p-4 rounded-xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${
              msg.sender === 'user'
                ? 'bg-yellow-950/60 border border-yellow-500/60 text-yellow-100 font-semibold'
                : 'bg-black/80 border border-cyan-500/40 text-gray-200 shadow-inner'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-cyan-400 text-xs p-2">
            <span className="animate-spin">⚙️</span>
            <span>Consulting official 30-Page Technical Circuit Manual...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions Pills */}
      <div>
        <div className="text-[11px] font-bold text-gray-400 tracking-wider mb-2 flex items-center gap-1.5">
          <HelpCircle size={13} className="text-cyan-400" />
          <span>OFFICIAL MANUAL FAULT QUERIES (PAGES 1-30):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-3 py-1.5 bg-cyan-950/60 hover:bg-cyan-900/90 border border-cyan-500/40 hover:border-cyan-400 rounded-lg text-cyan-200 transition-all text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 pt-2 border-t border-cyan-500/30">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Describe component symptom (e.g., 'Servo buzzing', 'LCD dark blocks', 'Cut wire')..."
          className="flex-1 bg-black/80 border border-cyan-500/60 rounded-xl px-4 py-3 text-xs md:text-sm text-cyan-100 outline-none focus:border-cyan-300 placeholder:text-gray-500"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputMessage.trim()}
          className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-black font-bold text-xs tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center gap-2 shrink-0"
        >
          <span>CONSULT</span>
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};

export default ManualChatbot;
