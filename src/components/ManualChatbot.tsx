import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../lib/audio';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  Terminal
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const ManualChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: 'Greetings Operative. I am the Flight 804 Black Box Copilot AI. You have successfully recovered the cockpit systems and unlocked the Flight Operations Manual. You may ask me any questions about the flight protocols, the crash telemetry, or the final emergency extraction code.',
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

  const generateAIResponse = (userText: string): string => {
    const q = userText.toLowerCase();

    if (q.includes('code') || q.includes('key') || q.includes('password') || q.includes('unlock') || q.includes('audio') || q.includes('prompt')) {
      return 'The Black Box audio extraction code is formatted according to international emergency distress rules. The master authorization key is: "MAYDAY-804" (or "BLACKBOX-804"). Enter this exact code into the verification terminal directly below this chat to extract the recorded audio and stamp your official mission time!';
    }

    if (q.includes('stall') || q.includes('aoa') || q.includes('pitch')) {
      return 'Section 1 specifies that when Angle of Attack exceeds 18.0°, elevator control must be pushed NOSE-DOWN to break airflow separation. TOGA thrust must be spooled up once AOA is under 12.0° to prevent catastrophic turbine compressor surges.';
    }

    if (q.includes('fuel') || q.includes('weight') || q.includes('jettison') || q.includes('dump')) {
      return 'Section 2 confirms that Maximum Landing Weight (MLW) is 65,000 KG. Jettisoning the 13,500 KG excess fuel at 250 KG/s takes exactly 54 seconds with both wing valves and crossfeed manifold opened.';
    }

    if (q.includes('black box') || q.includes('frequency') || q.includes('cvr') || q.includes('fdr')) {
      return 'Section 3 outlines the dual crash-survivable memory units (CSMU) armored against 3,400 G shock and 1,100°C fire. The beacon broadcasts continuous 37.5 kHz acoustic pulses on VHF guard frequency 121.5 MHz.';
    }

    if (q.includes('who are you') || q.includes('help') || q.includes('what to do')) {
      return 'I am the Flight 804 Black Box Copilot AI. Read the manual chapters above, ask me for clarification, and obtain the final authorization code ("MAYDAY-804") to submit in the prompt below to retrieve the black box audio and win!';
    }

    return 'Affirmative, operative. Flight 804 telemetry confirms that emergency procedures in the user manual must be followed. If you require the final audio extraction code, simply enter "MAYDAY-804" in the verification prompt below!';
  };

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
      const reply = generateAIResponse(text);
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
    }, 600);
  };

  const quickQuestions = [
    'What is the final extraction code?',
    'Explain the stall recovery protocol',
    'What was the fuel jettison formula?',
    'How do I unlock the audio file?',
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
            <h3 className="text-base md:text-lg font-bold tracking-widest text-cyan-300">
              BLACK BOX AI COPILOT // RECOVERY INTEL
            </h3>
            <p className="text-[11px] text-gray-400 tracking-wider">
              INTERACTIVE FLIGHT OPERATIONS MANUAL ASSISTANT
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-emerald-400">ONLINE</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="h-64 md:h-72 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
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

            <div className={`max-w-[85%] p-3.5 rounded-xl text-xs md:text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-yellow-950/60 border border-yellow-500/60 text-yellow-100'
                : 'bg-black/70 border border-cyan-500/40 text-gray-200'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 animate-pulse pl-8">
            <Terminal size={14} />
            <span>AI COPILOT IS PROCESSING TELEMETRY...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Question Chips */}
      <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-700">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-black/60 hover:bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:text-white transition-all flex items-center gap-1"
          >
            <Sparkles size={11} className="text-yellow-400" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Chat Input Field */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="Ask the Copilot AI about the manual or code..."
          className="flex-1 bg-black/80 border-2 border-cyan-400/60 rounded-xl px-4 py-2.5 text-xs md:text-sm text-cyan-200 outline-none focus:border-cyan-400 placeholder:text-gray-500"
        />
        <button
          onClick={() => handleSend()}
          className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition-all shadow-[0_0_15px_#06b6d4] flex items-center gap-1.5"
        >
          <Send size={15} />
          <span className="hidden sm:inline">SEND</span>
        </button>
      </div>
    </div>
  );
};

export default ManualChatbot;
