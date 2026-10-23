import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle, X, Send, Bot, User, Sparkles,
  ChevronDown, Minimize2, Maximize2
} from 'lucide-react';
import {
  generateResponse, createMessageId,
  type ChatMessage,
} from '../data/chatBotData';

const QUICK_PROMPTS = [
  'Which career track is right for me?',
  'How to prepare for interviews?',
  'Tell me about mentorship plans',
  'Resume tips for freshers',
  'How to prepare for UPSC?',
  'Study abroad guidance',
];

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: createMessageId(),
      role: 'assistant',
      content: `Hi! 👋 I'm **NextStep AI**, your career guidance assistant.\n\nI can help you with:\n• 🛤️ Choosing the right career track\n• 📝 Resume & interview preparation\n• 🎓 Higher studies & exam guidance\n• 👥 Mentorship & subscription plans\n• 💼 Job search strategies\n\nWhat would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, isMinimized]);

  const handleSend = (text?: string) => {
    const msg = (text || inputValue).trim();
    if (!msg) return;

    const userMsg: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      content: msg,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking delay (300-900ms)
    const delay = 300 + Math.random() * 600;
    setTimeout(() => {
      const response = generateResponse(msg);
      const assistantMsg: ChatMessage = {
        id: createMessageId(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);

      if (!isOpen || isMinimized) {
        setUnread((prev) => prev + 1);
      }
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Parse basic markdown bold **text**
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      // Bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
        }
        // Italic
        if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
          return <em key={j}>{part.slice(1, -1)}</em>;
        }
        return <span key={j}>{part}</span>;
      });

      return (
        <React.Fragment key={i}>
          {rendered}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* ── Floating Chat Button ── */}
      {!isOpen && (
        <button
          id="chatbot-fab"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
            boxShadow: '0 8px 30px rgba(30,58,138,0.4)',
          }}
          aria-label="Open career guidance chatbot"
        >
          <MessageCircle size={22} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
              {unread}
            </span>
          )}
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{ background: 'linear-gradient(135deg, #0F172A, #1E3A8A)' }} />
        </button>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          id="chatbot-window"
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? 'bottom-5 right-5 sm:bottom-8 sm:right-8'
              : 'bottom-0 right-0 sm:bottom-6 sm:right-6'
          }`}
          style={{ maxHeight: isMinimized ? 'auto' : undefined }}
        >
          <div
            className={`flex flex-col overflow-hidden transition-all duration-500 ${
              isMinimized
                ? 'w-72 rounded-2xl'
                : 'w-screen sm:w-[400px] h-screen sm:h-[600px] sm:max-h-[80vh] sm:rounded-2xl'
            }`}
            style={{
              background: isMinimized ? 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)' : undefined,
              boxShadow: '0 20px 60px rgba(10,25,47,0.35)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* ── Header ── */}
            <div
              className="px-4 py-3 flex items-center justify-between shrink-0"
              style={{
                background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  <Bot size={18} strokeWidth={2} className="text-blue-300" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    NextStep AI
                    <Sparkles size={12} className="text-blue-300" />
                  </div>
                  <div className="text-[10px] text-white/50 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                    Career guidance assistant
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  onClick={() => { setIsOpen(false); setIsMinimized(false); }}
                  className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  title="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── Messages (hidden when minimized) ── */}
            {!isMinimized && (
              <>
                <div
                  className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
                  style={{
                    background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
                  }}
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          msg.role === 'assistant'
                            ? ''
                            : 'gradient-navy'
                        }`}
                        style={
                          msg.role === 'assistant'
                            ? { background: 'rgba(30,58,138,0.08)', border: '1px solid rgba(30,58,138,0.12)' }
                            : {}
                        }
                      >
                        {msg.role === 'assistant' ? (
                          <Bot size={13} strokeWidth={2} className="text-navy-700" />
                        ) : (
                          <User size={13} strokeWidth={2} className="text-white" />
                        )}
                      </div>

                      {/* Bubble */}
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                          msg.role === 'user'
                            ? 'text-white rounded-tr-md'
                            : 'text-slate-700 rounded-tl-md'
                        }`}
                        style={
                          msg.role === 'user'
                            ? {
                                background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
                              }
                            : {
                                background: 'rgba(255,255,255,0.9)',
                                border: '1px solid rgba(226,232,240,0.8)',
                                boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
                              }
                        }
                      >
                        {renderContent(msg.content)}
                        <div className={`text-[9px] mt-1.5 ${msg.role === 'user' ? 'text-white/40 text-right' : 'text-slate-400'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(30,58,138,0.08)', border: '1px solid rgba(30,58,138,0.12)' }}
                      >
                        <Bot size={13} strokeWidth={2} className="text-navy-700" />
                      </div>
                      <div
                        className="rounded-2xl rounded-tl-md px-4 py-3"
                        style={{
                          background: 'rgba(255,255,255,0.9)',
                          border: '1px solid rgba(226,232,240,0.8)',
                        }}
                      >
                        <div className="flex gap-1.5 items-center h-4">
                          <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* ── Quick Prompts (show when only greeting message) ── */}
                {messages.length <= 1 && (
                  <div className="px-4 py-2 border-t border-slate-100 bg-white/80">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2">Quick questions</p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handleSend(prompt)}
                          className="text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5"
                          style={{
                            background: 'rgba(30,58,138,0.06)',
                            border: '1px solid rgba(30,58,138,0.12)',
                            color: '#1E3A8A',
                          }}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Input ── */}
                <div
                  className="px-3 py-3 shrink-0 pb-safe"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(12px)',
                    borderTop: '1px solid rgba(226,232,240,0.6)',
                  }}
                >
                  <div
                    className="flex items-center gap-2 rounded-xl px-3 py-1"
                    style={{
                      background: 'rgba(248,250,252,0.9)',
                      border: '1px solid rgba(226,232,240,0.8)',
                    }}
                  >
                    <input
                      ref={inputRef}
                      id="chatbot-input"
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about careers, exams, mentors..."
                      className="flex-1 bg-transparent outline-none text-xs text-navy-900 placeholder-slate-400 py-2.5 font-medium"
                    />
                    <button
                      id="chatbot-send"
                      onClick={() => handleSend()}
                      disabled={!inputValue.trim() || isTyping}
                      className={`p-2 rounded-lg transition-all duration-200 shrink-0 ${
                        inputValue.trim() && !isTyping
                          ? 'gradient-navy text-white shadow-sm hover:shadow-md'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Send size={14} strokeWidth={2} />
                    </button>
                  </div>
                  <p className="text-[9px] text-slate-400 text-center mt-2">
                    NextStep AI · Career guidance assistant · Not a substitute for professional advice
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
