import clientPromise from '../../../../lib/mongodb.js';

export async function fetchDirectorByMovieId(movieId) {
  const client = await clientPromise;
  const db = client.db('moviehouse');

  const movie = await db.collection('movies').findOne({ id: movieId });
  if (!movie) return null;

  const director = await db.collection('directors').findOne({ id: movie.directorId });
  if (!director) return null;

  return {
    movieId: movie.id,
    movieTitle: movie.title,
    director: {
      name: director.name,
      biography: director.biography,
    },
  };
}

export async function fetchAllDirectorsWithMovies() {
  const client = await clientPromise;
  const db = client.db('moviehouse');

  const [directors, movies] = await Promise.all([
    db.collection('directors').find({}).toArray(),
    db.collection('movies').find({}).toArray(),
  ]);

  return {
    directors: directors.map((d) => ({ ...d, _id: d._id.toString() })),
    movies: movies.map((m) => ({ ...m, _id: m._id.toString() })),
  };
}

