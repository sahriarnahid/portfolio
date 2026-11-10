import React from 'react';

interface SpotifyModalProps {
  isOpen: boolean;
  isSynthPlaying: boolean;
  onToggleSynth: () => void;
  onClose: () => void;
}

export const SpotifyModal: React.FC<SpotifyModalProps> = ({
  isOpen,
  isSynthPlaying,
  onToggleSynth,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="spotify-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Nahid's Coding and Late-Night Mix"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl border border-[var(--rule-color)] bg-[var(--bg-paper)] p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--rule-color)] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#1DB954] text-[#111312] font-mono-tech text-[11px] font-semibold">
              FM 88.4
            </span>
            <h3 className="font-mono-tech text-sm sm:text-base uppercase tracking-wider">
              NAHID&apos;S CODING &amp; LATE-NIGHT MIX
            </h3>
          </div>
          <button
            onClick={onClose}
            className="px-2.5 py-1 border border-[var(--rule-color)] font-mono-tech text-xs hover:bg-[#D4685C] hover:text-white transition-colors"
          >
            ✕ ESC
          </button>
        </div>

        {/* Exact User-Requested Spotify Playlist Iframe */}
        <div className="w-full overflow-hidden rounded-xl border border-[var(--rule-color)] bg-[#121514]">
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/playlist/25cisGDGrBPDpQBs4iLBwj?utm_source=generator&si=c381b10aec904c6f"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist Embed"
          />
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--rule-color)] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onToggleSynth}
            id="synth-toggle-btn"
            className={`vcr-btn font-mono-tech text-xs px-3 py-1.5 flex items-center gap-2 ${
              isSynthPlaying ? 'playing' : ''
            }`}
          >
            <span>{isSynthPlaying ? '⏹ STOP BOOMBOX SYNTH LOOP' : '🎹 TEST BOOMBOX 80s SYNTH LOOP'}</span>
          </button>
          <a
            href="https://open.spotify.com/playlist/25cisGDGrBPDpQBs4iLBwj?si=TlJ5oCqeSHmwrRYnPTK20A"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-tech text-xs underline hover:text-[#D4685C]"
          >
            OPEN PLAYLIST IN SPOTIFY ↗
          </a>
        </div>
      </div>
    </div>
  );
};

