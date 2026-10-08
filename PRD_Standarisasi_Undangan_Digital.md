# Product Requirements Document (PRD)
## Standarisasi Template Undangan Digital Berbasis ReactJS

---

### Informasi Dokumen
- **Judul Proyek**: Standardisasi Template Undangan Digital (Mobile-First Web Invitation)
- **Versi**: 1.0.0
- **Tanggal**: 6 Oktober 2026
- **Status**: Draft - In Review
- **Target Tech Stack**: ReactJS, Tailwind CSS, Lucide Icons, Framer Motion

---

## 1. Pendahuluan & Latar Belakang

### 1.1 Latar Belakang
Undangan digital berbasis website kini menjadi standar utama dalam industri pernikahan dan acara formal di Indonesia. Namun, banyak template undangan yang tidak memiliki standarisasi struktur data, layout yang inkonsisten antar perangkat (khususnya saat dibuka di laptop/PC), navigasi yang kaku, serta kesulitan kustomisasi nama tamu undangan.

Proyek ini bertujuan untuk menciptakan **PRD dan Arsitektur Template Standarisasi Undangan Digital** yang modern, interaktif, elegan, dan *data-driven* menggunakan ReactJS.

### 1.2 Tujuan Produk (Objectives)
1. **Standarisasi Tampilan Mobile-First**: Undangan tampil proporsional layaknya layar smartphone (lebar terkontrol dan berada di tengah layar) meskipun diakses melalui layar desktop/laptop besar.
2. **Sistem Navigasi Berbasis Halaman (Tab / Screen Navigation)**: Halaman berpindah menggunakan floating navbar (bukan continuous vertical scroll satu halaman panjang) untuk pengalaman pengguna (UX) terstruktur dan ringan.
3. **Navigasi Mengambang (Floating Pill Navbar)**: Navigasi bawah melayang, rounded penuh, dan kompak dengan safe bottom padding sehingga tidak menutupi konten undangan.
4. **Personalisasi Tamu Dinamis via URL**: Mampu membaca parameter nama tamu undangan dari URL (contoh: `/wedding-invitation?name=Putra`) secara otomatis.
5. **Struktur Halaman/Seksi Terstandar**: Memiliki 9 seksi inti wajib (*Opening, Couple, Quotes, Event, Countdown, Galeri, RSVP, Gift, Thanks*).
6. **Data-Driven Template**: Desain template modular di mana seluruh konten (teks, foto, jadwal, rekening) dapat dikonfigurasi melalui skema data JSON standar.

---

## 2. Kebutuhan Pengguna & Pengalaman Pengguna (UX/UI Standard)

### 2.1 Viewport & Container Layout (Strict 100vh - Zero Scroll)
* **Ketinggian Viewport**: Dikunci ketat pada **maksimal 100vh / 100dvh** (`overflow-hidden`). Halaman undangan tidak dapat di-scroll baik secara global maupun internal, sehingga seluruh informasi tertata pas di satu layar.
* **Perangkat Mobile**: Lebar penuh (100% width) dengan tinggi tepat 100dvh.
* **Perangkat Desktop / Tablet**:
  * Undangan dibatasi pada lebar maksimal smartphone premium (`max-w-[440px]`).
  * Posisi container berada tepat di **tengah layar (center horizontal & 100dvh)**.
  * Latar belakang luar (*backdrop background*) menggunakan warna gelap dengan ambient glow estetik.

### 2.2 Bottom Floating Navbar (4 Menu Tampil & Horizontal Scroll)
* **Posisi**: Fixed di area bawah layar (`bottom-3`), melayang di dalam batas container mobile.
* **Bentuk & Layout Menu**:
  * **Tampilan 4 Menu**: Lebar navbar proporsional dan menampilkan tepat **4 menu ikon sekaligus** (`w-1/4` atau `min-w-[25%]`).
  * **Scrollable Horizontal**: Tamu dapat menggeser/men-scroll menu ke kanan dan ke kiri secara halus (*snap-x*) dengan tombol panah bantu di sisi kiri/kanan.
  * **Pill Shaped**: Memakai `rounded-full` dengan efek *glassmorphism* (`backdrop-blur-xl`, border tipis gold, dan bayangan mengambang).
  * **Auto Center**: Saat berpindah halaman, navbar otomatis menggulirkan ikon aktif ke tengah layar.

