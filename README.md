# Wallib Dashboard

## Deploy to Vercel (2 minutes, free)

1. Go to vercel.com and sign in with GitHub
2. Click "Add New Project" → "Import from local folder"  
   (or drag-and-drop this folder)
3. No build settings needed — just click **Deploy**
4. Done! Vercel gives you a live URL like `wallib-dashboard.vercel.app`

## What's included

- `index.html` — the full dashboard (light mode, EN/ES, date filters)
- `api/mixpanel.js` — serverless proxy that calls Mixpanel securely (no CORS)
- `vercel.json` — routing config

## How the proxy works

The browser calls `/api/mixpanel?endpoint=segmentation&...`  
The serverless function forwards the request to Mixpanel with your secret key  
(kept server-side, never exposed to the browser)

## Local preview (no Mixpanel data)

Just open `index.html` directly — the CSV upload and CAC input work locally.  
Mixpanel data requires the Vercel deployment.

## CSV format expected

Your CSV should have these columns (any order, Spanish column names also work):
- `date` or `month` or `fecha` — e.g. `2025-01`
- `revenue` or `ingreso`
- `cost` or `costo` or `expense`
- `volume` or `total` or `amount`
