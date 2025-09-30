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
import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import MultiFilterTable from '../components/MultiFilterTable';
import { calculateRetentionByMultiFilters } from '@/lib/filterUtils';

export default function Home() {
  const [outputData, setOutputData] = useState([]);
  const [filterMode, setFilterMode] = useState('single');
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

  const addGenderFilter = useCallback((genderType, genderData) => {
    const filterName = `Gender: ${genderType}`;
    createFilterRow(filterName, genderData);
  }, [createFilterRow]);

  const addVeteranFilter = useCallback((veteranType, veteranData) => {
    const filterName = `Veteran: ${veteranType}`;
    createFilterRow(filterName, veteranData);
  }, [createFilterRow]);

  const addSubstanceAbuseFilter = useCallback((substanceType, substanceData) => {
    const filterName = `Substance Abuse: ${substanceType}`;
    createFilterRow(filterName, substanceData);
  }, [createFilterRow]);

  const addFeloniesFilter = useCallback((feloniesType, feloniesData) => {
    const filterName = `Felonies: ${feloniesType}`;
    createFilterRow(filterName, feloniesData);
  }, [createFilterRow]);

  const addDTFilter = useCallback((dtType, dtData) => {
    const filterName = `DT: ${dtType}`;
    createFilterRow(filterName, dtData);
  }, [createFilterRow]);

  const addFCFilter = useCallback((fcType, fcData) => {
    const filterName = `FC: ${fcType}`;
    createFilterRow(filterName, fcData);
  }, [createFilterRow]);

  const addVisualFilter = useCallback((type, data) => {
    const filterName = `Visual: ${type}`;
    createFilterRow(filterName, data);
  }, [createFilterRow]);

  const addHearingFilter = useCallback((type, data) => {
    const filterName = `Hearing: ${type}`;
    createFilterRow(filterName, data);
  }, [createFilterRow]);

  const addAlzheimerFilter = useCallback((type, data) => {
    const filterName = `Alzheimer's / Dementia: ${type}`;
    createFilterRow(filterName, data);
  }, [createFilterRow]);

  const addHIVFilter = useCallback((type, data) => {
    const filterName = `HIV / AIDS: ${type}`;
    createFilterRow(filterName, data);
  }, [createFilterRow]);

  const addPhysicalMedicalFilter = useCallback((type, data) => {
    const filterName = `Physical / Medical: ${type}`;
    createFilterRow(filterName, data);
  }, [createFilterRow]);

  const addMentalHealthFilter = useCallback((type, data) => {
    const filterName = `Mental Health: ${type}`;
    createFilterRow(filterName, data);
  }, [createFilterRow]);

  const addPhysicalMobilityFilter = useCallback((type, data) => {
    const filterName = `Physical / Mobility: ${type}`;
    createFilterRow(filterName, data);
  }, [createFilterRow]);

  const addAlcoholAbuseFilter = useCallback((type, data) => {
    const filterName = `Alcohol Abuse: ${type}`;
    createFilterRow(filterName, data);
  }, [createFilterRow]);

  const addDisabilityCountFilter = useCallback((countType, countData) => {
    const filterName = `Disability Count: ${countType}`;
    createFilterRow(filterName, countData);
  }, [createFilterRow]);

  const addIncomeSourceFilter = useCallback((incomeType, incomeData) => {
    const filterName = `Income Source: ${incomeType}`;
    createFilterRow(filterName, incomeData);
  }, [createFilterRow]);

  // Сбор мультирежима: поддержка { combined, values }
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

  // Сабмит мультирежима с учетом combined
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

  console.log('Current outputData:', outputData);

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
            <div style={{ 
              height: '100%',
              overflow: 'auto',
              padding: '10px',
              position: 'relative'
            }}>
              {/* Filtering Mode toggle */}
              <div style={{
                marginBottom: '12px',
                padding: '10px',
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                 
                  <ButtonGroup selection="single">
                    <Button 
                      togglable={true} 
                      selected={filterMode === 'single'} 
                      onClick={() => setFilterMode('single')}
                    >
                      Single
                    </Button>
                    <Button 
                      togglable={true} 
                      selected={filterMode === 'multi'} 
                      onClick={() => setFilterMode('multi')}
                    >
                      Multi-Select
                    </Button>
                  </ButtonGroup>
                </div>
              </div>

              {/* Floating multi-select summary in sidebar */}
              {filterMode === 'multi' && (
                <div style={{
                  position: 'sticky',
                  top: 10,
                  zIndex: 2,
                  marginBottom: '12px',
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button
                        onClick={handleMultiReset}
                        className="k-button k-button-solid k-rounded-md"
                        style={{
                          padding: '8px 14px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: 500,
                          boxShadow: '0 2px 4px rgba(0, 123, 255, 0.2)',
                          transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                        }}
                        title="Clear selection"
                      >
                        Reset
                      </Button>
                      <Button
                        onClick={handleMultiSubmit}
                        className="k-button k-button-solid k-rounded-md"
                        style={{
                          padding: '8px 14px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: 500,
                          boxShadow: '0 2px 4px rgba(40, 167, 69, 0.2)',
                          transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                        }}
                        title="Submit filters and compute retention"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <PanelBar>
                <PanelBarItem title="Variables" expanded={true}>
                  <VariablesSection 
                    mode={filterMode}
                    resetSignal={resetSignal}
                    onMultiSelectionChange={updateMultiSelection}
                    onGenderFilterChange={filterMode === 'single' ? addGenderFilter : undefined}
                    onVeteranFilterChange={filterMode === 'single' ? addVeteranFilter : undefined}
                    onSubstanceAbuseFilterChange={filterMode === 'single' ? addSubstanceAbuseFilter : undefined}
                    onFeloniesFilterChange={filterMode === 'single' ? addFeloniesFilter : undefined}
                    onDTFilterChange={filterMode === 'single' ? addDTFilter : undefined}
                    onFosterCareFilterChange={filterMode === 'single' ? addFCFilter : undefined}
                    onDisabilityCountFilterChange={filterMode === 'single' ? addDisabilityCountFilter : undefined}
                    onIncomeSourceFilterChange={filterMode === 'single' ? addIncomeSourceFilter : undefined}
                  />
                </PanelBarItem>
                <PanelBarItem title="Disabilities">
                  <DisabilitiesSection 
                    mode={filterMode}
                    resetSignal={resetSignal}
                    onMultiSelectionChange={updateMultiSelection}
                    onVisualFilterChange={filterMode === 'single' ? addVisualFilter : undefined}
                    onHearingFilterChange={filterMode === 'single' ? addHearingFilter : undefined}
                    onAlzheimerFilterChange={filterMode === 'single' ? addAlzheimerFilter : undefined}
                    onHIVFilterChange={filterMode === 'single' ? addHIVFilter : undefined}
                    onPhysicalMedicalFilterChange={filterMode === 'single' ? addPhysicalMedicalFilter : undefined}
                    onMentalHealthFilterChange={filterMode === 'single' ? addMentalHealthFilter : undefined}
                    onPhysicalMobilityFilterChange={filterMode === 'single' ? addPhysicalMobilityFilter : undefined}
                    onAlcoholAbuseFilterChange={filterMode === 'single' ? addAlcoholAbuseFilter : undefined}
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
