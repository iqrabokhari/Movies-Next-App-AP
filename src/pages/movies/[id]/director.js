import Link from 'next/link';
import { fetchAllMovies } from '../../api/movies/dbHelpers'; // or a better path
import { fetchDirectorByMovieId } from '../../api/directors/index.js'; // adjust path as needed

export async function getStaticPaths() {
  const movies = await fetchAllMovies();

  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const data = await fetchDirectorByMovieId(id);
  if (!data) return { notFound: true };

  return {
    props: {
      movieId: data.movieId,
      movieTitle: data.movieTitle,
      director: data.director,
    },
  };
}

export default function DirectorPage({ movieId, movieTitle, director }) {
  return (
    <div className="min-h-screen bg-white text-blue-900 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 py-4 px-6 text-center text-2xl font-bold text-white mb-6">
          Director Info
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Director of {movieTitle}</h1>
          <h2 className="text-xl font-semibold text-blue-800 mb-4">{director.name}</h2>
          <p className="text-blue-700 text-lg mb-6 whitespace-pre-line">{director.biography}</p>

          <Link
            href={`/movies/${movieId}`}
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            ← Back to Movie
          </Link>
        </div>
      </div>
    </div>
  );
}
