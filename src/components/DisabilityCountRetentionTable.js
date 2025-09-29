'use client';

import { useState } from 'react';
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

  const handleReset = () => {
    setShow0(false);
    setShow1(false);
    setShow2(false);
    setShow3(false);
    setShow4(false);
  };

  const data = calculateData();

  return (
    <div style={{ flex: 1 }}>
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '14px' }}>Disability Count:</span>
        <label style={{ marginRight: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <input
            type="checkbox"
            checked={show0}
            onChange={(e) => setShow0(e.target.checked)}
            style={{ margin: 0 }}
          />
          0
        </label>
        <label style={{ marginRight: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <input
            type="checkbox"
            checked={show1}
            onChange={(e) => setShow1(e.target.checked)}
            style={{ margin: 0 }}
          />
          1
        </label>
        <label style={{ marginRight: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <input
            type="checkbox"
            checked={show2}
            onChange={(e) => setShow2(e.target.checked)}
            style={{ margin: 0 }}
          />
          2
        </label>
        <label style={{ marginRight: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <input
            type="checkbox"
            checked={show3}
            onChange={(e) => setShow3(e.target.checked)}
            style={{ margin: 0 }}
          />
          3
        </label>
        <label style={{ marginRight: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <input
            type="checkbox"
            checked={show4}
            onChange={(e) => setShow4(e.target.checked)}
            style={{ margin: 0 }}
          />
          4
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