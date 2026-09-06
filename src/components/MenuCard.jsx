import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Pencil, Check } from 'lucide-react';
import { useContent } from '../context/EditModeContext';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function MenuCard() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { isEditMode, requestToggleEditMode } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const scrollPosition = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Menu Card - Fixed stationary control plane at top right */}
      <nav
        aria-label="Main Navigation"
        className={`hidden md:flex fixed top-8 right-8 z-40 items-center bg-elevation1 border rounded-xl px-4 py-2.5 transition-all duration-300 ${
          isEditMode
            ? 'border-amberAccent/60 shadow-elev-lift'
            : isScrolled
            ? 'shadow-elev-menu-scrolled border-[#363646]'
            : 'shadow-elev-menu border-[#2B2B38]'
        }`}
      >
        <ul className="flex items-center space-x-6 text-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`relative py-1 text-sm font-medium transition-colors duration-150 ${
                    isActive ? 'text-textPrimary' : 'text-textMuted hover:text-textPrimary'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-amberAccent rounded-full" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="w-[1px] h-4 bg-[#2E2E3C] mx-3" />

        <button
          type="button"
          onClick={() => scrollTo('contact')}
          className="font-mono text-xs text-amberAccent hover:text-[#E8B475] flex items-center gap-1 transition-colors px-1"
        >
          <span>hire_me</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>

        <div className="w-[1px] h-4 bg-[#2E2E3C] mx-2" />

        {/* Edit Mode Toggle - Pencil switches to Checkmark when active */}
        <button
          type="button"
          onClick={requestToggleEditMode}
          title={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
          aria-label={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
          className={`p-1.5 rounded-lg border transition-all ${
            isEditMode
              ? 'bg-amberAccent text-base border-amberAccent shadow-sm'
              : 'bg-elevation2 border-[#323244] text-textMuted hover:text-amberAccent hover:border-amberAccent/40'
          }`}
        >
          {isEditMode ? <Check className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
        </button>
      </nav>

      {/* Mobile Menu Container - Top Right Floating Toggle with Elevated Dropdown */}
      <div className="md:hidden fixed top-6 right-6 z-40 flex items-center gap-2">
        {/* Mobile Edit Toggle */}
        <button
          type="button"
          onClick={requestToggleEditMode}
          title={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
          aria-label={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
          className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-shadow ${
            isEditMode
              ? 'bg-amberAccent text-base border-amberAccent shadow-elev-lift'
              : 'bg-elevation1 border-[#2E2E3C] text-textMuted shadow-elev-menu'
          }`}
        >
          {isEditMode ? <Check className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-expanded={isMobileOpen}
          aria-label="Toggle Navigation Menu"
          className={`w-11 h-11 rounded-xl bg-elevation1 border border-[#2E2E3C] flex items-center justify-center text-textPrimary transition-shadow duration-200 ${
            isScrolled ? 'shadow-elev-menu-scrolled' : 'shadow-elev-menu'
          }`}
        >
          {isMobileOpen ? <X className="w-5 h-5 text-amberAccent" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Dropdown Card */}
        {isMobileOpen && (
          <div className="absolute top-14 right-0 w-52 bg-elevation1 border border-[#2E2E3C] rounded-xl p-3 shadow-elev-lift mobile-shadow-clean">
            <ul className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? 'text-textPrimary bg-elevation2 font-semibold'
                          : 'text-textMuted hover:text-textPrimary hover:bg-elevation2/50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amberAccent" />}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 pt-3 border-t border-[#2B2B38] space-y-2">
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="w-full text-center py-2 px-3 rounded-lg bg-elevation2 text-amberAccent font-mono text-xs font-medium border border-amberAccent/20 flex items-center justify-center gap-1.5"
              >
                <span>Available for Roles</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
