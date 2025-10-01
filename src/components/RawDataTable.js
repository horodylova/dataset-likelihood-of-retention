'use client';

export default function RawDataTable({ data, isVisible, validCount }) {
  if (!isVisible || !data || data.length === 0) {
    return null;
  }

  const headers = data[0] || [];
  const rows = data.slice(1);
  const totalRecords = rows.length;

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Raw Data: {totalRecords} records, {validCount} valid</h3>
      <div style={{ 
        overflow: 'auto',
        width: '100%',
        height: 'calc(100vh - 140px)',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxSizing: 'border-box'
      }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '600px' }}>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f5f5f5' }}>
            <tr>
              {headers.map((header, index) => (
                <th key={index} style={{ 
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
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} style={{ 
                    border: '1px solid #ccc', 
                    padding: '8px',
                    whiteSpace: 'nowrap'
                  }}>
                    {row[colIndex] || ''}
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