### 2.3 Kontrol Audio & Musik
* Background musik dimulai secara otomatis **hanya setelah** pengunjung menekan tombol *"Buka Undangan"* pada seksi Opening (mematuhi aturan *Autoplay Policy* browser modern).
* Tombol *floating music controller* (ikon piringan hitam/audio berputar saat play, pause saat disentuh) melayang di sudut layar (misal kanan atas atau kanan bawah).

---

## 3. Spesifikasi Parameter URL & Personalisasi

### 3.1 Spesifikasi Parameter
* **Format URL**:
  ```
  https://domain.com/wedding-invitation?name={Nama_Tamu}
  ```
* **Dukungan Alias Parameter**:
  Sistem harus mendukung parameter alternatif untuk fleksibilitas:
  * `name` (contoh: `?name=Putra+Wira` atau `?name=Putra%20Wira`)
  * `to` (contoh: `?to=Putra`)
  * `guest` (contoh: `?guest=Putra`)
* **Sanitasi & Pengolahan Data**:
  * Dekode format URL: Mengubah `%20` atau tanda `+` menjadi spasi normal.
  * Sanitasi teks untuk mencegah injeksi karakter aneh / XSS.
  * *Capitalization*: Format Title Case otomatis jika diperlukan.
* **Nilai Fallback (Default)**:
  Jika URL diakses tanpa parameter nama, teks sapaan default yang muncul adalah:
  > *"Tamu Undangan"* atau *"Sahabat & Keluarga Tercinta"*

---

## 4. Rincian Standarisasi Struktur Halaman (9 Seksi)

```
┌─────────────────────────────────────────────────────────┐
│ 1. OPENING / COVER (Buka Undangan & Autoplay Musik)     │
├─────────────────────────────────────────────────────────┤
│ 2. COUPLE / MEMPELAI (Profil Pria & Wanita)             │
├─────────────────────────────────────────────────────────┤
│ 3. QUOTES / AYAT (Kata Mutiara / Doa Kitab Suci)        │
├─────────────────────────────────────────────────────────┤
│ 4. EVENT / ACARA (Akad & Resepsi + Maps + Kalender)     │
├─────────────────────────────────────────────────────────┤
│ 5. COUNTDOWN / HITUNG MUNDUR (Hari, Jam, Menit, Detik)  │
├─────────────────────────────────────────────────────────┤
│ 6. GALERI / FOTO & VIDEO (Grid, Lightbox, Video Teaser) │
├─────────────────────────────────────────────────────────┤
│ 7. RSVP & UCAPAN (Form Kehadiran + Daftar Doa Tamu)     │
├─────────────────────────────────────────────────────────┤
│ 8. GIFT / HADIAH (Nomor Rekening, QRIS, Kirim Kado)     │
├─────────────────────────────────────────────────────────┤
│ 9. THANKS / PENUTUP (Salam Penutup & Foto Akhir)        │
└─────────────────────────────────────────────────────────┘
        [ Floating Bottom Navbar (Pill Shape) ]
```

### 4.1 Seksi 1: Opening / Cover
* **Tampilan**: 100vh / 100dvh (layar penuh saat pertama dibuka).
* **Elemen**:
  * Foto cover latar belakang atau animasi ornamen.
  * Judul: "The Wedding Of", nama panggilan mempelai (misal: "Putra & Putri").
  * Tanggal acara utama.
  * Kotak Personalisasi Tamu:
    * Label: "Kepada Yth. Bapak/Ibu/Saudara/i:"
    * Nama Tamu (dinamis dari URL parameter).
  * Tombol CTA: **"Buka Undangan"** (dengan ikon amplop).
