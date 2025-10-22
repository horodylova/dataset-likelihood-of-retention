'use client'

import SheetViewer from '../../components/SheetViewer';
import AuthGuard from '../../components/AuthGuard';
import Link from 'next/link';

export default function Analytics() {
  return (
    <AuthGuard>
      <div className="container analytics-page">
      <style jsx>{`
        @media (max-width: 768px) {
          :global(.analytics-page) {
            padding: 12px;
          }
          :global(.analytics-card) {
            padding: 0;
          }
        }
      `}</style>
     
      <div className="analytics-card">
        <SheetViewer />
      </div>
    </div>
    </AuthGuard>
  );
}