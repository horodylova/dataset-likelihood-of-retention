'use client'

import SheetViewer from '../../components/SheetViewer';
import Link from 'next/link';

export default function Analytics() {
  return (
    <div className="container analytics-page" style={{ minHeight: '100vh', overflow: 'visible' }}>
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
      {/* Компактная кнопка возврата, фиксированно, без заголовка */}
      <Link href="/" className="back-button">
        Back to Main
      </Link>

      <div className="analytics-card">
        <SheetViewer />
      </div>
    </div>
  );
}