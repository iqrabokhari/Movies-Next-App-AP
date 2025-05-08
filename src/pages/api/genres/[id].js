import clientPromise from '../../../../lib/mongodb.js'; 

export async function fetchGenreWithMovies(id) {
  const client = await clientPromise;
  const db = client.db('moviehouse');

  const genre = await db.collection('genres').findOne({ id });
  if (!genre) return null;

  const movies = await db.collection('movies').find({ genreId: id }).toArray();

  return {
    genreName: genre.name,
    movies: movies.map((movie) => ({
      ...movie,
      _id: movie._id.toString(),
    })),
  };
}

export async function fetchAllGenres() {
  const client = await clientPromise;
  const db = client.db('moviehouse');

  const genres = await db.collection('genres').find({}).toArray();

  return genres.map((genre) => ({
    ...genre,
    _id: genre._id.toString(),
  }));
}

