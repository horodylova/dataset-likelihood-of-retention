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
    console.log('addGenderFilter called:', genderType, genderData);
    
    const filterName = genderType === 'combined' ? 'Gender: Total' : 
                      genderType === 'Male' ? 'Gender: Male' : 'Gender: Female';
    
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

    console.log('New row:', newRow);

    setOutputData(prevData => {
      const existingIndex = prevData.findIndex(row => row.filter === filterName);
      if (existingIndex >= 0) {
        const updatedData = [...prevData];
        updatedData[existingIndex] = newRow;
        console.log('Updated existing row:', updatedData);
        return updatedData;
      } else {
        const newData = [...prevData, newRow];
        console.log('Added new row:', newData);
        return newData;
      }
    });
  }, []);

  const addVeteranFilter = useCallback((veteranType, veteranData) => {
    console.log('addVeteranFilter called:', veteranType, veteranData);
    
    const filterName = veteranType === 'combined' ? 'Veteran: Total' : 
                      veteranType === 'Yes' ? 'Veteran: Yes' : 'Veteran: No';
    
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

    console.log('New veteran row:', newRow);

    setOutputData(prevData => {
      const existingIndex = prevData.findIndex(row => row.filter === filterName);
      if (existingIndex >= 0) {
        const updatedData = [...prevData];
        updatedData[existingIndex] = newRow;
        console.log('Updated existing veteran row:', updatedData);
        return updatedData;
      } else {
        const newData = [...prevData, newRow];
        console.log('Added new veteran row:', newData);
        return newData;
      }
    });
  }, []);

  console.log('Current outputData:', outputData);

  return (
    <div style={{
      height: '100vh',
      padding: '20px',
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
        <h1 style={{ margin: 0 }}>
          Tenant Retention Analysis
        </h1>
        <Link 
          href="/analytics" 
          style={{
            padding: '10px 20px',
            backgroundColor: '#1e40af',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500'
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
                  />
                </PanelBarItem>
                <PanelBarItem title="Disabilities">
                  <DisabilitiesSection />
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
