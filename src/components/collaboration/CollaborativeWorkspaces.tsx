import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Tag, 
  Link2, 
  X,
  AlertCircle,
  Briefcase
} from 'lucide-react';
import { ResearchProject, ResearchResource } from '../../types';

interface CollaborativeWorkspacesProps {
  projects: ResearchProject[];
  resources: ResearchResource[];
  onCreateProject: (project: ResearchProject) => void;
  onToggleTask: (projectId: string, taskId: string) => void;
  onUpdateStatus: (projectId: string, newStatus: ResearchProject['status']) => void;
}

export const CollaborativeWorkspaces: React.FC<CollaborativeWorkspacesProps> = ({
  projects,
  resources,
  onCreateProject,
  onToggleTask,
  onUpdateStatus,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newLead, setNewLead] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newTags, setNewTags] = useState('ULPIN, Cadastral GIS');
  const [newNotes, setNewNotes] = useState('');
  const [newTasks, setNewTasks] = useState('Conduct literature review\nAggregate Tehsil cadastral records\nAnalyze loan processing turnaround');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQuestion.trim()) return;

    const taskItems = newTasks
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((text, idx) => ({ id: `task-${Date.now()}-${idx}`, text, done: false }));

    const project: ResearchProject = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      researchQuestion: newQuestion,
      leadResearcher: newLead || 'Current Researcher',
      organization: newOrg || 'DoLR Partner Institution',
      status: 'Draft',
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      teamMembers: [newLead || 'Lead Researcher', 'Spatial GIS Specialist'],
      linkedResourceIds: [resources[0]?.id || 'res-01'],
      notes: newNotes,
      tasks: taskItems.length > 0 ? taskItems : [{ id: 't1', text: 'Define research hypothesis', done: false }],
      updatedAt: 'Just now',
    };

    onCreateProject(project);
    setIsModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewQuestion('');
    setNewNotes('');
  };

  const filteredProjects = projects.filter((p) => {
    if (filterStatus === 'All') return true;
    return p.status === filterStatus;
  });

  const statuses: ResearchProject['status'][] = ['Draft', 'In Review', 'Updated', 'Completed'];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#E4E7DD] shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DDECE2] text-[#173F35] text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Multi-Institutional Research Space</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#173F35]">
              Collaborative Research Workspaces
            </h2>
            <p className="text-xs text-[#66756A] mt-1 max-w-2xl">
              Collaborate on empirical land studies, track milestones, attach library evidence, and streamline research translation into policy briefs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#173F35] hover:bg-[#254F44] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-[#C58B45]" />
              <span>New Research Project</span>
            </button>
          </div>
        </div>

        {/* Workflow Status Filter */}
        <div className="mt-6 pt-4 border-t border-[#E4E7DD] flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#173F35] mr-2">Filter by Status:</span>
          {['All', 'Draft', 'In Review', 'Updated', 'Completed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                filterStatus === st
                  ? 'bg-[#173F35] text-white shadow-xs'
                  : 'bg-[#F8F6EF] text-[#253B32] hover:bg-[#DDECE2] border border-[#E4E7DD]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const completedCount = project.tasks.filter((t) => t.done).length;
          const progressPercent = Math.round((completedCount / (project.tasks.length || 1)) * 100);

          return (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-[#E4E7DD] p-6 shadow-2xs flex flex-col justify-between hover:border-[#173F35] transition-all"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <label htmlFor={`status-select-${project.id}`} className="sr-only">Status</label>
                    <select
                      id={`status-select-${project.id}`}
                      value={project.status}
                      onChange={(e) => onUpdateStatus(project.id, e.target.value as any)}
                      className="text-xs font-bold px-2 py-1 rounded bg-[#DDECE2] text-[#173F35] border border-[#E4E7DD] focus:outline-none cursor-pointer"
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <span className="text-[11px] text-[#66756A] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {project.updatedAt}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#66756A]">{project.organization}</span>
                </div>

                <h3 className="text-base font-bold text-[#173F35] leading-snug mt-1">
                  {project.title}
                </h3>

                {/* Research Question */}
                <div className="mt-3 p-3 rounded-xl bg-[#F8F6EF] border border-[#E4E7DD] text-xs">
                  <span className="font-bold text-[#173F35] block mb-0.5">Research Question:</span>
                  <p className="text-[#253B32] leading-relaxed italic">
                    "{project.researchQuestion}"
                  </p>
                </div>

                {/* Team Members */}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#66756A]">
                  <Users className="w-3.5 h-3.5 text-[#C58B45]" />
                  <span className="font-semibold text-[#253B32]">Team: </span>
                  <span>{project.teamMembers.join(', ')}</span>
                </div>

                {/* Tasks checklist */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-[#173F35]">Research Milestones & Tasks:</span>
                    <span className="text-[#66756A] font-semibold">{completedCount} of {project.tasks.length} ({progressPercent}%)</span>
                  </div>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {project.tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => onToggleTask(project.id, task.id)}
                        className={`p-2 rounded-lg border text-xs flex items-center gap-2 cursor-pointer transition-colors ${
                          task.done 
                            ? 'bg-[#DDECE2]/40 text-[#66756A] border-[#DDECE2] line-through' 
                            : 'bg-white text-[#253B32] border-[#E4E7DD] hover:bg-[#F8F6EF]'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                          task.done ? 'bg-[#287A54] border-[#287A54] text-white' : 'border-[#66756A]/50'
                        }`}>
                          {task.done && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <span className="truncate">{task.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Topic tags */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-[#F8F6EF] text-[#253B32] px-2 py-0.5 rounded border border-[#E4E7DD]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-3 border-t border-[#E4E7DD] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#66756A]">
                  Lead: <strong>{project.leadResearcher}</strong>
                </span>
                <span className="text-[10px] bg-[#F4E8D5] text-[#C58B45] px-2 py-0.5 rounded font-mono font-bold">
                  DEMO WORKSPACE
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E4E7DD] shadow-2xl max-w-xl w-full p-6 animate-in fade-in">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold text-[#C58B45] uppercase">Collaboration</span>
                <h3 className="text-lg font-bold text-[#173F35] mt-1">Create Research Project Workspace</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#66756A] hover:text-[#173F35]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-[#173F35] block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Assessment of ULPIN Impact on Dispute Pendency in Gujarat"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35]"
                />
              </div>

              <div>
                <label className="font-bold text-[#173F35] block mb-1">Central Research Question</label>
                <textarea
                  required
                  rows={2}
                  placeholder="What empirical question does this project investigate?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#173F35] block mb-1">Lead Researcher</label>
                  <input
                    type="text"
                    placeholder="Dr. Name Surname"
                    value={newLead}
                    onChange={(e) => setNewLead(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#173F35] block mb-1">Institution</label>
                  <input
                    type="text"
                    placeholder="e.g. IIT Delhi / NIRDPR"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#173F35] block mb-1">Milestone Tasks (one per line)</label>
                <textarea
                  rows={3}
                  value={newTasks}
                  onChange={(e) => setNewTasks(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35]"
                />
              </div>

              <div>
                <label className="font-bold text-[#173F35] block mb-1">Topic Tags (comma separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E4E7DD] bg-[#F8F6EF] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#173F35]"
                />
              </div>

              <div className="pt-3 border-t border-[#E4E7DD] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#F8F6EF] hover:bg-[#E4E7DD] text-[#253B32] font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#173F35] hover:bg-[#254F44] text-white font-bold rounded-lg"
                >
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
