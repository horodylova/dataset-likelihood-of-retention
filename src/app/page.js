'use client'

// top-level imports
import { Splitter, SplitterPane } from '@progress/kendo-react-layout';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { useState, useEffect, useCallback } from 'react';
import { useRetention } from '@/contexts/RetentionContext';
import DisabilitiesSection from '../components/DisabilitiesSection';
import VariablesSection from '../components/VariablesSection';
import OutputsSection from '../components/OutputsSection';
import Link from 'next/link';
import { Button } from '@progress/kendo-react-buttons';
import { calculateRetentionByMultiFilters } from '@/lib/filterUtils';

export default function Home() {
  const [outputData, setOutputData] = useState([]);
  const [multiSpecs, setMultiSpecs] = useState({});
  const [resetSignal, setResetSignal] = useState(0);
  const { state, dispatch } = useRetention();
  const { loading, dataLoaded, processedData, rawData } = state;

  const createFilterRow = useCallback((filterName, data) => {
    const newRow = {
      filter: filterName,
      ...Array.from({ length: 10 }, (_, i) => ({
        [`year${i + 1}`]: data[`Year ${i + 1}`]?.rate || 0
      })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
    };
    
    setOutputData(prev => {
      const existingIndex = prev.findIndex(r => r.filter === filterName);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newRow;
        return updated;
      }
      return [...prev, newRow];
    });
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (dataLoaded) return;
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const spreadsheetId = '1k8Az5lkHrT54NZk_L6W4TLVp4GInU_Tmh-rZQhHe3JI';
        const range = 'EXPORT API';
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
        console.error('Error loading data:', err);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    loadData();
  }, [dispatch, dataLoaded]);

  // Сбор выборов из секций
  const updateMultiSelection = useCallback((label, payload) => {
    setMultiSpecs(prev => {
      const next = { ...prev };
      if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
        const values = Array.isArray(payload.values) ? payload.values : [];
        if (payload.combined || values.length > 0) {
          next[label] = { combined: !!payload.combined, values: new Set(values) };
        } else {
          delete next[label];
        }
      } else {
        const values = Array.isArray(payload) ? payload : [];
        if (values.length > 0) {
          next[label] = { combined: false, values: new Set(values) };
        } else {
          delete next[label];
        }
      }
      return next;
    });
  }, []);

  // Submit: считаем по текущим выбранным спецификациям (один или много)
  const handleMultiSubmit = useCallback(() => {
    if (!processedData || !rawData) return;

    const specs = Object.entries(multiSpecs)
      .filter(([_, entry]) => entry && (entry.combined || (entry.values && entry.values.size > 0)))
      .map(([column, entry]) => ({
        column,
        values: Array.from(entry.values || []),
        combined: !!entry.combined
      }));

    if (specs.length === 0) return;

    const retention = calculateRetentionByMultiFilters(processedData, rawData, specs);
    const name = specs
      .map(s => {
        const vals = Array.isArray(s.values) && s.values.length > 0 ? s.values.join(', ') : (s.combined ? 'combined' : '');
        return `${s.column}: ${vals}`;
      })
      .join('; ');
    createFilterRow(name, retention);
  }, [processedData, rawData, multiSpecs, createFilterRow]);

  const handleMultiReset = useCallback(() => {
    setMultiSpecs({});
    setResetSignal(s => s + 1);
  }, []);

  return (
    <div className="container" style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 0 20px 0',
        flexShrink: 0
      }}>
        <h1 style={{ 
          margin: 0,
          fontSize: '24px',
          fontWeight: '600',
          color: 'var(--kendo-color-secondary)'
        }}>
          Retention Analysis
        </h1>
        <Link 
          href="/analytics" 
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--kendo-color-primary)',
            color: 'var(--kendo-color-on-primary)',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
        >
          View Analytics
        </Link>
      </div>

      <div style={{ 
        flex: 1,
        overflow: 'hidden'
      }}>
        <Splitter 
          orientation="horizontal"
          style={{ height: '100%' }}
        >
          <SplitterPane size="30%" min="250px">
            <div style={{ height: '100%', overflow: 'auto', padding: '10px', position: 'relative' }}>
              {/* Панель действий: Reset / Submit */}
              <div style={{
                position: 'sticky',
                top: 10,
                zIndex: 2,
                marginBottom: '12px',
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                border: '1px solid #e9ecef',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px'
              }}>
                <Button
                  onClick={handleMultiReset}
                  className="k-button k-button-solid k-button-solid-primary k-rounded-md"
                >
                  Reset
                </Button>
                <Button
                  onClick={handleMultiSubmit}
                  className="k-button k-button-solid k-button-solid-success k-rounded-md"
                >
                  Submit
                </Button>
              </div>

              <PanelBar>
                <PanelBarItem title="Variables" expanded={true}>
                  <VariablesSection 
                    resetSignal={resetSignal}
                    onMultiSelectionChange={updateMultiSelection}
                  />
                </PanelBarItem>
                <PanelBarItem title="Disabilities">
                  <DisabilitiesSection 
                    resetSignal={resetSignal}
                    onMultiSelectionChange={updateMultiSelection}
                  />
                </PanelBarItem>
              </PanelBar>
            </div>
          </SplitterPane>

          <SplitterPane>
            <OutputsSection 
              loading={loading}
              retentionData={outputData}
            />
          </SplitterPane>
        </Splitter>
      </div>
    </div>
  );
}
