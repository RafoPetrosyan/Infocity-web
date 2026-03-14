'use client';

import Image from 'next/image';
import { useState } from 'react';

type ContentType = 'all' | 'events' | 'places' | 'businesses';

interface EventCard {
  type: 'event';
  title: string;
  description: string;
  image: string;
  date: string;
  duration: string;
  attendees: number;
  tag: string;
  friendsCount?: number;
}

interface PlaceCard {
  type: 'place';
  title: string;
  description: string;
  image: string;
  category: string;
  address?: string;
  rating?: number;
}

interface BusinessCard {
  type: 'business';
  title: string;
  description: string;
  image: string;
  category: string;
  rating?: number;
  hours?: string;
}

type FeedItem = EventCard | PlaceCard | BusinessCard;

function isEvent(item: FeedItem): item is EventCard {
  return item.type === 'event';
}

function isPlace(item: FeedItem): item is PlaceCard {
  return item.type === 'place';
}

function isBusiness(item: FeedItem): item is BusinessCard {
  return item.type === 'business';
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<ContentType>('all');

  const testImages = [
    '/00a529f4a75bf5586c0810c4dc7941c0a8ece2e7.jpg',
    '/7a6be63614de24d5d217ac0b4c888512d27f144e.jpg',
  ];

  const feedItems: FeedItem[] = [
    {
      type: 'event',
      title: 'Scorpions / event fub',
      description: 'The band will be performing at the theater, seating is limited.',
      image: testImages[0],
      date: 'May 25 | 19:00',
      duration: '2 day',
      attendees: 288,
      tag: "I'm going",
      friendsCount: 24,
    },
    {
      type: 'event',
      title: 'Open air brunch',
      description: 'Discover the best local experiences.',
      image: testImages[1],
      date: 'May 25 | 19:00',
      duration: '2 day',
      attendees: 96,
      tag: "I'm going",
    },
    {
      type: 'event',
      title: 'City food market',
      description: 'Discover the best local experiences.',
      image: testImages[0],
      date: 'May 25 | 19:00',
      duration: '2 day',
      attendees: 154,
      tag: "I'm going",
    },
    {
      type: 'place',
      title: 'Cascade Complex',
      description: 'Historic stairs and art galleries overlooking the city.',
      image: testImages[0],
      category: 'Landmark',
      address: 'Tumanyan St 10',
      rating: 4.8,
    },
    {
      type: 'place',
      title: 'Vernissage Market',
      description: 'Open-air arts and crafts market every weekend.',
      image: testImages[1],
      category: 'Market',
      rating: 4.6,
    },
    {
      type: 'place',
      title: 'Republic Square',
      description: 'The heart of Yerevan with fountains and government buildings.',
      image: testImages[0],
      category: 'Square',
      rating: 4.9,
    },
    {
      type: 'business',
      title: 'Dragon Garden Restaurant',
      description: 'Authentic Armenian cuisine with a terrace view.',
      image: testImages[1],
      category: 'Restaurant',
      rating: 4.7,
      hours: '11:00 – 23:00',
    },
    {
      type: 'business',
      title: 'Vernissage Design Studio',
      description: 'Handcrafted jewelry and home decor.',
      image: testImages[0],
      category: 'Shopping',
      rating: 4.5,
      hours: '10:00 – 20:00',
    },
    {
      type: 'business',
      title: 'Café Anteb',
      description: 'Cozy café with specialty coffee and pastries.',
      image: testImages[1],
      category: 'Café',
      rating: 4.6,
      hours: '08:00 – 22:00',
    },
  ];

  const filteredItems = feedItems.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'events') return item.type === 'event';
    if (activeTab === 'places') return item.type === 'place';
    if (activeTab === 'businesses') return item.type === 'business';
    return true;
  });

  const tabs: { id: ContentType; label: string; icon: string }[] = [
    { id: 'all', label: 'All', icon: '✨' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'places', label: 'Places', icon: '📍' },
    { id: 'businesses', label: 'Businesses', icon: '🏪' },
  ];

  const featuredItem = filteredItems[0];
  const compactItems = filteredItems.slice(1, 3);
  const gridItems = filteredItems.slice(3, 7);

  return (
    <>
      {/* Content type tabs */}
      <section className="mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-pill)] text-[var(--color-muted)] hover:bg-[var(--color-pill-active)] hover:text-[var(--color-ink)]'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured + compact row */}
      {filteredItems.length > 0 && (
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)]">
        {featuredItem ? (
          <article className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
            {isEvent(featuredItem) && (
              <>
                <div className="absolute left-6 top-6 z-10 flex gap-2 text-xs font-semibold text-white">
                  <span className="rounded-full bg-black/50 px-3 py-1">{featuredItem.date}</span>
                  <span className="rounded-full bg-black/50 px-3 py-1">{featuredItem.duration}</span>
                </div>
              </>
            )}
            {(isPlace(featuredItem) || isBusiness(featuredItem)) && (
              <div className="absolute left-6 top-6 z-10 flex gap-2 text-xs font-semibold text-white">
                <span className="rounded-full bg-black/50 px-3 py-1">{featuredItem.category}</span>
                {featuredItem.rating && (
                  <span className="rounded-full bg-black/50 px-3 py-1">★ {featuredItem.rating}</span>
                )}
              </div>
            )}
            <button
              type="button"
              className="absolute right-6 top-6 z-10 cursor-pointer rounded-full bg-black/40 px-2 py-1 text-xs text-white"
            >
              ♡
            </button>
            <div className="relative h-80">
              <Image
                src={featuredItem.image}
                alt={featuredItem.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 66vw"
              />
            </div>
            <div className="space-y-3 p-6">
              {isEvent(featuredItem) && (
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white">
                    {featuredItem.tag}
                  </span>
                  <span className="text-xs text-[var(--color-muted)]">{featuredItem.attendees}</span>
                </div>
              )}
              {(isPlace(featuredItem) || isBusiness(featuredItem)) && featuredItem.address && (
                <p className="text-xs text-[var(--color-muted)]">{featuredItem.address}</p>
              )}
              <h3 className="text-xl font-semibold">{featuredItem.title}</h3>
              <p className="text-sm text-[var(--color-muted)]">{featuredItem.description}</p>
              {isEvent(featuredItem) && featuredItem.friendsCount && (
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, idx) => (
                      <div
                        key={idx}
                        className="h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[var(--color-muted)]">
                    +{featuredItem.friendsCount} friends
                  </span>
                </div>
              )}
              {isBusiness(featuredItem) && featuredItem.hours && (
                <p className="text-xs text-[var(--color-muted)]">Open {featuredItem.hours}</p>
              )}
            </div>
          </article>
        ) : null}

        <div className="space-y-6">
          {compactItems.map((item) => (
            <article
              key={`${item.type}-${item.title}`}
              className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
            >
              <div className="relative">
                <div className="relative h-40">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute left-4 top-4 flex gap-2 text-xs font-semibold text-white">
                  {isEvent(item) && (
                    <>
                      <span className="rounded-full bg-black/45 px-3 py-1">{item.date}</span>
                      <span className="rounded-full bg-black/45 px-3 py-1">{item.duration}</span>
                    </>
                  )}
                  {(isPlace(item) || isBusiness(item)) && (
                    <>
                      <span className="rounded-full bg-black/45 px-3 py-1">{item.category}</span>
                      {item.rating && (
                        <span className="rounded-full bg-black/45 px-3 py-1">★ {item.rating}</span>
                      )}
                    </>
                  )}
                </div>
                <button
                  type="button"
                  className="absolute right-4 top-4 cursor-pointer rounded-full bg-black/40 px-2 py-1 text-xs text-white"
                >
                  ♡
                </button>
              </div>
              <div className="space-y-2 p-5">
                {isEvent(item) && (
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white">
                      {item.tag}
                    </span>
                    <span className="text-xs text-[var(--color-muted)]">{item.attendees}</span>
                  </div>
                )}
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-[var(--color-muted)]">{item.description}</p>
                {isBusiness(item) && item.hours && (
                  <p className="text-xs text-[var(--color-muted)]">{item.hours}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      )}

      {/* Grid section */}
      {gridItems.length > 0 && (
      <section className="grid gap-6 md:grid-cols-2">
        {gridItems.map((item) => (
          <article
            key={`${item.type}-${item.title}-grid`}
            className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
          >
            <div className="relative">
              <div className="relative h-44">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute left-4 top-4 flex gap-2 text-xs font-semibold text-white">
                {isEvent(item) && (
                  <>
                    <span className="rounded-full bg-black/45 px-3 py-1">{item.date}</span>
                    <span className="rounded-full bg-black/45 px-3 py-1">{item.duration}</span>
                  </>
                )}
                {(isPlace(item) || isBusiness(item)) && (
                  <>
                    <span className="rounded-full bg-black/45 px-3 py-1">{item.category}</span>
                    {item.rating && (
                      <span className="rounded-full bg-black/45 px-3 py-1">★ {item.rating}</span>
                    )}
                  </>
                )}
              </div>
              <button
                type="button"
                className="absolute right-4 top-4 cursor-pointer rounded-full bg-black/40 px-2 py-1 text-xs text-white"
              >
                ♡
              </button>
            </div>
            <div className="space-y-2 p-5">
              <div className="flex items-center justify-between">
                {isEvent(item) ? (
                  <>
                    <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-white">
                      {item.tag}
                    </span>
                    <span className="text-xs text-[var(--color-muted)]">{item.attendees}</span>
                  </>
                ) : (
                  <span className="rounded-full bg-[var(--color-pill)] px-3 py-1 text-xs font-medium text-[var(--color-ink)]">
                    {(item as PlaceCard | BusinessCard).category}
                  </span>
                )}
              </div>
              <h4 className="text-base font-semibold">{item.title}</h4>
              <p className="text-sm text-[var(--color-muted)]">{item.description}</p>
              {isBusiness(item) && item.hours && (
                <p className="text-xs text-[var(--color-muted)]">{item.hours}</p>
              )}
            </div>
          </article>
        ))}
      </section>
      )}
    </>
  );
}
