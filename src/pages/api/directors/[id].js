// /pages/api/directors/[id].js
import { getData } from '../../../lib/getData';

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  const data = await getData();
  const director = data.directors.find((d) => d.id === id);

  if (!director) {
    return res.status(404).json({ error: 'Director not found' });
  }

  const moviesByDirector = data.movies.filter((movie) => movie.directorId === id);

  res.status(200).json({ director, movies: moviesByDirector });
}
