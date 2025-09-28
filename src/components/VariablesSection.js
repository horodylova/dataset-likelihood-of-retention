'use client'

import { Checkbox } from '@progress/kendo-react-inputs';
import { useState, useEffect, useCallback } from 'react';
import { useRetention } from '@/contexts/RetentionContext';
import { calculateRetentionByGender, calculateRetentionByVeteran, calculateRetentionBySubstanceAbuse, calculateRetentionByFelonies, calculateRetentionByDT, calculateRetentionByFC } from '@/lib/filterUtils';
import FilterCard from './FilterCard';

export default function VariablesSection({ onGenderFilterChange, onVeteranFilterChange, onSubstanceAbuseFilterChange, onFeloniesFilterChange, onDTFilterChange, onFosterCareFilterChange }) {
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

  const [substanceFilters, setSubstanceFilters] = useState({
    substanceTotal: false,
    yes: false,
    no: false
  });

  const [feloniesFilters, setFeloniesFilters] = useState({
    feloniesTotal: false,
    yes: false,
    no: false
  });

  const [dtFilters, setDTFilters] = useState({
    dtTotal: false,
    yes: false,
    no: false
  });
  const [fcFilters, setFCFilters] = useState({
    yes: false,
    no: false
  });
  const [fcTotal, setFCTotal] = useState(false);
  
  const { state } = useRetention();
  const { processedData, rawData } = state;

  const handleGenderFilterChange = useCallback((filterType, checked) => {
    setGenderFilters(prev => ({
      ...prev,
      [filterType]: checked
    }));
  }, []);

  const handleVeteranFilterChange = useCallback((filterType, checked) => {
    setVeteranFilters(prev => ({
      ...prev,
      [filterType]: checked
    }));
  }, []);

  const handleSubstanceFilterChange = useCallback((filterType, checked) => {
    setSubstanceFilters(prev => ({
      ...prev,
      [filterType]: checked
    }));
  }, []);

  const handleFeloniesFilterChange = useCallback((filterType, checked) => {
    setFeloniesFilters(prev => ({
      ...prev,
      [filterType]: checked
    }));
  }, []);

  const handleDTFilterChange = useCallback((filterType, checked) => {
    setDTFilters(prev => ({
      ...prev,
      [filterType]: checked
    }));
  }, []);

  const handleFCFilterChange = useCallback((filterType, checked) => {
    setFCFilters(prev => ({
      ...prev,
      [filterType]: checked
    }));
  }, []);

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
  }, [genderFilters, processedData, rawData]);

  useEffect(() => {
    if (!processedData || !rawData || !onVeteranFilterChange) return;

    const veteranData = calculateRetentionByVeteran(processedData, rawData);
    
    if (veteranFilters.veteranTotal) {
      onVeteranFilterChange('combined', veteranData.combined);
    }
    if (veteranFilters.yes) {
      onVeteranFilterChange('Yes', veteranData.Yes);
    }
    if (veteranFilters.no) {
      onVeteranFilterChange('No', veteranData.No);
    }
  }, [veteranFilters, processedData, rawData]);

  useEffect(() => {
    if (!processedData || !rawData || !onSubstanceAbuseFilterChange) return;

    const substanceData = calculateRetentionBySubstanceAbuse(processedData, rawData);

    if (substanceFilters.substanceTotal) {
      onSubstanceAbuseFilterChange('combined', substanceData.combined);
    }
    if (substanceFilters.yes) {
      onSubstanceAbuseFilterChange('Yes', substanceData.Yes);
    }
    if (substanceFilters.no) {
      onSubstanceAbuseFilterChange('No', substanceData.No);
    }
  }, [substanceFilters, processedData, rawData]);

  useEffect(() => {
    if (!processedData || !rawData || !onFeloniesFilterChange) return;

    const feloniesData = calculateRetentionByFelonies(processedData, rawData);

    if (feloniesFilters.feloniesTotal) {
      onFeloniesFilterChange('combined', feloniesData.combined);
    }
    if (feloniesFilters.yes) {
      onFeloniesFilterChange('Yes', feloniesData.Yes);
    }
    if (feloniesFilters.no) {
      onFeloniesFilterChange('No', feloniesData.No);
    }
  }, [feloniesFilters, processedData, rawData]);

  useEffect(() => {
    if (!processedData || !rawData || !onDTFilterChange) return;

    const dtData = calculateRetentionByDT(processedData, rawData);

    if (dtFilters.dtTotal) {
      onDTFilterChange('combined', dtData.combined);
    }
    if (dtFilters.yes) {
      onDTFilterChange('Yes', dtData.Yes);
    }
    if (dtFilters.no) {
      onDTFilterChange('No', dtData.No);
    }
  }, [dtFilters, processedData, rawData]);

  useEffect(() => {
    if (!processedData || !rawData || !onFosterCareFilterChange) return;

    const fcData = calculateRetentionByFC(processedData, rawData);

    if (fcTotal) {
      onFosterCareFilterChange('combined', fcData.combined);
    }
    if (fcFilters.yes) {
      onFosterCareFilterChange('Yes', fcData.Yes);
    }
    if (fcFilters.no) {
      onFosterCareFilterChange('No', fcData.No);
    }
  }, [fcTotal, fcFilters, processedData, rawData]);

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
            label="Yes" 
            checked={veteranFilters.yes}
            onChange={(e) => handleVeteranFilterChange('yes', e.value)}
          />
          <Checkbox 
            label="No" 
            checked={veteranFilters.no}
            onChange={(e) => handleVeteranFilterChange('no', e.value)}
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
            checked={substanceFilters.substanceTotal}
            onChange={(e) => handleSubstanceFilterChange('substanceTotal', e.value)}
          />
          <label style={{ 
            fontWeight: 'bold', 
            color: '#384C9E', 
            fontSize: '14px', 
            marginLeft: '8px'
          }}>
            Substance Abuse
          </label>
        </div>
        <div style={{ display: 'flex', gap: '15px', marginLeft: '20px' }}>
          <Checkbox 
            label="Yes" 
            checked={substanceFilters.yes}
            onChange={(e) => handleSubstanceFilterChange('yes', e.value)}
          />
          <Checkbox 
            label="No" 
            checked={substanceFilters.no}
            onChange={(e) => handleSubstanceFilterChange('no', e.value)}
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
            checked={feloniesFilters.feloniesTotal}
            onChange={(e) => handleFeloniesFilterChange('feloniesTotal', e.value)}
          />
          <label style={{ 
            fontWeight: 'bold', 
            color: '#384C9E', 
            fontSize: '14px', 
            marginLeft: '8px'
          }}>
            Felonies
          </label>
        </div>
        <div style={{ display: 'flex', gap: '15px', marginLeft: '20px' }}>
          <Checkbox 
            label="Yes" 
            checked={feloniesFilters.yes}
            onChange={(e) => handleFeloniesFilterChange('yes', e.value)}
          />
          <Checkbox 
            label="No" 
            checked={feloniesFilters.no}
            onChange={(e) => handleFeloniesFilterChange('no', e.value)}
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
            checked={dtFilters.dtTotal}
            onChange={(e) => handleDTFilterChange('dtTotal', e.value)}
          />
          <label style={{ 
            fontWeight: 'bold', 
            color: '#384C9E', 
            fontSize: '14px', 
            marginLeft: '8px'
          }}>
            DT
          </label>
        </div>
        <div style={{ display: 'flex', gap: '15px', marginLeft: '20px' }}>
          <Checkbox 
            label="Yes" 
            checked={dtFilters.yes}
            onChange={(e) => handleDTFilterChange('yes', e.value)}
          />
          <Checkbox 
            label="No" 
            checked={dtFilters.no}
            onChange={(e) => handleDTFilterChange('no', e.value)}
          />
        </div>
      </div>
      
      <FilterCard title="Foster Care" headerChecked={fcTotal} headerOnChange={(e) => setFCTotal(e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={fcFilters.yes} onChange={(e) => handleFCFilterChange('yes', e.value)} />
          <Checkbox label="No" checked={fcFilters.no} onChange={(e) => handleFCFilterChange('no', e.value)} />
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