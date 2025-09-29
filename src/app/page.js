'use client'

import { Splitter, SplitterPane } from '@progress/kendo-react-layout';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { useState, useEffect, useCallback } from 'react';
import { useRetention } from '@/contexts/RetentionContext';
import DisabilitiesSection from '../components/DisabilitiesSection';
import VariablesSection from '../components/VariablesSection';
import OutputsSection from '../components/OutputsSection';
import Link from 'next/link';

export default function Home() {
  const [outputData, setOutputData] = useState([]);
  const { state, dispatch } = useRetention();
  const { loading, dataLoaded } = state;

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
              padding: '10px'
            }}>
              <PanelBar>
                <PanelBarItem title="Variables" expanded={true}>
                  <VariablesSection 
                    onGenderFilterChange={addGenderFilter}
                    onVeteranFilterChange={addVeteranFilter}
                    onSubstanceAbuseFilterChange={addSubstanceAbuseFilter}
                    onFeloniesFilterChange={addFeloniesFilter}
                    onDTFilterChange={addDTFilter}
                    onFosterCareFilterChange={addFCFilter}
                    onDisabilityCountFilterChange={addDisabilityCountFilter}
                    onIncomeSourceFilterChange={addIncomeSourceFilter}
                  />
                </PanelBarItem>
                <PanelBarItem title="Disabilities">
                  <DisabilitiesSection 
                    onVisualFilterChange={addVisualFilter}
                    onHearingFilterChange={addHearingFilter}
                    onAlzheimerFilterChange={addAlzheimerFilter}
                    onHIVFilterChange={addHIVFilter}
                    onPhysicalMedicalFilterChange={addPhysicalMedicalFilter}
                    onMentalHealthFilterChange={addMentalHealthFilter}
                    onPhysicalMobilityFilterChange={addPhysicalMobilityFilter}
                    onAlcoholAbuseFilterChange={addAlcoholAbuseFilter}
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
