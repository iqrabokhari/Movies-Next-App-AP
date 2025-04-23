// pages/404.js

import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>Oops! The page you're looking for doesn't exist.</p>
      <Link href="/">
        <button style={styles.button}>Go Home</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    textAlign: 'center',
  },
  heading: {
    fontSize: '3rem',
    color: '#1f2937',
  },
  text: {
    margin: '1rem 0',
    color: '#4b5563',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};
