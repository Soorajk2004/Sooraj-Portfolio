import { useState } from 'react';
import { Code, Box, Database, Plus, Trash2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/EditModeContext';
import InlineEdit from './InlineEdit';

const CATEGORY_META = {
  languages: {
    title: 'Programming & Query Languages',
    eyebrow: '01 / SYNTAX & LOGIC',
    icon: Code,
    description: 'Foundational systems and scripting languages for reliable backend computation and data modeling.',
  },
  frameworks: {
    title: 'Frameworks & Web Architecture',
    eyebrow: '02 / PLATFORMS & APIS',
    icon: Box,
    description: 'Modern application frameworks used for rapid prototyping, robust ORM modeling, and responsive interfaces.',
  },
  tools: {
    title: 'Databases, AI & Developer Tools',
    eyebrow: '03 / STORAGE & TOOLCHAIN',
    icon: Database,
    description: 'Data persistence engines, GenAI integration APIs, and daily development tooling.',
  },
};

export default function Skills() {
  const { content, addSkill, removeSkill, updateSkill, isEditMode } = useContent();
  const skillsData = content.skills || { languages: [], frameworks: [], tools: [] };

  const [activeCategoryModal, setActiveCategoryModal] = useState(null);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');
  const [newSkillNote, setNewSkillNote] = useState('');

  const handleAddSkillSubmit = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    addSkill(activeCategoryModal, {
      name: newSkillName.trim(),
      level: newSkillLevel.trim() || 'Core Proficiency',
      note: newSkillNote.trim() || 'Key competency and implementation focus',
    });

    setNewSkillName('');
    setNewSkillLevel('');
    setNewSkillNote('');
    setActiveCategoryModal(null);
  };

  const categories = Object.keys(CATEGORY_META);

  return (
    <section id="skills" className="py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-base relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-amberAccent tracking-widest uppercase">
              03 / Technical Competencies
            </span>
            <div className="h-[1px] w-12 bg-[#2B2B38]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-textPrimary tracking-tight mb-4">
            Skills Grouped by Architectural Layer
          </h2>
          <p className="text-textMuted font-body text-base max-w-2xl">
            A calm, categorized view of technical capabilities. Resting chips sit quietly on the first elevation plane, revealing crisp amber outlines only on hover and focus.
          </p>
        </div>

        {/* Categories Stack */}
        <div className="space-y-12">
          {categories.map((catKey, catIndex) => {
            const meta = CATEGORY_META[catKey] || {
              title: catKey.toUpperCase(),
              eyebrow: `0${catIndex + 1} / CATEGORY`,
              icon: Code,
              description: 'Technical competencies and tools.',
            };
            const Icon = meta.icon;
            const items = skillsData[catKey] || [];

            return (
              <motion.div
                key={catKey}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: catIndex * 0.08 }}
                className="p-8 rounded-2xl bg-elevation2/50 border border-[#2D2D3D] shadow-elev-1"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-t border-b border-[#252534] gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-elevation1 border border-[#323244] flex items-center justify-center text-amberAccent">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-amberAccent tracking-wider block">
                        {meta.eyebrow}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-textPrimary">
                        {meta.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="font-body text-xs text-textMuted max-w-md hidden md:block">
                      {meta.description}
                    </p>

                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => setActiveCategoryModal(catKey)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-elevation1 border border-amberAccent/40 text-amberAccent font-mono text-xs hover:bg-amberAccent hover:text-base transition-colors shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Chip</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Skill Chips on First Elevation Plane (#1B1B22) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                  {items.map((skill, itemIdx) => (
                    <div
                      key={itemIdx}
                      tabIndex={0}
                      className="group relative p-4 rounded-xl bg-elevation1 border border-[#2B2B38] shadow-elev-1 transition-all duration-150 hover:-translate-y-1 hover:border-amberAccent focus:border-amberAccent focus:outline-none cursor-default"
                    >
                      {/* Delete chip button in Edit Mode */}
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSkill(catKey, itemIdx);
                          }}
                          title={`Remove ${skill.name}`}
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md hover:bg-rose-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}

                      <div className="flex items-center justify-between mb-1.5 gap-2">
                        <div className="font-mono text-sm font-semibold text-textPrimary group-hover:text-amberAccent transition-colors w-full">
                          <InlineEdit
                            value={skill.name}
                            onChange={(val) => updateSkill(catKey, itemIdx, 'name', val)}
                            placeholder="Skill Name"
                          />
                        </div>

                        <div className="font-mono text-[10px] px-2 py-0.5 rounded bg-elevation2 border border-[#343446] text-textMuted group-hover:text-textPrimary transition-colors shrink-0">
                          <InlineEdit
                            value={skill.level}
                            onChange={(val) => updateSkill(catKey, itemIdx, 'level', val)}
                            placeholder="Level"
                          />
                        </div>
                      </div>

                      <div className="text-xs text-textMuted font-body group-hover:text-textMuted/90">
                        <InlineEdit
                          value={skill.note}
                          onChange={(val) => updateSkill(catKey, itemIdx, 'note', val)}
                          placeholder="Short application detail or note"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add Skill Chip Modal */}
      <AnimatePresence>
        {activeCategoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-2xl bg-elevation2 border border-[#3C3C50] shadow-elev-lift p-6 text-textPrimary"
            >
              <button
                type="button"
                onClick={() => setActiveCategoryModal(null)}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-elevation1 border border-[#303040] text-textMuted hover:text-textPrimary"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-4">
                <span className="font-mono text-xs text-amberAccent uppercase tracking-wider block mb-1">
                  Add to {CATEGORY_META[activeCategoryModal]?.title}
                </span>
                <h3 className="font-display text-xl font-semibold">New Skill Chip</h3>
              </div>

              <form onSubmit={handleAddSkillSubmit} className="space-y-3.5">
                <div>
                  <label className="block font-mono text-xs text-textMuted mb-1">Skill Name *</label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="e.g. Redis"
                    className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-textMuted mb-1">Level / Tag</label>
                  <input
                    type="text"
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value)}
                    placeholder="e.g. In-Memory Cache / Advanced"
                    className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-textMuted mb-1">Application Note</label>
                  <input
                    type="text"
                    value={newSkillNote}
                    onChange={(e) => setNewSkillNote(e.target.value)}
                    placeholder="e.g. Caching querysets and rate limiting"
                    className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-[#2E2E3E] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveCategoryModal(null)}
                    className="px-3.5 py-1.5 rounded-xl bg-elevation1 text-xs font-medium text-textMuted hover:text-textPrimary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-amberAccent text-base font-semibold text-xs hover:bg-[#E8B475] transition-colors"
                  >
                    Add Chip
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
