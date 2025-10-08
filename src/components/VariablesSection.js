'use client'

import { Checkbox } from '@progress/kendo-react-inputs';
import { useState, useEffect, useCallback } from 'react';
import FilterCard from './FilterCard';

export default function VariablesSection({
  onMultiSelectionChange,
  resetSignal
}) {
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






  const [raceFilters, setRaceFilters] = useState({
    white: false,
    black: false,
    hispanic: false,
    asian: false,
    native: false
  });
  const [raceTotal, setRaceTotal] = useState(false);

  // Deceased: один чекбокс Yes → маппится на Move-Out Reason
  const [deceasedYes, setDeceasedYes] = useState(false);

  useEffect(() => {
    const values = [];
    if (deceasedYes) values.push('Yes');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Deceased', { combined: false, values });
    }
  }, [deceasedYes, onMultiSelectionChange]);

  useEffect(() => {
    const values = [];
    if (raceFilters.white) values.push('White');
    if (raceFilters.black) values.push('Black or African American');
    if (raceFilters.hispanic) values.push('Hispanic or Latino');
    if (raceFilters.asian) values.push('Asian');
    if (raceFilters.native) values.push('American Indian or Alaska Native');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Race', { combined: !!raceTotal, values });
    }
  }, [raceFilters, raceTotal, onMultiSelectionChange]);

  const [ageFilters, setAgeFilters] = useState({
    ageTotal: false,
    youngAdult: false,
    youth: false,
    midAge: false,
    midAgePlus: false,
    mature: false,
    seniors: false
  });

  const [abScoreFilters, setAbScoreFilters] = useState({
    abScoreTotal: false,
    none: false,
    oneSix: false,
    sevenNine: false,
    tenTwelve: false,
    thirteenPlus: false
  });

  const [ychFilters, setYchFilters] = useState({
    ychTotal: false,
    oneTwo: false,
    threeFour: false,
    fiveSeven: false,
    eightFourteen: false,
    fifteenPlus: false
  });

  const handleGenderFilterChange = useCallback((type, checked) => {
    setGenderFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

  const handleVeteranFilterChange = useCallback((type, checked) => {
    setVeteranFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

  const handleFeloniesFilterChange = useCallback((type, checked) => {
    setFeloniesFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

  const handleDTFilterChange = useCallback((type, checked) => {
    setDTFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

  const handleFCFilterChange = useCallback((type, checked) => {
    setFCFilters(prev => ({ ...prev, [type]: checked }));
  }, []);






  const handleRaceFilterChange = useCallback((type, checked) => {
    setRaceFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

  const handleAgeFilterChange = useCallback((type, checked) => {
    setAgeFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

  const handleABScoreFilterChange = useCallback((type, checked) => {
    setAbScoreFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

  const handleYCHFilterChange = useCallback((type, checked) => {
    setYchFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

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
    if (veteranFilters.yes) values.push('Yes');
    if (veteranFilters.no) values.push('No');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Veteran', { combined: !!veteranFilters.veteranTotal, values });
    }
  }, [veteranFilters, onMultiSelectionChange]);

  useEffect(() => {
    const values = [];
    if (feloniesFilters.yes) values.push('Yes');
    if (feloniesFilters.no) values.push('No');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Felonies', { combined: !!feloniesFilters.feloniesTotal, values });
    }
  }, [feloniesFilters, onMultiSelectionChange]);

  useEffect(() => {
    const values = [];
    if (dtFilters.yes) values.push('Yes');
    if (dtFilters.no) values.push('No');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('DT', { combined: !!dtFilters.dtTotal, values });
    }
  }, [dtFilters, onMultiSelectionChange]);

  useEffect(() => {
    const values = [];
    if (fcFilters.yes) values.push('Yes');
    if (fcFilters.no) values.push('No');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('FC', { combined: !!fcTotal, values });
    }
  }, [fcFilters, fcTotal, onMultiSelectionChange]);






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
    if (abScoreFilters.none) values.push('None');
    if (abScoreFilters.oneSix) values.push('1-6');
    if (abScoreFilters.sevenNine) values.push('7-9');
    if (abScoreFilters.tenTwelve) values.push('10-12');
    if (abScoreFilters.thirteenPlus) values.push('13+');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('AB Score', { combined: !!abScoreFilters.abScoreTotal, values });
    }
  }, [abScoreFilters, onMultiSelectionChange]);

  useEffect(() => {
    const values = [];
    if (ychFilters.oneTwo) values.push('1-2');
    if (ychFilters.threeFour) values.push('3-4');
    if (ychFilters.fiveSeven) values.push('5-7');
    if (ychFilters.eightFourteen) values.push('8-14');
    if (ychFilters.fifteenPlus) values.push('15+');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('YCH', { combined: !!ychFilters.ychTotal, values });
    }
  }, [ychFilters, onMultiSelectionChange]);

  useEffect(() => {
    if (resetSignal == null) return;
    setGenderFilters({ genderTotal: false, male: false, female: false });
    setVeteranFilters({ veteranTotal: false, yes: false, no: false });
    setFeloniesFilters({ feloniesTotal: false, yes: false, no: false });
    setDTFilters({ dtTotal: false, yes: false, no: false });
    setFCFilters({ yes: false, no: false });
    setFCTotal(false);
    setRaceFilters({ white: false, black: false, hispanic: false, asian: false, native: false });
    setRaceTotal(false);
    setDeceasedYes(false);
    setAgeFilters({ ageTotal: false, youngAdult: false, youth: false, midAge: false, midAgePlus: false, mature: false, seniors: false });
    setAbScoreFilters({ abScoreTotal: false, none: false, oneSix: false, sevenNine: false, tenTwelve: false, thirteenPlus: false });
    setYchFilters({ ychTotal: false, oneTwo: false, threeFour: false, fiveSeven: false, eightFourteen: false, fifteenPlus: false });
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
      <FilterCard title="Deceased">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox
            label="Yes"
            checked={deceasedYes}
            onChange={(e) => setDeceasedYes(e.value)}
          />
        </div>
      </FilterCard>
   
      <FilterCard title="Gender" headerChecked={genderFilters.genderTotal} headerOnChange={(e) => handleGenderFilterChange('genderTotal', e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
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
      </FilterCard>

 


      {/* Veteran */}
      <FilterCard title="Veteran" headerChecked={veteranFilters.veteranTotal} headerOnChange={(e) => handleVeteranFilterChange('veteranTotal', e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
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
      </FilterCard>

      {/* Felonies */}
      <FilterCard title="Felonies" headerChecked={feloniesFilters.feloniesTotal} headerOnChange={(e) => handleFeloniesFilterChange('feloniesTotal', e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
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
      </FilterCard>

      {/* DT */}
      <FilterCard title="DT" headerChecked={dtFilters.dtTotal} headerOnChange={(e) => handleDTFilterChange('dtTotal', e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
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
      </FilterCard>

      {/* Foster Care */}
      {/* Race */}
      <FilterCard title="Race" headerChecked={raceTotal} headerOnChange={(e) => setRaceTotal(e.value)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Checkbox label="White" checked={raceFilters.white} onChange={(e) => handleRaceFilterChange('white', e.value)} />
          <Checkbox label="Black or African American" checked={raceFilters.black} onChange={(e) => handleRaceFilterChange('black', e.value)} />
          <Checkbox label="Hispanic or Latino" checked={raceFilters.hispanic} onChange={(e) => handleRaceFilterChange('hispanic', e.value)} />
          <Checkbox label="Asian" checked={raceFilters.asian} onChange={(e) => handleRaceFilterChange('asian', e.value)} />
          <Checkbox label="American Indian or Alaska Native" checked={raceFilters.native} onChange={(e) => handleRaceFilterChange('native', e.value)} />
        </div>
      </FilterCard>

      <FilterCard title="Foster Care" headerChecked={fcTotal} headerOnChange={(e) => setFCTotal(e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={fcFilters.yes} onChange={(e) => handleFCFilterChange('yes', e.value)} />
          <Checkbox label="No" checked={fcFilters.no} onChange={(e) => handleFCFilterChange('no', e.value)} />
        </div>
      </FilterCard>



      {/* Age */}
      <FilterCard title="Age" headerChecked={ageFilters.ageTotal} headerOnChange={(e) => handleAgeFilterChange('ageTotal', e.value)}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px',
          alignItems: 'center',
          marginLeft: '20px'
        }}>
          <Checkbox label="18-24: Young Adult" checked={ageFilters.youngAdult} onChange={(e) => handleAgeFilterChange('youngAdult', e.value)} />
          <Checkbox label="25-34: Youth" checked={ageFilters.youth} onChange={(e) => handleAgeFilterChange('youth', e.value)} />
          <Checkbox label="35-44: Mid-Age" checked={ageFilters.midAge} onChange={(e) => handleAgeFilterChange('midAge', e.value)} />
          <Checkbox label="45-54: Mid-Age +" checked={ageFilters.midAgePlus} onChange={(e) => handleAgeFilterChange('midAgePlus', e.value)} />
          <Checkbox label="55-64: Mature" checked={ageFilters.mature} onChange={(e) => handleAgeFilterChange('mature', e.value)} />
          <Checkbox label="65+: Seniors" checked={ageFilters.seniors} onChange={(e) => handleAgeFilterChange('seniors', e.value)} />
        </div>
      </FilterCard>

      {/* AB Score */}
      <FilterCard title="AB Score" headerChecked={abScoreFilters.abScoreTotal} headerOnChange={(e) => handleABScoreFilterChange('abScoreTotal', e.value)}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '10px',
          alignItems: 'center',
          marginLeft: '20px'
        }}>
          <Checkbox label="None" checked={abScoreFilters.none} onChange={(e) => handleABScoreFilterChange('none', e.value)} />
          <Checkbox label="1-6" checked={abScoreFilters.oneSix} onChange={(e) => handleABScoreFilterChange('oneSix', e.value)} />
          <Checkbox label="7-9" checked={abScoreFilters.sevenNine} onChange={(e) => handleABScoreFilterChange('sevenNine', e.value)} />
          <Checkbox label="10-12" checked={abScoreFilters.tenTwelve} onChange={(e) => handleABScoreFilterChange('tenTwelve', e.value)} />
          <Checkbox label="13+" checked={abScoreFilters.thirteenPlus} onChange={(e) => handleABScoreFilterChange('thirteenPlus', e.value)} />
        </div>
      </FilterCard>

      {/* YCH */}
      <FilterCard title="YCH" headerChecked={ychFilters.ychTotal} headerOnChange={(e) => handleYCHFilterChange('ychTotal', e.value)}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '10px',
          alignItems: 'center',
          marginLeft: '20px'
        }}>
          <Checkbox label="1-2" checked={ychFilters.oneTwo} onChange={(e) => handleYCHFilterChange('oneTwo', e.value)} />
          <Checkbox label="3-4" checked={ychFilters.threeFour} onChange={(e) => handleYCHFilterChange('threeFour', e.value)} />
          <Checkbox label="5-7" checked={ychFilters.fiveSeven} onChange={(e) => handleYCHFilterChange('fiveSeven', e.value)} />
          <Checkbox label="8-14" checked={ychFilters.eightFourteen} onChange={(e) => handleYCHFilterChange('eightFourteen', e.value)} />
          <Checkbox label="15+" checked={ychFilters.fifteenPlus} onChange={(e) => handleYCHFilterChange('fifteenPlus', e.value)} />
        </div>
      </FilterCard>


    </div>
  );
}