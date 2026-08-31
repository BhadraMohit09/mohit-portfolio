import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Project } from "@/config/site";
import { Globe, ChevronDown, ChevronUp } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

const getProjectGradient = (index: number) => {
  const gradients = [
    "from-indigo-950 via-[var(--card)] to-[var(--bg)]",
    "from-emerald-950 via-[var(--card)] to-[var(--bg)]",
    "from-rose-950 via-[var(--card)] to-[var(--bg)]",
    "from-amber-950 via-[var(--card)] to-[var(--bg)]",
    "from-sky-950 via-[var(--card)] to-[var(--bg)]",
    "from-violet-950 via-[var(--card)] to-[var(--bg)]",
  ];
  return gradients[index % gradients.length];
};

export function ProjectCard({ project: p, index = 0 }: { project: Project; index?: number }) {
  const [showDetails, setShowDetails] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-[var(--line)] bg-[var(--card)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--soft)] hover:shadow-md h-full overflow-hidden">
      <div>
        {/* Full-bleed Image Preview */}
        <div className="relative h-48 w-full overflow-hidden bg-[var(--chip)]">
          {p.image && !imgError ? (
            <>
              <img
                src={p.image}
                alt={`${p.title} preview`}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
              {/* Gradient fade at bottom for badge legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
            </>
          ) : (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getProjectGradient(index)} relative`}>
              <div className="bg-stripes absolute inset-0 opacity-20 pointer-events-none" />
              <span className="font-serif text-2xl text-[var(--fg)] opacity-90 relative z-10">{p.title}</span>
            </div>
          )}

          {/* Badges overlaid at image bottom */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {p.status === "Live" || !p.status ? (
                <span className="rounded bg-emerald-500/25 border border-emerald-500/50 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-sm flex items-center gap-1">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {p.status ?? "Live"}
                </span>
              ) : p.status === "In Development" ? (
                <span className="rounded bg-sky-500/25 border border-sky-500/50 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-sky-300 backdrop-blur-sm">
                  ◎ {p.status}
                </span>
              ) : (
                <span className="rounded bg-amber-500/25 border border-amber-500/50 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-sm">
                  • {p.status}
                </span>
              )}
            </div>

            {p.featured && (
              <span className="rounded bg-amber-400/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-400 border border-amber-500/30 backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Project Header Info */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[16px] font-semibold tracking-wide text-[var(--fg)] group-hover:text-[var(--fg)]">
              {p.title}
            </h3>
            <span className="font-mono text-xs text-[var(--soft)] shrink-0">{p.year}</span>
          </div>

          <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)] line-clamp-4">
            {p.blurb}
          </p>

          {/* Collapsible Details Drawer */}
          {p.story && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 font-mono text-[10px] text-[var(--soft)] hover:text-[var(--fg)] cursor-pointer outline-none"
              >
                {showDetails ? "Hide engineering details" : "Show engineering details"}
                {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
              <AnimatePresence initial={false}>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2.5 rounded-lg border border-[var(--line)]/50 bg-[var(--chip)]/60 p-3 font-sans text-[12px] leading-relaxed text-[var(--muted)] border-l-2 border-l-[var(--soft)] space-y-1.5">
                      {p.story.split("\n\n").map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Tech Pills & Direct Links */}
      <div className="mx-5 mb-5 flex items-center justify-between gap-3 pt-3 border-t border-[var(--line)]/50">
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((t) => (
            <span
              key={t}
              className="rounded bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)] border border-[var(--line)]/30"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2.5 text-[var(--soft)]">
          {p.links.live && (
            <a
              href={p.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} live site`}
              className="transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--fg)]"
            >
              <Globe className="size-4" />
            </a>
          )}
          {p.links.source && (
            <a
              href={p.links.source}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} repository`}
              className="transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--fg)]"
            >
              <GitHubIcon className="size-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
