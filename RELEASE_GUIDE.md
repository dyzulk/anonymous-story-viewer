# Panduan Push & Publikasi Rilis Ekstensi

Dokumen ini menjelaskan tata cara persiapan dan peluncuran versi baru (*Release Tag*) untuk ekstensi browser **Anonymous Story Viewer**, yang terhubung langsung dengan alur otomatis CI/CD GitHub Actions.

---

## 1. Persiapan Kredensial & Secrets (GitHub Actions)

Pastikan seluruh secret berikut telah diisi pada menu **Settings > Secrets and variables > Actions** di repositori GitHub:

| Nama Secret | Deskripsi | Target Platform |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | API Key Google Gemini untuk pembuat AI Release Notes | GitHub Release Page |
| `CHROME_EXTENSION_ID` | Extension ID di Chrome Web Store | Chrome Web Store |
| `CHROME_CLIENT_ID` | OAuth Client ID Google Cloud Platform | Chrome Web Store |
| `CHROME_CLIENT_SECRET` | OAuth Client Secret Google Cloud Platform | Chrome Web Store |
| `CHROME_REFRESH_TOKEN` | OAuth Refresh Token akun developer Chrome | Chrome Web Store |
| `EDGE_PRODUCT_ID` | Product ID di Partner Center | Edge Add-ons |
| `EDGE_CLIENT_ID` | Client ID Publish API di Partner Center | Edge Add-ons |
| `EDGE_API_KEY` | API Key Publish API di Partner Center | Edge Add-ons |
| `AMO_EXTENSION_ID` | Extension ID / UUID di Mozilla AMO | Mozilla AMO |
| `AMO_JWT_ISSUER` | JWT Issuer Key dari Mozilla Developer Hub | Mozilla AMO |
| `AMO_JWT_SECRET` | JWT Secret Key dari Mozilla Developer Hub | Mozilla AMO |

---

## 2. Alur Eksekusi Push Rilis (Step-by-Step)

### Langkah 1: Pastikan Branch Utama Bersih & Teruji
```bash
git checkout main
git pull origin main
pnpm compile
```

### Langkah 2: Buat Tag Versi Baru (Format SemVer)
Gunakan format versi SemVer yang diawali huruf `v` (contoh: `v2.0.0`):
```bash
git tag -a v2.0.0 -m "Release v2.0.0"
```

### Langkah 3: Push Tag ke GitHub
```bash
git push origin main
git push origin v2.0.0
```

---

## 3. Arsitektur CI/CD Pipeline (2-Phase Workflow)

Setelah tag di-push, repositori akan menjalankan 2 workflow terpisah namun terintegrasi:

```
[ Push Tag (v2.0.0) ]
        │
        ▼
Phase 1: Build & Create Release (.github/workflows/create-release.yml)
        ├── 1. Build package ZIP (Chrome & Firefox)
        ├── 2. Generate AI Release Notes via Gemini API
        └── 3. Publish GitHub Release Page & lampirkan aset ZIP
        │
        ▼ (Event: Release Published)
Phase 2: Publish to Web Stores (.github/workflows/publish-stores.yml)
        ├── 1. Upload & submit ke Chrome Web Store
        ├── 2. Upload & submit ke Edge Add-ons
        └── 3. Upload & submit ke Mozilla AMO
```

---

## 4. Perintah Pembatalan & Pembersihan Tag (Jika Diperlukan)

Jika rilis perlu ditunda atau tag perlu dihapus dari lokal dan remote GitHub:

```bash
# Hapus tag di lokal
git tag -d v2.0.0

# Hapus tag di GitHub remote
git push origin --delete v2.0.0
```
