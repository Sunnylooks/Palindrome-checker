import { motion, AnimatePresence } from "framer-motion";
import type { Snapshot } from "../types";

interface TapeProps {
  snapshot: Snapshot | undefined;
  total: number;
}

function tapeCenterIndex(tape: string[]): number {
  const mid = Math.floor((tape.length - 1) / 2);
  return Math.max(0, mid);
}

export default function Tape({ snapshot, total }: TapeProps) {
  if (!snapshot || total === 0) {
    return (
      <div className="flex items-center justify-center h-20 text-ray-muted text-sm font-mono">
        Tape siap — masukkan teks untuk memulai.
      </div>
    );
  }

  const { tape, head } = snapshot;
  const center = tapeCenterIndex(tape);
  const offset = (head - center) * -60;

  return (
    <div className="overflow-hidden py-4">
      <motion.div
        className="flex gap-1.5 justify-center min-w-max"
        animate={{ x: offset }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
      >
        <AnimatePresence mode="popLayout">
          {tape.map((char, i) => {
            const isHead = i === head;
            const isBlank = char === "_";
            return (
              <motion.div
                key={`${i}-${char}`}
                layout
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-11 h-11 flex items-center justify-center rounded-md text-sm font-mono font-medium
                    ${isHead
                      ? "bg-[#1c1e26] text-cyan-400 ring-2 ring-cyan-400/60 shadow-[0_0_14px_rgba(34,211,238,0.25)]"
                      : "bg-[#1c1e26] text-ray-text/70"
                    }
                    ${isBlank ? "text-ray-muted/25" : ""}
                  `}
                >
                  {char}
                </div>
                {isHead && (
                  <span className="text-cyan-400 text-xs leading-none mt-0.5 animate-pulse">
                    ▲
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
