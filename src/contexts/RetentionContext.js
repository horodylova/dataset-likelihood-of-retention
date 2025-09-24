'use client';

import { createContext, useContext, useReducer } from 'react';
import { processRawData, calculateRetentionByYear, getChartData } from '@/lib/dataUtils';

const RetentionContext = createContext();

const initialState = {
  rawData: null,
  processedData: [],
  filteredData: [],
  retentionData: {},
  chartData: [],
  loading: false,
  dataLoaded: false,
  filters: {
    yearRange: { start: null, end: null },
    showCurrentResidents: true,
    showFormerResidents: true
  }
};

function retentionReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
      
    case 'SET_DATA':
      try {
        const processed = processRawData(action.payload);
        const retention = calculateRetentionByYear(processed);
        const chart = getChartData(retention);
        
        return {
          ...state,
          rawData: action.payload,
          processedData: processed,
          filteredData: processed,
          retentionData: retention,
          chartData: chart,
          dataLoaded: true,
          loading: false
        };
      } catch (error) {
        console.error('Error processing data:', error);
        return {
          ...state,
          rawData: action.payload,
          processedData: [],
          filteredData: [],
          retentionData: {},
          chartData: [],
          dataLoaded: true,
          loading: false
        };
      }
      
    case 'APPLY_FILTERS':
      try {
        const filtered = applyFilters(state.processedData, action.payload);
        const filteredRetention = calculateRetentionByYear(filtered);
        const filteredChart = getChartData(filteredRetention);
        
        return {
          ...state,
          filteredData: filtered,
          retentionData: filteredRetention,
          chartData: filteredChart,
          filters: action.payload
        };
      } catch (error) {
        console.error('Error applying filters:', error);
        return state;
      }
      
    default:
      return state;
  }
}

function applyFilters(data, filters) {
  if (!data || data.length === 0) return [];
  
  return data.filter(item => {
    if (!filters.showCurrentResidents && item.isCurrentResident) return false;
    if (!filters.showFormerResidents && !item.isCurrentResident) return false;
    return true;
  });
}

export function RetentionProvider({ children }) {
  const [state, dispatch] = useReducer(retentionReducer, initialState);
  
  return (
    <RetentionContext.Provider value={{ state, dispatch }}>
      {children}
    </RetentionContext.Provider>
  );
}

export function useRetention() {
  const context = useContext(RetentionContext);
  if (!context) {
    throw new Error('useRetention must be used within a RetentionProvider');
  }
  return context;
}