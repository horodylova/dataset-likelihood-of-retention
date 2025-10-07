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

  const [disabilityCountFilters, setDisabilityCountFilters] = useState({
    zero: false,
    one: false,
    two: false,
    three: false,
    fourPlus: false
  });
  const [disabilityCountTotal, setDisabilityCountTotal] = useState(false);

  const [incomeSourceFilters, setIncomeSourceFilters] = useState({
    ssi: false,
    ssdi: false,
    multiple: false,
    other: false,
    none: false
  });
  const [incomeSourceTotal, setIncomeSourceTotal] = useState(false);

  const [statusFilters, setStatusFilters] = useState({
    statusTotal: false,
    current: false,
    former: false
  });

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

  const handleDisabilityCountChange = useCallback((type, checked) => {
    setDisabilityCountFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

  const handleIncomeSourceFilterChange = useCallback((type, checked) => {
    setIncomeSourceFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

  const handleStatusFilterChange = useCallback((type, checked) => {
    setStatusFilters(prev => ({ ...prev, [type]: checked }));
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
    if (disabilityCountFilters.zero) values.push('0');
    if (disabilityCountFilters.one) values.push('1');
    if (disabilityCountFilters.two) values.push('2');
    if (disabilityCountFilters.three) values.push('3');
    if (disabilityCountFilters.fourPlus) values.push('4+');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Disability Count', { combined: !!disabilityCountTotal, values });
    }
  }, [disabilityCountFilters, disabilityCountTotal, onMultiSelectionChange]);

  useEffect(() => {
    const values = [];
    if (incomeSourceFilters.ssi) values.push('SSI');
    if (incomeSourceFilters.ssdi) values.push('SSDI');
    if (incomeSourceFilters.multiple) values.push('Multiple');
    if (incomeSourceFilters.other) values.push('Other');
    if (incomeSourceFilters.none) values.push('None');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Income', { combined: !!incomeSourceTotal, values });
    }
  }, [incomeSourceFilters, incomeSourceTotal, onMultiSelectionChange]);

  useEffect(() => {
    const values = [];
    if (statusFilters.current) values.push('Current Residents');
    if (statusFilters.former) values.push('Former Residents');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Status', { combined: !!statusFilters.statusTotal, values });
    }
  }, [statusFilters, onMultiSelectionChange]);

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
    setDisabilityCountFilters({ zero: false, one: false, two: false, three: false, fourPlus: false });
    setDisabilityCountTotal(false);
    setIncomeSourceFilters({ ssi: false, ssdi: false, multiple: false, other: false, none: false });
    setIncomeSourceTotal(false);
    setStatusFilters({ statusTotal: false, current: false, former: false });

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
   
      <div style={{
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease-in-out'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Checkbox
            checked={genderFilters.genderTotal}
            onChange={(e) => handleGenderFilterChange('genderTotal', e.value)}
          />
          <label style={{ fontWeight: 'bold', color: '#384C9E', fontSize: '14px', marginLeft: '8px' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', direction: 'column', marginBottom: '8px' }}>
          <Checkbox
            checked={statusFilters.statusTotal}
            onChange={(e) => handleStatusFilterChange('statusTotal', e.value)}
          />
          <label style={{ fontWeight: 'bold', color: '#384C9E', fontSize: '14px', marginLeft: '8px' }}>
            Status
          </label>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginLeft: '20px'
        }}>
          <Checkbox
            label="Current Residents"
            checked={statusFilters.current}
            onChange={(e) => handleStatusFilterChange('current', e.value)}
          />
          <Checkbox
            label="Former Residents"
            checked={statusFilters.former}
            onChange={(e) => handleStatusFilterChange('former', e.value)}
          />
        </div>
      </div>

      {/* Veteran */}
      <div style={{
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease-in-out'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Checkbox
            checked={veteranFilters.veteranTotal}
            onChange={(e) => handleVeteranFilterChange('veteranTotal', e.value)}
          />
          <label style={{ fontWeight: 'bold', color: '#384C9E', fontSize: '14px', marginLeft: '8px' }}>
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

      {/* Felonies */}
      <div style={{
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease-in-out'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Checkbox
            checked={feloniesFilters.feloniesTotal}
            onChange={(e) => handleFeloniesFilterChange('feloniesTotal', e.value)}
          />
          <label style={{ fontWeight: 'bold', color: '#384C9E', fontSize: '14px', marginLeft: '8px' }}>
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

      {/* DT */}
      <div style={{
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease-in-out'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Checkbox
            checked={dtFilters.dtTotal}
            onChange={(e) => handleDTFilterChange('dtTotal', e.value)}
          />
          <label style={{ fontWeight: 'bold', color: '#384C9E', fontSize: '14px', marginLeft: '8px' }}>
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

      {/* Foster Care */}
      <FilterCard title="Foster Care" headerChecked={fcTotal} headerOnChange={(e) => setFCTotal(e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={fcFilters.yes} onChange={(e) => handleFCFilterChange('yes', e.value)} />
          <Checkbox label="No" checked={fcFilters.no} onChange={(e) => handleFCFilterChange('no', e.value)} />
        </div>
      </FilterCard>

      {/* Disability Count */}
      <FilterCard title="Disability Count" headerChecked={disabilityCountTotal} headerOnChange={(e) => setDisabilityCountTotal(e.value)}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '10px',
          alignItems: 'center',
          marginLeft: '20px'
        }}>
          <Checkbox label="Zero" checked={disabilityCountFilters.zero} onChange={(e) => handleDisabilityCountChange('zero', e.value)} />
          <Checkbox label="One" checked={disabilityCountFilters.one} onChange={(e) => handleDisabilityCountChange('one', e.value)} />
          <Checkbox label="Two" checked={disabilityCountFilters.two} onChange={(e) => handleDisabilityCountChange('two', e.value)} />
          <Checkbox label="Three" checked={disabilityCountFilters.three} onChange={(e) => handleDisabilityCountChange('three', e.value)} />
          <Checkbox label="Four +" checked={disabilityCountFilters.fourPlus} onChange={(e) => handleDisabilityCountChange('fourPlus', e.value)} />
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

      {/* Income Source */}
      <div style={{
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease-in-out'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Checkbox
            checked={incomeSourceTotal}
            onChange={(e) => setIncomeSourceTotal(e.value)}
          />
          <label style={{ fontWeight: 'bold', color: '#384C9E', fontSize: '14px', marginLeft: '8px' }}>
            Income Source
          </label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '20px' }}>
          <Checkbox label="SSI" checked={incomeSourceFilters.ssi} onChange={(e) => handleIncomeSourceFilterChange('ssi', e.value)} />
          <Checkbox label="SSDI" checked={incomeSourceFilters.ssdi} onChange={(e) => handleIncomeSourceFilterChange('ssdi', e.value)} />
          <Checkbox label="Multiple" checked={incomeSourceFilters.multiple} onChange={(e) => handleIncomeSourceFilterChange('multiple', e.value)} />
          <Checkbox label="Other" checked={incomeSourceFilters.other} onChange={(e) => handleIncomeSourceFilterChange('other', e.value)} />
          <Checkbox label="None" checked={incomeSourceFilters.none} onChange={(e) => handleIncomeSourceFilterChange('none', e.value)} />
        </div>
      </div>
    </div>
  );
}