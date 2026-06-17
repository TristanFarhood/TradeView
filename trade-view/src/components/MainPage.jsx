import { useState } from "react";
import Card from "./Card";
import { chartConfiguration, rangeOptions } from "../constants/configuration";
import { dashboardData } from "../constants/mock";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

const formatPercent = (value) =>
  `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;

const buildChartPath = (points, width, height) => {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  return points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / range) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
};

const buildAreaPath = (linePath, width, height) =>
  `${linePath} L ${width} ${height} L 0 ${height} Z`;

const MainPage = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const [selectedRange, setSelectedRange] = useState("1M");

  const activeSymbol =
    dashboardData.symbols.find(({ symbol }) => symbol === selectedSymbol) ??
    dashboardData.symbols[0];

  const chartPoints = activeSymbol.chart[selectedRange];
  const chartWidth = 720;
  const chartHeight = 260;
  const chartPath = buildChartPath(chartPoints, chartWidth, chartHeight);
  const areaPath = buildAreaPath(chartPath, chartWidth, chartHeight);
  const isPositive = activeSymbol.change >= 0;
  const rangeMeta = chartConfiguration[selectedRange];

  return (
    <main className="dashboard-shell">
      <div className="dashboard-backdrop" />
      <div className="dashboard">
        <section className="hero">
          <div>
            <p className="eyebrow">TradeView</p>
            <h1>Mock trading desk for tracking leaders, risk and position health.</h1>
            <p className="hero-copy">{dashboardData.marketSummary.breadth}</p>
          </div>
          <div className="hero-pills">
            <span>{dashboardData.marketSummary.date}</span>
            <span>{dashboardData.marketSummary.session}</span>
          </div>
        </section>

        <section className="stats-row">
          {dashboardData.marketSummary.indices.map((index) => (
            <Card
              key={index.name}
              title={index.name}
              subtitle="Major index"
              className="compact-panel"
            >
              <div className="stat-block">
                <strong>{index.value}</strong>
                <span className={index.change >= 0 ? "positive" : "negative"}>
                  {formatPercent(index.change)}
                </span>
              </div>
            </Card>
          ))}
        </section>

        <section className="dashboard-grid">
          <Card
            title={`${activeSymbol.name} (${activeSymbol.symbol})`}
            subtitle={`${activeSymbol.exchange} • ${rangeMeta.label}`}
            className="chart-panel"
            action={
              <div className="range-tabs">
                {rangeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={option === selectedRange ? "range-tab active" : "range-tab"}
                    onClick={() => setSelectedRange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            }
          >
            <div className="price-strip">
              <div>
                <p className="price">{formatCurrency(activeSymbol.price)}</p>
                <p className={isPositive ? "positive" : "negative"}>
                  {formatCurrency(activeSymbol.changeValue)} ({formatPercent(activeSymbol.change)})
                </p>
              </div>
              <div className="mini-metrics">
                <span>Volume {activeSymbol.volume}</span>
                <span>Avg {activeSymbol.avgVolume}</span>
                <span>{rangeMeta.changeLabel}</span>
              </div>
            </div>

            <div className="chart-frame">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="chart-svg" role="img">
                <defs>
                  <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(247, 148, 29, 0.38)" />
                    <stop offset="100%" stopColor="rgba(247, 148, 29, 0)" />
                  </linearGradient>
                </defs>
                {[0.2, 0.4, 0.6, 0.8].map((line) => (
                  <line
                    key={line}
                    x1="0"
                    x2={chartWidth}
                    y1={chartHeight * line}
                    y2={chartHeight * line}
                    className="chart-gridline"
                  />
                ))}
                <path d={areaPath} fill="url(#chartArea)" />
                <path d={chartPath} className={isPositive ? "chart-line positive-stroke" : "chart-line negative-stroke"} />
              </svg>
            </div>

            <div className="chart-labels">
              {dashboardData.labels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </Card>

          <Card title="Focus list" subtitle="Rotate between tracked leaders" className="watchlist-panel">
            <div className="symbol-selector">
              {dashboardData.symbols.map((item) => (
                <button
                  key={item.symbol}
                  type="button"
                  className={item.symbol === activeSymbol.symbol ? "symbol-chip active" : "symbol-chip"}
                  onClick={() => setSelectedSymbol(item.symbol)}
                >
                  <strong>{item.symbol}</strong>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card title="Company snapshot" subtitle={activeSymbol.sentiment} className="overview-panel">
            <p className="overview-copy">{activeSymbol.overview}</p>
            <div className="metric-grid">
              <div>
                <span>Market cap</span>
                <strong>{activeSymbol.marketCap}</strong>
              </div>
              <div>
                <span>P/E ratio</span>
                <strong>{activeSymbol.peRatio}</strong>
              </div>
              <div>
                <span>Dividend yield</span>
                <strong>{activeSymbol.dividendYield}</strong>
              </div>
              <div>
                <span>52W high</span>
                <strong>{activeSymbol.high52w}</strong>
              </div>
            </div>
          </Card>

          <Card title="Session details" subtitle="Key market stats" className="details-panel">
            <div className="details-list">
              {activeSymbol.metrics.map((metric) => (
                <div key={metric.label} className="detail-row">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Watchlist" subtitle="Secondary names" className="secondary-panel secondary-a-panel">
            <div className="list-block">
              {dashboardData.watchlist.map((item) => (
                <div key={item.symbol} className="list-row">
                  <div>
                    <strong>{item.symbol}</strong>
                    <span>{item.name}</span>
                  </div>
                  <div className="align-right">
                    <strong>{item.price}</strong>
                    <span className={item.change >= 0 ? "positive" : "negative"}>
                      {formatPercent(item.change)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Top movers" subtitle="Highest velocity today" className="secondary-panel secondary-b-panel">
            <div className="list-block">
              {dashboardData.movers.map((item) => (
                <div key={item.symbol} className="list-row">
                  <div>
                    <strong>{item.symbol}</strong>
                    <span>{item.catalyst}</span>
                  </div>
                  <div className="align-right">
                    <strong className={item.change >= 0 ? "positive" : "negative"}>
                      {formatPercent(item.change)}
                    </strong>
                    <span>{item.direction === "up" ? "Momentum" : "Pullback"}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Portfolio mix" subtitle="Model allocation" className="positions-panel">
            <div className="positions-list">
              {dashboardData.positions.map((position) => (
                <div key={position.symbol} className="position-row">
                  <div className="position-header">
                    <strong>{position.symbol}</strong>
                    <span>{position.allocation}% allocated</span>
                  </div>
                  <div className="position-bar">
                    <span style={{ width: `${position.allocation}%` }} />
                  </div>
                  <p className={position.pnl >= 0 ? "positive" : "negative"}>
                    {formatPercent(position.pnl)} unrealized P/L
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default MainPage;
