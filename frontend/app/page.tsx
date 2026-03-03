import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ background: 'linear-gradient(152.57deg, #282828 15.06%, #141414 60.23%)' }}>
      <header className="w-[1440px] mx-auto ">
        <div className="position: absolute flex items-center justify-start pt-8 mb-6">
          <Link href="/" className="flex items-center gap-2 text-inherit no-underline">
            <div className="flex h-[30px] w-[48px] items-center justify-center">
              <Image
                src="/assets/Group.png"
                alt="Go Racing logo"
                width={40}
                height={28}
              />
            </div>
            <span className="inline-flex items-baseline gap-1 text-[22px] font-medium leading-[1.4]">
              <span className="text-white">Go</span>
              <span className="text-[#fbbf24]">Racing</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="bg-black">
        <div className="relative mx-auto w-[1440px] overflow-visible">
          <div className="grid h-[700px] w-full gap-12 border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.9)] lg:grid-cols-[0.72fr_1.85fr] rounded-b-[32px]">
            <section className="flex flex-col justify-center gap-5 mt-28">
            <h1 className="text-[56px] leading-[1.4] font-medium tracking-[0]">
              Paddock Horse Racing
            </h1>

            <p className="max-w-[430px] font-inter text-[16px] font-light leading-[1.4] tracking-[0.01em] text-[#B3B3B3]">
              Turn complex race data into clear, confident decisions with real-time
              AI insights built for modern bettors.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Link
                href="/login"
                className="inline-flex h-[54px] items-center justify-center rounded-full px-8 py-[17px] font-inter text-[16px] font-medium leading-[1] tracking-[-0.03em] text-[#020308] [background:linear-gradient(0deg,#28E88E,#28E88E),radial-gradient(44.33%_44.33%_at_50.2%_0%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] [box-shadow:0px_7px_16px_0px_#28E88E33,0px_30px_30px_0px_#28E88E2B,0px_67px_40px_0px_#28E88E1A,0px_119px_47px_0px_#28E88E08,0px_185px_52px_0px_#28E88E00]"
              >
                Log In
              </Link>
              <Link
                href="/matches"
                className="inline-flex h-[54px] items-center justify-center rounded-full border border-white/40 px-8 py-[17px] font-inter text-[16px] font-normal leading-[1.4] tracking-[0] text-white"
              >
                View Live Matches
              </Link>
            </div>

            <div className="mt-2">
              <div className="h-px w-full border-t border-transparent [border-image:linear-gradient(90deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_100%)_1]"></div>
              <div className="mt-6 flex gap-10 text-center">
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-[26px] font-semibold leading-[1.4] tracking-[0.01em] text-white">
                    15
                  </span>
                  <span className="font-inter text-[14px] font-light leading-[1.4] tracking-[0.01em] text-[#707687]">
                    LIVE RACES TODAY
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-[26px] font-semibold leading-[1.4] tracking-[0.01em] text-white">
                    88.3%
                  </span>
                  <span className="font-inter text-[14px] font-light leading-[1.4] tracking-[0.01em] text-[#707687]">
                    MODEL PREDICTION ACCURACY
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="relative flex justify-end overflow-visible">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/assets/hero-image.png"
                alt="Horse racing"
                width={1066}
                height={1200}
                className="h-full w-full object-cover [transform:rotateY(180deg)]"
                priority
              />
              <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(5,6,8,0.98)_0%,rgba(5,6,8,0.8)_22%,rgba(5,6,8,0)_55%)]" />
            </div>
            {/* Ellipse 1885 – upper diagonal from center line, up and right */}
            <div
              className="pointer-events-none absolute z-10 rounded-full"
              style={{
                width: "600px",
                height: "50px",
                left: "0",
                top: "-50px",
                background: "rgba(255, 255, 255, 0.8)",
                filter: "blur(50px)",
                transform: "rotate(-43deg)",
              }}
              aria-hidden
            />
            {/* Ellipse 1883 – lower diagonal from center line, down and right */}
            <div
              className="pointer-events-none absolute z-10 rounded-full"
              style={{
                width: "1529.22px",
                height: "50px",
                left: "-100px",
                top: "-100px",
                background: "rgba(255, 255, 255, 0.8)",
                filter: "blur(50px)",
                transform: "rotate(-43.32deg)",
              }}
              aria-hidden
            />
          </section>
          </div>
        </div>
      </main>

      <section className="mt-[60px] flex h-[301px] w-[1360px] items-center gap-4 mx-auto">
        <article className="flex h-[301px] w-[328px] flex-row items-center gap-6 rounded-[12px] border border-[#3B3B3B] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_100%)] px-5 shadow-[-20px_24px_74px_rgba(255,255,255,0.05)]">
          <div className="flex h-[262px] w-[288px] flex-col items-start gap-4 py-8">
            <div className="flex h-11 items-center justify-center">
              <Image
                src="/assets/Frame 2147224662.png"
                alt=""
                width={54}
                height={44}
                className="h-11"
              />
            </div>
            <div className="flex h-[138px] w-[288px] flex-col items-start gap-1">
              <h2 className="w-[260px] text-[24px] leading-[1.3] text-white">
                AI Racing Intelligence Platform
              </h2>
              <p className="w-[288px] text-[16px] leading-[1.5] tracking-[0.01em] text-[#D3D3D3]">
                Advanced algorithms analyze form, conditions, and trends to deliver insights before
                the race begins.
              </p>
            </div>
          </div>
        </article>

        <article className="flex h-[301px] w-[328px] flex-row items-center gap-6 rounded-[12px] border border-[#3B3B3B] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_100%)] px-5 shadow-[-20px_24px_74px_rgba(255,255,255,0.05)]">
          <div className="flex h-[262px] w-[288px] flex-col items-start gap-4 py-8">
            <div className="flex h-11 items-center justify-center">
              <Image
                src="/assets/id-card.png"
                alt=""
                width={54}
                height={44}
                className="h-11"
              />
            </div>
            <div className="flex h-[138px] w-[288px] flex-col items-start gap-1">
              <h2 className="w-[260px] text-[24px] leading-[1.3] text-white">
                The Smart Race Card Experience
              </h2>
              <p className="w-[288px] text-[16px] leading-[1.5] tracking-[0.01em] text-[#D3D3D3]">
                Redesigned race card that brings odds, trends, and runner insights into
                streamlined, decision-ready view.
              </p>
            </div>
          </div>
        </article>

        <article className="flex h-[301px] w-[328px] flex-row items-center gap-6 rounded-[12px] border border-[#3B3B3B] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_100%)] px-5 shadow-[-20px_24px_74px_rgba(255,255,255,0.05)]">
          <div className="flex h-[262px] w-[288px] flex-col items-start gap-4 py-8">
            <div className="flex h-11 items-center justify-center">
              <Image
                src="/assets/zap.png"
                alt=""
                width={54}
                height={44}
                className="h-11"
              />
            </div>
            <div className="flex h-[138px] w-[288px] flex-col items-start gap-1">
              <h2 className="w-[260px] text-[24px] leading-[1.3] text-white">
                Predictive Intelligence
              </h2>
              <p className="w-[288px] text-[16px] leading-[1.5] tracking-[0.01em] text-[#D3D3D3]">
                Forecast race outcomes using data-driven probabilities that adapt to live market
                and track changes.
              </p>
            </div>
          </div>
        </article>

        <article className="flex h-[301px] w-[328px] flex-row items-center gap-6 rounded-[12px] border border-[#3B3B3B] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_100%)] px-5 shadow-[-20px_24px_74px_rgba(255,255,255,0.05)]">
          <div className="flex h-[262px] w-[288px] flex-col items-start gap-4 py-8">
            <div className="flex h-11 items-center justify-center">
              <Image
                src="/assets/eye.png"
                alt=""
                width={54}
                height={44}
                className="h-11"
              />
            </div>
            <div className="flex h-[138px] w-[288px] flex-col items-start gap-1">
              <h2 className="w-[242px] text-[24px] leading-[1.3] text-white">
                See The Race Before It Happens
              </h2>
              <p className="w-[288px] text-[16px] leading-[1.5] tracking-[0.01em] text-[#D3D3D3]">
                Simulate race scenarios and understand how pace, draw, and conditions can shape the
                final result.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Visual Analytics */}
      <section className="mx-auto mt-[80px] w-[1360px] px-5">
        <div className="text-center">
          <h2 className="text-[40px] font-medium leading-[1.3] tracking-[0] text-white">
            Visual Analytics
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] font-inter text-[16px] font-light leading-[1.5] text-white/90">
            Powerful visuals transform raw racing data into patterns you can read at a glance and act on with confidence.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6">
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
      <section className="mx-auto mt-[80px] w-[1360px] px-5 pb-16">
        <h2 className="text-[32px] font-medium leading-[1.3] text-white">
          Connect With Digital Paddock
        </h2>
        <p className="mt-3 max-w-[560px] font-inter text-[16px] font-light leading-[1.5] text-white/90">
          Need help or have questions about the platform? Our team is here to support your racing analytics journey.
        </p>
        <a
          href="mailto:support@digitalpaddock.ai"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2d2d2d] px-6 py-3 font-inter text-[16px] font-medium text-[#eab308] no-underline transition hover:bg-[#3a3a3a]"
        >
          support@digitalpaddock.ai
          <span className="text-[#eab308]" aria-hidden>↗</span>
        </a>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex w-[1360px] items-center justify-between border-t border-[#3B3B3B] px-5 py-6">
        <span className="font-inter text-[14px] text-[#707687]">Digital Paddock</span>
        <span className="font-inter text-[14px] text-[#707687]">Precision Racing Intelligence Powered by Data</span>
      </footer>
    </div>
  );
}
