import React, { useState } from 'react';
import { 
  Compass, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ExternalLink, 
  AlertCircle, 
  FileText, 
  Layers, 
  CheckCircle2,
  Loader2,
  Scale
} from 'lucide-react';
import { PolicyDocument } from '../../types';

interface PolicyExplorerProps {
  policies: PolicyDocument[];
}

export const PolicyExplorer: React.FC<PolicyExplorerProps> = ({ policies }) => {
  // Pre-select first two for side-by-side comparison
  const [selectedIds, setSelectedIds] = useState<string[]>([policies[0].id, policies[1].id]);
  const [aiComparison, setAiComparison] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const togglePolicy = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // Replace second item
        setSelectedIds([selectedIds[0], id]);
      }
    }
  };

  const selectedPolicies = policies.filter((p) => selectedIds.includes(p.id));

  const handleSynthesizeComparison = async () => {
    if (selectedPolicies.length < 2) return;
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/ai/compare-policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          policyA: selectedPolicies[0],
          policyB: selectedPolicies[1],
        }),
      });
      const data = await res.json();
      setAiComparison(data.comparison || 'Comparative analysis complete.');
    } catch (err) {
      console.error(err);
      setAiComparison('Failed to connect to policy comparison synthesis service.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const comparisonCriteria = [
    { label: 'Strategic Objective', key: 'objective' },
    { label: 'Geographic Scope', key: 'geographicScope' },
    { label: 'Target Beneficiaries', key: 'targetPopulation' },
    { label: 'Implementation Mechanism', key: 'implementationMechanism' },
    { label: 'Governing Theme', key: 'relevantTopic' },
    { label: 'Empirical Evidence', key: 'availableEvidence' },
    { label: 'Reported Outcomes', key: 'reportedOutcomes' },
    { label: 'Governance Limitations', key: 'limitations' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DDECE2] text-[#173F35] text-xs font-semibold mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Comparative Evidence Matrix</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#173F35]">
              National Policy Explorer & Comparison Workspace
            </h2>
            <p className="text-xs text-[#66756A] mt-1 max-w-2xl">
              Select 2 or 3 national land governance frameworks to compare objectives, institutional mechanisms, empirical evidence, and operational bottlenecks side-by-side.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSynthesizeComparison}
              disabled={isLoadingAi || selectedPolicies.length < 2}
              className="px-4 py-2.5 rounded-xl bg-[#C58B45] hover:bg-[#b57d3b] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isLoadingAi ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>AI Comparative Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Policy Selection Cards */}
        <div className="mt-6 pt-5 border-t border-[#E4E7DD]">
          <p className="text-xs font-bold text-[#173F35] mb-3">
            Select Policies to Compare (Pick 2 or 3):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {policies.map((p) => {
              const isSelected = selectedIds.includes(p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => togglePolicy(p.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#173F35] text-white border-[#173F35] shadow-xs'
                      : 'bg-[#F8F6EF] text-[#253B32] border-[#E4E7DD] hover:bg-[#DDECE2]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#DDECE2] text-[#173F35]'
                    }`}>
                      {p.shortCode}
                    </span>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                      isSelected ? 'bg-[#C58B45] border-[#C58B45] text-white' : 'border-[#66756A]/40'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <h4 className="text-xs font-bold line-clamp-1">{p.title}</h4>
                  <p className={`text-[11px] mt-1 line-clamp-2 ${isSelected ? 'text-[#DDECE2]/80' : 'text-[#66756A]'}`}>
                    {p.objective}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Synthesis Box (if generated) */}
      {aiComparison && (
        <div className="bg-white rounded-2xl p-6 border border-[#C58B45]/40 shadow-xs animate-in fade-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C58B45]" />
              <h3 className="text-sm font-bold text-[#173F35] uppercase tracking-wider">
                BhoomiNiti AI — Side-by-Side Synthesis
              </h3>
            </div>
            <button
              onClick={() => setAiComparison(null)}
              className="text-xs text-[#66756A] hover:text-[#173F35]"
            >
              Dismiss ✕
            </button>
          </div>
          <div className="p-4 rounded-xl bg-[#F8F6EF] border border-[#E4E7DD] text-xs text-[#253B32] whitespace-pre-line leading-relaxed font-sans">
            {aiComparison}
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Matrix Table */}
      <div className="bg-white rounded-2xl border border-[#E4E7DD] shadow-2xs overflow-hidden">
        <div className="p-4 bg-[#F8F6EF] border-b border-[#E4E7DD] flex items-center justify-between">
          <span className="text-xs font-bold text-[#173F35] uppercase tracking-wider">
            Side-by-Side Comparison Matrix ({selectedPolicies.length} selected)
          </span>
          <span className="text-[11px] text-[#66756A]">
            Comparing: {selectedPolicies.map((p) => p.shortCode).join(' vs ')}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E4E7DD] bg-white">
                <th className="p-4 w-48 text-[#66756A] font-bold uppercase tracking-wider bg-[#F8F6EF]/50">
                  Criteria
                </th>
                {selectedPolicies.map((p) => (
                  <th key={p.id} className="p-4 min-w-[280px] text-[#173F35] font-extrabold text-sm border-l border-[#E4E7DD]">
                    <div className="flex items-center justify-between">
                      <span>{p.title}</span>
                      <a 
                        href={p.sourceUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[#C58B45] hover:text-[#173F35] p-1"
                        title="Official policy link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <span className="block text-[11px] font-medium text-[#66756A] mt-0.5">
                      {p.ministry} ({p.yearIntroduced})
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7DD]">
              {comparisonCriteria.map((criterion, idx) => (
                <tr key={criterion.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8F6EF]/40'}>
                  <td className="p-4 font-bold text-[#173F35] align-top bg-[#F8F6EF]/60">
                    {criterion.label}
                  </td>
                  {selectedPolicies.map((p) => {
                    const value = (p as any)[criterion.key];
                    const isLimitation = criterion.key === 'limitations';
                    return (
                      <td key={p.id} className={`p-4 align-top border-l border-[#E4E7DD] leading-relaxed ${
                        isLimitation ? 'text-[#C74747]' : 'text-[#253B32]'
                      }`}>
                        {isLimitation && (
                          <div className="flex items-center gap-1 font-semibold text-[#C58B45] mb-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Bottleneck:</span>
                          </div>
                        )}
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Key Pillars row */}
              <tr className="bg-white">
                <td className="p-4 font-bold text-[#173F35] align-top bg-[#F8F6EF]/60">
                  Core Implementation Pillars
                </td>
                {selectedPolicies.map((p) => (
                  <td key={p.id} className="p-4 align-top border-l border-[#E4E7DD]">
                    <ul className="space-y-1">
                      {p.keyPillars.map((pillar, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-1.5 text-[11px] text-[#253B32]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#287A54] shrink-0" />
                          <span>{pillar}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
