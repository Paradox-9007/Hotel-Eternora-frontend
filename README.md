# Hotel Eternora Frontend

Public frontend for the Hotel Eternora analytics experience. This repository contains the dashboard UI, locally bundled sample datasets, page routing, and client-side integrations for AI insights and hospitality news.

## Repository Scope

This repository is intentionally public.

- The frontend code, static assets, and dashboard datasets live here.
- The production AI backend is maintained in a separate private repository.
- People viewing this repository do not need backend source access to understand or run most of the UI.

Most dashboard views work from the bundled JSON data in `data-source/`. The AI insight panels, however, call a separately hosted backend service.

## Features

- Multi-page analytics UI for home, dashboard, data-source, news, and about views
- Local JSON-backed booking and client datasets for dashboard rendering
- AI insight panels powered through an external `/api/analyze` service
- Hospitality news sections powered by `TheNewsAPI`
- Express-based local dev server and Vercel-friendly routing

## Tech Stack

- HTML, CSS, and vanilla JavaScript
- Node.js + Express
- Bootstrap and Bootstrap Icons
- Marked for Markdown rendering

## Project Structure

```text
About/                    About page
Home/                     Landing page
NavBar/                   Shared navigation markup and loader
News/                     News page UI
api/                      Serverless handlers used for hosted environments
assets/                   Shared images and branding assets
dashboards/               Dashboard fragments and views
data-source/              Bundled sample datasets and data source page
shared/config/            Route and category configuration
shared/server/            News/analyze handlers used by the local server
shared/services/          Frontend data and news loading utilities
aiAnalysis.js             Frontend AI request client
dashboard.html            Main dashboard entry page
server.js                 Local Express server
vercel.json               Vercel routing configuration
```

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Optional environment variables

Create a `.env` file in the repository root if you want live news from `TheNewsAPI`:

```env
NEWS_API_KEY=your_thenewsapi_key
```

Notes:

- `NEWS_API_KEY` is only needed for the news sections.
- The core dashboard pages still load without it because the chart data is stored locally in this repository.

### 3. Start the local server

```bash
npm start
```

The app runs on `http://localhost:3001`.

Useful routes:

- `http://localhost:3001/`
- `http://localhost:3001/home`
- `http://localhost:3001/dashboard`
- `http://localhost:3001/data-source`
- `http://localhost:3001/news`
- `http://localhost:3001/about`

## AI Backend Integration

The AI panels do not use backend code from this repository. They call a separate service from [`aiAnalysis.js`](./aiAnalysis.js).

Current behavior:

- On `localhost`, the frontend expects an AI backend at `http://localhost:3000`.
- In non-local environments, it uses the `PROD_BACKEND_URL` value defined in `aiAnalysis.js`.

Expected API contract:

`POST /api/analyze`

Request body:

```json
{
  "prompt": "your dashboard analysis prompt"
}
```

Successful response:

```json
{
  "success": true,
  "data": "markdown-formatted analysis"
}
```

If you do not have access to the private backend repository, you still have two workable options:

- Run the frontend for UI and local dataset exploration only.
- Point `PROD_BACKEND_URL` or the local backend target to your own compatible service that implements the contract above.

## Deployment Notes

This repository includes [`vercel.json`](./vercel.json) for route rewrites.

For a public frontend deployment:

- Host this repository separately from the backend.
- Keep the backend deployment URL stable, because the AI client references it directly.
- Avoid exposing private backend source details in frontend environment docs or UI copy.

## Security Notes

- Never commit `.env` files or API keys.
- Treat `NEWS_API_KEY` as a secret even though it is only used server-side in the local/serverless news handlers.
- If you connect this frontend to a custom AI backend, apply authentication, rate limiting, and CORS restrictions on that backend.

## License

This repository is released under the MIT License. See [`LICENSE`](./LICENSE).
