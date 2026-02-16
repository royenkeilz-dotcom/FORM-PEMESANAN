## 📋 SAYAGI WATER - Sistem Pemesanan

Sistem pemesanan online untuk depot air SAYAGI WATER dengan fitur penyimpanan data otomatis ke CSV.

### 🚀 Cara Menjalankan

#### 1. **Install Dependencies**

Buka terminal/PowerShell di folder `game gbt` dan jalankan:

```powershell
pip install flask flask-cors
```

#### 2. **Jalankan Backend Server**

```powershell
python app.py
```

Server akan berjalan di `http://localhost:5000`

Anda akan melihat output seperti:
```
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

#### 3. **Buka Form Pemesanan**

Buka file `pemesanan.html` di browser (bisa double-click atau drag ke browser)

### 📝 Fitur

✅ **Form Interaktif**
- Data Pelanggan (Nama, Telepon, Email)
- Pilihan Produk (AQUA, LE MINERAL, GAS, ISI ULANG)
- Jumlah Pemesanan dengan tombol +/-
- Lokasi Pengantaran
- Keterangan Tambahan
- Upload Foto (opsional)

✅ **Validasi Otomatis**
- Cek kelengkapan data
- Validasi format telepon
- Pesan error yang jelas

✅ **Efek Visual**
- Animasi smooth saat loading
- Gradient modern
- Tab navigation untuk pengalaman lebih baik
- Notifikasi success/error

✅ **Penyimpanan Data**
- Data otomatis tersimpan ke `data pemesanan.csv`
- Format: Tanggal, Jam, Nama, Telepon, Email, Produk, Jumlah, Lokasi, Keterangan
- File CSV bisa dibuka dengan Excel atau Google Sheets

### 📁 File yang Digunakan

- `pemesanan.html` - Form HTML
- `pemesanan.css` - Styling CSS
- `pemesanan.js` - Logic JavaScript
- `app.py` - Backend Python (Flask)
- `data pemesanan.csv` - Database pesanan

### 🔧 Troubleshooting

**Error: "Pastikan server berjalan di localhost:5000"**
- Pastikan server Python sudah dijalankan dengan `python app.py`
- Pastikan tidak ada port yang conflict (Port 5000)

**CSV tidak terbuat otomatis**
- Server akan membuat file CSV otomatis saat pertama kali dijalankan
- Jika manual, buat file bernama `data pemesanan.csv` dengan isi:
  ```
  Tanggal,Jam,Nama,Telepon,Email,Produk,Jumlah,Lokasi,Keterangan
  ```

**Browser menampilkan blank**
- Pastikan path file CSS dan JS benar
- Cek console browser (F12) untuk error

### 💡 Tips

1. **Lihat Data CSV**
   - Buka file `data pemesanan.csv` dengan Excel
   - Atau gunakan Google Sheets (Upload file)

2. **Tambah Produk**
   - Edit di `pemesanan.html` bagian "Pilih Produk"
   - Jangan lupa update di `app.py` jika diperlukan

3. **Ubah Lokasi Depot**
   - Edit di `pemesanan.html` header section
   - Cari text "Jalan Ciberem, Kecamatan Pasirjambu"

### 📱 Responsive Design

Form sudah dioptimalkan untuk:
- 💻 Desktop / Laptop
- 📱 Tablet
- 📲 Mobile Phone

---

**Dibuat untuk SAYAGI WATER Depot Air Minum**
Tahun 2026
