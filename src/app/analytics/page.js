'use client'

import SheetViewer from '../../components/SheetViewer';
import Link from 'next/link';

export default function Analytics() {
  return (
    <div className="container">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '30px',
        paddingBottom: '20px'
      }}>
        <h1 style={{ 
          margin: 0,
          fontSize: '28px',
          fontWeight: '600',
          color: '#2c3e50'
        }}>Analytics Dashboard</h1>
        <Link 
          href="/" 
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(52, 152, 219, 0.2)',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#2980b9';
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 4px 8px rgba(52, 152, 219, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#3498db';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 4px rgba(52, 152, 219, 0.2)';
          }}
        >
          Back to Main
        </Link>
      </div>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden'
      }}>
        <SheetViewer />
      </div>
    </div>
  );
}