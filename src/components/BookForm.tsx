import { useState } from 'react';
import type { IBook } from '../types';

interface Props {
  onAdd: (book: IBook) => void;
}

const BookForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    onAdd({ title, author, status: 'Não lido' });
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4">
      <input 
        className="flex-1 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Título do livro..." 
        value={title} onChange={e => setTitle(e.target.value)} 
      />
      <input 
        className="flex-1 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Autor..." 
        value={author} onChange={e => setAuthor(e.target.value)} 
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
        Adicionar
      </button>
    </form>
  );
};

export default BookForm;