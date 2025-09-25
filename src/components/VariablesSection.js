'use client'

import { Checkbox } from '@progress/kendo-react-inputs';
import FilterCard from './FilterCard';

export default function VariablesSection() {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      maxHeight: '400px',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#FF5E00 #f1f1f1'
    }}>
      <FilterCard title="Income Source">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '10px',
          alignItems: 'center'
        }}>
          <Checkbox label="SSI" />
          <Checkbox label="SSDI" />
          <Checkbox label="Multiple" />
          <Checkbox label="Other" />
          <Checkbox label="None" />
          <Checkbox label="Unknown" />
        </div>
      </FilterCard>
      
      <FilterCard title="Gender">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Female" />
          <Checkbox label="Male" />
        </div>
      </FilterCard>
      
      <FilterCard title="Veteran">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" />
          <Checkbox label="No" />
        </div>
      </FilterCard>
      
      <FilterCard title="Foster Care">
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" />
          <Checkbox label="No" />
        </div>
      </FilterCard>
      
      <FilterCard title="Disability Count">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minWidth(100px, 1fr))',
          gap: '10px',
          alignItems: 'center'
        }}>
          <Checkbox label="Zero" />
          <Checkbox label="One" />
          <Checkbox label="Two" />
          <Checkbox label="Three" />
          <Checkbox label="Four +" />
        </div>
      </FilterCard>
    </div>
  );
}