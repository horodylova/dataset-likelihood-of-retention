'use client'

import { Checkbox } from '@progress/kendo-react-inputs';
import { useState, useEffect, useCallback } from 'react';

export default function IncomeSection({ onMultiSelectionChange, resetSignal }) {
  const [incomeSourceFilters, setIncomeSourceFilters] = useState({
    ssi: false,
    ssdi: false,
    multiple: false,
    other: false,
    none: false
  });
  const [incomeSourceTotal, setIncomeSourceTotal] = useState(false);

  const handleIncomeSourceFilterChange = useCallback((type, checked) => {
    setIncomeSourceFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

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
    if (resetSignal == null) return;
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