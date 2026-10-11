/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavigationTab, UserRole, ResearchResource, ResearchProject } from './types';
import { 
  INITIAL_RESOURCES, 
  POLICY_DOCUMENTS, 
  DATASET_CATALOG, 
  INITIAL_PROJECTS 
} from './data/mockData';

// Layout & Views
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { LandingPage } from './components/landing/LandingPage';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { ResearchLibrary } from './components/library/ResearchLibrary';
import { ResourceDetailModal } from './components/library/ResourceDetailModal';
import { PolicyExplorer } from './components/policy/PolicyExplorer';
import { DatasetCatalog } from './components/datasets/DatasetCatalog';
import { GISInsights } from './components/gis/GISInsights';
import { PolicySimulator } from './components/simulator/PolicySimulator';
import { CollaborativeWorkspaces } from './components/collaboration/CollaborativeWorkspaces';
import { InnovationHub } from './components/innovation/InnovationHub';
import { ReportBuilder } from './components/reports/ReportBuilder';
import { ResearchAssistantModal } from './components/ai/ResearchAssistantModal';
import { DemoWalkthroughModal } from './components/demo/DemoWalkthroughModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [isLandingView, setIsLandingView] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('Researcher');
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Data states
  const [resources, setResources] = useState<ResearchResource[]>(INITIAL_RESOURCES);
  const [projects, setProjects] = useState<ResearchProject[]>(INITIAL_PROJECTS);
  const [savedIds, setSavedIds] = useState<string[]>(['res-01', 'res-03', 'res-06']);

  // Modals & Assistant
  const [selectedResourceForModal, setSelectedResourceForModal] = useState<ResearchResource | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Search & Topic Filter Bridge
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [activeTopicFilter, setActiveTopicFilter] = useState<string | null>(null);

  const toggleBookmark = (id: string) => {
    setSavedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleGlobalSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearchQuery.trim()) {
      setActiveTab('library');
      setIsLandingView(false);
    }
  };

  const handleTopicClick = (topic: string) => {
    setActiveTopicFilter(topic);
    setActiveTab('library');
    setIsLandingView(false);
  };

  const handleCreateProject = (newProj: ResearchProject) => {
    setProjects([newProj, ...projects]);
  };

  const handleToggleTask = (projectId: string, taskId: string) => {
    setProjects(projects.map((p) => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        tasks: p.tasks.map((t) => t.id === taskId ? { ...t, done: !t.done } : t),
        updatedAt: 'Just now',
      };
    }));
  };

  const handleUpdateStatus = (projectId: string, newStatus: ResearchProject['status']) => {
    setProjects(projects.map((p) => {
      if (p.id !== projectId) return p;
      return { ...p, status: newStatus, updatedAt: 'Just now' };
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F6EF] text-[#253B32] flex flex-col font-sans">
      {/* If Landing view is toggled */}
      {isLandingView ? (
        <LandingPage
          onEnterWorkspace={(targetTab) => {
            if (targetTab) setActiveTab(targetTab);
            setIsLandingView(false);
          }}
          onStartDemo={() => {
            setIsLandingView(false);
            setActiveTab('overview');
            setIsDemoOpen(true);
          }}
        />
      ) : (
        <div className="flex flex-1 min-h-screen">
          {/* Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userRole={userRole}
            isLandingView={isLandingView}
            setIsLandingView={setIsLandingView}
            isOpenMobile={isOpenMobile}
            setIsOpenMobile={setIsOpenMobile}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <Header
              activeTab={activeTab}
              userRole={userRole}
              setUserRole={setUserRole}
              onOpenAssistant={() => setIsAssistantOpen(true)}
              onStartDemo={() => setIsDemoOpen(true)}
              savedCount={savedIds.length}
              onOpenSaved={() => {
                setActiveTab('library');
              }}
              globalSearchQuery={globalSearchQuery}
              setGlobalSearchQuery={setGlobalSearchQuery}
              onGlobalSearchSubmit={handleGlobalSearchSubmit}
              setIsOpenMobile={setIsOpenMobile}
            />

            {/* Page Body */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
              {activeTab === 'overview' && (
                <OverviewDashboard
                  resources={resources}
                  policies={POLICY_DOCUMENTS}
                  onNavigate={(tab) => setActiveTab(tab)}
                  onOpenResource={(res) => setSelectedResourceForModal(res)}
                  onTopicClick={handleTopicClick}
                  onStartDemo={() => setIsDemoOpen(true)}
                  searchQuery={globalSearchQuery}
                  setSearchQuery={setGlobalSearchQuery}
                  onSearchSubmit={handleGlobalSearchSubmit}
                />
              )}

              {activeTab === 'library' && (
                <ResearchLibrary
                  resources={resources}
                  onOpenResource={(res) => setSelectedResourceForModal(res)}
                  savedIds={savedIds}
                  onToggleBookmark={toggleBookmark}
                  initialQuery={globalSearchQuery}
                  initialTopic={activeTopicFilter}
                  onClearInitialTopic={() => setActiveTopicFilter(null)}
                />
              )}

              {activeTab === 'policy' && (
                <PolicyExplorer policies={POLICY_DOCUMENTS} />
              )}

              {activeTab === 'datasets' && (
                <DatasetCatalog datasets={DATASET_CATALOG} />
              )}

              {activeTab === 'gis' && (
                <GISInsights />
              )}

              {activeTab === 'simulator' && (
                <PolicySimulator />
              )}

              {activeTab === 'collaboration' && (
                <CollaborativeWorkspaces
                  projects={projects}
                  resources={resources}
                  onCreateProject={handleCreateProject}
                  onToggleTask={handleToggleTask}
                  onUpdateStatus={handleUpdateStatus}
                />
              )}

              {activeTab === 'innovation' && (
                <InnovationHub />
              )}

              {activeTab === 'reports' && (
                <ReportBuilder
                  resources={resources}
                  policies={POLICY_DOCUMENTS}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <ResourceDetailModal
        resource={selectedResourceForModal}
        onClose={() => setSelectedResourceForModal(null)}
        onToggleBookmark={toggleBookmark}
        isBookmarked={selectedResourceForModal ? savedIds.includes(selectedResourceForModal.id) : false}
      />

      <ResearchAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        resources={resources}
        onSelectResource={(res) => setSelectedResourceForModal(res)}
      />

      <DemoWalkthroughModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onNavigate={(tab) => {
          setIsLandingView(false);
          setActiveTab(tab);
        }}
        onOpenResourceModal={(res) => setSelectedResourceForModal(res)}
        firstResource={resources[0]}
      />
    </div>
  );
}
