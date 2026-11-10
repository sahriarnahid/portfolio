import React from 'react';

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="journal-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Field Notes and Engineering Journal"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl border border-[var(--rule-color)] bg-[var(--bg-paper)] p-5 shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule-color)] pb-3 mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#E5A93C] text-[#151716] font-mono-tech text-[11px] font-semibold">
              BEYONDBYTES
            </span>
            <h3 className="font-mono-tech text-sm sm:text-base uppercase tracking-wider">
              FIELD NOTES &amp; ENGINEERING JOURNAL
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://beyondbytes.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="vcr-btn font-mono-tech text-xs px-3 py-1"
            >
              VISIT BEYONDBYTES.PAGES.DEV ↗
            </a>
            <button
              onClick={onClose}
              className="px-2.5 py-1 border border-[var(--rule-color)] font-mono-tech text-xs hover:bg-[#D4685C] hover:text-white transition-colors"
            >
              ✕ ESC
            </button>
          </div>
        </div>

        {/* Direct Live Embedded Iframe of https://beyondbytes.pages.dev/ */}
        <div id="journal-iframe-view" className="flex-1 min-h-[480px] border border-[var(--rule-color)] bg-white overflow-hidden">
          <iframe
            src="https://beyondbytes.pages.dev/"
            title="Sahriar Nahid Blog — BeyondBytes"
            className="w-full h-[480px] border-0"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

