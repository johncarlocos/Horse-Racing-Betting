import type { HKJCRace } from "@/types/race-meeting";

type MatchCardProps = {
  race: HKJCRace;
  index: number;
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

export function MatchCard({ race, index, isSelected, onClick }: MatchCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border-l-4 p-4 transition-all ${
        isSelected
          ? "border-l-[#28E88E] shadow-[0px_34px_74px_0px_#00000052]"
          : "border-l-[#2a2a2a] bg-[#141414] hover:bg-[#1a1a1a]"
      }`}
      style={isSelected ? { background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.12) 100%)" } : undefined}
    >
      <h3 className="font-inter text-sm font-bold text-white mb-3">
        Match {index}: {race.raceName_en || `Race ${race.no}`}
      </h3>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-inter text-xs">
        <dt className="text-white/50">Front-runner bias</dt>
        <dd className="text-right text-red-400 font-medium">Detected</dd>

        <dt className="text-white/50">Class</dt>
        <dd className="text-right text-white font-medium">
          {race.distance ? `${race.distance}` : "-"} {race.raceTrack?.description_en || "Turf"}
        </dd>

        <dt className="text-white/50">Track</dt>
        <dd className="text-right text-[#28E88E] font-medium">{race.go_en || "-"}</dd>

        <dt className="text-white/50">Duration</dt>
        <dd className="text-right text-white font-medium">{formatTime(race.postTime)}</dd>
      </dl>
    </button>
  );
}
