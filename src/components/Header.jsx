import React from 'react';
import { Flame, BookOpen, Plus, Search, Timer } from 'lucide-react';

const themes = [
  { id: 'all', label: 'All' },
  { id: 'tanjiro', label: 'Tanjiro' },
  { id: 'nezuko', label: 'Nezuko' },
  { id: 'zenitsu', label: 'Zenitsu' },
  { id: 'rengoku', label: 'Rengoku' },
];

export default function Header({ onCreate, query, onQuery, filterTheme, onFilterTheme }) {
  return (
    <header className="relative overflow-hidden">
      {/* Checkered and gradient aura inspired by Demon Slayer patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_10%,#0ea5e9_0%,transparent_40%),radial-gradient(circle_at_80%_20%,#ef4444_0%,transparent_40%),radial-gradient(circle_at_50%_90%,#22c55e_0%,transparent_35%)]" />
        <div className="absolute -bottom-10 right-10 w-[520px] h-[520px] rotate-6 opacity-10" aria-hidden>
          <div className="w-full h-full bg-[length:40px_40px] bg-[linear-gradient(90deg,_rgba(255,255,255,0.7)_1px,_transparent_1px),linear-gradient(0deg,_rgba(255,255,255,0.7)_1px,_transparent_1px)]" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-rose-600 to-amber-500 shadow-lg shadow-rose-900/30">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Breath of Study</h1>
              <p className="text-xs text-neutral-400">Notes and learning companion inspired by Demon Slayer</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="inline-flex items-center gap-2 text-neutral-300 text-sm">
              <Timer className="w-4 h-4" /> Focus. Learn. Slay distractions.
            </span>
          </div>

          <button onClick={onCreate} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-semibold">
            <Plus className="w-4 h-4" /> New Note
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="col-span-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                value={query}
                onChange={e => onQuery(e.target.value)}
                placeholder="Search your notes, tags, ideas..."
                className="w-full pl-9 pr-3 py-2 rounded-md bg-neutral-900/80 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => onFilterTheme(t.id)}
                className={`px-3 py-2 rounded-md text-sm border transition-colors whitespace-nowrap ${
                  filterTheme === t.id ? 'bg-emerald-600 border-emerald-500' : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
