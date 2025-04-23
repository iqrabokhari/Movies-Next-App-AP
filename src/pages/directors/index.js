import Link from 'next/link';
import path from 'path';
import fs from 'fs/promises';

// Fetch data server-side
export async function getStaticProps() {
  try {
    // Get the path to the JSON file (located in the 'data' folder)
    const filePath = path.join(process.cwd(), 'data', 'movies.json');

    // Read the JSON file
    const jsonData = await fs.readFile(filePath);

    // Parse JSON data
    const data = JSON.parse(jsonData);

    return {
      props: {
        data, 
      },
    };
  } catch (error) {
    console.error('Error reading movies data:', error);
    return {
      notFound: true, 
    };
  }
}


export default function DirectorsPage({ data }) {
  
  const directors = data.directors;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Directors</h1>

      <div className="space-y-4">
        {directors.map((director) => {
         
          const moviesDirected = data.movies.filter((movie) => movie.directorId === director.id);

          return (
            <div key={director.id} className="border p-4 rounded shadow-md">
              <h2 className="text-2xl font-semibold">{director.name}</h2>
              <p className="mt-2">{director.biography}</p>
              <h3 className="mt-4 text-xl font-medium">Movies Directed:</h3>
              <ul className="list-disc pl-6 mt-2">
              // Inside DirectorsPage component

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
