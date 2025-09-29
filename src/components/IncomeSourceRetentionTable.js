'use client';

import { useState } from 'react';
import { Checkbox } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { calculateRetentionByIncomeSource } from '@/lib/filterUtils';
import { useRetention } from '@/contexts/RetentionContext';

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

  const handleSelectAll = () => {
    setShowSSI(true);
    setShowSSDI(true);
    setShowMultiple(true);
    setShowOther(true);
    setShowNone(true);
    setShowUnknown(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontWeight: 'bold', marginRight: '15px' }}>Income Source:</span>
        <Checkbox 
          label="SSI" 
          checked={showSSI}
          onChange={(e) => setShowSSI(e.value)}
          style={{ marginRight: '10px' }}
        />
        <Checkbox 
          label="SSDI" 
          checked={showSSDI}
          onChange={(e) => setShowSSDI(e.value)}
          style={{ marginRight: '10px' }}
        />
        <Checkbox 
          label="Multiple" 
          checked={showMultiple}
          onChange={(e) => setShowMultiple(e.value)}
          style={{ marginRight: '10px' }}
        />
        <Checkbox 
          label="Other" 
          checked={showOther}
          onChange={(e) => setShowOther(e.value)}
          style={{ marginRight: '10px' }}
        />
        <Checkbox 
          label="None" 
          checked={showNone}
          onChange={(e) => setShowNone(e.value)}
          style={{ marginRight: '10px' }}
        />
        <Checkbox 
          label="Unknown" 
          checked={showUnknown}
          onChange={(e) => setShowUnknown(e.value)}
          style={{ marginRight: '15px' }}
        />
        <Button onClick={handleSelectAll} style={{ marginRight: '10px' }}>
          Select All
        </Button>
        <Button onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div style={{ 
        overflowX: 'auto',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          minWidth: '800px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ 
                padding: '12px', 
                textAlign: 'left', 
                borderBottom: '2px solid #ddd',
                fontWeight: 'bold'
              }}>
                Year
              </th>
              <th style={{ 
                padding: '12px', 
                textAlign: 'center', 
                borderBottom: '2px solid #ddd',
                fontWeight: 'bold'
              }}>
                Eligible
              </th>
              <th style={{ 
                padding: '12px', 
                textAlign: 'center', 
                borderBottom: '2px solid #ddd',
                fontWeight: 'bold'
              }}>
                Retained
              </th>
              <th style={{ 
                padding: '12px', 
                textAlign: 'center', 
                borderBottom: '2px solid #ddd',
                fontWeight: 'bold'
              }}>
                Rate %
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(incomeData).map(([year, data]) => (
              <tr key={year} style={{ 
                borderBottom: '1px solid #eee',
                '&:hover': { backgroundColor: '#f9f9f9' }
              }}>
                <td style={{ 
                  padding: '10px 12px', 
                  fontWeight: '500'
                }}>
                  {year}
                </td>
                <td style={{ 
                  padding: '10px 12px', 
                  textAlign: 'center'
                }}>
                  {data.eligible}
                </td>
                <td style={{ 
                  padding: '10px 12px', 
                  textAlign: 'center'
                }}>
                  {data.retained}
                </td>
                <td style={{ 
                  padding: '10px 12px', 
                  textAlign: 'center',
                  fontWeight: '500',
                  color: data.rate >= 70 ? '#28a745' : data.rate >= 50 ? '#ffc107' : '#dc3545'
                }}>
                  {data.rate}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}