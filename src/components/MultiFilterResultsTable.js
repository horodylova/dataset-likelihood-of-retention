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

  const summary = selectedSpecs.length
    ? selectedSpecs
        .map(spec => {
          const label = spec.display || spec.column;
          const values = Array.isArray(spec.values) ? spec.values.join(', ') : '';
          return `${label}: ${values}`;
        })
        .join(' | ')
    : '';

  return (
    <div style={containerStyle}>
      {/* Заголовок и панель выбора удалены */}
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
            {Object.entries(retentionData).map(([year, data]) => (
              <tr key={year}>
                <td style={tdStyle}>{year}</td>
                <td style={tdStyle}>{data.eligible}</td>
                <td style={tdStyle}>{data.retained}</td>
                <td style={tdStyle}>{Number(data.rate || 0).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ color: '#6c757d', margin: 0 }}>No results yet. Select options and submit</p>
      )}
    </div>
  );
}