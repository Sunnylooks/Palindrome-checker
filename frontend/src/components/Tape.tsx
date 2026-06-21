import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { Snapshot } from "../types";

interface TapeProps {
  snapshot: Snapshot | undefined;
  total: number;
}

export default function Tape({ snapshot, total }: TapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!snapshot || total === 0) {
    return (
      <div className="flex items-center justify-center h-20 text-ray-muted text-sm font-mono">
        Tape siap — masukkan teks untuk memulai.
      </div>
    );
  }

  const { tape, head } = snapshot;
  const cellCount = tape.length;
  const cellGap = 6;
  const cellW = cellCount > 22 ? 32 : 44;
  const stride = cellW + cellGap;

  // Keep head centered in the visible container, not centered on the whole tape
  const center = Math.max(containerWidth, stride) / 2;
  const headPos = head * stride + cellW / 2;
  const offset = center - headPos;

  return (
    <div ref={containerRef} className="overflow-hidden py-4">
      <motion.div
        className="flex min-w-max"
        style={{ gap: cellGap }}
        animate={{ x: offset }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
      >
        {tape.map((char, i) => {
          const isHead = i === head;
          const isBlank = char === "_";
          return (
            <motion.div
              key={`${i}-${char}`}
              layout
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center shrink-0"
            >
              <div
                className={`flex items-center justify-center rounded-md text-sm font-mono font-medium
                  ${isHead
                    ? "bg-[#1c1e26] text-cyan-400 ring-2 ring-cyan-400/60 shadow-[0_0_14px_rgba(34,211,238,0.25)]"
                    : "bg-[#1c1e26] text-ray-text/70"
                  }
                  ${isBlank ? "text-ray-muted/25" : ""}
                `}
                style={{ width: cellW, height: cellW }}
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
      </motion.div>
    </div>
  );
}
