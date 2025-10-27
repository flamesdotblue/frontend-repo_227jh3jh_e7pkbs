import React, { useMemo, useState } from 'react';
import { Shuffle, Play, Pause, RotateCcw, Timer } from 'lucide-react';

function parseFlashcards(notes) {
  const cards = [];
  notes.forEach(n => {
    const lines = (n.content || '').split(/\n+/);
    lines.forEach(line => {
      const idx = line.indexOf('::');
      if (idx !== -1) {
        const q = line.slice(0, idx).trim();
        const a = line.slice(idx + 2).trim();
        if (q && a) cards.push({ q, a, theme: n.theme, source: n.title });
      }
    });
  });
  return cards;
}

export default function StudyTools({ notes }) {
  const allCards = useMemo(() => parseFlashcards(notes), [notes]);
  const [i, setI] = useState(0);
  const [showA, setShowA] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  React.useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  const next = () => {
    setI(x => (x + 1) % Math.max(1, allCards.length));
    setShowA(false);
  };

  const shuffle = () => {
    setI(Math.floor(Math.random() * Math.max(1, allCards.length)));
    setShowA(false);
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">Flashcards</h4>
          <button onClick={shuffle} className="inline-flex items-center gap-2 text-sm px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700">
            <Shuffle className="w-4 h-4" /> Shuffle
          </button>
        </div>
        {allCards.length === 0 ? (
          <p className="text-sm text-neutral-400">Add lines like "Question :: Answer" inside your notes to generate cards.</p>
        ) : (
          <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
            <p className="text-xs text-neutral-400">From: {allCards[i]?.source}</p>
            <div className="mt-2">
              <p className="font-medium">{allCards[i]?.q}</p>
              {showA && (
                <p className="mt-2 text-emerald-300">{allCards[i]?.a}</p>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setShowA(s => !s)} className="px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-sm">{showA ? 'Hide' : 'Reveal'}</button>
              <button onClick={next} className="px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-sm">Next</button>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold inline-flex items-center gap-2"><Timer className="w-4 h-4" /> Focus Timer</h4>
          <div className="flex gap-2">
            <button onClick={() => { setSeconds(25*60); setRunning(false); }} className="px-2 py-1 text-xs rounded bg-neutral-800 hover:bg-neutral-700">25m</button>
            <button onClick={() => { setSeconds(15*60); setRunning(false); }} className="px-2 py-1 text-xs rounded bg-neutral-800 hover:bg-neutral-700">15m</button>
            <button onClick={() => { setSeconds(5*60); setRunning(false); }} className="px-2 py-1 text-xs rounded bg-neutral-800 hover:bg-neutral-700">5m</button>
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-mono tracking-widest">{mm}:{ss}</div>
          <div className="mt-3 flex justify-center gap-2">
            <button onClick={() => setRunning(true)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-sm"><Play className="w-4 h-4" /> Start</button>
            <button onClick={() => setRunning(false)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-sm"><Pause className="w-4 h-4" /> Pause</button>
            <button onClick={() => { setRunning(false); setSeconds(25*60); }} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-sm"><RotateCcw className="w-4 h-4" /> Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}
