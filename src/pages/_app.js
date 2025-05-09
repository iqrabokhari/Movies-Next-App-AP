import '../styles/globals.css';
import Navbar from '../../components/Navbar';
import { ThemeProvider } from '../../context/ThemeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="min-h-screen bg-gray-50 text-blue-900 dark:bg-gray-900 dark:text-white">
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}

export default MyApp;
