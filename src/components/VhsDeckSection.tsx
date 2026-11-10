import React from 'react';
import {
  VHS_TAPES,
  CV_SKILLS,
  CV_EXPERIENCE,
  CV_EDUCATION,
  CV_PROJECTS,
  CV_AWARDS,
  CORE_COMPETENCIES_TEXT,
  SPOKEN_LANGUAGES_TEXT,
  SkillItem,
  ExperienceItem,
  EducationItem,
  ProjectItem,
} from '../data/cvData';

interface VhsDeckSectionProps {
  currentTapeIndex: number;
  isDeckPlaying: boolean;
  onSelectTape: (index: number, scrollToDeck: boolean) => void;
  onCycleNextTape: () => void;
  onPauseAndReturnHome: () => void;
}

const renderSkillSvg = (svgType: SkillItem['svgType']) => {
  switch (svgType) {
    case 'langchain':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7">
          <rect x="3" y="7" width="12" height="18" rx="4" fill="none" stroke="#10A37F" strokeWidth="2.4" />
          <rect x="17" y="7" width="12" height="18" rx="4" fill="none" stroke="#D4685C" strokeWidth="2.4" />
          <line x1="11" y1="16" x2="21" y2="16" stroke="#E5A93C" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );
    case 'langgraph':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7">
          <circle cx="8" cy="9" r="3.5" fill="#D4685C" />
          <circle cx="24" cy="9" r="3.5" fill="#7C95A6" />
          <circle cx="16" cy="24" r="3.5" fill="#E5A93C" />
          <path d="M11 10 L21 10 M9.5 12 L14.5 21 M22.5 12 L17.5 21" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'rag':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7">
          <ellipse cx="16" cy="8" rx="10" ry="4" fill="none" stroke="#7C95A6" strokeWidth="2.2" />
          <path
            d="M6 8v8c0 2.2 4.5 4 10 4s10-1.8 10-4V8"
            fill="none"
            stroke="#7C95A6"
            strokeWidth="2.2"
          />
          <path
            d="M6 16v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8"
            fill="none"
            stroke="#D4685C"
            strokeWidth="2.2"
          />
        </svg>
      );
    case 'openai':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7">
          <circle
            cx="16"
            cy="16"
            r="11"
            fill="none"
            stroke="#10A37F"
            strokeWidth="2.2"
            strokeDasharray="5 2"
          />
          <circle cx="16" cy="16" r="4" fill="#10A37F" />
        </svg>
      );
    case 'claude':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7">
          <rect x="4" y="4" width="24" height="24" rx="5" fill="#D97757" />
          <path d="M16 9 L22 23 H19 L17.6 19.5 H14.4 L13 23 H10 Z" fill="#FFF" />
        </svg>
      );
    case 'gemini':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7">
          <path
            d="M16 3 C16 11, 21 16, 29 16 C21 16, 16 21, 16 29 C16 21, 11 16, 3 16 C11 16, 16 11, 16 3 Z"
            fill="#4E86F5"
          />
        </svg>
      );
    case 'langsmith':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7">
          <rect x="4" y="6" width="24" height="20" rx="3" fill="none" stroke="#E5A93C" strokeWidth="2.2" />
          <polyline
            points="8,20 13,14 17,18 24,11"
            fill="none"
            stroke="#D4685C"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'aws':
      return (
        <svg viewBox="0 0 40 32" className="w-8 h-7">
          <text
            x="20"
            y="16"
            textAnchor="middle"
            fontFamily="Rubik, Arial, sans-serif"
            fontWeight="900"
            fontSize="13"
            fill="currentColor"
          >
            aws
          </text>
          <path
            d="M7 21.5 Q20 28 33 21.5"
            fill="none"
            stroke="#FF9900"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M29.5 19.8 L33.8 21.2 L31.5 25"
            fill="none"
            stroke="#FF9900"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'n8n':
      return (
        <svg viewBox="0 0 32 32" className="w-7 h-7">
          <rect x="3" y="8" width="26" height="16" rx="4" fill="#EA4B71" />
          <text
            x="16"
            y="19"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            fontSize="9"
            fill="#FFF"
          >
            n8n
          </text>
        </svg>
      );
    default:
      return null;
  }
};

