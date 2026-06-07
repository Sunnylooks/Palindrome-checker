# ============================================================
# Program Pengecek Palindrom Menggunakan Simulasi Mesin Turing
# Versi API — mengumpulkan snapshots alih-alih print ke konsol
# ============================================================

BLANK = "_"
MARK = "X"


def normalisasi_input(teks):
    hasil = ""
    for karakter in teks:
        if karakter.isalnum():
            hasil += karakter.lower()
    return hasil


class MesinTuringPalindrome:
    def __init__(self, input_string):
        self.tape = [BLANK] + list(input_string) + [BLANK]
        self.head = 1
        self.state = "q0"
        self.memory = None
        self.langkah = 1
        self.alasan = ""
        self.snapshots = []

    def rekam_snapshot(self, aksi):
        self.snapshots.append({
            "langkah": self.langkah,
            "state": self.state,
            "head": self.head,
            "memory": self.memory,
            "tape": list(self.tape),
            "aksi": aksi,
        })
        self.langkah += 1

    def geser_kanan(self):
        self.head += 1
        if self.head >= len(self.tape):
            self.tape.append(BLANK)

    def geser_kiri(self):
        self.head -= 1
        if self.head < 0:
            self.tape.insert(0, BLANK)
            self.head = 0

    def jalankan(self):
        while True:
            simbol = self.tape[self.head]

            if self.state == "q0":
                if simbol == MARK:
                    self.rekam_snapshot("Simbol sudah ditandai, geser ke kanan")
                    self.geser_kanan()

                elif simbol == BLANK:
                    self.state = "q_accept"
                    self.alasan = "Semua pasangan simbol cocok."
                    self.rekam_snapshot("Tidak ada simbol yang tersisa, input diterima")
                    return True

                else:
                    self.memory = simbol
                    self.rekam_snapshot(
                        f"Simpan simbol kiri '{simbol}', ubah menjadi X, lalu geser kanan"
                    )
                    self.tape[self.head] = MARK
                    self.state = "q1"
                    self.geser_kanan()

            elif self.state == "q1":
                if simbol != BLANK:
                    self.rekam_snapshot("Bergerak ke kanan menuju ujung tape")
                    self.geser_kanan()
                else:
                    self.rekam_snapshot("Blank kanan ditemukan, mundur satu langkah")
                    self.state = "q2"
                    self.geser_kiri()

            elif self.state == "q2":
                if simbol == MARK:
                    self.rekam_snapshot("Simbol kanan sudah ditandai, geser ke kiri")
                    self.geser_kiri()

                elif simbol == BLANK:
                    self.state = "q_accept"
                    self.alasan = (
                        "Input memiliki simbol tengah atau seluruh simbol sudah cocok."
                    )
                    self.rekam_snapshot("Tersisa simbol tengah atau semua sudah cocok")
                    return True

                elif simbol == self.memory:
                    self.rekam_snapshot(
                        f"Simbol kanan '{simbol}' cocok dengan simbol kiri '{self.memory}', ubah menjadi X"
                    )
                    self.tape[self.head] = MARK
                    self.state = "q3"
                    self.geser_kiri()

                else:
                    self.state = "q_reject"
                    self.alasan = (
                        f"Simbol kiri '{self.memory}' tidak sama dengan simbol kanan '{simbol}'."
                    )
                    self.rekam_snapshot(
                        f"Simbol kanan '{simbol}' tidak cocok dengan simbol kiri '{self.memory}'"
                    )
                    return False

            elif self.state == "q3":
                if simbol != BLANK:
                    self.rekam_snapshot("Kembali ke sisi kiri tape")
                    self.geser_kiri()
                else:
                    self.rekam_snapshot(
                        "Blank kiri ditemukan, lanjut ke pasangan berikutnya"
                    )
                    self.state = "q0"
                    self.geser_kanan()

            else:
                self.alasan = "Mesin berhenti pada state yang tidak dikenal."
                return False
