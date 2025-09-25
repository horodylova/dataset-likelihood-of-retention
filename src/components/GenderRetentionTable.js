'use client';

import { useState, useEffect } from 'react';
import { calculateRetentionByGender } from '@/lib/filterUtils';
import { useRetention } from '@/contexts/RetentionContext';

export default function GenderRetentionTable({ processedData, filters }) {
  const [showMale, setShowMale] = useState(true);
  const [showFemale, setShowFemale] = useState(true);
  const { state } = useRetention();
  const { rawData } = state;

  const calculateGenderData = () => {
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
    
    const genderRetentionData = calculateRetentionByGender(processedData, rawData);
     
    if (showMale && !showFemale) {
      return genderRetentionData.Male || {};
    } else if (showFemale && !showMale) {
      return genderRetentionData.Female || {};
    } else if (showMale && showFemale) {
      return genderRetentionData.combined || {};
    }
    
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
  };

  const genderData = calculateGenderData();

  const handleReset = () => {
    setShowMale(true);
    setShowFemale(true);
  };

  return (
    <div style={{ flex: 1 }}>
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ marginRight: '20px' }}>
          <input
            type="checkbox"
            checked={showMale}
            onChange={(e) => setShowMale(e.target.checked)}
          />
          Male
        </label>
        <label style={{ marginRight: '20px' }}>
          <input
            type="checkbox"
            checked={showFemale}
            onChange={(e) => setShowFemale(e.target.checked)}
          />
          Female
        </label>
        <button
          onClick={handleReset}
          style={{
            padding: '6px 12px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
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
          {Object.entries(genderData).map(([year, data]) => (
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