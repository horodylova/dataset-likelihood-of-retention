'use client'

import { Checkbox } from '@progress/kendo-react-inputs';
import { useState, useEffect, useCallback } from 'react';
import { useRetention } from '@/contexts/RetentionContext';
import { calculateRetentionByVisualImpairment, calculateRetentionByHearing, calculateRetentionByAlzheimer, calculateRetentionByHIV, calculateRetentionByPhysicalMedical, calculateRetentionByMentalHealth, calculateRetentionByPhysicalMobility, calculateRetentionByAlcoholAbuse } from '@/lib/filterUtils';
import FilterCard from './FilterCard';

export default function DisabilitiesSection({ onVisualFilterChange, onHearingFilterChange, onAlzheimerFilterChange, onHIVFilterChange, onPhysicalMedicalFilterChange, onMentalHealthFilterChange, onPhysicalMobilityFilterChange, onAlcoholAbuseFilterChange, mode = 'single', onMultiSelectionChange, resetSignal }) {
  const [visualFilters, setVisualFilters] = useState({ yes: false, no: false });
  const [hearingFilters, setHearingFilters] = useState({ yes: false, no: false });
  const [alzFilters, setAlzFilters] = useState({ yes: false, no: false });
  const [hivFilters, setHivFilters] = useState({ yes: false, no: false });
  const [pmFilters, setPmFilters] = useState({ yes: false, no: false });
  const [mhFilters, setMhFilters] = useState({ yes: false, no: false });
  const [pmobFilters, setPmobFilters] = useState({ yes: false, no: false });
  const [alcoholFilters, setAlcoholFilters] = useState({ yes: false, no: false });
  const [visualTotal, setVisualTotal] = useState(false);
  const [hearingTotal, setHearingTotal] = useState(false);
  const [alzTotal, setAlzTotal] = useState(false);
  const [hivTotal, setHivTotal] = useState(false);
  const [pmTotal, setPmTotal] = useState(false);
  const [mhTotal, setMhTotal] = useState(false);
  const [pmobTotal, setPmobTotal] = useState(false);
  const [alcoholTotal, setAlcoholTotal] = useState(false);

  const { state } = useRetention();
  const { processedData, rawData } = state;

  const makeHandler = (setter) => (type, checked) => setter(prev => ({ ...prev, [type]: checked }));

  const handleVisual = useCallback(makeHandler(setVisualFilters), []);
  const handleHearing = useCallback(makeHandler(setHearingFilters), []);
  const handleAlz = useCallback(makeHandler(setAlzFilters), []);
  const handleHiv = useCallback(makeHandler(setHivFilters), []);
  const handlePm = useCallback(makeHandler(setPmFilters), []);
  const handleMh = useCallback(makeHandler(setMhFilters), []);
  const handlePmob = useCallback(makeHandler(setPmobFilters), []);
  const handleAlcohol = useCallback(makeHandler(setAlcoholFilters), []);

  useEffect(() => {
    if (!processedData || !rawData) return;
    const data = calculateRetentionByVisualImpairment(processedData, rawData);

    if (mode === 'multi') {
      const values = [];
      if (visualFilters.yes) values.push('Yes');
      if (visualFilters.no) values.push('No');
      if (onMultiSelectionChange) onMultiSelectionChange('Visual', { combined: !!visualTotal, values });
      return;
    }

    if (!onVisualFilterChange) return;
    if (visualTotal) {
      onVisualFilterChange('combined', data.combined);
    }
    if (visualFilters.yes) {
      onVisualFilterChange('Yes', data.Yes);
    }
    if (visualFilters.no) {
      onVisualFilterChange('No', data.No);
    }
  }, [visualTotal, visualFilters, processedData, rawData, mode, onMultiSelectionChange]);

  useEffect(() => {
    if (!processedData || !rawData) return;
    const data = calculateRetentionByHearing(processedData, rawData);

    if (mode === 'multi') {
      const values = [];
      if (hearingFilters.yes) values.push('Yes');
      if (hearingFilters.no) values.push('No');
      if (onMultiSelectionChange) onMultiSelectionChange('Hearing', { combined: !!hearingTotal, values });
      return;
    }

    if (!onHearingFilterChange) return;
    if (hearingTotal) {
      onHearingFilterChange('combined', data.combined);
    }
    if (hearingFilters.yes) {
      onHearingFilterChange('Yes', data.Yes);
    }
    if (hearingFilters.no) {
      onHearingFilterChange('No', data.No);
    }
  }, [hearingTotal, hearingFilters, processedData, rawData, mode, onMultiSelectionChange]);

  useEffect(() => {
    if (!processedData || !rawData || !onAlzheimerFilterChange) return;
    const data = calculateRetentionByAlzheimer(processedData, rawData);

    if (mode === 'multi') {
      const values = [];
      if (alzFilters.yes) values.push('Yes');
      if (alzFilters.no) values.push('No');
      if (onMultiSelectionChange) onMultiSelectionChange("Alzheimer's / Dementia", { combined: !!alzTotal, values });
      return;
    }

    if (alzTotal) {
      onAlzheimerFilterChange('combined', data.combined);
    }
    if (alzFilters.yes) {
      onAlzheimerFilterChange('Yes', data.Yes);
    }
    if (alzFilters.no) {
      onAlzheimerFilterChange('No', data.No);
    }
  }, [alzTotal, alzFilters, processedData, rawData, mode, onMultiSelectionChange]);

  useEffect(() => {
    if (!processedData || !rawData || !onHIVFilterChange) return;
    const data = calculateRetentionByHIV(processedData, rawData);

    if (mode === 'multi') {
      const values = [];
      if (hivFilters.yes) values.push('Yes');
      if (hivFilters.no) values.push('No');
      if (onMultiSelectionChange) onMultiSelectionChange('HIV / AIDS', { combined: !!hivTotal, values });
      return;
    }

    if (hivTotal) {
      onHIVFilterChange('combined', data.combined);
    }
    if (hivFilters.yes) {
      onHIVFilterChange('Yes', data.Yes);
    }
    if (hivFilters.no) {
      onHIVFilterChange('No', data.No);
    }
  }, [hivTotal, hivFilters, processedData, rawData, mode, onMultiSelectionChange]);

  useEffect(() => {
    if (!processedData || !rawData || !onPhysicalMedicalFilterChange) return;
    const data = calculateRetentionByPhysicalMedical(processedData, rawData);

    if (mode === 'multi') {
      const values = [];
      if (pmFilters.yes) values.push('Yes');
      if (pmFilters.no) values.push('No');
      if (onMultiSelectionChange) onMultiSelectionChange('Physical / Medical', { combined: !!pmTotal, values });
      return;
    }

    if (pmTotal) {
      onPhysicalMedicalFilterChange('combined', data.combined);
    }
    if (pmFilters.yes) {
      onPhysicalMedicalFilterChange('Yes', data.Yes);
    }
    if (pmFilters.no) {
      onPhysicalMedicalFilterChange('No', data.No);
    }
  }, [pmTotal, pmFilters, processedData, rawData, mode, onMultiSelectionChange]);

  useEffect(() => {
    if (!processedData || !rawData || !onMentalHealthFilterChange) return;
    const data = calculateRetentionByMentalHealth(processedData, rawData);

    if (mode === 'multi') {
      const values = [];
      if (mhFilters.yes) values.push('Yes');
      if (mhFilters.no) values.push('No');
      if (onMultiSelectionChange) onMultiSelectionChange('Mental Health', { combined: !!mhTotal, values });
      return;
    }

    if (mhTotal) {
      onMentalHealthFilterChange('combined', data.combined);
    }
    if (mhFilters.yes) {
      onMentalHealthFilterChange('Yes', data.Yes);
    }
    if (mhFilters.no) {
      onMentalHealthFilterChange('No', data.No);
    }
  }, [mhTotal, mhFilters, processedData, rawData, mode, onMultiSelectionChange]);

  useEffect(() => {
    if (!processedData || !rawData || !onPhysicalMobilityFilterChange) return;
    const data = calculateRetentionByPhysicalMobility(processedData, rawData);

    if (mode === 'multi') {
      const values = [];
      if (pmobFilters.yes) values.push('Yes');
      if (pmobFilters.no) values.push('No');
      if (onMultiSelectionChange) onMultiSelectionChange('Physical / Mobility', { combined: !!pmobTotal, values });
      return;
    }

    if (pmobTotal) {
      onPhysicalMobilityFilterChange('combined', data.combined);
    }
    if (pmobFilters.yes) {
      onPhysicalMobilityFilterChange('Yes', data.Yes);
    }
    if (pmobFilters.no) {
      onPhysicalMobilityFilterChange('No', data.No);
    }
  }, [pmobTotal, pmobFilters, processedData, rawData, mode, onMultiSelectionChange]);

  useEffect(() => {
    if (!processedData || !rawData || !onAlcoholAbuseFilterChange) return;
    const data = calculateRetentionByAlcoholAbuse(processedData, rawData);

    if (mode === 'multi') {
      const values = [];
      if (alcoholFilters.yes) values.push('Yes');
      if (alcoholFilters.no) values.push('No');
      if (onMultiSelectionChange) onMultiSelectionChange('Alcohol Abuse', { combined: !!alcoholTotal, values });
      return;
    }

    if (alcoholTotal) {
      onAlcoholAbuseFilterChange('combined', data.combined);
    }
    if (alcoholFilters.yes) {
      onAlcoholAbuseFilterChange('Yes', data.Yes);
    }
    if (alcoholFilters.no) {
      onAlcoholAbuseFilterChange('No', data.No);
    }
  }, [alcoholTotal, alcoholFilters, processedData, rawData, mode, onMultiSelectionChange]);

  useEffect(() => {
    if (resetSignal == null) return;
    setVisualFilters({ yes: false, no: false });
    setHearingFilters({ yes: false, no: false });
    setAlzFilters({ yes: false, no: false });
    setHivFilters({ yes: false, no: false });
    setPmFilters({ yes: false, no: false });
    setMhFilters({ yes: false, no: false });
    setPmobFilters({ yes: false, no: false });
    setAlcoholFilters({ yes: false, no: false });
    setVisualTotal(false);
    setHearingTotal(false);
    setAlzTotal(false);
    setHivTotal(false);
    setPmTotal(false);
    setMhTotal(false);
    setPmobTotal(false);
    setAlcoholTotal(false);
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
      <FilterCard title="Visual" headerChecked={visualTotal} headerOnChange={(e) => setVisualTotal(e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={visualFilters.yes} onChange={(e) => handleVisual('yes', e.value)} />
          <Checkbox label="No" checked={visualFilters.no} onChange={(e) => handleVisual('no', e.value)} />
        </div>
      </FilterCard>
      
      <FilterCard title="Hearing" headerChecked={hearingTotal} headerOnChange={(e) => setHearingTotal(e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={hearingFilters.yes} onChange={(e) => handleHearing('yes', e.value)} />
          <Checkbox label="No" checked={hearingFilters.no} onChange={(e) => handleHearing('no', e.value)} />
        </div>
      </FilterCard>
      
      <FilterCard title="Alzheimer / Dementia" headerChecked={alzTotal} headerOnChange={(e) => setAlzTotal(e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={alzFilters.yes} onChange={(e) => handleAlz('yes', e.value)} />
          <Checkbox label="No" checked={alzFilters.no} onChange={(e) => handleAlz('no', e.value)} />
        </div>
      </FilterCard>
      
      <FilterCard title="HIV / AIDS" headerChecked={hivTotal} headerOnChange={(e) => setHivTotal(e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={hivFilters.yes} onChange={(e) => handleHiv('yes', e.value)} />
          <Checkbox label="No" checked={hivFilters.no} onChange={(e) => handleHiv('no', e.value)} />
        </div>
      </FilterCard>
      
      <FilterCard title="Physical / Medical" headerChecked={pmTotal} headerOnChange={(e) => setPmTotal(e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={pmFilters.yes} onChange={(e) => handlePm('yes', e.value)} />
          <Checkbox label="No" checked={pmFilters.no} onChange={(e) => handlePm('no', e.value)} />
        </div>
      </FilterCard>
      
      <FilterCard title="Mental Health" headerChecked={mhTotal} headerOnChange={(e) => setMhTotal(e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={mhFilters.yes} onChange={(e) => handleMh('yes', e.value)} />
          <Checkbox label="No" checked={mhFilters.no} onChange={(e) => handleMh('no', e.value)} />
        </div>
      </FilterCard>
      
      <FilterCard title="Physical / Mobility" headerChecked={pmobTotal} headerOnChange={(e) => setPmobTotal(e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={pmobFilters.yes} onChange={(e) => handlePmob('yes', e.value)} />
          <Checkbox label="No" checked={pmobFilters.no} onChange={(e) => handlePmob('no', e.value)} />
        </div>
      </FilterCard>
      
      <FilterCard title="Alcohol Abuse" headerChecked={alcoholTotal} headerOnChange={(e) => setAlcoholTotal(e.value)}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Checkbox label="Yes" checked={alcoholFilters.yes} onChange={(e) => handleAlcohol('yes', e.value)} />
          <Checkbox label="No" checked={alcoholFilters.no} onChange={(e) => handleAlcohol('no', e.value)} />
        </div>
      </FilterCard>
    </div>
  );
}