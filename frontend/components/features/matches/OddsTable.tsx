import type { HKJCRunner } from "@/types/race-meeting";

type OddsTableProps = {
  runners: HKJCRunner[];
};

export function OddsTable({ runners }: OddsTableProps) {
  const active = runners.filter((r) => r.status !== "Scratched");

  return (
    <article className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 sm:p-5 lg:p-6 shadow-xl h-full min-w-0">
      <h2 className="font-inter text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Racecard</h2>
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[500px] font-inter text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/70">
              <th className="pb-2 sm:pb-3 pr-2 font-medium w-8">No</th>
              <th className="pb-2 sm:pb-3 pr-2 font-medium">Horse</th>
              <th className="pb-2 sm:pb-3 pr-2 font-medium">Jockey</th>
              <th className="pb-2 sm:pb-3 pr-2 font-medium">Trainer</th>
              <th className="pb-2 sm:pb-3 pr-2 font-medium text-right">Draw</th>
              <th className="pb-2 sm:pb-3 pr-2 font-medium text-right">Wt</th>
              <th className="pb-2 sm:pb-3 pr-2 font-medium text-right">Rtg</th>
              <th className="pb-2 sm:pb-3 pr-2 font-medium text-center">Last 6</th>
              <th className="pb-2 sm:pb-3 font-medium text-right">Odds</th>
            </tr>
          </thead>
          <tbody>
            {active.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-white/40">
                  No runners available
                </td>
              </tr>
            ) : (
              active.map((runner) => {
                const odds = parseFloat(runner.winOdds);
                const isFav = !isNaN(odds) && odds < 5;
                return (
                  <tr key={runner.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-2 sm:py-3 pr-2 text-white/60 font-mono">{runner.no}</td>
                    <td className="py-2 sm:py-3 pr-2">
                      <div className="flex flex-col">
                        <span className="text-white font-medium whitespace-nowrap">{runner.name_en}</span>
                        {runner.gearInfo && (
                          <span className="text-white/40 text-[10px]">{runner.gearInfo}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 sm:py-3 pr-2 text-white/80 whitespace-nowrap">{runner.jockey.name_en}</td>
                    <td className="py-2 sm:py-3 pr-2 text-white/80 whitespace-nowrap">{runner.trainer.name_en}</td>
                    <td className="py-2 sm:py-3 pr-2 text-white text-right">{runner.barrierDrawNumber || "-"}</td>
                    <td className="py-2 sm:py-3 pr-2 text-white text-right">{runner.handicapWeight || "-"}</td>
                    <td className="py-2 sm:py-3 pr-2 text-white text-right">{runner.currentRating || "-"}</td>
                    <td className="py-2 sm:py-3 pr-2 text-white/70 text-center font-mono text-[11px] whitespace-nowrap">
                      {runner.last6run || "-"}
                    </td>
                    <td className="py-2 sm:py-3 text-right">
                      <span className={`font-semibold whitespace-nowrap ${isFav ? "text-[#28E88E]" : "text-white"}`}>
                        {runner.winOdds || "-"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}
