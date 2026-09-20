import React, { useState, useEffect } from 'react';
import { fetchHealth } from '../services/api';

const Home = () => {
  const [serverStatus, setServerStatus] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    fetchHealth()
      .then((data) => setServerStatus({ loading: false, data, error: null }))
      .catch((err) => setServerStatus({ loading: false, data: null, error: err.message }));
  }, []);

  return (
    <main style={styles.main}>
      <section style={styles.hero}>
        <h1 style={styles.title}>Welcome to <span style={styles.brand}>ComfortSpace</span></h1>
        <p style={styles.subtitle}>
          Modern full-stack setup with React.js Frontend, Node.js & Express Backend, and MongoDB.
        </p>

        <div style={styles.statusCard}>
          <h3>Backend API Status</h3>
          {serverStatus.loading && <p>Checking backend connection on port 5000...</p>}
          {serverStatus.data && (
            <p style={{ color: '#16a34a', fontWeight: '600' }}>
              ✓ Connected: {serverStatus.data.message}
            </p>
          )}
          {serverStatus.error && (
            <p style={{ color: '#dc2626' }}>
              ℹ Backend not connected yet (Start backend with <code>npm run dev</code> inside <code>/Backend</code>).
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

const styles = {
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4rem 1.5rem',
  },
  hero: {
    maxWidth: '700px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '1rem',
  },
  brand: {
    color: '#6366f1',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#64748b',
    lineHeight: 1.6,
    marginBottom: '2rem',
  },
  statusCard: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  },
};

export default Home;
