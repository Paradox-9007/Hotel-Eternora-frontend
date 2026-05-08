# Hotel Eternora Analytics Dashboard

A professional analytics dashboard for Hotel Eternora featuring:
- Local booking and client analytics for faster dashboard loads
- AI-powered insights using Gemini
- Travel news feeds powered by NewsData.io
- Interactive charts and data visualization
- Responsive layouts with colorblind-friendly colors

## Features

- **Dashboard Analytics**: Track occupancy, revenue, arrivals, departures, guest mix, and unit performance
- **AI Assistant**: Get detailed analytical reports powered by Google Gemini
- **Travel News**: Browse travel trends, technology, and association updates from NewsData.io
- **Responsive Design**: Works across desktop, tablet, and mobile screens
- **PDF Export**: Download dashboard reports as PDF

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   NEWS_API_KEY=your_newsdata_api_key_here
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser to `http://localhost:3000/` or `http://localhost:3000/home`

## Routes

- `/` and `/home` -> Home page
- `/dashboard` -> Dashboard page
- `/data-source` -> Calendar and data tables
- `/news` -> Travel news page
- `/about` -> About page

## Project Structure

```text
dashboard.html            # Main dashboard entry page
dashboards/               # Individual dashboard views
data-source/              # Data source page, calendar, and tables
Home/                     # Home page and homepage news module
News/                     # News page and news module
About/                    # About page
NavBar/                   # Navigation template and loader
shared/                   # Shared routes, services, and server handlers
APIcaller.js              # Shared booking/client data entrypoints
drawChart.js              # Chart rendering
server.js                 # Express dev server with clean routes
api/                      # Serverless API handlers
```

## Security Note

Never commit API keys to version control. Keep `GEMINI_API_KEY` and `NEWS_API_KEY` in `.env`, which is already ignored by git.

## License

ISC
