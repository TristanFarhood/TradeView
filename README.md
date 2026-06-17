# TradeView

TradeView is a stock dashboard built with React, Vite, and Tailwind CSS. The current version ships as a polished mock trading interface with reusable components, responsive layouts, and structured market data that can later be replaced with a live API.

## Features

- Responsive multi-panel dashboard for desktop and mobile
- Interactive stock switching for `AAPL`, `MSFT`, `NVDA`, and `AMZN`
- SVG-based chart with `1D`, `1W`, `1M`, `3M`, and `1Y` range views
- Company snapshot, session metrics, watchlist, top movers, and portfolio allocation panels
- Reusable card-based UI structure for extending the dashboard
- Mock data layer designed to be swapped for Finnhub or another market data provider

## Tech Stack

- Frontend: React with Vite
- Styling: Tailwind CSS v4 with custom CSS
- Data: Local mock market data
- Planned API: Finnhub

## Project Structure

```text
trade-view/
  src/
    components/
      Card.jsx
      MainPage.jsx
    constants/
      configuration.js
      mock.js
    App.jsx
```

## Run Locally

```bash
cd trade-view
npm install
npm run dev
```

Build for production:

```bash
cd trade-view
npm run build
```

## Current Status

The dashboard UI is implemented and working with mock data. The main remaining product step is live stock search and API-backed quote and historical market data.

## Next Improvements

- Search by ticker or company name
- Live quote and candle integration
- Expanded charting and timeframe controls
- Better filtering and portfolio customization

## Author

Tristan Farhood  
Computer Science @ Western University
