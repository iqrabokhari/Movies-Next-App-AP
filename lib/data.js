import clientPromise from './mongodb.js';

export async function getMovieData() {
  const client = await clientPromise;
  const db = client.db('moviehouse');

  const movies = await db.collection('movies').find({}).toArray();

  // Convert _id to string
  const cleanMovies = movies.map((movie) => ({
    ...movie,
    _id: movie._id.toString(),
  }));

  return { movies: cleanMovies };
}
