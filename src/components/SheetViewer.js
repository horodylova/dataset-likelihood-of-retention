'use client';

import React, { useState, useEffect } from 'react';
import MultiFilterTable from './MultiFilterTable';
import MultiFilterResultsTable from './MultiFilterResultsTable';
import { useRetention } from '@/contexts/RetentionContext';
import { calculateRetentionByMultiFilters } from '@/lib/filterUtils';
import { Button } from '@progress/kendo-react-buttons';
import RawDataTable from './RawDataTable';

export default function SheetViewer() {
  const [error, setError] = useState(null);
  const [showRawData, setShowRawData] = useState(false);
  const [multiFilterResults, setMultiFilterResults] = useState({});
  const [multiFilterSpecs, setMultiFilterSpecs] = useState([]);

  const { state, dispatch } = useRetention();
  const { loading, processedData, dataLoaded, rawData } = state;

  useEffect(() => {
    const loadData = async () => {
      if (dataLoaded) return;

      setError(null);
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const sheetId = '1k8Az5lkHrT54NZk_L6W4TLVp4GInU_Tmh-rZQhHe3JI';
        const range = 'EXPORT API';

        const response = await fetch(
          `/api/sheets?id=${encodeURIComponent(sheetId)}&range=${encodeURIComponent(range)}`
        );
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

    loadData();
  }, [dispatch, dataLoaded]);

  const handleMultiFilterSubmit = (filterSpecs) => {
    if (!filterSpecs || filterSpecs.length === 0 || !processedData || !rawData) {
      setMultiFilterSpecs([]);
      setMultiFilterResults({});
      return;
    }
    const results = calculateRetentionByMultiFilters(processedData, rawData, filterSpecs);
    setMultiFilterSpecs(filterSpecs);
    setMultiFilterResults(results || {});
  };

  const handleMultiFilterReset = () => {
    setMultiFilterSpecs([]);
    setMultiFilterResults({});
  };

  return (
    <div className="sheet-viewer" style={{ 
      width: '100%', 
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflow: 'visible',
      padding: '20px'
    }}>
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
      {loading && (
        <div style={{ 
          color: '#155724', 
          marginBottom: '20px',
          padding: '12px 16px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          Loading data from Google Sheets...
        </div>
      )}
      {dataLoaded && (
        <>
        
          <div style={{
            position: 'fixed',
            top: '56px',
            right: '12px',
            zIndex: 1000
          }}>
            <Button
              onClick={() => setShowRawData(!showRawData)}
              className="k-button k-button-solid k-rounded-md"
              style={{
                padding: '10px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(40, 167, 69, 0.2)'
              }}
              title="Toggle raw data visibility"
            >
              {showRawData ? 'Hide Raw Data' : 'Show Raw Data'}
            </Button>
          </div>

          {!showRawData && (
            <div className="mf-container" style={{ 
              marginTop: '12px',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start'
            }}>
              <MultiFilterTable onSubmit={handleMultiFilterSubmit} onReset={handleMultiFilterReset} />
              <div className="results-wrapper" style={{ fontSize: '13px' }}>
                <MultiFilterResultsTable retentionData={multiFilterResults} selectedSpecs={multiFilterSpecs} />
              </div>
            </div>
          )}

          {showRawData && (
            <div style={{ 
              marginTop: '30px',
              overflow: 'auto',
              width: '100%',
              maxHeight: '60vh',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <RawDataTable 
                data={rawData || []} 
                isVisible={showRawData}
                validCount={processedData ? processedData.length : 0}
              />
            </div>
          )}
        </>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .sheet-viewer {
            height: auto !important;
            overflow: visible !important;
            padding: 12px !important;
          }
          .mf-container {
            flex-direction: column !important;
          }
          .results-wrapper {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}