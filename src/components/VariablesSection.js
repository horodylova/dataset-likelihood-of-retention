'use client'

import { Checkbox } from '@progress/kendo-react-inputs';
import { useState, useEffect } from 'react';
import { useRetention } from '@/contexts/RetentionContext';
import { calculateRetentionByGender } from '@/lib/filterUtils';
import FilterCard from './FilterCard';

export default function VariablesSection({ onGenderFilterChange }) {
  const [genderFilters, setGenderFilters] = useState({
    genderTotal: false,
    male: false,
    female: false
  });
  
  const { state } = useRetention();
  const { processedData, rawData } = state;

 
  useEffect(() => {
     
    if (!processedData || !rawData || !onGenderFilterChange) return;

    const genderData = calculateRetentionByGender(processedData, rawData);
     
    if (genderFilters.genderTotal) {
       onGenderFilterChange('combined', genderData.combined);
    }
    if (genderFilters.male) {
       onGenderFilterChange('Male', genderData.Male);
    }
    if (genderFilters.female) {
     
      onGenderFilterChange('Female', genderData.Female);
    }
  }, [genderFilters, processedData, rawData, onGenderFilterChange]);

  const handleGenderFilterChange = (filterType, checked) => {
     setGenderFilters(prev => ({
      ...prev,
      [filterType]: checked
    }));
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      maxHeight: '400px',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#FF5E00 #f1f1f1'
    }}>
      <FilterCard title="Income Source">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '10px',
          alignItems: 'center'
        }}>
          <Checkbox label="SSI" />
          <Checkbox label="SSDI" />
          <Checkbox label="Multiple" />
          <Checkbox label="Other" />
          <Checkbox label="None" />
          <Checkbox label="Unknown" />
        </div>
      </FilterCard>
      
      <div style={{
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease-in-out',
        cursor: 'pointer'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '8px' 
        }}>
          <Checkbox 
            checked={genderFilters.genderTotal}
            onChange={(e) => handleGenderFilterChange('genderTotal', e.target.checked)}
          />
          <label style={{ 
            fontWeight: 'bold', 
            color: '#384C9E', 
            fontSize: '14px', 
            marginLeft: '8px'
          }}>
            Gender
          </label>
        </div>
        <div style={{ display: 'flex', gap: '15px', marginLeft: '20px' }}>
          <Checkbox 
            label="Female" 
            checked={genderFilters.female}
            onChange={(e) => handleGenderFilterChange('female', e.target.checked)}
          />
          <Checkbox 
            label="Male" 
            checked={genderFilters.male}
            onChange={(e) => handleGenderFilterChange('male', e.target.checked)}
          />
        </div>
      </div>
      
      <FilterCard title="Veteran">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" />
          <Checkbox label="No" />
        </div>
      </FilterCard>
      
      <FilterCard title="Foster Care">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" />
          <Checkbox label="No" />
        </div>
      </FilterCard>
      
      <FilterCard title="Disability Count">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minWidth(100px, 1fr))',
          gap: '10px',
          alignItems: 'center'
        }}>
          <Checkbox label="Zero" />
          <Checkbox label="One" />
          <Checkbox label="Two" />
          <Checkbox label="Three" />
          <Checkbox label="Four +" />
        </div>
      </FilterCard>
    </div>
  );
}