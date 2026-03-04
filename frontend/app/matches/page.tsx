"use client";

import Image from "next/image";
import { useState } from "react";
import { Logo } from "@/components/ui";
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

/** Per-box left offset (lg) so each horse box aligns differently toward the track */
const HORSE_BOX_LEFT_OFFSET: Record<number, string> = {
  1: "lg:-ml-20 lg: mr-20",
  2: "lg:-ml-12  lg: mr-12",
  3: "lg:-ml-8  lg: mr-8",
  4: "lg:-ml-20  lg: mr-20",
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
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-4">
            <button type="button" className="relative rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white" aria-label="Profile">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-black" />
            </button>
            <button type="button" className="relative rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white" aria-label="Notifications">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-black" />
            </button>
            <button type="button" className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white" aria-label="Menu">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Match cards strip */}
        <section className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-4 min-w-max sm:min-w-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_MATCHES.map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => setSelectedMatchId(m.id)}
                className={`w-[280px] shrink-0 rounded-xl border border-white/10 p-4 sm:w-auto text-left transition-all  ${
                  selectedMatchId === m.id
                    ? "bg-[#252525] shadow-[0px_34px_74px_0px_#00000052]"
                    : "bg-[#1a1a1a] hover:bg-[#1f1f1f]"
                }`}
              >
                <h3 className="font-inter text-base font-semibold text-white mb-3">
                  Match {m.id}: {m.name}
                </h3>
                <dl className="space-y-1.5 font-inter text-sm">
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

        {/* Race detail + Leaderboard + Live Odds */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Left: Race detail + track + leaderboard */}
          <div className="xl:col-span-1 space-y-6">
            <article className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 sm:p-6 shadow-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0">
                    <Image src={RACE_HORSE} alt="" width={40} height={40} className="object-contain" />
                  </div>
                  <div>
                    <h2 className="font-inter text-xl font-bold text-white">
                      New Alley
                    </h2>
                    <p className="font-inter text-sm text-white/60 mt-0.5">
                      Match 1 | 23 Riders
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="shrink-0 rounded-[44px] border border-white font-inter text-sm font-medium text-white transition hover:opacity-90"
                    style={{
                      padding: "11px 32px",
                      background:
                        "radial-gradient(44.33% 44.33% at 50.2% 0%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
                    }}
                  >
                    View Analysis
                  </button>
                </div>
              </div>

              {/* Two-column: race path (left) + leaderboard cards (right) with connector lines */}
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[320px]">
                {/* Left: Race path with horses */}
                <div className="relative min-h-[240px] lg:min-h-[320px] rounded-xl overflow-hidden">
                  <div>
                    <Image
                      src={RACE_VECTOR}
                      alt="Race track"
                      width={260}
                      height={450}
                      className="object-contain object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Connector lines: path → cards (visible on lg) */}
                  <div className="absolute top-[60px] left-[60px]">
                    <Image
                      src={RACE_BAR1}
                      alt="Race Bar1"
                      width={70}
                      height={20}
                      className="object-contain object-center"
                    />
                  </div>
                  <div className="absolute top-[145px] left-[130px]">
                    <Image
                      src={RACE_BAR2}
                      alt="Race Bar2"
                      width={30}
                      height={20}
                      className="object-contain object-center"
                    />
                  </div>
                  <div className="absolute top-[230px] left-[150px]">
                    <Image
                      src={RACE_BAR3}
                      alt="Race Bar3"
                      width={30}
                      height={20}
                      className="object-contain object-center"
                    />
                  </div>
                  <div className="absolute top-[315px] left-[100px]">
                    <Image
                      src={RACE_BAR4}
                      alt="Race Bar4"
                      width={30}
                      height={20}
                      className="object-contain object-center"
                    />
                  </div>
                </div>

                {/* Right: Leaderboard cards — aligned with path, equal height */}
                <div className="flex flex-col justify-evenly gap-3 py-2 lg:py-4">
                  {MOCK_LEADERBOARD.map((row) => (
                    <div
                      key={row.position}
                      className={`rounded-xl bg-[#1e1e1e] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] border border-white/5 ${HORSE_BOX_LEFT_OFFSET[row.position]}`}
                    >
                      <div className="flex items-center justify-between gap-[10px]">
                        <span
                          className={`inline-flex h-[28px] min-w-[30px] shrink-0 items-center justify-center rounded-[8px] py-2 px-2.5 font-inter text-xs font-medium ${POSITION_STYLES[row.position]}`}
                        >
                          {row.position}
                          {row.position === 1 ? "st" : row.position === 2 ? "nd" : row.position === 3 ? "rd" : "th"}
                        </span>
                        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                          <span className="font-sans font-medium text-[18px] leading-[1.3] text-white">
                            {row.horse}
                          </span>
                          <p className="font-inter font-normal text-[12px] leading-[1.3] text-[#FFFFFF80] whitespace-nowrap">
                            {row.highlight}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="font-inter font-light text-[14px] leading-[1.4] tracking-[0.01em] text-[#B3B3B3]">
                            Win Rate
                          </p>
                          <p className="font-inter font-medium text-[14px] leading-[1.5] tracking-[0.01em] text-[#28E88E]">
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

          {/* Right: Live Odds Matrix */}
          <div className="xl:col-span-2">
            <article className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 sm:p-6 shadow-xl h-full">
              <h2 className="font-inter text-lg font-semibold text-white mb-4">
                Live Odds Matrix
              </h2>
              <div className="overflow-x-auto -mx-1">
                <table className="w-full min-w-[420px] font-inter text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-white/70">
                      <th className="pb-3 pr-2 font-medium">Horse</th>
                      <th className="pb-3 pr-2 font-medium">Odds</th>
                      <th className="pb-3 pr-2 font-medium">Trend</th>
                      <th className="pb-3 pr-2 font-medium">AI%</th>
                      <th className="pb-3 pr-2 font-medium">Speed</th>
                      <th className="pb-3 pr-2 font-medium">EV</th>
                      <th className="pb-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ODDS.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 pr-2 text-white font-medium">{row.horse}</td>
                        <td className="py-3 pr-2 text-white">{row.odds}</td>
                        <td className="py-3 pr-2">
                          {row.trend === "up" ? (
                            <span className="text-[#28E88E]" aria-label="Up">↑</span>
                          ) : (
                            <span className="text-red-400" aria-label="Down">↓</span>
                          )}
                        </td>
                        <td className="py-3 pr-2 text-white">{row.ai}</td>
                        <td className="py-3 pr-2 text-white">{row.speed}</td>
                        <td className={`py-3 pr-2 font-medium ${row.ev.startsWith("+") ? "text-[#28E88E]" : "text-red-400"}`}>
                          {row.ev}
                        </td>
                        <td className="py-3">
                          <button
                            type="button"
                            className="font-medium text-[#28E88E] hover:underline"
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
