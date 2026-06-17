# TradeView Dashboard

TradeView is a responsive stock dashboard built with React, Vite and Tailwind v4. The current build uses structured mock data so the interface is fully usable without wiring a live market API first.

## Included

- Multi-panel market dashboard with responsive desktop and mobile layouts
- Interactive symbol switching for `AAPL`, `MSFT`, `NVDA`, and `AMZN`
- Range-based SVG price chart with `1D`, `1W`, `1M`, `3M`, and `1Y` views
- Watchlist, movers, company snapshot, session details, and portfolio allocation panels
- Clean local data layer ready to swap for Finnhub or another market data provider

## Run

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Structure

```text
src/
  components/
    Card.jsx
    MainPage.jsx
  constants/
    configuration.js
    mock.js
```

## Next step for real data

Replace `src/constants/mock.js` with API-backed state and keep the UI contract intact. The current symbol objects already mirror the shape you would typically derive from quote, company profile, and historical candle endpoints.
