
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { getCulturalInsight } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const GeminiGuide: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: "Hello! I am your Mangatarem Cultural Guide. Ask me anything about our local history, festivals, or tourist spots!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const insight = await getCulturalInsight(input);
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: insight || "Error connecting to guide." };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Mangatarem AI Guide</h3>
            <div className="flex items-center text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              Powered by Gemini
            </div>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <Sparkles size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-slate-100' : 'bg-indigo-100'
              }`}>
                {msg.role === 'user' ? <User size={14} className="text-slate-600" /> : <Bot size={14} className="text-indigo-600" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none' 
                  : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 bg-indigo-50 p-4 rounded-2xl">
              <Loader2 className="animate-spin text-indigo-600" size={16} />
              <span className="text-xs text-indigo-600 font-medium tracking-tight">Consulting historians...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Galicayo Festival or Manleluag Spring..."
            className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 pr-14 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 text-center">
          AI may generate inaccurate info. Cross-reference with official LGU data.
        </p>
      </div>
    </div>
  );
};

export default GeminiGuide;
