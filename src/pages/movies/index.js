import { useState } from 'react';
import { useRouter } from 'next/router';
import path from 'path';
import fs from 'fs/promises';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  let allMovies = [];

  try {
    const jsonData = await fs.readFile(filePath);
    allMovies = JSON.parse(jsonData).movies || [];
  } catch (error) {
    console.error('Error loading movie data:', error);
  }

  return {
    props: {
      allMovies,
    },
    revalidate: 10,
  };
}

export default function MoviesPage({ allMovies }) {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Get unique genres from the movies data
  const genres = Array.from(
    new Set(allMovies.flatMap((movie) => movie.genreId)) // Collect all genreIds
  );
  
  const genreNames = {
    g1: "Science Fiction",
    g3: "Adventure",
    g4: "Drama",
    g5: "Thriller",
  };

  const genreOptions = ["All", ...genres.map((genreId) => genreNames[genreId] || genreId)];

  // Filter movies by selected genre
  const filteredMovies =
    selectedGenre === "All"
      ? allMovies
      : allMovies.filter((movie) => genreNames[movie.genreId] === selectedGenre);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Movies</h1>

      {/* Genre Filter */}
      <div className="mb-6">
        <label htmlFor="genre" className="mr-2 font-semibold">Filter by Genre:</label>
        <select
          id="genre"
          className="border rounded px-3 py-1"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genreOptions.map((genre) => (
            <option key={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* Movie Cards */}
      {filteredMovies.length === 0 ? (
        <p>No movies found for this genre.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => router.push(`/movies/${movie.id}`)}
            >
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-600">{movie.releaseYear}</p>
              <p className="text-sm">Rating: {movie.rating}</p>
              <p className="text-sm text-gray-500">
                Genre: {genreNames[movie.genreId]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
