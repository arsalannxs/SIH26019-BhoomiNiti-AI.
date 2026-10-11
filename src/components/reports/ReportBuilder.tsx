import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  AlertCircle, 
  Layers, 
  BookOpen, 
  Compass, 
  Database,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { ResearchResource, PolicyDocument } from '../../types';
import { STATE_GIS_DATA } from '../../data/mockData';

interface ReportBuilderProps {
  resources: ResearchResource[];
  policies: PolicyDocument[];
}

export const ReportBuilder: React.FC<ReportBuilderProps> = ({ resources, policies }) => {
  const [reportTitle, setReportTitle] = useState('Evidence-Based Land Governance Synthesis Brief: National Cadastral Digitization & Title Security');
  const [leadAuthor, setLeadAuthor] = useState('National Land Governance Policy Working Group');
  const [includeExecutiveSummary, setIncludeExecutiveSummary] = useState(true);
  const [includeResearchCitations, setIncludeResearchCitations] = useState(true);
  const [includePolicyComparison, setIncludePolicyComparison] = useState(true);
  const [includeGISInsights, setIncludeGISInsights] = useState(true);
  const [includeSimulatorScenario, setIncludeSimulatorScenario] = useState(true);
  const [includeLimitations, setIncludeLimitations] = useState(true);

  // Selected items for the report
  const [selectedResourceIds, setSelectedResourceIds] = useState<string[]>([resources[0]?.id || '', resources[1]?.id || '']);
  const [selectedPolicyIds, setSelectedPolicyIds] = useState<string[]>([policies[0]?.id || '', policies[1]?.id || '']);

  const toggleResource = (id: string) => {
    setSelectedResourceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const togglePolicy = (id: string) => {
    setSelectedPolicyIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const markdownContent = `# ${reportTitle}
**Author:** ${leadAuthor}
**Platform:** BhoomiNiti AI (SIH26019 Prototype)
**Date:** ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

---

## 1. Executive Summary
Land governance modernization in India necessitates unifying alphanumeric Record of Rights (RoRs) with high-resolution cadastral spatial maps (Bhu-Naksha) under Unique Land Parcel Identification Number (ULPIN / Bhu-Aadhaar). Evidence indicates that conclusive spatial demarcation reduces mortgage turnaround latency and minimizes civil boundary dispute pendency in revenue courts.

## 2. Synthesized Research Publications
${resources
  .filter((r) => selectedResourceIds.includes(r.id))
  .map(
    (r, i) => `### [${i + 1}] ${r.title}
- **Category:** ${r.category} (${r.year})
- **Author/Org:** ${r.author} (${r.organization})
- **Key Evidence:** ${r.keyFindings.join(' ')}
- **Methodological Limitation:** ${r.limitations}
- **Reference:** ${r.doiOrRef}
`
  )
  .join('\n')}

## 3. Policy Framework Comparative Matrix
${policies
  .filter((p) => selectedPolicyIds.includes(p.id))
  .map(
    (p) => `### ${p.title} (${p.shortCode})
- **Objective:** ${p.objective}
- **Mechanism:** ${p.implementationMechanism}
- **Outcomes:** ${p.reportedOutcomes}
- **Limitations:** ${p.limitations}
`
  )
  .join('\n')}

## 4. State GIS Cadastral Benchmarks
${STATE_GIS_DATA.slice(0, 4)
  .map(
    (s) => `- **${s.stateName}:** DILRMP Digitization: ${s.dilrmpDigitizationPercent}%, SVAMITVA Drone: ${s.svamitvaDroneCoveragePercent}%, Dispute Density: ${s.landDisputeDensityPer10k}/10k parcels`
  )
  .join('\n')}

## 5. Illustrative Policy Simulation Outputs
- **Scenario:** Scaling drone-assisted Abadi demarcation across 150 targeted districts.
- **Projected Coverage:** 38,200 villages surveyed, 84.0 Lakh property cards issued.
- **Economic Impact:** Estimated ₹ 185 Cr in reduced revenue litigation overhead.
*(Label: ILLUSTRATIVE SCENARIO — NOT AN OFFICIAL FORECAST)*

---
**Disclaimer:** BhoomiNiti AI is a prototype developed for Smart India Hackathon 2026. Sample resources and simulated scenarios are for research illustration only.
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BhoomiNiti_Land_Governance_Report_${Date.now()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DDECE2] text-[#173F35] text-xs font-semibold mb-2">
              <FileText className="w-3.5 h-3.5 text-[#C58B45]" />
              <span>Evidence Brief Builder</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#173F35]">
              Evidence-Based Report Generator
            </h2>
            <p className="text-xs text-[#66756A] mt-1 max-w-2xl">
              Synthesize selected research papers, policy comparisons, GIS state benchmarks, and scenario calculations into a formal policy brief.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMarkdown}
              className="px-3.5 py-2 rounded-xl bg-[#F8F6EF] hover:bg-[#DDECE2] text-[#253B32] text-xs font-bold transition-all border border-[#E4E7DD] flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Markdown</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#173F35] hover:bg-[#254F44] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-[#C58B45]" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Report Customizer Controls */}
        <div className="mt-6 pt-4 border-t border-[#E4E7DD] grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-[#173F35] block mb-1">Report Title</label>
            <input
              type="text"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] text-xs font-semibold text-[#173F35] focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#173F35] block mb-1">Author / Lead Working Group</label>
            <input
              type="text"
              value={leadAuthor}
              onChange={(e) => setLeadAuthor(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] text-xs font-semibold text-[#173F35] focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Section toggles */}
        <div className="mt-4 pt-3 border-t border-[#E4E7DD] flex flex-wrap items-center gap-4 text-xs font-medium text-[#253B32]">
          <span className="font-bold text-[#173F35]">Include Sections:</span>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeExecutiveSummary}
              onChange={(e) => setIncludeExecutiveSummary(e.target.checked)}
              className="accent-[#173F35]"
            />
            <span>Executive Summary</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeResearchCitations}
              onChange={(e) => setIncludeResearchCitations(e.target.checked)}
              className="accent-[#173F35]"
            />
            <span>Research Evidence ({selectedResourceIds.length})</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includePolicyComparison}
              onChange={(e) => setIncludePolicyComparison(e.target.checked)}
              className="accent-[#173F35]"
            />
            <span>Policy Comparison ({selectedPolicyIds.length})</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeGISInsights}
              onChange={(e) => setIncludeGISInsights(e.target.checked)}
              className="accent-[#173F35]"
            />
            <span>GIS State Dossier</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSimulatorScenario}
              onChange={(e) => setIncludeSimulatorScenario(e.target.checked)}
              className="accent-[#173F35]"
            />
            <span>Illustrative Scenario</span>
          </label>
        </div>
      </div>

      {/* Live Printable Report Preview */}
      <div className="bg-white rounded-2xl border border-[#E4E7DD] p-8 md:p-12 shadow-sm print:p-0 print:border-none print:shadow-none space-y-8">
        {/* Document Header */}
        <div className="border-b-2 border-[#173F35] pb-6">
          <div className="flex items-center justify-between text-xs text-[#66756A] mb-3">
            <span className="font-extrabold uppercase tracking-widest text-[#173F35]">
              BHOOMINITI AI • EVIDENCE-BASED POLICY BRIEF
            </span>
            <span className="font-mono">
              SIH 2026 • DoLR MoRD Reference Document
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F35] leading-tight">
            {reportTitle}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#253B32]">
            <span><strong>Author:</strong> {leadAuthor}</span>
            <span>•</span>
            <span><strong>Date:</strong> {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>•</span>
            <span className="bg-[#DDECE2] text-[#173F35] px-2 py-0.5 rounded font-semibold text-[11px]">
              Grounded Evidence
            </span>
          </div>
        </div>

        {/* 1. Executive Summary */}
        {includeExecutiveSummary && (
          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-[#173F35] uppercase tracking-wider border-b border-[#E4E7DD] pb-1">
              1. Executive Overview & Policy Context
            </h2>
            <p className="text-sm text-[#253B32] leading-relaxed">
              India's land governance modernizes from presumptive paper mutations to spatial, conclusive land records. Programs including the Digital India Land Records Modernization Programme (DILRMP), SVAMITVA, and Bhu-Aadhaar (ULPIN) form the foundation of this transition. This brief aggregates empirical findings on credit acceleration, boundary dispute reduction, and climate-resilient spatial land allocation.
            </p>
          </section>
        )}

        {/* 2. Research Evidence */}
        {includeResearchCitations && (
          <section className="space-y-4">
            <h2 className="text-base font-extrabold text-[#173F35] uppercase tracking-wider border-b border-[#E4E7DD] pb-1">
              2. Curated Research Evidence & Empirical Findings
            </h2>
            <div className="space-y-4">
              {resources
                .filter((r) => selectedResourceIds.includes(r.id))
                .map((res, idx) => (
                  <div key={res.id} className="p-4 rounded-xl bg-[#F8F6EF] border border-[#E4E7DD] space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[#66756A]">
                      <span className="font-bold text-[#173F35]">[{idx + 1}] {res.title}</span>
                      <span>{res.year}</span>
                    </div>
                    <p className="text-[#253B32] leading-relaxed italic">{res.abstract}</p>
                    <div className="mt-2">
                      <span className="font-bold text-[#173F35]">Core Findings: </span>
                      <ul className="list-disc list-inside mt-1 text-[#253B32] space-y-0.5">
                        {res.keyFindings.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 text-[11px] text-[#C58B45] font-medium">
                      <span>Methodological Limitations: </span>
                      <span className="text-[#253B32]">{res.limitations}</span>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* 3. Policy Comparison */}
        {includePolicyComparison && (
          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-[#173F35] uppercase tracking-wider border-b border-[#E4E7DD] pb-1">
              3. Comparative Analysis of National Land Policies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {policies
                .filter((p) => selectedPolicyIds.includes(p.id))
                .map((pol) => (
                  <div key={pol.id} className="p-4 rounded-xl border border-[#E4E7DD] bg-white text-xs space-y-2">
                    <h3 className="font-extrabold text-sm text-[#173F35]">{pol.title}</h3>
                    <p className="text-[#66756A]"><strong>Objective:</strong> {pol.objective}</p>
                    <p className="text-[#66756A]"><strong>Mechanism:</strong> {pol.implementationMechanism}</p>
                    <p className="text-[#287A54]"><strong>Outcomes:</strong> {pol.reportedOutcomes}</p>
                    <p className="text-[#C74747]"><strong>Bottleneck:</strong> {pol.limitations}</p>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* 4. State GIS Indicators */}
        {includeGISInsights && (
          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-[#173F35] uppercase tracking-wider border-b border-[#E4E7DD] pb-1">
              4. State Cadastral & Dispute Spatial Indicators
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F6EF] border-b border-[#E4E7DD]">
                    <th className="p-2.5 font-bold text-[#173F35]">State</th>
                    <th className="p-2.5 font-bold text-[#173F35]">DILRMP Digitized</th>
                    <th className="p-2.5 font-bold text-[#173F35]">SVAMITVA Drone</th>
                    <th className="p-2.5 font-bold text-[#173F35]">Dispute Density</th>
                    <th className="p-2.5 font-bold text-[#173F35]">Property Cards</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E7DD]">
                  {STATE_GIS_DATA.slice(0, 5).map((st) => (
                    <tr key={st.stateCode}>
                      <td className="p-2.5 font-bold">{st.stateName}</td>
                      <td className="p-2.5">{st.dilrmpDigitizationPercent}%</td>
                      <td className="p-2.5">{st.svamitvaDroneCoveragePercent}%</td>
                      <td className="p-2.5">{st.landDisputeDensityPer10k} / 10k</td>
                      <td className="p-2.5">{(st.propertyCardsIssued / 100000).toFixed(1)} Lakh</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 5. Policy Simulation Output */}
        {includeSimulatorScenario && (
          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-[#173F35] uppercase tracking-wider border-b border-[#E4E7DD] pb-1">
              5. Illustrative Scenario Simulation: Cadastral Scaling
            </h2>
            <div className="p-4 rounded-xl bg-[#F8F6EF] border border-[#E4E7DD] text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-[#173F35]">
                <span>Intervention: 150 District Cadastral Drone Rollout (₹ 450 Cr Budget)</span>
                <span className="text-[10px] bg-[#F4E8D5] text-[#C58B45] px-2 py-0.5 rounded font-mono">
                  ILLUSTRATIVE SCENARIO
                </span>
              </div>
              <p className="text-[#66756A] leading-relaxed">
                Under documented assumptions (₹ 3.5L/village cost, 220 parcels/village), model projects coverage of 38,200 revenue villages, issuing 84.0 Lakh formal property cards and reducing court boundary dispute filings by an estimated 38%.
              </p>
            </div>
          </section>
        )}

        {/* Mandatory Transparency Disclaimer */}
        <div className="pt-6 border-t border-[#E4E7DD] text-[11px] text-[#66756A] leading-relaxed">
          <p className="font-bold text-[#173F35]">Transparency & Source Disclaimer:</p>
          <p className="mt-1">
            BhoomiNiti AI is a prototype developed for Smart India Hackathon 2026 (Problem Statement SIH26019). Sample resources, simulated data and illustrative policy scenarios must not be treated as official government data or validated policy forecasts. AI-generated summaries and recommendations require verification against original sources. Government integrations are not claimed unless actually implemented.
          </p>
        </div>
      </div>
    </div>
  );
};