* **Interaksi Klik**:
  * Membuka kunci scroll ke halaman berikutnya.
  * Memulai pemutaran audio latar (BGM).
  * Menampilkan Bottom Navbar.

### 4.2 Seksi 2: Couple / Profil Mempelai
* **Elemen**:
  * Salam pembuka (Assalamu'alaikum / Salam Sejahtera / Greetings).
  * Mukadimah ucapan rasa syukur atas rahmat pernikahan.
  * **Profil Mempelai Pria**: Foto potret, Nama Lengkap beserta Gelar, Nama Panggilan, Keterangan Putra dari Bapak [X] & Ibu [Y], tautan Instagram.
  * Pembatas visual / Kaligrafi / Simbol "&".
  * **Profil Mempelai Wanita**: Foto potret, Nama Lengkap beserta Gelar, Nama Panggilan, Keterangan Putri dari Bapak [A] & Ibu [B], tautan Instagram.

### 4.3 Seksi 3: Quotes / Ayat Suci
* **Elemen**:
  * Kutipan suci pernikahan (contoh: QS. Ar-Rum: 21, 1 Korintus 13:4-7, atau quotes sastra/filosofis).
  * Teks Arab / Teks Asli + Terjemahan bahasa Indonesia/Inggris.
  * Desain elegan dengan tipografi serif/script yang berwibawa.

### 4.4 Seksi 4: Event / Rangkaian Acara
* **Struktur Kartu Acara**:
  * **Sesi 1 (Akad Nikah / Pemberkatan)**:
    * Tanggal, Hari, dan Waktu (contoh: 08:00 - 10:00 WIB).
    * Nama Gedung / Tempat & Alamat Lengkap.
  * **Sesi 2 (Resepsi Pernikahan)**:
    * Tanggal, Hari, dan Waktu (contoh: 11:00 - 14:00 WIB).
    * Nama Gedung / Tempat & Alamat Lengkap.
* **Fitur Interaktif**:
  * Tombol **"Buka Google Maps"** (link keluar ke aplikasi Google Maps / Waze).
  * Peta Interaktif (Embed Google Maps iframe yang responsif).
  * Tombol **"Simpan ke Kalender"** (*Add to Google Calendar / iCal / Outlook*).

### 4.5 Seksi 5: Countdown / Hitung Mundur
* **Elemen**:
  * Timer waktu nyata (*real-time*): Hari, Jam, Menit, dan Detik menuju waktu acara.
  * Status otomatis saat acara berlangsung: *"Acara Sedang Berlangsung"* atau *"Acara Telah Selesai"*.
  * Tampilan angka yang besar dengan box bergaya estetik.

### 4.6 Seksi 6: Galeri / Foto & Video
* **Elemen**:
  * Grid / Masonry foto-foto prewedding atau momen berdua.
  * Fitur **Lightbox**: Klik foto untuk memperbesar dengan tombol navigasi *next/prev*.
  * Pemutar Video (*Embed YouTube / Vimeo / MP4*) untuk video teaser / prewedding (opsional).

### 4.7 Seksi 7: RSVP & Ucapan (Wishes)
* **Formulir Interaktif**:
  * Input Nama (otomatis terisi dari URL parameter nama tamu, namun tetap bisa diedit).
  * Pilihan Status Kehadiran (Hadir / Tidak Hadir / Masih Ragu).
  * Pilihan Jumlah Tamu (*Number of Guests / Pax*).
  * Kolom Pesan / Doa Restu (*Textarea*).
  * Tombol "Kirim Ucapan & Konfirmasi".
* **Daftar Ucapan (Guestbook Feed)**:
  * Menampilkan ucapan tamu sebelumnya dengan badge kehadiran.
  * Fitur scrollable / paginasi kartu ucapan.

### 4.8 Seksi 8: Gift / Tanda Kasih (Amplop Digital)
* **Metode 1: Transfer Bank**:
  * Logo Bank, Nomor Rekening, Atas Nama Pemilik Rekening.
  * Tombol **"Salin Nomor Rekening"** (*Copy to Clipboard*) dilengkapi notifikasi toast sukses salin.
* **Metode 2: QRIS / E-Wallet**:
  * Gambar QRIS untuk scan cepat GoPay/OVO/Dana/BCA/dll.
  * Tombol download / perbesar gambar QRIS.
* **Metode 3: Pengiriman Kado Fisik**:
  * Alamat penerima paket/kado.
  * Tombol **"Salin Alamat"**.

### 4.9 Seksi 9: Thanks / Penutup
* **Elemen**:
  * Kalimat terima kasih atas kehadiran dan doa restu para tamu.
  * Tanda tangan digital / nama kedua mempelai beserta keluarga besar.
  * Foto penutup / siluet.
  * Footer hak cipta / *Powered by* platform undangan digital.

---

## 5. Arsitektur Teknis & Struktur Data (ReactJS)

### 5.1 Tech Stack yang Direkomendasikan
| Komponen | Pilihan Teknologi | Alasan |
| :--- | :--- | :--- |
| **Framework** | ReactJS (Vite / Next.js) | Cepat, modular, ekosistem komponen luas |
| **Styling** | Tailwind CSS | Cepat menyusun mobile container & utility-first |
| **Icons** | Lucide React | Koleksi ikon modern, ringan, dan konsisten |
| **Animasi** | Framer Motion | Animasi scroll-trigger & modal lightbox halus |
| **Audio** | HTML5 Audio API + React State | Kontrol playback & autoplay trigger |
| **Storage RSVP** | Supabase / Firebase / REST API | Database real-time untuk ucapan & RSVP |

### 5.2 Standarisasi Skema Data Konten (`invitationData.json`)
Seluruh template undangan harus mengonsumsi 1 objek konfigurasi terpusat agar mudah diganti temanya tanpa mengubah kode komponen:

```json
{
  "event": {
    "title": "The Wedding of Dimas & Sarah",
    "theme": "floral-gold",
    "dateTarget": "2026-12-25T08:00:00+07:00",
    "audioUrl": "/audio/wedding-song.mp3"
  },
  "couple": {
    "groom": {
      "fullName": "Dimas Arya Wicaksana, S.T.",
      "nickName": "Dimas",
      "father": "Bapak Bambang Wicaksana",
      "mother": "Ibu Sri Rahayu",
      "instagram": "https://instagram.com/dimas",
      "photo": "/images/groom.jpg"
    },
    "bride": {
      "fullName": "Sarah Amelia Ramadhani, S.Farm.",
      "nickName": "Sarah",
      "father": "Bapak Hendro Prasetyo",
      "mother": "Ibu Nur Hasanah",
      "instagram": "https://instagram.com/sarah",
      "photo": "/images/bride.jpg"
    }
  },
  "quotes": {
    "source": "QS. Ar-Rum: 21",
    "content": "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri..."
  },
  "events": [
    {
      "id": "akad",
      "name": "Akad Nikah",
      "date": "Jumat, 25 Desember 2026",
      "time": "08:00 - 10:00 WIB",
      "venue": "Masjid Raya",
      "address": "Jl. Protokol No. 123, Jakarta",
      "googleMapsUrl": "https://maps.google.com/..."
    },
    {
      "id": "resepsi",
      "name": "Resepsi Pernikahan",
      "date": "Jumat, 25 Desember 2026",
      "time": "11:00 - 14:00 WIB",
      "venue": "Grand Ballroom Hotel Harmoni",
      "address": "Jl. Harmoni Indah No. 45, Jakarta",
      "googleMapsUrl": "https://maps.google.com/..."
    }
  ],
  "gallery": [
    { "type": "image", "url": "/images/gallery-1.jpg" },
    { "type": "image", "url": "/images/gallery-2.jpg" }
  ],
  "gifts": [
    {
      "type": "bank",
      "bankName": "BCA",
      "accountNumber": "1234567890",
      "accountHolder": "Putra Wira"
    }
  ]
}
```

### 5.3 Struktur Folder Proyek Standar
```text
src/
├── assets/             # Audio, gambar dekorasi, font
├── components/
│   ├── layout/
│   │   ├── MobileContainer.jsx   # Wrapper pembatas lebar mobile di desktop
│   │   ├── FloatingNavbar.jsx    # Navbar bawah rounded-full mengambang
│   │   └── AudioPlayer.jsx       # Tombol play/pause musik mengambang
│   ├── sections/
│   │   ├── 01_OpeningSection.jsx
│   │   ├── 02_CoupleSection.jsx
│   │   ├── 03_QuotesSection.jsx
│   │   ├── 04_EventSection.jsx
│   │   ├── 05_CountdownSection.jsx
│   │   ├── 06_GallerySection.jsx
│   │   ├── 07_RsvpSection.jsx
│   │   ├── 08_GiftSection.jsx
│   │   └── 09_ThanksSection.jsx
│   └── ui/                       # Modal, Toast, Button, Input reusable
├── hooks/
│   ├── useGuestName.js           # Hook ekstraksi & sanitasi URL query param (?name=...)
│   └── useCountdown.js           # Hook penghitung mundur waktu
├── data/
│   └── invitationData.json       # Sumber data konten terstandar
└── App.jsx
```

---

## 6. Kebutuhan Non-Fungsional (Non-Functional Requirements)

1. **Performa & Loading Speed**:
   * Optimasi aset gambar menggunakan format modern (*WebP / AVIF*).
   * Implementasi *lazy loading* pada seksi galeri dan aset di bawah lipatan layar pertama.
   * Target First Contentful Paint (FCP) < 1.5 detik pada jaringan 4G.
2. **Aksesibilitas & Responsivitas**:
   * Responsif di segala ukuran layar: mulai dari Android ukuran kecil (360px), iPhone modern (390-430px), hingga monitor Ultrawide (tetap terjaga di tengah layar).
   * Kontras warna teks memenuhi standar keterbacaan (WCAG AA).
3. **Pemberian Notifikasi Pengguna (Feedback)**:
   * Notifikasi toast ringkas saat berhasil menyalin nomor rekening ("Nomor rekening berhasil disalin!").
   * Konfirmasi visual saat form RSVP sukses dikirimkan.
4. **Keamanan & Validasi**:
   * Pembersihan input nama tamu dari karakter skrip berbahaya (*XSS protection*).
   * Validasi form ucapan untuk mencegah spam.

---

## 7. Roadmap & Tahapan Implementasi

| Fase | Tahapan | Output Utama |
| :---: | :--- | :--- |
| **Fase 1** | **PRD & Dokumentasi Arsitektur** | Dokumen PRD (.md & .pdf) disepakati |
| **Fase 2** | **Setup Boilerplate & Layout Dasar** | Setup React + Tailwind, `MobileContainer`, dan `FloatingNavbar` |
| **Fase 3** | **Integrasi URL Param & Audio Player** | Hook `useGuestName`, cover buka undangan, autoplay audio |
| **Fase 4** | **Pembangunan 9 Seksi Standar** | Komponen 01-Opening s/d 09-Thanks terintegrasi skema JSON |
| **Fase 5** | **Fitur Interaktif (RSVP, Copy, Lightbox)**| Form ucapan, fungsi salin rekening, modal galeri |
| **Fase 6** | **Uji Coba, Optimasi, & Standarisasi Template** | Testing lintas perangkat (iOS, Android, Laptop) & siap rilis |

---

*Dokumen ini disusun sebagai acuan tunggal (Single Source of Truth) dalam pembuatan template dan modul undangan digital berikutnya.*

