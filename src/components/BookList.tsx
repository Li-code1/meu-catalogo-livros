import type { IBook } from '../types';

interface ItemProps {
  book: IBook;
  onDelete: (id: string) => void;
  onToggle: (book: IBook) => void;
}

const BookItem = ({ book, onDelete, onToggle }: ItemProps) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center mb-3">
    <div>
      <h4 className="text-lg font-bold text-gray-800">{book.title}</h4>
      <p className="text-gray-500">{book.author}</p>
      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold ${
        book.status === 'Lido' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
      }`}>
        {book.status}
      </span>
    </div>
    <div className="flex gap-2">
      <button onClick={() => onToggle(book)} className="p-2 hover:bg-blue-50 rounded-full">🔄</button>
      <button onClick={() => book._id && onDelete(book._id)} className="p-2 hover:bg-red-50 rounded-full text-red-600">🗑️</button>
    </div>
  </div>
);

interface ListProps {
  books: IBook[];
  onDelete: (id: string) => void;
  onToggle: (book: IBook) => void;
}

const BookList = ({ books, onDelete, onToggle }: ListProps) => (
  <div className="space-y-2">
    {books.length > 0 ? books.map(b => (
      <BookItem key={b._id} book={b} onDelete={onDelete} onToggle={onToggle} />
    )) : <p className="text-center text-gray-500">Nenhum livro encontrado.</p>}
  </div>
);

export default BookList;