# Brain Agent — $BRAIN Website

Standalone React + Vite website for the Brain Agent ($BRAIN) coin on Robinhood Chain.

## Deploy to Vercel (easiest)

1. Upload this folder to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects the settings from `vercel.json` — just click **Deploy**

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
```

Upload the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

## Customise

All editable content is in **`src/pages/BrainAgentPage.tsx`**:

| What to change | Where in the file |
|---|---|
| Contract Address | `const address = "CA: [To Be Announced]"` |
| Twitter link | `href: "#"` next to FaTwitter |
| Telegram link | `href: "#"` next to FaTelegramPlane |
| Discord link | `href: "#"` next to FaDiscord |
| Token supply / percentages | `tokenomicsData` array |
| Roadmap phases | `roadmapData` array |

## Netlify

Create a `_redirects` file in the `public/` folder with:
```
/* /index.html 200
```
