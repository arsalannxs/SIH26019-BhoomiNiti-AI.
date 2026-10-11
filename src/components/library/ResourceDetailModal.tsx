import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  ExternalLink, 
  Bookmark, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  Copy, 
  Check, 
  Share2,
  FileText,
  Loader2
} from 'lucide-react';
import { ResearchResource } from '../../types';

interface ResourceDetailModalProps {
  resource: ResearchResource | null;
  onClose: () => void;
  onToggleBookmark: (id: string) => void;
  isBookmarked: boolean;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  onClose,
  onToggleBookmark,
  isBookmarked,
}) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  if (!resource) return null;

  const handleGenerateSummary = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: resource.title,
          category: resource.category,
          text: resource.abstract + '\n' + resource.keyFindings.join('\n'),
          metadata: {
            author: resource.author,
            organization: resource.organization,
            year: resource.year,
            limitations: resource.limitations,
          },
        }),
      });
      const data = await res.json();
      setAiSummary(data.summary || 'Summary generated.');
    } catch (err) {
      console.error(err);
      setAiSummary('Failed to contact research summarization service.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const citationText = `${resource.author} (${resource.year}). "${resource.title}". ${resource.organization}. Ref: ${resource.doiOrRef}.`;

  const copyCitation = () => {
    navigator.clipboard.writeText(citationText);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl border border-[#E4E7DD] shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E4E7DD] bg-[#F8F6EF] flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#173F35] text-white">
                {resource.category}
              </span>
              <span className="text-xs font-semibold text-[#66756A]">
                {resource.date}
              </span>
              {resource.isVerified && (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#287A54] bg-[#DDECE2] px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> Verified Publication
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-[#173F35] leading-snug">
              {resource.title}
            </h3>
            <p className="text-xs text-[#253B32] mt-1.5 font-medium">
              By {resource.author} • <span className="text-[#66756A]">{resource.organization}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#66756A] hover:bg-[#E4E7DD] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#253B32]">
          {/* Abstract */}
          <div>
            <h4 className="text-xs font-bold text-[#173F35] uppercase tracking-wider mb-2">
              Abstract & Executive Scope
            </h4>
            <p className="text-sm text-[#253B32] leading-relaxed bg-[#F8F6EF] p-4 rounded-xl border border-[#E4E7DD]">
              {resource.abstract}
            </p>
          </div>

          {/* Key Findings */}
          <div>
            <h4 className="text-xs font-bold text-[#173F35] uppercase tracking-wider mb-2">
              Key Empirical Findings
            </h4>
            <ul className="space-y-2">
              {resource.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-[#253B32]">
                  <span className="w-5 h-5 rounded-full bg-[#DDECE2] text-[#173F35] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="p-4 rounded-xl bg-[#F4E8D5] border border-[#C58B45]/30">
            <h4 className="text-xs font-bold text-[#173F35] flex items-center gap-1.5 mb-1">
              <AlertCircle className="w-4 h-4 text-[#C58B45]" />
              Study Limitations & Generalizability
            </h4>
            <p className="text-xs text-[#253B32] leading-relaxed">
              {resource.limitations}
            </p>
          </div>

          {/* AI Structured Summary Section */}
          <div className="border border-[#E4E7DD] rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C58B45]" />
                <span className="text-xs font-bold text-[#173F35] uppercase tracking-wider">
                  AI Research Synthesis
                </span>
              </div>
              <button
                onClick={handleGenerateSummary}
                disabled={isLoadingAi}
                className="px-3 py-1.5 rounded-lg bg-[#C58B45] hover:bg-[#b57d3b] text-white text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isLoadingAi ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{aiSummary ? 'Regenerate Summary' : 'Generate AI Summary'}</span>
                  </>
                )}
              </button>
            </div>

            {aiSummary ? (
              <div className="mt-3 p-3.5 rounded-lg bg-[#F8F6EF] border border-[#E4E7DD] text-xs text-[#253B32] whitespace-pre-line leading-relaxed font-sans">
                {aiSummary}
              </div>
            ) : (
              <p className="text-xs text-[#66756A] italic mt-1">
                Click "Generate AI Summary" to extract core methodology, governance implications, and limitations using BhoomiNiti AI.
              </p>
            )}
          </div>

          {/* Topic Tags & Citation */}
          <div className="space-y-3 pt-2 border-t border-[#E4E7DD]">
            <div>
              <span className="text-xs font-bold text-[#66756A] mr-2">Topic Tags:</span>
              <div className="inline-flex flex-wrap gap-1.5 mt-1">
                {resource.topicTags.map((tag) => (
                  <span key={tag} className="text-xs bg-[#DDECE2] text-[#173F35] px-2 py-0.5 rounded-md font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-[#F8F6EF] rounded-lg border border-[#E4E7DD]">
              <div className="text-xs font-mono text-[#66756A] truncate max-w-md">
                Ref: {resource.doiOrRef}
              </div>
              <button
                onClick={copyCitation}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#173F35] hover:text-[#C58B45] transition-colors"
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5 text-[#287A54]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCitation ? 'Copied Citation!' : 'Copy Citation'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E4E7DD] bg-[#F8F6EF] flex items-center justify-between">
          <button
            onClick={() => onToggleBookmark(resource.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
              isBookmarked 
                ? 'bg-[#C58B45] text-white' 
                : 'bg-white border border-[#E4E7DD] text-[#253B32] hover:bg-[#E4E7DD]'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{isBookmarked ? 'Bookmarked' : 'Save to Reading List'}</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={resource.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#173F35] hover:bg-[#254F44] text-white text-xs font-bold transition-colors"
            >
              <span>Access Official Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
