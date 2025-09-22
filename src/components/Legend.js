'use client'

export default function Legend() {
  return (
    <div style={{
      flexShrink: 0,
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: '#28a745' }}></div>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>SSI Female</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: '#FF5E00' }}></div>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>SSI Male</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: '#384C9E' }}></div>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>SSDI Female</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: '#dc3545' }}></div>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>SSDI Male</span>
        </div>
      </div>
    </div>
  );
}