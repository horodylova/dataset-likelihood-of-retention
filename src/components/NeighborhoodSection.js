'use client'

import { Checkbox } from '@progress/kendo-react-inputs';
import { useState, useEffect, useCallback, useMemo } from 'react';
import FilterCard from './FilterCard';

export default function NeighborhoodSection({ onMultiSelectionChange, resetSignal }) {
  const initialState = {
    neighborhoodTotal: false,
    n100: false, n200: false, n300: false, n400: false,
    n500: false, n600: false, n700: false, n800: false,
    n1100: false, n1200: false, n1300: false, n1400: false,
    n1500: false, n1600: false, n1700: false, n1800: false, n1900: false,
  };

  const [filters, setFilters] = useState(initialState);

  const neighborhoods = useMemo(() => [
    { key: 'n100', label: '100' },
    { key: 'n200', label: '200' },
    { key: 'n300', label: '300' },
    { key: 'n400', label: '400' },
    { key: 'n500', label: '500' },
    { key: 'n600', label: '600' },
    { key: 'n700', label: '700' },
    { key: 'n800', label: '800' },
    { key: 'n1100', label: '1,100' },
    { key: 'n1200', label: '1,200' },
    { key: 'n1300', label: '1,300' },
    { key: 'n1400', label: '1,400' },
    { key: 'n1500', label: '1,500' },
    { key: 'n1600', label: '1,600' },
    { key: 'n1700', label: '1,700' },
    { key: 'n1800', label: '1,800' },
    { key: 'n1900', label: '1,900' },
  ], []);

  const handleChange = useCallback((key, checked) => {
    setFilters(prev => ({ ...prev, [key]: checked }));
  }, []);

  useEffect(() => {
    const values = [];
    neighborhoods.forEach(n => {
      if (filters[n.key]) values.push(n.label);
    });
    if (onMultiSelectionChange) {
      onMultiSelectionChange('NH', { combined: !!filters.neighborhoodTotal, values });
    }
  }, [filters, neighborhoods, onMultiSelectionChange]);

  useEffect(() => {
    if (resetSignal == null) return;
    setFilters({ ...initialState });
  }, [resetSignal]);

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      maxHeight: '400px',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#FF5E00 #f1f1f1'
    }}>
      <FilterCard
        title="Neighborhood"
        headerChecked={filters.neighborhoodTotal}
        headerOnChange={(e) => handleChange('neighborhoodTotal', e.value)}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '10px',
          alignItems: 'center'
        }}>
          {neighborhoods.map(({ key, label }) => (
            <Checkbox
              className="agency-checkbox agency-checkbox--wrap"
              key={key}
              label={label}
              checked={filters[key]}
              onChange={(e) => handleChange(key, e.value)}
            />
          ))}
        </div>
      </FilterCard>
    </div>
  );
}