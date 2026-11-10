import React, { useEffect, useRef } from 'react';
import { VhsTapeMeta } from '../data/cvData';

interface ToyBoxSectionProps {
  currentTape: VhsTapeMeta;
  isSynthPlaying: boolean;
  onOpenArcade: () => void;
  onCycleTapeAndScroll: () => void;
  onOpenSpotify: () => void;
  onOpenJournal: () => void;
}

export const ToyBoxSection: React.FC<ToyBoxSectionProps> = ({
  currentTape,
  isSynthPlaying,
  onOpenArcade,
  onCycleTapeAndScroll,
  onOpenSpotify,
  onOpenJournal,
}) => {
  const miniCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = miniCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let playerY = 76;
    let velY = 0;
    let bugX = 175;
    let bugScored = false;
    let score = 0;
    let animId = 0;

    const loop = () => {
      // Auto-jump in the mini monitor attract-mode preview when a bug approaches
      if (bugX > 34 && bugX < 50 && playerY >= 75) {
        velY = -5.6;
      }

      playerY += velY;
      velY += 0.28;
      if (playerY > 76) {
        playerY = 76;
        velY = 0;
      }
      bugX -= 1.4;
      if (!bugScored && bugX + 10 < 24) {
        bugScored = true;
        score = score >= 20 ? 0 : score + 1;
      }
      if (bugX < -12) {
        bugX = 185;
        bugScored = false;
      }
      if (Math.abs(bugX - 26) < 9 && playerY > 66) {
        score = 0;
        bugX = 185;
        bugScored = false;
      }

      ctx.fillStyle = '#869B94';
      ctx.fillRect(0, 0, 180, 110);
      ctx.fillStyle = '#232625';
      ctx.fillRect(0, 90, 180, 2);
      ctx.fillRect(24, playerY, 12, 14);
      ctx.fillStyle = '#D4685C';
      ctx.fillRect(bugX, 80, 10, 10);
      ctx.fillStyle = '#1E201F';
      ctx.font = 'bold 9px monospace';
      ctx.fillText(`SCORE:${String(score).padStart(4, '0')}`, 8, 14);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section aria-labelledby="toybox-heading" className="pt-1">
      {/* Section Header Row */}
      <div className="flex items-center gap-2.5 mb-5">
        <svg width="24" height="16" viewBox="0 0 26 18" fill="none" className="shrink-0">
          <rect x="1" y="1" width="24" height="16" rx="1.5" fill="#1E201F" stroke="var(--ink)" strokeWidth="1" />
          <circle cx="8" cy="9" r="2.2" fill="#F4F0EA" />
          <circle cx="18" cy="9" r="2.2" fill="#F4F0EA" />
          <path d="M6 16 L8 13 H18 L20 16" stroke="#F4F0EA" strokeWidth="1" />
        </svg>
        <h2 id="toybox-heading" className="font-mono-tech text-base sm:text-lg tracking-widest uppercase">
          THE TOY BOX
        </h2>
      </div>

      {/* 4-COLUMN ILLUSTRATED HARDWARE & SKETCHBOOK GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-end pt-2">
        {/* 1. RETRO GAME ARCADE (3 Cols) — Clicking anywhere opens the Playable Arcade Modal */}
        <div
          onClick={onOpenArcade}
          className="lg:col-span-3 toy-station flex flex-col items-center cursor-pointer"
          title="Click to open the Retro Game Arcade Cabinet!"
        >
          {/* Clean Handwritten Doodle Text ONLY (No Mini Icon) */}
          <div className="mb-1.5 font-hand text-xl text-[var(--note-color)] flex items-center gap-1 select-none">
            <span>Play mini 8-bit games!</span>
            <span className="text-2xl leading-none">↙</span>
          </div>

          {/* Illustrated CRT Arcade Monitor + Live Preview Canvas */}
          <div className="relative w-full max-w-[260px]">
            <svg viewBox="0 0 240 190" className="w-full hardware-svg overflow-visible">
              <path d="M-18 115 L14 132 L8 148 L-22 132 Z" fill="#C4B69C" stroke="#232625" strokeWidth="2.5" />
              <rect
                x="10"
                y="133"
                width="12"
                height="12"
                transform="rotate(26 10 133)"
                fill="#939996"
                stroke="#232625"
                strokeWidth="2"
              />
              <rect
                x="22"
                y="18"
                width="196"
                height="156"
                rx="10"
                fill="#7D827E"
                stroke="#232625"
                strokeWidth="3.2"
              />
              <rect
                x="30"
                y="26"
                width="180"
                height="122"
                rx="6"
                fill="#585D5A"
                stroke="#232625"
                strokeWidth="2.5"
              />
              <rect x="42" y="155" width="36" height="9" rx="2" fill="#525654" stroke="#232625" strokeWidth="1.8" />
              <circle cx="96" cy="160" r="4" fill="#D4685C" stroke="#232625" strokeWidth="1.8" />
              <circle cx="110" cy="160" r="4" fill="#E9D38E" stroke="#232625" strokeWidth="1.8" />
              <rect x="176" y="155" width="14" height="9" rx="2" fill="#D4685C" stroke="#232625" strokeWidth="1.8" />
            </svg>

            {/* Embedded Live 8-Bit Pixel Runner Canvas inside CRT Bezel */}
            <div className="absolute top-[16.5%] left-[15%] w-[70%] h-[58%] rounded overflow-hidden border-2 border-[#232625] bg-[#869B94] pointer-events-none">
              <canvas id="arcade-canvas" ref={miniCanvasRef} width="180" height="110" className="w-full h-full block" />
            </div>
          </div>

          {/* Station Label Button */}
          <div className="mt-3 font-mono-tech text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2 hover:text-[#D4685C] transition-colors">
            <svg width="20" height="14" viewBox="0 0 24 16" fill="none">
              <rect x="1" y="2" width="22" height="12" rx="3" fill="#D4685C" stroke="var(--ink)" strokeWidth="1.5" />
              <path d="M6 8 H10 M8 6 V10" stroke="#F4F0EA" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="16" cy="9" r="1.4" fill="#EFE1C6" />
              <circle cx="19" cy="7" r="1.4" fill="#EFE1C6" />
            </svg>
            <span>RETRO GAME ARCADE</span>
          </div>
        </div>

        {/* 2. VHS PLAYER (3 Cols) */}
        <div className="lg:col-span-3 toy-station flex flex-col items-center">
          {/* Clean Handwritten Doodle Text ONLY (No Mini Icon) */}
          <div className="mb-1.5 font-hand text-xl text-[var(--note-color)] flex items-center gap-1 select-none">
            <span>Load CV tapes below!</span>
            <span className="text-2xl leading-none">↓</span>
          </div>

          {/* Illustrated 80s Front-Loading VCR Deck */}
          <div
            onClick={onCycleTapeAndScroll}
            className="w-full max-w-[285px] cursor-pointer"
            title="Click to switch CV tapes below (Skills → Experience → Education → Projects → Awards)"
          >
            <svg viewBox="0 0 280 170" className="w-full hardware-svg overflow-visible">
              <polygon
                points="32,38 248,38 270,68 10,68"
                fill="#6D716E"
                stroke="#232625"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <rect x="10" y="68" width="260" height="58" rx="4" fill="#828783" stroke="#232625" strokeWidth="3" />
              <rect
                id="vcr-slot-bg"
                x="48"
                y="80"
                width="184"
                height="32"
                rx="2"
                fill="#DFDDD4"
                stroke="#232625"
                strokeWidth="2.4"
              />
              <text
                id="vcr-slot-label"
                x="140"
                y="100"
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize="10.5"
                fontWeight="700"
                fill="#191A19"
              >
                {`${currentTape.code}: ${currentTape.short}`}
              </text>
              <rect x="20" y="84" width="18" height="10" rx="1.5" fill="#5A5E5B" stroke="#232625" strokeWidth="1.8" />
              <rect x="20" y="99" width="18" height="10" rx="1.5" fill="#D4685C" stroke="#232625" strokeWidth="1.8" />
              <rect x="242" y="84" width="18" height="24" rx="1.5" fill="#5A5E5B" stroke="#232625" strokeWidth="1.8" />
              <rect x="16" y="126" width="248" height="24" rx="3" fill="#666B68" stroke="#232625" strokeWidth="2.8" />
              <text
                id="vcr-timecode"
                x="52"
                y="142"
                fontFamily="JetBrains Mono, monospace"
                fontSize="10"
                fontWeight="700"
                fill="#E9D38E"
              >
                {`► CH 0${currentTape.id + 1} // ${currentTape.short}`}
              </text>
              <circle cx="226" cy="138" r="4" fill="#D4685C" stroke="#232625" strokeWidth="1.8" />
              <circle cx="242" cy="138" r="4" fill="#525654" stroke="#232625" strokeWidth="1.8" />
              <path
                d="M18 145 C-8 152, 8 166, 36 165"
                fill="none"
                stroke="#232625"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <rect x="34" y="161" width="10" height="6" fill="#7C95A6" stroke="#232625" strokeWidth="1.6" />
              <path
                d="M262 145 C288 152, 272 166, 244 165"
                fill="none"
                stroke="#232625"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <rect x="236" y="161" width="10" height="6" fill="#D4685C" stroke="#232625" strokeWidth="1.6" />
            </svg>
          </div>

          {/* Station Label Button */}
          <button
            onClick={onCycleTapeAndScroll}
            className="mt-3 font-mono-tech text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2 hover:text-[#D4685C] transition-colors"
          >
            <svg width="20" height="14" viewBox="0 0 24 16" fill="none">
              <rect x="1" y="2" width="22" height="12" rx="1.5" fill="#7C95A6" stroke="var(--ink)" strokeWidth="1.5" />
              <circle cx="7.5" cy="8" r="1.8" fill="#F4F0EA" />
              <circle cx="16.5" cy="8" r="1.8" fill="#F4F0EA" />
            </svg>
            <span>VHS PLAYER</span>
          </button>
        </div>

        {/* 3. RADIO MIX BOOMBOX (3 Cols) */}
        <div className="lg:col-span-3 toy-station flex flex-col items-center">
          {/* Clean Handwritten Doodle Text ONLY (No Mini Icon) */}
          <div className="mb-1.5 font-hand text-xl text-[var(--note-color)] flex items-center gap-1 select-none">
            <span>Spin my Spotify mix!</span>
            <span className="text-2xl leading-none">↘</span>
          </div>

          {/* Illustrated Vintage Dual-Speaker Boombox */}
          <div
            onClick={onOpenSpotify}
            className="w-full max-w-[275px] cursor-pointer"
            title="Click to open Nahid's Spotify Playlist & Boombox"
          >
            <svg viewBox="0 0 270 185" className="w-full hardware-svg overflow-visible">
              <g transform="rotate(-22 25 145)">
                <rect x="2" y="130" width="38" height="24" rx="2" fill="#686C69" stroke="#232625" strokeWidth="2" />
                <circle cx="13" cy="142" r="4" fill="#F4F0EA" stroke="#232625" strokeWidth="1.4" />
              </g>
              <g transform="rotate(18 245 145)">
                <rect x="230" y="130" width="38" height="24" rx="2" fill="#686C69" stroke="#232625" strokeWidth="2" />
                <circle cx="255" cy="142" r="4" fill="#F4F0EA" stroke="#232625" strokeWidth="1.4" />
              </g>
              <path d="M36 48 V20 H234 V48" fill="none" stroke="#7A7F7C" strokeWidth="7" strokeLinejoin="round" />
              <path d="M36 48 V20 H234 V48" fill="none" stroke="#232625" strokeWidth="2.5" strokeLinejoin="round" />
              <rect
                x="20"
                y="46"
                width="230"
                height="122"
                rx="8"
                fill="#8C918D"
                stroke="#232625"
                strokeWidth="3.2"
              />
              <rect
                x="34"
                y="56"
                width="168"
                height="26"
                rx="3"
                fill="#6D7370"
                stroke="#232625"
                strokeWidth="2.2"
              />
              <line x1="42" y1="70" x2="194" y2="70" stroke="#DFDDD4" strokeWidth="1.5" strokeDasharray="4 3" />
              <line id="tuner-needle" x1="115" y1="58" x2="115" y2="80" stroke="#D4685C" strokeWidth="3" />
              <text
                id="boombox-status-text"
                x="44"
                y="67"
                fontFamily="JetBrains Mono, monospace"
                fontSize="8.5"
                fontWeight="700"
                fill="#F4F0EA"
              >
                SPOTIFY FM // 88.4
              </text>
              <circle cx="222" cy="69" r="11" fill="#5A5E5B" stroke="#232625" strokeWidth="2.4" />
              <circle cx="222" cy="69" r="5" fill="#8C918D" stroke="#232625" strokeWidth="1.6" />
              <g id="speaker-left" className={isSynthPlaying ? 'speaker-active' : ''}>
                <circle cx="66" cy="126" r="34" fill="#5D625F" stroke="#232625" strokeWidth="2.8" />
                <circle cx="66" cy="126" r="24" fill="none" stroke="#232625" strokeWidth="1.4" strokeDasharray="3 2" />
                <circle cx="66" cy="126" r="11" fill="#3E4240" stroke="#232625" strokeWidth="2" />
              </g>
              <rect
                x="108"
                y="98"
                width="54"
                height="44"
                rx="3"
                fill="#737875"
                stroke="#232625"
                strokeWidth="2.4"
              />
              <rect
                x="116"
                y="108"
                width="38"
                height="22"
                rx="2"
                fill="#494D4B"
                stroke="#232625"
                strokeWidth="1.8"
              />
              <circle cx="126" cy="119" r="3.5" fill="#DFDDD4" />
              <circle cx="144" cy="119" r="3.5" fill="#DFDDD4" />
              <rect x="112" y="146" width="46" height="10" fill="#5A5E5B" stroke="#232625" strokeWidth="1.6" />
              <g id="speaker-right" className={isSynthPlaying ? 'speaker-active' : ''}>
                <circle cx="204" cy="126" r="34" fill="#5D625F" stroke="#232625" strokeWidth="2.8" />
                <circle
                  cx="204"
                  cy="126"
                  r="24"
                  fill="none"
                  stroke="#232625"
                  strokeWidth="1.4"
                  strokeDasharray="3 2"
                />
                <circle cx="204" cy="126" r="11" fill="#3E4240" stroke="#232625" strokeWidth="2" />
              </g>
            </svg>
          </div>

          {/* Station Label Button */}
          <button
            onClick={onOpenSpotify}
            className="mt-3 font-mono-tech text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2 hover:text-[#D4685C] transition-colors"
          >
            <svg width="18" height="14" viewBox="0 0 22 18" fill="none">
              <rect x="1" y="5" width="20" height="12" rx="1.5" fill="#1DB954" stroke="var(--ink)" strokeWidth="1.5" />
              <line x1="4" y1="5" x2="15" y2="1" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="6.5" cy="11" r="2.2" fill="#121514" />
              <circle cx="15.5" cy="11" r="2.2" fill="#121514" />
            </svg>
            <span id="radio-label-text">RADIO MIX</span>
          </button>
        </div>

        {/* 4. DOODLE JOURNAL (3 Cols) */}
        <div className="lg:col-span-3 toy-station flex flex-col items-center">
          {/* Clean Handwritten Doodle Text ONLY (No Mini Icon) */}
          <div className="mb-1.5 font-hand text-xl text-[var(--note-color)] flex items-center gap-1 select-none">
            <span>Read my blog notes!</span>
            <span className="text-2xl leading-none">↙</span>
          </div>

          {/* Spiral-Bound Open Sketchbook */}
          <div
            onClick={onOpenJournal}
            className="w-full max-w-[295px] cursor-pointer"
            title="Click to preview Nahid's Blog & Visual Journal"
          >
            <svg viewBox="0 0 300 205" className="w-full hardware-svg overflow-visible">
              <rect x="8" y="10" width="280" height="182" rx="6" fill="#5C564F" stroke="#232625" strokeWidth="3.2" />
              <rect x="15" y="16" width="128" height="170" rx="3" fill="#F4F0EA" stroke="#232625" strokeWidth="2.4" />
              <rect
                x="153"
                y="16"
                width="128"
                height="170"
                rx="3"
                fill="#F4F0EA"
                stroke="#232625"
                strokeWidth="2.4"
              />

              <g stroke="#232625" strokeWidth="2.6" strokeLinecap="round">
                <line x1="140" y1="26" x2="156" y2="26" />
                <line x1="140" y1="38" x2="156" y2="38" />
                <line x1="140" y1="50" x2="156" y2="50" />
                <line x1="140" y1="62" x2="156" y2="62" />
                <line x1="140" y1="74" x2="156" y2="74" />
                <line x1="140" y1="86" x2="156" y2="86" />
                <line x1="140" y1="98" x2="156" y2="98" />
                <line x1="140" y1="110" x2="156" y2="110" />
                <line x1="140" y1="122" x2="156" y2="122" />
                <line x1="140" y1="134" x2="156" y2="134" />
                <line x1="140" y1="146" x2="156" y2="146" />
                <line x1="140" y1="158" x2="156" y2="158" />
                <line x1="140" y1="170" x2="156" y2="170" />
              </g>

              <g id="journal-left-page">
                <ellipse cx="52" cy="40" rx="28" ry="15" fill="#FFFFFF" stroke="#232625" strokeWidth="1.8" />
                <text
                  x="52"
                  y="38"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="6.5"
                  fontWeight="700"
                  fill="#232625"
                >
                  Dev
                </text>
                <text
                  x="52"
                  y="46"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="6.5"
                  fontWeight="700"
                  fill="#232625"
                >
                  Stories
                </text>
                <circle cx="108" cy="48" r="16" fill="#C97A6E" stroke="#232625" strokeWidth="1.8" />
                <circle cx="108" cy="48" r="9" fill="#829B85" stroke="#232625" strokeWidth="1.5" />
                <path d="M90 95 L125 84 L112 104 Z" fill="#7C95A6" stroke="#232625" strokeWidth="1.8" />
                <path
                  d="M26 142 C26 130, 42 130, 46 140 L56 148 L72 156 L54 162 L48 174 L36 174 L36 156 L26 150 Z"
                  fill="#6F8F67"
                  stroke="#232625"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="35" cy="138" r="1.8" fill="#232625" />
                <rect
                  x="92"
                  y="130"
                  width="34"
                  height="44"
                  transform="rotate(5 92 130)"
                  fill="#626966"
                  stroke="#232625"
                  strokeWidth="1.8"
                />
                <rect x="97" y="136" width="24" height="22" transform="rotate(5 97 136)" fill="#E9D38E" />
              </g>

              <g id="journal-right-page">
                <rect x="162" y="26" width="52" height="72" fill="#D5D9D2" stroke="#232625" strokeWidth="1.8" />
                <circle cx="188" cy="54" r="10" fill="#C69C72" stroke="#232625" strokeWidth="1.6" />
                <path d="M174 98 C176 76, 200 76, 202 98" fill="#7C95A6" stroke="#232625" strokeWidth="1.6" />
                <rect x="219" y="26" width="52" height="72" fill="#E6DEC8" stroke="#232625" strokeWidth="1.8" />
                <rect x="223" y="30" width="44" height="14" rx="2" fill="#FFFFFF" stroke="#232625" strokeWidth="1.2" />
                <text
                  id="comic-caption-text"
                  x="245"
                  y="39"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="5"
                  fontWeight="700"
                  fill="#232625"
                >
                  BLOG NOTES
                </text>
                <circle cx="245" cy="60" r="10" fill="#C69C72" stroke="#232625" strokeWidth="1.6" />
                <path d="M231 98 C233 78, 257 78, 259 98" fill="#7D7565" stroke="#232625" strokeWidth="1.6" />
                <rect x="162" y="104" width="52" height="72" fill="#E6DEC8" stroke="#232625" strokeWidth="1.8" />
                <circle cx="188" cy="134" r="10" fill="#C69C72" stroke="#232625" strokeWidth="1.6" />
                <path d="M174 176 C176 154, 200 154, 202 176" fill="#7D7565" stroke="#232625" strokeWidth="1.6" />
                <rect x="219" y="104" width="52" height="72" fill="#D5D9D2" stroke="#232625" strokeWidth="1.8" />
                <circle cx="245" cy="134" r="10" fill="#C69C72" stroke="#232625" strokeWidth="1.6" />
                <path d="M231 176 C233 154, 257 154, 259 176" fill="#D4685C" stroke="#232625" strokeWidth="1.6" />
              </g>

              <g transform="rotate(12 296 110)">
                <rect x="294" y="60" width="7" height="115" rx="2" fill="#C4B69C" stroke="#232625" strokeWidth="2" />
                <rect x="293" y="54" width="9" height="28" rx="1.5" fill="#9E6252" stroke="#232625" strokeWidth="2" />
              </g>
            </svg>
          </div>

          {/* Station Label Button */}
          <button
            onClick={onOpenJournal}
            className="mt-3 font-mono-tech text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2 hover:text-[#D4685C] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="2" width="14" height="16" rx="1.5" fill="#E5A93C" stroke="var(--ink)" strokeWidth="1.5" />
              <line x1="1" y1="6" x2="5" y2="6" stroke="var(--ink)" strokeWidth="1.5" />
              <line x1="1" y1="10" x2="5" y2="10" stroke="var(--ink)" strokeWidth="1.5" />
              <line x1="1" y1="14" x2="5" y2="14" stroke="var(--ink)" strokeWidth="1.5" />
            </svg>
            <span>DOODLE JOURNAL</span>
          </button>
        </div>
      </div>
    </section>
  );
};

