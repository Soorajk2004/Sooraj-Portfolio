import { useState } from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  X,
  Check,
  Plus,
  Trash2,
  Pencil,
  ArrowUp,
  ArrowDown,
  Globe,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/EditModeContext';

export default function Projects() {
  const { content, addProject, updateProject, deleteProject, reorderProjects, isEditMode } = useContent();
  const projects = content.projects || [];

  const [selectedProject, setSelectedProject] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null); // null when not editing, number when editing
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for Add/Edit Project modal
  const [formState, setFormState] = useState({
    name: '',
    subtitle: '',
    category: 'Full-Stack Web App',
    year: new Date().getFullYear().toString(),
    featured: false,
    signatureDetail: '',
    description: '',
    fullDescription: '',
    tagsString: '',
    githubUrl: '',
    demoUrl: '',
  });

  const openAddModal = () => {
    setFormState({
      name: '',
      subtitle: '',
      category: 'Full-Stack Web App',
      year: new Date().getFullYear().toString(),
      featured: false,
      signatureDetail: '',
      description: '',
      fullDescription: '',
      tagsString: 'Python, Django, MySQL',
      githubUrl: '',
      demoUrl: '',
    });
    setEditingIndex(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (proj, index) => {
    setFormState({
      name: proj.name || '',
      subtitle: proj.subtitle || '',
      category: proj.category || 'Full-Stack Web App',
      year: proj.year || '',
      featured: !!proj.featured,
      signatureDetail: proj.signatureDetail || '',
      description: proj.description || '',
      fullDescription: proj.fullDescription || '',
      tagsString: (proj.tags || []).join(', '),
      githubUrl: proj.githubUrl || '',
      demoUrl: proj.demoUrl || '',
    });
    setEditingIndex(index);
    setIsAddModalOpen(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!formState.name.trim()) return;

    const parsedTags = formState.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const projectPayload = {
      id: formState.name.toLowerCase().replace(/[^a-z0-9]/g, '-') || `proj-${Date.now()}`,
      name: formState.name,
      subtitle: formState.subtitle,
      category: formState.category,
      year: formState.year,
      featured: formState.featured,
      signatureDetail: formState.signatureDetail,
      description: formState.description,
      fullDescription: formState.fullDescription || formState.description,
      tags: parsedTags,
      githubUrl: formState.githubUrl,
      demoUrl: formState.demoUrl,
    };

    if (editingIndex !== null) {
      updateProject(editingIndex, {
        ...(projects[editingIndex] || {}),
        ...projectPayload,
      });
    } else {
      addProject(projectPayload);
    }

    setIsAddModalOpen(false);
  };

  return (
    <section id="projects" className="py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-base relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-amberAccent tracking-widest uppercase">
                02 / Selected Works
              </span>
              <div className="h-[1px] w-12 bg-[#2B2B38]" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-textPrimary tracking-tight">
              Featured Systems & Applications
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <div className="font-mono text-xs text-textMuted max-w-xs text-left md:text-right">
              <span className="text-amberAccent font-medium">Reverse Grid Layout</span> — latest flagship systems anchored right-to-left with staggered physical planes.
            </div>

            {isEditMode && (
              <button
                type="button"
                onClick={openAddModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amberAccent text-base font-semibold text-xs hover:bg-[#E8B475] transition-colors shadow-elev-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            )}
          </div>
        </div>

        {/* 
          Reverse Grid Layout:
          Columns fill right-to-left on desktop (flex-row-reverse / grid ordering),
          with alternating vertical offset (~30px zigzag pattern)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 md:flex-row-reverse">
          {projects.map((project, index) => {
            const isRightSide = index % 2 === 0;
            const zigzagClass = isRightSide ? 'md:translate-y-8' : 'md:-translate-y-6';
            const shadowClass = isRightSide ? 'shadow-elev-card-right' : 'shadow-elev-card-left';

            const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim() !== '');
            const hasDemo = Boolean(project.demoUrl && project.demoUrl.trim() !== '');
            const hasAnyLink = hasGithub || hasDemo;

            return (
              <motion.article
                key={project.id || index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`group relative rounded-2xl bg-elevation2 border border-[#323244] p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-2 hover:shadow-elev-lift hover:border-[#42425A] ${shadowClass} ${zigzagClass} mobile-shadow-clean`}
              >
                <div>
                  {/* Top Metadata Line */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-elevation1 border border-[#36364A] text-textMuted">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-elevation1 border border-amberAccent/30 text-amberAccent font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amberAccent" />
                          <span>Flagship</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-textMuted">{project.year}</span>

                      {/* Edit controls in Edit Mode */}
                      {isEditMode && (
                        <div className="flex items-center gap-1 pl-2 border-l border-[#2F2F40]">
                          {/* Reorder Up */}
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => reorderProjects(index, index - 1)}
                            className="p-1 rounded bg-elevation1 text-textMuted hover:text-textPrimary disabled:opacity-30"
                            title="Move project up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>

                          {/* Reorder Down */}
                          <button
                            type="button"
                            disabled={index === projects.length - 1}
                            onClick={() => reorderProjects(index, index + 1)}
                            className="p-1 rounded bg-elevation1 text-textMuted hover:text-textPrimary disabled:opacity-30"
                            title="Move project down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => openEditModal(project, index)}
                            className="p-1 rounded bg-elevation1 text-amberAccent hover:bg-elevation1/80"
                            title="Edit project details"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete project "${project.name}"?`)) {
                                deleteProject(index);
                              }
                            }}
                            className="p-1 rounded bg-elevation1 text-rose-400 hover:bg-rose-500/20"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Name (Fraunces) */}
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-textPrimary tracking-tight mb-2 group-hover:text-white transition-colors">
                    {project.name}
                  </h3>

                  {project.subtitle && (
                    <p className="font-mono text-xs text-amberAccent mb-4 font-normal">
                      {project.subtitle}
                    </p>
                  )}

                  {/* One-line / Short description */}
                  <p className="text-sm text-textMuted leading-relaxed font-body mb-6">
                    {project.description}
                  </p>

                  {/* Signature detail per project card in warm amber */}
                  {project.signatureDetail && (
                    <div className="mb-6 p-3 rounded-xl bg-elevation1/80 border border-[#2B2B3A] flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-amberAccent shrink-0 mt-1.5" />
                      <span className="font-mono text-xs text-textPrimary">
                        <span className="text-amberAccent font-medium">Signature:</span>{' '}
                        {project.signatureDetail}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  {/* Tech-stack tags (mono, outlined pills) */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-elevation1/60 border border-[#2E2E3E] text-textMuted group-hover:border-[#3E3E52] transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action row with Deep Dive & separate GitHub / Live Demo buttons */}
                  <div className="pt-4 border-t border-[#2A2A38] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-textPrimary hover:text-amberAccent transition-colors group/btn"
                    >
                      <span>Deep Dive & Architecture</span>
                      <ArrowUpRight className="w-4 h-4 text-amberAccent transition-transform duration-200 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                    </button>

                    {/* Separate GitHub and Live Demo buttons: shown only if URL filled in; hidden if neither set */}
                    {hasAnyLink && (
                      <div className="flex items-center gap-2">
                        {hasGithub && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-elevation1 border border-[#2B2B38] text-textMuted hover:text-textPrimary hover:border-amberAccent/40 transition-colors"
                            title="GitHub Repository"
                            aria-label={`View ${project.name} GitHub repository`}
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}

                        {hasDemo && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-elevation1 border border-[#2B2B38] text-amberAccent hover:text-[#E8B475] hover:border-amberAccent/40 transition-colors"
                            title="Live Demo"
                            aria-label={`View ${project.name} Live Demo`}
                          >
                            <Globe className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Add / Edit Project Modal Form */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-elevation2 border border-[#3C3C50] shadow-elev-lift p-6 sm:p-8 text-textPrimary"
            >
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-lg bg-elevation1 border border-[#303040] text-textMuted hover:text-textPrimary"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <span className="font-mono text-xs text-amberAccent uppercase tracking-wider block mb-1">
                  {editingIndex !== null ? 'Modify Existing Entry' : 'New Project'}
                </span>
                <h3 className="font-display text-2xl font-semibold">
                  {editingIndex !== null ? 'Edit Project' : 'Add Project to Reverse Grid'}
                </h3>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-textMuted mb-1">Project Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. LeavEase"
                      className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-textMuted mb-1">Subtitle / Category Line</label>
                    <input
                      type="text"
                      value={formState.subtitle}
                      onChange={(e) => setFormState({ ...formState, subtitle: e.target.value })}
                      placeholder="e.g. Enterprise Leave Management"
                      className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-textMuted mb-1">Category Tag</label>
                    <input
                      type="text"
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      placeholder="Full-Stack Web App"
                      className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-textMuted mb-1">Year</label>
                    <input
                      type="text"
                      value={formState.year}
                      onChange={(e) => setFormState({ ...formState, year: e.target.value })}
                      placeholder="2025"
                      className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-textPrimary">
                      <input
                        type="checkbox"
                        checked={formState.featured}
                        onChange={(e) => setFormState({ ...formState, featured: e.target.checked })}
                        className="rounded border-[#343446] text-amberAccent focus:ring-amberAccent"
                      />
                      <span>Flagship Project</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-textMuted mb-1">Signature Detail (Amber Highlight)</label>
                  <input
                    type="text"
                    value={formState.signatureDetail}
                    onChange={(e) => setFormState({ ...formState, signatureDetail: e.target.value })}
                    placeholder="e.g. Google Gemini 1.5 Multimodal Styling Engine"
                    className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-textMuted mb-1">One-Line Card Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    placeholder="Short summary displayed on the card..."
                    className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-textMuted mb-1">Full Architecture & Deep Dive Description</label>
                  <textarea
                    rows={3}
                    value={formState.fullDescription}
                    onChange={(e) => setFormState({ ...formState, fullDescription: e.target.value })}
                    placeholder="Detailed explanation displayed in the Deep Dive modal..."
                    className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-textMuted mb-1">
                    Tags (comma-separated, live preview below)
                  </label>
                  <input
                    type="text"
                    value={formState.tagsString}
                    onChange={(e) => setFormState({ ...formState, tagsString: e.target.value })}
                    placeholder="Python, Django 5.x, MySQL, React"
                    className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none mb-2"
                  />
                  {/* Live tag preview */}
                  <div className="flex flex-wrap gap-1.5 min-h-6">
                    {formState.tagsString
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .map((t, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-elevation1 border border-[#323246] text-amberAccent"
                        >
                          {t}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-textMuted mb-1">GitHub Repository URL</label>
                    <input
                      type="url"
                      value={formState.githubUrl}
                      onChange={(e) => setFormState({ ...formState, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-textMuted mb-1">Live Demo URL</label>
                    <input
                      type="url"
                      value={formState.demoUrl}
                      onChange={(e) => setFormState({ ...formState, demoUrl: e.target.value })}
                      placeholder="https://your-demo.vercel.app"
                      className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2E2E3E] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-elevation1 text-xs font-medium text-textMuted hover:text-textPrimary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amberAccent text-base font-semibold text-xs hover:bg-[#E8B475] transition-colors"
                  >
                    {editingIndex !== null ? 'Update Project' : 'Save Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Project Deep-Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-elevation2 border border-[#3C3C50] shadow-elev-lift p-6 sm:p-8 text-textPrimary"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-lg bg-elevation1 border border-[#303040] text-textMuted hover:text-textPrimary transition-colors"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-amberAccent">
                  <span>{selectedProject.category}</span>
                  <span>•</span>
                  <span>{selectedProject.year}</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-semibold mb-1">
                  {selectedProject.name}
                </h3>
                {selectedProject.subtitle && (
                  <p className="font-mono text-xs text-textMuted">{selectedProject.subtitle}</p>
                )}
              </div>

              <div className="mb-6 p-4 rounded-xl bg-elevation1 border border-[#2B2B38] text-sm text-textMuted leading-relaxed">
                {selectedProject.fullDescription || selectedProject.description}
              </div>

              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-amberAccent mb-3">
                    Technical Architecture & Capabilities
                  </h4>
                  <ul className="space-y-2.5 text-sm text-textMuted font-body">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-amberAccent shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {selectedProject.tags && selectedProject.tags.length > 0 && (
                <div className="mb-8">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-textMuted mb-2">
                    Stack Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-xs px-3 py-1 rounded-lg bg-elevation1 border border-[#323244] text-textPrimary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Links */}
              <div className="pt-4 border-t border-[#2E2E3E] flex flex-wrap items-center justify-end gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-elevation1 border border-[#323242] text-sm font-medium text-textPrimary hover:border-amberAccent/40 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </a>
                )}

                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-elevation1 border border-amberAccent/30 text-sm font-medium text-amberAccent hover:border-amberAccent transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 rounded-xl bg-amberAccent text-base font-medium text-sm hover:bg-[#E8B475] transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
