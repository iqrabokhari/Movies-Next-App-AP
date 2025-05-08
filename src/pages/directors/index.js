import Link from 'next/link';
import { fetchAllDirectorsWithMovies } from '../api/directors/index.js'; // Adjust the import path as necessary

export async function getServerSideProps() {
  const { directors, movies } = await fetchAllDirectorsWithMovies();

  return {
    props: {
      directors,
      movies,
    },
  };
}

export default function DirectorsPage({ directors, movies }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Directors</h1>

      <div className="space-y-4">
        {directors.map((director) => {
          const moviesDirected = movies.filter((movie) => movie.directorId === director.id);

          return (
            <div key={director.id} className="border p-4 rounded shadow-md">
              <h2 className="text-2xl font-semibold">{director.name}</h2>
              <p className="mt-2">{director.biography}</p>
              <h3 className="mt-4 text-xl font-medium">Movies Directed:</h3>
              <ul className="list-disc pl-6 mt-2">
                {moviesDirected.map((movie) => (
                  <li key={movie.id}>
                    <Link href={`/movies/${movie.id}`} className="text-blue-600 hover:underline">
                      {movie.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
