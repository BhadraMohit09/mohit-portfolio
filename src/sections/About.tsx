import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function About() {
  return (
    <div id="about">
      <SectionHeader title="About" />
      <Shell className="px-6 py-7 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-4"
        >
          {site.about.map((para, i) => (
            <motion.div
              key={i}
              variants={item}
              className="flex gap-2 text-[14.5px] leading-relaxed text-[var(--muted)]"
            >
              <span className="text-[var(--soft)] font-mono mt-0.5">•</span>
              <p>{para}</p>
            </motion.div>
          ))}

          {/* Developer Snapshot Cards */}
          <motion.div
            variants={item}
            className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--card)] p-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--fg)] font-semibold mb-3">
              Developer Snapshot
            </p>
            <motion.ul
              variants={container}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] font-mono text-[var(--muted)]"
            >
              {site.tldr.map((item_) => (
                <motion.li key={item_} variants={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-none" />
                  <span>{item_}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </Shell>
    </div>
  );
}
