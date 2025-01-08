'use client';

export default function NoteList({ notes }) {
  if (notes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-8 text-center text-gray-300">
        还没有笔记，开始写第一篇吧！
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-4">
      {notes.map((note) => (
        <div 
          key={note._id}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
          <div className="text-sm text-gray-500 mt-2">
            {new Date(note.createdAt).toLocaleString('zh-CN')}
          </div>
        </div>
      ))}
    </div>
  );
}