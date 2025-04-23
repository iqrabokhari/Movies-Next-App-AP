import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  // Load genres from the file directly
  const genres = data.genres || [];

  return {
    props: {
      genres,
    },
  };
}

export default function GenresPage({ genres }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Browse Genres</h1>
      <ul className="space-y-2">
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link
              href={`/genres/${genre.id}`}
              className="text-blue-600 hover:underline"
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
