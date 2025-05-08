// /pages/api/genres/index.js
import { getData } from '../../../lib/getData';

export default async function handler(req, res) {
  const data = await getData();
  res.status(200).json(data.genres);
}
