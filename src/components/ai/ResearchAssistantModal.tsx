import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Loader2, 
  HelpCircle,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { ResearchResource } from '../../types';

interface ResearchAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources: ResearchResource[];
  onSelectResource?: (res: ResearchResource) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: { id: string; title: string; author: string }[];
  model?: string;
  timestamp: string;
}

export const ResearchAssistantModal: React.FC<ResearchAssistantModalProps> = ({
  isOpen,
  onClose,
  resources,
  onSelectResource,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Hello! I am the **BhoomiNiti Research Assistant**, specialized in Indian land governance, cadastral digitization (DILRMP/SVAMITVA), land disputes, and spatial planning.\n\nHow can I support your land research or policy evaluation today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'What are the key empirical findings of DILRMP on rural credit?',
    'Compare SVAMITVA vs DILRMP mechanisms and objectives.',
    'What evidence supports climate-resilient land use in rural India?',
    'What are the limitations of drone cadastral mapping in Abadi areas?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim() || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          contextResources: resources.slice(0, 4).map((r) => ({
            id: r.id,
            title: r.title,
            author: r.author,
            abstract: r.abstract,
            year: r.year,
          })),
        }),
      });

      const data = await res.json();
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'No response returned.',
        sources: data.sourcesUsed,
        model: data.model,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: 'An error occurred while contacting the research assistant. Please try again or check network connectivity.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl border border-[#E4E7DD] shadow-2xl max-w-2xl w-full h-[85vh] flex flex-col overflow-hidden animate-in fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#E4E7DD] bg-[#173F35] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C58B45] flex items-center justify-center text-white font-bold">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm tracking-tight">BhoomiNiti Research Assistant</h3>
                <span className="bg-[#287A54] text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
                  AI Grounded
                </span>
              </div>
              <p className="text-[11px] text-[#DDECE2]/80">Evidence-based advisor for land governance & spatial planning</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#DDECE2] hover:bg-[#254F44] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4 bg-[#F8F6EF]/50 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 shadow-2xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#173F35] text-white rounded-br-xs'
                    : 'bg-white text-[#253B32] border border-[#E4E7DD] rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-line font-sans text-xs sm:text-[13px]">
                  {msg.text}
                </div>

                {/* Sources Used Badge */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#E4E7DD] text-[11px] text-[#66756A]">
                    <span className="font-bold text-[#173F35] block mb-1">Grounding References:</span>
                    <ul className="space-y-1">
                      {msg.sources.map((s, idx) => (
                        <li key={idx} className="flex items-center gap-1 text-[#253B32]">
                          <BookOpen className="w-3 h-3 text-[#C58B45] shrink-0" />
                          <span className="truncate">{s.title} ({s.author.split(' ')[0]})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-2 flex items-center justify-between text-[10px] text-[#66756A] opacity-75">
                  <span>{msg.timestamp}</span>
                  {msg.model && <span>Engine: {msg.model}</span>}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-[#E4E7DD] w-fit text-xs text-[#173F35]">
              <Loader2 className="w-4 h-4 animate-spin text-[#C58B45]" />
              <span>Synthesizing evidence and consulting land governance literature...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        <div className="p-3 bg-white border-t border-[#E4E7DD] overflow-x-auto flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-[10px] font-bold text-[#66756A] mr-1 shrink-0">Prompts:</span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-[#F8F6EF] hover:bg-[#DDECE2] text-[#173F35] border border-[#E4E7DD] transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-[#E4E7DD] bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about land records, DILRMP, SVAMITVA, dispute mitigation..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 p-2.5 rounded-xl border border-[#E4E7DD] bg-[#F8F6EF] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173F35] text-[#253B32]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="p-2.5 rounded-xl bg-[#173F35] hover:bg-[#254F44] text-white transition-colors disabled:opacity-40"
              title="Send Query"
            >
              <Send className="w-4 h-4 text-[#C58B45]" />
            </button>
          </form>

          <p className="text-[10px] text-[#66756A] text-center mt-2">
            AI-generated summaries require independent verification against original publications and state revenue acts.
          </p>
        </div>
      </div>
    </div>
  );
};
