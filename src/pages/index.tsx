"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const CUTIES = ["🐱", "😺", "😸", "😻", "🐈", "🌺", "💗", "💞", "✨", "🌸", "🎀"];

function LoveEnvelope({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="absolute right-5 top-5 z-20 group"
      aria-label="Open letter"
    >
      <div className="env env-openable">
        <div className="env-flap" />
        <div className="env-body" />
        <div className="env-sparkle env-sparkle-on">✨</div>
      </div>
    </button>
  );
}

function LetterModal({
  open,
  onClose,
  title = "my little babi 💗",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        aria-label="Close letter"
        onClick={onClose}
        type="button"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="letter-modal w-full max-w-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-2xl font-extrabold text-rose-700 drop-shadow-sm">
                {title}
              </div>
              <div className="mt-1 text-sm text-rose-900/70">
                i lovi u plentifully 🥺
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-3 py-2 text-rose-700 font-semibold hover:bg-rose-50 border border-rose-200 shadow-sm transition active:scale-95"
            >
              closi ✖
            </button>
          </div>

          <div className="mt-5 text-rose-900/80 leading-relaxed">{children}</div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-sm text-rose-900/60">
              <span className="pill">certified babi letter</span>
              <span className="pill">lovi guaranteed</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-rose-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-rose-700 transition active:scale-95"
            >
              oki 😻
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingCuties() {
  const [items, setItems] = useState<
    Array<{
      size: number;
      left: number;
      top: number;
      duration: number;
      delay: number;
      drift: number;
      item: string;
      spin: number;
      wobble: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    const next = Array.from({ length: 70 }).map((_, i) => {
      const size = 16 + Math.random() * 30;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 6 + Math.random() * 10;
      const delay = Math.random() * 5;
      const drift = (Math.random() - 0.5) * 60;
      const spin = (Math.random() - 0.5) * 18;
      const wobble = 6 + Math.random() * 10;
      const opacity = 0.55 + Math.random() * 0.4;
      const item = CUTIES[i % CUTIES.length];
      return { size, left, top, duration, delay, drift, item, spin, wobble, opacity };
    });

    setItems(next);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => (
        <span
          key={i}
          className="absolute select-none animate-floaty2"
          style={{
            left: `${it.left}%`,
            top: `${it.top}%`,
            fontSize: it.size,
            opacity: it.opacity,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
            ["--drift" as any]: `${it.drift}px`,
            ["--spin" as any]: `${it.spin}deg`,
            ["--wobble" as any]: `${it.wobble}px`,
          }}
        >
          {it.item}
        </span>
      ))}
    </div>
  );
}

function StarSprinkles() {
  const [things, setThings] = useState<
    Array<{
      top: number;
      delay: number;
      duration: number;
      size: number;
      spin: number;
      star: string;
      lane: number;
    }>
  >([]);

  useEffect(() => {
    const next = Array.from({ length: 22 }).map((_, i) => {
      const top = Math.random() * 115;
      const delay = Math.random() * 6;
      const duration = 3.2 + Math.random() * 3.8;
      const size = 14 + Math.random() * 22;
      const spin = 260 + Math.random() * 720;
      const lane = i % 3;
      const star = lane === 0 ? "⭐️" : lane === 1 ? "✨" : "🌟";
      return { top, delay, duration, size, spin, star, lane };
    });

    setThings(next);
  }, []);

  if (things.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {things.map((t, i) => (
        <span
          key={i}
          className="absolute animate-shooting-star select-none"
          style={{
            top: `${t.top}%`,
            left: `-25%`,
            fontSize: `${t.size}px`,
            animationDelay: `${t.delay}s`,
            animationDuration: `${t.duration}s`,
            ["--spin" as any]: `${t.spin}deg`,
          }}
        >
          {t.star}
        </span>
      ))}
    </div>
  );
}

function PawPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 paw-mask opacity-[0.18]"
      aria-hidden="true"
    />
  );
}

