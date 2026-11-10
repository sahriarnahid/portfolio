import React from 'react';

interface VcrHeaderProps {
  statusText: string;
  isDeckPlaying: boolean;
  isCrtDark: boolean;
  onPlayClick: () => void;
  onToggleTheme: () => void;
}

export const VcrHeader: React.FC<VcrHeaderProps> = ({
  statusText,
  isDeckPlaying,
  isCrtDark,
  onPlayClick,
  onToggleTheme,
}) => {
  return (
    <header className="w-full border-b border-[var(--rule-color)] bg-[var(--bg-vcr-outer)] px-3 py-2 relative z-30">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
          {/* PLAY BUTTON: Directs straight to the VHS Tape Section underneath and loads active tape */}
          <button
            id="play-tape-btn"
            onClick={onPlayClick}
            className="vcr-btn font-mono-tech text-sm sm:text-base px-4 py-1.5 flex items-center justify-center gap-2 shrink-0 tracking-widest"
            title="Jump to VHS Tape Deck & Play Skills"
          >
            <span>PLAY</span>
            <span className="text-xs">►</span>
          </button>

          {/* MAIN VHS CONSOLE BAR (1px Hairline Border) */}
          <div className="flex-1 bg-[var(--bg-vcr-inner)] border border-[var(--rule-color)] px-3 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: Cassette SVG + Razor-Sharp Now Playing Readout */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Mini VHS Cassette Icon */}
              <div className="shrink-0 bg-[#3B3F3C] border border-[var(--rule-color)] px-1.5 py-0.5 flex items-center">
                <svg width="52" height="22" viewBox="0 0 56 26">
                  <circle
                    className={`vcr-reel reel-spinning ${!isDeckPlaying ? 'reel-paused' : ''}`}
                    cx="11"
                    cy="13"
                    r="6.5"
                    fill="#D5D2C8"
                    stroke="#1E201F"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                  />
                  <circle cx="11" cy="13" r="2.5" fill="#3B3F3C" stroke="#1E201F" strokeWidth="1.2" />
                  <rect x="19" y="3" width="18" height="20" rx="1" fill="#F4F0EA" stroke="#1E201F" strokeWidth="1.2" />
                  <text
                    x="28"
                    y="11.5"
                    textAnchor="middle"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="600"
                    fontSize="5"
                    fill="#191A19"
                  >
                    PLAY
                  </text>
                  <text
                    x="28"
                    y="18.5"
                    textAnchor="middle"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="600"
                    fontSize="5"
                    fill="#191A19"
                  >
                    NOW
                  </text>
                  <circle
                    className={`vcr-reel reel-spinning ${!isDeckPlaying ? 'reel-paused' : ''}`}
                    cx="45"
                    cy="13"
                    r="6.5"
                    fill="#D5D2C8"
                    stroke="#1E201F"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                  />
                  <circle cx="45" cy="13" r="2.5" fill="#3B3F3C" stroke="#1E201F" strokeWidth="1.2" />
                </svg>
              </div>

              {/* 1px Hairline Now Playing Track Display */}
              <div className="flex-1 min-w-0 border-y border-[var(--rule-color)] py-1 px-1">
                <div className="font-mono-tech text-xs sm:text-[13px] tracking-wider truncate flex items-center gap-1.5 text-[var(--vcr-text)]">
                  <span className="text-[var(--vcr-accent)]">⚡</span>
                  <span id="vcr-status-text">{statusText}</span>
                </div>
              </div>
            </div>

            {/* Right: Social Platform Links + Theme Toggle */}
            <nav
              aria-label="Social Links and Theme Controls"
              className="font-mono-tech text-[11px] sm:text-xs text-[var(--vcr-text)] flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 tracking-widest shrink-0"
            >
              <a
                href="https://medium.com/@sahriarnahid"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4685C] transition-colors"
              >
                MEDIUM
              </a>
              <a href="mailto:srnahid08@gmail.com" className="hover:text-[#D4685C] transition-colors">
                EMAIL
              </a>
              <a
                href="https://x.com/sahriarnahid"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4685C] transition-colors"
              >
                X
              </a>
              <a
                href="https://github.com/sahriarnahid"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4685C] transition-colors"
              >
                GITHUB
              </a>
              <a
                href="https://linkedin.com/in/sahriar-rahman-nahid"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4685C] transition-colors"
              >
                LINKEDIN
              </a>
              <button
                onClick={onToggleTheme}
                id="crt-toggle-btn"
                className="px-2 py-0.5 border border-[var(--rule-color)] text-[10px] bg-[var(--bg-paper)] text-[var(--ink)] hover:bg-[#D4685C] hover:text-white transition-colors"
                title="Switch between Dark CRT Mode and Warm Newsprint Mode"
              >
                {isCrtDark ? '[CRT: DARK]' : '[CRT: PAPER]'}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
