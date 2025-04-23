import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const paths = data.movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: 'blocking', // for ISR and fallback support
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const movie = data.movies.find((m) => m.id === id);
  const genre = data.genres.find((g) => g.id === movie?.genreId);
  const director = data.directors.find((d) => d.id === movie?.directorId);

  if (!movie) {
    return { notFound: true };
  }

  return {
    props: {
      movie,
      genre: genre?.name || 'Unknown',
      directorName: director?.name || 'Unknown',
    },
    revalidate: 10, // ISR
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
