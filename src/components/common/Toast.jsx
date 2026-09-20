import React, { useEffect } from 'react';

const Toast = ({ message, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: '#1E293B',
        color: '#FFFFFF',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 99999,
        fontSize: '0.9rem',
        borderLeft: '4px solid #F59E0B',
        animation: 'slideInUp 0.3s ease-out',
      }}
    >
      <i className="fa-solid fa-circle-check" style={{ color: '#22C55E', fontSize: '1.1rem' }}></i>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#94A3B8',
          cursor: 'pointer',
          marginLeft: '0.5rem',
          fontSize: '1rem',
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default Toast;
