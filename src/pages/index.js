import { useRouter } from 'next/router';
import path from 'path';
import fs from 'fs/promises';

// Fetch data for trending movies with Incremental Static Regeneration
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  let trendingMovies = [];

  try {
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    console.log('Movies data:', data);

    // Sort movies by rating and get top 5
    trendingMovies = data.movies
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5); // top 5 rated as trending
  } catch (error) {
    console.error('Error reading movies data:', error);
  }

  return {
    props: {
      trendingMovies,
    },
    revalidate: 10, // ISR: Regenerate every 10 seconds
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
              onClick={() => router.push(`/movies/${movie.id}`)} // Navigating to movie details
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
    <button
      onClick={() => router.push('/genres')}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Browse Genres
    </button>

    <button
      onClick={() => router.push("/directors")}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Directors
    </button>

    <button
      onClick={() => router.push("/help/faq")}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Help FAQ
    </button>

    <button
      onClick={() => router.push("/help/privacy")}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Help Privacy
    </button>

    <button
      onClick={() => router.push("/help/contact")}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Help Contact
    </button>
  </div>
</div>

    </div>
  );
}
