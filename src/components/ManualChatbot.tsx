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
 * Strict, zero-hallucination inference engine based exclusively on the updated
 * "Arduino Circuit Troubleshooting Manual: Participant Edition (Circuit 1 & Circuit 2)"
 * Symbiosis IEEE Student Branch • Symbiosis Institute of Technology, Pune.
 */
function answerFromManual(rawQuery: string): string {
  const q = rawQuery.toLowerCase().trim();

  // Emergency safety / smoke / heat / smell / reset
  if (q.includes('hot') || q.includes('heat') || q.includes('smoke') || q.includes('smell') || q.includes('reset') || q.includes('burn')) {
    return `### ⚠️ CRITICAL SAFETY ALERT: DISCONNECT POWER IMMEDIATELY
1. **Safety Instruction:** Disconnect the USB cable from the power bank right now. Do NOT attempt further power-up tests.
2. **Likely Cause:** A short circuit (such as 5V connected directly to GND), a severely miswired component, or a damaged board.
3. **Action:** Call the event facilitator immediately for physical inspection. Never troubleshoot a hot, smoking, or burnt circuit.`;
  }

  // "What should I do first?" or getting started
  if (q.includes('first') || q.includes('start') || q.includes('what should i do') || q.includes('begin') || q.includes('how to use')) {
    return `### Quick Answer: Safe Troubleshooting Procedure
1. **Power Off:** Disconnect the USB cable from the power bank before touching or inspecting any wire.
2. **Identify Circuit:** Determine whether your board is **Circuit 1** or **Circuit 2** from the pin map:
   - **Circuit 1:** LED 1 (D8), LED 2 (D9), Button (D2 to GND), Buzzer (D3 to GND).
   - **Circuit 2:** LED 1 (D5), LED 2 (D6), Button (D7 to GND), Buzzer (D8 to GND).
3. **Inspect Hardware:** Inspect Arduino digital-pin jumpers, check LED polarities and series resistors (220–330 Ω), and verify the common GND rail connection.
4. **Fix One at a Time:** Correct one confirmed fault at a time while power remains disconnected.
5. **Connect Power:** Reconnect USB to the power bank only after the circuit is safe and inspected.`;
  }

  // Safety rules / Power rule
  if (q.includes('safety') || q.includes('rule') || q.includes('power rule') || q.includes('short circuit')) {
    return `### Safety Rules & Power Policy (Section 1)
- **Power Rule:** Disconnect the USB cable from the power bank before touching, inserting, or removing any jumper wire. Merely releasing the button or flipping a power bank switch is not enough.
- **Never Connect 5V to GND:** Direct connection causes a short circuit and can permanently damage the Nano.
- **Resistors Required:** Each LED must have its own 220–330 Ω series current-limiting resistor. Never bypass or remove resistors.
- **No Program Changes:** Do not alter the Arduino code. This is strictly a hardware troubleshooting challenge.
- **USB Power Only:** Power the Nano solely through its USB port from the power bank; never connect power bank leads directly to the breadboard rails.`;
  }

  // Pinout / Pin map / Which circuit / Differences
  if (q.includes('pin') || q.includes('map') || q.includes('circuit 1') || q.includes('circuit 2') || q.includes('d8') || q.includes('d2') || q.includes('d3') || q.includes('d5') || q.includes('d6') || q.includes('d7')) {
    return `### Circuit Pin Maps (Section 2, 10, 11)
Both circuits share the same behavior: 2 LEDs stay ON continuously, and the buzzer sounds ONLY while the button is pressed. However, their digital pin assignments differ:

| Function | Circuit 1 | Circuit 2 | Expected Behavior |
| :--- | :--- | :--- | :--- |
| **LED 1 Signal** | **D8** (via 220–330 Ω resistor) | **D5** (via 220–330 Ω resistor) | Stays ON continuously |
| **LED 2 Signal** | **D9** (via 220–330 Ω resistor) | **D6** (via 220–330 Ω resistor) | Stays ON continuously |
| **Button Input** | **D2** (between D2 and GND) | **D7** (between D7 and GND) | Pressed = LOW, Released = HIGH |
| **Buzzer Signal** | **D3** (+ to D3, - to GND) | **D8** (+ to D8, - to GND) | Sounds ONLY while pressed |
| **Common Ground**| Nano GND to GND rail | Nano GND to GND rail | Returns all cathode/ground paths |

⚠️ **CRITICAL NOTE ON PIN D8:**
- In **Circuit 1**, D8 is used for **LED 1**.
- In **Circuit 2**, D8 is used for the **Buzzer**.
Always verify which circuit you have before deciding if a wire on D8 is correct!`;
  }

  // LED issues (one off, both off, reversed, dark)
  if (q.includes('led') || q.includes('light') || q.includes('glow') || q.includes('anode') || q.includes('cathode') || q.includes('resistor')) {
    if (q.includes('both')) {
      return `### Diagnostic: Both LEDs Are OFF (Section 5, 8, 13)
1. **Safety:** Disconnect the USB cable from the power bank before checking wires.
2. **Likely Causes:**
   - Disconnected common ground rail from Nano GND.
   - Both LED signal wires disconnected.
   - Both LEDs reversed in polarity.
   - Missing or misaligned series resistors.
3. **Action:**
   - Follow the jumper from Nano GND to the breadboard ground rail. Ensure both LED cathodes return to this rail.
   - Verify signal wires: **Circuit 1 = D8 & D9**; **Circuit 2 = D5 & D6**.
   - Check LED orientation: Longer leg is Anode (+), shorter leg / flat edge is Cathode (-).
   - Verify each LED has an intact 220–330 Ω series resistor.`;
    }

    if (q.includes('reverse') || q.includes('backwards') || q.includes('polarity')) {
      return `### Fault Type B: LED Reversed (Section 7)
1. **Safety:** Disconnect the USB cable from the power bank.
2. **Polarity Check:**
   - **Anode (+):** Usually longer leg. Connects to the Arduino digital pin via the 220–330 Ω resistor.
   - **Cathode (-):** Usually shorter leg / flat edge on plastic package. Connects to the GND rail.
3. **Corrective Action:**
   - Carefully remove and rotate the LED so its anode faces the resistor/pin and cathode faces GND.
   - Keep the series resistor in place. Never power an LED without its current-limiting resistor!
4. **Verification:** Reconnect USB to power bank; verify the LED stays illuminated continuously.`;
    }

    return `### Diagnostic: Single LED Is OFF (Section 6, 7, 13, 15)
1. **Safety:** Disconnect the USB cable from the power bank first.
2. **Identify:** Is it LED 1 or LED 2, and which circuit are you troubleshooting?
   - **Circuit 1:** LED 1 is on **D8**, LED 2 is on **D9**.
   - **Circuit 2:** LED 1 is on **D5**, LED 2 is on **D6**.
3. **Checklist:**
   - **Signal Wire:** Check that the jumper from the assigned digital pin is securely inserted in the same breadboard row as the resistor.
   - **Resistor:** Ensure a 220–330 Ω series resistor connects between the pin jumper and LED anode.
   - **LED Polarity:** Confirm Anode (+) connects to resistor, and Cathode (-) connects to GND.
   - **Breadboard Alignment:** Ensure legs are in the intended separate breadboard rows.
4. **Verify:** After checking, connect the power bank. Both LEDs should illuminate continuously.`;
  }

  // Buzzer issues (never sounds, always sounds, continuously on, stuck button)
  if (q.includes('buzzer') || q.includes('sound') || q.includes('beep') || q.includes('tone') || q.includes('silent')) {
    if (q.includes('always') || q.includes('continuous') || q.includes('stuck') || q.includes('wont stop')) {
      return `### Diagnostic: Buzzer Sounds Continuously (Section 5, 13, 16, 17)
1. **Safety:** Disconnect the USB cable from the power bank.
2. **Likely Cause:** The button input pin is permanently grounded. The Arduino code uses \`INPUT_PULLUP\`, meaning the pin triggers LOW when grounded.
3. **Checklist:**
   - Check if the push button is physically stuck down.
   - Check push button placement: tactile 4-leg buttons must straddle the breadboard centre trench so unpressed sides remain open.
   - Inspect for any jumper bridging the button signal pin (**D2** in Circuit 1, **D7** in Circuit 2) directly to GND.
4. **Verify:** Reconnect power; the buzzer should now remain silent until the button is pressed.`;
    }

    return `### Diagnostic: Buzzer Never Sounds (Section 5, 6, 13, 16, 17)
1. **Safety:** Disconnect the USB cable from the power bank.
2. **Identify Circuit & Pins:**
   - **Circuit 1:** Button is on **D2**, Buzzer positive is on **D3**.
   - **Circuit 2:** Button is on **D7**, Buzzer positive is on **D8**.
3. **Diagnostic Checks:**
   - **Buzzer Signal:** Verify Buzzer (+) connects to assigned pin (**D3** for C1, **D8** for C2) and Buzzer (-) connects to GND.
   - **Button Wiring:** Verify one button terminal connects to the assigned pin (**D2** for C1, **D7** for C2) and the other connects to GND.
   - **Button Placement:** Ensure the push button straddles the centre trench and makes solid contact.
4. **Verify:** Reconnect USB to power bank; press and hold the button. The buzzer should sound only while pressed.`;
  }

  // Push button specific
  if (q.includes('button') || q.includes('press') || q.includes('pullup') || q.includes('input_pullup') || q.includes('switch')) {
    return `### How to Check the Push Button (Section 3, 14, 16)
- **Circuit Wiring:**
  - **Circuit 1:** Push button wired between **D2** and **GND**.
  - **Circuit 2:** Push button wired between **D7** and **GND**.
  - *Do NOT connect the button to 5V!*
- **INPUT_PULLUP Behavior:**
  - Released: Pin reads HIGH internally -> Buzzer is OFF.
  - Pressed: Button shorts pin to GND (reads LOW) -> Buzzer is ON.
- **Breadboard Placement:** 4-leg tactile buttons must straddle the breadboard's centre trench. If placed incorrectly, internal leg pairs may permanently short the signal pin to GND, causing continuous buzzing.`;
  }

  // Ground (GND) / Split rails
  if (q.includes('ground') || q.includes('gnd') || q.includes('split rail') || q.includes('rail')) {
    return `### Ground (GND) and Split Rail Guide (Section 8, 18)
1. **Safety:** Disconnect the USB cable from the power bank.
2. **Common Ground Principle:** Ground is the shared reference return path. A breadboard ground rail is useful ONLY if wired to a Nano GND pin.
3. **Symptoms of Disconnected Ground:** Both LEDs off, buzzer silent, or multiple components failing simultaneously.
4. **Procedure:**
   - Trace the jumper from the Nano GND pin to the breadboard ground rail.
   - Confirm all component grounds (both LED cathodes, buzzer negative terminal, and button return) connect to that same grounded rail.
   - **Check for Split Rails:** Many breadboards have a break in the middle of side rails. Ensure your ground jumper connects to the section your components actually use.
   - ⚠️ **NEVER connect 5V to GND to "test" the circuit!**`;
  }

  // Disconnected or misplaced wire / jumper
  if (q.includes('wire') || q.includes('jumper') || q.includes('disconnected') || q.includes('loose') || q.includes('flicker')) {
    return `### Disconnected or Loose Digital Pin Wire (Section 6, 13)
1. **Safety:** Disconnect the USB cable from the power bank. Do not move wires while powered.
2. **Check Your Circuit Map:**
   - **Circuit 1:** LED 1 = **D8**, LED 2 = **D9**, Button = **D2**, Buzzer = **D3**.
   - **Circuit 2:** LED 1 = **D5**, LED 2 = **D6**, Button = **D7**, Buzzer = **D8**.
3. **Action:**
   - Reseat the loose or missing jumper into the exact documented Nano pin and corresponding breadboard row.
   - Check that no bare jumper strands bridge adjacent pins or touch the 5V rail.
4. **Test:** Reconnect power; test if normal behavior is restored.`;
  }

  // Multiple or combined faults
  if (q.includes('multiple') || q.includes('two') || q.includes('combined') || q.includes('case')) {
    return `### Multiple Faults: Systematic Method (Section 9, 19, 22)
1. **Note Symptoms:** Record what is observed before touching any wires.
2. **Power Off:** Disconnect the USB cable from the power bank.
3. **Shared Paths First:** Inspect Nano power and common GND rail connection before assuming multiple components are dead.
4. **One at a Time:** Fix one confirmed fault at a time (e.g. restore ground, then rotate reversed LED, then reconnect missing pin wire).
5. **Re-Test Methodically:** Test after each correction to observe which symptom cleared.
6. **No Code Edits:** Never alter the program code to bypass a wiring fault.`;
  }

  // Final functional test / verification code / finish game
  if (q.includes('test') || q.includes('pass') || q.includes('finish') || q.includes('code') || q.includes('verification') || q.includes('final')) {
    return `### Final Functional Test & Mission Verification (Section 20, 28)
**Pass Criteria:**
1. Connect USB from Nano to power bank -> Nano powers up normally.
2. Button Released -> Both LEDs stay ON continuously; buzzer is silent.
3. Button Pressed -> Both LEDs remain ON; buzzer sounds.
4. Button Released -> Buzzer stops immediately.
5. Stability -> No components heating up, no burning smell, no repeated resets.

Once your circuit passes all 5 criteria, show your working hardware to the event facilitator to receive the secret supervisor verification code and submit it in the portal below to stop the mission clock!`;
  }

  // Fallback for out-of-scope or uncatalogued queries
  return `### Mission AI-Impossible Circuit Assistant Protocol
As the official Circuit Troubleshooting Copilot for **Circuit 1 & Circuit 2** (Symbiosis IEEE Student Branch • SIT Pune):

1. **Power Rule:** Always disconnect the USB cable from the power bank before touching or inspecting any wire.
2. **State Your Circuit:** Please specify whether you are troubleshooting **Circuit 1** or **Circuit 2**, and what symptom you observe:
   - Are both LEDs off or only one LED off?
   - Is the buzzer silent when pressed, or sounding continuously?
   - Did you find a disconnected pin wire, reversed LED, or missing ground?
3. **Safety Notice:** If any component is hot, smoking, or smelling burnt, disconnect power immediately and call the facilitator.`;
}

