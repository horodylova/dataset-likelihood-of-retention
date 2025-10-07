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
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '600px', position: 'relative' }}>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f5f5f5', zIndex: 10 }}>
            <tr>
              {headers.map((header, index) => {
                const baseStyle = {
                  border: '1px solid #ccc',
                  padding: '8px',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  backgroundColor: '#f5f5f5',
                  zIndex: 10
                };
                const stickyLeft = index === 0 ? {
                  position: 'sticky',
                  left: 0,
                  zIndex: 11,
                  minWidth: '70px'
                } : {};
                return (
                  <th key={index} style={{ ...baseStyle, ...stickyLeft }}>
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                {headers.map((header, colIndex) => {
                  const baseCell = {
                    border: '1px solid #ccc',
                    padding: '8px',
                    whiteSpace: 'nowrap'
                  };
                  const stickyLeftCell = colIndex === 0 ? {
                    position: 'sticky',
                    left: 0,
                    backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#f9f9f9',
                    zIndex: 2,
                    minWidth: '70px',
                    boxShadow: '2px 0 0 rgba(0,0,0,0.04)'
                  } : {};
                  return (
                    <td key={colIndex} style={{ ...baseCell, ...stickyLeftCell }}>
                      {row[colIndex] || ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}