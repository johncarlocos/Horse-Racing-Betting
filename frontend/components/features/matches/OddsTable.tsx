import type { OddsRow } from "@/types";

type OddsTableProps = {
  odds: OddsRow[];
};

export function OddsTable({ odds }: OddsTableProps) {
  return (
    <article className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 sm:p-5 lg:p-6 shadow-xl h-full min-w-0">
      <h2 className="font-inter text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Live Odds Matrix</h2>
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[360px] sm:min-w-[420px] font-inter text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/70">
              <th className="pb-2 sm:pb-3 pr-1.5 sm:pr-2 font-medium whitespace-nowrap">Horse</th>
              <th className="pb-2 sm:pb-3 pr-1.5 sm:pr-2 font-medium whitespace-nowrap">Odds</th>
              <th className="pb-2 sm:pb-3 pr-1.5 sm:pr-2 font-medium whitespace-nowrap">Trend</th>
              <th className="pb-2 sm:pb-3 pr-1.5 sm:pr-2 font-medium whitespace-nowrap">AI%</th>
              <th className="pb-2 sm:pb-3 pr-1.5 sm:pr-2 font-medium whitespace-nowrap">Speed</th>
              <th className="pb-2 sm:pb-3 pr-1.5 sm:pr-2 font-medium whitespace-nowrap">EV</th>
              <th className="pb-2 sm:pb-3 pr-1.5 sm:pr-2 font-medium whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {odds.map((row, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-2 sm:py-3 pr-1.5 sm:pr-2 text-white font-medium whitespace-nowrap">{row.horse}</td>
                <td className="py-2 sm:py-3 pr-1.5 sm:pr-2 text-white whitespace-nowrap">{row.odds}</td>
                <td className="py-2 sm:py-3 pr-1.5 sm:pr-2 whitespace-nowrap">
                  {row.trend === "up" ? (
                    <span className="text-[#28E88E]" aria-label="Up">↑</span>
                  ) : (
                    <span className="text-red-400" aria-label="Down">↓</span>
                  )}
                </td>
                <td className="py-2 sm:py-3 pr-1.5 sm:pr-2 text-white whitespace-nowrap">{row.ai}</td>
                <td className="py-2 sm:py-3 pr-1.5 sm:pr-2 text-white whitespace-nowrap">{row.speed}</td>
                <td
                  className={`py-2 sm:py-3 pr-1.5 sm:pr-2 font-medium whitespace-nowrap ${
                    row.ev.startsWith("+") ? "text-[#28E88E]" : "text-red-400"
                  }`}
                >
                  {row.ev}
                </td>
                <td className="py-2 sm:py-3 whitespace-nowrap">
                  <button type="button" className="font-medium text-[#28E88E] hover:underline text-left">
                    Click Here
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
