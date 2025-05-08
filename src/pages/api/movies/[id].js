import { fetchMovieById } from './dbHelpers';

export default async function handler(req, res) {
  const { id } = req.query;
  const movie = await fetchMovieById(id);

  if (!movie) return res.status(404).json({ error: 'Movie not found' });

  res.status(200).json(movie);
}
