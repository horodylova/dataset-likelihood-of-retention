'use client';

export default function RawDataTable({ data, isVisible }) {
  if (!isVisible || !data || data.length === 0) {
    return null;
  }

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Raw Data ({data.length} records):</h3>
      <div style={{ overflowX: 'auto', maxHeight: '400px', border: '1px solid #ccc' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '600px' }}>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f5f5f5' }}>
            <tr>
              {headers.map(header => (
                <th key={header} style={{ 
                  border: '1px solid #ccc', 
                  padding: '8px', 
                  textAlign: 'left',
                  fontWeight: 'bold'
                }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                {headers.map(header => (
                  <td key={header} style={{ 
                    border: '1px solid #ccc', 
                    padding: '8px',
                    whiteSpace: 'nowrap'
                  }}>
                    {row[header] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}