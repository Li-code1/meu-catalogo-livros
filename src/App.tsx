import { useState, useEffect } from 'react';
import axios from 'axios';
import type { IBook } from './types';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BookStats from './components/BookStats';

// 1. LEMBRE-SE: Troque este ID pelo novo do site crudcrud.com
const API_URL = 'https://crudcrud.com/api/d0dabb55d9214ea4a55f5be45e1bb48f/livros';
const LOCAL_STORAGE_KEY = 'meu_catalogo_backup';

const App = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Função para buscar dados (Híbrida)
  const fetchBooks = async () => {
    try {
      const resp = await axios.get<IBook[]>(API_URL);
      setBooks(resp.data);
      // Sincroniza o backup local com o que veio da nuvem
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resp.data));
    } catch (err) {
      console.error("API expirada ou erro de rede, carregando local...", err);
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localData) setBooks(JSON.parse(localData));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  // Adicionar (Híbrido)
  const addBook = async (book: IBook) => {
    try {
      const resp = await axios.post<IBook>(API_URL, book);
      const updatedBooks = [...books, resp.data];
      setBooks(updatedBooks);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBooks));
    } catch (err) {
      console.warn("Salvando apenas localmente (API indisponível)");
      // Cria um ID temporário para o backup local não quebrar
      const localBook = { ...book, _id: Date.now().toString() };
      const updatedBooks = [...books, localBook];
      setBooks(updatedBooks);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBooks));
    }
  };

  // Deletar (Híbrido)
  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch {
      console.warn("Removendo localmente");
    }
    const updatedBooks = books.filter(b => b._id !== id);
    setBooks(updatedBooks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBooks));
  };

  // Atualizar Status (Híbrido)
  const toggleStatus = async (book: IBook) => {
    const newStatus = book.status === 'Lido' ? 'Não lido' : 'Lido';
    const updatedBook = { ...book, status: newStatus as any };

    try {
      const { _id, ...dataWithoutId } = updatedBook;
      await axios.put(`${API_URL}/${_id}`, dataWithoutId);
    } catch {
      console.warn("Atualizado apenas localmente");
    }

    const updatedBooks = books.map(b => b._id === book._id ? updatedBook : b);
    setBooks(updatedBooks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBooks));
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
          <p className="text-gray-600">Gerencie sua biblioteca pessoal (API + LocalStorage).</p>
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
