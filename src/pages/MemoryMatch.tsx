import { useState, useEffect } from "react";
import { ArrowLeft, Box, Code2, Database, Terminal, Globe, Cpu } from "lucide-react";
import { Shell } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";

const CARDS = [
  { id: 1, type: 'react', icon: Code2, color: 'text-sky-400' },
  { id: 2, type: 'node', icon: Box, color: 'text-green-500' },
  { id: 3, type: 'db', icon: Database, color: 'text-blue-500' },
  { id: 4, type: 'term', icon: Terminal, color: 'text-purple-400' },
  { id: 5, type: 'web', icon: Globe, color: 'text-orange-400' },
  { id: 6, type: 'cpu', icon: Cpu, color: 'text-rose-400' },
];

// Create pairs and shuffle
const generateDeck = () => {
  const deck = [...CARDS, ...CARDS].map((card, index) => ({
    ...card,
    uniqueId: index,
    isFlipped: false,
    isMatched: false,
  }));
  return deck.sort(() => Math.random() - 0.5);
};

export function MemoryMatch({ onBack }: { onBack: () => void }) {
  const [deck, setDeck] = useState(generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const matchedCount = deck.filter(c => c.isMatched).length / 2;
  const isGameOver = matchedCount === CARDS.length;

  useEffect(() => {
    if (flipped.length === 2) {
      setIsLocked(true);
      const [firstId, secondId] = flipped;
      const firstCard = deck.find(c => c.uniqueId === firstId);
      const secondCard = deck.find(c => c.uniqueId === secondId);

      if (firstCard && secondCard && firstCard.type === secondCard.type) {
        setDeck(prev => prev.map(c => 
          c.uniqueId === firstId || c.uniqueId === secondId 
            ? { ...c, isMatched: true } 
            : c
        ));
        setFlipped([]);
        setIsLocked(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  }, [flipped, deck]);

  const handleCardClick = (uniqueId: number) => {
    if (isLocked) return;
    if (flipped.includes(uniqueId)) return;
    const card = deck.find(c => c.uniqueId === uniqueId);
    if (card?.isMatched) return;

    if (flipped.length === 0) {
      setMoves(m => m + 1);
    }
    setFlipped(prev => [...prev, uniqueId]);
  };

  const resetGame = () => {
    setDeck(generateDeck());
    setFlipped([]);
    setMoves(0);
    setIsLocked(false);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen flex flex-col">
      <Shell className="px-4 sm:px-8 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--fg)] transition-colors font-mono text-[12px] bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-6 font-mono text-[12px]">
            <span className="text-[var(--fg)] font-bold">Moves: {moves}</span>
            <span className="text-purple-400 font-bold">Pairs: {matchedCount} / {CARDS.length}</span>
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center max-w-lg mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif mb-2 text-[var(--fg)]">Dev Memory Match</h2>
            <p className="text-[var(--muted)] text-sm">Find the matching tech stack pairs.</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 w-full aspect-square max-w-[400px]">
            {deck.map((card) => {
              const isCardFlipped = flipped.includes(card.uniqueId) || card.isMatched;
              const Icon = card.icon;

              return (
                <div 
                  key={card.uniqueId}
                  onClick={() => handleCardClick(card.uniqueId)}
                  className="relative w-full h-full aspect-square cursor-pointer [perspective:1000px]"
                >
                  <motion.div
                    className="w-full h-full relative [transform-style:preserve-3d]"
                    initial={false}
                    animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                  >
                    {/* Front (Hidden state) */}
                    <div className="absolute inset-0 bg-[var(--card)] border border-[var(--line)] rounded-xl flex items-center justify-center [backface-visibility:hidden] hover:bg-white/5 transition-colors">
                      <div className="w-8 h-8 rounded-full border-2 border-[var(--line)]/50 border-dashed" />
                    </div>

                    {/* Back (Revealed state) */}
                    <div 
                      className={`absolute inset-0 bg-[#161b22] border rounded-xl flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]
                        ${card.isMatched ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-[var(--line)]'}
                      `}
                    >
                      <Icon className={`w-8 h-8 ${card.isMatched ? 'text-emerald-500' : card.color}`} />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {isGameOver && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mt-12 text-center"
              >
                <h3 className="text-2xl font-serif mb-2 text-emerald-500">System Restored!</h3>
                <p className="text-[var(--muted)] text-sm mb-6">You matched all pairs in {moves} moves.</p>
                <button 
                  onClick={resetGame}
                  className="px-8 py-3 bg-[var(--fg)] text-[var(--bg)] font-mono text-sm font-bold rounded-xl transition-transform hover:scale-105 border-none cursor-pointer"
                >
                  Play Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Shell>
    </div>
  );
}
