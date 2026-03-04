"use client";

import Image from "next/image";
import { useState } from "react";
import { ROUTES } from "@/lib/constants";

const RACE_VECTOR = "/assets/race-vector.png";
const RACE_HORSE = "/assets/race-horse.png";
const RACE_BAR1 = "/assets/Vector-1.png";
const RACE_BAR2 = "/assets/Vector-2.png";
const RACE_BAR3 = "/assets/Vector-3.png";
const RACE_BAR4 = "/assets/Vector-4.png";

const MOCK_MATCHES = [
  {
    id: "1",
    name: "New Alley",
    frontRunnerBias: "Detected",
    class: "Class III",
    track: "1200 Turf",
    trackCondition: "Good",
    duration: "14:20",
  },
  { id: "2", name: "Match 2", frontRunnerBias: "—", class: "Class II", track: "1000 Dirt", trackCondition: "Good", duration: "14:45" },
  { id: "3", name: "Match 3", frontRunnerBias: "—", class: "Class III", track: "1400 Turf", trackCondition: "Yielding", duration: "15:10" },
  { id: "4", name: "Match 4", frontRunnerBias: "—", class: "Class I", track: "1600 All-Weather", trackCondition: "Good", duration: "15:35" },
];

// Screen1: all rows show "Gold Highlight" and "Win Rate 32%"
const MOCK_LEADERBOARD = [
  { position: 1, horse: "Horse 3", highlight: "Gold Highlight", winRate: "32%" },
  { position: 2, horse: "Horse 3", highlight: "Gold Highlight", winRate: "32%" },
  { position: 3, horse: "Horse 3", highlight: "Gold Highlight", winRate: "32%" },
  { position: 4, horse: "Horse 3", highlight: "Gold Highlight", winRate: "32%" },
];

const POSITION_STYLES: Record<number, string> = {
  1: "bg-[#F7A83B] text-white",
  2: "bg-[#28E88E] text-white",
  3: "bg-[#3B82F6] text-white",
  4: "bg-[#8B5CF6] text-white",
};

/** Per-box left offset (lg only) so each horse box aligns differently toward the track */
const HORSE_BOX_LEFT_OFFSET: Record<number, string> = {
  1: "lg:-ml-20",
  2: "lg:-ml-12",
  3: "lg:-ml-8",
  4: "lg:-ml-20",
};

// Screen1: #Hamper89 red down, #Rambo89 green up
const MOCK_ODDS = [
  { horse: "#Hamper89", odds: "4.5", trend: "down", ai: "32%", speed: "91", ev: "+18%" },
  { horse: "#Rambo89", odds: "4.5", trend: "up", ai: "21%", speed: "4.84", ev: "-9%" },
  { horse: "#Rambo89", odds: "4.5", trend: "up", ai: "21%", speed: "4.84", ev: "-9%" },
  { horse: "#Peter89", odds: "4.5", trend: "up", ai: "15%", speed: "80", ev: "+4%" },
];

export default function MatchesPage() {
  const [selectedMatchId, setSelectedMatchId] = useState<string>("1");

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <main className="mx-auto w-full max-w-[1600px] space-y-4 sm:space-y-6 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {/* Match cards: horizontal scroll on mobile, green gradient when selected */}
        <section className="overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 scroll-smooth">
          <div className="flex gap-3 sm:gap-4 min-w-max sm:min-w-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_MATCHES.map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => setSelectedMatchId(m.id)}
                className={`w-[260px] min-w-[260px] shrink-0 rounded-xl border p-3 sm:w-auto sm:min-w-0 sm:p-4 text-left transition-all ${
                  selectedMatchId === m.id
                    ? "border-[#28E88E]/40 bg-gradient-to-br from-[#1a3328] via-[#1e3d2e] to-[#152a22] shadow-[0px_34px_74px_0px_#00000052] lg:border-white/10 lg:bg-[#252525] lg:from-[#252525] lg:via-[#252525] lg:to-[#252525]"
                    : "border-white/10 bg-[#1a1a1a] hover:bg-[#1f1f1f]"
                }`}
              >
                <h3 className="font-inter text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">
                  Match {m.id}: {m.name}
                </h3>
                <dl className="space-y-1 sm:space-y-1.5 font-inter text-xs sm:text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="text-white/60">Front-runner bias</span>
                    <span className={m.frontRunnerBias === "Detected" ? "text-red-400" : "text-white/80"}>{m.frontRunnerBias}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-white/60">Class</span>
                    <span className="text-white">{m.class}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-white/60">Track</span>
                    <span className="text-white">{m.track}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-white/60">Track (condition)</span>
                    <span className="text-[#28E88E]">{m.trackCondition}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-white/60">Duration</span>
                    <span className="text-white">{m.duration}</span>
                  </div>
                </dl>
              </button>
            ))}
          </div>
        </section>

        {/* Race detail + Leaderboard + Live Odds: stacked on mobile/tablet, 1+2 cols on xl */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
          {/* Left: Race detail + track + leaderboard */}
          <div className="xl:col-span-1 space-y-4 sm:space-y-6 min-w-0">
            <article className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 sm:p-5 lg:p-6 shadow-xl min-w-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0">
                    <Image src={RACE_HORSE} alt="" width={40} height={40} className="object-contain h-9 w-9 sm:h-10 sm:w-10" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-inter text-lg sm:text-xl font-bold text-white truncate">
                      New Alley
                    </h2>
                    <p className="font-inter text-xs sm:text-sm text-white/60 mt-0.5">
                      Match 1 | 23 Riders
                    </p>
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

              {/* Mobile: path left (narrow) + horse boxes right. LG: same 2-col, path larger. items-start keeps horse box column from stretching. */}
              <div className="relative grid grid-cols-2 gap-0 items-start">
                {/* Left: Race path — narrow strip on mobile, full column on lg; taller image, horse boxes stay content height */}
                <div className="">
                  <Image
                    src={RACE_VECTOR}
                    alt="Race track"
                    width={260}
                    height={450}
                    className=""
                  />
                  {/* Connector bars: only on lg when side-by-side layout; positions scaled for taller image */}
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

                {/* Right: Horse boxes — content height only (no stretch); compact spacing */}
                <div className="flex flex-col gap-2 sm:gap-3 py-2 sm:py-3 lg:py-4 min-w-0">
                  {MOCK_LEADERBOARD.map((row) => (
                    <div
                      key={row.position}
                      className={`rounded-lg sm:rounded-xl bg-[#1e1e1e] p-3 sm:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] border border-white/5 min-w-0 ${HORSE_BOX_LEFT_OFFSET[row.position]}`}
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
          </div>

          {/* Right: Live Odds Matrix — scrollable table on mobile */}
          <div className="xl:col-span-2 min-w-0">
            <article className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 sm:p-5 lg:p-6 shadow-xl h-full min-w-0">
              <h2 className="font-inter text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                Live Odds Matrix
              </h2>
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
                    {MOCK_ODDS.map((row, i) => (
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
                        <td className={`py-2 sm:py-3 pr-1.5 sm:pr-2 font-medium whitespace-nowrap ${row.ev.startsWith("+") ? "text-[#28E88E]" : "text-red-400"}`}>
                          {row.ev}
                        </td>
                        <td className="py-2 sm:py-3 whitespace-nowrap">
                          <button
                            type="button"
                            className="font-medium text-[#28E88E] hover:underline text-left"
                          >
                            Click Here
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
