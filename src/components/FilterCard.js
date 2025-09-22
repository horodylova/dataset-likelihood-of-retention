'use client'

export default function FilterCard({ title, children, style = {} }) {
  return (
    <div 
      style={{
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease-in-out',
        cursor: 'pointer',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {title && (
        <label style={{ 
          fontWeight: 'bold', 
          color: '#384C9E', 
          fontSize: '14px', 
          marginBottom: '8px', 
          display: 'block' 
        }}>
          {title}
        </label>
      )}
      {children}
    </div>
  );
}