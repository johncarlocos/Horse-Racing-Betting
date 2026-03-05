import Image from "next/image";
import type { LeaderboardRow } from "@/types";

const RACE_VECTOR = "/assets/race-vector.png";
const RACE_HORSE = "/assets/race-horse.png";
const RACE_BAR1 = "/assets/Vector-1.png";
const RACE_BAR2 = "/assets/Vector-2.png";
const RACE_BAR3 = "/assets/Vector-3.png";
const RACE_BAR4 = "/assets/Vector-4.png";

const POSITION_STYLES: Record<number, string> = {
  1: "bg-[#F7A83B] text-white",
  2: "bg-[#28E88E] text-white",
  3: "bg-[#3B82F6] text-white",
  4: "bg-[#8B5CF6] text-white",
};

const HORSE_BOX_LEFT_OFFSET: Record<number, string> = {
  1: "lg:-ml-20",
  2: "lg:-ml-12",
  3: "lg:-ml-8",
  4: "lg:-ml-20",
};

type RaceDetailPanelProps = {
  leaderboard: LeaderboardRow[];
};

export function RaceDetailPanel({ leaderboard }: RaceDetailPanelProps) {
  return (
    <article className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 sm:p-5 lg:p-6 shadow-xl min-w-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0">
            <Image src={RACE_HORSE} alt="" width={40} height={40} className="object-contain h-9 w-9 sm:h-10 sm:w-10" />
          </div>
          <div className="min-w-0">
            <h2 className="font-inter text-lg sm:text-xl font-bold text-white truncate">New Alley</h2>
            <p className="font-inter text-xs sm:text-sm text-white/60 mt-0.5">Match 1 | 23 Riders</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            className="shrink-0 rounded-[44px] border border-white font-inter text-xs sm:text-sm font-medium text-white transition hover:opacity-90 py-2 px-4 sm:py-[11px] sm:px-8"
            style={{
              background:
                "radial-gradient(44.33% 44.33% at 50.2% 0%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
            }}
          >
            View Analysis
          </button>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-0 items-center">
        {/* Race path */}
        <div className="">
          <Image src={RACE_VECTOR} alt="Race track" width={260} height={450} />
          <div className="absolute top-[60px] left-[60px] hidden min-[1600px]:block pointer-events-none">
            <Image src={RACE_BAR1} alt="" width={70} height={20} className="object-contain" />
          </div>
          <div className="absolute top-[145px] left-[130px] hidden min-[1600px]:block pointer-events-none">
            <Image src={RACE_BAR2} alt="" width={30} height={20} className="object-contain" />
          </div>
          <div className="absolute top-[230px] left-[150px] hidden min-[1600px]:block pointer-events-none">
            <Image src={RACE_BAR3} alt="" width={30} height={20} className="object-contain" />
          </div>
          <div className="absolute top-[315px] left-[100px] hidden min-[1600px]:block pointer-events-none">
            <Image src={RACE_BAR4} alt="" width={30} height={20} className="object-contain" />
          </div>
        </div>

        {/* Horse boxes */}
        <div className="flex flex-col gap-2 sm:gap-3 py-2 sm:py-3 lg:py-4 min-w-0">
          {leaderboard.map((row) => (
            <div
              key={row.position}
              className={`w-[250px] rounded-lg sm:rounded-xl bg-[#1e1e1e] p-3 sm:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] border border-white/5 min-w-0 ${HORSE_BOX_LEFT_OFFSET[row.position]}`}
            >
              <div className="flex items-center justify-between gap-2 sm:gap-[10px]">
                <span
                  className={`inline-flex h-6 sm:h-[28px] min-w-[26px] sm:min-w-[30px] shrink-0 items-center justify-center rounded-[8px] py-1.5 sm:py-2 px-2 sm:px-2.5 font-inter text-[11px] sm:text-xs font-medium ${POSITION_STYLES[row.position]}`}
                >
                  {row.position}
                  {row.position === 1 ? "st" : row.position === 2 ? "nd" : row.position === 3 ? "rd" : "th"}
                </span>
                <div className="flex flex-col gap-0.5 min-w-0 flex-1 overflow-hidden">
                  <span className="font-sans font-medium text-[15px] sm:text-[18px] leading-[1.3] text-white truncate">
                    {row.horse}
                  </span>
                  <p className="font-inter font-normal text-[11px] sm:text-[12px] leading-[1.3] text-[#FFFFFF80] whitespace-nowrap truncate">
                    {row.highlight}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-inter font-light text-[11px] sm:text-[14px] leading-[1.4] tracking-[0.01em] text-[#B3B3B3]">
                    Win Rate
                  </p>
                  <p className="font-inter font-medium text-[12px] sm:text-[14px] leading-[1.5] tracking-[0.01em] text-[#28E88E]">
                    {row.winRate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
