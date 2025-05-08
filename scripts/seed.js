import 'dotenv/config'; 
import { readFile } from 'fs/promises';
import clientPromise from '../lib/mongodb.js';
async function seed() {
  const client = await clientPromise;
  const db = client.db('moviehouse');

  const jsonData = JSON.parse(
    await readFile(new URL('./movies.json', import.meta.url))
  );

  await db.collection('movies').deleteMany({});
  await db.collection('genres').deleteMany({});
  await db.collection('directors').deleteMany({});

  await db.collection('movies').insertMany(jsonData.movies);
  await db.collection('genres').insertMany(jsonData.genres);
  await db.collection('directors').insertMany(jsonData.directors);

  console.log('✅ Data seeded successfully!');
  process.exit();
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
