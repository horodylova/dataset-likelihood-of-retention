'use client';

import { useState, useEffect } from 'react';
import { useRetention } from '@/contexts/RetentionContext';
import { Button } from '@progress/kendo-react-buttons';
import RawDataTable from './RawDataTable';
import ResidentsRetentionTable from './ResidentsRetentionTable';
import GenderRetentionTable from './GenderRetentionTable';
import VeteranRetentionTable from './VeteranRetentionTable';
import VisualRetentionTable from './VisualRetentionTable';
import FCRetentionTable from './FCRetentionTable';
import HearingRetentionTable from './HearingRetentionTable';
import AlzheimerRetentionTable from './AlzheimerRetentionTable';
import CategoryList from './CategoryList';
import HIVRetentionTable from './HIVRetentionTable';
import PhysicalMedicalRetentionTable from './PhysicalMedicalRetentionTable';
import MentalHealthRetentionTable from './MentalHealthRetentionTable'
import PhysicalMobilityRetentionTable from './PhysicalMobilityRetentionTable';
import AlcoholAbuseRetentionTable from './AlcoholAbuseRetentionTable';
import SubstanceAbuseRetentionTable from './SubstanceAbuseRetentionTable';
import FeloniesRetentionTable from './FeloniesRetentionTable';
import DTRetentionTable from './DTRetentionTable';

export default function SheetViewer() {
  const [error, setError] = useState(null);
  const [showRawData, setShowRawData] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const { state, dispatch } = useRetention();
  const { loading, processedData, retentionData, chartData, dataLoaded, filters, rawData } = state;

  useEffect(() => {
    const loadData = async () => {
      if (dataLoaded) return;
      
      const spreadsheetId = '1k8Az5lkHrT54NZk_L6W4TLVp4GInU_Tmh-rZQhHe3JI';
      const range = 'EXPORT API';
      
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

    loadData();
  }, [dispatch, dataLoaded]);

  const updateFilters = (newFilters) => {
    dispatch({ type: 'APPLY_FILTERS', payload: { ...filters, ...newFilters } });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const renderSelectedTable = () => {
    if (!selectedCategory) return null;

    const commonProps = {
      processedData,
      filters
    };

    switch (selectedCategory) {
      case 'Residents':
        return <ResidentsRetentionTable {...commonProps} />;
      case 'Gender':
        return <GenderRetentionTable {...commonProps} />;
      case 'Veteran':
        return <VeteranRetentionTable {...commonProps} />;
      case 'Visual':
        return <VisualRetentionTable {...commonProps} />;
      case 'FC':
        return <FCRetentionTable {...commonProps} />;
      case 'Hearing':
        return <HearingRetentionTable {...commonProps} />;
      case "Alzheimer's / Dementia":
        return <AlzheimerRetentionTable {...commonProps} />;
      case 'HIV / AIDS':
        return <HIVRetentionTable {...commonProps} />;
      case 'Physical / Medical':
        return <PhysicalMedicalRetentionTable {...commonProps} />;
      case 'Mental Health':
        return <MentalHealthRetentionTable {...commonProps} />;
      case 'Physical / Mobility':
        return <PhysicalMobilityRetentionTable {...commonProps} />;
      case 'Alcohol Abuse':
        return <AlcoholAbuseRetentionTable {...commonProps} />;
      case 'Substance Abuse':
        return <SubstanceAbuseRetentionTable {...commonProps} />;
      case 'Felonies':
        return <FeloniesRetentionTable {...commonProps} />;
      case 'DT':
        return <DTRetentionTable {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      overflow: 'hidden',
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
            display: 'grid',
            gridTemplateColumns: 'auto 400px 1fr',
            gap: '30px',
            alignItems: 'flex-start',
            marginBottom: '30px',
            minHeight: '400px',
            marginTop: '20px'
          }}>
            <div style={{ 
              minWidth: '300px',
              overflow: 'auto'
            }}>
              <ResidentsRetentionTable 
                retentionData={retentionData || {}}
                filters={filters}
                updateFilters={updateFilters}
              />
            </div>

            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              minWidth: '400px'
            }}>
              <CategoryList 
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            </div>

            <div style={{ 
              minHeight: '300px',
              overflow: 'auto',
              width: '100%'
            }}>
              {selectedCategory && renderSelectedTable()}
            </div>
          </div>
          
          <div style={{ 
            paddingTop: '30px',
            borderTop: '1px solid #e0e0e0',
            marginTop: '20px'
          }}>
            <button
              onClick={() => setShowRawData(!showRawData)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(40, 167, 69, 0.2)',
                transition: 'all 0.2s ease'
              }}
            >
              {showRawData ? 'Hide Raw Data' : 'Show Raw Data'}
            </button>
          </div>
          
          {showRawData && (
            <div style={{ 
              marginTop: '30px',
              overflow: 'auto',
              width: '100%',
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
    </div>
  );
}