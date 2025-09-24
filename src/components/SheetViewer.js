'use client';

import { useState, useEffect } from 'react';
import { useRetention } from '@/contexts/RetentionContext';
import RawDataTable from './RawDataTable';

export default function SheetViewer() {
  const [spreadsheetId, setSpreadsheetId] = useState('1k8Az5lkHrT54NZk_L6W4TLVp4GInU_Tmh-rZQhHe3JI');
  const [range, setRange] = useState('EXPORT API');
  const [error, setError] = useState(null);
  const [showRawData, setShowRawData] = useState(false);
  
  const { state, dispatch } = useRetention();
  const { loading, processedData, retentionData, chartData, dataLoaded, filters, rawData } = state;

  useEffect(() => {
    document.body.classList.add('data-page');
    return () => {
      document.body.classList.remove('data-page');
    };
  }, []);

  const loadData = async () => {
    if (!spreadsheetId) return;
    
    setError(null);
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await fetch(`/api/sheets?id=${encodeURIComponent(spreadsheetId)}&range=${encodeURIComponent(range)}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }
      
      if (!result.data || !result.data.values || result.data.values.length === 0) {
        throw new Error('No data found in the spreadsheet');
      }
      
      dispatch({ type: 'SET_DATA', payload: result.data.values });
    } catch (err) {
      setError(err.message);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateFilters = (newFilters) => {
    dispatch({ type: 'APPLY_FILTERS', payload: { ...filters, ...newFilters } });
  };

  const resetData = () => {
    dispatch({ type: 'SET_LOADING', payload: false });
    dispatch({ type: 'SET_DATA', payload: [] });
    setError(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Google Sheets Data Viewer</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Spreadsheet ID:
            <input
              type="text"
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '400px' }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>
            Range:
            <input
              type="text"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
            />
          </label>
        </div>
        
        <button
          onClick={loadData}
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginRight: '10px'
          }}
        >
          {loading ? 'Loading...' : 'Load Data'}
        </button>
        
        {dataLoaded && (
          <button
            onClick={resetData}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        )}
      </div>
      
      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#ffe6e6',
          border: '1px solid #ff9999',
          borderRadius: '4px'
        }}>
          Error: {error}
        </div>
      )}
      
      {dataLoaded && (
        <>
          <div style={{ marginBottom: '20px' }}>
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
            {Object.keys(retentionData).length > 0 ? (
              <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '600px' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Year</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Eligible</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Retained</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Rate %</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(retentionData).map(([year, data]) => (
                    <tr key={year}>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{year}</td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.eligible}</td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.retained}</td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.rate.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No retention data available</p>
            )}
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => setShowRawData(!showRawData)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {showRawData ? 'Hide Raw Data' : 'Show Raw Data'}
            </button>
          </div>
          
          {showRawData && (
            <RawDataTable 
              data={rawData || []} 
              isVisible={showRawData}
            />
          )}
        </>
      )}
    </div>
  );
}