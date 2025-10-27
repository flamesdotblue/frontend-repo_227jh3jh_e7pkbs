import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import NoteEditor from './components/NoteEditor.jsx';
import NotesList from './components/NotesList.jsx';
import StudyTools from './components/StudyTools.jsx';

// Simple id generator
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

export default function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('ds-notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const [filterTheme, setFilterTheme] = useState('all');

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('ds-notes', JSON.stringify(notes));
  }, [notes]);

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notes.filter(n => {
      const matchesQuery = !q ||
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.tags.join(' ').toLowerCase().includes(q);
      const matchesTheme = filterTheme === 'all' || n.theme === filterTheme;
      return matchesQuery && matchesTheme;
    });
  }, [notes, query, filterTheme]);

  const createNote = () => {
    const newNote = {
      id: uid(),
      title: 'Untitled Note',
      content: '',
      tags: [],
      theme: 'tanjiro',
      favorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedId(newNote.id);
  };

  const updateNote = (id, patch) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n));
  };

  const deleteNote = id => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const toggleFavorite = id => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, favorite: !n.favorite, updatedAt: new Date().toISOString() } : n));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header onCreate={createNote} query={query} onQuery={setQuery} filterTheme={filterTheme} onFilterTheme={setFilterTheme} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <NotesList
              notes={filteredNotes}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDelete={deleteNote}
              onToggleFavorite={toggleFavorite}
            />
          </section>

          <aside className="lg:col-span-1">
            <StudyTools notes={notes} />
          </aside>
        </div>

        <section className="mt-8">
          <NoteEditor
            note={selectedNote}
            onChange={(patch) => selectedNote && updateNote(selectedNote.id, patch)}
          />
        </section>
      </main>
    </div>
  );
}
