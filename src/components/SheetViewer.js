'use client';

import { useState, useEffect } from 'react';
import { useRetention } from '@/contexts/RetentionContext';
import RawDataTable from './RawDataTable';
import ResidentsRetentionTable from './ResidentsRetentionTable';
import GenderRetentionTable from './GenderRetentionTable';

export default function SheetViewer() {
  const [spreadsheetId, setSpreadsheetId] = useState('1k8Az5lkHrT54NZk_L6W4TLVp4GInU_Tmh-rZQhHe3JI');
  const [range, setRange] = useState('EXPORT API');
  const [error, setError] = useState(null);
  const [showRawData, setShowRawData] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const { state, dispatch } = useRetention();
  const { loading, processedData, retentionData, chartData, dataLoaded, filters, rawData } = state;

  useEffect(() => {
    document.body.classList.add('data-page');
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.body.classList.remove('data-page');
      window.removeEventListener('resize', handleResize);
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
      
      
      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        border: '1px solid #dee2e6'
      }}>
        <h3 style={{ 
          margin: '0 0 15px 0',
          color: '#495057',
          fontSize: '18px'
        }}>
          Data Source Configuration
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isDesktop ? '2fr 1fr auto' : '1fr', 
          gap: '15px', 
          alignItems: 'end',
          maxWidth: '800px'
        }}> 
          <div> 
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: '500', 
              color: '#495057' 
            }}> 
              Google Spreadsheet ID: 
            </label> 
            <input 
              type="text" 
              value={spreadsheetId} 
              onChange={(e) => setSpreadsheetId(e.target.value)} 
              style={{ 
                width: '100%', 
                padding: '8px 12px', 
                border: '1px solid #ced4da', 
                borderRadius: '4px', 
                fontSize: '14px' 
              }} 
            /> 
          </div> 
          
          <div> 
            <label style={{ 
              display: 'block', 
              marginBottom: '5px', 
              fontWeight: '500', 
              color: '#495057' 
            }}> 
              Data Range: 
            </label> 
            <input 
              type="text" 
              value={range} 
              onChange={(e) => setRange(e.target.value)} 
              style={{ 
                width: '100%', 
                padding: '8px 12px', 
                border: '1px solid #ced4da', 
                borderRadius: '4px', 
                fontSize: '14px' 
              }} 
            /> 
          </div> 
          
          <button 
            onClick={loadData} 
            disabled={loading} 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: loading ? '#6c757d' : '#1e40af', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              fontSize: '14px', 
              fontWeight: '500', 
              minWidth: '120px' 
            }} 
          > 
            {loading ? 'Loading...' : 'Load Data'} 
          </button> 
        </div>
      </div>

      {error && (
        <div style={{ 
          color: '#721c24', 
          marginBottom: '20px',
          padding: '12px 16px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {dataLoaded && (
        <>
          <div style={{ 
            display: 'flex', 
            gap: '30px', 
            marginBottom: '30px',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1', minWidth: '400px' }}>
              <ResidentsRetentionTable 
                retentionData={retentionData || {}}
                filters={filters}
                updateFilters={updateFilters}
              />
            </div>

            <div style={{ flex: '1', minWidth: '400px' }}>
              <GenderRetentionTable 
                processedData={processedData} 
                filters={filters}
              />
            </div>
          </div>
          
          <div style={{ 
            borderTop: '1px solid #dee2e6',
            paddingTop: '20px'
          }}>
            <button
              onClick={() => setShowRawData(!showRawData)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {showRawData ? 'Hide Raw Data' : 'Show Raw Data'}
            </button>
          </div>
          
          {showRawData && (
            <div style={{ marginTop: '20px' }}>
              <RawDataTable 
                data={rawData || []} 
                isVisible={showRawData}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}