import type { HKJCRace } from "@/types/race-meeting";

type MatchCardProps = {
  race: HKJCRace;
  isSelected: boolean;
  onClick: () => void;
};

function formatTime(isoString: string) {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleTimeString("en-HK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Hong_Kong",
  });
}

function statusColor(status: string) {
  if (status === "RESULTED") return "text-[#28E88E]";
  if (status === "GOING") return "text-yellow-400";
  if (status === "CLOSED") return "text-red-400";
  return "text-white/60";
}

export function MatchCard({ race, isSelected, onClick }: MatchCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[260px] min-w-[260px] shrink-0 rounded-xl border p-3 sm:w-auto sm:min-w-0 sm:p-4 text-left transition-all ${
        isSelected
          ? "border-[#28E88E]/40 bg-gradient-to-br from-[#1a3328] via-[#1e3d2e] to-[#152a22] shadow-[0px_34px_74px_0px_#00000052]"
          : "border-white/10 bg-[#1a1a1a] hover:bg-[#1f1f1f]"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-inter text-xs font-semibold text-[#28E88E] uppercase tracking-wide">
          Race {race.no}
        </span>
        <span className={`font-inter text-[10px] font-medium uppercase ${statusColor(race.status)}`}>
          {race.status}
        </span>
      </div>
      <h3 className="font-inter text-sm font-semibold text-white mb-2 leading-tight truncate">
        {race.raceName_en || `Race ${race.no}`}
      </h3>
      <dl className="space-y-1 font-inter text-xs">
        <div className="flex justify-between gap-2">
          <span className="text-white/60">Post Time</span>
          <span className="text-white">{formatTime(race.postTime)}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-white/60">Class</span>
          <span className="text-white">{race.raceClass_en || "-"}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-white/60">Distance</span>
          <span className="text-white">{race.distance ? `${race.distance}m` : "-"}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-white/60">Going</span>
          <span className="text-[#28E88E]">{race.go_en || "-"}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-white/60">Runners</span>
          <span className="text-white">{race.wageringFieldSize ?? race.runners?.length ?? "-"}</span>
        </div>
      </dl>
    </button>
  );
}
