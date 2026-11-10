import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type GameMode = 'runner' | 'pong';

interface GameState {
  mode: GameMode;
  score: number;
  bestRunner: number;
  bestPong: number;
  isGameOver: boolean;
  // Bug Runner state
  playerY: number;
  playerVy: number;
  bugX: number;
  bugSpeed: number;
  bugScored: boolean;
  clouds: { x: number; y: number; w: number }[];
  // Space Pong state
  paddleY: number;
  aiPaddleY: number;
  ballX: number;
  ballY: number;
  ballVx: number;
  ballVy: number;
  keysPressed: Record<string, boolean>;
}

const GROUND_Y = 216;
const PLAYER_X = 68;
const PLAYER_W = 24;
const PLAYER_H = 28;
const PLAYER_GROUND_Y = GROUND_Y - PLAYER_H; // 188
const BUG_W = 18;
const BUG_H = 16;
const BUG_Y = GROUND_Y - BUG_H; // 200

const PADDLE_H = 74;
const PADDLE_W = 10;
const LEFT_PADDLE_X = 20;
const RIGHT_PADDLE_X = 490;
const BALL_SIZE = 10;

export const ArcadeModal: React.FC<ArcadeModalProps> = ({ isOpen, onClose }) => {
  const [activeGame, setActiveGame] = useState<GameMode>('runner');
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const stateRef = useRef<GameState>({
    mode: 'runner',
    score: 0,
    bestRunner: 0,
    bestPong: 0,
    isGameOver: false,
    playerY: PLAYER_GROUND_Y,
    playerVy: 0,
    bugX: 520,
    bugSpeed: 2.6,
    bugScored: false,
    clouds: [
      { x: 90, y: 42, w: 36 },
      { x: 260, y: 28, w: 48 },
      { x: 420, y: 54, w: 32 },
    ],
    paddleY: 93,
    aiPaddleY: 93,
    ballX: 260,
    ballY: 130,
    ballVx: 2.5,
    ballVy: 1.6,
    keysPressed: {},
  });

  const resetCurrentGame = useCallback((modeOverride?: GameMode) => {
    const s = stateRef.current;
    const mode = modeOverride ?? s.mode;
    s.mode = mode;
    s.score = 0;
    s.isGameOver = false;

    // Reset Runner (relaxed speed)
    s.playerY = PLAYER_GROUND_Y;
    s.playerVy = 0;
    s.bugX = 520;
    s.bugSpeed = 2.6;
    s.bugScored = false;

    // Reset Pong (relaxed speed)
    s.paddleY = 93;
    s.aiPaddleY = 93;
    s.ballX = 260;
    s.ballY = 130;
    s.ballVx = 2.5;
    s.ballVy = (Math.random() > 0.5 ? 1 : -1) * 1.6;

    setScore(0);
    setIsGameOver(false);
    setBestScore(mode === 'runner' ? s.bestRunner : s.bestPong);
  }, []);

  const handleSwitchGame = (mode: GameMode, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e?.currentTarget) {
      e.currentTarget.blur();
    }
    setActiveGame(mode);
    resetCurrentGame(mode);
  };

  const handleManualReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e?.currentTarget) {
      e.currentTarget.blur();
    }
    resetCurrentGame();
  };

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ensure clean start when modal opens
    resetCurrentGame(stateRef.current.mode);

    const triggerJumpOrRestart = () => {
      const s = stateRef.current;
      if (s.isGameOver) {
        resetCurrentGame();
        return;
      }
      if (s.mode === 'runner' && s.playerY >= PLAYER_GROUND_Y - 2) {
        s.playerVy = -9.6;
      }
    };

    const handleCanvasClick = () => {
      triggerJumpOrRestart();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const s = stateRef.current;
      if (s.mode !== 'pong' || s.isGameOver) return;
      const r = canvas.getBoundingClientRect();
      const relY = ((e.clientY - r.top) / r.height) * 260;
      s.paddleY = Math.max(8, Math.min(260 - PADDLE_H - 8, relY - PADDLE_H / 2));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const s = stateRef.current;
      s.keysPressed[e.code] = true;

      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        if (s.mode === 'runner' || s.isGameOver) {
          e.preventDefault();
          triggerJumpOrRestart();
        }
      }
      if (s.mode === 'pong' && (e.code === 'ArrowUp' || e.code === 'ArrowDown')) {
        e.preventDefault();
      }
      if (e.code === 'KeyR') {
        e.preventDefault();
        resetCurrentGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      stateRef.current.keysPressed[e.code] = false;
    };

    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animId = 0;

    const loop = () => {
      const s = stateRef.current;

      // Clear background
      ctx.fillStyle = '#869B94';
      ctx.fillRect(0, 0, 520, 260);

      if (s.mode === 'runner') {
        if (!s.isGameOver) {
          // Clouds drift gently
          for (const c of s.clouds) {
            c.x -= 0.35;
            if (c.x + c.w < 0) c.x = 530;
          }

          // Update Runner physics (floatier, easier jump)
          s.playerY += s.playerVy;
          s.playerVy += 0.36;
          if (s.playerY >= PLAYER_GROUND_Y) {
            s.playerY = PLAYER_GROUND_Y;
            s.playerVy = 0;
          }

          // Move Bug
          s.bugX -= s.bugSpeed;

          // Score when bug passes player
          if (!s.bugScored && s.bugX + BUG_W < PLAYER_X) {
            s.bugScored = true;
            s.score += 1;
            setScore(s.score);
            if (s.score > s.bestRunner) {
              s.bestRunner = s.score;
              setBestScore(s.bestRunner);
            }
            // Very gentle speed progression
            s.bugSpeed = Math.min(4.2, 2.6 + s.score * 0.06);
          }

          // Respawn bug when off-screen left
          if (s.bugX < -BUG_W - 10) {
            s.bugX = 520 + Math.floor(Math.random() * 110);
            s.bugScored = false;
          }

          // Collision Detection (with generous 5px forgiveness)
          const pLeft = PLAYER_X + 5;
          const pRight = PLAYER_X + PLAYER_W - 5;
          const pBottom = s.playerY + PLAYER_H - 4;
          const bLeft = s.bugX + 3;
          const bRight = s.bugX + BUG_W - 3;
          const bTop = BUG_Y + 4;

          if (pRight > bLeft && pLeft < bRight && pBottom > bTop) {
            s.isGameOver = true;
            setIsGameOver(true);
          }
        }

        // Draw retro clouds
        ctx.fillStyle = 'rgba(244, 240, 234, 0.35)';
        for (const c of s.clouds) {
          ctx.fillRect(c.x, c.y, c.w, 8);
          ctx.fillRect(c.x + 6, c.y - 5, c.w - 12, 5);
        }

        // Draw Ground Line
        ctx.fillStyle = '#232625';
        ctx.fillRect(0, GROUND_Y, 520, 3);

        // Draw Player (8-Bit Runner Character)
        ctx.fillStyle = '#232625';
        ctx.fillRect(PLAYER_X, s.playerY, PLAYER_W, PLAYER_H);
        // Visor/Eyes
        ctx.fillStyle = '#F4F0EA';
        ctx.fillRect(PLAYER_X + 14, s.playerY + 6, 7, 5);

        // Draw Bug Obstacle
        ctx.fillStyle = '#D4685C';
        ctx.fillRect(s.bugX, BUG_Y, BUG_W, BUG_H);
        ctx.fillStyle = '#232625';
        ctx.fillRect(s.bugX + 3, BUG_Y + 4, 3, 3);
        ctx.fillRect(s.bugX + 3, BUG_Y - 3, 2, 3);
        ctx.fillRect(s.bugX + 12, BUG_Y - 3, 2, 3);
      } else {
        // SPACE PONG MODE (Easier & Smoother)
        if (!s.isGameOver) {
          // Keyboard paddle control
          if (s.keysPressed['ArrowUp'] || s.keysPressed['KeyW']) {
            s.paddleY = Math.max(8, s.paddleY - 4.2);
          }
          if (s.keysPressed['ArrowDown'] || s.keysPressed['KeyS']) {
            s.paddleY = Math.min(260 - PADDLE_H - 8, s.paddleY + 4.2);
          }

          // Move Ball
          s.ballX += s.ballVx;
          s.ballY += s.ballVy;

          // Top / Bottom wall bounce
          if (s.ballY - BALL_SIZE / 2 <= 6) {
            s.ballY = 6 + BALL_SIZE / 2;
            s.ballVy = Math.abs(s.ballVy);
          } else if (s.ballY + BALL_SIZE / 2 >= 254) {
            s.ballY = 254 - BALL_SIZE / 2;
            s.ballVy = -Math.abs(s.ballVy);
          }

          // AI Paddle Tracking (slower & easier to beat)
          const aiCenter = s.aiPaddleY + PADDLE_H / 2;
          const aiSpeed = 2.0;
          if (aiCenter < s.ballY - 8) {
            s.aiPaddleY = Math.min(260 - PADDLE_H - 8, s.aiPaddleY + aiSpeed);
          } else if (aiCenter > s.ballY + 8) {
            s.aiPaddleY = Math.max(8, s.aiPaddleY - aiSpeed);
          }

          // Left (Player) Paddle Collision
          if (
            s.ballVx < 0 &&
            s.ballX - BALL_SIZE / 2 <= LEFT_PADDLE_X + PADDLE_W &&
            s.ballX + BALL_SIZE / 2 >= LEFT_PADDLE_X &&
            s.ballY + BALL_SIZE / 2 >= s.paddleY &&
            s.ballY - BALL_SIZE / 2 <= s.paddleY + PADDLE_H
          ) {
            s.ballX = LEFT_PADDLE_X + PADDLE_W + BALL_SIZE / 2;
            const hitOffset = (s.ballY - (s.paddleY + PADDLE_H / 2)) / (PADDLE_H / 2);
            s.ballVx = Math.min(4.2, Math.abs(s.ballVx) + 0.1);
            s.ballVy = hitOffset * 2.6;

            s.score += 1;
            setScore(s.score);
            if (s.score > s.bestPong) {
              s.bestPong = s.score;
              setBestScore(s.bestPong);
            }
          }

          // Right (AI) Paddle Collision
          if (
            s.ballVx > 0 &&
            s.ballX + BALL_SIZE / 2 >= RIGHT_PADDLE_X &&
            s.ballX - BALL_SIZE / 2 <= RIGHT_PADDLE_X + PADDLE_W &&
            s.ballY + BALL_SIZE / 2 >= s.aiPaddleY &&
            s.ballY - BALL_SIZE / 2 <= s.aiPaddleY + PADDLE_H
          ) {
            s.ballX = RIGHT_PADDLE_X - BALL_SIZE / 2;
            const hitOffset = (s.ballY - (s.aiPaddleY + PADDLE_H / 2)) / (PADDLE_H / 2);
            s.ballVx = -Math.abs(s.ballVx);
            s.ballVy = hitOffset * 2.4;
          }

          // Player scores past AI on the right (+3 bonus points, re-serve)
          if (s.ballX > 520) {
            s.score += 3;
            setScore(s.score);
            if (s.score > s.bestPong) {
              s.bestPong = s.score;
              setBestScore(s.bestPong);
            }
            s.ballX = 260;
            s.ballY = 130;
            s.ballVx = -2.6;
            s.ballVy = (Math.random() > 0.5 ? 1 : -1) * 1.6;
          }

          // Ball missed by Player on the left -> Game Over
          if (s.ballX < 0) {
            s.isGameOver = true;
            setIsGameOver(true);
          }
        }

        // Draw Center Net
        ctx.fillStyle = 'rgba(35, 38, 37, 0.35)';
        for (let y = 10; y < 250; y += 16) {
          ctx.fillRect(258, y, 4, 9);
        }

        // Draw Player Left Paddle & AI Right Paddle
        ctx.fillStyle = '#232625';
        ctx.fillRect(LEFT_PADDLE_X, s.paddleY, PADDLE_W, PADDLE_H);
        ctx.fillRect(RIGHT_PADDLE_X, s.aiPaddleY, PADDLE_W, PADDLE_H);

        // Draw Ball
        ctx.fillStyle = '#D4685C';
        ctx.fillRect(s.ballX - BALL_SIZE / 2, s.ballY - BALL_SIZE / 2, BALL_SIZE, BALL_SIZE);
      }

      // Draw In-Screen Score HUD
      ctx.fillStyle = '#1E201F';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      const currentBest = s.mode === 'runner' ? s.bestRunner : s.bestPong;
      ctx.fillText(`SCORE: ${String(s.score).padStart(4, '0')}`, 14, 22);
      ctx.fillText(`BEST: ${String(currentBest).padStart(4, '0')}`, 420, 22);

      // Draw Game Over Overlay Banner if Crashed / Ball Missed
      if (s.isGameOver) {
        ctx.fillStyle = 'rgba(20, 24, 22, 0.82)';
        ctx.fillRect(70, 78, 380, 96);
        ctx.strokeStyle = '#D4685C';
        ctx.lineWidth = 2;
        ctx.strokeRect(70, 78, 380, 96);

        ctx.fillStyle = '#D4685C';
        ctx.font = 'bold 16px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', 260, 110);

        ctx.fillStyle = '#EAE5DC';
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.fillText(`FINAL SCORE: ${String(s.score).padStart(4, '0')}`, 260, 134);

        ctx.fillStyle = '#E5A93C';
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillText('CLICK CANVAS OR PRESS [SPACE] TO RESET', 260, 156);
        ctx.textAlign = 'left';
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animId);
    };
  }, [isOpen, resetCurrentGame]);

  if (!isOpen) return null;

  return (
    <div
      id="arcade-modal"
      role="dialog"
      aria-modal="true"
      aria-label="8-Bit CRT Game Deck"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl border border-[var(--rule-color)] bg-[var(--bg-paper)] p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule-color)] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#D4685C] text-white font-mono-tech text-[11px]">ARCADE.EXE</span>
            <h3 className="font-mono-tech text-sm sm:text-base uppercase tracking-wider">8-BIT CRT GAME DECK</h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={(e) => handleSwitchGame('runner', e)}
              id="btn-game-runner"
              className={`vcr-btn font-mono-tech text-xs px-2.5 py-1 ${activeGame === 'runner' ? 'playing' : ''}`}
            >
              01: BUG RUNNER
            </button>
            <button
              onClick={(e) => handleSwitchGame('pong', e)}
              id="btn-game-pong"
              className={`vcr-btn font-mono-tech text-xs px-2.5 py-1 ${activeGame === 'pong' ? 'playing' : ''}`}
            >
              02: SPACE PONG
            </button>
            <button
              onClick={handleManualReset}
              id="btn-game-reset"
              className="vcr-btn font-mono-tech text-xs px-2.5 py-1"
              title="Reset Score & Restart Game (R)"
            >
              ↻ RESET
            </button>
            <button
              onClick={onClose}
              className="px-2.5 py-1 border border-[var(--rule-color)] font-mono-tech text-xs hover:bg-[#D4685C] hover:text-white transition-colors"
            >
              ✕ ESC
            </button>
          </div>
        </div>

        <div className="bg-[#141816] border border-[var(--rule-color)] p-3 flex flex-col items-center">
          <canvas
            id="modal-game-canvas"
            ref={canvasRef}
            width="520"
            height="260"
            className="w-full max-w-[520px] h-auto bg-[#869B94] border border-[#232625] cursor-pointer select-none"
          />
          <div className="w-full flex flex-wrap items-center justify-between gap-2 mt-3 font-mono-tech text-xs text-[#EAE5DC]">
            <span id="modal-game-instructions">
              {isGameOver
                ? 'GAME OVER — CLICK CANVAS, PRESS [SPACE] OR CLICK [↻ RESET]'
                : activeGame === 'runner'
                  ? 'CLICK CANVAS OR PRESS [SPACE / ↑ / W] TO JUMP OVER BUGS'
                  : 'MOVE MOUSE OR PRESS [↑ / ↓ / W / S] TO CONTROL LEFT PADDLE'}
            </span>
            <div className="flex items-center gap-4">
              <span id="modal-game-score" className="text-[#E5A93C]">
                SCORE: {String(score).padStart(4, '0')}
              </span>
              <span className="text-[#9BA8A1]">BEST: {String(bestScore).padStart(4, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
