import { useState } from "react";

const radiusOptions = [
  { label: "500 m", value: 500 },
  { label: "1,000 m", value: 1000 },
  { label: "2,000 m", value: 2000 },
  { label: "5,000 m", value: 5000 }
];

export default function SearchForm({ onResults, onStatusChange, status }) {
  const [form, setForm] = useState({
    businessType: "",
    location: "",
    radius: radiusOptions[1].value
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    onStatusChange({ loading: true, error: "" });

    try {
      const response = await fetch("/api/search-businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: form.businessType,
          location: form.location,
          radius: Number(form.radius)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed.");
      }

      onResults(data.results || []);
      onStatusChange({ loading: false, error: "" });
    } catch (error) {
      onStatusChange({ loading: false, error: error.message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:grid-cols-[2fr_2fr_1fr_auto]"
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-400">Business Type</label>
        <input
          name="businessType"
          value={form.businessType}
          onChange={handleChange}
          placeholder="Coffee shop, dentist, barber"
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-400">Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Denver"
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-400">Radius</label>
        <select
          name="radius"
          value={form.radius}
          onChange={handleChange}
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100"
        >
          {radiusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col justify-end">
        <button
          type="submit"
          className="rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white"
          disabled={status.loading}
        >
          {status.loading ? "Searching..." : "Search"}
        </button>
      </div>
      {status.error ? (
        <p className="md:col-span-4 rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {status.error}
        </p>
      ) : null}
    </form>
  );
}
