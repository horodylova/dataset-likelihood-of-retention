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
    const newRow = {
      filter: filterName,
      year1: genderData['Year 1']?.rate || 0,
      year2: genderData['Year 2']?.rate || 0,
      year3: genderData['Year 3']?.rate || 0,
      year4: genderData['Year 4']?.rate || 0,
      year5: genderData['Year 5']?.rate || 0,
      year6: genderData['Year 6']?.rate || 0,
      year7: genderData['Year 7']?.rate || 0,
      year8: genderData['Year 8']?.rate || 0,
      year9: genderData['Year 9']?.rate || 0,
      year10: genderData['Year 10']?.rate || 0
    };
    setOutputData(prevData => {
      const existingIndex = prevData.findIndex(row => row.filter === filterName);
      if (existingIndex >= 0) {
        const updatedData = [...prevData];
        updatedData[existingIndex] = newRow;
        return updatedData;
      } else {
        return [...prevData, newRow];
      }
    });
  }, []);

  const addVeteranFilter = useCallback((veteranType, veteranData) => {
    const filterName = `Veteran: ${veteranType}`;
    const newRow = {
      filter: filterName,
      year1: veteranData['Year 1']?.rate || 0,
      year2: veteranData['Year 2']?.rate || 0,
      year3: veteranData['Year 3']?.rate || 0,
      year4: veteranData['Year 4']?.rate || 0,
      year5: veteranData['Year 5']?.rate || 0,
      year6: veteranData['Year 6']?.rate || 0,
      year7: veteranData['Year 7']?.rate || 0,
      year8: veteranData['Year 8']?.rate || 0,
      year9: veteranData['Year 9']?.rate || 0,
      year10: veteranData['Year 10']?.rate || 0
    };
    setOutputData(prevData => {
      const existingIndex = prevData.findIndex(row => row.filter === filterName);
      if (existingIndex >= 0) {
        const updatedData = [...prevData];
        updatedData[existingIndex] = newRow;
        return updatedData;
      } else {
        return [...prevData, newRow];
      }
    });
  }, []);

  const addSubstanceAbuseFilter = useCallback((substanceType, substanceData) => {
    const filterName = `Substance Abuse: ${substanceType}`;
    const newRow = {
      filter: filterName,
      year1: substanceData['Year 1']?.rate || 0,
      year2: substanceData['Year 2']?.rate || 0,
      year3: substanceData['Year 3']?.rate || 0,
      year4: substanceData['Year 4']?.rate || 0,
      year5: substanceData['Year 5']?.rate || 0,
      year6: substanceData['Year 6']?.rate || 0,
      year7: substanceData['Year 7']?.rate || 0,
      year8: substanceData['Year 8']?.rate || 0,
      year9: substanceData['Year 9']?.rate || 0,
      year10: substanceData['Year 10']?.rate || 0
    };
    setOutputData(prevData => {
      const existingIndex = prevData.findIndex(row => row.filter === filterName);
      if (existingIndex >= 0) {
        const updatedData = [...prevData];
        updatedData[existingIndex] = newRow;
        return updatedData;
      } else {
        return [...prevData, newRow];
      }
    });
  }, []);

  const addFeloniesFilter = useCallback((feloniesType, feloniesData) => {
    const filterName = `Felonies: ${feloniesType}`;
    const newRow = {
      filter: filterName,
      year1: feloniesData['Year 1']?.rate || 0,
      year2: feloniesData['Year 2']?.rate || 0,
      year3: feloniesData['Year 3']?.rate || 0,
      year4: feloniesData['Year 4']?.rate || 0,
      year5: feloniesData['Year 5']?.rate || 0,
      year6: feloniesData['Year 6']?.rate || 0,
      year7: feloniesData['Year 7']?.rate || 0,
      year8: feloniesData['Year 8']?.rate || 0,
      year9: feloniesData['Year 9']?.rate || 0,
      year10: feloniesData['Year 10']?.rate || 0
    };
    setOutputData(prevData => {
      const existingIndex = prevData.findIndex(row => row.filter === filterName);
      if (existingIndex >= 0) {
        const updatedData = [...prevData];
        updatedData[existingIndex] = newRow;
        return updatedData;
      } else {
        return [...prevData, newRow];
      }
    });
  }, []);

  const addDTFilter = useCallback((dtType, dtData) => {
    const filterName = `DT: ${dtType}`;
    const newRow = {
      filter: filterName,
      year1: dtData['Year 1']?.rate || 0,
      year2: dtData['Year 2']?.rate || 0,
      year3: dtData['Year 3']?.rate || 0,
      year4: dtData['Year 4']?.rate || 0,
      year5: dtData['Year 5']?.rate || 0,
      year6: dtData['Year 6']?.rate || 0,
      year7: dtData['Year 7']?.rate || 0,
      year8: dtData['Year 8']?.rate || 0,
      year9: dtData['Year 9']?.rate || 0,
      year10: dtData['Year 10']?.rate || 0
    };
    setOutputData(prevData => {
      const existingIndex = prevData.findIndex(row => row.filter === filterName);
      if (existingIndex >= 0) {
        const updatedData = [...prevData];
        updatedData[existingIndex] = newRow;
        return updatedData;
      } else {
        return [...prevData, newRow];
      }
    });
  }, []);
  const addFCFilter = useCallback((fcType, fcData) => {
    const filterName = `FC: ${fcType}`;
    const newRow = {
      filter: filterName,
      year1: fcData['Year 1']?.rate || 0,
      year2: fcData['Year 2']?.rate || 0,
      year3: fcData['Year 3']?.rate || 0,
      year4: fcData['Year 4']?.rate || 0,
      year5: fcData['Year 5']?.rate || 0,
      year6: fcData['Year 6']?.rate || 0,
      year7: fcData['Year 7']?.rate || 0,
      year8: fcData['Year 8']?.rate || 0,
      year9: fcData['Year 9']?.rate || 0,
      year10: fcData['Year 10']?.rate || 0
    };
    setOutputData(prevData => {
      const existingIndex = prevData.findIndex(row => row.filter === filterName);
      if (existingIndex >= 0) {
        const updatedData = [...prevData];
        updatedData[existingIndex] = newRow;
        return updatedData;
      } else {
        return [...prevData, newRow];
      }
    });
  }, []);
  const addVisualFilter = useCallback((type, data) => {
    const filterName = `Visual: ${type}`;
    const newRow = { filter: filterName, year1: data['Year 1']?.rate || 0, year2: data['Year 2']?.rate || 0, year3: data['Year 3']?.rate || 0, year4: data['Year 4']?.rate || 0, year5: data['Year 5']?.rate || 0, year6: data['Year 6']?.rate || 0, year7: data['Year 7']?.rate || 0, year8: data['Year 8']?.rate || 0, year9: data['Year 9']?.rate || 0, year10: data['Year 10']?.rate || 0 };
    setOutputData(prev => { const i = prev.findIndex(r => r.filter === filterName); if (i >= 0) { const u = [...prev]; u[i] = newRow; return u; } return [...prev, newRow]; });
  }, []);
  const addHearingFilter = useCallback((type, data) => {
    const filterName = `Hearing: ${type}`;
    const newRow = { filter: filterName, year1: data['Year 1']?.rate || 0, year2: data['Year 2']?.rate || 0, year3: data['Year 3']?.rate || 0, year4: data['Year 4']?.rate || 0, year5: data['Year 5']?.rate || 0, year6: data['Year 6']?.rate || 0, year7: data['Year 7']?.rate || 0, year8: data['Year 8']?.rate || 0, year9: data['Year 9']?.rate || 0, year10: data['Year 10']?.rate || 0 };
    setOutputData(prev => { const i = prev.findIndex(r => r.filter === filterName); if (i >= 0) { const u = [...prev]; u[i] = newRow; return u; } return [...prev, newRow]; });
  }, []);
  const addAlzheimerFilter = useCallback((type, data) => {
    const filterName = `Alzheimer's / Dementia: ${type}`;
    const newRow = { filter: filterName, year1: data['Year 1']?.rate || 0, year2: data['Year 2']?.rate || 0, year3: data['Year 3']?.rate || 0, year4: data['Year 4']?.rate || 0, year5: data['Year 5']?.rate || 0, year6: data['Year 6']?.rate || 0, year7: data['Year 7']?.rate || 0, year8: data['Year 8']?.rate || 0, year9: data['Year 9']?.rate || 0, year10: data['Year 10']?.rate || 0 };
    setOutputData(prev => { const i = prev.findIndex(r => r.filter === filterName); if (i >= 0) { const u = [...prev]; u[i] = newRow; return u; } return [...prev, newRow]; });
  }, []);
  const addHIVFilter = useCallback((type, data) => {
    const filterName = `HIV / AIDS: ${type}`;
    const newRow = { filter: filterName, year1: data['Year 1']?.rate || 0, year2: data['Year 2']?.rate || 0, year3: data['Year 3']?.rate || 0, year4: data['Year 4']?.rate || 0, year5: data['Year 5']?.rate || 0, year6: data['Year 6']?.rate || 0, year7: data['Year 7']?.rate || 0, year8: data['Year 8']?.rate || 0, year9: data['Year 9']?.rate || 0, year10: data['Year 10']?.rate || 0 };
    setOutputData(prev => { const i = prev.findIndex(r => r.filter === filterName); if (i >= 0) { const u = [...prev]; u[i] = newRow; return u; } return [...prev, newRow]; });
  }, []);
  const addPhysicalMedicalFilter = useCallback((type, data) => {
    const filterName = `Physical / Medical: ${type}`;
    const newRow = { filter: filterName, year1: data['Year 1']?.rate || 0, year2: data['Year 2']?.rate || 0, year3: data['Year 3']?.rate || 0, year4: data['Year 4']?.rate || 0, year5: data['Year 5']?.rate || 0, year6: data['Year 6']?.rate || 0, year7: data['Year 7']?.rate || 0, year8: data['Year 8']?.rate || 0, year9: data['Year 9']?.rate || 0, year10: data['Year 10']?.rate || 0 };
    setOutputData(prev => { const i = prev.findIndex(r => r.filter === filterName); if (i >= 0) { const u = [...prev]; u[i] = newRow; return u; } return [...prev, newRow]; });
  }, []);
  const addMentalHealthFilter = useCallback((type, data) => {
    const filterName = `Mental Health: ${type}`;
    const newRow = { filter: filterName, year1: data['Year 1']?.rate || 0, year2: data['Year 2']?.rate || 0, year3: data['Year 3']?.rate || 0, year4: data['Year 4']?.rate || 0, year5: data['Year 5']?.rate || 0, year6: data['Year 6']?.rate || 0, year7: data['Year 7']?.rate || 0, year8: data['Year 8']?.rate || 0, year9: data['Year 9']?.rate || 0, year10: data['Year 10']?.rate || 0 };
    setOutputData(prev => { const i = prev.findIndex(r => r.filter === filterName); if (i >= 0) { const u = [...prev]; u[i] = newRow; return u; } return [...prev, newRow]; });
  }, []);
  const addPhysicalMobilityFilter = useCallback((type, data) => {
    const filterName = `Physical / Mobility: ${type}`;
    const newRow = { filter: filterName, year1: data['Year 1']?.rate || 0, year2: data['Year 2']?.rate || 0, year3: data['Year 3']?.rate || 0, year4: data['Year 4']?.rate || 0, year5: data['Year 5']?.rate || 0, year6: data['Year 6']?.rate || 0, year7: data['Year 7']?.rate || 0, year8: data['Year 8']?.rate || 0, year9: data['Year 9']?.rate || 0, year10: data['Year 10']?.rate || 0 };
    setOutputData(prev => { const i = prev.findIndex(r => r.filter === filterName); if (i >= 0) { const u = [...prev]; u[i] = newRow; return u; } return [...prev, newRow]; });
  }, []);
  const addAlcoholAbuseFilter = useCallback((type, data) => {
    const filterName = `Alcohol Abuse: ${type}`;
    const newRow = {
      filter: filterName,
      year1: data['Year 1']?.rate || 0,
      year2: data['Year 2']?.rate || 0,
      year3: data['Year 3']?.rate || 0,
      year4: data['Year 4']?.rate || 0,
      year5: data['Year 5']?.rate || 0,
      year6: data['Year 6']?.rate || 0,
      year7: data['Year 7']?.rate || 0,
      year8: data['Year 8']?.rate || 0,
      year9: data['Year 9']?.rate || 0,
      year10: data['Year 10']?.rate || 0
    };
    setOutputData(prev => {
      const i = prev.findIndex(r => r.filter === filterName);
      if (i >= 0) {
        const u = [...prev];
        u[i] = newRow;
        return u;
      }
      return [...prev, newRow];
    });
  }, []);
  const addDisabilityCountFilter = useCallback((countType, countData) => {
    const filterName = `Disability Count: ${countType}`;
    const newRow = {
      filter: filterName,
      year1: countData['Year 1']?.rate || 0,
      year2: countData['Year 2']?.rate || 0,
      year3: countData['Year 3']?.rate || 0,
      year4: countData['Year 4']?.rate || 0,
      year5: countData['Year 5']?.rate || 0,
      year6: countData['Year 6']?.rate || 0,
      year7: countData['Year 7']?.rate || 0,
      year8: countData['Year 8']?.rate || 0,
      year9: countData['Year 9']?.rate || 0,
      year10: countData['Year 10']?.rate || 0
    };
    setOutputData(prev => {
      const i = prev.findIndex(r => r.filter === filterName);
      if (i >= 0) {
        const u = [...prev];
        u[i] = newRow;
        return u;
      }
      return [...prev, newRow];
    });
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
          Tenant Retention Analysis
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
