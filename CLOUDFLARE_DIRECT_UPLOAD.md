# Cloudflare Pages Direct Upload

1. Create a Pages Direct Upload project.
2. Upload the ROOT contents of this directory as a ZIP.
3. Make sure `_worker.js` is at the ZIP root.
4. Add `SUPABASE_URL` as an environment variable.
5. Add `SUPABASE_SECRET_KEY` as an encrypted secret.
6. Apply `supabase/0001_core.sql` in Supabase.
7. Test `/`, `/site.css`, `/app.js`, `/assets/real-car-before.jpg`, `/assets/real-car-after.jpg`, `/api/health`.

This package deliberately avoids a `/functions` directory and does not require Wrangler for the dashboard upload. Pages Advanced Mode uses `_worker.js`; the Worker forwards static requests to `env.ASSETS.fetch(request)`.
