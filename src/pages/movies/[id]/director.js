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
    fallback: false, 
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const movie = data.movies.find((m) => m.id === id);
  if (!movie) {
    return { notFound: true };
  }

  const director = data.directors.find((d) => d.id === movie.directorId);
  if (!director) {
    return { notFound: true };
  }

  return {
    props: {
      movieId: movie.id,  
      movieTitle: movie.title,
      director,
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
