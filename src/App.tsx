import { useState, useEffect } from 'react';
import axios from 'axios';
import type { IBook } from './types';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BookStats from './components/BookStats';

const API_URL = 'https://crudcrud.com/api/d0dabb55d9214ea4a55f5be45e1bb48f/livros';

const App = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const resp = await axios.get<IBook[]>(API_URL);
      setBooks(resp.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBooks(); }, []);

  const addBook = async (book: IBook) => {
    try {
      const resp = await axios.post<IBook>(API_URL, book);
      setBooks(prev => [...prev, resp.data]);
    } catch { alert("Erro ao adicionar"); }
  };

  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBooks(prev => prev.filter(b => b._id !== id));
    } catch { alert("Erro ao deletar"); }
  };

  const toggleStatus = async (book: IBook) => {
    try {
      const newStatus = book.status === 'Lido' ? 'Não lido' : 'Lido';
      const { _id, ...dataWithoutId } = { ...book, status: newStatus as any };
      await axios.put(`${API_URL}/${_id}`, dataWithoutId);
      setBooks(prev => prev.map(b => b._id === _id ? { ...b, status: newStatus } : b));
    } catch { alert("Erro ao atualizar"); }
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">📚 Meu Catálogo</h1>
          <p className="text-gray-600">Gerencie sua biblioteca pessoal com Tailwind v4.</p>
        </header>

        <BookForm onAdd={addBook} />
        <BookStats books={books} />

        <div className="relative mb-6">
          <input 
            className="w-full p-4 pl-12 bg-white rounded-xl shadow-sm border border-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Pesquisar título ou autor..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-4 opacity-50">🔍</span>
        </div>

        {loading ? <p className="text-center">Carregando...</p> : 
          <BookList books={filteredBooks} onDelete={deleteBook} onToggle={toggleStatus} />
        }
      </div>
    </div>
  );
};

export default App;