import Link from 'next/link';
import { fetchAllMovies, fetchMovieById } from '../../api/movies/dbHelpers'; // adjust path as needed

export async function getStaticPaths() {
  const movies = await fetchAllMovies();

  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const movie = await fetchMovieById(id);

  if (!movie) return { notFound: true };

  return {
    props: { movie },
    revalidate: 10,
  };
}

export default function MovieDetails({ movie, genre, directorName }) {
  return (
    <div className="min-h-screen bg-white text-blue-900 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">{movie.title}</h1>
        <p className="text-center text-gray-600 mb-2">{movie.releaseYear} • Genre: {genre}</p>
        <p className="mt-4 text-center">{movie.description}</p>
        <p className="mt-2 text-center font-semibold">Rating: {movie.rating}</p>
        <p className="mt-2 text-center">
          Directed by: <span className="text-blue-600">{directorName}</span>
        </p>

        <div className="text-center mt-6">
          <Link
            href={`/movies/${movie.id}/director`}
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Director Info
          </Link>
        </div>

        <div className="text-center mt-6">
          <Link href="/movies" className="text-blue-600 hover:underline">
            ← Back to All Movies
          </Link>
        </div>
      </div>
    </div>
  );
}
