interface StateGraphProps {
  activeState: string;
}

const STATES = [
  { id: "q0", label: "q₀", x: 52, y: 28 },
  { id: "q1", label: "q₁", x: 160, y: 28 },
  { id: "q2", label: "q₂", x: 268, y: 28 },
  { id: "q_accept", label: "ACC", x: 52, y: 78 },
  { id: "q3", label: "q₃", x: 160, y: 78 },
  { id: "q_reject", label: "REJ", x: 268, y: 78 },
];

function stateColor(stateId: string, activeState: string) {
  if (stateId === activeState) {
    if (stateId === "q_accept") return { fill: "#166534", stroke: "#22c55e", text: "#bbf7d0" };
    if (stateId === "q_reject") return { fill: "#450a0a", stroke: "#ef4444", text: "#fecaca" };
    return { fill: "#1e3a5f", stroke: "#3b82f6", text: "#bfdbfe" };
  }
  return { fill: "#1c1e26", stroke: "#2e303a", text: "#6b6e7b" };
}

export default function StateGraph({ activeState }: StateGraphProps) {
  return (
    <div className="px-2 py-3">
      <svg viewBox="0 0 320 106" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 1 L 8 5 L 0 9 Z" fill="#3b3d4a" />
          </marker>
        </defs>

        {/* q0 → q1 (horizontal right) */}
        <line
          x1={65} y1={28} x2={147} y2={28}
          stroke="#3b3d4a" strokeWidth={1.2}
          markerEnd="url(#arrowhead)"
        />

        {/* q1 → q2 (horizontal right) */}
        <line
          x1={173} y1={28} x2={255} y2={28}
          stroke="#3b3d4a" strokeWidth={1.2}
          markerEnd="url(#arrowhead)"
        />

        {/* q2 → q_reject (vertical down, straight) */}
        <line
          x1={268} y1={41} x2={268} y2={65}
          stroke="#3b3d4a" strokeWidth={1.2}
          markerEnd="url(#arrowhead)"
        />

        {/* q2 → q3 (diagonal down-left: exact edge q2(268,28)→q3(160,78), r=13) */}
        <path
          d="M 256 34 C 260 54, 210 60, 172 73"
          fill="none"
          stroke="#3b3d4a"
          strokeWidth={1.2}
          markerEnd="url(#arrowhead)"
        />

        {/* q2 → q_accept (diagonal far-left: exact edge q2(268,28)→q_accept(52,78), r=13) */}
        <path
          d="M 255 31 C 260 54, 110 60, 65 75"
          fill="none"
          stroke="#3b3d4a"
          strokeWidth={1.2}
          markerEnd="url(#arrowhead)"
        />

        {/* q3 → q0 (diagonal up-left: exact edge q3(160,78)→q0(52,28), r=13) */}
        <path
          d="M 148 73 C 152 54, 100 46, 64 34"
          fill="none"
          stroke="#3b3d4a"
          strokeWidth={1.2}
          markerEnd="url(#arrowhead)"
        />

        {/* State nodes */}
        {STATES.map((s) => {
          const c = stateColor(s.id, activeState);
          const isActive = s.id === activeState;
          return (
            <g key={s.id}>
              {isActive && (
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={16}
                  fill="none"
                  stroke={c.stroke}
                  strokeWidth={2}
                  opacity={0.35}
                  className="animate-pulse"
                />
              )}
              <circle
                cx={s.x}
                cy={s.y}
                r={13}
                fill={c.fill}
                stroke={c.stroke}
                strokeWidth={1.5}
              />
              <text
                x={s.x}
                y={s.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={c.text}
                fontSize={s.id.startsWith("q_") ? 7 : 9}
                fontFamily="JetBrains Mono, monospace"
                fontWeight={600}
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
