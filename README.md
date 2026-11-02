# TriTech Forge

Customer dashboard, admin dashboard, and Express API for orders, support chat, and the contact form.

## Local development

Run the API and the Vite app in two terminals:

```bash
npm install
npm run server
npm run dev
```

The site is at `http://localhost:5173`. Vite proxies `/api` to the API on port `5000`.

Default admin login after the database is created:

- Email: `admin@tritechforge.com`
- Password: `Admin@123`

Change that password before real use.

## Deploy on Vercel from GitHub

This repo is set up from the [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite) and [Express on Vercel](https://vercel.com/docs/frameworks/backend/express) guides.

1. Import `https://github.com/Mashilabbasi-lang/tritech-forge` at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Vite**. Build command and output are already in `vercel.json` (`npm run build`, `dist`).
3. Set the production branch to **`fresh2`** if that is the branch you want live. Vercel otherwise deploys the repository default branch.
4. Add an environment variable named `JWT_SECRET` with a long random value, then redeploy. Client requests stay on `/api`, so `VITE_API_URL` should stay empty.
5. `vercel.json` sends every non-API route to `index.html` so dashboard URLs such as `/dashboard` and `/admin/dashboard` work on refresh.

The API entry is `api/[[...path]].js`. It exports the Express app, which is what Vercel runs as one Function. Static files come from the Vite build, not from `express.static()`.

### Data on Vercel

The API uses SQLite. Vercel Functions can only write to `/tmp`, and that disk is wiped when a new instance starts. Accounts, orders, and messages created on Vercel can disappear after a cold start. The default admin and products are recreated automatically. For a lasting store, move the database to a hosted service such as Vercel Postgres or Turso and keep `JWT_SECRET` in project settings.
