'use client';

import { useState } from 'react';
import { Checkbox } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { useRetention } from '@/contexts/RetentionContext';
import { calculateRetentionByDisabilityCount } from '@/lib/filterUtils';

export default function DisabilityCountRetentionTable({ processedData, filters }) {
  const [show0, setShow0] = useState(true);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);
  const [show4, setShow4] = useState(true);
  const { state } = useRetention();
  const { rawData } = state;

  const calculateData = () => {
    if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
      const emptyData = {};
      for (let year = 1; year <= 10; year++) {
        const yearKey = `Year ${year}`;
        emptyData[yearKey] = { eligible: 0, retained: 0, rate: 0 };
      }
      return emptyData;
    }

    const buckets = calculateRetentionByDisabilityCount(processedData, rawData);

    const selectedKeys = [];
    if (show0) selectedKeys.push('0');
    if (show1) selectedKeys.push('1');
    if (show2) selectedKeys.push('2');
    if (show3) selectedKeys.push('3');
    if (show4) selectedKeys.push('4');

    if (selectedKeys.length === 0) {
      const emptyData = {};
      for (let year = 1; year <= 10; year++) {
        const yearKey = `Year ${year}`;
        emptyData[yearKey] = { eligible: 0, retained: 0, rate: 0 };
      }
      return emptyData;
    }

    if (selectedKeys.length === 1) {
      return buckets[selectedKeys[0]];
    }

    const combined = {};
    for (let year = 1; year <= 10; year++) {
      const y = `Year ${year}`;
      let eligibleSum = 0;
      let retainedSum = 0;
      selectedKeys.forEach(k => {
        const d = buckets[k][y];
        if (d) {
          eligibleSum += d.eligible;
          retainedSum += d.retained;
        }
      });
      const rate = eligibleSum > 0 ? Math.round((retainedSum / eligibleSum) * 100 * 100) / 100 : 0;
      combined[y] = { eligible: eligibleSum, retained: retainedSum, rate };
    }
    return combined;
  };

  const initRetentionYears = () => {
    const obj = {};
    for (let year = 1; year <= 10; year++) {
      obj[`Year ${year}`] = { eligible: 0, retained: 0, rate: 0 };
    }
    return obj;
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
      yearData.rate = yearData.eligible > 0 ? Math.round((yearData.retained / yearData.eligible) * 100 * 100) / 100 : 0;
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

  const data = calculateData();

  return (
    <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '10px', alignItems: 'center' }}>
        <Checkbox label="0" checked={show0} onChange={(e) => setShow0(e.value)} />
        <Checkbox label="1" checked={show1} onChange={(e) => setShow1(e.value)} />
        <Checkbox label="2" checked={show2} onChange={(e) => setShow2(e.value)} />
        <Checkbox label="3" checked={show3} onChange={(e) => setShow3(e.value)} />
        <Checkbox label="4" checked={show4} onChange={(e) => setShow4(e.value)} />
        <button
          onClick={() => { setShow0(false); setShow1(false); setShow2(false); setShow3(false); setShow4(false); }}
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
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Year</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Eligible</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Retained</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f5f5f5' }}>Rate %</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([year, v]) => (
            <tr key={year}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{year}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{v.eligible}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{v.retained}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{v.rate.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}