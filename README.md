# Kawaii Booth 🎀

A cute, browser-only photo booth app — webcam capture, live filters, drag-on stickers,
adjustable colored frames, and a strip builder. Everything runs client-side; no backend,
no accounts, nothing uploaded.

## Run locally

Requires Node.js 18+ installed.

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).
Your browser will ask for camera permission — allow it to use the Booth tab.

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The build output goes to `dist/`.

## Deploy to Vercel

**Option A — Vercel CLI (fastest)**

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts (accept the defaults — Vercel auto-detects Vite). For production:

```bash
vercel --prod
```

**Option B — Git + Vercel dashboard**

1. Push this folder to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Kawaii Booth"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: **Vite** (should auto-detect). Build command: `npm run build`.
   Output directory: `dist`.
4. Click **Deploy**.

That's it — Vercel gives you a live URL. Camera access requires HTTPS, which Vercel
provides automatically, so the webcam will work on the deployed site too.

## Notes

- Photos and strips only live in memory for the current browser session (no
  localStorage is used) — download anything you want to keep before closing the tab.
- Face-tracking stickers are placed manually by dragging, not auto-tracked — true
  real-time face detection needs a model that isn't bundled here to keep the app
  lightweight and fast to deploy.
