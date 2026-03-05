import type { Match } from "@/types";

type MatchCardProps = {
  match: Match;
  isSelected: boolean;
  onClick: () => void;
};

export function MatchCard({ match, isSelected, onClick }: MatchCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[260px] min-w-[260px] shrink-0 rounded-xl border p-3 sm:w-auto sm:min-w-0 sm:p-4 text-left transition-all ${
        isSelected
          ? "border-[#28E88E]/40 bg-gradient-to-br from-[#1a3328] via-[#1e3d2e] to-[#152a22] shadow-[0px_34px_74px_0px_#00000052] lg:border-white/10 lg:bg-[#252525] lg:from-[#252525] lg:via-[#252525] lg:to-[#252525]"
          : "border-white/10 bg-[#1a1a1a] hover:bg-[#1f1f1f]"
      }`}
    >
      <h3 className="font-inter text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">
        Match {match.id}: {match.name}
      </h3>
      <dl className="space-y-1 sm:space-y-1.5 font-inter text-xs sm:text-sm">
        <div className="flex justify-between gap-2">
          <span className="text-white/60">Front-runner bias</span>
          <span className={match.frontRunnerBias === "Detected" ? "text-red-400" : "text-white/80"}>
            {match.frontRunnerBias}
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-white/60">Class</span>
          <span className="text-white">{match.class}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-white/60">Track</span>
          <span className="text-white">{match.track}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-white/60">Track (condition)</span>
          <span className="text-[#28E88E]">{match.trackCondition}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-white/60">Duration</span>
          <span className="text-white">{match.duration}</span>
        </div>
      </dl>
    </button>
  );
}
