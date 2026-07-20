"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { PlaceholderPhoto } from "@/components/placeholder-photo";

export function PropertyGallery({ photos, title }: { photos: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (photos.length === 0) {
    return <PlaceholderPhoto className="aspect-[4/3] w-full rounded-xl" />;
  }

  const total = photos.length;
  const go = (next: number) => setIndex((next + total) % total);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? index + 1 : index - 1);
    touchStartX.current = null;
  }

  return (
    <div>
      {/* Foto principal */}
      <div
        className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-carvao/5"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          key={photos[index]}
          src={photos[index]}
          alt={`${title} — foto ${index + 1} de ${total}`}
          fill
          priority={index === 0}
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 text-carvao flex items-center justify-center shadow hover:bg-white"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Próxima foto"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 text-carvao flex items-center justify-center shadow hover:bg-white"
            >
              <ChevronRight />
            </button>
            <span className="absolute bottom-2 right-2 bg-carvao/70 text-white text-xs font-medium px-2 py-1 rounded-full font-utility tabular-nums">
              {index + 1}/{total}
            </span>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {total > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, i) => (
            <button
              type="button"
              key={photo}
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 ${
                i === index ? "border-anil" : "border-transparent opacity-70"
              }`}
            >
              <Image
                src={photo}
                alt=""
                fill
                loading="lazy"
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
