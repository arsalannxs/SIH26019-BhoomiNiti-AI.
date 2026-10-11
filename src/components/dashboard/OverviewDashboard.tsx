import React from 'react';
import { 
  BookOpen, 
  Database, 
  Compass, 
  Users, 
  ArrowRight, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  Bookmark,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { ResearchResource, PolicyDocument, NavigationTab } from '../../types';
import { STATE_GIS_DATA, INITIAL_PROJECTS } from '../../data/mockData';

interface OverviewDashboardProps {
  resources: ResearchResource[];
  policies: PolicyDocument[];
  onNavigate: (tab: NavigationTab) => void;
  onOpenResource: (resource: ResearchResource) => void;
  onTopicClick: (topic: string) => void;
  onStartDemo: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  resources,
  policies,
  onNavigate,
  onOpenResource,
  onTopicClick,
  onStartDemo,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
}) => {
  // Chart data comparing Cadastral Digitization % vs Land Dispute Density across states
  const chartData = STATE_GIS_DATA.map((s) => ({
    state: s.stateName,
    code: s.stateCode,
    digitization: s.dilrmpDigitizationPercent,
    droneCoverage: s.svamitvaDroneCoveragePercent,
    disputeDensity: s.landDisputeDensityPer10k,
  }));

  const popularTopics = [
    'DILRMP',
    'SVAMITVA',
    'ULPIN (Bhu-Aadhaar)',
    'Cadastral Digitization',
    'Rural Credit',
    'Climate Resilience',
    'Land Disputes',
    'Tenancy Reform'
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Search */}
      <div className="bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DDECE2] text-[#173F35] text-xs font-semibold mb-2">
              <span>Department of Land Resources</span>
              <span>•</span>
              <span>Evidence Portal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#173F35]">
              Land Governance Research Overview
            </h2>
            <p className="text-sm text-[#66756A] mt-1">
              Explore research, datasets, policy insights and collaborative projects across India.
            </p>
          </div>

          {/* Quick Search Form */}
          <form onSubmit={onSearchSubmit} className="flex items-center gap-2 max-w-md w-full">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#66756A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search publications, policy acts, ULPIN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E4E7DD] bg-[#F8F6EF] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173F35] text-[#253B32]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#173F35] hover:bg-[#254F44] text-white text-xs font-semibold transition-colors shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Popular Topic Pills */}
        <div className="mt-4 pt-4 border-t border-[#E4E7DD] flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#173F35]">Popular Topics:</span>
          {popularTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => onTopicClick(topic)}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#F8F6EF] hover:bg-[#DDECE2] text-[#253B32] border border-[#E4E7DD] transition-colors"
            >
              #{topic}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div 
          onClick={() => onNavigate('library')}
          className="bg-white p-5 rounded-2xl border border-[#E4E7DD] shadow-2xs hover:border-[#173F35] cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#66756A]">Research Resources</span>
            <div className="w-9 h-9 rounded-lg bg-[#DDECE2] text-[#173F35] flex items-center justify-center group-hover:bg-[#173F35] group-hover:text-white transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#173F35]">{resources.length}</span>
            <span className="text-xs text-[#287A54] font-semibold">Verified Catalog</span>
          </div>
          <p className="mt-1 text-xs text-[#66756A]">Peer-reviewed papers & case studies</p>
          <div className="mt-3 pt-2 border-t border-[#E4E7DD] flex items-center justify-between text-[11px] text-[#173F35] font-semibold">
            <span>Browse Library</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => onNavigate('datasets')}
          className="bg-white p-5 rounded-2xl border border-[#E4E7DD] shadow-2xs hover:border-[#173F35] cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#66756A]">Datasets Available</span>
            <div className="w-9 h-9 rounded-lg bg-[#F4E8D5] text-[#C58B45] flex items-center justify-center group-hover:bg-[#C58B45] group-hover:text-white transition-colors">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#173F35]">5</span>
            <span className="text-xs text-[#287A54] font-semibold">Open Gov Repos</span>
          </div>
          <p className="mt-1 text-xs text-[#66756A]">DILRMP, SVAMITVA, NRSC LULC</p>
          <div className="mt-3 pt-2 border-t border-[#E4E7DD] flex items-center justify-between text-[11px] text-[#173F35] font-semibold">
            <span>View Datasets</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => onNavigate('policy')}
          className="bg-white p-5 rounded-2xl border border-[#E4E7DD] shadow-2xs hover:border-[#173F35] cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#66756A]">Policy Studies</span>
            <div className="w-9 h-9 rounded-lg bg-[#DDECE2] text-[#287A54] flex items-center justify-center group-hover:bg-[#287A54] group-hover:text-white transition-colors">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#173F35]">{policies.length}</span>
            <span className="text-xs text-[#C58B45] font-semibold">Comparative Matrix</span>
          </div>
          <p className="mt-1 text-xs text-[#66756A]">National & state model frameworks</p>
          <div className="mt-3 pt-2 border-t border-[#E4E7DD] flex items-center justify-between text-[11px] text-[#173F35] font-semibold">
            <span>Compare Policies</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => onNavigate('collaboration')}
          className="bg-white p-5 rounded-2xl border border-[#E4E7DD] shadow-2xs hover:border-[#173F35] cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#66756A]">Active Research Teams</span>
            <div className="w-9 h-9 rounded-lg bg-[#DDECE2] text-[#173F35] flex items-center justify-center group-hover:bg-[#173F35] group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#173F35]">{INITIAL_PROJECTS.length}</span>
            <span className="text-[10px] bg-[#DDECE2] text-[#173F35] px-1.5 py-0.5 rounded font-mono font-bold">DEMO DATA</span>
          </div>
          <p className="mt-1 text-xs text-[#66756A]">Institutional research sandboxes</p>
          <div className="mt-3 pt-2 border-t border-[#E4E7DD] flex items-center justify-between text-[11px] text-[#173F35] font-semibold">
            <span>Enter Workspaces</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Main Analytical Chart & Featured Policy Studies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Analytical Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-[#173F35] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C58B45]" />
                State Cadastral Digitization vs. SVAMITVA Drone Progress
              </h3>
              <p className="text-xs text-[#66756A]">
                Comparative benchmarks across key states (Source: DoLR & Survey of India administrative updates)
              </p>
            </div>
            <span className="text-[10px] bg-[#F8F6EF] border border-[#E4E7DD] text-[#66756A] px-2 py-1 rounded font-mono">
              Unit: Percentage (%)
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7DD" />
                <XAxis 
                  dataKey="code" 
                  tick={{ fill: '#66756A', fontSize: 11 }} 
                  axisLine={{ stroke: '#E4E7DD' }} 
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fill: '#66756A', fontSize: 11 }} 
                  axisLine={{ stroke: '#E4E7DD' }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E4E7DD', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: any, name: any) => [`${value}%`, name === 'digitization' ? 'DILRMP RoR Digitization' : 'SVAMITVA Drone Coverage']}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  wrapperStyle={{ fontSize: '12px' }}
                  formatter={(value) => value === 'digitization' ? 'DILRMP Digitization (%)' : 'SVAMITVA Drone Coverage (%)'}
                />
                <Bar dataKey="digitization" fill="#173F35" radius={[4, 4, 0, 0]} />
                <Bar dataKey="droneCoverage" fill="#C58B45" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-[#E4E7DD] flex flex-wrap items-center justify-between text-xs text-[#66756A]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#287A54]" />
              High RoR computerization correlates with faster title encumbrance verification.
            </span>
            <button
              onClick={() => onNavigate('gis')}
              className="text-[#173F35] hover:text-[#C58B45] font-bold flex items-center gap-1"
            >
              Open Interactive GIS Map <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right 1 Col: Featured Policy Studies */}
        <div className="bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#173F35] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C58B45]" />
                Featured Policies
              </h3>
              <button
                onClick={() => onNavigate('policy')}
                className="text-xs font-semibold text-[#173F35] hover:text-[#C58B45]"
              >
                View all
              </button>
            </div>

            <div className="space-y-3.5">
              {policies.slice(0, 3).map((policy) => (
                <div 
                  key={policy.id} 
                  className="p-3 rounded-xl bg-[#F8F6EF] border border-[#E4E7DD] hover:border-[#173F35] transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs text-[#173F35]">{policy.shortCode}</span>
                    <span className="text-[10px] bg-[#DDECE2] text-[#173F35] px-1.5 py-0.5 rounded font-medium">
                      {policy.yearIntroduced}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#253B32] mt-1 line-clamp-1">{policy.title}</p>
                  <p className="text-[11px] text-[#66756A] mt-1 line-clamp-2">{policy.objective}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E4E7DD]">
            <button
              onClick={() => onNavigate('policy')}
              className="w-full py-2 rounded-lg bg-[#DDECE2] hover:bg-[#c9e0d1] text-xs font-bold text-[#173F35] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Side-by-Side Policy Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recently Added Resources & Collaborative Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recently Added Resources */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#173F35] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C58B45]" />
                Recently Added Publications & Reports
              </h3>
              <p className="text-xs text-[#66756A]">Curated research resources with grounded findings</p>
            </div>
            <button
              onClick={() => onNavigate('library')}
              className="text-xs font-semibold text-[#173F35] hover:text-[#C58B45] flex items-center gap-1"
            >
              <span>All ({resources.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-[#E4E7DD]">
            {resources.slice(0, 3).map((res) => (
              <div 
                key={res.id} 
                onClick={() => onOpenResource(res)}
                className="py-3.5 first:pt-0 last:pb-0 hover:bg-[#F8F6EF]/60 p-2 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-[#C58B45]">{res.category}</span>
                  <span className="text-[#66756A] text-[11px]">{res.date}</span>
                </div>
                <h4 className="text-sm font-bold text-[#173F35] mt-1 group-hover:text-[#C58B45] transition-colors">
                  {res.title}
                </h4>
                <p className="text-xs text-[#66756A] mt-1 line-clamp-2 leading-relaxed">
                  {res.abstract}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-medium text-[#253B32]">
                    By {res.author} • {res.organization}
                  </span>
                  {res.topicTags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] bg-[#DDECE2] text-[#173F35] px-1.5 py-0.5 rounded font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Recent Collaboration Activity */}
        <div className="bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#173F35] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C58B45]" />
                Ongoing Research
              </h3>
              <span className="text-[10px] font-mono text-[#66756A]">Workspaces</span>
            </div>

            <div className="space-y-4">
              {INITIAL_PROJECTS.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl bg-[#F8F6EF] border border-[#E4E7DD]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#DDECE2] text-[#173F35]">
                      {proj.status}
                    </span>
                    <span className="text-[10px] text-[#66756A] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {proj.updatedAt}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#173F35] mt-2 leading-snug">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-[#66756A] mt-1 line-clamp-2">
                    {proj.researchQuestion}
                  </p>
                  <div className="mt-2 pt-2 border-t border-[#E4E7DD] flex items-center justify-between text-[11px] text-[#253B32]">
                    <span>Lead: {proj.leadResearcher.split(' ')[0]}</span>
                    <span>{proj.tasks.filter(t => t.done).length}/{proj.tasks.length} Tasks Done</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E4E7DD]">
            <button
              onClick={() => onNavigate('collaboration')}
              className="w-full py-2 rounded-lg bg-[#173F35] hover:bg-[#254F44] text-xs font-bold text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Manage Research Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
