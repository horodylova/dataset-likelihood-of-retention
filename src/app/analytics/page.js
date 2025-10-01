'use client'

import SheetViewer from '../../components/SheetViewer';
import Link from 'next/link';

export default function Analytics() {
  return (
    <div className="container analytics-page">
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