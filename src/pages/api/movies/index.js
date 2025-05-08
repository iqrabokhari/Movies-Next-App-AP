// /pages/api/movies/index.js
import { getMovieData } from '../../../lib/data.js'

export default async function handler(req, res) {
  const data = await getMovieData();
  res.status(200).json(data.movies);
}
