import type { RacecardRow } from "@/types";

const RANK_STYLES: Record<number, string> = {
  1: "bg-[#1a3328] border border-[#28E88E] text-white",
  2: "bg-[#1a3328] border border-[#28E88E] text-white",
  3: "bg-[#1a3328] border border-[#28E88E] text-white",
  4: "bg-[#1a1a1a] border border-[#fbbf24] text-white",
  5: "bg-[#1a1a1a] border border-[#fbbf24] text-white",
  6: "bg-[#1a1a1a] border border-[#fbbf24] text-white",
};

type SmartRacecardProps = {
  racecard: RacecardRow[];
};

export function SmartRacecard({ racecard }: SmartRacecardProps) {
  return (
    <section className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-3 sm:p-5 lg:p-6 h-full">
      <h2 className="font-inter text-base font-semibold text-white mb-3 sm:text-[22px] sm:mb-4">Smart Racecard</h2>
      <div className="overflow-hidden -mx-1">
        <table className="w-full font-inter text-xs sm:text-sm table-fixed">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/70 align-middle">
              <th className="pb-2 pr-2 font-medium text-xs whitespace-nowrap sm:pb-3 sm:pr-4 sm:text-[12.5px]">Rank</th>
              <th className="pb-2 pr-2 font-medium text-xs whitespace-nowrap sm:pb-3 sm:pr-4 sm:text-[12.5px]">Horse</th>
              <th className="pb-2 pr-2 font-medium text-xs whitespace-nowrap sm:pb-3 sm:pr-4 sm:text-[12.5px]">Jockey</th>
              <th className="pb-2 pr-2 font-medium text-xs whitespace-nowrap sm:pb-3 sm:pr-4 sm:text-[12.5px]">Turf</th>
              <th className="pb-2 pr-2 font-medium text-xs whitespace-nowrap sm:pb-3 sm:pr-4 sm:text-[12.5px]">Speed</th>
              <th className="pb-2 pr-2 font-medium text-xs whitespace-nowrap sm:pb-3 sm:pr-4 sm:text-[12.5px]">Class</th>
              <th className="pb-2 pr-2 font-medium text-xs whitespace-nowrap sm:pb-3 sm:pr-4 sm:text-[12.5px]">Win %</th>
              <th className="pb-2 font-medium text-xs whitespace-nowrap sm:pb-3 sm:text-[12.5px]">Bet Status</th>
            </tr>
          </thead>
          <tbody>
            {racecard.map((row) => (
              <tr key={row.rank} className="border-b border-white/5 hover:bg-white/5 transition-colors align-middle">
                <td className="align-middle py-2.5 pr-2 sm:py-3 sm:pr-4">
                  <span
                    className={`inline-flex min-w-[26px] h-7 items-center justify-center rounded-lg px-1.5 font-medium text-white sm:min-w-[28px] sm:h-8 sm:px-2 ${RANK_STYLES[row.rank]}`}
                  >
                    {row.rank}
                  </span>
                </td>
                <td className="align-middle py-2.5 pr-2 sm:py-3 sm:pr-4 max-w-[200px]">
                  <div className="min-w-0">
                    <p className="font-medium text-white truncate">{row.horse}</p>
                    <p className="text-white/60 text-[10px] sm:text-xs mt-0.5 line-clamp-1">
                      {row.age} · {row.sire}
                    </p>
                  </div>
                </td>
                <td className="align-middle py-2.5 pr-2 sm:py-3 sm:pr-4">
                  <div className="min-w-0">
                    <p className="font-medium text-white truncate">{row.jockey}</p>
                    <p className="text-white/60 text-[10px] sm:text-xs mt-0.5 truncate">{row.trainer}</p>
                  </div>
                </td>
                <td className="align-middle py-2.5 pr-2 text-white sm:py-3 sm:pr-4 whitespace-nowrap">{row.turf}</td>
                <td className="align-middle py-2.5 pr-2 text-white sm:py-3 sm:pr-4">{row.speed}</td>
                <td className="align-middle py-2.5 pr-2 text-white sm:py-3 sm:pr-4">{row.class}</td>
                <td className="align-middle py-2.5 pr-2 font-medium text-[#28E88E] sm:py-3 sm:pr-4">{row.winPct}</td>
                <td className="align-middle py-2.5 sm:py-3">
                  <span
                    className={`inline-block rounded-lg px-2 py-1 text-[10px] font-medium sm:px-3 sm:py-1.5 sm:text-xs ${
                      row.betStatus === "Accepting"
                        ? "bg-[#28E88E]/20 text-[#28E88E] border border-[#28E88E]/40"
                        : "bg-red-500/20 text-red-400 border border-red-500/40"
                    }`}
                  >
                    {row.betStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
