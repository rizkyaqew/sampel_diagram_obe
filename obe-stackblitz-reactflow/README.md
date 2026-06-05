# Diagram Hirarki OBE dengan React Flow

Contoh project Vite + React untuk memvisualkan struktur OBE mata kuliah:

- CPL → CPMK → SCPMK → Asesmen
- Asesmen → Telusur Nilai
- Telusur Nilai → Nilai Akhir

Data contoh disimpan di `src/data/obeData.js` agar mudah diganti dari backend.

## Menjalankan di StackBlitz

1. Buat project baru di StackBlitz dengan template Vite + React.
2. Salin semua file project ini ke StackBlitz.
3. Jalankan `npm install`, lalu `npm run dev`.

## Catatan layout

Project ini tidak memakai posisi manual satu per satu. Posisi node dihitung otomatis berdasarkan asesmen sebagai leaf paling bawah, lalu parent ditempatkan di tengah anak-anaknya. Nilai jarak dapat diatur di `src/utils/buildFlow.js`:

- `NODE_WIDTH`
- `LEAF_STEP_X`
- `LEVEL_STEP_Y`
- `LEFT_PADDING`

Jika diagram masih terasa rapat, naikkan `LEAF_STEP_X` dan `LEVEL_STEP_Y`.
