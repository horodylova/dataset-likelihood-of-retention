'use client';

import { Checkbox } from '@progress/kendo-react-inputs';
import { useState, useEffect, useCallback } from 'react';
import FilterCard from './FilterCard';

export default function ProgramScreeningSection({ onMultiSelectionChange, resetSignal }) {
  const [dtFilters, setDTFilters] = useState({
    dtTotal: false,
    yes: false,
    no: false
  });

  const [feloniesFilters, setFeloniesFilters] = useState({
    feloniesTotal: false,
    yes: false,
    no: false
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

  const [fcFilters, setFCFilters] = useState({
    yes: false,
    no: false
  });
  const [fcTotal, setFCTotal] = useState(false);

  const handleDTFilterChange = useCallback((type, checked) => {
    setDTFilters(prev => ({ ...prev, [type]: checked }));
  }, []);
  const handleFeloniesFilterChange = useCallback((type, checked) => {
    setFeloniesFilters(prev => ({ ...prev, [type]: checked }));
  }, []);
  const handleABScoreFilterChange = useCallback((type, checked) => {
    setAbScoreFilters(prev => ({ ...prev, [type]: checked }));
  }, []);
  const handleYCHFilterChange = useCallback((type, checked) => {
    setYchFilters(prev => ({ ...prev, [type]: checked }));
  }, []);
  const handleFCFilterChange = useCallback((type, checked) => {
    setFCFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

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
    if (feloniesFilters.yes) values.push('Yes');
    if (feloniesFilters.no) values.push('No');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Felonies', { combined: !!feloniesFilters.feloniesTotal, values });
    }
  }, [feloniesFilters, onMultiSelectionChange]);

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
    const values = [];
    if (fcFilters.yes) values.push('Yes');
    if (fcFilters.no) values.push('No');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('FC', { combined: !!fcTotal, values });
    }
  }, [fcFilters, fcTotal, onMultiSelectionChange]);

  useEffect(() => {
    if (resetSignal == null) return;
    setDTFilters({ dtTotal: false, yes: false, no: false });
    setFeloniesFilters({ feloniesTotal: false, yes: false, no: false });
    setAbScoreFilters({ abScoreTotal: false, none: false, oneSix: false, sevenNine: false, tenTwelve: false, thirteenPlus: false });
    setYchFilters({ ychTotal: false, oneTwo: false, threeFour: false, fiveSeven: false, eightFourteen: false, fifteenPlus: false });
    setFCFilters({ yes: false, no: false });
    setFCTotal(false);
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
      <FilterCard title="DT" headerChecked={dtFilters.dtTotal} headerOnChange={(e) => handleDTFilterChange('dtTotal', e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={dtFilters.yes} onChange={(e) => handleDTFilterChange('yes', e.value)} />
          <Checkbox label="No" checked={dtFilters.no} onChange={(e) => handleDTFilterChange('no', e.value)} />
        </div>
      </FilterCard>

      <FilterCard title="Felonies" headerChecked={feloniesFilters.feloniesTotal} headerOnChange={(e) => handleFeloniesFilterChange('feloniesTotal', e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={feloniesFilters.yes} onChange={(e) => handleFeloniesFilterChange('yes', e.value)} />
          <Checkbox label="No" checked={feloniesFilters.no} onChange={(e) => handleFeloniesFilterChange('no', e.value)} />
        </div>
      </FilterCard>

      <FilterCard title="AB Score" headerChecked={abScoreFilters.abScoreTotal} headerOnChange={(e) => handleABScoreFilterChange('abScoreTotal', e.value)}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', alignItems: 'center', marginLeft: '20px' }}>
          <Checkbox label="None" checked={abScoreFilters.none} onChange={(e) => handleABScoreFilterChange('none', e.value)} />
          <Checkbox label="1-6" checked={abScoreFilters.oneSix} onChange={(e) => handleABScoreFilterChange('oneSix', e.value)} />
          <Checkbox label="7-9" checked={abScoreFilters.sevenNine} onChange={(e) => handleABScoreFilterChange('sevenNine', e.value)} />
          <Checkbox label="10-12" checked={abScoreFilters.tenTwelve} onChange={(e) => handleABScoreFilterChange('tenTwelve', e.value)} />
          <Checkbox label="13+" checked={abScoreFilters.thirteenPlus} onChange={(e) => handleABScoreFilterChange('thirteenPlus', e.value)} />
        </div>
      </FilterCard>

      <FilterCard title="YCH" headerChecked={ychFilters.ychTotal} headerOnChange={(e) => handleYCHFilterChange('ychTotal', e.value)}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px', alignItems: 'center', marginLeft: '20px' }}>
          <Checkbox label="1-2" checked={ychFilters.oneTwo} onChange={(e) => handleYCHFilterChange('oneTwo', e.value)} />
          <Checkbox label="3-4" checked={ychFilters.threeFour} onChange={(e) => handleYCHFilterChange('threeFour', e.value)} />
          <Checkbox label="5-7" checked={ychFilters.fiveSeven} onChange={(e) => handleYCHFilterChange('fiveSeven', e.value)} />
          <Checkbox label="8-14" checked={ychFilters.eightFourteen} onChange={(e) => handleYCHFilterChange('eightFourteen', e.value)} />
          <Checkbox label="15+" checked={ychFilters.fifteenPlus} onChange={(e) => handleYCHFilterChange('fifteenPlus', e.value)} />
        </div>
      </FilterCard>

      <FilterCard title="Foster Care" headerChecked={fcTotal} headerOnChange={(e) => setFCTotal(e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={fcFilters.yes} onChange={(e) => handleFCFilterChange('yes', e.value)} />
          <Checkbox label="No" checked={fcFilters.no} onChange={(e) => handleFCFilterChange('no', e.value)} />
        </div>
      </FilterCard>
    </div>
  );
}