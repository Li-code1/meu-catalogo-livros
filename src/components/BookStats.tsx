import type { IBook } from '../types';

interface Props {
  books: IBook[];
}

const BookStats = ({ books }: Props) => {
  const stats = books.reduce((acc, book) => {
    acc.total++;
    book.status === 'Lido' ? acc.lidos++ : acc.naoLidos++;
    return acc;
  }, { total: 0, lidos: 0, naoLidos: 0 });

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
        <p className="text-sm text-gray-500 font-bold uppercase">Total</p>
        <p className="text-2xl font-black text-blue-600">{stats.total}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
        <p className="text-sm text-gray-500 font-bold uppercase">Lidos</p>
        <p className="text-2xl font-black text-green-600">{stats.lidos}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
        <p className="text-sm text-gray-500 font-bold uppercase">Pendentes</p>
        <p className="text-2xl font-black text-orange-600">{stats.naoLidos}</p>
      </div>
    </div>
  );
};

export default BookStats;