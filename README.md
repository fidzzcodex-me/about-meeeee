# fidzzcodex-portfolio

Portfolio satu halaman bergaya terminal, dark gray. Next.js 14 (App Router), TypeScript, Tailwind CSS 3, Framer Motion, Font Awesome.

## Jalanin lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka http://localhost:3000. Commit `package-lock.json` yang dihasilkan `npm install` sebelum push pertama, karena workflow CI pakai `npm ci`.

## Script

| Script | Fungsi |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Build production |
| `npm run lint` | ESLint, nol warning |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | Lint, typecheck, build berurutan |

## Environment

| Variable | Default | Catatan |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://fidzzcodex.my.id` | Dipakai canonical, sitemap, OG, JSON-LD |
| `NEXT_PUBLIC_SITE_NAME` | `fidzzcodex` | |
| `NEXT_PUBLIC_GITHUB_USERNAME` | `fidzzcodex-me` | |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `628976386328` | Digit saja, format internasional |
| `NEXT_PUBLIC_CONTACT_EMAIL` | kosong | Kalau kosong, kartu email disembunyikan |

Semua nilai divalidasi di `src/lib/constants.ts`. Nilai tidak valid jatuh ke default.

## Struktur

```
fidzzcodex-portfolio/
├── .github/workflows/deploy.yml
├── public/                 favicon, logo, robots
├── src/
│   ├── app/                layout, page, fonts, sitemap, OG image
│   ├── components/
│   │   ├── layout/         Header, Footer, Container, Section
│   │   ├── sections/       Hero, About, Skills, Projects, Services, Contact
│   │   ├── terminal/       TerminalWindow, Line, Prompt, TypingEffect, BlinkingCursor
│   │   ├── ui/             Button, Card, Badge, Modal, Tooltip, ScrollIndicator
│   │   ├── file-tree/      FileTree, FileTreeItem, FileContent
│   │   ├── code-view/      CodeBlock, LineNumbers, SyntaxHighlight
│   │   ├── git-log/        GitLog, CommitItem, CommitDetail
│   │   └── common/         SectionTitle, FadeIn, SocialLinks, MotionProvider
│   ├── data/               profile, skills, projects, services, socials
│   ├── hooks/              useTypingEffect, useScrollSpy, useClipboard, useMediaQuery
│   ├── lib/                utils, constants, motion, og
│   └── types/index.ts
└── tailwind.config.ts      token warna dan font
```

## Edit konten

Semua konten ada di `src/data/`. Tambah project baru dengan menambah objek di `projects.ts`; git log, detail commit, dan modal mobile ikut otomatis.

## Keamanan

- Header di `next.config.js`: CSP, HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP.
- CSP memakai `'unsafe-inline'` untuk script dan style karena Next.js dan Framer Motion butuh inline. Trade-off: perlindungan XSS lebih lemah dibanding CSP berbasis nonce, yang memaksa semua halaman dirender dinamis.
- JSON-LD di-escape (`<`, `>`, `&`) sebelum disisipkan.
- Link eksternal pakai `rel="noopener noreferrer"`; URL project divalidasi harus `https:`.
- Tidak ada secret di frontend. Semua variable `NEXT_PUBLIC_*` bersifat publik.

## Aksesibilitas

Skip link, landmark semantik, `aria-current` di nav, tab navigasi keyboard (panah, Home, End) di file explorer, focus trap dan Escape di modal, `prefers-reduced-motion` dihormati lewat `MotionConfig`.

## Deploy ke Vercel

1. **Buat project:** vercel.com/new, import repo, framework Next.js. Di Settings > Git, matikan auto-deploy supaya tidak dobel dengan GitHub Actions.
2. **VERCEL_TOKEN:** vercel.com/account/tokens > Create Token.
3. **ORG_ID dan PROJECT_ID:** jalankan `npx vercel link` di lokal, lalu baca `.vercel/project.json` (`orgId`, `projectId`).
4. **GitHub Secrets:** Repo > Settings > Secrets and variables > Actions. Tambah `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. Tambah Variable `NEXT_PUBLIC_SITE_URL`. Buat Environment `production`.
5. **Environment variable di Vercel:** isi semua `NEXT_PUBLIC_*` di Project > Settings > Environment Variables.
6. **Custom domain:** Project > Settings > Domains > tambah domain. Di DNS: A record `76.76.21.21` untuk root, CNAME `cname.vercel-dns.com` untuk `www`.
7. **Rollback:** Deployments > pilih deployment lama > Promote to Production. Alternatif: `vercel rollback`, atau `git revert` lalu push.

Pipeline: push ke `main` menjalankan lint dan typecheck paralel, lalu build, lalu deploy.

```
push main
   |
   +--> lint ------+
   |               +--> build --> deploy (vercel pull -> build --prod -> deploy --prebuilt)
   +--> typecheck -+
```

## Catatan

- `public/robots.txt` menulis domain secara statis. Ganti baris `Sitemap:` kalau domain berubah.
- OG image dan Twitter image dibuat dinamis lewat `next/og` (`src/app/opengraph-image.tsx`), jadi tidak ada `og-image.png` statis.
- Lighthouse 95+ adalah target desain (font via `next/font`, code splitting per section, tanpa gambar berat), belum diukur karena belum ada build.

## Troubleshooting

| Gejala | Penyebab | Solusi |
| --- | --- | --- |
| `npm ci` error lockfile | `package-lock.json` belum di-commit | `npm install`, commit lockfile |
| `vercel pull` 403 | Token salah scope atau ORG_ID tidak cocok | Buat ulang token, cek `.vercel/project.json` |
| Deploy jalan dobel | Git integration Vercel masih aktif | Matikan di Settings > Git |
| Font tidak muncul saat build offline | `next/font/google` butuh akses ke Google saat build | Build di jaringan yang bisa akses fonts.googleapis.com |
| Ikon besar sesaat saat load | CSS Font Awesome tidak ter-load | Pastikan `fontawesome-svg-core/styles.css` di-import di `layout.tsx` dan `autoAddCss = false` |
| Console error CSP di dev | Skrip eksternal diblok | Tambahkan host ke direktif terkait di `next.config.js` |
| Kartu email tidak muncul | `NEXT_PUBLIC_CONTACT_EMAIL` kosong atau format salah | Isi dengan email valid |
