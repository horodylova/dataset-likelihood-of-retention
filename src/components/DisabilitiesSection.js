'use client'

import { Checkbox } from '@progress/kendo-react-inputs';
import FilterCard from './FilterCard';

export default function DisabilitiesSection() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa',
      maxHeight: '400px',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#FF5E00 #f1f1f1'
    }}>
      <FilterCard title="Visual">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" />
          <Checkbox label="No" />
        </div>
      </FilterCard>
      
      <FilterCard title="Hearing">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" />
          <Checkbox label="No" />
        </div>
      </FilterCard>
      
      <FilterCard title="Alzheimer / Dementia">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" />
          <Checkbox label="No" />
        </div>
      </FilterCard>
      
      <FilterCard title="HIV / AIDS">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" />
          <Checkbox label="No" />
        </div>
      </FilterCard>
      
      <FilterCard title="Physical / Medical">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" />
          <Checkbox label="No" />
        </div>
      </FilterCard>
      
      <FilterCard title="Mental Health">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" />
          <Checkbox label="No" />
        </div>
      </FilterCard>
      
      <FilterCard title="Physical / Mobility">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" />
          <Checkbox label="No" />
        </div>
      </FilterCard>
      
      <FilterCard title="Alcohol Abuse">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" />
          <Checkbox label="No" />
        </div>
      </FilterCard>
      
      <FilterCard title="Substance Abuse">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" />
          <Checkbox label="No" />
        </div>
      </FilterCard>
    </div>
  );
}