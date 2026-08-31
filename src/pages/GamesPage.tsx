import { useState } from "react";
import { Shell, SectionHeader } from "@/components/Layout";
import { WhackABug } from "./WhackABug";
import { BugFinder } from "./BugFinder";
import { MemoryMatch } from "./MemoryMatch";
import { motion } from "framer-motion";
import { Bug, SearchCode, BrainCircuit } from "lucide-react";

export function GamesPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame === "whack-a-bug") {
    return <WhackABug onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === "bug-finder") {
    return <BugFinder onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === "memory-match") {
    return <MemoryMatch onBack={() => setActiveGame(null)} />;
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <SectionHeader 
        title="Take a Chill Pill" 
        aside="Relax and play some mini-games"
      />
      <Shell className="px-4 py-8 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Whack-a-Bug */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveGame("whack-a-bug")}
            className="cursor-pointer flex flex-col p-6 rounded-2xl bg-[var(--card)] border border-[var(--line)] shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center mb-6">
              <Bug className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2 text-[var(--fg)]">Whack-a-Bug</h3>
            <p className="text-[var(--muted)] text-sm mb-6 flex-grow">
              Squash the bugs before they crash production! A fast-paced stress reliever.
            </p>
            <div className="flex items-center text-[var(--soft)] font-mono text-[11px] group-hover:text-[var(--fg)] transition-colors uppercase tracking-widest">
              <span>▶ Play Now</span>
            </div>
          </motion.div>

          {/* BugFinder */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveGame("bug-finder")}
            className="cursor-pointer flex flex-col p-6 rounded-2xl bg-[var(--card)] border border-[var(--line)] shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
              <SearchCode className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2 text-[var(--fg)]">BugFinder</h3>
            <p className="text-[var(--muted)] text-sm mb-6 flex-grow">
              Test your code review skills. Find the hidden bug in short code snippets.
            </p>
            <div className="flex items-center text-[var(--soft)] font-mono text-[11px] group-hover:text-[var(--fg)] transition-colors uppercase tracking-widest">
              <span>▶ Play Now</span>
            </div>
          </motion.div>

          {/* Memory Match */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveGame("memory-match")}
            className="cursor-pointer flex flex-col p-6 rounded-2xl bg-[var(--card)] border border-[var(--line)] shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
              <BrainCircuit className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2 text-[var(--fg)]">Dev Match</h3>
            <p className="text-[var(--muted)] text-sm mb-6 flex-grow">
              Train your working memory by flipping cards to match tech stacks.
            </p>
            <div className="flex items-center text-[var(--soft)] font-mono text-[11px] group-hover:text-[var(--fg)] transition-colors uppercase tracking-widest">
              <span>▶ Play Now</span>
            </div>
          </motion.div>
        </div>
      </Shell>
    </div>
  );
}
