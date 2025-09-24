'use client'

import SheetViewer from '../../components/SheetViewer';
import Link from 'next/link';

export default function Analytics() {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '20px',
        gap: '20px'
      }}>
        <h1 style={{ margin: 0 }}>Analytics Dashboard</h1>
        <Link 
          href="/" 
          style={{
            padding: '8px 16px',
            backgroundColor: '#007acc',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          Back to Main
        </Link>
      </div>
      <SheetViewer />
    </div>
  );
}