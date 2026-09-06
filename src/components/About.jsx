import { GraduationCap, Code2, Layers, Sparkles, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../context/EditModeContext';
import InlineEdit from './InlineEdit';

const SHADOW_VARIANTS = [
  'shadow-elev-card-left',
  'shadow-elev-card-center',
  'shadow-elev-card-right',
];

const ICONS = [GraduationCap, Code2, Layers];

export default function About() {
  const { content, updateAbout, addStat, removeStat, updateStat, isEditMode } = useContent();
  const { about } = content;
  const stats = about.stats || [];

  const handleAddNewStat = () => {
    addStat({
      label: 'New Metric',
      value: '10+',
      sub: 'Key Milestone',
      detail: 'Description of your achievement or credential',
    });
  };

  return (
    <section id="about" className="py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-base relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-amberAccent tracking-widest uppercase">
            01 / Background & Foundation
          </span>
          <div className="h-[1px] w-12 bg-[#2B2B38]" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-textPrimary tracking-tight mb-8">
          Crafting reliable backends, disciplined schemas, and modern user experiences.
        </h2>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7 space-y-5 text-textMuted font-body text-base sm:text-lg leading-relaxed">
            <InlineEdit
              value={about.bio}
              onChange={(val) => updateAbout('bio', val)}
              placeholder="Add your background bio and academic journey..."
              multiline={true}
              className="text-textMuted font-body text-base sm:text-lg leading-relaxed"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between p-7 rounded-2xl bg-elevation1 border border-[#2B2B38] shadow-elev-1">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-amberAccent uppercase tracking-wider">
                  Core Engineering Principles
                </span>
                <Sparkles className="w-4 h-4 text-amberAccent" />
              </div>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-3 text-textPrimary">
                  <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0 mt-0.5" />
                  <span>
                    <strong>Role-Based Security:</strong> Strict RBAC access policies, session management, and encrypted storage.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-textPrimary">
                  <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0 mt-0.5" />
                  <span>
                    <strong>Clean Relational Models:</strong> Normalized 3NF schemas, indexed queries, and foreign key integrity.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-textPrimary">
                  <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0 mt-0.5" />
                  <span>
                    <strong>Pragmatic AI Integration:</strong> Leveraging multimodal LLM APIs (Gemini) for real user utility.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-textPrimary">
                  <CheckCircle2 className="w-4 h-4 text-amberAccent shrink-0 mt-0.5" />
                  <span>
                    <strong>Fresher Mindset:</strong> Eager to learn, quick to adapt, receptive to code reviews, and dependable.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-[#262634] flex items-center justify-between">
              <span className="font-mono text-xs text-textMuted">University: APJ AKTU, Kerala</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-elevation2 text-amberAccent border border-amberAccent/20">
                Graduating 2026
              </span>
            </div>
          </div>
        </div>

        {/* Header for Stat Cards + Add Control in Edit Mode */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-textMuted uppercase tracking-wider">
            Verified Academic & Development Metrics
          </span>

          {isEditMode && (
            <button
              type="button"
              onClick={handleAddNewStat}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-elevation2 border border-amberAccent/40 text-amberAccent font-mono text-xs hover:bg-amberAccent hover:text-base transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Stat</span>
            </button>
          )}
        </div>

        {/* Row of Stat Cards on Second Elevation Plane (#232330) with varied physical shadow angles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const Icon = ICONS[idx % ICONS.length] || Layers;
            const shadowClass = SHADOW_VARIANTS[idx % SHADOW_VARIANTS.length];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`relative p-7 rounded-2xl bg-elevation2 border border-[#303040] transition-all duration-200 hover:-translate-y-1.5 ${shadowClass} mobile-shadow-clean`}
              >
                {/* Delete button in Edit Mode */}
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => removeStat(idx)}
                    title="Remove this stat card"
                    className="absolute top-4 right-4 p-1 rounded-lg bg-elevation1 border border-rose-500/40 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <div className="flex items-center justify-between mb-4 pr-6">
                  <div className="font-mono text-xs text-textMuted uppercase tracking-wider w-full">
                    <InlineEdit
                      value={stat.label}
                      onChange={(val) => updateStat(idx, 'label', val)}
                      placeholder="Stat Label"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-elevation1 border border-[#3A3A4C] flex items-center justify-center text-amberAccent shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display text-4xl sm:text-5xl font-semibold text-textPrimary tracking-tight">
                    <InlineEdit
                      value={stat.value}
                      onChange={(val) => updateStat(idx, 'value', val)}
                      placeholder="Value"
                    />
                  </span>
                </div>

                <p className="font-mono text-xs text-amberAccent mb-2 font-medium">
                  <InlineEdit
                    value={stat.sub}
                    onChange={(val) => updateStat(idx, 'sub', val)}
                    placeholder="Subtitle info"
                  />
                </p>

                <div className="text-xs text-textMuted leading-relaxed">
                  <InlineEdit
                    value={stat.detail}
                    onChange={(val) => updateStat(idx, 'detail', val)}
                    placeholder="Metric details"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
