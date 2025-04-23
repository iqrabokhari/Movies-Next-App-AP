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
    fallback: false, // or true/‘blocking’ if you want ISR
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
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
      movieTitle: movie.title,
      director,
    },
  };
}

export default function DirectorPage({ movieTitle, director }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Director of {movieTitle}</h1>
      <h2 className="text-xl font-semibold">{director.name}</h2>
      <p className="mt-2 text-gray-700">{director.biography}</p>
      <Link href={`/movies/${director.id}`} className="mt-6 inline-block text-blue-600 hover:underline">
        ← Back to Movie
      </Link>
    </div>
  );
}
