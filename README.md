# Ujian Tengah Semester (UTS) - Lab Pemrograman Mobile

Aplikasi mobile cross-platform berbasis **React Native** dan **Expo SDK 57** yang dibuat untuk memenuhi Ujian Tengah Semester (UTS) Ganjil Tahun Akademik 2026/2027 pada Program Studi **Teknologi Informasi**, Fakultas Ilmu Komputer, **Universitas Internasional Batam**.

---

## 👤 Data Mahasiswa & Repositori

- **Nama Mahasiswa:** Fadhlan Limanda
- **NPM:** 2532066
- **Program Studi:** Teknologi Informasi
- **Mata Kuliah:** Lab. Pemrograman Mobile (1 SKS)
- **Dosen Penguji:** Sandy Putra Effendi S.Pd

---

## 📱 Implementasi & Fitur Aplikasi

Aplikasi mengimplementasikan 2 soal UTS sesuai instruksi dan rubrik penilaian, ditambah dengan peningkatan antarmuka (UI/UX) modern:

### 1. Soal 1: Custom Reusable Component & Dynamic Props (Bobot: 50%)

- **Lokasi Berkas:** [`src/components/InfoCard.tsx`](src/components/InfoCard.tsx)
- **Props yang diterima:**
  - `title` (_string_): Judul mata kuliah / tugas.
  - `status` (_'selesai' | 'proses'_): Status pengerjaan tugas.
  - `onPress` (_function_): Callback fungsi saat tombol aksi ditekan.
- **Karakteristik & UI:**
  - Dibangun menggunakan core component `<View>` dan `<Text>`.
  - **Conditional Status Styling:** Badge **hijau** (`#d1fae5` / `#047857`) untuk status `'selesai'` dan badge **oranye** (`#ffedd5` / `#c2410c`) untuk status `'proses'`.
  - Tombol aksi interaktif menggunakan `<TouchableOpacity>` berlabel **"Lihat Detail"** yang memicu `onPress` (menampilkan dialog alert).
  - Dirender pada layar utama ([`src/app/index.tsx`](src/app/index.tsx)) sebanyak **3 kali** (melebihi batas minimum 2 kali pada soal) untuk mata kuliah Semester 3:
    1. _Lab. Pemrograman Mobile_ (status: `proses`)
    2. _Basis Data_ (status: `selesai`)
    3. _Rekayasa Perangkat Lunak_ (status: `selesai`)
- **Peningkatan UI/UX Tambahan:**
  - **Hero Gradient Card:** Bingkai gradasi Ocean Blue (`#0369a1`) dengan progress bar (67%) dan 3 kartu metrik (_Total Tugas: 3_, _Selesai: 2_, _Proses: 1_).

### 2. Soal 2: Real-Time Search Filter with FlatList & Static Data (Bobot: 50%)

- **Lokasi Berkas:** [`src/app/DaftarMahasiswa.tsx`](src/app/DaftarMahasiswa.tsx)
- **Karakteristik & Logika Wajib:**
  - Dataset statis `const DAFTAR_MAHASISWA` (5 data mahasiswa) didefinisikan di luar komponen utama.
  - State pencarian diatur menggunakan React hook `const [keyword, setKeyword] = useState('')`.
  - Input pencarian menggunakan `<TextInput>` controlled input terikat pada state `keyword` (`value` dan `onChangeText`).
  - Logika filter real-time menggunakan JavaScript method `.filter()` dan `.toLowerCase()` secara _case-insensitive_.
  - Menampilkan data menggunakan `<FlatList>` dengan 4 props wajib: `data`, `keyExtractor`, `renderItem`, dan `ListEmptyComponent` yang menampilkan teks `"Data tidak ditemukan!"` saat tidak ada hasil yang cocok.
- **Peningkatan UI/UX Tambahan:**
  - **Filter Chips Prodi:** Kategori chip cepat (_Semua_, _Sistem Informasi_, _Teknologi Informasi_, _Teknik Informatika_).
  - **Dynamic Counter Bar:** Menampilkan jumlah mahasiswa aktif secara dinamis (_"Menampilkan X dari 5 mahasiswa"_).
  - **Avatar Inisial:** Kartu mahasiswa dilengkapi lingkaran inisial nama.
  - **Slide-up Bottom Sheet Modal:** Menekan kartu mahasiswa akan memunculkan sheet rincian lengkap (ID Mahasiswa, Prodi, Tahun Ajaran, status 'Aktif') dengan tombol Tutup (touch target >= 44pt).

---

## 📂 Struktur Direktori Proyek

```text
├── assets/                  # Aset gambar & ikon
├── docs/                    # Berkas panduan & soal UTS
├── src/
│   ├── app/
│   │   ├── _layout.tsx      # Root Stack Navigator (Expo Router)
│   │   ├── index.tsx        # Layar Utama: Dashboard Stat & Soal 1 (InfoCard)
│   │   └── DaftarMahasiswa.tsx # Layar Soal 2: Direktori Mahasiswa (FlatList)
│   ├── components/
│   │   └── InfoCard.tsx     # Komponen kartu reusable Soal 1
│   └── constants/
│       └── colors.ts        # Design tokens & color palette
├── app.json                 # Konfigurasi Expo
├── package.json             # Dependensi & scripts
└── tsconfig.json            # Konfigurasi TypeScript
```

---

## 🚀 Panduan Menjalankan Aplikasi

### 1. Instalasi Dependensi

```bash
git clone https://github.com/Vizzly-nM09/UTS-Lab-Mobile-.git
cd UTS-Lab-Mobile
npm install
```

### 2. Menjalankan Server Development

```bash
npx expo start
```

Pilihan opsi testing:

- **Perangkat Fisik:** Scan QR code menggunakan kamera (iOS) atau aplikasi **Expo Go** (Android).
- **Web Browser:** Tekan tombol `w` pada terminal.
- **Android Emulator:** Tekan tombol `a` pada terminal.

### 3. Pengecekan Type Safety & Linting

```bash
npx tsc --noEmit
npx expo lint
```

---

## 📌 Catatan & Tujuan Proyek (Project Purpose)

Repositori ini dikembangkan secara khusus untuk memenuhi penilaian akademik **Ujian Tengah Semester (UTS / Midterm Assignment)** pada mata kuliah **Lab. Pemrograman Mobile (1 SKS)**, Program Studi **Teknologi Informasi**, Fakultas Ilmu Komputer, **Universitas Internasional Batam** (Tahun Akademik 2026/2027).

Seluruh kode sumber, arsitektur komponen, tata kelola berkas, dan dokumentasi ini disusun sebagai bagian dari pengerjaan praktikum serta bahan evaluasi penilaian ujian.
