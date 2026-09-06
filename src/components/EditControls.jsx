import { useState } from 'react';
import { Save, Download, RotateCcw, Check, Lock, X, Eye, EyeOff, Info, AlertCircle } from 'lucide-react';
import { useContent } from '../context/EditModeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function EditControls() {
  const {
    isEditMode,
    requestToggleEditMode,
    isPasswordModalOpen,
    setIsPasswordModalOpen,
    authenticate,
    saveContent,
    exportContent,
    resetContent,
    saveStatus,
    hasUnsavedChanges,
  } = useContent();

  const isProduction = import.meta.env.PROD;

  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const success = authenticate(password);
    if (!success) {
      setErrorMsg('Incorrect passkey. (Hint: admin)');
    } else {
      setPassword('');
      setErrorMsg('');
    }
  };

  return (
    <>
      {/* Password Gate Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              className="relative w-full max-w-md rounded-2xl bg-elevation1 border border-[#323244] shadow-elev-lift p-7 text-textPrimary"
            >
              <button
                type="button"
                onClick={() => {
                  setIsPasswordModalOpen(false);
                  setPassword('');
                  setErrorMsg('');
                }}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-elevation2 text-textMuted hover:text-textPrimary border border-[#303040]"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-elevation2 border border-[#3A3A4C] flex items-center justify-center text-amberAccent">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">Enable Edit Mode</h3>
                  <p className="font-mono text-xs text-textMuted">
                    {isProduction ? 'Static Hosting Preview Session' : 'Local Development Mode'}
                  </p>
                </div>
              </div>

              <p className="text-sm text-textMuted font-body mb-3 leading-relaxed">
                Enter your passkey to customize headlines, projects, skills, and contact links directly inline.
              </p>

              {isProduction && (
                <div className="mb-4 p-3 rounded-xl bg-elevation2 border border-amberAccent/30 flex items-start gap-2.5 text-xs text-textMuted">
                  <Info className="w-4 h-4 text-amberAccent shrink-0 mt-0.5" />
                  <span>
                    On GitHub Pages, edits run in a <strong className="text-amberAccent">browser session preview</strong>. Use <strong>Export JSON</strong> to download your changes and commit them to update the live site permanently.
                  </span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter passkey..."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    autoFocus
                    className="w-full px-4 py-2.5 rounded-xl bg-elevation2 border border-[#36364A] text-sm text-textPrimary placeholder:text-textMuted/60 focus:border-amberAccent focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-textMuted hover:text-textPrimary"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-400 font-mono">{errorMsg}</p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-[11px] text-textMuted">
                    Default passkey: <span className="text-amberAccent font-semibold">admin</span>
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPasswordModalOpen(false);
                        setPassword('');
                        setErrorMsg('');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-elevation2 text-xs font-medium text-textMuted hover:text-textPrimary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-amberAccent text-xs font-medium text-base font-semibold hover:bg-[#E8B475] transition-colors"
                    >
                      Unlock
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Save / Export Pill - Appears bottom-center only in Edit Mode */}
      <AnimatePresence>
        {isEditMode && (
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            aria-label="Edit Mode Controls"
            className="fixed bottom-6 inset-x-0 mx-auto w-fit max-w-[92vw] z-50 flex flex-wrap items-center justify-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-elevation2 border border-amberAccent/40 shadow-elev-lift mobile-shadow-clean"
          >
            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                    hasUnsavedChanges ? 'bg-amberAccent opacity-75' : 'bg-emerald-400 opacity-60'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    hasUnsavedChanges ? 'bg-amberAccent' : 'bg-emerald-400'
                  }`}
                />
              </span>

              {isProduction ? (
                <span className="font-mono text-xs font-medium text-amberAccent flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Preview only, not saved to live site</span>
                </span>
              ) : (
                <span className="font-mono text-xs font-medium text-textPrimary hidden sm:inline">
                  {hasUnsavedChanges ? 'Unsaved edits' : 'Edit Mode (Local)'}
                </span>
              )}
            </div>

            <div className="w-[1px] h-4 bg-[#36364A] hidden sm:block" />

            {/* Save Button (Saves to localStorage in browser) */}
            <button
              type="button"
              onClick={saveContent}
              title={
                isProduction
                  ? 'Saves to this browser session. To update live site, click Export JSON, replace content.json locally, and push.'
                  : 'Save changes to local browser storage'
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                saveStatus === 'saved'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amberAccent text-base font-semibold hover:bg-[#E8B475]'
              }`}
            >
              {saveStatus === 'saved' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{isProduction ? 'Cached in Session!' : 'Saved!'}</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>{isProduction ? 'Save in Session' : 'Save'}</span>
                </>
              )}
            </button>

            {/* Export JSON Button (Crucial for making production updates permanent) */}
            <button
              type="button"
              onClick={exportContent}
              title="Download content.json to commit and deploy permanently"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-elevation1 border border-amberAccent/40 text-xs font-medium text-textPrimary hover:bg-amberAccent/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amberAccent" />
              <span>Export JSON</span>
            </button>

            {/* Reset Defaults Button */}
            <button
              type="button"
              onClick={resetContent}
              title="Reset to default content"
              className="p-1.5 rounded-lg text-textMuted hover:text-textPrimary hover:bg-elevation1 transition-colors"
              aria-label="Reset content"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="w-[1px] h-4 bg-[#36364A]" />

            {/* Exit Edit Mode Button */}
            <button
              type="button"
              onClick={requestToggleEditMode}
              className="inline-flex items-center gap-1 text-xs font-mono text-textMuted hover:text-textPrimary transition-colors"
            >
              <span>Done</span>
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
