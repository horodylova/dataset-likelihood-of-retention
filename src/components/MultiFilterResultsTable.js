import React from 'react';

export default function MultiFilterResultsTable({ retentionData, selectedSpecs = [] }) {
  const containerStyle = {
    width: '55%',
    minWidth: '420px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: '12px',
    border: '1px solid #e9ecef',
  };

  const tableStyle = { width: '100%', borderCollapse: 'collapse' };
  const thStyle = { border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5', textAlign: 'left' };
  const tdStyle = { border: '1px solid #ccc', padding: '8px' };

  const hasData = retentionData && Object.keys(retentionData).length > 0;

  return (
    <div style={containerStyle}>
  
      {hasData ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Year</th>
              <th style={thStyle}>Eligible</th>
              <th style={thStyle}>Retained</th>
              <th style={thStyle}>Rate %</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => {
              const yearKey = `Year ${i + 1}`;
              const data = retentionData[yearKey] || {};
              return (
                <tr key={yearKey}>
                  <td style={tdStyle}>{yearKey}</td>
                  <td style={tdStyle}>{data.eligible || 0}</td>
                  <td style={tdStyle}>{data.retained || 0}</td>
                  <td style={tdStyle}>{Number(data.rate || 0).toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p style={{ color: '#6c757d', margin: 0 }}>No results yet. Select options and submit</p>
      )}
    </div>
  );
}