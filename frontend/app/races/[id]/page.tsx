"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ROUTES } from "@/lib/constants";

const RACE_HORSE = "/assets/race-horse.png";

const MOCK_RACE = {
  id: "1",
  raceNumber: 1,
  name: "Opening Sprint",
  venue: "Royal Axcot",
  time: "02:00 PM",
  distance: "1200m",
  going: "Firm",
  status: "UPCOMING" as const,
  prizePool: "$150,000",
  fieldSize: "6 Horses",
  topFavourite: "2.8",
  longshot: "15.0",
};

const MOCK_RACECARD = [
  {
    rank: 1,
    horse: "Golden Arrow",
    age: "5yo",
    sire: "Dubwai",
    jockey: "J. Smith",
    trainer: "T. Brown",
    turf: "Course B",
    speed: 97,
    class: 92,
    winPct: "32.2%",
    betStatus: "Closed" as const,
  },
  {
    rank: 2,
    horse: "Silver Bolt",
    age: "4yo",
    sire: "Frankel",
    jockey: "A. Jones",
    trainer: "R. Wilson",
    turf: "Course B",
    speed: 95,
    class: 90,
    winPct: "28.1%",
    betStatus: "Accepting" as const,
  },
  {
    rank: 3,
    horse: "Storm Runner",
    age: "6yo",
    sire: "Galileo",
    jockey: "M. Davis",
    trainer: "K. Evans",
    turf: "Course A",
    speed: 93,
    class: 88,
    winPct: "24.5%",
    betStatus: "Accepting" as const,
  },
  {
    rank: 4,
    horse: "Thunder Strike",
    age: "5yo",
    sire: "Sea The Stars",
    jockey: "C. Lee",
    trainer: "P. Clark",
    turf: "Course B",
    speed: 91,
    class: 86,
    winPct: "18.2%",
    betStatus: "Accepting" as const,
  },
  {
    rank: 5,
    horse: "Wind Dancer",
    age: "4yo",
    sire: "Kingman",
    jockey: "L. Taylor",
    trainer: "S. Moore",
    turf: "Course A",
    speed: 89,
    class: 84,
    winPct: "12.0%",
    betStatus: "Accepting" as const,
  },
  {
    rank: 6,
    horse: "Night Shadow",
    age: "5yo",
    sire: "Camelot",
    jockey: "D. Wright",
    trainer: "N. Harris",
    turf: "Course B",
    speed: 87,
    class: 82,
    winPct: "8.5%",
    betStatus: "Accepting" as const,
  },
];

/** Rank badge: 1–3 dark green + lime border; 4–6 dark gray + golden border; pill shape */
const RANK_STYLES: Record<number, string> = {
  1: "bg-[#1a3328] border border-[#28E88E] text-white",
  2: "bg-[#1a3328] border border-[#28E88E] text-white",
  3: "bg-[#1a3328] border border-[#28E88E] text-white",
  4: "bg-[#1a1a1a] border border-[#fbbf24] text-white",
  5: "bg-[#1a1a1a] border border-[#fbbf24] text-white",
  6: "bg-[#1a1a1a] border border-[#fbbf24] text-white",
};

/** Radar chart axes: Surface, Speed, Class, Distance, Form (values 0–100) */
const PEDIGREE_VALUES = [85, 92, 78, 88, 82];
const RADAR_LABELS = ["Surface", "Speed", "Class", "Distance", "Form"];

/** Donut segment percentages for AI Win Probability (other horses) */
const DONUT_SEGMENTS = [25, 20, 15, 10]; // remaining % after 35.2% win