const renderExperienceLogo = (logoType: ExperienceItem['logoType']) => {
  switch (logoType) {
    case 'progclub':
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7">
          <rect x="3" y="6" width="34" height="28" rx="4" fill="#1F2422" stroke="#D4685C" strokeWidth="2" />
          <path
            d="M12 16 L8 20 L12 24 M28 16 L32 20 L28 24 M22 14 L18 26"
            stroke="#EFE1C6"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'isu':
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7">
          <circle cx="20" cy="20" r="15" fill="#233831" stroke="#7C95A6" strokeWidth="2" />
          <ellipse cx="20" cy="20" rx="7" ry="15" fill="none" stroke="#EFE1C6" strokeWidth="1.6" />
          <line x1="5" y1="20" x2="35" y2="20" stroke="#EFE1C6" strokeWidth="1.6" />
        </svg>
      );
    case 'crowdv':
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7">
          <rect x="4" y="4" width="32" height="32" rx="6" fill="#2E293A" stroke="#E5A93C" strokeWidth="2" />
          <path d="M12 25 C12 17, 28 17, 28 25" fill="none" stroke="#EFE1C6" strokeWidth="2.2" />
          <circle cx="20" cy="15" r="3.5" fill="#E5A93C" />
        </svg>
      );
    case 'greydevs':
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7">
          <polygon
            points="20,4 35,12 35,28 20,36 5,28 5,12"
            fill="#232726"
            stroke="#D4685C"
            strokeWidth="2.2"
          />
          <text
            x="20"
            y="24"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            fontSize="11"
            fill="#EFE1C6"
          >
            GD
          </text>
        </svg>
      );
    case 'instantschool':
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7">
          <rect x="5" y="7" width="30" height="26" rx="4" fill="#2A3238" stroke="#7C95A6" strokeWidth="2" />
          <path d="M20 12 L30 17 L20 22 L10 17 Z" fill="#E5A93C" />
        </svg>
      );
  }
};

const renderEducationLogo = (logoType: EducationItem['logoType']) => {
  switch (logoType) {
    case 'unideb':
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7">
          <circle cx="20" cy="20" r="16" fill="#183629" stroke="#E5A93C" strokeWidth="2.2" />
          <path d="M12 24 V16 L20 12 L28 16 V24" fill="none" stroke="#EFE1C6" strokeWidth="2" />
          <text
            x="20"
            y="25"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            fontSize="8"
            fill="#E5A93C"
          >
            UD
          </text>
        </svg>
      );
    case 'scc':
      return (
        <svg viewBox="0 0 40 40" className="w-7 h-7">
          <path
            d="M8 8 H32 V22 C32 30, 20 35, 20 35 C20 35, 8 30, 8 22 Z"
            fill="#352524"
            stroke="#D4685C"
            strokeWidth="2.2"
          />
          <text
            x="20"
            y="23"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            fontSize="8.5"
            fill="#EFE1C6"
          >
            SCC
          </text>
        </svg>
      );
  }
};

