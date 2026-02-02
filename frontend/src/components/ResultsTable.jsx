export default function ResultsTable({ results }) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-800">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-slate-900 text-slate-300">
          <tr>
            <th className="px-4 py-3">Business</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Address</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Website</th>
          </tr>
        </thead>
        <tbody>
          {results.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                Run a search to see leads.
              </td>
            </tr>
          ) : (
            results.map((lead, index) => (
              <tr key={`${lead.name}-${index}`} className="border-t border-slate-800">
                <td className="px-4 py-3 font-medium text-slate-100">{lead.name}</td>
                <td className="px-4 py-3 text-slate-300">{lead.category}</td>
                <td className="px-4 py-3 text-slate-300">{lead.address}</td>
                <td className="px-4 py-3 text-slate-300">{lead.phone || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-2">
                    {lead.website ? (
                      <a
                        href={lead.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-300 hover:text-indigo-200"
                      >
                        {lead.website}
                      </a>
                    ) : (
                      <span className="text-slate-500">No website</span>
                    )}
                    <span
                      className={`inline-flex w-fit items-center rounded-full px-2 py-1 text-xs font-semibold ${
                        lead.hasWebsite
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-rose-500/15 text-rose-300"
                      }`}
                    >
                      {lead.hasWebsite ? "Has Website" : "No Website"}
                    </span>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
