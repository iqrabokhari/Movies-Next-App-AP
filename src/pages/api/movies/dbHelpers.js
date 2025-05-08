import clientPromise from '../../../../lib/mongodb.js'; 

export async function fetchAllMovies() {
  const client = await clientPromise;
  const db = client.db('moviehouse'); // replace with your DB name
  const movies = await db.collection('movies').find({}).toArray();

  // Convert _id to string for serialization
  return movies.map((movie) => ({
    ...movie,
    _id: movie._id.toString(),
  }));
}

export async function fetchMovieById(id) {
  const client = await clientPromise;
  const db = client.db('moviehouse');

  const movie = await db.collection('movies').findOne({ id });

  if (!movie) return null;

  return {
    ...movie,
    _id: movie._id.toString(),
  };
}