const renderProjectArt = (artType: ProjectItem['artType']) => {
  switch (artType) {
    case 'modelverse':
      return (
        <svg
          viewBox="0 0 400 170"
          className="w-full h-40 object-cover bg-[#161A18] border-b border-[var(--rule-color)]"
        >
          <rect x="16" y="16" width="368" height="138" rx="4" fill="#1F2422" stroke="#363F3B" strokeWidth="1.5" />
          <text x="32" y="42" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#E5A93C">
            MODELVERSE // NIGHTLY LANGGRAPH PIPELINE
          </text>
          <rect x="32" y="56" width="105" height="78" rx="3" fill="#141716" stroke="#7C95A6" strokeWidth="1.2" />
          <text x="42" y="76" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#EFE1C6">
            15 LLMs
          </text>
          <text x="42" y="94" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#8E9A94">
            8 Coding Agents
          </text>
          <text x="42" y="114" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#D4685C">
            Versioned JSON
          </text>
          <path d="M144 95 H172" stroke="#E5A93C" strokeWidth="2" strokeDasharray="3 2" />
          <rect x="176" y="56" width="190" height="78" rx="3" fill="#141716" stroke="#D4685C" strokeWidth="1.2" />
          <polyline
            points="190,118 220,96 250,104 285,76 320,84 350,68"
            fill="none"
            stroke="#10A37F"
            strokeWidth="2.5"
          />
          <text x="190" y="74" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fill="#EFE1C6">
            LangChain Digest &amp; Stack Scorer
          </text>
        </svg>
      );
    case 'thesis':
      return (
        <svg
          viewBox="0 0 400 170"
          className="w-full h-40 object-cover bg-[#161A18] border-b border-[var(--rule-color)]"
        >
          <rect x="16" y="16" width="368" height="138" rx="4" fill="#1F2422" stroke="#363F3B" strokeWidth="1.5" />
          <text x="32" y="42" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#D4685C">
            CIFAR-10 // CNN &amp; RESNET-18 ROBUSTNESS
          </text>
          <rect x="32" y="56" width="90" height="76" rx="3" fill="#141716" stroke="#7C95A6" strokeWidth="1.2" />
          <text x="44" y="88" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#EFE1C6">
            Clean Input
          </text>
          <text x="58" y="106" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#E5A93C">
            + δ_adv
          </text>
          <path d="M128 94 H158" stroke="#D4685C" strokeWidth="2" />
          <rect x="164" y="56" width="202" height="76" rx="3" fill="#141716" stroke="#E5A93C" strokeWidth="1.2" />
          <text x="178" y="78" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fill="#EFE1C6">
            Adversarial Training vs
          </text>
          <text x="178" y="94" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fill="#EFE1C6">
            Input Preprocessing
          </text>
          <text x="178" y="114" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#7C95A6">
            Fixed-Seed PyTorch Benchmark
          </text>
        </svg>
      );
    case 'norvaspace':
      return (
        <svg
          viewBox="0 0 400 170"
          className="w-full h-40 object-cover bg-[#161A18] border-b border-[var(--rule-color)]"
        >
          <rect x="16" y="16" width="368" height="138" rx="4" fill="#1F2422" stroke="#363F3B" strokeWidth="1.5" />
          <text x="32" y="42" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#7C95A6">
            NORVA.SPACE // 300+ MEMBER DEV CLUB PORTAL
          </text>
          <rect x="32" y="56" width="336" height="76" rx="3" fill="#141716" stroke="#7C95A6" strokeWidth="1.2" />
          <text x="48" y="84" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#EFE1C6">
            Workshops • Hackathons • Open-Source Projects
          </text>
          <text x="48" y="108" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#E5A93C">
            University of Debrecen Official Programming Hub
          </text>
        </svg>
      );
  }
};

