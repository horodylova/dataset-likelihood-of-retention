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

  // ДОБАВЛЕНО: состояние для Monthly Income
  const [monthlyIncomeFilters, setMonthlyIncomeFilters] = useState({
    zero: false,
    oneTo750: false,
    sevenFiftyOneTo1000: false,
    oneThousandOneTo1500: false,
    fifteenHundredPlus: false
  });
  const [monthlyIncomeTotal, setMonthlyIncomeTotal] = useState(false);

  const handleIncomeSourceFilterChange = useCallback((type, checked) => {
    setIncomeSourceFilters(prev => ({ ...prev, [type]: checked }));
  }, []);

  // ДОБАВЛЕНО: обработчик изменений Monthly Income
  const handleMonthlyIncomeChange = useCallback((type, checked) => {
    setMonthlyIncomeFilters(prev => ({ ...prev, [type]: checked }));
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
    const values = [];
    if (monthlyIncomeFilters.zero) values.push('$0');
    if (monthlyIncomeFilters.oneTo750) values.push('$1-750');
    if (monthlyIncomeFilters.sevenFiftyOneTo1000) values.push('$751-1000');
    if (monthlyIncomeFilters.oneThousandOneTo1500) values.push('$1001-1500');
    if (monthlyIncomeFilters.fifteenHundredPlus) values.push('$1501+');
    if (onMultiSelectionChange) {
      onMultiSelectionChange('Monthly Income', { combined: !!monthlyIncomeTotal, values });
    }
  }, [monthlyIncomeFilters, monthlyIncomeTotal, onMultiSelectionChange]);

  useEffect(() => {
    if (resetSignal == null) return;
    setIncomeSourceFilters({ ssi: false, ssdi: false, multiple: false, other: false, none: false });
    setIncomeSourceTotal(false);
    setMonthlyIncomeFilters({
      zero: false,
      oneTo750: false,
      sevenFiftyOneTo1000: false,
      oneThousandOneTo1500: false,
      fifteenHundredPlus: false
    });
    setMonthlyIncomeTotal(false);
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

      {/* Monthly Income */}
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
            checked={monthlyIncomeTotal}
            onChange={(e) => setMonthlyIncomeTotal(e.value)}
          />
          <label style={{ fontWeight: 'bold', color: '#384C9E', fontSize: '14px', marginLeft: '8px' }}>
            Monthly Income
          </label>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '10px',
          alignItems: 'center',
          marginLeft: '20px'
        }}>
          <Checkbox label="$0" checked={monthlyIncomeFilters.zero} onChange={(e) => handleMonthlyIncomeChange('zero', e.value)} />
          <Checkbox label="$1-750" checked={monthlyIncomeFilters.oneTo750} onChange={(e) => handleMonthlyIncomeChange('oneTo750', e.value)} />
          <Checkbox label="$751-1000" checked={monthlyIncomeFilters.sevenFiftyOneTo1000} onChange={(e) => handleMonthlyIncomeChange('sevenFiftyOneTo1000', e.value)} />
          <Checkbox label="$1001-1500" checked={monthlyIncomeFilters.oneThousandOneTo1500} onChange={(e) => handleMonthlyIncomeChange('oneThousandOneTo1500', e.value)} />
          <Checkbox label="$1501+" checked={monthlyIncomeFilters.fifteenHundredPlus} onChange={(e) => handleMonthlyIncomeChange('fifteenHundredPlus', e.value)} />
        </div>
      </div>
    </div>
  );
}