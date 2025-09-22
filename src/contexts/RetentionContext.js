'use client';

import { createContext, useContext, useReducer } from 'react';

const RetentionContext = createContext();

const initialState = {
  filters: {
    dateRange: { start: null, end: null },
    propertyType: [],
    location: [],
    rentRange: { min: null, max: null },
    tenantAge: { min: null, max: null },
    leaseLength: []
  },
  data: [],
  filteredData: [],
  chartData: [],
  loading: false,
  savedPresets: []
};

function retentionReducer(state, action) {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload,
        filteredData: action.payload
      };
    case 'SET_FILTERED_DATA':
      return {
        ...state,
        filteredData: action.payload
      };
    case 'SET_CHART_DATA':
      return {
        ...state,
        chartData: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SAVE_PRESET':
      return {
        ...state,
        savedPresets: [...state.savedPresets, action.payload]
      };
    default:
      return state;
  }
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
    throw new Error('useRetention must be used within RetentionProvider');
  }
  return context;
}