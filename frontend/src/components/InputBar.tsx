interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function InputBar({ value, onChange, onSubmit, loading }: InputBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim() && !loading) {
      onSubmit();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={50}
        placeholder="Ketik kata / kalimat..."
        disabled={loading}
        spellCheck={false}
        className="w-full bg-transparent text-base text-ray-text placeholder-ray-muted
                   outline-none py-3 px-1 font-medium tracking-wide
                   disabled:opacity-40 disabled:cursor-not-allowed"
      />
      <div className="h-px w-full bg-ray-border" />
    </div>
  );
}
