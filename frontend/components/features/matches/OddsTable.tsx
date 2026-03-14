import type { HKJCRunner } from "@/types/race-meeting";

type OddsTableProps = {
  runners: HKJCRunner[];
};

function getTrend(runner: HKJCRunner): "up" | "down" {
  const odds = parseFloat(runner.winOdds);
  if (isNaN(odds)) return "up";
  return odds < 10 ? "up" : "down";
}

function getAiPercent(runner: HKJCRunner): string {
  const rating = parseFloat(runner.currentRating);
  if (isNaN(rating)) return "-";
  return `${Math.min(Math.round((rating / 130) * 100), 99)}%`;
}

function getEv(runner: HKJCRunner): string {
  const odds = parseFloat(runner.winOdds);
  const rating = parseFloat(runner.currentRating);
  if (isNaN(odds) || isNaN(rating) || odds === 0) return "-";
  const ev = ((rating / odds) - 10);
  return `${ev >= 0 ? "+" : ""}${Math.round(ev)}%`;
}

export function OddsTable({ runners }: OddsTableProps) {
  const active = runners.filter((r) => r.status !== "Scratched");

  return (
    <div className="h-full">
      <h2 className="font-inter text-lg font-semibold text-white mb-4">Live Odds Matrix</h2>
      <div className="overflow-x-auto">
        <table className="w-full font-inter text-sm">
          <thead>
            <tr className="text-white/50 text-xs">
              <th className="text-left pb-3 pr-4 font-medium">Horse</th>
              <th className="text-left pb-3 pr-4 font-medium">Odds</th>
              <th className="text-left pb-3 pr-4 font-medium">Trend</th>
              <th className="text-left pb-3 pr-4 font-medium">AI%</th>
              <th className="text-left pb-3 pr-4 font-medium">Speed</th>
              <th className="text-left pb-3 pr-4 font-medium">EV</th>
              <th className="text-left pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {active.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-white/40">
                  Select a race to view odds
                </td>
              </tr>
            ) : (
              active.map((runner) => {
                const trend = getTrend(runner);
                const ev = getEv(runner);
                const isPositiveEv = ev.startsWith("+");
                return (
                  <tr key={runner.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                    <td className="py-3 pr-4 text-white font-medium whitespace-nowrap">
                      #{runner.name_en}
                    </td>
                    <td className="py-3 pr-4 text-white">
                      {runner.winOdds || "-"}
                    </td>
                    <td className="py-3 pr-4">
                      {trend === "up" ? (
                        <span className="text-[#28E88E] text-base">&#8593;</span>
                      ) : (
                        <span className="text-red-400 text-base">&#8595;</span>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-white">
                      {getAiPercent(runner)}
                    </td>
                    <td className="py-3 pr-4 text-white">
                      {runner.currentRating || "-"}
                    </td>
                    <td className={`py-3 pr-4 font-medium ${isPositiveEv ? "text-[#28E88E]" : "text-red-400"}`}>
                      {ev}
                    </td>
                    <td className="py-3">
                      <span className="text-[#28E88E] text-xs font-medium cursor-pointer hover:underline">
                        Click Here
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