export default function RaceDetailPage() {
  const params = useParams();
  const id = (params?.id as string) ?? "1";
  const race = MOCK_RACE;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <main className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Back link */}
        <Link
          href={ROUTES.MATCHES}
          className="inline-flex items-center gap-1.5 font-inter text-sm text-white/80 transition hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Race title block */}
        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative h-10 w-10 shrink-0 flex items-center justify-center">
              <Image src={RACE_HORSE} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            </div>
            <div className="min-w-0">
              <p className="font-inter text-[18px] text-white/70">Race {race.raceNumber}</p>
              <h1 className="font-inter text-[30px] font-bold text-white mt-[-8px]">{race.name}</h1>
              <p className="font-inter text-[16px] text-white/60 mt-[-5px] flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>{race.venue}</span>
                <span className="text-white/40">•</span>
                <span>{race.time}</span>
                <span className="text-white/40">•</span>
                <span>{race.distance}</span>
                <span className="text-white/40">•</span>
                <span className="text-[#28E88E]">{race.going}</span>
              </p>
            </div>
          </div>
          <span
            className="inline-flex shrink-0 items-center justify-center rounded-[44px] p-[1px] w-[99px] h-[29px]"
            style={{
              background: "radial-gradient(58.97% 354.93% at 15.38% 13.16%, #28E88E 0%, #168250 100%)",
            }}
          >
            <span
              className="flex h-full w-full items-center justify-center rounded-[43px] font-inter font-medium text-[14px] leading-[100%] tracking-[-0.03em] text-center text-white"
              style={{
                padding: "6px 12px",
                background: "#0d0d0d",
              }}
            >
              {race.status}
            </span>
          </span>
        </section>

        {/* Key race statistics bar */}
        <section className="rounded-xl border border-white/10 bg-[#1E1E1E] p-4 sm:p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0">
            <div className="text-center sm:text-left">
              <p className="font-inter text-2xl sm:text-[18px] font-semibold text-white">{race.prizePool}</p>
              <p className="font-inter text-xs sm:text-[14px] text-white/60 mt-1">Prize Pool</p>
            </div>
            <div className="text-center sm:text-left border-t border-white/10 sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
              <p className="font-inter text-2xl sm:text-[18px] font-semibold text-white">{race.fieldSize}</p>
              <p className="font-inter text-xs sm:text-[14px] text-white/60 mt-1">Field Size</p>
            </div>
            <div className="text-center sm:text-left border-t border-white/10 sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
              <p className="font-inter text-2xl sm:text-[18px] font-semibold text-white">{race.topFavourite}</p>
              <p className="font-inter text-xs sm:text-[14px] text-white/60 mt-1">Top Favourite</p>
            </div>
            <div className="text-center sm:text-left border-t border-white/10 sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
              <p className="font-inter text-2xl sm:text-[18px] font-semibold text-white">{race.longshot}</p>
              <p className="font-inter text-xs sm:text-[14px] text-white/60 mt-1">Longshot</p>
            </div>
          </div>
        </section>

        {/* Smart Racecard table */}
        <section className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 sm:p-5 lg:p-6">
          <h2 className="font-inter text-base sm:text-[22px] font-semibold text-white mb-4">Smart Racecard</h2>
          <div className="overflow-x-auto -mx-1">
            <table className="w-full min-w-[720px] font-inter text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-white/70">
                  <th className="pb-3 pr-4 font-medium text-[12.5px] whitespace-nowrap">Rank</th>
                  <th className="pb-3 pr-4 font-medium text-[12.5px] whitespace-nowrap">Horse</th>
                  <th className="pb-3 pr-4 font-medium text-[12.5px] whitespace-nowrap">Jockey</th>
                  <th className="pb-3 pr-4 font-medium text-[12.5px] whitespace-nowrap">Turf</th>
                  <th className="pb-3 pr-4 font-medium text-[12.5px] whitespace-nowrap">Speed</th>
                  <th className="pb-3 pr-4 font-medium text-[12.5px] whitespace-nowrap">Class</th>
                  <th className="pb-3 pr-4 font-medium text-[12.5px] whitespace-nowrap">Win %</th>
                  <th className="pb-3 font-medium text-[12.5px] whitespace-nowrap">Bet Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_RACECARD.map((row) => (
                  <tr key={row.rank} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-flex min-w-[28px] h-8 items-center justify-center rounded-lg px-2 font-medium text-white ${RANK_STYLES[row.rank]}`}
                      >
                        {row.rank}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div>
                        <p className="font-medium text-white">{row.horse}</p>
                        <p className="text-white/60 text-[11px] sm:text-xs mt-0.5">
                          {row.age} · {row.sire}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div>
                        <p className="font-medium text-white">{row.jockey}</p>
                        <p className="text-white/60 text-[11px] sm:text-xs mt-0.5">{row.trainer}</p>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-white">{row.turf}</td>
                    <td className="py-3 pr-4 text-white">{row.speed}</td>
                    <td className="py-3 pr-4 text-white">{row.class}</td>
                    <td className="py-3 pr-4 font-medium text-[#28E88E]">{row.winPct}</td>
                    <td className="py-3">
                      <span
                        className={`inline-block rounded-lg px-3 py-1.5 text-xs font-medium ${
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

        {/* Analytical panels: Pedigree, AI Win Probability, Market Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Pedigree Analysis — radar chart */}
          <article className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 sm:p-5 lg:p-6">
            <h3 className="font-inter text-base font-semibold text-white mb-6">Pedigree Analysis</h3>
            <div className="flex items-center justify-center min-h-[240px]">
              <PedigreeRadarChart values={PEDIGREE_VALUES} labels={RADAR_LABELS} />
            </div>
          </article>

          {/* AI Win Probability — donut */}
          <article className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 sm:p-5 lg:p-6">
            <h3 className="font-inter text-base font-semibold text-white mb-6">AI Win Probability</h3>
            <div className="flex items-center justify-center min-h-[240px]">
              <AIWinDonutChart winPct={35.2} otherSegments={DONUT_SEGMENTS} />
            </div>
          </article>

          {/* Market Activity — scatter + legend */}
          <article className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#1a1a1a] p-4 sm:p-5 lg:p-6">
            <h3 className="font-inter text-base font-semibold text-white mb-6">Market Activity</h3>
            <div className="flex flex-col items-center justify-center min-h-[240px]">
              <MarketActivityChart />
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 font-inter text-xs text-white/80">
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
      </main>
    </div>
  );
}

function PedigreeRadarChart({ values, labels }: { values: number[]; labels: string[] }) {
  const size = 180;
  const center = size / 2;
  const radius = 70;
  const n = values.length;
  const points: { x: number; y: number }[] = [];
  const labelPoints: { x: number; y: number; text: string }[] = [];
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const r = (values[i] / 100) * radius;
    points.push({ x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) });
    const lr = radius + 24;
    labelPoints.push({
      x: center + lr * Math.cos(angle),
      y: center + lr * Math.sin(angle),
      text: labels[i],
    });
  }
  const fillPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  const gridPath = Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
  })
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ") + " Z";

  return (
    <svg width={size} height={size} className="overflow-visible">
      {/* grid lines */}
      {[0.25, 0.5, 0.75, 1].map((scale) => {
        const pts = points.map((p) => ({
          x: center + (p.x - center) * scale,
          y: center + (p.y - center) * scale,
        }));
        const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
        return <path key={scale} d={d} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />;
      })}
      {/* fill */}
      <path d={fillPath} fill="rgba(40,232,142,0.35)" stroke="#28E88E" strokeWidth={1.5} className="drop-shadow-[0_0_12px_rgba(40,232,142,0.5)]" />
      {/* labels */}
      {labelPoints.map((lp, i) => (
        <text
          key={i}
          x={lp.x}
          y={lp.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white/70 text-[10px] font-inter"
        >
          {lp.text}
        </text>
      ))}
    </svg>
  );
}

