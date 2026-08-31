import { useState, useMemo } from "react";
import { ArrowLeft, Bug, CheckCircle2 } from "lucide-react";
import { Shell } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { SNIPPETS, BugSnippet } from "@/data/bugSnippets";

// Utility to shuffle snippets for endless gameplay
const shuffleSnippets = () => [...SNIPPETS].sort(() => Math.random() - 0.5);

export function BugFinder({ onBack }: { onBack: () => void }) {
  const [sessionSnippets, setSessionSnippets] = useState<BugSnippet[]>(shuffleSnippets());
  const [level, setLevel] = useState(0);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  
  const currentIdx = level % sessionSnippets.length;
  const snippet = sessionSnippets[currentIdx];
  const lines = snippet.code.split('\n');

  const handleLineClick = (lineIndex: number) => {
    if (showResult) return;
    setSelectedLine(lineIndex + 1);
    setShowResult(true);
    if (lineIndex + 1 === snippet.bugLine) {
      setScore(s => s + 1);
    }
  };

  const nextLevel = () => {
    setSelectedLine(null);
    setShowResult(false);
    setLevel(l => l + 1);
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
            <span className="text-[var(--fg)] font-bold">Solved: {score}</span>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-grow flex flex-col items-center max-w-2xl mx-auto w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif mb-2 text-[var(--fg)]">Find the Bug 🐛</h2>
            <p className="text-[var(--muted)] text-sm">Click the line of code that contains the error. Endless mode!</p>
          </div>

          <div className="w-full bg-[#0d1117] border border-[var(--line)] rounded-xl overflow-hidden font-mono text-sm shadow-xl">
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[var(--line)] text-xs">
              <span className="text-[#8b949e]">{snippet.language} snippet</span>
              <span className={`px-2 py-0.5 rounded-full font-bold
                ${snippet.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                ${snippet.difficulty === 'Hard' ? 'bg-orange-500/10 text-orange-500' : ''}
                ${snippet.difficulty === 'Impossible' ? 'bg-rose-500/10 text-rose-500' : ''}
              `}>
                {snippet.difficulty}
              </span>
            </div>
            <div className="p-4 overflow-x-auto">
              {lines.map((line, i) => {
                const lineNum = i + 1;
                const isSelected = selectedLine === lineNum;
                const isCorrectBug = showResult && lineNum === snippet.bugLine;
                const isWrongSelection = showResult && isSelected && lineNum !== snippet.bugLine;
                
                let bgClass = "hover:bg-white/5 cursor-pointer";
                if (isSelected) bgClass = "bg-white/10";
                if (isCorrectBug) bgClass = "bg-emerald-500/20 outline outline-1 outline-emerald-500/50";
                if (isWrongSelection) bgClass = "bg-rose-500/20 outline outline-1 outline-rose-500/50";

                return (
                  <div 
                    key={i} 
                    onClick={() => handleLineClick(i)}
                    className={`flex group transition-colors ${bgClass} rounded px-2 py-0.5 my-0.5`}
                  >
                    <span className="w-6 text-right mr-4 text-[#484f58] select-none group-hover:text-[#8b949e]">{lineNum}</span>
                    <span className="text-[#c9d1d9] whitespace-pre">{line || " "}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl border border-[var(--line)] bg-[var(--card)] w-full text-center"
              >
                {selectedLine === snippet.bugLine ? (
                  <div className="text-emerald-500 flex items-center justify-center gap-2 mb-2 font-bold">
                    <CheckCircle2 className="w-5 h-5" /> Correct!
                  </div>
                ) : (
                  <div className="text-rose-500 flex items-center justify-center gap-2 mb-2 font-bold">
                    <Bug className="w-5 h-5" /> Missed it! The bug was on line {snippet.bugLine}.
                  </div>
                )}
                <p className="text-[var(--muted)] text-sm mb-4">{snippet.explanation}</p>
                <button 
                  onClick={nextLevel}
                  className="px-6 py-2 bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-bold rounded-lg transition-transform hover:scale-105 cursor-pointer border-none"
                >
                  Next Snippet ➔
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Shell>
    </div>
  );
}
