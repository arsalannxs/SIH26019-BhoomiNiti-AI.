import React, { useState } from 'react';
import { 
  Play, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Layers, 
  Sliders, 
  FileText, 
  BookOpen, 
  Database, 
  Users,
  ShieldCheck
} from 'lucide-react';
import { NavigationTab, ResearchResource } from '../../types';

interface DemoWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab) => void;
  onOpenResourceModal: (resource: ResearchResource) => void;
  firstResource: ResearchResource;
}

export const DemoWalkthroughModal: React.FC<DemoWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenResourceModal,
  firstResource,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const demoSteps = [
    {
      step: 1,
      tab: 'overview' as NavigationTab,
      title: '1. National Overview & Analytical Benchmarks',
      desc: 'Start at the Land Governance Research Overview dashboard. Observe verified publication counts, open datasets, and the Recharts comparative visualization of State Cadastral Digitization (%) vs SVAMITVA Drone Progress.',
      actionLabel: 'Go to Overview Dashboard',
      triggerAction: () => onNavigate('overview'),
    },
    {
      step: 2,
      tab: 'library' as NavigationTab,
      title: '2. Central Research Repository & Semantic Search',
      desc: 'Browse peer-reviewed papers, case studies, and DoLR reports. Filter by category, access level, or popular topics like #ULPIN, #DILRMP, #RuralCredit, or #DroneSurvey.',
      actionLabel: 'Open Research Library',
      triggerAction: () => onNavigate('library'),
    },
    {
      step: 3,
      tab: 'library' as NavigationTab,
      title: '3. Grounded Empirical Evidence & AI Summarization',
      desc: 'Inspect a verified empirical study (e.g. DILRMP & Rural Credit in Central India). Review empirical methodology, key findings, and generate a structured AI summary with explicit study limitations.',
      actionLabel: 'Inspect Sample Publication',
      triggerAction: () => {
        onNavigate('library');
        onOpenResourceModal(firstResource);
      },
    },
    {
      step: 4,
      tab: 'policy' as NavigationTab,
      title: '4. Policy Explorer & Side-by-Side Comparison Matrix',
      desc: 'Compare national policies side-by-side: Digital India Land Records Modernization Programme (DILRMP) vs SVAMITVA Drone Scheme vs Model Land Leasing Act. Highlight objectives, mechanisms, outcomes, and bottlenecks.',
      actionLabel: 'Open Policy Comparison Matrix',
      triggerAction: () => onNavigate('policy'),
    },
    {
      step: 5,
      tab: 'datasets' as NavigationTab,
      title: '5. Open Government Datasets & Schema Inspector',
      desc: 'Explore official OGD catalogs from DoLR, Survey of India, and NRSC Bhuvan. Inspect data column schemas, coverage, and update cadences.',
      actionLabel: 'View Dataset Catalog',
      triggerAction: () => onNavigate('datasets'),
    },
    {
      step: 6,
      tab: 'gis' as NavigationTab,
      title: '6. Interactive GIS Insights & State Governance Dossier',
      desc: 'Interact with the Leaflet spatial map of India. Toggle between SVAMITVA Drone Coverage, DILRMP RoR Computerization, Land Dispute Density, and Climate Vulnerability overlays.',
      actionLabel: 'Explore Interactive GIS Map',
      triggerAction: () => onNavigate('gis'),
    },
    {
      step: 7,
      tab: 'simulator' as NavigationTab,
      title: '7. Policy Scenario Simulator & Transparent Assumptions',
      desc: 'Adjust policy levers: Geographic coverage (10-750 districts), budget, and adoption rates. Compare Baseline vs Proposed Scenario outputs with transparent mathematical unit costs and clear disclaimers.',
      actionLabel: 'Launch Policy Simulator',
      triggerAction: () => onNavigate('simulator'),
    },
    {
      step: 8,
      tab: 'collaboration' as NavigationTab,
      title: '8. Collaborative Multi-Institutional Research Workspace',
      desc: 'Manage institutional land governance studies. Track research milestones, check off tasks, and coordinate cross-disciplinary teams across universities and revenue departments.',
      actionLabel: 'Open Collaboration Workspace',
      triggerAction: () => onNavigate('collaboration'),
    },
    {
      step: 9,
      tab: 'innovation' as NavigationTab,
      title: '9. Innovation Hub & SIH 2026 Proposal Sandbox',
      desc: 'Review cutting-edge proposals for AI-powered cadastral rectification and dispute mitigation. Submit innovative solutions for Smart India Hackathon Problem Statement SIH26019.',
      actionLabel: 'Explore Innovation Hub',
      triggerAction: () => onNavigate('innovation'),
    },
    {
      step: 10,
      tab: 'reports' as NavigationTab,
      title: '10. Evidence-Based Policy Brief Generator & PDF Export',
      desc: 'Compile selected research papers, policy matrices, GIS indicators, and simulator calculations into an exportable, printable policy brief for government decision-makers.',
      actionLabel: 'Open Report Builder & Print',
      triggerAction: () => onNavigate('reports'),
    },
  ];

  if (!isOpen) return null;

  const currentStep = demoSteps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < demoSteps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      demoSteps[nextIdx].triggerAction();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      demoSteps[prevIdx].triggerAction();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-lg w-full p-4 bg-white rounded-2xl border-2 border-[#C58B45] shadow-2xl animate-in slide-in-from-bottom-5">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E4E7DD]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#C58B45] text-white flex items-center justify-center font-bold">
            <Play className="w-3.5 h-3.5 fill-current" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-[#173F35] uppercase tracking-wider">
              Smart India Hackathon 2026 Walkthrough
            </h4>
            <span className="text-[10px] text-[#66756A]">
              Step {currentStep.step} of {demoSteps.length} (Under 3-Minute Tour)
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-md text-[#66756A] hover:bg-[#E4E7DD] transition-colors"
          title="Exit Tour"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="py-3.5 space-y-2 text-xs">
        <h3 className="font-extrabold text-sm text-[#173F35]">
          {currentStep.title}
        </h3>
        <p className="text-[#253B32] leading-relaxed text-xs">
          {currentStep.desc}
        </p>

        <div className="pt-2">
          <button
            onClick={() => currentStep.triggerAction()}
            className="w-full py-2 rounded-xl bg-[#DDECE2] hover:bg-[#c9e0d1] text-[#173F35] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{currentStep.actionLabel}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#C58B45]" />
          </button>
        </div>
      </div>

      {/* Progress Bar & Footer */}
      <div className="pt-3 border-t border-[#E4E7DD] flex items-center justify-between">
        <div className="flex items-center gap-1">
          {demoSteps.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setCurrentStepIndex(i);
                demoSteps[i].triggerAction();
              }}
              className={`h-1.5 rounded-full cursor-pointer transition-all ${
                i === currentStepIndex
                  ? 'w-5 bg-[#C58B45]'
                  : i < currentStepIndex
                  ? 'w-2 bg-[#287A54]'
                  : 'w-2 bg-[#E4E7DD]'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="px-2.5 py-1 rounded-lg border border-[#E4E7DD] text-xs font-semibold text-[#253B32] hover:bg-[#F8F6EF] disabled:opacity-30"
          >
            Previous
          </button>
          <button
            onClick={currentStepIndex === demoSteps.length - 1 ? onClose : handleNext}
            className="px-3 py-1 rounded-lg bg-[#173F35] hover:bg-[#254F44] text-white text-xs font-bold transition-colors flex items-center gap-1"
          >
            <span>{currentStepIndex === demoSteps.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
