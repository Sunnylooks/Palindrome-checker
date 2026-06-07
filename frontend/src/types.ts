export interface Snapshot {
  langkah: number;
  state: string;
  head: number;
  memory: string | null;
  tape: string[];
  aksi: string;
}

export interface SimulationData {
  input_asli: string;
  input_diproses: string;
  is_palindrome: boolean;
  state_akhir: string;
  alasan_akhir: string;
  total_langkah: number;
  snapshots: Snapshot[];
}

export interface SimulationResponse {
  status: "success" | "error";
  message?: string;
  data?: SimulationData;
}
