import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md dark:bg-blue-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200">
          🎬 Movie House
        </Link>

        <div className="space-x-4 flex items-center">
          <Link href="/movies" className="hover:text-gray-200">Movies</Link>
          <Link href="/genres" className="hover:text-gray-200">Genres</Link>
          <Link href="/directors" className="hover:text-gray-200">Directors</Link>

          {/* Dark mode toggle button */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
}
