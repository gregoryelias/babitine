"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const CATS = ["🐱", "😺", "😸", "😻", "🐈", "🌺", "💗", "💞", "✨", "🌸"];

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
  // close on ESC
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
      {/* backdrop */}
      <button
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        aria-label="Close letter"
        onClick={onClose}
        type="button"
      />

      {/* modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="letter-modal w-full max-w-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-2xl font-extrabold text-rose-700">
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

          <div className="mt-5 text-rose-900/80 leading-relaxed">
            {children}
          </div>

          <div className="mt-6 flex items-center justify-end">
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
    }>
  >([]);

  useEffect(() => {
    const next = Array.from({ length: 42 }).map((_, i) => {
      const size = 18 + Math.random() * 28;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 6 + Math.random() * 9;
      const delay = Math.random() * 5;
      const drift = (Math.random() - 0.5) * 40;
      const item = CATS[i % CATS.length];

      return { size, left, top, duration, delay, drift, item };
    });

    setItems(next);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => (
        <span
          key={i}
          className="absolute select-none animate-floaty opacity-80"
          style={{
            left: `${it.left}%`,
            top: `${it.top}%`,
            fontSize: it.size,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
            ["--drift" as any]: `${it.drift}px`,
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
    }>
  >([]);

  useEffect(() => {
    const next = Array.from({ length: 18 }).map((_, i) => {
      const top = Math.random() * 110;
      const delay = Math.random() * 6;
      const duration = 3.5 + Math.random() * 3.5;
      const size = 16 + Math.random() * 22;
      const spin = 360 + Math.random() * 720;

      const star = i % 3 === 0 ? "⭐️" : i % 3 === 1 ? "✨" : "🌟";

      return { top, delay, duration, size, spin, star };
    });

    setThings(next);
  }, []);

  if (things.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {things.map((t, i) => (
        <span
          key={i}
          className="absolute animate-shooting-star select-none opacity-90"
          style={{
            top: `${t.top}%`,
            left: `-20%`,
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

export default function Page() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);

  const [bursts, setBursts] = useState<
    Array<{ id: string; x: number; y: number }>
  >([]);

  const [letterOpen, setLetterOpen] = useState(false);

  const phrases = useMemo(
    () => [
      "HCCCCCCC 😠",
      "clicki yes for free kissis 😽",
      "PFFFFFT 💢",
      "look at the little ceati facis 🥺",
      "u neo lovi me? 😭",
      "u must clicki yesi 💔",
    ],
    [],
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
    const nextX = clamp(Math.floor((Math.random() - 0.5) * 320), -170, 170);
    const nextY = clamp(Math.floor((Math.random() - 0.5) * 220), -110, 110);
    setNoPos({ x: nextX, y: nextY });
  };

  const redo = () => {
    setAccepted(false);
    setNoPos({ x: 0, y: 0 });
    setNoClicks(0);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-rose-100 flex items-center justify-center p-6">
      {/* ✅ Background layers mounted ONCE */}
      <FloatingCuties />
      <StarSprinkles />

      {/* ✅ Bursts layer mounted ONCE */}
      <div className="pointer-events-none fixed inset-0 z-50">
        {bursts.map((b) => (
          <span
            key={b.id}
            className="absolute burst"
            style={{ left: b.x, top: b.y }}
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="burst-piece"
                style={{ ["--i" as any]: i }}
              />
            ))}
          </span>
        ))}
      </div>

      {/* Card container mounted once; content swaps */}
      <div className="relative z-10 w-full max-w-xl rounded-[2rem] bg-white/75 backdrop-blur-xl shadow-2xl p-10 text-center border border-white/60 ring-1 ring-rose-200/50 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-rose-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-pink-300/25 blur-3xl" />

        {accepted ? (
          <>
            <LoveEnvelope onOpen={() => setLetterOpen(true)} />

            <LetterModal open={letterOpen} onClose={() => setLetterOpen(false)}>
              <p>
                u said <span className="font-bold text-rose-700">yaur</span>… so
                neow we are babis forever!!! 🥺✨
              </p>
              <p className="mt-3">
                i will protect u from all seadness and wauris.
              </p>
              <p className="mt-3">
                i will give you all the kissis, huggies, and cuddlis in the
                world.
              </p>
              <p className="mt-3">
                i will be there for BABYAY, neo matter how wauri u may become,
                or what situation we find ourselves in.
              </p>
              <p className="mt-3">
                i will be always lovi my little babi... forever and ever 💗
              </p>
              <p className="mt-3">
                signed: <span className="font-semibold text-rose-700">bab</span>{" "}
                😽
              </p>
              <p className="mt-3 text-rose-700/70">nyum 😻</p>
            </LetterModal>

            <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-2 text-rose-700 font-semibold shadow-sm border border-rose-200/60">
              <span className="animate-pulse">💖</span> Approved by the Ceati
              Council
              <span className="animate-pulse">🌺</span>
            </div>

            <div className="mt-6 text-6xl animate-bob">😻💘😻</div>
            <h1 className="mt-4 text-4xl font-extrabold text-rose-700">
              The ceatis approve!!!
            </h1>
            <p className="mt-3 text-lg text-rose-900/80">
              ah hyah! 💞 now we are babis forever
            </p>

            <div className="mt-6 mx-auto max-w-sm">
              <div className="relative w-full aspect-square">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-rose-200/60 via-pink-200/40 to-amber-100/40 blur-xl" />
                <div className="relative rounded-3xl bg-white p-3 shadow-lg border border-rose-100">
                  <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src="/ceat.jpg"
                      alt="cuti ceati"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <p className="mt-3 text-sm text-rose-800/70">
                    *ceati says: neo faulti me 🥺*
                  </p>
                </div>
              </div>
            </div>

            <button
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-rose-600 px-7 py-3 text-white font-semibold shadow-lg hover:bg-rose-700 transition active:scale-95"
              onClick={redo}
            >
              again again! 😼🔁
            </button>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-4 py-2 text-rose-700 font-semibold shadow-sm border border-rose-200/60">
              <span className="animate-pulse">🌸</span> Official Babitime
              Proposal
              <span className="animate-pulse">✨</span>
            </div>

            <div className="mt-6 text-6xl animate-bob">🐱💝🐱</div>

            <h1 className="mt-4 text-4xl font-extrabold text-rose-700">
              Will you be my babitime?
            </h1>

            <p className="mt-3 text-rose-900/70">
              neo hurti the ceati feelingis… they are just babs 🥺
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                className="group rounded-2xl bg-rose-600 px-7 py-3 text-white font-semibold shadow-lg hover:bg-rose-700 transition active:scale-95"
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
                  className="rounded-2xl bg-white px-7 py-3 text-rose-700 font-semibold shadow border border-rose-200 hover:bg-rose-50 transition active:scale-95"
                  style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
                  onMouseEnter={moveNo}
                  onClick={() => {
                    setNoClicks((c) => c + 1);
                    moveNo();
                  }}
                >
                  <span
                    className={
                      noClicks > 0 ? "animate-shiver inline-block" : ""
                    }
                  >
                    Naur 😼
                  </span>
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
