import { useMemo, useState } from "react";
import SearchForm from "./components/SearchForm.jsx";
import ResultsTable from "./components/ResultsTable.jsx";

const initialFilters = {
  category: "all",
  noWebsiteOnly: false
};

const createCsv = (rows) => {
  const headers = ["Name", "Category", "Address", "Phone", "Website", "Has Website"];
  const data = rows.map((row) => [
    row.name,
    row.category,
    row.address,
    row.phone || "",
    row.website || "",
    row.hasWebsite ? "Yes" : "No"
  ]);

  return [headers, ...data]
    .map((entry) => entry.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
    .join("\n");
};

export default function App() {
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [status, setStatus] = useState({ loading: false, error: "" });

  const filteredResults = useMemo(() => {
    return results.filter((item) => {
      if (filters.noWebsiteOnly && item.hasWebsite) {
        return false;
      }

      if (filters.category !== "all" && item.category !== filters.category) {
        return false;
      }

      return true;
    });
  }, [results, filters]);

  const categories = useMemo(() => {
    const options = new Set(results.map((item) => item.category).filter(Boolean));
    return ["all", ...options];
  }, [results]);

  const handleExport = () => {
    const csv = createCsv(filteredResults);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mapleads-results.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">MapLeads Finder</p>
          <h1 className="mt-2 text-3xl font-semibold">Discover local businesses missing a website.</h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            Search by location and business type, then filter the lead list to find prospects that need a digital presence.
          </p>
        </header>

        <SearchForm
          onResults={setResults}
          onStatusChange={setStatus}
          status={status}
        />

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Results</h2>
              <p className="text-sm text-slate-400">{filteredResults.length} leads shown</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-700 bg-slate-950"
                  checked={filters.noWebsiteOnly}
                  onChange={(event) =>
                    setFilters((prev) => ({ ...prev, noWebsiteOnly: event.target.checked }))
                  }
                />
                Show only businesses without a website
              </label>
              <select
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                value={filters.category}
                onChange={(event) => setFilters((prev) => ({ ...prev, category: event.target.value }))}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleExport}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900"
                disabled={filteredResults.length === 0}
              >
                Export CSV
              </button>
            </div>
          </div>

          <ResultsTable results={filteredResults} />
        </section>
      </div>
    </div>
  );
}
