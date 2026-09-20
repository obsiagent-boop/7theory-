# 7Theory Studio Preview Report

## Rebuild goal

Rebuilt from the two supplied archives, preserving the first `theo7.zip` visual direction and the two verified original vehicle images, while folding the production business-operation concepts into the same design language.

## Frontend decisions

- No green/lime production palette.
- No blue/purple replacement UI.
- No inline single-page Worker HTML.
- No remote car-image dependencies for the operations sections.
- Static HTML/CSS/JS for the Cloudflare dashboard upload path.
- Original 7Theory dark/orange visual tokens, Inter + Playfair Display, rounded navigation/buttons, cinematic hero, reveal interaction, and editorial typography.
- Business operations are expressed as native sections: Services, Protection, 07 Process, Systems, Business Operations/Studio Worlds, Garage, Accessory Lab, Network, Stories, Brief.

## Preview checks

Rendered with a headless browser at desktop (1440x900) and mobile (390x844). The preview run reported zero page errors.

Interactive checks passed for:

- Mobile menu open/close
- 07 Process stage selection
- Systems selection
- Studio World selection
- Garage search/filter
- Quote calculator update
- Quote form success handling using a mocked API response

## Backend checks

The Worker module was syntax-checked and exercised with a mocked `env.ASSETS` binding and mocked Supabase REST responses.

Verified API routes:

- `GET /api/health`
- `POST /api/contact`
- `POST /api/quote`

Non-API requests fall through to:

`env.ASSETS.fetch(request)`

The Worker sends a Supabase secret key using the `apikey` header only; it does not send the `sb_secret_*` key as a Bearer token.

## Not claimed as completed

The real Supabase database was not migrated remotely because no Supabase Management credential was provided for database mutation, and the real Cloudflare account was not deployed from this environment. The package contains the SQL migration and the exact Cloudflare environment-variable requirements for that final external step.
