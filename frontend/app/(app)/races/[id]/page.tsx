"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RaceStatBar, WinPercentage, SmartRacecard, AnalyticsPanel } from "@/components/features/races";
import { MOCK_RACE, MOCK_RACECARD, PEDIGREE_VALUES, RADAR_LABELS, DONUT_SEGMENTS, WIN_PCT } from "@/lib/mock-data";
import { ROUTES } from "@/lib/constants";

const RACE_HORSE = "/assets/race-horse.png";

export default function RaceDetailPage() {
  const params = useParams();
  const _id = (params?.id as string) ?? "1";
  const race = MOCK_RACE;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <main className="mx-auto w-full max-w-[1600px] space-y-4 px-3 py-4 sm:space-y-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Back link */}
        <Link
          href={ROUTES.MATCHES}
          className="inline-flex min-h-[44px] min-w-[44px] items-center gap-1.5 font-inter text-sm text-white/80 transition hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Race title block */}
        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="relative h-10 w-10 shrink-0 flex items-center justify-center">
              <Image src={RACE_HORSE} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-inter text-base sm:text-[18px] text-white/70 leading-tight">Race {race.raceNumber}</p>
              <h1 className="font-inter text-2xl font-bold text-white mt-0.5 leading-tight sm:text-[30px]">
                {race.name}
              </h1>
              <p className="font-inter text-sm sm:text-[16px] text-white/60 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 leading-tight">
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
            className="inline-flex shrink-0 items-center justify-center self-start rounded-[44px] p-[1px] w-[99px] h-[29px] min-w-[99px] sm:self-center"
            style={{
              background: "radial-gradient(58.97% 354.93% at 15.38% 13.16%, #28E88E 0%, #168250 100%)",
            }}
          >
            <span
              className="flex h-full w-full items-center justify-center rounded-[43px] font-inter font-medium text-[14px] leading-[100%] tracking-[-0.03em] text-center text-white"
              style={{ padding: "6px 12px", background: "#0d0d0d" }}
            >
              {race.status}
            </span>
          </span>
        </section>

        {/* Stat bar */}
        <RaceStatBar race={race} />

        {/* Win Percentage + Smart Racecard — side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-4 sm:gap-6">
          <WinPercentage racecard={MOCK_RACECARD} />
          <SmartRacecard racecard={MOCK_RACECARD} />
        </div>

        {/* Analytics: Pedigree, AI Win, Market Activity */}
        <AnalyticsPanel
          pedigreeValues={PEDIGREE_VALUES}
          radarLabels={RADAR_LABELS}
          winPct={WIN_PCT}
          donutSegments={DONUT_SEGMENTS}
        />
      </main>
    </div>
  );
}
