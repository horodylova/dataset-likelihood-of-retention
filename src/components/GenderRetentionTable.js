'use client';

import { useState, useEffect } from 'react';
import { calculateRetentionByFilter } from '@/lib/dataUtils';

export default function GenderRetentionTable({ processedData, filters }) {
  const [showMale, setShowMale] = useState(true);
  const [showFemale, setShowFemale] = useState(true);

  const calculateGenderData = () => {
    if (!processedData || processedData.length === 0) {
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
    
    if (showMale && !showFemale) {
      return calculateRetentionByFilter(processedData, 'sex', 'male');
    } else if (showFemale && !showMale) {
      return calculateRetentionByFilter(processedData, 'sex', 'female');
    } else if (showMale && showFemale) {
      const maleData = calculateRetentionByFilter(processedData, 'sex', 'male');
      const femaleData = calculateRetentionByFilter(processedData, 'sex', 'female');
      
      const combinedData = {};
      for (let year = 1; year <= 10; year++) {
        const yearKey = `Year ${year}`;
        combinedData[yearKey] = {
          eligible: maleData[yearKey].eligible + femaleData[yearKey].eligible,
          retained: maleData[yearKey].retained + femaleData[yearKey].retained,
          rate: 0
        };
        combinedData[yearKey].rate = combinedData[yearKey].eligible > 0 ? 
          Math.round((combinedData[yearKey].retained / combinedData[yearKey].eligible) * 100 * 100) / 100 : 0;
      }
      return combinedData;
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
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '20px' }}>
          <input
            type="checkbox"
            checked={showMale}
            onChange={(e) => setShowMale(e.target.checked)}
          />
          Male
        </label>
        <label>
          <input
            type="checkbox"
            checked={showFemale}
            onChange={(e) => setShowFemale(e.target.checked)}
          />
          Female
        </label>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={handleReset}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>

      <h3>Gender Retention by Year:</h3>
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