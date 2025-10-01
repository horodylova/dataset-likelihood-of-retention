'use client'

import SheetViewer from '../../components/SheetViewer';
import Link from 'next/link';

export default function Analytics() {
  return (
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
      {/* Удалено: фиксированная кнопка Back to Main в нижнем правом углу */}
      <div className="analytics-card">
        <SheetViewer />
      </div>
    </div>
  );
}