export const ManualChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: `### Mission AI-Impossible — Circuit Troubleshooting Copilot Online
Welcome Operative. I am your hardware diagnostic assistant for **Circuit 1** and **Circuit 2** (Organised by Symbiosis IEEE Student Branch, SIT Pune).

⚠️ **POWER RULE:** Keep the USB cable disconnected from the power bank while inspecting or changing any wire. Connect power only after the circuit has been checked.

How can I assist you with your LEDs, push button, buzzer, pin maps, or ground connections?`,
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
    }, 350);
  };

  const quickQuestions = [
    'What should I do first before touching wires?',
    'What are the pin maps for Circuit 1 and Circuit 2?',
    'One LED is not glowing',
    'Both LEDs are off but buzzer works',
    'Buzzer never sounds when button is pressed',
    'Buzzer is sounding continuously without pressing button',
    'The ground wire is disconnected'
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
                PARTICIPANT EDITION
              </span>
            </h3>
            <p className="text-[11px] text-gray-400 tracking-wider">
              CIRCUIT 1 & CIRCUIT 2 // SYMBIOSIS IEEE STUDENT BRANCH • SIT PUNE
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
          <strong>Power Rule:</strong> Keep USB disconnected from power bank while inspecting or moving wires. Never connect 5V to GND!
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
            <span>Consulting official Arduino Circuit Troubleshooting Manual...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions Pills */}
      <div>
        <div className="text-[11px] font-bold text-gray-400 tracking-wider mb-2 flex items-center gap-1.5">
          <HelpCircle size={13} className="text-cyan-400" />
          <span>FREQUENT SYMPTOMS & CHECKS:</span>
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

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-2 border-t border-cyan-500/30"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask about LED 1/2, buzzer, button, D2-D9 pins, polarity, ground rail..."
          className="flex-1 bg-black/60 border border-cyan-500/40 focus:border-cyan-300 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-colors"
        />
        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        >
          <Send size={15} />
          <span>TRANSMIT</span>
        </button>
      </form>
    </div>
  );
};

export default ManualChatbot;
