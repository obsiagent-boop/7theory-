# Supabase setup for 7Theory

Supabase project ID:

`bzjehlodtsoohslmldsd`

Derived project URL:

`https://bzjehlodtsoohslmldsd.supabase.co`

## Cloudflare runtime configuration

Add these separately in Cloudflare:

`SUPABASE_URL=https://bzjehlodtsoohslmldsd.supabase.co`

`SUPABASE_SECRET_KEY=<sb_secret_YvPW4X74YxCxYHfoCVAcBg_lHkEuifN>`

Optional for future browser-side Supabase use:

`SUPABASE_PUBLISHABLE_KEY=<sb_publishable_IxVfj7zuIdajjtYscIa8ug_VnykTiSi>`

The current site does not send the publishable key to the browser because the public forms are routed through the server-side Worker.

## Database migration

Run:

`supabase/0001_core.sql`

in the Supabase SQL editor.

## Key security

The secret key must stay in Cloudflare Secrets and must not be put into `index.html`, `app.js`, `_worker.js`, the ZIP, Git, or any public asset.

The secret key previously pasted into the chat should be rotated before production use.
