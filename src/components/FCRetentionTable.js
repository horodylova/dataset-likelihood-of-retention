'use client';

import { useState } from 'react';
import { useRetention } from '@/contexts/RetentionContext';

export default function FCRetentionTable({ processedData, filters }) {
  const [showYes, setShowYes] = useState(true);
  const [showNo, setShowNo] = useState(true);
  const { state } = useRetention();
  const { rawData } = state;

  const calculateFCData = () => {
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

    const headers = rawData[0];
    const fcColumnIndex = headers.findIndex(h => 
      h && h.toLowerCase().trim() === 'fc'
    );

    if (fcColumnIndex === -1) {
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

    const retentionData = {
      Yes: {},
      No: {},
      combined: {}
    };

    for (let year = 1; year <= 10; year++) {
      const yearKey = `Year ${year}`;
      retentionData.Yes[yearKey] = { eligible: 0, retained: 0, rate: 0 };
      retentionData.No[yearKey] = { eligible: 0, retained: 0, rate: 0 };
      retentionData.combined[yearKey] = { eligible: 0, retained: 0, rate: 0 };
    }

    const yesData = processedData.filter(resident => {
      const cellValue = resident.rawData[fcColumnIndex];
      return cellValue && cellValue.toString().toLowerCase().trim() === 'yes';
    });

    const noData = processedData.filter(resident => {
      const cellValue = resident.rawData[fcColumnIndex];
      return !cellValue || cellValue.toString().toLowerCase().trim() !== 'yes';
    });

    calculateRetentionForData(yesData, retentionData.Yes);
    calculateRetentionForData(noData, retentionData.No);
    calculateRetentionForData(processedData, retentionData.combined);
     
    if (showYes && !showNo) {
      return retentionData.Yes || {};
    } else if (showNo && !showYes) {
      return retentionData.No || {};
    } else if (showYes && showNo) {
      return retentionData.combined || {};
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

  const calculateRetentionForData = (data, retentionObject) => {
    data.forEach(resident => {
      if (!resident.moveInDate) return;
      
      const yearsLived = calculateYearsLived(resident.moveInDate, resident.moveOutDate);
      
      for (let year = 1; year <= 10; year++) {
        if (yearsLived >= year) {
          retentionObject[`Year ${year}`].eligible++;
          
          if (yearsLived >= year + 1) {
            retentionObject[`Year ${year}`].retained++;
          }
        }
      }
    });

    Object.keys(retentionObject).forEach(year => {
      const yearData = retentionObject[year];
      yearData.rate = yearData.eligible > 0 ? 
        Math.round((yearData.retained / yearData.eligible) * 100 * 100) / 100 : 0;
    });
  };

  const calculateYearsLived = (moveInDate, moveOutDate) => {
    if (!moveInDate) return 0;
    
    const startDate = new Date(moveInDate);
    const endDate = moveOutDate ? new Date(moveOutDate) : new Date();
    
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = diffDays / 365.25;
    
    return Math.floor(diffYears);
  };

  const fcData = calculateFCData();

  const handleReset = () => {
    setShowYes(false);
    setShowNo(false);
  };

  return (
    <div style={{ flex: 1 }}>
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontWeight: 'bold', marginRight: '15px' }}>FC:</span>
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
          {Object.entries(fcData).map(([year, data]) => (
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