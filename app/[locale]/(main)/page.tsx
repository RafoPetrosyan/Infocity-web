'use client';

import Image from 'next/image';

export default function Home() {
  const testImages = [
    '/00a529f4a75bf5586c0810c4dc7941c0a8ece2e7.jpg',
    '/7a6be63614de24d5d217ac0b4c888512d27f144e.jpg',
  ];

  const compactCards = [
    { title: 'Scorpions / event fub', tag: "I'm going", attendees: 288, image: testImages[0] },
    { title: 'Open air brunch', tag: "I'm going", attendees: 96, image: testImages[1] },
    { title: 'City food market', tag: "I'm going", attendees: 154, image: testImages[0] },
  ];

  return (
    <>
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)]">
        <article className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
          <div className="absolute left-6 top-6 z-10 flex gap-2 text-xs font-semibold text-white">
            <span className="rounded-full bg-black/50 px-3 py-1">May 25 | 19:00</span>
            <span className="rounded-full bg-black/50 px-3 py-1">2 day</span>
          </div>
          <button className="absolute right-6 top-6 z-10 rounded-full bg-black/40 px-2 py-1 text-xs text-white">
            ♡
          </button>
          <div className="relative h-80">
              <Image
                src={testImages[0]}
                alt="Scorpions event"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 66vw"
              />
            </div>
          <div className="space-y-3 p-6">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white">
                I'm going
              </span>
              <span className="text-xs text-[var(--color-muted)]">288</span>
            </div>
            <h3 className="text-xl font-semibold">Scorpions / event fub</h3>
            <p className="text-sm text-[var(--color-muted)]">
              The band will be performing at the theater, seating is limited.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"
                  />
                ))}
              </div>
              <span className="text-xs text-[var(--color-muted)]">+24 friends</span>
            </div>
          </div>
        </article>

        <div className="space-y-6">
          {compactCards.slice(0, 2).map((card, index) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
            >
              <div className="relative">
                <div className="relative h-40">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute left-4 top-4 flex gap-2 text-xs font-semibold text-white">
                  <span className="rounded-full bg-black/45 px-3 py-1">May 25 | 19:00</span>
                  <span className="rounded-full bg-black/45 px-3 py-1">2 day</span>
                </div>
                <button className="absolute right-4 top-4 rounded-full bg-black/40 px-2 py-1 text-xs text-white">
                  ♡
                </button>
              </div>
              <div className="space-y-2 p-5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white">
                    {card.tag}
                  </span>
                  <span className="text-xs text-[var(--color-muted)]">{card.attendees}</span>
                </div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-sm text-[var(--color-muted)]">Discover the best local experiences.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {compactCards.slice(0, 2).map((card, index) => (
          <article
            key={`${card.title}-wide`}
            className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
          >
            <div className="relative">
              <div className="relative h-44">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute left-4 top-4 flex gap-2 text-xs font-semibold text-white">
                <span className="rounded-full bg-black/45 px-3 py-1">May 25 | 19:00</span>
                <span className="rounded-full bg-black/45 px-3 py-1">2 day</span>
              </div>
              <button className="absolute right-4 top-4 rounded-full bg-black/40 px-2 py-1 text-xs text-white">
                ♡
              </button>
            </div>
            <div className="space-y-2 p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white">
                  {card.tag}
                </span>
                <span className="text-xs text-[var(--color-muted)]">{card.attendees}</span>
              </div>
              <h4 className="text-base font-semibold">{card.title}</h4>
              <p className="text-sm text-[var(--color-muted)]">Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
