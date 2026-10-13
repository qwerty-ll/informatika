import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import Code from '../components/Code';
import { MARQUEE_TILES, type MarqueeTile } from '../data/content';

const TILE_WIDTH = 420;
const GAP = 12; // gap-3

const ROW_ONE = MARQUEE_TILES.slice(0, 10);
const ROW_TWO = MARQUEE_TILES.slice(10);

// утраиваем набор, чтобы лента не обрывалась с обеих сторон
const tripled = (tiles: MarqueeTile[]) => [...tiles, ...tiles, ...tiles];

const PASTELS = ['bg-tint-green', 'bg-tint-violet', 'bg-tint-blue', 'bg-tint-cyan'];
// цвет плитки без кода — по её порядку среди таких же, чтобы пастели чередовались
const PLAIN_TILES = MARQUEE_TILES.filter((tile) => !tile.code);

function Tile({ tile }: { tile: MarqueeTile }) {
  return (
    <div
      className={`flex h-[270px] w-[420px] shrink-0 flex-col justify-between rounded-3xl p-7 text-ink ${
        tile.code ? 'border border-line bg-surface shadow-soft' : PASTELS[PLAIN_TILES.indexOf(tile) % PASTELS.length]
      }`}
    >
      <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
        {'// '}
        {tile.tag}
      </span>
      {tile.code ? <Code code={tile.code} className="overflow-hidden text-[15px]" /> : null}
      <span className="text-2xl font-semibold leading-tight">{tile.title}</span>
    </div>
  );
}

function Row({ tiles, trackRef }: { tiles: MarqueeTile[]; trackRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div ref={trackRef} className="flex w-max gap-3" aria-hidden="true" style={{ willChange: 'transform' }}>
      {tripled(tiles).map((tile, i) => (
        <Tile key={i} tile={tile} />
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowOneRef = useRef<HTMLDivElement>(null);
  const rowTwoRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const setOne = ROW_ONE.length * (TILE_WIDTH + GAP);
    const setTwo = ROW_TWO.length * (TILE_WIDTH + GAP);
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      // базовый сдвиг на целый набор даёт «запас» ленты с той стороны, откуда она едет
      if (rowOneRef.current) {
        rowOneRef.current.style.transform = `translateX(${offset - 200 - setOne}px)`;
      }
      if (rowTwoRef.current) {
        rowTwoRef.current.style.transform = `translateX(${-(offset - 200) - setTwo}px)`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    if (reduceMotion) return;

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Темы занятий"
      className="overflow-hidden pb-10 pt-16 sm:pt-24 md:pt-28"
    >
      <div className="flex flex-col gap-3">
        <Row tiles={ROW_ONE} trackRef={rowOneRef} />
        <Row tiles={ROW_TWO} trackRef={rowTwoRef} />
      </div>
    </section>
  );
}
