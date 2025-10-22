'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function ModernLoader({
  visible = false,
  fullScreen = false,
  text = 'Loading...',
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !visible) return null;

  const loader = (
    <div
      style={{
        position: fullScreen ? 'fixed' : 'relative',
        inset: fullScreen ? 0 : 'auto',
        width: fullScreen ? '100vw' : '100%',
        height: fullScreen ? '100vh' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: fullScreen ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: fullScreen ? 'blur(6px)' : 'none',
        zIndex: 9999,
      }}
    >
      <div className="spinner"></div>
      {text && <p className="loader-text">{text}</p>}

      <style jsx>{`
        .spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(56, 76, 158, 0.2);
          border-top-color: #ff5e00;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .loader-text {
          margin-top: 14px;
          font-size: 16px;
          font-weight: 500;
          color: #384c9e;
          text-align: center;
          animation: fadeIn 0.6s ease forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );

   return fullScreen ? createPortal(loader, document.body) : loader;
}

