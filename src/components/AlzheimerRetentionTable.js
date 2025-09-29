'use client';

import { useState } from 'react';
import { useRetention } from '@/contexts/RetentionContext';
import { calculateRetentionByAlzheimer } from '@/lib/filterUtils';

export default function AlzheimerRetentionTable({ processedData, filters }) {
  const [showYes, setShowYes] = useState(true);
  const [showNo, setShowNo] = useState(true);
  const { state } = useRetention();
  const { rawData } = state;

  const calculateAlzheimerData = () => {
    if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
      const emptyData = {};
      for (let year = 1; year <= 10; year++) {
        const yearKey = `Year ${year}`;
        emptyData[yearKey] = { eligible: 0, retained: 0, rate: 0 };
      }
      return emptyData;
    }
    const retentionData = calculateRetentionByAlzheimer(processedData, rawData);
    if (showYes && !showNo) return retentionData.Yes || {};
    if (showNo && !showYes) return retentionData.No || {};
    if (showYes && showNo) return retentionData.combined || {};
    const emptyData = {};
    for (let year = 1; year <= 10; year++) {
      const yearKey = `Year ${year}`;
      emptyData[yearKey] = { eligible: 0, retained: 0, rate: 0 };
    }
    return emptyData;
  };

  const alzheimerData = calculateAlzheimerData();

  const handleReset = () => {
    setShowYes(false);
    setShowNo(false);
  };

  return (
    <div style={{ flex: 1 }}>
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontWeight: 'bold', marginRight: '15px' }}>Alzheimer&apos;s / Dementia:</span>
        <label style={{ marginRight: '20px' }}>
          <input
            type="checkbox"
            checked={showYes}
            onChange={(e) => setShowYes(e.target.checked)}
          />
          Yes
        </label>
        <label style={{ marginRight: '20px' }}>
          <input
            type="checkbox"
            checked={showNo}
            onChange={(e) => setShowNo(e.target.checked)}
          />
          No
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
          {Object.entries(alzheimerData).map(([year, data]) => (
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