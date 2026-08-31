import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Bug } from "lucide-react";
import { Shell } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";

export function WhackABug({ onBack }: { onBack: () => void }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeBugIndex, setActiveBugIndex] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setGameOver(false);
    nextBug();
  };

  const nextBug = useCallback(() => {
    const randomPos = Math.floor(Math.random() * 9);
    setActiveBugIndex(randomPos);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setGameOver(true);
      setActiveBugIndex(null);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    let bugTimer: NodeJS.Timeout;
    if (isPlaying) {
      bugTimer = setInterval(() => {
        nextBug();
      }, 550); // Made it faster to increase difficulty
    }
    return () => clearInterval(bugTimer);
  }, [isPlaying, nextBug]);

  const handleWhack = (index: number) => {
    if (!isPlaying) return;
    if (index === activeBugIndex) {
      setScore((s) => s + 1);
      setActiveBugIndex(null);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen flex flex-col">
      <Shell className="px-4 sm:px-8 flex-grow flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--fg)] transition-colors font-mono text-[12px] bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-6 font-mono text-[12px]">
            <span className="text-rose-500 font-bold">Time: {timeLeft}s</span>
            <span className="text-[var(--fg)] font-bold">Score: {score}</span>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-grow flex flex-col items-center justify-center">
          {!isPlaying && !gameOver && (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif mb-4 text-[var(--fg)]">Ready to squash?</h2>
              <button 
                onClick={startGame}
                className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-mono text-sm rounded-lg transition-colors shadow-lg shadow-rose-500/20 cursor-pointer border-none"
              >
                Start Game
              </button>
            </div>
          )}

          {gameOver && (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif mb-2 text-[var(--fg)]">Game Over!</h2>
              <p className="text-[var(--muted)] mb-6">You squashed {score} bugs.</p>
              <button 
                onClick={startGame}
                className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-mono text-sm rounded-lg transition-colors shadow-lg shadow-rose-500/20 cursor-pointer border-none"
              >
                Play Again
              </button>
            </div>
          )}

          <div className="bg-[var(--card)] border border-[var(--line)] p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-[400px]">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 aspect-square">
              {Array.from({ length: 9 }).map((_, i) => (
                <div 
                  key={i}
                  onClick={() => handleWhack(i)}
                  className={`
                    relative aspect-square rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden
                    ${activeBugIndex === i 
                      ? "border-rose-500 bg-rose-500/5 shadow-[0_0_15px_rgba(244,63,94,0.3)]" 
                      : "border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--line)]/30"
                    }
                  `}
                >
                  <AnimatePresence>
                    {activeBugIndex === i && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Bug className="w-8 h-8 text-rose-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          
          {(isPlaying || gameOver) && (
            <p className="mt-8 text-[var(--soft)] font-mono text-[10px] uppercase tracking-widest text-center">
              Click the bugs before they disappear!
            </p>
          )}
        </div>
      </Shell>
    </div>
  );
}
