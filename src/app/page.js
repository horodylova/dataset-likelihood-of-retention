'use client'
 
import { Splitter, SplitterPane } from '@progress/kendo-react-layout';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { useState, useEffect, useCallback } from 'react';
import { useRetention } from '@/contexts/RetentionContext';
import DisabilitiesSection from '../components/DisabilitiesSection';
import OutputsSection from '../components/OutputsSection';
import IncomeSection from '../components/IncomeSection';
import AgencySection from '../components/AgencySection';
import DemographicsSection from '../components/DemographicsSection';
import ProgramScreeningSection from '../components/ProgramScreeningSection';
import NeighborhoodSection from '../components/NeighborhoodSection';

import Link from 'next/link';
import { Button } from '@progress/kendo-react-buttons';
import { Fade } from '@progress/kendo-react-animation';
import { calculateRetentionByMultiFilters } from '@/lib/filterUtils';

export default function Home() {
  const [outputData, setOutputData] = useState([]);
  const [multiSpecs, setMultiSpecs] = useState({});
  const [resetSignal, setResetSignal] = useState(0);
  const [submitCounter, setSubmitCounter] = useState(0);  
  const { state, dispatch } = useRetention();
  const { loading, dataLoaded, processedData, rawData } = state;

  const createFilterRow = useCallback((filterName, data) => {
    const newRow = {
      filter: filterName,
      _retention: data,
      ...Array.from({ length: 10 }, (_, i) => ({
        [`year${i}`]: data[`Year ${i}`]?.rate || 0
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

  const updateMultiSelection = useCallback((label, payload) => {
    setMultiSpecs(prev => {
      const next = { ...prev };
      if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
        const values = Array.isArray(payload.values) ? payload.values : [];
        const combined = !!payload.combined && values.length === 0; // combined ТОЛЬКО если бакеты не выбраны
        if (combined || values.length > 0) {
          next[label] = { combined, values: new Set(values) };
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
    setSubmitCounter(c => c + 1);  
  }, [processedData, rawData, multiSpecs, createFilterRow]);

  const handleMultiReset = useCallback(() => {
    setMultiSpecs({});
    setResetSignal(s => s + 1);
  }, []);

  const handleClearOutputs = useCallback(() => {
    setOutputData([]);
  }, []);

  return (
    <div className="container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'visible',
      boxSizing: 'border-box'
    }}>
      <style jsx>{`
        @media (max-width: 768px) {
          :global(.k-splitter) {
            flex-direction: column !important;
          }
          :global(.k-splitter-bar) {
            display: none !important;
          }
          :global(.k-splitter-pane) {
            width: 100% !important;
            height: auto !important;
            margin-bottom: 12px !important;
          }
          :global(.k-splitter-pane:last-child) {
            margin-bottom: 0 !important;
          }
          :global(.container) {
            height: auto !important;
            min-height: 100vh !important;
          }
          :global(.outputs-grid) {
            height: 420px !important;
            overflow: auto !important;
          }
          :global(.k-chart) {
            height: 280px !important;
          }
          :global(.k-panelbar) {
            width: 100% !important;
          }
        }
      `}</style>

      <div style={{ 
        flex: 1,
        overflow: 'hidden'
      }}>
        <Splitter 
          orientation="horizontal"
          style={{ height: '100%' }}
        >
          <SplitterPane size="380px" min="320px">
            <div style={{ 
              height: '100%', 
              overflow: 'auto', 
              padding: '10px', 
              position: 'relative',
              width: '100%',
              minWidth: '320px' 
            }}>
              <div style={{
                position: 'sticky',
                top: 10,
                left: 0,
                right: 0,
                width: '100%',
                zIndex: 2,
                marginBottom: '12px',
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                border: '1px solid #e9ecef',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                boxSizing: 'border-box',
                flexWrap: 'nowrap',
                overflow: 'visible'
              }}>
                <Button
                  onClick={handleMultiReset}
                  className="k-button k-button-solid k-button-solid-primary k-rounded-md"
                  style={{ flex: '0 0 auto' }}
                >
                  Reset
                </Button>
                <Button
                  onClick={handleMultiSubmit}
                  className="k-button k-button-solid k-button-solid-success k-rounded-md"
                  style={{ flex: '0 0 auto' }}
                >
                  Submit
                </Button>
              </div>

              <PanelBar>
                <PanelBarItem title="Demographics" expanded={false}>
                  <DemographicsSection 
                    resetSignal={resetSignal}
                    onMultiSelectionChange={updateMultiSelection}
                  />
                </PanelBarItem>

                <PanelBarItem title="Program & Screening" expanded={false}>
                  <ProgramScreeningSection 
                    resetSignal={resetSignal}
                    onMultiSelectionChange={updateMultiSelection}
                  />
                </PanelBarItem>

                <PanelBarItem title="Disabilities" expanded={false}>
                  <DisabilitiesSection 
                    resetSignal={resetSignal}
                    onMultiSelectionChange={updateMultiSelection}
                  />
                </PanelBarItem>

                <PanelBarItem title="Income" expanded={false}>
                  <IncomeSection
                    resetSignal={resetSignal}
                    onMultiSelectionChange={updateMultiSelection}
                  />
                </PanelBarItem>

                <PanelBarItem title="Agency" expanded={false}>
                  <AgencySection
                    resetSignal={resetSignal}
                    onMultiSelectionChange={updateMultiSelection}
                  />
                </PanelBarItem>

                <PanelBarItem title="Neighborhood" expanded={false}>
                  <NeighborhoodSection
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
              onClearOutputs={handleClearOutputs}
            />
          </SplitterPane>
        </Splitter>
      </div>
    </div>
  );
}

