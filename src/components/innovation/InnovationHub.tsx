import React, { useState } from 'react';
import { 
  Lightbulb, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Layers, 
  FileText, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { InnovationProposal } from '../../types';
import { INNOVATION_PROPOSALS } from '../../data/mockData';

export const InnovationHub: React.FC = () => {
  const [proposals, setProposals] = useState<InnovationProposal[]>(INNOVATION_PROPOSALS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [institution, setInstitution] = useState('');
  const [category, setCategory] = useState<InnovationProposal['category']>('AI for Land Titling');
  const [problem, setProblem] = useState('');
  const [methodology, setMethodology] = useState('');
  const [outcome, setOutcome] = useState('');
  const [states, setStates] = useState('Uttar Pradesh, Madhya Pradesh');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !problem.trim()) return;

    const newProposal: InnovationProposal = {
      id: `prop-${Date.now()}`,
      title,
      leadAuthor: author || 'Contributing Researcher',
      institution: institution || 'Academic Institution',
      category,
      problemStatement: problem,
      proposedMethodology: methodology,
      expectedPolicyOutcome: outcome,
      targetStates: states.split(',').map((s) => s.trim()).filter(Boolean),
      submittedAt: 'October 2026',
      status: 'Under Review',
    };

    setProposals([newProposal, ...proposals]);
    setSubmitSuccess(true);
    // Reset form
    setTitle('');
    setAuthor('');
    setInstitution('');
    setProblem('');
    setMethodology('');
    setOutcome('');

    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DDECE2] text-[#173F35] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C58B45]" />
              <span>Smart India Hackathon 2026 Innovation Track</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#173F35]">
              Land Governance Innovation Hub
            </h2>
            <p className="text-xs text-[#66756A] mt-1 max-w-2xl">
              Submit and explore research proposals, technology pilot sandboxes, and policy experiment designs addressing Problem Statement SIH26019.
            </p>
          </div>

          <div className="text-xs text-[#66756A] bg-[#F8F6EF] p-3 rounded-xl border border-[#E4E7DD]">
            <span className="font-bold text-[#173F35] block">SIH 2026 Call for Solutions:</span>
            <span>Focus on cadastral georeferencing, dispute analytics, and Torrens-style conclusive title migration.</span>
          </div>
        </div>
      </div>

      {/* Main Layout: Submissions List on Left, Submit Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Active Innovation Proposals */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#173F35] uppercase tracking-wider flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#C58B45]" />
              Submitted Innovation Proposals ({proposals.length})
            </h3>
            <span className="text-[11px] text-[#66756A]">Curated Sandbox Entries</span>
          </div>

          {proposals.map((prop) => (
            <div
              key={prop.id}
              className="bg-white rounded-2xl border border-[#E4E7DD] p-5 shadow-2xs space-y-3 hover:border-[#173F35] transition-all"
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-[#DDECE2] text-[#173F35]">
                  {prop.category}
                </span>
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                  prop.status === 'Shortlisted' 
                    ? 'bg-[#287A54] text-white' 
                    : 'bg-[#F4E8D5] text-[#C58B45]'
                }`}>
                  {prop.status}
                </span>
              </div>

              <h4 className="text-base font-bold text-[#173F35] leading-snug">
                {prop.title}
              </h4>

              <p className="text-xs font-semibold text-[#253B32]">
                By {prop.leadAuthor} • <span className="text-[#66756A]">{prop.institution}</span>
              </p>

              <div className="text-xs space-y-2">
                <div className="bg-[#F8F6EF] p-3 rounded-xl border border-[#E4E7DD]">
                  <span className="font-bold text-[#173F35] block mb-0.5">Problem Statement:</span>
                  <p className="text-[#66756A] leading-relaxed">{prop.problemStatement}</p>
                </div>

                <div className="bg-[#F8F6EF] p-3 rounded-xl border border-[#E4E7DD]">
                  <span className="font-bold text-[#173F35] block mb-0.5">Proposed Methodology:</span>
                  <p className="text-[#66756A] leading-relaxed">{prop.proposedMethodology}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#DDECE2]/40 border border-[#DDECE2]">
                  <span className="font-bold text-[#287A54] block mb-0.5">Anticipated Policy Impact:</span>
                  <p className="text-[#253B32] leading-relaxed">{prop.expectedPolicyOutcome}</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-[#66756A]">
                <span>Target States: {prop.targetStates.join(', ')}</span>
                <span className="text-[11px] font-mono">Submitted: {prop.submittedAt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right 5 Cols: Proposal Submission Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs h-fit sticky top-20">
          <div className="border-b border-[#E4E7DD] pb-3 mb-4">
            <h3 className="text-sm font-bold text-[#173F35] uppercase tracking-wider flex items-center gap-2">
              <Send className="w-4 h-4 text-[#C58B45]" />
              Submit Innovation Proposal
            </h3>
            <p className="text-xs text-[#66756A] mt-0.5">
              Pitch your technology pilot or policy experiment for SIH26019 review.
            </p>
          </div>

          {submitSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-[#DDECE2] border border-[#287A54] text-xs text-[#287A54] font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Proposal submitted successfully to the innovation registry!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-[#173F35] block mb-1">Proposal Title</label>
              <input
                type="text"
                required
                placeholder="e.g. AI Model for Automatic Cadastral Boundary Alignment"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#173F35] block mb-1">Lead Researcher / Team</label>
                <input
                  type="text"
                  required
                  placeholder="Team Lead Name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35]"
                />
              </div>
              <div>
                <label className="font-bold text-[#173F35] block mb-1">Affiliation / College</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IIT Roorkee"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#173F35] block mb-1">Innovation Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35] font-semibold text-[#173F35]"
              >
                <option value="AI for Land Titling">AI for Land Titling</option>
                <option value="Policy Sandbox">Policy Sandbox</option>
                <option value="GIS Innovation">GIS Innovation</option>
                <option value="Dispute Analytics">Dispute Analytics</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[#173F35] block mb-1">Land Governance Problem Addressed</label>
              <textarea
                required
                rows={2}
                placeholder="What challenge in land records, disputes, or planning is targeted?"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35]"
              />
            </div>

            <div>
              <label className="font-bold text-[#173F35] block mb-1">Proposed Methodology & Technology</label>
              <textarea
                required
                rows={2}
                placeholder="Algorithms, geospatial datasets, or legal mechanisms..."
                value={methodology}
                onChange={(e) => setMethodology(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35]"
              />
            </div>

            <div>
              <label className="font-bold text-[#173F35] block mb-1">Expected Policy Outcome</label>
              <textarea
                required
                rows={2}
                placeholder="Measurable reduction in disputes, latency, or fraud..."
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35]"
              />
            </div>

            <div>
              <label className="font-bold text-[#173F35] block mb-1">Target States</label>
              <input
                type="text"
                placeholder="e.g. Maharashtra, Uttar Pradesh"
                value={states}
                onChange={(e) => setStates(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#173F35] hover:bg-[#254F44] text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2 mt-4"
            >
              <Send className="w-3.5 h-3.5 text-[#C58B45]" />
              <span>Submit Proposal to SIH Review</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
