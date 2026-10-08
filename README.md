# Standarisasi Template Undangan Digital

Repository ini berisi **Product Requirements Document (PRD)** dan **Template Standarisasi Undangan Digital Berbasis ReactJS** dengan pendekatan mobile-first.

---

## 🌟 Fitur Utama

1. **Mobile-Screen Centered Layout**:
   - Tampilan terkunci dalam rasio smartphone modern (`max-w-[440px]`) dan berada tepat di tengah layar saat diakses via laptop atau desktop PC.
   - Dilengkapi latar belakang ambient gelap yang estetik untuk perangkat desktop.

2. **Ketinggian Layar Maksimal 100vh (Zero Scroll)**:
   - Setiap halaman/seksi terkunci pada viewport `100dvh` (`overflow-hidden`).
   - Tidak ada scroll vertikal pada halaman; perpindahan antar seksi dilakukan 100% menggunakan Floating Navbar.

3. **Floating Navbar Minimalis**:
   - Menampilkan tepat **4 menu sekaligus** dengan jarak lega.
   - Dapat di-swipe / di-scroll ke kiri dan kanan secara halus (*smooth horizontal scroll* dengan *snap-x*).
   - Menu yang aktif otomatis bergulir ke tengah (*auto-scroll*).

4. **Personalisasi Tamu Dinamis via URL**:
   - Membaca nama tamu undangan otomatis dari query parameter:
     - `/wedding-invitation?name=Putra`
     - Mendukung parameter alternatif: `?to=...` atau `?guest=...`
   - Dilengkapi *fallback* default (*"Tamu Undangan"*).

5. **9 Seksi Standar**:
   - **01. Cover / Opening**: Sapaan personal tamu, cover, dan tombol "Buka Undangan" (autoplay audio handler).
   - **02. Couple / Mempelai**: Profil mempelai pria & wanita (toggle tab terpisah agar pas di 100vh).
   - **03. Quotes**: Ayat suci / kata mutiara pernikahan (QS. Ar-Rum: 21).
   - **04. Event / Rangkaian Acara**: Akad Nikah & Resepsi (toggle tab, Google Maps & Simpan ke Kalender).
   - **05. Countdown**: Hitung mundur hari, jam, menit, dan detik secara real-time.
   - **06. Galeri**: Photo Slider Carousel interaktif & Lightbox Modal zoom.
   - **07. RSVP & Ucapan**: Formulir konfirmasi kehadiran, animasi confetti, dan daftar ucapan tamu.
   - **08. Hadiah / Amplop Digital**: Rekening BCA, Mandiri (fitur 1-click salin rekening), QRIS, dan kado fisik.
   - **09. Penutup / Thanks**: Ungkapan terima kasih dari kedua mempelai dan keluarga besar.

6. **Data-Driven Architecture**:
   - Seluruh data teks, jadwal, foto, nomor rekening, dan nama mempelai disimpan terpusat di `src/data/invitationData.json`.

---

## 🚀 Tech Stack

- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
- **Audio API**: HTML5 Audio State Controller

---

## 🛠️ Instalasi & Menjalankan Proyek

```bash
# 1. Clone repository
git clone https://github.com/undangsaja/standarisasi-undangan-digital.git

# 2. Masuk ke direktori
cd standarisasi-undangan-digital

# 3. Install dependencies
npm install

# 4. Jalankan server lokal
npm run dev
```

Buka browser di:
- `http://localhost:5173/`
- `http://localhost:5173/?name=NamaTamu`

---

## 📄 Dokumen PRD
- [PRD_Standarisasi_Undangan_Digital.md](./PRD_Standarisasi_Undangan_Digital.md)
- [PRD_Standarisasi_Undangan_Digital.pdf](./PRD_Standarisasi_Undangan_Digital.pdf)

