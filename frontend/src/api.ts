import type { SimulationResponse } from "./types";

const API_BASE = "http://localhost:5000";

export async function simulate(inputString: string): Promise<SimulationResponse> {
  const sanitized = inputString.replace(/[^a-zA-Z0-9\s]/g, "");

  const res = await fetch(`${API_BASE}/api/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input_string: sanitized }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Server tidak dapat dijangkau." }));
    return { status: "error", message: err.message || `HTTP ${res.status}` };
  }

  return res.json();
}
