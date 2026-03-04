import Image from "next/image";
import Link from "next/link";
import { Logo, PrimaryLink } from "@/components/ui";
import { COPY, ROUTES } from "@/lib/constants";

export default function Home() {
  return (
    <div className="min-w-0 overflow-x-hidden relative" style={{ background: 'linear-gradient(152.57deg, #282828 15.06%, #141414 60.23%)' }}>
      {/* Header: on mobile transparent over image at top; on desktop black bar */}
      <header className="absolute top-0 left-0 right-0 z-30 w-full bg-transparent lg:static lg:bg-black">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-start px-4 pt-8 lg:px-8 mb-6 lg:mb-0">
          <Logo accentUnderline />
        </div>
      </header>

      <main className="bg-black">
        <div className="relative mx-auto w-full max-w-[1440px] overflow-visible px-0 lg:px-8">
          {/* Hero: on mobile image to ~middle of screen, content overlaid on lower portion; on lg two-column grid (Screenshot 2) */}
          <div className="relative grid min-h-[55vh] lg:min-h-0 h-auto lg:h-[700px] w-full gap-8 lg:gap-12 border-t-0 lg:border-t border-r border-b border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.9)] grid-cols-1 lg:grid-cols-[1fr_1000px] rounded-b-none lg:rounded-b-[32px] py-0 lg:py-0">
            {/* Hero image: on mobile absolute background, on lg in flow */}
            <section className="absolute inset-0 lg:relative lg:flex justify-end overflow-visible order-2 min-h-0">
              <div className="relative h-full w-full overflow-hidden rounded-b-none lg:rounded-b-[32px]">
                <Image
                  src="/assets/hero-image.png"
                  alt="Horse racing"
                  width={1066}
                  height={1200}
                  className="h-full w-full object-cover object-[70%_50%] lg:object-center [transform:rotateY(180deg)]"
                  priority
                />
                {/* Mobile: top gradient (dark at top for status bar + header) and bottom gradient (dark at bottom for text/buttons) */}
                <div className="pointer-events-none absolute inset-0 z-[1] lg:hidden" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 28%, transparent 55%)' }} aria-hidden />
                <div className="pointer-events-none absolute inset-0 z-[1] lg:hidden" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.55) 38%, transparent 72%)' }} aria-hidden />
                <div className="pointer-events-none absolute inset-0 z-[1] hidden bg-[linear-gradient(90deg,rgba(5,6,8,0.98)_0%,rgba(5,6,8,0.8)_22%,rgba(5,6,8,0)_55%)] lg:block" aria-hidden />
              </div>
            </section>

            <section className="relative z-10 flex flex-col justify-end gap-5 order-1 px-4 pt-[38vh] min-h-[55vh] pb-6 lg:justify-center lg:pt-0 lg:px-0 lg:min-h-0 lg:pb-0">
            <h1 className="text-[50px] leading-[1.2] font-medium tracking-[0] text-white lg:text-[56px] lg:leading-[1.4] lg:whitespace-nowrap">
              Paddock
              <br className="lg:hidden" />
              Horse Racing
            </h1>

            <p className="max-w-[430px] font-inter text-[16px] font-light leading-[1.4] tracking-[0.01em] text-white lg:text-[#B3B3B3]">
              {COPY.HERO.DESCRIPTION}
            </p>

            <div className="mt-6 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <PrimaryLink href={ROUTES.LOGIN}>Log In</PrimaryLink>
              <Link
                href={ROUTES.MATCHES}
                className="inline-flex h-[54px] items-center justify-center rounded-full border border-white/50 bg-black/40 lg:bg-transparent px-6 py-[17px] font-inter text-[16px] font-normal leading-[1.4] tracking-[0] text-white lg:border-white/40 lg:px-8 no-underline"
              >
                View Live Matches
              </Link>
            </div>

            {/* Stats: desktop only inside hero */}
            <div className="mt-2 hidden lg:block">
              <div className="h-px w-full border-t border-transparent [border-image:linear-gradient(90deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_100%)_1]"></div>
              <div className="mt-6 flex flex-wrap gap-6 sm:gap-10 text-center">
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-[26px] font-semibold leading-[1.4] tracking-[0.01em] text-white">
                    15
                  </span>
                  <span className="whitespace-nowrap font-inter text-[14px] font-light leading-[1.4] tracking-[0.01em] text-[#707687]">
                    LIVE RACES TODAY
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-[26px] font-semibold leading-[1.4] tracking-[0.01em] text-white">
                    88.3%
                  </span>
                  <span className="whitespace-nowrap font-inter text-[14px] font-light leading-[1.4] tracking-[0.01em] text-[#707687]">
                    MODEL PREDICTION ACCURACY
                  </span>
                </div>
              </div>
            </div>
          </section>
            {/* Ellipse 1885 – upper-right, horizontally elongated (desktop only) */}
            <div
              className="pointer-events-none absolute z-10 rounded-full hidden lg:block"
              style={{
                width: "600px",
                height: "50px",
                right: "100px",
                top: "0",
                background: "rgba(255, 255, 255, 0.8)",
                filter: "blur(50px)",
                transform: "rotate(-25deg)",
              }}
              aria-hidden
            />
            {/* Ellipse 1883 – below 1885, slightly larger, more vertical (desktop only) */}
            <div
              className="pointer-events-none absolute z-10 rounded-full hidden lg:block"
              style={{
                width: "500px",
                height: "80px",
                right: "200px",
                top: "300px",
                background: "rgba(255, 255, 255, 0.8)",
                filter: "blur(50px)",
                transform: "rotate(-25deg)",
              }}
              aria-hidden
            />
          </div>
        </div>
      </main>

      {/* Mobile-only: stats section – dark background starts below hero (Screenshot 2) */}
      <section className="lg:hidden w-full pt-5 pb-24 px-4" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 50%, #000000 100%)' }}>
        <div className="grid grid-cols-2 gap-4 max-w-[1360px] mx-auto">
          <div className="flex flex-col items-center justify-center gap-1 text-center">
            <span className="font-sans text-[26px] font-semibold leading-[1.4] tracking-[0.01em] text-white">
              15
            </span>
            <span className="font-inter text-[14px] font-light leading-[1.4] tracking-[0.01em] text-white">
              Live Races Today
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 text-center">
            <span className="font-sans text-[26px] font-semibold leading-[1.4] tracking-[0.01em] text-white">
              88.3%
            </span>
            <span className="font-inter text-[14px] font-light leading-[1.4] tracking-[0.01em] text-white">
              Model Prediction Accuracy
            </span>
          </div>
        </div>
      </section>

      <section className="mt-8 sm:mt-12 lg:mt-[60px] w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-4 lg:gap-4">
        <article className="flex min-h-[301px] h-auto flex-1 flex-row items-center gap-6 rounded-[12px] border border-[#3B3B3B] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_100%)] px-5 shadow-[-20px_24px_74px_rgba(255,255,255,0.05)]">
          <div className="flex min-h-[262px] w-full max-w-[288px] flex-col items-start gap-4 py-6 lg:py-8">
            <div className="flex h-11 items-center justify-center">
              <Image
                src="/assets/Frame 2147224662.png"
                alt=""
                width={54}
                height={44}
                className="h-11"
              />
            </div>
            <div className="flex min-h-0 w-full flex-col items-start gap-1">
              <h2 className="w-full max-w-[260px] text-[20px] sm:text-[24px] leading-[1.3] text-white">
                AI Racing Intelligence Platform
              </h2>
              <p className="w-full max-w-[288px] text-[14px] sm:text-[16px] leading-[1.5] tracking-[0.01em] text-[#D3D3D3]">
                Advanced algorithms analyze form, conditions, and trends to deliver insights before
                the race begins.
              </p>
            </div>
          </div>
        </article>

        <article className="flex min-h-[301px] h-auto flex-1 flex-row items-center gap-6 rounded-[12px] border border-[#3B3B3B] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_100%)] px-5 shadow-[-20px_24px_74px_rgba(255,255,255,0.05)]">
          <div className="flex min-h-[262px] w-full max-w-[288px] flex-col items-start gap-4 py-6 lg:py-8">
            <div className="flex h-11 items-center justify-center">
              <Image
                src="/assets/id-card.png"
                alt=""
                width={54}
                height={44}
                className="h-11"
              />
            </div>
            <div className="flex min-h-0 w-full flex-col items-start gap-1">
              <h2 className="w-full max-w-[260px] text-[20px] sm:text-[24px] leading-[1.3] text-white">
                The Smart Race Card Experience
              </h2>
              <p className="w-full max-w-[288px] text-[14px] sm:text-[16px] leading-[1.5] tracking-[0.01em] text-[#D3D3D3]">
                Redesigned race card that brings odds, trends, and runner insights into
                streamlined, decision-ready view.
              </p>
            </div>
          </div>
        </article>

        <article className="flex min-h-[301px] h-auto flex-1 flex-row items-center gap-6 rounded-[12px] border border-[#3B3B3B] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_100%)] px-5 shadow-[-20px_24px_74px_rgba(255,255,255,0.05)]">
          <div className="flex min-h-[262px] w-full max-w-[288px] flex-col items-start gap-4 py-6 lg:py-8">
            <div className="flex h-11 items-center justify-center">
              <Image
                src="/assets/zap.png"
                alt=""
                width={54}
                height={44}
                className="h-11"
              />
            </div>
            <div className="flex min-h-0 w-full flex-col items-start gap-1">
              <h2 className="w-full max-w-[260px] text-[20px] sm:text-[24px] leading-[1.3] text-white">
                Predictive Intelligence
              </h2>
              <p className="w-full max-w-[288px] text-[14px] sm:text-[16px] leading-[1.5] tracking-[0.01em] text-[#D3D3D3]">
                Forecast race outcomes using data-driven probabilities that adapt to live market
                and track changes.
              </p>
            </div>
          </div>
        </article>

        <article className="flex min-h-[301px] h-auto flex-1 flex-row items-center gap-6 rounded-[12px] border border-[#3B3B3B] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_100%)] px-5 shadow-[-20px_24px_74px_rgba(255,255,255,0.05)]">
          <div className="flex min-h-[262px] w-full max-w-[288px] flex-col items-start gap-4 py-6 lg:py-8">
            <div className="flex h-11 items-center justify-center">
              <Image
                src="/assets/eye.png"
                alt=""
                width={54}
                height={44}
                className="h-11"
              />
            </div>
            <div className="flex min-h-0 w-full flex-col items-start gap-1">
              <h2 className="w-full max-w-[242px] text-[20px] sm:text-[24px] leading-[1.3] text-white">
                See The Race Before It Happens
              </h2>
              <p className="w-full max-w-[288px] text-[14px] sm:text-[16px] leading-[1.5] tracking-[0.01em] text-[#D3D3D3]">
                Simulate race scenarios and understand how pace, draw, and conditions can shape the
                final result.
              </p>
            </div>
          </div>
        </article>
        </div>
      </section>

      {/* Visual Analytics */}
      <section className="mx-auto mt-12 sm:mt-16 lg:mt-[80px] w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-medium leading-[1.3] tracking-[0] text-white">
            Visual Analytics
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] font-inter text-[14px] sm:text-[16px] font-light leading-[1.5] text-white/90 px-2">
            Powerful visuals transform raw racing data into patterns you can read at a glance and act on with confidence.
          </p>
        </div>
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Seasonal Heatmaps */}
          <article className="overflow-hidden rounded-[12px] border border-[#3B3B3B] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_100%)] shadow-[-20px_24px_74px_rgba(255,255,255,0.05)]">
            <div className="relative h-[240px] w-full rounded-t-lg">
              <Image src="/assets/Frame1.png" alt="Seasonal Heatmaps" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-[20px] font-semibold leading-[1.3] text-white">Seasonal Heatmaps</h3>
              <p className="mt-2 font-inter text-[14px] leading-[1.5] text-[#D3D3D3]">
                Identify performance trends across seasons, distances, and track conditions to spot long-term advantages.
              </p>
            </div>
          </article>

          {/* Market Activity */}
          <article className="overflow-hidden rounded-[12px] border border-[#3B3B3B] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_100%)] shadow-[-20px_24px_74px_rgba(255,255,255,0.05)]">
            <div className="relative h-[240px] w-full rounded-t-lg">
              <Image src="/assets/Frame2.png" alt="Market Activity" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-[20px] font-semibold leading-[1.3] text-white">Market Activity</h3>
              <p className="mt-2 font-inter text-[14px] leading-[1.5] text-[#D3D3D3]">
                Monitor odds fluctuations and betting momentum in real time to understand market confidence and value shifts.
              </p>
            </div>
          </article>

          {/* Pedigree Radar Analysis */}
          <article className="overflow-hidden rounded-[12px] border border-[#3B3B3B] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_100%)] shadow-[-20px_24px_74px_rgba(255,255,255,0.05)]">
            <div className="relative h-[240px] w-full rounded-t-lg">
              <Image src="/assets/Frame3.png" alt="Pedigree Radar Analysis" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-[20px] font-semibold leading-[1.3] text-white">Pedigree Radar Analysis</h3>
              <p className="mt-2 font-inter text-[14px] leading-[1.5] text-[#D3D3D3]">
                Visualize bloodline strengths and weaknesses to assess suitability for distance, surface, and conditions.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Connect With Digital Paddock */}
      <section className="mx-auto mt-12 sm:mt-16 lg:mt-[80px] w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
        <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-medium leading-[1.3] text-white">
          Connect With Digital Paddock
        </h2>
        <p className="mt-3 max-w-[560px] font-inter text-[14px] sm:text-[16px] font-light leading-[1.5] text-white/90">
          Need help or have questions about the platform? Our team is here to support your racing analytics journey.
        </p>
        <a
          href="mailto:support@digitalpaddock.ai"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2d2d2d] px-6 py-3 font-inter text-[14px] sm:text-[16px] font-medium text-[#eab308] no-underline transition hover:bg-[#3a3a3a]"
        >
          support@digitalpaddock.ai
          <span className="text-[#eab308]" aria-hidden>↗</span>
        </a>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex w-full max-w-[1360px] flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#3B3B3B] px-4 sm:px-6 lg:px-8 py-6 text-center sm:text-left">
        <span className="font-inter text-[14px] text-[#707687]">Digital Paddock</span>
        <span className="font-inter text-[14px] text-[#707687]">Precision Racing Intelligence Powered by Data</span>
      </footer>
    </div>
  );
}
