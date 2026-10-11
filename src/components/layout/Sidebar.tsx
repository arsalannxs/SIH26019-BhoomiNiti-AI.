import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Compass, 
  Database, 
  MapPin, 
  Sliders, 
  Users, 
  Lightbulb, 
  FileText,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  LandPlot
} from 'lucide-react';
import { NavigationTab, UserRole } from '../../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  userRole: UserRole;
  isLandingView: boolean;
  setIsLandingView: (val: boolean) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  isLandingView,
  setIsLandingView,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'library', label: 'Research Library', icon: BookOpen, badge: '6' },
    { id: 'policy', label: 'Policy Explorer', icon: Compass, badge: '4' },
    { id: 'datasets', label: 'Datasets', icon: Database, badge: '5' },
    { id: 'gis', label: 'GIS Insights', icon: MapPin, badge: 'Live' },
    { id: 'simulator', label: 'Policy Simulator', icon: Sliders, badge: 'Model' },
    { id: 'collaboration', label: 'Collaboration', icon: Users, badge: '2' },
    { id: 'innovation', label: 'Innovation Hub', icon: Lightbulb, badge: 'SIH' },
    { id: 'reports', label: 'Reports', icon: FileText, badge: null },
  ] as const;

  const handleNavClick = (id: NavigationTab) => {
    setActiveTab(id);
    setIsLandingView(false);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-[#173F35] text-white flex flex-col justify-between
        transform transition-transform duration-200 ease-in-out
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        border-r border-[#173F35]/30 shadow-xl md:shadow-none
      `}>
        {/* Brand header */}
        <div className="p-5 border-b border-[#254F44]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#C58B45] flex items-center justify-center text-white shadow-md font-bold text-lg">
              <LandPlot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white">BhoomiNiti</span>
                <span className="bg-[#C58B45] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">AI</span>
              </div>
              <p className="text-[11px] text-[#DDECE2]/80 leading-tight">Research Smarter. Shape Better Land Governance.</p>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-[#254F44]/60 flex items-center justify-between text-[11px] text-[#DDECE2]/70">
            <span>DoLR • MoRD</span>
            <span className="bg-[#287A54]/60 text-white px-2 py-0.5 rounded font-mono text-[10px]">SIH26019</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = !isLandingView && activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as NavigationTab)}
                className={`
                  w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-[#C58B45] text-white shadow-sm font-semibold' 
                    : 'text-[#DDECE2] hover:bg-[#254F44] hover:text-white'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#DDECE2]/70'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-[#254F44] text-[#DDECE2]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom controls & Role display */}
        <div className="p-3 border-t border-[#254F44] bg-[#12332B] space-y-2">
          {/* Landing page toggle */}
          <button
            onClick={() => {
              setIsLandingView(!isLandingView);
              setIsOpenMobile(false);
            }}
            className={`
              w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors
              ${isLandingView 
                ? 'bg-[#C58B45] text-white' 
                : 'bg-[#254F44]/60 text-[#DDECE2] hover:bg-[#254F44]'}
            `}
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              {isLandingView ? 'Back to App Dashboard' : 'Public Landing Page'}
            </span>
            <ChevronRight className="w-3 h-3" />
          </button>

          {/* User Role Card */}
          <div className="bg-[#173F35] p-2.5 rounded-lg border border-[#254F44] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C58B45]" />
              <div>
                <p className="text-[10px] text-[#DDECE2]/70 uppercase tracking-wider font-semibold">Active Role</p>
                <p className="text-xs font-medium text-white truncate max-w-[120px]">{userRole}</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#287A54] animate-pulse" title="System Active" />
          </div>
        </div>
      </aside>
    </>
  );
};
