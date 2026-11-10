import React, { useState, useRef, useEffect, useCallback } from 'react';
import { VHS_TAPES } from './data/cvData';
import { VcrHeader } from './components/VcrHeader';
import { HeroSection } from './components/HeroSection';
import { ToyBoxSection } from './components/ToyBoxSection';
import { VhsDeckSection } from './components/VhsDeckSection';
import { ArcadeModal } from './components/ArcadeModal';
import { SpotifyModal } from './components/SpotifyModal';
import { JournalModal } from './components/JournalModal';
import { useSynthBassline } from './hooks/useSynthBassline';
import { useStaticNoise } from './hooks/useStaticNoise';

const INITIAL_STATUS = 'NOW PLAYING: TAPE 00 — INITIALIZING WORKSPACE';

export const App: React.FC = () => {
  const [currentTapeIndex, setCurrentTapeIndex] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>(INITIAL_STATUS);
  const [isDeckPlaying, setIsDeckPlaying] = useState<boolean>(true);
  const [isCrtDark, setIsCrtDark] = useState<boolean>(true);
  const [isStaticFlashing, setIsStaticFlashing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isArcadeOpen, setIsArcadeOpen] = useState<boolean>(false);
  const [isSpotifyOpen, setIsSpotifyOpen] = useState<boolean>(false);
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);

  const staticFlashRef = useRef<HTMLDivElement | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const flashTimerRef = useRef<number | null>(null);

  const { isSynthPlaying, toggleSynthBassline } = useSynthBassline();
  useStaticNoise(staticFlashRef);

  const triggerStaticFlash = useCallback(() => {
    setIsStaticFlashing(true);
    if (flashTimerRef.current !== null) {
      window.clearTimeout(flashTimerRef.current);
    }
    flashTimerRef.current = window.setTimeout(() => {
      setIsStaticFlashing(false);
    }, 140);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  }, []);

  const selectVHSTape = useCallback(
    (index: number, scrollToDeck: boolean = false) => {
      const tape = VHS_TAPES[index];
      setCurrentTapeIndex(index);
      setIsDeckPlaying(true);
      setStatusText(tape.status);
      triggerStaticFlash();

      if (scrollToDeck) {
        const section = document.getElementById('vhs-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
    [triggerStaticFlash]
  );

  const handleTopPlayClick = useCallback(() => {
    selectVHSTape(currentTapeIndex, true);
  }, [currentTapeIndex, selectVHSTape]);

  const cycleVHSTape = useCallback(
    (scrollToDeck: boolean = false) => {
      const nextIndex = (currentTapeIndex + 1) % VHS_TAPES.length;
      selectVHSTape(nextIndex, scrollToDeck);
    },
    [currentTapeIndex, selectVHSTape]
  );

  const pauseAndReturnHome = useCallback(() => {
    setIsDeckPlaying(false);
    setStatusText(INITIAL_STATUS);
    triggerStaticFlash();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('DECK PAUSED — RETURNED TO WORKSPACE');
  }, [triggerStaticFlash, showToast]);

  const toggleCRTMode = useCallback(() => {
    document.body.classList.toggle('crt-mode');
    const isDark = document.body.classList.contains('crt-mode');
    setIsCrtDark(isDark);
    triggerStaticFlash();
  }, [triggerStaticFlash]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setIsArcadeOpen(false);
        setIsSpotifyOpen(false);
        setIsJournalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Zero-KB Inline SVG Paper & Film Grain Texture Overlay */}
      <svg
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.11] mix-blend-overlay"
        aria-hidden="true"
      >
        <filter id="editorial-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#editorial-grain)" />
      </svg>

      {/* 140ms CRT Channel Switch Static Flash */}
      <div id="static-flash" ref={staticFlashRef} className={isStaticFlashing ? 'active' : ''} />

      {/* 1. TOP MECHANICAL VHS HEADER BAR (NON-STICKY) */}
      <VcrHeader
        statusText={statusText}
        isDeckPlaying={isDeckPlaying}
        isCrtDark={isCrtDark}
        onPlayClick={handleTopPlayClick}
        onToggleTheme={toggleCRTMode}
      />

      {/* MAIN HELENA-ZHANG EDITORIAL CONTAINER */}
      <main className="mx-auto max-w-6xl px-4 sm:px-8 pt-7 pb-12">
        {/* HERO SECTION */}
        <HeroSection onSelectTape={selectVHSTape} onShowToast={showToast} />

        {/* DOUBLE-HAIRLINE NEWSPAPER DIVIDER */}
        <div className="my-5">
          <hr className="double-rule-hr" />
        </div>

        {/* 2. THE TOY BOX */}
        <ToyBoxSection
          currentTape={VHS_TAPES[currentTapeIndex]}
          isSynthPlaying={isSynthPlaying}
          onOpenArcade={() => setIsArcadeOpen(true)}
          onCycleTapeAndScroll={() => cycleVHSTape(true)}
          onOpenSpotify={() => setIsSpotifyOpen(true)}
          onOpenJournal={() => setIsJournalOpen(true)}
        />

        {/* 3. DEDICATED VHS TAPE DECK SECTION */}
        <VhsDeckSection
          currentTapeIndex={currentTapeIndex}
          isDeckPlaying={isDeckPlaying}
          onSelectTape={selectVHSTape}
          onCycleNextTape={() => cycleVHSTape(false)}
          onPauseAndReturnHome={pauseAndReturnHome}
        />

        {/* CLEAN MINIMAL COPYRIGHT FOOTER */}
        <div className="mt-8">
          <hr className="double-rule-hr mb-4" />
          <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono-tech text-xs text-[var(--ink-muted)] py-1">
            <div>© 2026 Sahriar Rahman Nahid. All rights reserved.</div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#D4685C] transition-colors tracking-widest uppercase"
            >
              [REWIND TO TOP ▲]
            </button>
          </footer>
        </div>
      </main>

      {/* TOAST MESSAGE NOTIFICATION */}
      {toastMessage && (
        <div
          id="toast-box"
          className="fixed bottom-5 right-5 z-[100] border border-[var(--rule-color)] bg-[var(--bg-panel)] px-4 py-2.5 font-mono-tech text-xs text-[var(--ink)] shadow-lg"
        >
          <span className="text-[#D4685C] mr-1.5">⚡</span>
          <span id="toast-text">{toastMessage}</span>
        </div>
      )}

      {/* THREE INTERACTIVE MODALS */}
      <ArcadeModal isOpen={isArcadeOpen} onClose={() => setIsArcadeOpen(false)} />
      <SpotifyModal
        isOpen={isSpotifyOpen}
        isSynthPlaying={isSynthPlaying}
        onToggleSynth={toggleSynthBassline}
        onClose={() => setIsSpotifyOpen(false)}
      />
      <JournalModal isOpen={isJournalOpen} onClose={() => setIsJournalOpen(false)} />
    </>
  );
};

export default App;
