import Link from 'next/link';
import { fetchAllGenres }  from '../api/genres/[id]'; ;

export async function getServerSideProps() {
  const genres = await fetchAllGenres();

  return {
    props: {
      genres,
    },
  };
}

export default function GenresPage({ genres }) {
  return (
    <div className="min-h-screen bg-white text-blue-900 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Browse Genres</h1>
        
        <ul className="space-y-4">
          {genres.map((genre) => (
            <li key={genre.id} className="text-center">
              <Link
                href={`/genres/${genre.id}`}
                className="text-blue-600 hover:underline text-lg font-semibold"
              >
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
