"use client";

import { useState } from "react";
import { MatchCard, RaceDetailPanel, OddsTable } from "@/components/features/matches";
import { MOCK_MATCHES, MOCK_LEADERBOARD, MOCK_ODDS } from "@/lib/mock-data";

export default function MatchesPage() {
  const [selectedMatchId, setSelectedMatchId] = useState<string>("1");

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <main className="mx-auto w-full max-w-[1600px] space-y-4 sm:space-y-6 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {/* Match cards: horizontal scroll on mobile */}
        <section className="overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 scroll-smooth">
          <div className="flex gap-3 sm:gap-4 min-w-max sm:min-w-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_MATCHES.map((m) => (
              <MatchCard
                key={m.id}
                match={m}
                isSelected={selectedMatchId === m.id}
                onClick={() => setSelectedMatchId(m.id)}
              />
            ))}
          </div>
        </section>

        {/* Race detail + Live Odds */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
          <div className="xl:col-span-1 space-y-4 sm:space-y-6 min-w-0">
            <RaceDetailPanel leaderboard={MOCK_LEADERBOARD} />
          </div>
          <div className="xl:col-span-2 min-w-0">
            <OddsTable odds={MOCK_ODDS} />
          </div>
        </div>
      </main>
    </div>
  );
}
