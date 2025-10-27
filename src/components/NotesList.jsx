import React from 'react';
import { Star, Trash2 } from 'lucide-react';

const themeCard = {
  tanjiro: 'from-emerald-900/40 via-emerald-800/20',
  nezuko: 'from-rose-900/40 via-rose-800/20',
  zenitsu: 'from-amber-900/40 via-amber-800/20',
  rengoku: 'from-red-900/40 via-red-800/20',
};

export default function NotesList({ notes, selectedId, onSelect, onDelete, onToggleFavorite }) {
  if (!notes.length) {
    return (
      <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 text-neutral-400">
        No notes yet. Create one to get started.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {notes.map(note => (
        <button
          key={note.id}
          onClick={() => onSelect(note.id)}
          className={`text-left rounded-xl border border-neutral-800 bg-gradient-to-br ${themeCard[note.theme]} to-neutral-900/60 hover:shadow-lg hover:shadow-black/20 transition-shadow p-4 relative ${selectedId === note.id ? 'ring-2 ring-emerald-600' : ''}`}
        >
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(note.id); }}
              className={`p-2 rounded-md border ${note.favorite ? 'bg-yellow-500/20 border-yellow-500/40' : 'bg-neutral-900/60 border-neutral-700'}`}
              title="Favorite"
            >
              <Star className={`w-4 h-4 ${note.favorite ? 'text-yellow-400 fill-yellow-400' : ''}`} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
              className="p-2 rounded-md border bg-neutral-900/60 border-neutral-700 hover:bg-red-900/40"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-300" />
            </button>
          </div>
          <h3 className="text-base font-semibold pr-20">{note.title || 'Untitled'}</h3>
          <p className="mt-2 text-sm text-neutral-300 line-clamp-3 whitespace-pre-wrap">
            {note.content || 'No content yet.'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {note.tags.map(t => (
              <span key={t} className="px-2 py-1 rounded-full bg-neutral-800/60 border border-neutral-700 text-xs">#{t}</span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}
