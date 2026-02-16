from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Path ke file CSV
CSV_FILE = 'data pemesanan.csv'

# Inisialisasi file CSV dengan header jika belum ada
if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Tanggal', 'Jam', 'Nama', 'Telepon', 'Email', 'Produk', 'Jumlah', 'Lokasi', 'Keterangan'])

@app.route('/simpan_pesanan', methods=['POST'])
def simpan_pesanan():
    try:
        data = request.json
        
        # Validasi data
        if not data.get('nama') or not data.get('telepon') or not data.get('produk') or not data.get('lokasi'):
            return jsonify({'status': 'error', 'message': 'Data tidak lengkap'}), 400
        
        # Simpan ke CSV
        with open(CSV_FILE, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                data.get('tanggal', ''),
                data.get('jam', ''),
                data.get('nama', ''),
                data.get('telepon', ''),
                data.get('email', ''),
                data.get('produk', ''),
                data.get('jumlah', ''),
                data.get('lokasi', ''),
                data.get('keterangan', '')
            ])
        
        return jsonify({'status': 'success', 'message': 'Pesanan berhasil disimpan'}), 200
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/ambil_pesanan', methods=['GET'])
def ambil_pesanan():
    try:
        pesanan_list = []
        with open(CSV_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                pesanan_list.append(row)
        
        return jsonify({'status': 'success', 'data': pesanan_list}), 200
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/hapus_pesanan/<int:index>', methods=['DELETE'])
def hapus_pesanan(index):
    try:
        pesanan_list = []
        with open(CSV_FILE, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            header = next(reader)
            pesanan_list = list(reader)
        
        if 0 <= index < len(pesanan_list):
            pesanan_list.pop(index)
            with open(CSV_FILE, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(header)
                writer.writerows(pesanan_list)
            return jsonify({'status': 'success', 'message': 'Pesanan berhasil dihapus'}), 200
        else:
            return jsonify({'status': 'error', 'message': 'Index tidak ditemukan'}), 404
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Server berjalan dengan baik'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
