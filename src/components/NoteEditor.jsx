import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Hash, Tags } from 'lucide-react';

const THEME_STYLES = {
  tanjiro: {
    name: 'Tanjiro',
    ring: 'ring-emerald-500',
    accent: 'text-emerald-400',
    chip: 'bg-emerald-600/20 text-emerald-300 border-emerald-600/40',
  },
  nezuko: {
    name: 'Nezuko',
    ring: 'ring-rose-500',
    accent: 'text-rose-300',
    chip: 'bg-rose-600/20 text-rose-300 border-rose-600/40',
  },
  zenitsu: {
    name: 'Zenitsu',
    ring: 'ring-amber-500',
    accent: 'text-amber-300',
    chip: 'bg-amber-600/20 text-amber-300 border-amber-600/40',
  },
  rengoku: {
    name: 'Rengoku',
    ring: 'ring-red-500',
    accent: 'text-red-300',
    chip: 'bg-red-600/20 text-red-300 border-red-600/40',
  },
};

export default function NoteEditor({ note, onChange }) {
  const [local, setLocal] = useState(note || null);
  useEffect(() => setLocal(note || null), [note]);

  const themeStyle = useMemo(() => THEME_STYLES[local?.theme || 'tanjiro'], [local]);

  if (!local) {
    return (
      <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50">
        <div className="flex items-center gap-3 text-neutral-400">
          <BookOpen className="w-5 h-5" />
          <p>Select a note to edit, or create a new one.</p>
        </div>
      </div>
    );
  }

  const apply = (patch) => {
    const next = { ...local, ...patch };
    setLocal(next);
    onChange && onChange(patch);
  };

  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    if (local.tags.includes(t)) return;
    apply({ tags: [...local.tags, t] });
    setTagInput('');
  };

  const removeTag = (t) => {
    apply({ tags: local.tags.filter(x => x !== t) });
  };

  return (
    <div className={`p-6 rounded-xl border border-neutral-800 bg-neutral-900/60 shadow-inner ${themeStyle?.ring || ''}`}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={local.title}
            onChange={e => apply({ title: e.target.value })}
            className="flex-1 px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="Note title"
          />
          <select
            value={local.theme}
            onChange={e => apply({ theme: e.target.value })}
            className="px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800 focus:outline-none"
          >
            {Object.entries(THEME_STYLES).map(([key, val]) => (
              <option key={key} value={key}>{val.name}</option>
            ))}
          </select>
        </div>

        <textarea
          value={local.content}
          onChange={e => apply({ content: e.target.value })}
          rows={10}
          className="w-full px-3 py-3 rounded-md bg-neutral-950 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono text-sm"
          placeholder={`Write your notes. For flashcards, use lines like: Question :: Answer`}
        />

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); addTag(); }
              }}
              placeholder="Add a tag and press Enter"
              className="w-full pl-9 pr-24 py-2 rounded-md bg-neutral-950 border border-neutral-800 focus:outline-none"
            />
            <button onClick={addTag} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {local.tags.map(t => (
              <span key={t} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs ${themeStyle.chip}`}>
                <Tags className="w-3 h-3" />
                {t}
                <button onClick={() => removeTag(t)} className="ml-1 text-neutral-400 hover:text-white">×</button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
