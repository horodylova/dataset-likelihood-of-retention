'use client';

import { useState } from 'react';

export default function SheetViewer() {
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [range, setRange] = useState('Sheet1');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!spreadsheetId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/sheets?id=${spreadsheetId}&range=${range}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error);
      }
      
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Google Sheets Viewer</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter Spreadsheet ID"
          value={spreadsheetId}
          onChange={(e) => setSpreadsheetId(e.target.value)}
          style={{ 
            padding: '10px', 
            marginRight: '10px', 
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <input
          type="text"
          placeholder="Range (e.g., Sheet1, A1:C10)"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          style={{ 
            padding: '10px', 
            marginRight: '10px', 
            width: '200px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          onClick={fetchData} 
          disabled={loading || !spreadsheetId}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Load Data'}
        </button>
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Error: {error}
        </div>
      )}

      {data && data.length > 0 && (
        <div>
          <h3>Sheet Data ({data.length} rows):</h3>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex}
                      style={{ 
                        border: '1px solid #ddd', 
                        padding: '8px',
                        backgroundColor: index === 0 ? '#f5f5f5' : 'white'
                      }}
                    >
                      {cell || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {data && data.length === 0 && (
        <div>No data found in the specified range.</div>
      )}
    </div>
  );
}