export default function Page() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);

  const [bursts, setBursts] = useState<Array<{ id: string; x: number; y: number }>>([]);
  const [sparklePop, setSparklePop] = useState(false);

  const phrases = useMemo(
    () => [
      "HCCCCCCC 😠",
      "clicki yes for free kissis 😽",
      "PFFFFFT 💢",
      "look at the little ceati facis 🥺",
      "u neo lovi me? 😭",
      "u must clicki yesi 💔",
      "neo make the ceatis cri 🥺",
      "naur button is shyi 🙈",
    ],
    []
  );

  const popBurst = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX;
    const y = e.clientY;

    const id = `${Date.now()}-${Math.random()}`;
    setBursts((b) => [...b, { id, x, y }]);

    window.setTimeout(() => {
      setBursts((b) => b.filter((it) => it.id !== id));
    }, 900);
  };

  const moveNo = () => {
    const nextX = clamp(Math.floor((Math.random() - 0.5) * 360), -190, 190);
    const nextY = clamp(Math.floor((Math.random() - 0.5) * 160), -80, 80);
    setNoPos({ x: nextX, y: nextY });
  };

  const redo = () => {
    setAccepted(false);
    setNoPos({ x: 0, y: 0 });
    setNoClicks(0);
    setLetterOpen(false);
  };

  useEffect(() => {
    if (!accepted) return;
    setSparklePop(true);
    const t = window.setTimeout(() => setSparklePop(false), 1200);
    return () => window.clearTimeout(t);
  }, [accepted]);

  useEffect(() => {
    const HEARTS = ["💖", "💗", "💞", "💕", "💓", "💘", "💝"];

    // ensure there's a dedicated layer to avoid collision with other overlays
    const getLayer = () => {
      let layer = document.getElementById('cuti-heart-layer');
      if (!layer) {
        layer = document.createElement('div');
        layer.id = 'cuti-heart-layer';
        layer.style.cssText = 'position:fixed;left:0;top:0;right:0;bottom:0;pointer-events:none;z-index:99999;';
        document.body.appendChild(layer);
      }
      return layer as HTMLDivElement;
    };

    const onClick = (e: MouseEvent) => {
      // only left clicks
      if (e.button !== 0) return;
      const el = e.target as Element | null;
      // don't spawn hearts when clicking on interactive elements or opt-out areas
      if (
        el &&
        el.closest(
          'a, button, input, textarea, select, summary, label, [role="button"], [role="link"], [contenteditable], [data-no-heart]'
        )
      )
        return;

      const x = e.clientX;
      const y = e.clientY;
      const heart = document.createElement('span');
      heart.className = 'cuti-heart';
      heart.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      const size = 14 + Math.floor(Math.random() * 32);
      heart.style.position = 'absolute';
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.fontSize = `${size}px`;
      heart.style.setProperty('--rot', `${(Math.random() - 0.5) * 60}deg`);
      const layer = getLayer();
      // ensure we remove the heart when its animation completes (with a timeout fallback)
      const cleanup = () => {
        heart.removeEventListener('animationend', cleanup);
        if (heart.parentNode) heart.parentNode.removeChild(heart);
        clearTimeout(fallback);
      };

      heart.addEventListener('animationend', cleanup);
      const fallback = window.setTimeout(cleanup, 1500);

      layer.appendChild(heart);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-rose-100 flex items-center justify-center p-6">
      <PawPattern />
      <div className="pointer-events-none absolute inset-0 soft-blobs" aria-hidden="true" />

      <FloatingCuties />
      <StarSprinkles />

      <div className="pointer-events-none fixed inset-0 z-50">
        {bursts.map((b) => (
          <span key={b.id} className="absolute burst" style={{ left: b.x, top: b.y }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="burst-piece" style={{ ["--i" as any]: i }} />
            ))}
          </span>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-xl rounded-[2.2rem] bg-white/75 backdrop-blur-xl shadow-2xl p-10 text-center border border-white/60 ring-1 ring-rose-200/50 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 shimmer-border" aria-hidden="true" />

        <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-rose-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-pink-300/25 blur-3xl" />

        {accepted ? (
          <>
            <LoveEnvelope onOpen={() => setLetterOpen(true)} />

            <LetterModal open={letterOpen} onClose={() => setLetterOpen(false)}>
              <p>
                u said <span className="font-bold text-rose-700">yaur</span>… so neow we are babis forever!!! 🥺✨
              </p>
              <p className="mt-3">i will protect u from all seadness and wauris.</p>
              <p className="mt-3">i will give you all the kissis, huggis, and cuddlis in the world.</p>
              <p className="mt-3">
                i will be there for BABYAY, neo matter how wauri u may become, or what situation we find ourselves in.
              </p>
              <p className="mt-3">i will be always lovi my little babi... forever and ever 💗</p>
              <p className="mt-3">
                signed: <span className="font-semibold text-rose-700">bab</span> 😽
              </p>
              <p className="mt-3 text-rose-700/70">nyum 😻</p>
            </LetterModal>

            <div
              className={`inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-2 text-rose-700 font-semibold shadow-sm border border-rose-200/60 ${
                sparklePop ? "animate-pop" : ""
              }`}
            >
              <span className="animate-pulse">💖</span> Approved by the Ceati Council{" "}
              <span className="animate-pulse">🌺</span>
            </div>

            <div className="mt-6 text-6xl animate-bob">😻💘😻</div>
            <h1 className="mt-4 text-4xl font-extrabold text-rose-700 drop-shadow-sm">
              The ceatis approve!!!
            </h1>
            <p className="mt-3 text-lg text-rose-900/80">ah hyah! 💞 now we are babis forever</p>

            <div className="mt-6 mx-auto max-w-sm">
              <div className="relative w-full aspect-square">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-rose-200/60 via-pink-200/40 to-amber-100/40 blur-xl" />
                <div className="relative rounded-3xl bg-white p-3 shadow-lg border border-rose-100">
                  <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
                    <Image src="/ceat.jpg" alt="cuti ceati" fill className="object-cover" priority />
                  </div>
                  <p className="mt-3 text-sm text-rose-800/70">*ceati says: neo faulti me 🥺*</p>
                </div>
              </div>
            </div>

            <button
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-rose-600 px-7 py-3 text-white font-semibold shadow-lg hover:bg-rose-700 transition active:scale-95 hover:scale-[1.02]"
              onClick={redo}
            >
              again again! 😼🔁
            </button>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-2 text-rose-700 font-semibold shadow-sm border border-rose-200/60">
              <span className="animate-pulse">🌸</span> Official babitine Proposal{" "}
              <span className="animate-pulse">✨</span>
            </div>

            <div className="mt-6 text-6xl animate-bob">🐱💝🐱</div>

            <h1 className="mt-4 text-4xl font-extrabold text-rose-700 drop-shadow-sm">
              Will you be my babitine?
            </h1>

            <p className="mt-3 text-rose-900/70">neo hurti the ceati feelingis… they are just babs 🥺</p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                className="group rounded-2xl bg-rose-600 px-7 py-3 text-white font-semibold shadow-lg hover:bg-rose-700 transition active:scale-95 hover:scale-[1.02] wiggle-hover"
                onClick={(e) => {
                  popBurst(e);
                  setAccepted(true);
                  setLetterOpen(false);
                }}
              >
                <span className="inline-flex items-center gap-2">Yaur 😻</span>
              </button>

              <div className="relative">
                <button
                  className="rounded-2xl bg-white px-7 py-3 text-rose-700 font-semibold shadow border border-rose-200 hover:bg-rose-50 transition active:scale-95 hover:scale-[1.02]"
                  style={{
                    transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                    transition: "transform 220ms cubic-bezier(.2,1,.25,1)",
                  }}
                  onMouseEnter={moveNo}
                  onClick={() => {
                    setNoClicks((c) => c + 1);
                    moveNo();
                  }}
                >
                  <span className={noClicks > 0 ? "animate-shiver inline-block" : ""}>Naur 😼</span>
                </button>

                {noClicks > 0 && (
                  <p className="mt-3 text-sm text-rose-900/70">
                    {phrases[(noClicks - 1) % phrases.length]}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
