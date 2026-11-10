import React, { useRef, useState } from 'react';
import { useEyeTracking } from '../hooks/useEyeTracking';
import { downloadPrintableCV } from '../data/cvData';

interface HeroSectionProps {
  onSelectTape: (index: number, scrollToDeck: boolean) => void;
  onShowToast: (msg: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTape, onShowToast }) => {
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const { leftX, leftY, rightX, rightY } = useEyeTracking(avatarRef);
  const [isSketching, setIsSketching] = useState(false);

  const handleAvatarClick = () => {
    setIsSketching(true);
    setTimeout(() => setIsSketching(false), 320);
    onShowToast('NAHID IS SKETCHING SYSTEM ARCHITECTURES...');
  };

  const handleDownloadCV = () => {
    downloadPrintableCV(() => {
      onShowToast('CV PDF DOWNLOADED!');
    });
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-7 md:gap-10 items-center py-3 relative">
      {/* Left Column: Hand-Drawn Comic Portrait of Sahriar Nahid Drawing with Stylus */}
      <div className="md:col-span-4 flex flex-col items-center">
        <div
          id="avatar-container"
          ref={avatarRef}
          onClick={handleAvatarClick}
          className="avatar-ring relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#E8E2D6] overflow-hidden flex items-end justify-center select-none cursor-pointer group"
          title="Move mouse to track eyes • Click to see Nahid sketch!"
        >
          <svg className="w-full h-full" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="38" cy="62" r="1.5" fill="#7D7870" opacity="0.45" />
            <circle cx="206" cy="68" r="2" fill="#7D7870" opacity="0.35" />
            <circle cx="48" cy="140" r="1.3" fill="#7D7870" opacity="0.4" />

            {/* Studio Chair Backrest */}
            <path
              d="M28 152 C26 175, 28 210, 32 245 L58 245 L58 148 C42 146, 32 148, 28 152 Z"
              fill="#9E6252"
              stroke="#232625"
              strokeWidth="2.5"
            />

            {/* Olive-Brown Jacket & Shoulders */}
            <path
              d="M40 242 C44 176, 68 150, 96 142 L156 142 C182 150, 204 176, 210 242 Z"
              fill="#7D7565"
              stroke="#232625"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />

            {/* Inner Dark Crewneck Tee */}
            <path d="M100 144 L125 220 L150 144 Z" fill="#3B3A36" stroke="#232625" strokeWidth="2.5" />

            {/* Jacket Collar & Lapel Stitch Lines */}
            <path
              d="M98 140 L76 168 L94 178 L108 228"
              fill="#696254"
              stroke="#232625"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M152 140 L174 168 L156 178 L142 228"
              fill="#696254"
              stroke="#232625"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Neck & Chin Shadow */}
            <path
              d="M108 120 L108 148 C108 156, 142 156, 142 148 L142 120 Z"
              fill="#C69C72"
              stroke="#232625"
              strokeWidth="2.5"
            />
            <path d="M110 126 Q125 137 140 128 L140 136 Q125 144 110 134 Z" fill="#9E7852" />

            {/* Ears */}
            <path
              d="M82 88 C73 88, 73 108, 84 109"
              fill="#C69C72"
              stroke="#232625"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M168 88 C177 88, 177 108, 166 109"
              fill="#C69C72"
              stroke="#232625"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Head / Face */}
            <path
              d="M85 65 C83 109, 92 132, 125 133 C158 132, 167 109, 165 65 Z"
              fill="#C69C72"
              stroke="#232625"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />

            {/* Expressive Dark Eyebrows */}
            <path d="M95 77 Q106 72 115 77" stroke="#232625" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M133 76 Q144 71 154 76" stroke="#232625" strokeWidth="3.4" strokeLinecap="round" />

            {/* Interactive Eyes Tracking Cursor */}
            <g id="eyes-group">
              <ellipse cx="106" cy="89" rx="8.5" ry="7" fill="#F7F4EE" stroke="#232625" strokeWidth="2.2" />
              <circle className="eye-pupil" cx={leftX} cy={leftY} r="3.4" fill="#232625" />
              <ellipse cx="143" cy="89" rx="8.5" ry="7" fill="#F7F4EE" stroke="#232625" strokeWidth="2.2" />
              <circle className="eye-pupil" cx={rightX} cy={rightY} r="3.4" fill="#232625" />
            </g>

            {/* Subtle Nose & Warm Confident Smile */}
            <path
              d="M125 85 L128 101 L120 103"
              stroke="#232625"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="avatar-mouth"
              d="M112 114 Q126 120 139 112"
              stroke="#232625"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {/* Messy Stylized Dark Hair */}
            <path
              d="M81 86 C71 68, 77 42, 97 36 L93 28 C110 26, 123 32, 130 26 L128 19 C149 22, 167 34, 179 46 L169 50 C181 58, 179 76, 168 87 C166 70, 157 61, 146 58 L150 67 C135 60, 121 62, 111 70 L113 60 C97 64, 87 74, 81 86 Z"
              fill="#373A38"
              stroke="#232625"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />

            {/* Drafting Desk Surface + Sketchpad + Hands Holding Stylus Pen */}
            <polygon points="90,235 155,212 225,228 165,250" fill="#F7F4EE" stroke="#232625" strokeWidth="2.2" />
            <line x1="125" y1="232" x2="175" y2="222" stroke="#7C95A6" strokeWidth="1.8" />
            <ellipse cx="116" cy="222" rx="16" ry="11" fill="#C69C72" stroke="#232625" strokeWidth="2.4" />
            <g
              id="drawing-hand"
              className="transition-transform duration-300"
              style={{ transform: isSketching ? 'rotate(-8deg) translateY(-3px)' : '' }}
            >
              <line x1="162" y1="226" x2="182" y2="178" stroke="#232625" strokeWidth="5" strokeLinecap="round" />
              <line x1="162" y1="226" x2="182" y2="178" stroke="#D4685C" strokeWidth="2.2" strokeLinecap="round" />
              <ellipse cx="174" cy="212" rx="15" ry="11" fill="#C69C72" stroke="#232625" strokeWidth="2.4" />
            </g>
          </svg>
        </div>
      </div>

      {/* Right Column: "SAHRIAR NAHID" + Editorial Bio + Subtle Doodle & CV Download Button */}
      <div className="md:col-span-8 text-center md:text-left relative">
        {/* 3D Extruded Block Title: SAHRIAR NAHID (No Location/Role Subtitle Above) */}
        <h1 className="retro-title text-4xl sm:text-5xl lg:text-[58px] mb-4 select-none" aria-label="Sahriar Nahid">
          <span className="inline-block mr-3">
            <span className="letter-chip c-coral">S</span>
            <span className="letter-chip c-coral">A</span>
            <span className="letter-chip c-blue">H</span>
            <span className="letter-chip c-blue">R</span>
            <span className="letter-chip c-cream">I</span>
            <span className="letter-chip c-blue">A</span>
            <span className="letter-chip c-cream">R</span>
          </span>
          <span className="inline-block">
            <span className="letter-chip c-coral">N</span>
            <span className="letter-chip c-cream">A</span>
            <span className="letter-chip c-blue">H</span>
            <span className="letter-chip c-blue">I</span>
            <span className="letter-chip c-blue">D</span>
          </span>
        </h1>

        {/* Shortened, Casual & Straight-to-the-Point Editorial Bio */}
        <p className="text-lg sm:text-xl lg:text-[23px] leading-[1.52] font-normal tracking-[-0.01em] max-w-3xl">
          Hey, I&apos;m Nahid — an{' '}
          <mark className="marker-highlight" onClick={() => onSelectTape(0, true)}>
            AI engineer
          </mark>{' '}
          and full-stack builder crafting{' '}
          <mark className="marker-highlight" onClick={() => onSelectTape(3, true)}>
            LLM-powered products
          </mark>{' '}
          and agent workflows end to end. I shipped{' '}
          <mark className="marker-highlight" onClick={() => onSelectTape(3, true)}>
            ModelVerse
          </mark>{' '}
          with LangChain &amp; LangGraph, run my dev studio{' '}
          <mark className="marker-highlight" onClick={() => onSelectTape(1, true)}>
            Grey Devs
          </mark>
          , and study CS at the{' '}
          <mark className="marker-highlight" onClick={() => onSelectTape(2, true)}>
            University of Debrecen
          </mark>
          .
        </p>

        {/* Clean Subtle Hand-Drawn Doodle + Download CV Button ONLY */}
        <div className="mt-5 pt-3.5 border-t border-dashed border-[var(--rule-color)] flex flex-wrap items-center justify-center md:justify-start gap-4">
          <div className="flex items-center gap-2 font-hand text-xl sm:text-2xl text-[var(--note-color)] select-none">
            <span>Grab my full resume sheet here ↘</span>
          </div>

          {/* Mechanical Download CV Button */}
          <button
            onClick={handleDownloadCV}
            className="vcr-btn font-mono-tech text-xs px-4 py-1.5 flex items-center gap-2 tracking-wider"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 3 V13 M10 13 L6 9 M10 13 L14 9 M4 16 H16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>DOWNLOAD CV (PDF)</span>
          </button>
        </div>
      </div>
    </section>
  );
};

