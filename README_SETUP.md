# Hotel Eternora Analytics Dashboard

A professional analytics dashboard for Hotel Eternora featuring:
- Real-time booking and client analytics
- AI-powered insights using Gemini API
- Interactive charts and data visualization
- Responsive design with colorblind-friendly colors

## Features

- **Dashboard Analytics**: Track occupancy, revenue, and guest metrics
- **AI Assistant**: Get detailed analytical reports powered by Google Gemini
- **Data Visualization**: Interactive charts for bookings and performance metrics
- **Responsive Design**: Works on desktop and mobile devices
- **PDF Export**: Download dashboard reports as PDF

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=3000
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser to `http://localhost:3000`

## Project Structure

```
├── dashboard.html          # Main dashboard page
├── dashboards/            # Individual dashboard views
├── data-source/          # Data source pages (calendar, tables)
├── Home/                 # Home page
├── News/                 # News page
├── About/                # About page
├── NavBar/               # Navigation components
├── apiAnalysis.js        # AI analysis module
├── APIcaller.js          # API calling utilities
├── drawChart.js          # Chart rendering
└── config.js            # Configuration file
```

## Security Note

Never commit your API keys to version control. Always use environment variables via the `.env` file (which is excluded from git).

## License

ISC
