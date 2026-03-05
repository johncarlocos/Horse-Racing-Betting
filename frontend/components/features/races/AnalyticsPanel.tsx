import { AIWinDonutChart, MarketActivityChart, PedigreeRadarChart } from "@/components/charts";

type AnalyticsPanelProps = {
  pedigreeValues: number[];
  radarLabels: string[];
  winPct: number;
  donutSegments: number[];
};

export function AnalyticsPanel({ pedigreeValues, radarLabels, winPct, donutSegments }: AnalyticsPanelProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Pedigree Analysis */}
      <article className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 sm:p-5 lg:p-6">
        <h3 className="font-inter text-[22px] font-semibold text-white mb-4 sm:mb-6">Pedigree Analysis</h3>
        <div className="flex items-center justify-center min-h-[160px] w-full max-w-[160px] aspect-square sm:min-h-[240px] sm:max-w-[180px] mx-auto">
          <PedigreeRadarChart values={pedigreeValues} labels={radarLabels} />
        </div>
      </article>

      {/* AI Win Probability */}
      <article className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 sm:p-5 lg:p-6">
        <h3 className="font-inter text-[22px] font-semibold text-white mb-4 sm:mb-6">AI Win Probability</h3>
        <div className="flex items-center justify-center min-h-[160px] w-full max-w-[160px] aspect-square sm:min-h-[240px] sm:max-w-[200px] mx-auto">
          <AIWinDonutChart winPct={winPct} otherSegments={donutSegments} />
        </div>
      </article>

      {/* Market Activity */}
      <article className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 sm:p-5 lg:p-6 md:col-span-2 lg:col-span-1">
        <h3 className="font-inter text-[22px] font-semibold text-white mb-4 sm:mb-6">Market Activity</h3>
        <div className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-[240px]">
          <MarketActivityChart />
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-3 sm:mt-4 font-inter text-[11px] sm:text-xs text-white/80">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#28E88E]" />
              Odds Dropping
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              Odds Drifting
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
              Stable
            </span>
          </div>
        </div>
      </article>
    </section>
  );
}
