import type { ReactNode } from "react";

type HeroStat = { v: string; l: string };

export function PageHero({
  imageSrc,
  imageAlt,
  pill,
  title,
  description,
  stats,
  children,
}: {
  imageSrc: string;
  imageAlt: string;
  pill?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  stats?: HeroStat[];
  children?: ReactNode;
}) {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[250px] bg-primary/20 blur-[80px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(172,60,60,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(172,60,60,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-4xl">
          {pill ? <div className="mb-8 md:mb-10">{pill}</div> : null}

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black text-white uppercase tracking-tight md:tracking-tighter leading-[0.9] pb-2 mb-6 md:mb-8 break-words overflow-visible">
            {title}
          </h1>

          {description ? (
            <div className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">
              {description}
            </div>
          ) : null}

          {stats?.length ? (
            <>
              <div className="hidden md:block max-w-md mt-8">
                <div className="flex items-center gap-8 text-sm">
                  {stats.map((s, index) => (
                    <div key={`${s.l}-${index}`} className="flex items-center gap-8">
                      {index > 0 && <div className="w-px h-10 bg-white/10" />}
                      <div>
                        <div className="text-3xl font-display font-black text-white">{s.v}</div>
                        <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                          {s.l}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex md:hidden items-center gap-5 mt-5 pb-2">
                {stats.map((s, index) => (
                  <div key={`${s.l}-${index}`} className="flex items-center gap-5">
                    {index > 0 && <div className="w-px h-7 bg-white/10" />}
                    <div>
                      <div className="text-xl font-display font-black text-white">{s.v}</div>
                      <div className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
                        {s.l}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {children}
        </div>
      </div>
    </section>
  );
}
