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

  const handleGenderFilterChange = useCallback((type, checked) => {
    setGenderFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

  const handleVeteranFilterChange = useCallback((type, checked) => {
    setVeteranFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

  const handleSubstanceFilterChange = useCallback((type, checked) => {
    setSubstanceFilters(prev => ({ ...prev, [type]: checked }));
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

  // Передача выбранных значений вверх — только сбор выбора, без вычислений
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
    if (substanceFilters.yes) values.push('Yes');
    if (substanceFilters.no) values.push('No');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Substance Abuse', { combined: !!substanceFilters.substanceTotal, values });
    }
  }, [substanceFilters, onMultiSelectionChange]);

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
      // ВАЖНО: передаем колонку 'Income', чтобы совпало с данными
      onMultiSelectionChange('Income', { combined: !!incomeSourceTotal, values });
    }
  }, [incomeSourceFilters, incomeSourceTotal, onMultiSelectionChange]);

  // Сброс всех чекбоксов по сигналу из родителя
  useEffect(() => {
    if (resetSignal == null) return;
    setGenderFilters({ genderTotal: false, male: false, female: false });
    setVeteranFilters({ veteranTotal: false, yes: false, no: false });
    setSubstanceFilters({ substanceTotal: false, yes: false, no: false });
    setFeloniesFilters({ feloniesTotal: false, yes: false, no: false });
    setDTFilters({ dtTotal: false, yes: false, no: false });
    setFCFilters({ yes: false, no: false });
    setFCTotal(false);
    setDisabilityCountFilters({ zero: false, one: false, two: false, three: false, fourPlus: false });
    setDisabilityCountTotal(false);
    setIncomeSourceFilters({ ssi: false, ssdi: false, multiple: false, other: false, none: false });
    setIncomeSourceTotal(false);
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
      {/* Gender */}
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

      {/* Substance Abuse */}
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
            checked={substanceFilters.substanceTotal}
            onChange={(e) => handleSubstanceFilterChange('substanceTotal', e.value)}
          />
          <label style={{ fontWeight: 'bold', color: '#384C9E', fontSize: '14px', marginLeft: '8px' }}>
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
          alignItems: 'center'
        }}>
          <Checkbox label="Zero" checked={disabilityCountFilters.zero} onChange={(e) => handleDisabilityCountChange('zero', e.value)} />
          <Checkbox label="One" checked={disabilityCountFilters.one} onChange={(e) => handleDisabilityCountChange('one', e.value)} />
          <Checkbox label="Two" checked={disabilityCountFilters.two} onChange={(e) => handleDisabilityCountChange('two', e.value)} />
          <Checkbox label="Three" checked={disabilityCountFilters.three} onChange={(e) => handleDisabilityCountChange('three', e.value)} />
          <Checkbox label="Four +" checked={disabilityCountFilters.fourPlus} onChange={(e) => handleDisabilityCountChange('fourPlus', e.value)} />
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