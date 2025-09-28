'use client';

import { Button } from '@progress/kendo-react-buttons';

export default function CategoryList({ selectedCategory, onCategorySelect }) {
  const categories = [
    'Gender',
    'Veteran', 
    'FC',
    'Visual',
    'Hearing',
    'Alzheimer\'s / Dementia',
    'HIV / AIDS',
    'Physical / Medical',
    'Mental Health',
    'Physical / Mobility',
    'Alcohol Abuse',
    'Substance Abuse',
    'Disability Count',
    'Felonies',
    'Income',
    'DT'
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: `repeat(${Math.ceil(categories.length / 2)}, 1fr)`,
      gap: '8px',
      maxWidth: '400px',
      height: '500px',
      alignContent: 'stretch'
    }}>
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategorySelect(category)}
          fillMode={selectedCategory === category ? 'solid' : 'outline'}
          themeColor="secondary"
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: selectedCategory === category ? '600' : '500',
            background: selectedCategory === category 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
              : 'white',
            borderColor: selectedCategory === category 
              ? 'transparent' 
              : 'var(--kendo-color-secondary)',
            color: selectedCategory === category ? 'white' : 'var(--kendo-color-secondary)',
            transition: 'all 0.2s ease',
            boxSizing: 'border-box',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            lineHeight: '1.2',
            display: 'flex',
            alignItems: 'center',
            minHeight: '0',
            border: selectedCategory === category 
              ? '1px solid transparent' 
              : '1px solid var(--kendo-color-secondary)'
          }}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}