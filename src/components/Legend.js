'use client'

import { Card, CardBody } from '@progress/kendo-react-layout';

export default function Legend({ legendItems = [] }) {
  const colors = [
    '#FF6358', '#FFD23F', '#3FDCF7', '#FF9500', 
    '#34C759', '#007AFF', '#5856D6', '#AF52DE',
    '#FF2D92', '#A2845E', '#8E8E93', '#48484A'
  ];

  if (legendItems.length === 0) {
    return null;
  }

  return (
    <Card style={{
      marginBottom: '20px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <CardBody style={{ padding: '16px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {legendItems.map((item, index) => {
            const color = colors[index % colors.length];
            return (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '6px 12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '20px',
                  border: `1px solid ${color}40`,
                  transition: 'all 0.2s ease'
                }}
              >
                <div 
                  style={{ 
                    backgroundColor: color,
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    minWidth: '12px',
                    flexShrink: 0
                  }}
                />
                <span style={{ 
                  fontSize: '13px', 
                  fontWeight: '500',
                  color: '#333',
                  whiteSpace: 'nowrap'
                }}>
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}