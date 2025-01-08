'use client';
import { useState, useEffect } from 'react';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';

export default function Home() {
  const [notes, setNotes] = useState([]);

  // 加载笔记
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error('获取笔记失败:', error);
    }
  };

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        MOOD It 丨 牧笛
      </h1>
      <NoteInput onSave={addNote} />
      <NoteList notes={notes} />
    </main>
  );
}