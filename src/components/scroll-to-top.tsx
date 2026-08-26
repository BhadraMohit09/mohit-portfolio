import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-20 right-6 z-40 grid size-9 place-items-center rounded-full border border-[var(--line)] bg-[var(--chip)] text-[var(--muted)] shadow-md backdrop-blur-sm transition-colors hover:border-[var(--soft)] hover:text-[var(--fg)]"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp className="size-3.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
