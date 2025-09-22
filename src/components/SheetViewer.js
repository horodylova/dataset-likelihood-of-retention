'use client';

import { useState } from 'react';
import { useRetention } from '@/contexts/RetentionContext';

export default function SheetViewer() {
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [range, setRange] = useState('Sheet1');
  const [error, setError] = useState(null);
  
  const { state, dispatch } = useRetention();
  const { loading, processedData, retentionData, chartData, dataLoaded, filters } = state;

  const loadData = async () => {
    if (!spreadsheetId || dataLoaded) return;
    
    setError(null);
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await fetch(`/api/sheets?id=${spreadsheetId}&range=${range}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error);
      }
      
      dispatch({ type: 'SET_DATA', payload: result.data });
    } catch (err) {
      setError(err.message);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  const updateFilters = (newFilters) => {
    dispatch({ type: 'APPLY_FILTERS', payload: { ...filters, ...newFilters } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Retention Data Analysis</h2>
      
      {!dataLoaded && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Spreadsheet ID"
            value={spreadsheetId}
            onChange={(e) => setSpreadsheetId(e.target.value)}
            style={{ padding: '8px', marginRight: '10px', width: '300px' }}
          />
          <input
            type="text"
            placeholder="Range"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            style={{ padding: '8px', marginRight: '10px', width: '100px' }}
          />
          <button 
            onClick={loadData} 
            disabled={loading || !spreadsheetId}
            style={{ padding: '8px 16px' }}
          >
            {loading ? 'Loading...' : 'Load Data'}
          </button>
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Error: {error}
        </div>
      )}

      {dataLoaded && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h3>Filters:</h3>
            <label style={{ marginRight: '20px' }}>
              <input
                type="checkbox"
                checked={filters.showCurrentResidents}
                onChange={(e) => updateFilters({ showCurrentResidents: e.target.checked })}
              />
              Current Residents
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.showFormerResidents}
                onChange={(e) => updateFilters({ showFormerResidents: e.target.checked })}
              />
              Former Residents
            </label>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h3>Retention by Year:</h3>
            <table style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Year</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Eligible</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Retained</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Rate %</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map(item => (
                  <tr key={item.year}>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.year}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.eligible}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.retained}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.rate.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div>
            <h3>Processed Data ({processedData.length} residents):</h3>
            <p>Current residents: {processedData.filter(r => r.isCurrentResident).length}</p>
            <p>Former residents: {processedData.filter(r => !r.isCurrentResident).length}</p>
          </div>
        </div>
      )}
    </div>
  );
}