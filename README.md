# MKS CNC Markt

Arabic RTL CNC products storefront built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Features

- Responsive Arabic RTL storefront
- Product search, filtering, and sorting
- Product details modal
- Quote/cart drawer
- WhatsApp contact flow
- Optional live products from Supabase
- Demo products when Supabase is not configured
- Supabase realtime product updates when configured

## Run locally

**Requirements:** Node.js 18+

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open the local Vite URL shown in the terminal.

### Supabase setup

Create a `.env.local` file with:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

The app expects a public table named `cnc` with these columns:

- `id`
- `name`
- `photo`
- `type`
- `description`

If Supabase variables are missing, the site runs using its built-in demo products.

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## GitHub / Vercel / Netlify

1. Create a GitHub repository.
2. Upload the project files (do not upload `.env.local`).
3. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables on your hosting provider.
4. Build command: `npm run build`
5. Output directory: `dist`

## Security

Only the Supabase publishable/anon key belongs in a browser app. Do not put a Supabase service-role key, Gemini API key, or other private credentials in the frontend or GitHub repository.


## GitHub Pages deployment

This project is configured to deploy automatically to GitHub Pages.

### 1. Create the repository

Create a GitHub repository named **`mks-cnc-markt`** and push this project to the `main` branch.

### 2. Enable GitHub Pages

In the repository:

**Settings → Pages → Build and deployment → Source → GitHub Actions**

The workflow in `.github/workflows/deploy.yml` will build and deploy the site whenever you push to `main`.

### 3. Website URL

For a repository named `mks-cnc-markt`, GitHub Pages will use:

`https://YOUR-GITHUB-USERNAME.github.io/mks-cnc-markt/`

The Vite `base` setting is already configured for this repository name.

> If you use a different repository name, change `base` in `vite.config.ts` to `'/YOUR-REPOSITORY-NAME/'`.

### 4. Environment variables

Do not commit `.env` files or Supabase secrets. Add the required public configuration as GitHub Actions/Pages environment variables if the application needs them at build time.

The repository includes `.env.example` as a template.
