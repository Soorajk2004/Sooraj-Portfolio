import { useState } from 'react';
import {
  Mail,
  FileDown,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  Clock,
  ArrowUpRight,
  Plus,
  Trash2,
  Upload,
  Globe,
  X,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/EditModeContext';
import InlineEdit from './InlineEdit';

const ICON_MAP = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
  Globe: Globe,
  Mail: Mail,
};

export default function Contact() {
  const {
    content,
    updateContact,
    updateCV,
    addPersonalLink,
    removePersonalLink,
    updatePersonalLink,
    isEditMode,
  } = useContent();

  const { contact } = content;
  const cv = contact.cv || { label: 'Curriculum Vitae', fileUrl: '', updatedAt: '' };
  const personalLinks = contact.personalLinks || [];

  const [copied, setCopied] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [cvInputUrl, setCvInputUrl] = useState('');
  const [cvWarning, setCvWarning] = useState('');

  // Add Link Modal
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkIcon, setNewLinkIcon] = useState('Globe');

  const copyEmail = () => {
    if (!contact.email) return;
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Handle PDF file upload for CV
  const handlePdfUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please select a PDF document.');
      return;
    }

    // Check size (> 1.5MB can bloat localStorage which has a ~5MB limit)
    const sizeInMb = file.size / (1024 * 1024);
    if (sizeInMb > 1.5) {
      setCvWarning(
        `This file is ${sizeInMb.toFixed(1)}MB. Storing large files in browser storage may exceed quota limits. We strongly recommend pasting a Google Drive / Dropbox link instead.`
      );
    } else {
      setCvWarning('');
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      updateCV({
        fileUrl: dataUrl,
        updatedAt: new Date().toISOString().split('T')[0],
      });
      setIsCVModalOpen(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle external URL for CV
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!cvInputUrl.trim()) return;

    updateCV({
      fileUrl: cvInputUrl.trim(),
      updatedAt: new Date().toISOString().split('T')[0],
    });
    setCvInputUrl('');
    setIsCVModalOpen(false);
  };

  // Add new personal link
  const handleAddPersonalLinkSubmit = (e) => {
    e.preventDefault();
    if (!newLinkLabel.trim() || !newLinkUrl.trim()) return;

    addPersonalLink({
      label: newLinkLabel.trim(),
      url: newLinkUrl.trim(),
      icon: newLinkIcon,
    });

    setNewLinkLabel('');
    setNewLinkUrl('');
    setNewLinkIcon('Globe');
    setIsAddLinkModalOpen(false);
  };

  // Helper to resolve icon component
  const getIconComponent = (iconName) => {
    return ICON_MAP[iconName] || Globe;
  };

  const hasCV = Boolean(cv.fileUrl && cv.fileUrl.trim() !== '');

  return (
    <section id="contact" className="py-28 px-6 sm:px-12 md:px-20 lg:px-28 bg-base relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          {/* Eyebrow / Intro line: inline-editable */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-amberAccent tracking-widest uppercase">
              <InlineEdit
                value={contact.intro || '04 / Direct Communication'}
                onChange={(val) => updateContact('intro', val)}
                placeholder="04 / Direct Communication"
              />
            </span>
            <div className="h-[1px] w-12 bg-[#2B2B38]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-textPrimary tracking-tight mb-4">
            Let's Discuss Junior & Fresher Roles
          </h2>

          <p className="text-textMuted font-body text-base max-w-2xl leading-relaxed">
            I am actively seeking full-time opportunities as a Python/Django developer, backend engineer, or entry-level full-stack engineer. Available for remote roles or relocation.
          </p>
        </div>

        {/* Section Actions in Edit Mode */}
        {isEditMode && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 rounded-xl bg-elevation1 border border-amberAccent/20">
            <span className="font-mono text-xs text-amberAccent">
              Contact & Links Editor: Click texts to edit inline, add personal links, or manage CV.
            </span>
            <button
              type="button"
              onClick={() => setIsAddLinkModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amberAccent text-base font-semibold text-xs hover:bg-[#E8B475] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Personal Link</span>
            </button>
          </div>
        )}

        {/* Unified Contact & Personal Links Grid (Consistent Tiles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* 1. Email Tile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-7 rounded-2xl bg-elevation2 border border-[#303040] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-elev-lift hover:border-[#444458] shadow-elev-card-left mobile-shadow-clean"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-textMuted uppercase tracking-wider">
                  Direct Email
                </span>
                <div className="w-10 h-10 rounded-xl bg-elevation1 border border-[#343446] flex items-center justify-center text-amberAccent">
                  <Mail className="w-5 h-5" />
                </div>
              </div>

              <div className="font-mono text-sm sm:text-base text-textPrimary font-medium mb-2 break-all">
                <InlineEdit
                  value={contact.email}
                  onChange={(val) => updateContact('email', val)}
                  placeholder="your.email@example.com"
                />
              </div>

              <p className="text-xs text-textMuted leading-relaxed font-body mb-6">
                Fastest response for interview schedules & role openings
              </p>
            </div>

            <div className="pt-4 border-t border-[#2A2A38] flex items-center justify-between">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 text-xs font-mono text-amberAccent hover:text-[#E8B475] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy email address</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${contact.email}`}
                className="p-2 rounded-lg bg-elevation1 border border-[#303042] text-textMuted hover:text-textPrimary transition-colors"
                aria-label="Send direct email"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* 2. LinkedIn Core Tile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-7 rounded-2xl bg-elevation2 border border-[#303040] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-elev-lift hover:border-[#444458] shadow-elev-card-center mobile-shadow-clean"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-textMuted uppercase tracking-wider">
                  LinkedIn Profile
                </span>
                <div className="w-10 h-10 rounded-xl bg-elevation1 border border-[#343446] flex items-center justify-center text-amberAccent">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
              </div>

              <div className="font-mono text-sm sm:text-base text-textPrimary font-medium mb-2 break-all">
                <InlineEdit
                  value={contact.linkedin}
                  onChange={(val) => updateContact('linkedin', val)}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <p className="text-xs text-textMuted leading-relaxed font-body mb-6">
                Professional background, academic posts, and references
              </p>
            </div>

            <div className="pt-4 border-t border-[#2A2A38] flex items-center justify-between">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-amberAccent hover:text-[#E8B475] transition-colors"
              >
                <span>Open LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-elevation1 border border-[#303042] text-textMuted hover:text-textPrimary transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* 3. GitHub Core Tile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-7 rounded-2xl bg-elevation2 border border-[#303040] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-elev-lift hover:border-[#444458] shadow-elev-card-right mobile-shadow-clean"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-textMuted uppercase tracking-wider">
                  GitHub Repositories
                </span>
                <div className="w-10 h-10 rounded-xl bg-elevation1 border border-[#343446] flex items-center justify-center text-amberAccent">
                  <GithubIcon className="w-5 h-5" />
                </div>
              </div>

              <div className="font-mono text-sm sm:text-base text-textPrimary font-medium mb-2 break-all">
                <InlineEdit
                  value={contact.github}
                  onChange={(val) => updateContact('github', val)}
                  placeholder="https://github.com/..."
                />
              </div>

              <p className="text-xs text-textMuted leading-relaxed font-body mb-6">
                Source code for LeavEase, ALAMARAi & DRF experiments
              </p>
            </div>

            <div className="pt-4 border-t border-[#2A2A38] flex items-center justify-between">
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-amberAccent hover:text-[#E8B475] transition-colors"
              >
                <span>Open GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-elevation1 border border-[#303042] text-textMuted hover:text-textPrimary transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* 4. CV Tile (Hidden if fileUrl is empty in public view, visible in Edit Mode) */}
          {(hasCV || isEditMode) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-7 rounded-2xl bg-elevation2 border border-[#303040] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-elev-lift hover:border-[#444458] shadow-elev-card-center mobile-shadow-clean relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-textMuted uppercase tracking-wider">
                    <InlineEdit
                      value={cv.label || 'Curriculum Vitae'}
                      onChange={(val) => updateCV({ label: val })}
                      placeholder="Curriculum Vitae"
                    />
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-elevation1 border border-[#343446] flex items-center justify-center text-amberAccent">
                    <FileDown className="w-5 h-5" />
                  </div>
                </div>

                <p className="font-mono text-sm sm:text-base text-textPrimary font-medium mb-1 truncate">
                  {hasCV ? 'Resume_Document.pdf' : 'No CV Attached'}
                </p>

                <p className="text-xs text-textMuted leading-relaxed font-body mb-2">
                  Complete breakdown of coursework, CGPA 8.0, and technical skillsets
                </p>

                {/* Small muted caption showing updatedAt */}
                {cv.updatedAt && (
                  <p className="font-mono text-[11px] text-textMuted/80 mb-5">
                    Last updated: <span className="text-amberAccent">{cv.updatedAt}</span>
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-[#2A2A38] flex items-center justify-between gap-3">
                {hasCV ? (
                  <a
                    href={cv.fileUrl}
                    target="_blank"
                    download={cv.fileUrl.startsWith('data:') ? 'Resume.pdf' : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-amberAccent hover:text-[#E8B475] transition-colors"
                  >
                    <span>Download / View CV</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-textMuted">Pending attachment</span>
                )}

                {/* Replace CV button in Edit Mode */}
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => setIsCVModalOpen(true)}
                    className="px-2.5 py-1 rounded-lg bg-elevation1 border border-amberAccent/40 text-amberAccent font-mono text-xs hover:bg-amberAccent hover:text-base transition-colors"
                  >
                    Replace CV
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* 5. Custom Personal Links Tiles */}
          {personalLinks.map((link, pIdx) => {
            // If link.url is empty and not in edit mode, hide tile
            if (!isEditMode && (!link.url || link.url.trim() === '')) {
              return null;
            }

            const LinkIcon = getIconComponent(link.icon);

            return (
              <motion.div
                key={pIdx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-7 rounded-2xl bg-elevation2 border border-[#303040] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-elev-lift hover:border-[#444458] shadow-elev-card-right mobile-shadow-clean"
              >
                {/* Delete button in Edit Mode */}
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => removePersonalLink(pIdx)}
                    title="Remove link"
                    className="absolute top-4 right-4 p-1 rounded-lg bg-elevation1 border border-rose-500/40 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4 pr-6">
                    <span className="font-mono text-xs text-textMuted uppercase tracking-wider w-full">
                      <InlineEdit
                        value={link.label}
                        onChange={(val) => updatePersonalLink(pIdx, 'label', val)}
                        placeholder="Link Label"
                      />
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-elevation1 border border-[#343446] flex items-center justify-center text-amberAccent shrink-0">
                      <LinkIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="font-mono text-sm sm:text-base text-textPrimary font-medium mb-2 break-all">
                    <InlineEdit
                      value={link.url}
                      onChange={(val) => updatePersonalLink(pIdx, 'url', val)}
                      placeholder="https://..."
                    />
                  </div>

                  <p className="text-xs text-textMuted leading-relaxed font-body mb-6">
                    Custom channel & personal portfolio link
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2A2A38] flex items-center justify-between">
                  <a
                    href={link.url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-amberAccent hover:text-[#E8B475] transition-colors"
                  >
                    <span>Open link</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={link.url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-elevation1 border border-[#303042] text-textMuted hover:text-textPrimary transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Location & Timezone Tile */}
        <div className="p-6 rounded-2xl bg-elevation1 border border-[#2B2B38] shadow-elev-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-elevation2 border border-[#343446] flex items-center justify-center text-amberAccent shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-xs text-amberAccent block">
                Primary Base & Availability
              </span>
              <p className="font-display text-base font-semibold text-textPrimary">
                Kerala, India • Available for Remote & Onsite Roles Worldwide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-textMuted px-3 py-1.5 rounded-lg bg-elevation2 border border-[#323242]">
            <Clock className="w-3.5 h-3.5 text-amberAccent" />
            <span>IST (UTC +5:30)</span>
          </div>
        </div>
      </div>

      {/* Replace CV Modal */}
      <AnimatePresence>
        {isCVModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-2xl bg-elevation2 border border-[#3C3C50] shadow-elev-lift p-6 text-textPrimary"
            >
              <button
                type="button"
                onClick={() => {
                  setIsCVModalOpen(false);
                  setCvWarning('');
                }}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-elevation1 border border-[#303040] text-textMuted hover:text-textPrimary"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-4">
                <span className="font-mono text-xs text-amberAccent uppercase tracking-wider block mb-1">
                  Resume & Document Management
                </span>
                <h3 className="font-display text-xl font-semibold">Update Curriculum Vitae</h3>
              </div>

              {/* Warning about size */}
              {cvWarning && (
                <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amberAccent shrink-0 mt-0.5" />
                  <span>{cvWarning}</span>
                </div>
              )}

              {/* Option A: Upload PDF */}
              <div className="mb-5 p-4 rounded-xl bg-elevation1 border border-[#2B2B38]">
                <label className="block font-mono text-xs text-amberAccent uppercase tracking-wider mb-2">
                  Option 1: Upload PDF File
                </label>
                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#343446] rounded-xl hover:border-amberAccent/50 cursor-pointer transition-colors bg-elevation2/50">
                  <Upload className="w-6 h-6 text-amberAccent mb-1" />
                  <span className="font-mono text-xs text-textPrimary">Choose PDF Document</span>
                  <span className="text-[11px] text-textMuted">Stored locally as Data URL (max 1.5MB recommended)</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Option B: External URL */}
              <form onSubmit={handleUrlSubmit} className="space-y-3">
                <label className="block font-mono text-xs text-amberAccent uppercase tracking-wider">
                  Option 2: External Link (Drive, Dropbox, Cloud)
                </label>
                <input
                  type="url"
                  value={cvInputUrl}
                  onChange={(e) => setCvInputUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                />

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCVModalOpen(false);
                      setCvWarning('');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-elevation1 text-xs font-medium text-textMuted hover:text-textPrimary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-amberAccent text-base font-semibold text-xs hover:bg-[#E8B475] transition-colors"
                  >
                    Save URL
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Personal Link Modal */}
      <AnimatePresence>
        {isAddLinkModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-2xl bg-elevation2 border border-[#3C3C50] shadow-elev-lift p-6 text-textPrimary"
            >
              <button
                type="button"
                onClick={() => setIsAddLinkModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-elevation1 border border-[#303040] text-textMuted hover:text-textPrimary"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-4">
                <span className="font-mono text-xs text-amberAccent uppercase tracking-wider block mb-1">
                  New Channel
                </span>
                <h3 className="font-display text-xl font-semibold">Add Personal Link</h3>
              </div>

              <form onSubmit={handleAddPersonalLinkSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-textMuted mb-1">Label *</label>
                  <input
                    type="text"
                    required
                    value={newLinkLabel}
                    onChange={(e) => setNewLinkLabel(e.target.value)}
                    placeholder="e.g. X / Twitter, Personal Blog, Telegram"
                    className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-textMuted mb-1">URL *</label>
                  <input
                    type="url"
                    required
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-textMuted mb-1">Select Icon</label>
                  <select
                    value={newLinkIcon}
                    onChange={(e) => setNewLinkIcon(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-elevation1 border border-[#303042] text-sm text-textPrimary focus:border-amberAccent focus:outline-none"
                  >
                    <option value="Globe">Globe (Default Web)</option>
                    <option value="Github">GitHub</option>
                    <option value="Linkedin">LinkedIn</option>
                    <option value="Twitter">X / Twitter</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Mail">Mail</option>
                  </select>
                </div>

                <div className="pt-3 border-t border-[#2E2E3E] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddLinkModalOpen(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-elevation1 text-xs font-medium text-textMuted hover:text-textPrimary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-amberAccent text-base font-semibold text-xs hover:bg-[#E8B475] transition-colors"
                  >
                    Add Link Tile
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
