'use client';

export default function ResidentsRetentionTable({ retentionData, filters, updateFilters }) {
  const handleReset = () => {
    updateFilters({ 
      showCurrentResidents: false, 
      showFormerResidents: false 
    });
  };

  return (
    <div style={{ flex: 1 }}>
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ marginRight: '20px' }}>
          <input
            type="checkbox"
            checked={filters.showCurrentResidents}
            onChange={(e) => updateFilters({ showCurrentResidents: e.target.checked })}
          />
          Current Residents
        </label>
        <label style={{ marginRight: '20px' }}>
          <input
            type="checkbox"
            checked={filters.showFormerResidents}
            onChange={(e) => updateFilters({ showFormerResidents: e.target.checked })}
          />
          Former Residents
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
      
      {Object.keys(retentionData).length > 0 ? (
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
            {Object.entries(retentionData).map(([year, data]) => (
              <tr key={year}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{year}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.eligible}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.retained}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{data.rate.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No retention data available</p>
      )}
    </div>
  );
}