import { useState, useCallback, useEffect, useRef } from "react";
import { simulate } from "./api";
import type { SimulationData, Snapshot } from "./types";
import InputBar from "./components/InputBar";
import Tape from "./components/Tape";
import StateGraph from "./components/StateGraph";
import ControlBar from "./components/ControlBar";

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SimulationData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const snapshots: Snapshot[] = data?.snapshots ?? [];
  const currentSnapshot = snapshots[currentIndex] ?? null;

  const handleSubmit = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setError(null);
    setLoading(true);
    setPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    try {
      const res = await simulate(trimmed);
      if (res.status === "error" || !res.data) {
        setError(res.message ?? "Gagal mengambil data dari server.");
        setData(null);
        setCurrentIndex(0);
      } else {
        setData(res.data);
        setCurrentIndex(0);
        setError(null);
      }
    } catch {
      setError("Server Flask tidak dapat dijangkau. Pastikan backend berjalan di port 5000.");
      setData(null);
      setCurrentIndex(0);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const handleIndexChange = useCallback(
    (index: number) => {
      if (index < 0 || index >= snapshots.length) return;
      setCurrentIndex(index);
    },
    [snapshots.length],
  );

  const handleTogglePlay = useCallback(() => {
    if (snapshots.length === 0) return;
    setPlaying((prev) => !prev);
  }, [snapshots.length]);

  const handleReset = useCallback(() => {
    setPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setData(null);
    setCurrentIndex(0);
    setError(null);
  }, []);

  useEffect(() => {
    if (playing && snapshots.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= snapshots.length - 1) {
            setPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 600);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, snapshots.length]);

  const showResults = data !== null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-xl bg-[#0c0e12] border border-[#23252e] shadow-[0_0_0_1px_rgba(35,37,46,0.6),0_8px_32px_rgba(0,0,0,0.45)] overflow-hidden">
        {/* Header — Input */}
        <div className="px-5 pt-4">
          <InputBar
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>

        {/* Error banner */}
        {error && (
          <div className="mx-5 mt-3 px-3 py-2 rounded-md bg-red-950/50 border border-red-800/40 text-red-300 text-xs font-mono">
            {error}
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-10 text-ray-muted text-sm font-mono animate-pulse">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="50" strokeLinecap="round" className="opacity-25" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Mesin Turing sedang memproses...
          </div>
        )}

        {/* Results */}
        {showResults && data && !loading && (
          <>
            {/* Status summary */}
            <div className="px-5 pt-4 pb-2 flex items-center gap-3">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  data.is_palindrome ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                }`}
              />
              <span className="text-sm font-mono text-ray-text/80">
                {data.is_palindrome ? "PALINDROM" : "BUKAN PALINDROM"}
              </span>
              <span className="text-xs text-ray-muted ml-auto tabular-nums">
                {data.total_langkah} langkah
              </span>
            </div>

            {/* Tape */}
            <div className="px-3">
              <Tape snapshot={currentSnapshot} total={snapshots.length} />
            </div>

            {/* State Graph */}
            <StateGraph activeState={currentSnapshot?.state ?? ""} />

            {/* Action description */}
            {currentSnapshot && (
              <div className="px-5 py-2 text-xs font-mono text-ray-muted/90 border-t border-ray-border min-h-[2rem] leading-relaxed">
                {currentSnapshot.aksi}
              </div>
            )}

            {/* Controls */}
            <ControlBar
              snapshots={snapshots}
              currentIndex={currentIndex}
              onIndexChange={handleIndexChange}
              playing={playing}
              onTogglePlay={handleTogglePlay}
              onReset={handleReset}
            />
          </>
        )}

        {/* Empty state */}
        {!showResults && !loading && !error && (
          <div className="px-5 py-10 text-center text-ray-muted text-sm">
            Ketik sebuah kata atau kalimat, lalu tekan <kbd className="px-1.5 py-0.5 rounded bg-[#1c1e26] text-xs font-mono border border-[#2e303a]">Enter</kbd> untuk memulai simulasi.
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-6 text-[11px] text-ray-muted/40 font-mono tracking-wider">
        TURING PALINDROME VISUALIZER
      </p>
    </div>
  );
}
