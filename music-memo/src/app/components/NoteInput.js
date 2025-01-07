'use client';
import { useState } from 'react';

export default function NoteInput({ onSave }) {
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (note.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: note }),
        });
        
        if (response.ok) {
          const data = await response.json();
          onSave(note);
          setNote('');
        }
      } catch (error) {
        console.error('保存失败:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <textarea
        className="w-full p-4 border rounded-lg shadow-sm text-gray-800 bg-white"
        rows="6"
        placeholder="写下你的想法..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        className={`mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? '保存中...' : '保存'}
      </button>
    </div>
  );
}