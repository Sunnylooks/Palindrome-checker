# Turing Palindrome Visualizer

Simulator Mesin Turing interaktif untuk pengecekan palindrom, dibangun dengan **Python Flask** (backend) dan **React + Vite + Tailwind CSS** (frontend).

## Struktur Proyek

```
otomata/
├── backend/
│   ├── app.py               # Flask REST API (POST /api/simulate)
│   ├── turing_machine.py    # Logika Mesin Turing + snapshot collection
│   └── requirements.txt     # flask, flask-cors
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # State management & UI orchestration
│   │   ├── api.ts           # Client API + sanitization
│   │   └── components/
│   │       ├── InputBar.tsx     # Borderless input (max 30 karakter)
│   │       ├── Tape.tsx         # Visualisasi pita + animasi Framer Motion
│   │       ├── StateGraph.tsx   # Graf 6 state node (SVG)
│   │       └── ControlBar.tsx   # Play/Step/Reset ala KBD Raycast
│   ├── tailwind.config.js   # Tema gelap Raycast (#0c0e12)
│   └── vite.config.ts       # @vitejs/plugin-react, port 5173
└── program_palindrom_mesin_turing.py  # Skrip CLI asli
```

## Menjalankan

**Backend** (port 5000):
```bash
cd backend
pip install -r requirements.txt
python app.py
```

**Frontend** (port 5173):
```bash
cd frontend
npm install
npm run dev
```

Buka `http://localhost:5173`, ketik kata/kalimat, lalu tekan Enter. Simulasi Mesin Turing akan menampilkan snapshot langkah-demi-langkah.

## API

`POST /api/simulate`
```json
{ "input_string": "Kasur ini rusak" }
```
Response: status palindrom, state akhir, total langkah, dan array snapshots lengkap.
