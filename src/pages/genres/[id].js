import Link from 'next/link';
import { fetchGenreWithMovies } from '../api/genres/[id]'; // Adjust the import path as necessary

export async function getServerSideProps(context) {
  const { id } = context.params;

  const result = await fetchGenreWithMovies(id);
  if (!result) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      genreName: result.genreName,
      movies: result.movies,
    },
  };
}

export default function GenreMoviesPage({ genreName, movies }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Movies in: {genreName}</h1>
      {movies.length === 0 ? (
        <p className="text-gray-600">No movies found for this genre.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-600">{movie.releaseYear}</p>
              <p className="text-sm">Rating: {movie.rating}</p>
              <p className="text-sm mt-2 text-gray-700">{movie.description}</p>
            </div>
          ))}
        </div>
      )}
      <Link
        href="/genres"
        className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ← Back to Genres
      </Link>
    </div>
  );
}
