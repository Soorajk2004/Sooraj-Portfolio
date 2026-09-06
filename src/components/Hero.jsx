import { ArrowDown, FileText, Send, MapPin, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../context/EditModeContext';
import InlineEdit from './InlineEdit';

const STATUS_COLORS = {
  amber: {
    text: 'text-amberAccent',
    ping: 'bg-amberAccent',
    dot: 'bg-amberAccent',
    border: 'border-amberAccent/30',
  },
  mint: {
    text: 'text-emerald-400',
    ping: 'bg-emerald-400',
    dot: 'bg-emerald-400',
    border: 'border-emerald-400/30',
  },
  muted: {
    text: 'text-textMuted',
    ping: 'bg-textMuted',
    dot: 'bg-textMuted',
    border: 'border-textMuted/30',
  },
};

export default function Hero() {
  const { content, updateHero, isEditMode } = useContent();
  const { hero } = content;

  const activeColorKey = hero.statusColor in STATUS_COLORS ? hero.statusColor : 'amber';
  const activeColor = STATUS_COLORS[activeColorKey];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 py-20 bg-base"
    >
      <div className="max-w-4xl">
        {/* Status Tag on faint elevation plane */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-elevation1 border border-[#2B2B38] shadow-elev-1 w-fit"
        >
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${activeColor.ping} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${activeColor.dot}`} />
          </span>

          <span className="font-mono text-xs text-textMuted tracking-wider uppercase">
            Status:{' '}
            <span className={`${activeColor.text} font-medium`}>
              <InlineEdit
                value={hero.status}
                onChange={(val) => updateHero('status', val)}
                placeholder="Enter status text..."
              />
            </span>
          </span>

          {/* Status Color Palette Selector - Visible only in Edit Mode */}
          {isEditMode && (
            <div className="flex items-center gap-1.5 pl-2 border-l border-[#2F2F40]">
              {(['amber', 'mint', 'muted']).map((cKey) => (
                <button
                  key={cKey}
                  type="button"
                  onClick={() => updateHero('statusColor', cKey)}
                  title={`Set status color to ${cKey}`}
                  className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                    cKey === 'amber'
                      ? 'bg-amberAccent'
                      : cKey === 'mint'
                      ? 'bg-emerald-400'
                      : 'bg-[#7A7A8C]'
                  } ${activeColorKey === cKey ? 'scale-125 border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
                />
              ))}
            </div>
          )}

          <span className="text-textMuted text-xs">|</span>

          <span className="font-mono text-xs text-textMuted flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amberAccent" />
            <InlineEdit
              value={hero.location}
              onChange={(val) => updateHero('location', val)}
              placeholder="City, Country"
            />
          </span>
        </motion.div>

        {/* Large Fraunces headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight text-textPrimary leading-none mb-4">
            <InlineEdit
              value={hero.name}
              onChange={(val) => updateHero('name', val)}
              placeholder="Your Name"
            />
          </h1>
        </motion.div>

        {/* Mono-font role line beneath */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-6 h-[1px] bg-amberAccent shrink-0" />
          <div className="font-mono text-base sm:text-lg md:text-xl text-amberAccent tracking-wide font-normal w-full">
            <InlineEdit
              value={hero.role}
              onChange={(val) => updateHero('role', val)}
              placeholder="Your Role / Headline"
            />
          </div>
        </motion.div>

        {/* Grounded positioning line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="max-w-2xl"
        >
          <div className="text-lg sm:text-xl text-textMuted leading-relaxed font-body">
            <InlineEdit
              value={hero.tagline}
              onChange={(val) => updateHero('tagline', val)}
              placeholder="Add your positioning statement or bio tagline..."
              multiline={true}
            />
          </div>
        </motion.div>

        {/* Call-to-actions on elevated planes */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-elevation2 border border-[#323242] text-textPrimary font-medium text-sm transition-all duration-200 shadow-elev-2 hover:-translate-y-1 hover:shadow-elev-lift hover:border-amberAccent/40"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4 text-amberAccent group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-elevation1 border border-[#2B2B38] text-textMuted hover:text-textPrimary text-sm font-medium transition-all duration-200 shadow-elev-1 hover:-translate-y-0.5 hover:border-[#38384A]"
          >
            <Send className="w-4 h-4 text-amberAccent" />
            <span>Get in Touch</span>
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('contact');
            }}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-transparent border border-[#2B2B38] text-textMuted hover:text-textPrimary font-mono text-xs transition-colors hover:border-[#38384A]"
          >
            <FileText className="w-3.5 h-3.5 text-amberAccent" />
            <span>View CV & Details</span>
          </a>
        </motion.div>

        {/* Bottom detail info line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-8 border-t border-[#1C1C24] flex items-center justify-between text-xs text-textMuted font-mono"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-amberAccent" />
            <span>Django 5.x • DRF • MySQL • Gemini API • React</span>
          </div>
          <span className="hidden sm:inline text-[#5A5A6C]">Scroll for work & credentials ↓</span>
        </motion.div>
      </div>
    </section>
  );
}