function AIWinDonutChart({ winPct, otherSegments }: { winPct: number; otherSegments: number[] }) {
  const size = 200;
  const center = size / 2;
  const r = 70;
  const stroke = 20;
  const circumference = 2 * Math.PI * r;
  const totalOther = otherSegments.reduce((a, b) => a + b, 0);
  const remaining = 100 - winPct;
  const segments: { pct: number; color: string }[] = [
    { pct: winPct, color: "url(#aiWinGrad)" },
    ...otherSegments.map((p, i) => ({
      pct: totalOther > 0 ? (p / totalOther) * remaining : 0,
      color: ["#8B5CF6", "#3B82F6", "#60A5FA", "rgba(255,255,255,0.2)"][i] ?? "rgba(255,255,255,0.2)",
    })),
  ];
  let offsetDeg = 0;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <linearGradient id="aiWinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#28E88E" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        {segments.map((seg, i) => {
          const dash = (seg.pct / 100) * circumference;
          const gap = circumference - dash;
          const rotation = offsetDeg;
          offsetDeg += (seg.pct / 100) * 360;
          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={0}
              transform={`rotate(${-90 + rotation} ${center} ${center})`}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-inter text-3xl font-bold text-[#fbbf24]">{winPct}%</span>
        <span className="font-inter text-xs text-white/80 mt-0.5">Win Chance</span>
      </div>
    </div>
  );
}

function MarketActivityChart() {
  const w = 260;
  const h = 160;
  const padding = { top: 12, right: 12, bottom: 28, left: 32 };
  const plotW = w - padding.left - padding.right;
  const plotH = h - padding.top - padding.bottom;
  const points = [
    { x: 5, y: 4, c: "green" },
    { x: 12, y: 8, c: "green" },
    { x: 18, y: 6, c: "white" },
    { x: 25, y: 14, c: "red" },
    { x: 32, y: 10, c: "white" },
    { x: 38, y: 18, c: "red" },
  ];
  const scaleX = (v: number) => padding.left + (v / 40) * plotW;
  const scaleY = (v: number) => padding.top + plotH - (v / 20) * plotH;

  return (
    <svg width={w} height={h} className="overflow-visible">
      <line x1={padding.left} y1={padding.top} x2={padding.left} y2={h - padding.bottom} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
      <line x1={padding.left} y1={h - padding.bottom} x2={w - padding.right} y2={h - padding.bottom} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
      <text x={padding.left - 8} y={padding.top + 4} className="fill-white/60 font-inter text-[10px]" textAnchor="end">
        Odds
      </text>
      <text x={w - padding.right} y={h - 4} className="fill-white/60 font-inter text-[10px]" textAnchor="middle">
        Win Probability
      </text>
      {points.map((p, i) => (
        <circle
          key={i}
          cx={scaleX(p.x)}
          cy={scaleY(p.y)}
          r={6}
          fill={p.c === "green" ? "#28E88E" : p.c === "red" ? "#f87171" : "rgba(255,255,255,0.6)"}
          className="drop-shadow-sm"
        />
      ))}
    </svg>
  );
}
