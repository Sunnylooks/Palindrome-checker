import type { Snapshot } from "../types";

interface ControlBarProps {
  snapshots: Snapshot[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  playing: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
}

function KbdButton({
  children,
  onClick,
  disabled,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-md text-xs font-medium
        transition-colors cursor-pointer
        ${active
          ? "bg-blue-600/30 text-blue-300 ring-1 ring-blue-500/50"
          : "bg-[#1c1e26] text-ray-text/70 hover:text-ray-text hover:bg-[#23252e]"
        }
        disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-[#1c1e26] disabled:hover:text-ray-text/70
      `}
    >
      {children}
    </button>
  );
}

export default function ControlBar({
  snapshots,
  currentIndex,
  onIndexChange,
  playing,
  onTogglePlay,
  onReset,
}: ControlBarProps) {
  const isEmpty = snapshots.length === 0;

  return (
    <div className="flex items-center gap-1.5 justify-center py-3 border-t border-ray-border">
      <KbdButton onClick={() => onIndexChange(0)} disabled={isEmpty || currentIndex === 0}>
        ⏮
      </KbdButton>
      <KbdButton
        onClick={() => onIndexChange(currentIndex - 1)}
        disabled={isEmpty || currentIndex === 0}
      >
        ◀
      </KbdButton>
      <KbdButton onClick={onTogglePlay} disabled={isEmpty} active={playing}>
        {playing ? "⏸" : "▶"}
      </KbdButton>
      <KbdButton
        onClick={() => onIndexChange(currentIndex + 1)}
        disabled={isEmpty || currentIndex >= snapshots.length - 1}
      >
        ▶
      </KbdButton>
      <KbdButton
        onClick={() => onIndexChange(snapshots.length - 1)}
        disabled={isEmpty || currentIndex >= snapshots.length - 1}
      >
        ⏭
      </KbdButton>
      <span className="w-px h-5 bg-ray-border mx-1" />
      <KbdButton onClick={onReset} disabled={isEmpty}>
        ↺
      </KbdButton>

      {!isEmpty && (
        <span className="ml-3 text-xs font-mono text-ray-muted tabular-nums">
          {currentIndex + 1}/{snapshots.length}
        </span>
      )}
    </div>
  );
}
