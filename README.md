# 7Theory — Static Cloudflare Build

This is a clean rebuild of the public website using the first theo7 design direction and the business-operations architecture from the production scaffold.

## Frontend
- Original dark/orange 7Theory visual direction.
- Original before/after images copied exactly from theo7.zip.
- Single static HTML/CSS/JS deployment.
- No Next.js/TanStack runtime required on Cloudflare upload.

## Backend
- `_worker.js` handles `/api/health`, `/api/contact`, `/api/quote`.
- Non-API requests use `env.ASSETS.fetch(request)`.
- Supabase URL and secret are runtime variables only.

## Direct Upload
Upload the files inside this directory as a ZIP with `_worker.js` at the archive root.

Required Cloudflare variables/secrets:
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY` (encrypted secret)

Apply `supabase/0001_core.sql` in the Supabase SQL editor before testing form submissions.

## Supabase key handling
The Worker sends the secret key in the `apikey` header only. It does not send an `Authorization: Bearer sb_secret_...` header.
