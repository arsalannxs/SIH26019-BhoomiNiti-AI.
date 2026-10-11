import React from 'react';
import { 
  Menu, 
  Search, 
  Sparkles, 
  Bot, 
  Bookmark, 
  ShieldCheck,
  Play
} from 'lucide-react';
import { NavigationTab, UserRole } from '../../types';

interface HeaderProps {
  activeTab: NavigationTab;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenAssistant: () => void;
  onStartDemo: () => void;
  savedCount: number;
  onOpenSaved: () => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  onGlobalSearchSubmit: (e: React.FormEvent) => void;
  setIsOpenMobile: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  userRole,
  setUserRole,
  onOpenAssistant,
  onStartDemo,
  savedCount,
  onOpenSaved,
  globalSearchQuery,
  setGlobalSearchQuery,
  onGlobalSearchSubmit,
  setIsOpenMobile,
}) => {
  const titles: Record<NavigationTab, { title: string; subtitle: string }> = {
    overview: {
      title: 'Land Governance Research Overview',
      subtitle: 'Explore research, datasets, policy insights and collaborative projects.',
    },
    library: {
      title: 'Central Research Repository',
      subtitle: 'Searchable database of peer-reviewed papers, case studies, and policy guidelines.',
    },
    policy: {
      title: 'Policy Explorer & Comparison Workspace',
      subtitle: 'Side-by-side evidence analysis of national and state land governance frameworks.',
    },
    datasets: {
      title: 'Geospatial & Administrative Dataset Catalog',
      subtitle: 'Discover verified Open Government Data and cadastral spatial repositories.',
    },
    gis: {
      title: 'GIS Land Governance Insights',
      subtitle: 'Interactive spatial visualization of land administration indicators across India.',
    },
    simulator: {
      title: 'Policy Scenario Simulator',
      subtitle: 'Explore the projected impact of land administration reforms under documented assumptions.',
    },
    collaboration: {
      title: 'Research Project Workspaces',
      subtitle: 'Collaborative workspaces for institutional land research teams and policy analysts.',
    },
    innovation: {
      title: 'Innovation Hub & Open Calls',
      subtitle: 'Submit research proposals, pilot experiments, and Smart India Hackathon solutions.',
    },
    reports: {
      title: 'Evidence-Based Report Generator',
      subtitle: 'Synthesize research resources, policy comparisons, and GIS findings into exportable briefs.',
    },
  };

  const currentMeta = titles[activeTab] || titles.overview;

  const roles: UserRole[] = [
    'Public User',
    'Researcher',
    'Policymaker',
    'Institution Administrator',
    'Platform Administrator',
  ];

  return (
    <header className="bg-white border-b border-[#E4E7DD] sticky top-0 z-30 px-4 lg:px-8 py-3.5 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Mobile hamburger & breadcrumb / title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpenMobile(true)}
            className="md:hidden p-2 rounded-lg text-[#253B32] hover:bg-[#DDECE2] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs text-[#66756A]">
              <span className="font-semibold text-[#173F35]">BhoomiNiti AI</span>
              <span>/</span>
              <span className="capitalize">{activeTab}</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-[#173F35] tracking-tight">
              {currentMeta.title}
            </h1>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick search input */}
          <form onSubmit={onGlobalSearchSubmit} className="relative hidden sm:block">
            <Search className="w-4 h-4 text-[#66756A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search research, policies, ULPIN..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35] w-52 lg:w-64 transition-all text-[#253B32]"
            />
          </form>

          {/* Bookmarks quick button */}
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E4E7DD] bg-white hover:bg-[#F8F6EF] text-xs font-medium text-[#253B32] transition-colors"
            title="View Bookmarked Resources"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#C58B45]" />
            <span className="hidden lg:inline">Saved</span>
            <span className="bg-[#DDECE2] text-[#173F35] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {savedCount}
            </span>
          </button>

          {/* Ask AI Assistant */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#DDECE2] hover:bg-[#c9e0d1] text-xs font-semibold text-[#173F35] transition-colors shadow-2xs"
          >
            <Bot className="w-4 h-4 text-[#173F35]" />
            <span>AI Assistant</span>
          </button>

          {/* RUN SIH DEMO Button (Prominent) */}
          <button
            onClick={onStartDemo}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C58B45] hover:bg-[#b57d3b] text-white text-xs font-bold transition-all shadow-sm ring-2 ring-[#C58B45]/20 animate-subtle-pulse"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>RUN SIH DEMO</span>
          </button>

          {/* Role selector dropdown */}
          <div className="relative flex items-center">
            <label htmlFor="role-select" className="sr-only">Select Role</label>
            <div className="flex items-center gap-1.5 bg-[#F8F6EF] px-2.5 py-1.5 rounded-lg border border-[#E4E7DD] text-xs text-[#253B32]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#173F35]" />
              <select
                id="role-select"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="bg-transparent text-xs font-semibold text-[#173F35] focus:outline-none cursor-pointer"
              >
                {roles.map((r) => (
                  <option key={r} value={r} className="text-[#253B32]">
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
