# Ujian Tengah Semester (UTS) - Lab Pemrograman Mobile

Aplikasi mobile cross-platform berbasis **React Native** dan **Expo SDK 57** yang dibuat untuk memenuhi Ujian Tengah Semester (UTS) Ganjil Tahun Akademik 2026/2027 pada Program Studi **Teknologi Informasi**, Fakultas Ilmu Komputer, **Universitas Internasional Batam**.

---

## 👤 Data Mahasiswa

- **Nama Mahasiswa:** Fadhlan Limanda
- **NPM:** 2532066
- **Program Studi:** Teknologi Informasi
- **Mata Kuliah:** Lab. Pemrograman Mobile (1 SKS)
- **Dosen Penguji:** Sandy Putra Effendi S.Pd

---

## 📱 Implementasi Soal Ujian

Aplikasi mengimplementasikan 2 soal UTS sesuai instruksi dan rubrik penilaian:

### 1. Soal 1: Custom Reusable Component & Dynamic Props (Bobot: 50%)

- **Lokasi File:** [`src/components/InfoCard.tsx`](src/components/InfoCard.tsx)
- **Props yang diterima:**
  - `title` (_string_): Judul tugas / informasi.
  - `status` (_'selesai' | 'proses'_): Status pengerjaan tugas.
  - `onPress` (_function_): Callback fungsi saat tombol aksi ditekan.
- **Karakteristik & UI:**
  - Dibangun menggunakan core component `<View>` dan `<Text>`.
  - Conditional status styling: badge **hijau** untuk status `'selesai'` dan badge **oranye** untuk status `'proses'`.
  - Tombol aksi interaktif menggunakan `<TouchableOpacity>` dengan teks label **"Lihat Detail"** yang memicu pemanggilan prop `onPress`.
  - Dirender pada layar utama ([`src/app/index.tsx`](src/app/index.tsx)) sebanyak 2 kali dengan data judul dan status berbeda.

### 2. Soal 2: Real-Time Search Filter with FlatList & Static Data (Bobot: 50%)

- **Lokasi File:** [`src/app/DaftarMahasiswa.tsx`](src/app/DaftarMahasiswa.tsx)
- **Karakteristik & Logika:**
  - Dataset statis `const DAFTAR_MAHASISWA` (5 data mahasiswa) didefinisikan di luar komponen utama.
  - State pencarian diatur menggunakan React hook `const [keyword, setKeyword] = useState('')`.
  - Input pencarian menggunakan `<TextInput>` controlled input terikat pada state `keyword` (`value` dan `onChangeText`).
  - Logika filter real-time menggunakan JavaScript method `.filter()` dan `.toLowerCase()` untuk pencocokan nama mahasiswa secara case-insensitive.
  - Hasil filter ditampilkan menggunakan `<FlatList>` dengan props wajib: `data`, `keyExtractor`, `renderItem`, dan `ListEmptyComponent` yang menampilkan teks `"Data tidak ditemukan!"` saat tidak ada hasil yang cocok.

---

## 📂 Struktur Direktori Proyek

```text
├── assets/                  # Aset gambar & ikon
├── docs/                    # Berkas panduan & soal UTS
├── src/
│   ├── app/
│   │   ├── _layout.tsx      # Root Stack Navigator (Expo Router)
│   │   ├── index.tsx        # Layar Utama: Identitas & Soal 1 (InfoCard)
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
