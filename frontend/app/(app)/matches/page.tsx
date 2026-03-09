"use client";

import { useEffect, useState } from "react";
import { MatchCard, RaceDetailPanel, OddsTable } from "@/components/features/matches";
import type { HKJCMeeting, HKJCRace } from "@/types/race-meeting";

const VENUES = [
  { code: "ST", label: "Sha Tin" },
  { code: "HV", label: "Happy Valley" },
];

function todayHK() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Hong_Kong" });
}

export default function MatchesPage() {
  const [date, setDate] = useState(todayHK());
  const [venue, setVenue] = useState("ST");
  const [meeting, setMeeting] = useState<HKJCMeeting | null>(null);
  const [selectedRace, setSelectedRace] = useState<HKJCRace | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    setMeeting(null);
    setSelectedRace(null);

    fetch(`/api/races/meetings?date=${date}&venue=${venue}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data: HKJCMeeting[]) => {
        const m = data?.[0] ?? null;
        setMeeting(m);
        setSelectedRace(m?.races?.[0] ?? null);
        // Sync date picker if the server resolved a different date (e.g. next available meeting)
        if (m?.date && m.date !== date) setDate(m.date);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setError("Failed to load race data.");
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [date, venue]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <main className="mx-auto w-full max-w-[1600px] space-y-4 sm:space-y-6 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#28E88E]/50 [&::-webkit-calendar-picker-indicator]:invert"
          />
          <div className="flex gap-2">
            {VENUES.map((v) => (
              <button
                key={v.code}
                type="button"
                onClick={() => setVenue(v.code)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  venue === v.code
                    ? "bg-[#28E88E] text-[#020308]"
                    : "bg-[#1a1a1a] border border-white/10 text-white/70 hover:text-white"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
          {meeting && (
            <span className="text-white/40 text-sm">
              {meeting.totalNumberOfRace} races · {meeting.date}
            </span>
          )}
        </div>

        {/* State feedback */}
        {loading && (
          <div className="flex items-center gap-2 text-white/50 text-sm py-4">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-[#28E88E]" />
            Loading races…
          </div>
        )}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {!loading && !error && meeting && meeting.races.length === 0 && (
          <p className="text-white/40 text-sm py-4">No races found for this date and venue.</p>
        )}
        {!loading && !error && !meeting && (
          <p className="text-white/40 text-sm py-4">No meeting found for this date and venue.</p>
        )}

        {/* Race cards */}
        {meeting && meeting.races.length > 0 && (
          <>
            <section className="overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 scroll-smooth">
              <div className="flex gap-3 sm:gap-4 min-w-max sm:min-w-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                {meeting.races.map((race) => (
                  <MatchCard
                    key={race.id}
                    race={race}
                    isSelected={selectedRace?.id === race.id}
                    onClick={() => setSelectedRace(race)}
                  />
                ))}
              </div>
            </section>

            {/* Race detail + racecard */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
              <div className="xl:col-span-1 min-w-0">
                <RaceDetailPanel race={selectedRace} />
              </div>
              <div className="xl:col-span-2 min-w-0">
                <OddsTable runners={selectedRace?.runners ?? []} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
