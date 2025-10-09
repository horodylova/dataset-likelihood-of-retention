'use client';

import { Checkbox } from '@progress/kendo-react-inputs';
import { useState, useEffect, useCallback } from 'react';
import FilterCard from './FilterCard';

export default function DemographicsSection({ onMultiSelectionChange, resetSignal }) {
  const [deceasedFilters, setDeceasedFilters] = useState({ yes: false, no: false });
  const [deceasedTotal, setDeceasedTotal] = useState(false);

  const [genderFilters, setGenderFilters] = useState({
    genderTotal: false,
    male: false,
    female: false
  });

  const [raceFilters, setRaceFilters] = useState({
    black: false,
    hispanic: false,
    asian: false,
    native: false
  });
  const [raceTotal, setRaceTotal] = useState(false);

  const [ageFilters, setAgeFilters] = useState({
    ageTotal: false,
    youngAdult: false,
    youth: false,
    midAge: false,
    midAgePlus: false,
    mature: false,
    seniors: false
  });

  const [veteranFilters, setVeteranFilters] = useState({
    veteranTotal: false,
    yes: false,
    no: false
  });

  const handleGenderFilterChange = useCallback((type, checked) => {
    setGenderFilters(prev => ({ ...prev, [type]: checked }));
  }, []);
  const handleRaceFilterChange = useCallback((type, checked) => {
    setRaceFilters(prev => ({ ...prev, [type]: checked }));
  }, []);
  const handleAgeFilterChange = useCallback((type, checked) => {
    setAgeFilters(prev => ({ ...prev, [type]: checked }));
  }, []);
  const handleVeteranFilterChange = useCallback((type, checked) => {
    setVeteranFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

  useEffect(() => {
    const values = [];
    if (deceasedFilters.yes) values.push('Yes');
    if (deceasedFilters.no) values.push('No');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Deceased', { combined: !!deceasedTotal, values });
    }
  }, [deceasedFilters, deceasedTotal, onMultiSelectionChange]);

  useEffect(() => {
    const values = [];
    if (genderFilters.male) values.push('Male');
    if (genderFilters.female) values.push('Female');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Gender', { combined: !!genderFilters.genderTotal, values });
    }
  }, [genderFilters, onMultiSelectionChange]);

  useEffect(() => {
    const values = [];
    if (raceFilters.black) values.push('Black or African American');
    if (raceFilters.hispanic) values.push('Hispanic or Latino');
    if (raceFilters.asian) values.push('Asian');
    if (raceFilters.native) values.push('American Indian or Alaska Native');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Race', { combined: !!raceTotal, values });
    }
  }, [raceFilters, raceTotal, onMultiSelectionChange]);

  useEffect(() => {
    const values = [];
    if (ageFilters.youngAdult) values.push('Young Adult');
    if (ageFilters.youth) values.push('Youth');
    if (ageFilters.midAge) values.push('Mid-Age');
    if (ageFilters.midAgePlus) values.push('Mid-Age +');
    if (ageFilters.mature) values.push('Mature');
    if (ageFilters.seniors) values.push('Seniors');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Age', { combined: !!ageFilters.ageTotal, values });
    }
  }, [ageFilters, onMultiSelectionChange]);

  useEffect(() => {
    const values = [];
    if (veteranFilters.yes) values.push('Yes');
    if (veteranFilters.no) values.push('No');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Veteran', { combined: !!veteranFilters.veteranTotal, values });
    }
  }, [veteranFilters, onMultiSelectionChange]);

  useEffect(() => {
    if (resetSignal == null) return;
    setDeceasedFilters({ yes: false, no: false });
    setDeceasedTotal(false);
    setGenderFilters({ genderTotal: false, male: false, female: false });
    setRaceFilters({ black: false, hispanic: false, asian: false, native: false });
    setRaceTotal(false);
    setAgeFilters({ ageTotal: false, youngAdult: false, youth: false, midAge: false, midAgePlus: false, mature: false, seniors: false });
    setVeteranFilters({ veteranTotal: false, yes: false, no: false });
  }, [resetSignal]);

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      maxHeight: '400px',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#FF5E00 #f1f1f1'
    }}>
      {/* Deceased и Gender без смещения — оставляем */}
      <FilterCard title="Deceased" headerChecked={deceasedTotal} headerOnChange={(e) => setDeceasedTotal(e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={deceasedFilters.yes} onChange={(e) => setDeceasedFilters(prev => ({ ...prev, yes: e.value }))} />
          <Checkbox label="No" checked={deceasedFilters.no} onChange={(e) => setDeceasedFilters(prev => ({ ...prev, no: e.value }))} />
        </div>
      </FilterCard>

      <FilterCard title="Gender" headerChecked={genderFilters.genderTotal} headerOnChange={(e) => handleGenderFilterChange('genderTotal', e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Male" checked={genderFilters.male} onChange={(e) => handleGenderFilterChange('male', e.value)} />
          <Checkbox label="Female" checked={genderFilters.female} onChange={(e) => handleGenderFilterChange('female', e.value)} />
        </div>
      </FilterCard>

      <FilterCard title="Race" headerChecked={raceTotal} headerOnChange={(e) => setRaceTotal(e.value)}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '10px',
          alignItems: 'center'
        }}>
          <Checkbox className="agency-checkbox agency-checkbox--wrap" label="Black or African American" checked={raceFilters.black} onChange={(e) => handleRaceFilterChange('black', e.value)} />
          <Checkbox className="agency-checkbox agency-checkbox--wrap" label="Hispanic or Latino" checked={raceFilters.hispanic} onChange={(e) => handleRaceFilterChange('hispanic', e.value)} />
          <Checkbox className="agency-checkbox agency-checkbox--wrap" label="Asian" checked={raceFilters.asian} onChange={(e) => handleRaceFilterChange('asian', e.value)} />
          <Checkbox className="agency-checkbox agency-checkbox--wrap" label="American Indian or Alaska Native" checked={raceFilters.native} onChange={(e) => handleRaceFilterChange('native', e.value)} />
        </div>
      </FilterCard>

      <FilterCard title="Age" headerChecked={ageFilters.ageTotal} headerOnChange={(e) => handleAgeFilterChange('ageTotal', e.value)}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '10px',
          alignItems: 'center'
        }}>
          <Checkbox label="Young Adult" checked={ageFilters.youngAdult} onChange={(e) => handleAgeFilterChange('youngAdult', e.value)} />
          <Checkbox label="Youth" checked={ageFilters.youth} onChange={(e) => handleAgeFilterChange('youth', e.value)} />
          <Checkbox label="Mid-Age" checked={ageFilters.midAge} onChange={(e) => handleAgeFilterChange('midAge', e.value)} />
          <Checkbox label="Mid-Age +" checked={ageFilters.midAgePlus} onChange={(e) => handleAgeFilterChange('midAgePlus', e.value)} />
          <Checkbox label="Mature" checked={ageFilters.mature} onChange={(e) => handleAgeFilterChange('mature', e.value)} />
          <Checkbox label="Seniors" checked={ageFilters.seniors} onChange={(e) => handleAgeFilterChange('seniors', e.value)} />
        </div>
      </FilterCard>

      <FilterCard title="Veteran" headerChecked={veteranFilters.veteranTotal} headerOnChange={(e) => handleVeteranFilterChange('veteranTotal', e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={veteranFilters.yes} onChange={(e) => handleVeteranFilterChange('yes', e.value)} />
          <Checkbox label="No" checked={veteranFilters.no} onChange={(e) => handleVeteranFilterChange('no', e.value)} />
        </div>
      </FilterCard>
    </div>
  );
}