export const VhsDeckSection: React.FC<VhsDeckSectionProps> = ({
  currentTapeIndex,
  isDeckPlaying,
  onSelectTape,
  onCycleNextTape,
  onPauseAndReturnHome,
}) => {
  const activeTape = VHS_TAPES[currentTapeIndex];

  return (
    <section id="vhs-section" className="mt-12 pt-2 scroll-mt-6">
      <hr className="double-rule-hr mb-5" />

      {/* VCR Transport Deck Header Bar (Physical Icon Buttons + Animated VHS Cassette Window) */}
      <div className="p-3 border border-[var(--rule-color)] bg-[var(--bg-panel)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left: Tactile Hardware Transport Buttons (Pause -> Home, Next -> Cycle) + Animated VHS Tape Deck Window */}
        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3">
          <div className="flex items-center gap-2">
            {/* Hardware Pause Button: Pauses & Returns to Top Homepage */}
            <button
              id="deck-pause-home-btn"
              onClick={onPauseAndReturnHome}
              className="hw-transport-btn w-9 h-9 flex items-center justify-center"
              title="Pause & Return to Top Homepage"
              aria-label="Pause and Return Home"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="2.5" width="3.5" height="11" rx="0.8" fill="#141716" />
                <rect x="9.5" y="2.5" width="3.5" height="11" rx="0.8" fill="#141716" />
              </svg>
            </button>

            {/* Hardware Next Tape Button: Cycles to Next Tape (01 -> 05) */}
            <button
              id="deck-next-tape-btn"
              onClick={onCycleNextTape}
              className="hw-transport-btn w-9 h-9 flex items-center justify-center"
              title="Next VHS Tape"
              aria-label="Next VHS Tape"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M2 2.5 L8.5 8 L2 13.5 Z" fill="#141716" />
                <path d="M8 2.5 L13 8 L8 13.5 Z" fill="#141716" />
                <rect x="13" y="2.5" width="2" height="11" rx="0.5" fill="#141716" />
              </svg>
            </button>
          </div>

          {/* Animated VHS Cassette Window + Active Section Readout */}
          <div className="flex items-center gap-3">
            <div className="bg-[#1A1E1C] border border-[var(--rule-color)] px-2.5 py-1 rounded-xs flex items-center gap-2.5 shadow-inner">
              <svg width="68" height="26" viewBox="0 0 68 26" className="shrink-0">
                <rect x="1" y="1" width="66" height="24" rx="2" fill="#2A2F2D" stroke="#111312" strokeWidth="1.2" />
                {/* Moving Magnetic Tape Ribbon */}
                <path
                  className={`tape-ribbon-moving ${!isDeckPlaying ? 'tape-ribbon-paused' : ''}`}
                  d="M16 5 H52"
                  stroke="#D4685C"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                {/* Left Spinning Reel */}
                <g className={`vcr-reel reel-spinning ${!isDeckPlaying ? 'reel-paused' : ''}`}>
                  <circle
                    cx="16"
                    cy="14"
                    r="6.5"
                    fill="#EAE5DC"
                    stroke="#141716"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                  />
                  <circle cx="16" cy="14" r="2.2" fill="#2A2F2D" />
                </g>
                {/* Center Tape Window */}
                <rect x="25" y="6" width="18" height="15" rx="1" fill="#141716" stroke="#585F5C" strokeWidth="0.8" />
                <line x1="28" y1="13.5" x2="40" y2="13.5" stroke="#E5A93C" strokeWidth="1.2" strokeDasharray="2 2" />
                {/* Right Spinning Reel */}
                <g className={`vcr-reel reel-spinning ${!isDeckPlaying ? 'reel-paused' : ''}`}>
                  <circle
                    cx="52"
                    cy="14"
                    r="6.5"
                    fill="#EAE5DC"
                    stroke="#141716"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                  />
                  <circle cx="52" cy="14" r="2.2" fill="#2A2F2D" />
                </g>
              </svg>
              <div className="flex flex-col leading-none pr-1">
                <span className="font-mono-tech text-[9px] text-[#8E9A94] tracking-widest flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4685C] animate-pulse"></span>
                  <span>DECK ACTIVE</span>
                </span>
                <span id="vhs-section-badge" className="font-mono-tech text-xs text-[#E5A93C] tracking-wider mt-0.5">
                  {activeTape.code}
                </span>
              </div>
            </div>

            <h3 id="vhs-section-title" className="font-mono-tech text-base sm:text-lg tracking-widest uppercase">
              {activeTape.short}
            </h3>
          </div>
        </div>

        {/* Right: Compact Short-Name Tape Tabs (SKILLS -> EXPERIENCE -> EDUCATION -> PROJECTS -> AWARDS) */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono-tech text-xs" role="tablist" aria-label="VHS Tape Categories">
          {VHS_TAPES.map((tape, idx) => {
            const isActive = idx === currentTapeIndex;
            return (
              <button
                key={tape.id}
                onClick={() => onSelectTape(idx, false)}
                data-tape-tab={idx}
                role="tab"
                aria-selected={isActive}
                className={
                  isActive
                    ? 'vhs-tab-btn px-3 py-1 border border-[var(--rule-color)] bg-[#D4685C] text-white transition-colors'
                    : 'vhs-tab-btn px-3 py-1 border border-[var(--rule-color)] bg-[var(--bg-paper)] text-[var(--ink)] hover:border-[#D4685C] transition-colors'
                }
              >
                {tape.short}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Editorial Grid Container (Populated by VHS Player) */}
      <div id="vhs-deck-content" className="py-6">
        {/* TAPE 01: SKILLS */}
        {currentTapeIndex === 0 && (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-[var(--rule-color)] pb-3">
              <div className="font-mono-tech text-xs text-[var(--ink-muted)]">
                CORE COMPETENCIES: {CORE_COMPETENCIES_TEXT}
              </div>
              <div className="font-mono-tech text-[11px] text-[#E5A93C]">
                SPOKEN: {SPOKEN_LANGUAGES_TEXT}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CV_SKILLS.map((group) => (
                <div
                  key={group.category}
                  className="skill-card border border-[var(--rule-color)] bg-[var(--bg-panel)] p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono-tech text-xs tracking-wider text-[#D4685C] mb-1">{group.category}</div>
                    <p className="text-xs text-[var(--ink-muted)] mb-4 font-mono-tech">{group.subtitle}</p>
                    <div className="skill-logo-grid flex flex-wrap gap-2.5">
                      {group.items.map((item) => (
                        <div
                          key={item.name}
                          className="skill-logo-tile w-12 h-12 flex items-center justify-center p-2 cursor-pointer"
                          data-tooltip={item.name}
                          aria-label={item.name}
                        >
                          {item.icon ? (
                            <img
                              src={item.icon}
                              alt={item.name}
                              loading="lazy"
                              decoding="async"
                              className="w-7 h-7 object-contain pointer-events-none"
                              onError={(e) => {
                                const img = e.currentTarget as HTMLImageElement;
                                img.style.display = 'none';
                                const fallback = img.nextElementSibling as HTMLElement | null;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                          ) : (
                            renderSkillSvg(item.svgType)
                          )}
                          {item.icon && (
                            <span
                              style={{ display: 'none' }}
                              className="font-mono-tech text-[10px] font-bold text-[#D4685C] items-center justify-center select-none pointer-events-none"
                            >
                              {item.name.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* TAPE 02: EXPERIENCE */}
        {currentTapeIndex === 1 && (
          <div className="kozoriz-timeline space-y-5 max-w-4xl">
            {CV_EXPERIENCE.map((exp) => (
              <article
                key={`${exp.company}-${exp.role}`}
                className="kozoriz-item border border-[var(--rule-color)] bg-[var(--bg-panel)] p-5"
              >
                <div className="kozoriz-logo-badge" title={exp.company}>
                  {renderExperienceLogo(exp.logoType)}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-dashed border-[var(--rule-color)] pb-2.5 mb-3">
                  <div>
                    <h4 className="text-xl font-medium tracking-tight">{exp.role}</h4>
                    <div className="font-mono-tech text-xs text-[#D4685C]">
                      {exp.company}
                      {exp.link && (
                        <>
                          {' • '}
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-[var(--ink)]"
                          >
                            norva.space ↗
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="font-mono-tech text-xs text-[var(--ink-muted)] sm:text-right shrink-0">
                    <div>{exp.period}</div>
                    <div className="text-[11px]">{exp.location}</div>
                  </div>
                </div>
                <ul className="space-y-1.5 text-base leading-relaxed list-disc pl-5">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}

        {/* TAPE 03: EDUCATION */}
        {currentTapeIndex === 2 && (
          <div className="kozoriz-timeline space-y-5 max-w-4xl">
            {CV_EDUCATION.map((edu) => (
              <article
                key={edu.institution}
                className="kozoriz-item border border-[var(--rule-color)] bg-[var(--bg-panel)] p-5"
              >
                <div className="kozoriz-logo-badge" title={edu.institution}>
                  {renderEducationLogo(edu.logoType)}
                </div>
                <div
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 ${
                    edu.bullets.length ? 'border-b border-dashed border-[var(--rule-color)] pb-2.5 mb-3' : ''
                  }`}
                >
                  <div>
                    <h4 className="text-xl font-medium tracking-tight">{edu.degree}</h4>
                    <div className="font-mono-tech text-xs text-[#7C95A6]">{edu.institution}</div>
                  </div>
                  <div className="font-mono-tech text-xs text-[var(--ink-muted)] sm:text-right shrink-0">
                    <div>{edu.period}</div>
                    <div className="text-[11px]">{edu.location}</div>
                  </div>
                </div>
                {edu.bullets.length > 0 && (
                  <ul className="space-y-1.5 text-base leading-relaxed list-disc pl-5">
                    {edu.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}

        {/* TAPE 04: PROJECTS */}
        {currentTapeIndex === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CV_PROJECTS.map((proj) => (
              <article
                key={proj.title}
                className="border border-[var(--rule-color)] bg-[var(--bg-panel)] flex flex-col justify-between"
              >
                <div>
                  {renderProjectArt(proj.artType)}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono-tech text-[10px] px-2 py-0.5 border border-[var(--rule-color)] bg-[var(--bg-paper)] text-[#D4685C]">
                        {proj.badge}
                      </span>
                    </div>
                    <h4 className="text-xl font-medium mb-3">{proj.title}</h4>
                    <ul className="space-y-1.5 text-sm sm:text-base leading-relaxed list-disc pl-5 mb-4">
                      {proj.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-3 border-t border-dashed border-[var(--rule-color)]">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono-tech text-[11px] px-2 py-0.5 border border-[var(--rule-color)] bg-[var(--bg-paper)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-[#D4685C] hover:underline"
                  >
                    <span>{proj.urlLabel}</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* TAPE 05: AWARDS */}
        {currentTapeIndex === 4 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CV_AWARDS.map((aw) => (
              <article
                key={`${aw.title}-${aw.year}`}
                className="border border-[var(--rule-color)] bg-[var(--bg-panel)] p-5 flex items-start gap-4"
              >
                <div className="w-16 h-16 shrink-0 border border-[var(--rule-color)] bg-[var(--bg-paper)] flex items-center justify-center">
                  <svg viewBox="0 0 48 48" className="w-10 h-10">
                    <path
                      d="M14 10 H34 V20 C34 26, 24 30, 24 30 C24 30, 14 26, 14 20 Z"
                      fill="#E5A93C"
                      stroke="#1E201F"
                      strokeWidth="2.2"
                    />
                    <path d="M20 30 H28 V36 H20 Z" fill="#7C95A6" stroke="#1E201F" strokeWidth="2" />
                    <rect x="14" y="36" width="20" height="5" fill="#D4685C" stroke="#1E201F" strokeWidth="2" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono-tech text-[10px] text-[#D4685C] uppercase">{aw.badge}</span>
                    <span className="font-mono-tech text-xs px-2 py-0.5 border border-[var(--rule-color)] bg-[var(--bg-paper)]">
                      {aw.year}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium leading-snug">{aw.title}</h4>
                  <p className="font-mono-tech text-xs text-[var(--ink-muted)] mt-1">{aw.org}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

