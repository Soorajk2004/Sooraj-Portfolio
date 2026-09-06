import { ArrowUp } from 'lucide-react';
import { useContent } from '../context/EditModeContext';

export default function Footer() {
  const { content } = useContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1E1E28] bg-base py-12 px-6 sm:px-12 md:px-20 lg:px-28">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-center sm:text-left">
          <span className="font-display text-lg font-semibold text-textPrimary tracking-tight">
            {content?.hero?.name || 'Sooraj'}
          </span>
          <span className="hidden sm:inline text-[#323242]">/</span>
          <span className="font-mono text-xs text-textMuted">
            MCA Candidate • APJ Abdul Kalam Technological University
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-mono text-xs text-textMuted">
            Design Philosophy: <span className="text-amberAccent">Suspended Layers</span>
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-elevation1 border border-[#2B2B38] text-textMuted hover:text-textPrimary hover:border-amberAccent/40 transition-colors shadow-elev-1"
            aria-label="Back to top of page"
          >
            <ArrowUp className="w-4 h-4 text-amberAccent" />
          </button>
        </div>
      </div>
    </footer>
  );
}
