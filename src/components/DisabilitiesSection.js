'use client'

import { RadioButton } from '@progress/kendo-react-inputs';
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
          <RadioButton name="visual" label="Yes" />
          <RadioButton name="visual" label="No" defaultChecked={true} />
        </div>
      </FilterCard>
      
      <FilterCard title="Hearing">
        <div style={{ display: 'flex', gap: '15px' }}>
          <RadioButton name="hearing" label="Yes" />
          <RadioButton name="hearing" label="No" defaultChecked={true} />
        </div>
      </FilterCard>
      
      <FilterCard title="Alzheimer / Dementia">
        <div style={{ display: 'flex', gap: '15px' }}>
          <RadioButton name="alzheimer" label="Yes" />
          <RadioButton name="alzheimer" label="No" defaultChecked={true} />
        </div>
      </FilterCard>
      
      <FilterCard title="HIV / AIDS">
        <div style={{ display: 'flex', gap: '15px' }}>
          <RadioButton name="hiv" label="Yes" />
          <RadioButton name="hiv" label="No" defaultChecked={true} />
        </div>
      </FilterCard>
      
      <FilterCard title="Physical / Medical">
        <div style={{ display: 'flex', gap: '15px' }}>
          <RadioButton name="physical" label="Yes" />
          <RadioButton name="physical" label="No" defaultChecked={true} />
        </div>
      </FilterCard>
      
      <FilterCard title="Mental Health">
        <div style={{ display: 'flex', gap: '15px' }}>
          <RadioButton name="mental" label="Yes" />
          <RadioButton name="mental" label="No" defaultChecked={true} />
        </div>
      </FilterCard>
      
      <FilterCard title="Physical / Mobility">
        <div style={{ display: 'flex', gap: '15px' }}>
          <RadioButton name="mobility" label="Yes" />
          <RadioButton name="mobility" label="No" defaultChecked={true} />
        </div>
      </FilterCard>
      
      <FilterCard title="Alcohol Abuse">
        <div style={{ display: 'flex', gap: '15px' }}>
          <RadioButton name="alcohol" label="Yes" />
          <RadioButton name="alcohol" label="No" defaultChecked={true} />
        </div>
      </FilterCard>
      
      <FilterCard title="Substance Abuse">
        <div style={{ display: 'flex', gap: '15px' }}>
          <RadioButton name="substance" label="Yes" />
          <RadioButton name="substance" label="No" defaultChecked={true} />
        </div>
      </FilterCard>
    </div>
  );
}