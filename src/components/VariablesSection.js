'use client'

import { Checkbox } from '@progress/kendo-react-inputs';
import { useState, useEffect, useCallback } from 'react';
import { useRetention } from '@/contexts/RetentionContext';
import { calculateRetentionByGender, calculateRetentionByVeteran } from '@/lib/filterUtils';
import FilterCard from './FilterCard';

export default function VariablesSection({ onGenderFilterChange, onVeteranFilterChange }) {
  const [genderFilters, setGenderFilters] = useState({
    genderTotal: false,
    male: false,
    female: false
  });

  const [veteranFilters, setVeteranFilters] = useState({
    veteranTotal: false,
    yes: false,
    no: false
  });
  
  const { state } = useRetention();
  const { processedData, rawData } = state;

  const handleGenderFilterChange = useCallback((filterType, checked) => {
    console.log('handleGenderFilterChange:', filterType, checked);
    setGenderFilters(prev => ({
      ...prev,
      [filterType]: checked
    }));
  }, []);

  const handleVeteranFilterChange = useCallback((filterType, checked) => {
    console.log('handleVeteranFilterChange:', filterType, checked);
    setVeteranFilters(prev => ({
      ...prev,
      [filterType]: checked
    }));
  }, []);

  useEffect(() => {
    console.log('useEffect triggered for gender:', { processedData: !!processedData, rawData: !!rawData, genderFilters });
    
    if (!processedData || !rawData || !onGenderFilterChange) return;

    const genderData = calculateRetentionByGender(processedData, rawData);
    console.log('Gender data calculated:', genderData);
    
    if (genderFilters.genderTotal) {
      console.log('Calling onGenderFilterChange for combined');
      onGenderFilterChange('combined', genderData.combined);
    }
    if (genderFilters.male) {
      console.log('Calling onGenderFilterChange for Male');
      onGenderFilterChange('Male', genderData.Male);
    }
    if (genderFilters.female) {
      console.log('Calling onGenderFilterChange for Female');
      onGenderFilterChange('Female', genderData.Female);
    }
  }, [genderFilters, processedData, rawData]);

  useEffect(() => {
    console.log('useEffect triggered for veteran:', { processedData: !!processedData, rawData: !!rawData, veteranFilters });
    
    if (!processedData || !rawData || !onVeteranFilterChange) return;

    const veteranData = calculateRetentionByVeteran(processedData, rawData);
    console.log('Veteran data calculated:', veteranData);
    
    if (veteranFilters.veteranTotal) {
      console.log('Calling onVeteranFilterChange for combined');
      onVeteranFilterChange('combined', veteranData.combined);
    }
    if (veteranFilters.yes) {
      console.log('Calling onVeteranFilterChange for Yes');
      onVeteranFilterChange('Yes', veteranData.Yes);
    }
    if (veteranFilters.no) {
      console.log('Calling onVeteranFilterChange for No');
      onVeteranFilterChange('No', veteranData.No);
    }
  }, [veteranFilters, processedData, rawData]);

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
        transition: 'transform 0.2s ease-in-out'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '8px' 
        }}>
          <Checkbox 
            checked={genderFilters.genderTotal}
            onChange={(e) => handleGenderFilterChange('genderTotal', e.value)}
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
            onChange={(e) => handleGenderFilterChange('female', e.value)}
          />
          <Checkbox 
            label="Male" 
            checked={genderFilters.male}
            onChange={(e) => handleGenderFilterChange('male', e.value)}
          />
        </div>
      </div>
      
      <div style={{
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease-in-out'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '8px' 
        }}>
          <Checkbox 
            checked={veteranFilters.veteranTotal}
            onChange={(e) => handleVeteranFilterChange('veteranTotal', e.value)}
          />
          <label style={{ 
            fontWeight: 'bold', 
            color: '#384C9E', 
            fontSize: '14px', 
            marginLeft: '8px'
          }}>
            Veteran
          </label>
        </div>
        <div style={{ display: 'flex', gap: '15px', marginLeft: '20px' }}>
          <Checkbox 
            label="Да" 
            checked={veteranFilters.yes}
            onChange={(e) => handleVeteranFilterChange('yes', e.value)}
          />
          <Checkbox 
            label="Нет" 
            checked={veteranFilters.no}
            onChange={(e) => handleVeteranFilterChange('no', e.value)}
          />
        </div>
      </div>
      
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