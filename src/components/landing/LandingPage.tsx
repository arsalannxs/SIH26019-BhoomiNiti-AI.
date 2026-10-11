import React from 'react';
import { 
  LandPlot, 
  Search, 
  BarChart3, 
  Users, 
  ArrowRight, 
  FileCheck2, 
  Compass, 
  Sliders, 
  Database,
  Sparkles,
  Shield,
  Layers,
  ChevronRight
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface LandingPageProps {
  onEnterWorkspace: (tab?: NavigationTab) => void;
  onStartDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterWorkspace,
  onStartDemo,
}) => {
  return (
    <div className="min-h-screen bg-[#F8F6EF] text-[#253B32]">
      {/* Top Banner & Navigation */}
      <header className="border-b border-[#E4E7DD] bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#173F35] flex items-center justify-center text-white shadow-sm">
              <LandPlot className="w-6 h-6 text-[#C58B45]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-[#173F35] tracking-tight">BhoomiNiti</span>
                <span className="bg-[#C58B45] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">AI</span>
              </div>
              <p className="text-[11px] text-[#66756A] hidden sm:block">Department of Land Resources (DoLR) • MoRD</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#66756A] font-medium bg-[#DDECE2] px-2.5 py-1 rounded-md">
              <Shield className="w-3.5 h-3.5 text-[#173F35]" />
              SIH 2026 Problem SIH26019
            </span>
            <button
              onClick={onStartDemo}
              className="px-3.5 py-2 text-xs font-bold rounded-lg bg-[#C58B45] hover:bg-[#b57d3b] text-white transition-colors shadow-2xs"
            >
              RUN SIH DEMO
            </button>
            <button
              onClick={() => onEnterWorkspace('overview')}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#173F35] hover:bg-[#254F44] text-white transition-colors"
            >
              Open Workspace
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DDECE2] border border-[#E4E7DD] text-xs font-semibold text-[#173F35] mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#287A54]" />
            Smart India Hackathon 2026 • National Digital Platform for Land Governance
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#173F35] tracking-tight leading-tight">
            Better Research. <br className="hidden sm:block" />
            <span className="text-[#C58B45]">Smarter Land Policy.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#66756A] max-w-3xl mx-auto leading-relaxed">
            A unified digital workspace to discover research, explore land-related evidence and support informed policy decisions across India's land governance landscape.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onEnterWorkspace('library')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#173F35] hover:bg-[#254F44] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Research</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onEnterWorkspace('overview')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-[#F4E8D5] border border-[#E4E7DD] text-[#173F35] font-bold text-sm shadow-2xs transition-all flex items-center justify-center gap-2"
            >
              <span>Open Demo Dashboard</span>
              <ChevronRight className="w-4 h-4 text-[#C58B45]" />
            </button>
          </div>

          {/* Quick Metrics Banner */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-xl border border-[#E4E7DD] shadow-2xs text-left">
              <p className="text-xs text-[#66756A] font-medium">Research Repository</p>
              <p className="text-2xl font-extrabold text-[#173F35] mt-1">6+ Papers</p>
              <p className="text-[11px] text-[#287A54] mt-0.5 font-medium">Peer-reviewed & DoLR</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E4E7DD] shadow-2xs text-left">
              <p className="text-xs text-[#66756A] font-medium">Cadastral & Spatial Datasets</p>
              <p className="text-2xl font-extrabold text-[#173F35] mt-1">5 Catalogs</p>
              <p className="text-[11px] text-[#287A54] mt-0.5 font-medium">Open Gov Data (OGD)</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E4E7DD] shadow-2xs text-left">
              <p className="text-xs text-[#66756A] font-medium">Policy Frameworks</p>
              <p className="text-2xl font-extrabold text-[#173F35] mt-1">4 Comparative</p>
              <p className="text-[11px] text-[#C58B45] mt-0.5 font-medium">DILRMP • SVAMITVA</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E4E7DD] shadow-2xs text-left">
              <p className="text-xs text-[#66756A] font-medium">States Geo-Indexed</p>
              <p className="text-2xl font-extrabold text-[#173F35] mt-1">8 Key States</p>
              <p className="text-[11px] text-[#287A54] mt-0.5 font-medium">GIS spatial layers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Value Propositions */}
      <section className="py-16 bg-white border-y border-[#E4E7DD]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173F35]">
              Core Capabilities for Evidence-Based Land Governance
            </h2>
            <p className="mt-2 text-sm text-[#66756A]">
              Bridging academic scholarship, administrative records, and spatial mapping for actionable policy decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Discover Knowledge */}
            <div className="bg-[#F8F6EF] p-6 rounded-2xl border border-[#E4E7DD] hover:border-[#C58B45] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#173F35] text-[#C58B45] flex items-center justify-center mb-5">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#173F35]">1. Discover Knowledge</h3>
              <p className="mt-2 text-sm text-[#66756A] leading-relaxed">
                Centralized discovery of research papers, government orders, land tenancy case studies, and geospatial registries with AI-assisted contextual summarization.
              </p>
              <button
                onClick={() => onEnterWorkspace('library')}
                className="mt-4 text-xs font-bold text-[#173F35] hover:text-[#C58B45] flex items-center gap-1.5"
              >
                Explore Research Library <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. Analyze Evidence */}
            <div className="bg-[#F8F6EF] p-6 rounded-2xl border border-[#E4E7DD] hover:border-[#C58B45] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#C58B45] text-white flex items-center justify-center mb-5">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#173F35]">2. Analyze Evidence</h3>
              <p className="mt-2 text-sm text-[#66756A] leading-relaxed">
                Compare policy initiatives side-by-side, inspect state-level cadastral GIS indicators, and simulate policy scenario outcomes under documented assumptions.
              </p>
              <button
                onClick={() => onEnterWorkspace('policy')}
                className="mt-4 text-xs font-bold text-[#173F35] hover:text-[#C58B45] flex items-center gap-1.5"
              >
                Compare Policies & GIS <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3. Collaborate on Solutions */}
            <div className="bg-[#F8F6EF] p-6 rounded-2xl border border-[#E4E7DD] hover:border-[#C58B45] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#287A54] text-white flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#173F35]">3. Collaborate on Solutions</h3>
              <p className="mt-2 text-sm text-[#66756A] leading-relaxed">
                Empower research teams to manage multi-institution projects, submit innovation proposals for land titling sandboxes, and export synthesized reports.
              </p>
              <button
                onClick={() => onEnterWorkspace('collaboration')}
                className="mt-4 text-xs font-bold text-[#173F35] hover:text-[#C58B45] flex items-center gap-1.5"
              >
                Open Project Workspace <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SIH 2026 Context & Problem Statement */}
      <section className="py-16 bg-[#F8F6EF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 border border-[#E4E7DD] shadow-xs">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#E4E7DD]">
              <div>
                <span className="text-xs font-bold text-[#C58B45] uppercase tracking-wider">Smart India Hackathon 2026</span>
                <h3 className="text-xl font-bold text-[#173F35] mt-1">Problem Statement SIH26019</h3>
              </div>
              <div className="text-left md:text-right text-xs text-[#66756A]">
                <p className="font-semibold text-[#173F35]">Ministry of Rural Development</p>
                <p>Department of Land Resources (DoLR)</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm text-[#253B32] leading-relaxed">
              <p>
                Land governance involves land records, sustainable land use, urbanization, rural development, infrastructure, climate resilience, land disputes and policy implementation.
              </p>
              <p>
                Historically, research papers, government policy documents, datasets, case studies and geospatial information have been scattered across isolated departments and portals. <strong>BhoomiNiti AI</strong> establishes a national research workspace uniting textual revenue records, cadastral GIS data, empirical research papers, and policy scenario calculators.
              </p>
            </div>

            {/* Platform Modules Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Research Library', tab: 'library', icon: FileCheck2 },
                { label: 'Policy Explorer', tab: 'policy', icon: Compass },
                { label: 'Dataset Catalog', tab: 'datasets', icon: Database },
                { label: 'GIS Insights', tab: 'gis', icon: Layers },
                { label: 'Policy Simulator', tab: 'simulator', icon: Sliders },
                { label: 'Innovation Hub', tab: 'innovation', icon: Sparkles },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.label}
                    onClick={() => onEnterWorkspace(m.tab as NavigationTab)}
                    className="flex items-center gap-2.5 p-3 rounded-lg bg-[#F8F6EF] hover:bg-[#DDECE2] text-xs font-semibold text-[#173F35] transition-colors border border-[#E4E7DD] text-left"
                  >
                    <Icon className="w-4 h-4 text-[#C58B45]" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mandatory Disclaimer Box */}
          <div className="mt-8 p-4 rounded-xl bg-[#F4E8D5] border border-[#C58B45]/30 text-xs text-[#253B32] leading-relaxed">
            <span className="font-bold text-[#173F35]">Transparency Disclaimer: </span>
            BhoomiNiti AI is a prototype developed for Smart India Hackathon 2026. Sample resources, simulated data and illustrative policy scenarios must not be treated as official government data or validated policy forecasts. AI-generated summaries and recommendations require verification against original sources. Government integrations are not claimed unless actually implemented.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#173F35] text-white py-8 border-t border-[#254F44]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <LandPlot className="w-4 h-4 text-[#C58B45]" />
            <span className="font-bold text-white">BhoomiNiti AI</span>
            <span className="text-[#DDECE2]/70">— Department of Land Resources (DoLR) Prototype</span>
          </div>
          <p className="text-[#DDECE2]/60">Built for Smart India Hackathon 2026 • Problem SIH26019</p>
        </div>
      </footer>
    </div>
  );
};
