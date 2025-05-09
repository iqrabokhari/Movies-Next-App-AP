// pages/index.js
import { useRouter } from 'next/router';
import { getMovieData } from '../../lib/data.js';

export async function getStaticProps() {
  let trendingMovies = [];

  try {
    const data = await getMovieData();

    trendingMovies = data.movies
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  } catch (error) {
    console.error('Error reading movies data:', error);
  }

  return {
    props: {
      trendingMovies,
    },
    revalidate: 10, 
  };
}

export default function Home({ trendingMovies }) {
  const router = useRouter();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Trending Movies</h1>

      {trendingMovies.length === 0 ? (
        <p>No trending movies available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingMovies.map((movie) => (
            <div
              key={movie.id}
              className="cursor-pointer border p-4 rounded shadow hover:shadow-lg transition"
              onClick={() => router.push(`/movies/${movie.id}`)}
            >
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-600">{movie.releaseYear}</p>
              <p className="text-sm">Rating: {movie.rating}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Navigation</h2>
        <div className="flex flex-wrap gap-4">
          {[{ label: 'Browse Genres', path: '/genres' },
            { label: 'Directors', path: '/directors' },
            { label: 'Help FAQ', path: '/help/faq' },
            { label: 'Help Privacy', path: '/help/privacy' },
            { label: 'Help Contact', path: '/help/contact' },
          ].map((nav) => (
            <button
              key={nav.path}
              onClick={() => router.push(nav.path)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {nav.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
