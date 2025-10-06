'use client';

import React from 'react';
import SheetViewer from '@/components/SheetViewer';

export default function Page() {
  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible',
        boxSizing: 'border-box'
      }}
    >
      <SheetViewer />
      <style jsx>{`
        @media (max-width: 768px) {
          :global(.container) {
            height: auto !important;
            min-height: 100vh !important;
          }
        }
      `}</style>
    </div>
  );
}