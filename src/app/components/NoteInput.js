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
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '保存失败');
        }

        const data = await response.json();
        onSave(note);
        setNote('');
      } catch (error) {
        console.error('保存失败:', error);
        alert(error.message || '保存失败，请稍后重试');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="note-input">
      <textarea
        className="note-textarea"
        rows="6"
        placeholder="写下你的想法..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        className={`save-button ${isLoading ? 'loading' : ''}`}
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? '保存中...' : '保存'}
      </button>
    </div>
  );
}