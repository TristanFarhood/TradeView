function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">TradeView</h1>
          <p className="mt-2 text-sm text-slate-400">
            Track stocks, charts, and market trends.
          </p>
        </header>

        <main className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="rounded-2xl bg-slate-900 p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold">Chart Area</h2>
          </section>

          <section className="rounded-2xl bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Stock Details</h2>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;