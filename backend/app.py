from flask import Flask, jsonify, request
from flask_cors import CORS
from turing_machine import MesinTuringPalindrome, normalisasi_input

app = Flask(__name__)
CORS(app)


@app.route("/api/simulate", methods=["POST"])
def simulate():
    body = request.get_json(silent=True)
    if not body or "input_string" not in body:
        return jsonify({"status": "error", "message": "Payload wajib berisi 'input_string'."}), 400

    input_asli = body["input_string"]
    input_diproses = normalisasi_input(input_asli)

    if not input_diproses:
        return jsonify({"status": "error", "message": "Input kosong setelah dinormalisasi."}), 422

    mesin = MesinTuringPalindrome(input_diproses)
    is_palindrome = mesin.jalankan()

    return jsonify({
        "status": "success",
        "data": {
            "input_asli": input_asli,
            "input_diproses": input_diproses,
            "is_palindrome": is_palindrome,
            "state_akhir": mesin.state,
            "alasan_akhir": mesin.alasan,
            "total_langkah": len(mesin.snapshots),
            "snapshots": mesin.snapshots,
        },
    }), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
