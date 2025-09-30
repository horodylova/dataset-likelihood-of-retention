'use client';

import { useState } from 'react';
import { useRetention } from '@/contexts/RetentionContext';
import { calculateRetentionByIncomeSource } from '@/lib/filterUtils';

export default function IncomeSourceRetentionTable({ processedData, filters }) {
  const [showSSI, setShowSSI] = useState(true);
  const [showSSDI, setShowSSDI] = useState(true);
  const [showMultiple, setShowMultiple] = useState(true);
  const [showOther, setShowOther] = useState(true);
  const [showNone, setShowNone] = useState(true);
  const [showUnknown, setShowUnknown] = useState(true);
  
  const { state } = useRetention();
  const { rawData } = state;

  const calculateIncomeData = () => {
    if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
      const emptyData = {};
      for (let year = 1; year <= 10; year++) {
        const yearKey = `Year ${year}`;
        emptyData[yearKey] = {
          eligible: 0,
          retained: 0,
          rate: 0
        };
      }
      return emptyData;
    }
    
    const incomeRetentionData = calculateRetentionByIncomeSource(processedData, rawData);
    
    const selectedSources = [];
    if (showSSI) selectedSources.push('SSI');
    if (showSSDI) selectedSources.push('SSDI');
    if (showMultiple) selectedSources.push('Multiple');
    if (showOther) selectedSources.push('Other');
    if (showNone) selectedSources.push('None');
    if (showUnknown) selectedSources.push('Unknown');
    
    if (selectedSources.length === 0) {
      const emptyData = {};
      for (let year = 1; year <= 10; year++) {
        const yearKey = `Year ${year}`;
        emptyData[yearKey] = { eligible: 0, retained: 0, rate: 0 };
      }
      return emptyData;
    }
    
    if (selectedSources.length === 1) {
      return incomeRetentionData[selectedSources[0]] || {};
    }
    
    const combinedData = {};
    for (let year = 1; year <= 10; year++) {
      const yearKey = `Year ${year}`;
      let eligibleSum = 0;
      let retainedSum = 0;
      
      selectedSources.forEach(source => {
        const sourceData = incomeRetentionData[source];
        if (sourceData && sourceData[yearKey]) {
          eligibleSum += sourceData[yearKey].eligible;
          retainedSum += sourceData[yearKey].retained;
        }
      });
      
      const rate = eligibleSum > 0 ? Math.round((retainedSum / eligibleSum) * 100 * 100) / 100 : 0;
      combinedData[yearKey] = { eligible: eligibleSum, retained: retainedSum, rate };
    }
    
    return combinedData;
  };

  const incomeData = calculateIncomeData();

  const handleReset = () => {
    setShowSSI(false);
    setShowSSDI(false);
    setShowMultiple(false);
    setShowOther(false);
    setShowNone(false);
    setShowUnknown(false);
  };

  return (
    <div style={{ flex: 1 }}>
      <div style={{ 
        marginBottom: '15px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        flexWrap: 'nowrap', 
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}>
        <span style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '14px' }}>Income Source:</span>
        <label style={{ marginRight: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '3px', flex: '0 0 auto' }}>
          <input
            type="checkbox"
            checked={showSSI}
            onChange={(e) => setShowSSI(e.target.checked)}
            style={{ margin: 0 }}
          />
          SSI
        </label>
        <label style={{ marginRight: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <input
            type="checkbox"
            checked={showSSDI}
            onChange={(e) => setShowSSDI(e.target.checked)}
            style={{ margin: 0 }}
          />
          SSDI
        </label>
        <label style={{ marginRight: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <input
            type="checkbox"
            checked={showMultiple}
            onChange={(e) => setShowMultiple(e.target.checked)}
            style={{ margin: 0 }}
          />
          Multiple
        </label>
        <label style={{ marginRight: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <input
            type="checkbox"
            checked={showOther}
            onChange={(e) => setShowOther(e.target.checked)}
            style={{ margin: 0 }}
          />
          Other
        </label>
        <label style={{ marginRight: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <input
            type="checkbox"
            checked={showNone}
            onChange={(e) => setShowNone(e.target.checked)}
            style={{ margin: 0 }}
          />
          None
        </label>
        <label style={{ marginRight: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <input
            type="checkbox"
            checked={showUnknown}
            onChange={(e) => setShowUnknown(e.target.checked)}
            style={{ margin: 0 }}
          />
          Unknown
        </label>
        <button
          onClick={handleReset}
          style={{
            padding: '4px 8px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          Reset
        </button>
      </div>
      
      <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '600px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Year</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Eligible</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Retained</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Rate %</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(incomeData).map(([year, data]) => (
            <tr key={year}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{year}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.eligible}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.retained}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.rate.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}