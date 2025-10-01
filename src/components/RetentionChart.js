'use client';

import { Chart, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartSeries, ChartSeriesItem, ChartTooltip } from '@progress/kendo-react-charts';
import { useState, useEffect } from 'react';
import { calculateRetentionByGender, calculateRetentionByVeteran } from '@/lib/filterUtils';
import { useRetention } from '@/contexts/RetentionContext';

export default function RetentionChart({ processedData }) {
  const [showMale, setShowMale] = useState(true);
  const [showFemale, setShowFemale] = useState(true);
  const [showVeteranYes, setShowVeteranYes] = useState(true);
  const [showVeteranNo, setShowVeteranNo] = useState(true);
  
  const { state } = useRetention();
  const { rawData } = state;

  const categories = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'];

  const prepareChartData = () => {
    if (!processedData || !rawData) return [];

    const series = [];
    
    try {
      const genderData = calculateRetentionByGender(processedData, rawData);
      const veteranData = calculateRetentionByVeteran(processedData, rawData);

      if (showMale && genderData.Male) {
        const maleData = categories.map(year => ({
          year: year,
          rate: genderData.Male[year]?.rate || 0
        }));
        series.push({
          name: 'Male',
          data: maleData,
          color: '#007bff'
        });
      }

      if (showFemale && genderData.Female) {
        const femaleData = categories.map(year => ({
          year: year,
          rate: genderData.Female[year]?.rate || 0
        }));
        series.push({
          name: 'Female',
          data: femaleData,
          color: '#e83e8c'
        });
      }

      if (showVeteranYes && veteranData.Yes) {
        const veteranYesData = categories.map(year => ({
          year: year,
          rate: veteranData.Yes[year]?.rate || 0
        }));
        series.push({
          name: 'Veteran: Yes',
          data: veteranYesData,
          color: '#28a745'
        });
      }

      if (showVeteranNo && veteranData.No) {
        const veteranNoData = categories.map(year => ({
          year: year,
          rate: veteranData.No[year]?.rate || 0
        }));
        series.push({
          name: 'Veteran: No',
          data: veteranNoData,
          color: '#dc3545'
        });
      }
    } catch (error) {
      console.error('Error preparing chart data:', error);
    }

    return series;
  };

  const chartSeries = prepareChartData();

  // Безопасный тултип: учитывает отсутствующую серию/значение
  const tooltipRender = (e) => {
      const seriesName = e?.series?.name ?? '';
      const value = typeof e?.value === 'number' ? e.value : 0;
      return seriesName ? `${seriesName}: ${value.toFixed(1)}%` : `${value.toFixed(1)}%`;
  };
  
  return (
      <div style={{ marginTop: '30px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px', 
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <h4 style={{ margin: 0 }}>Retention Analysis Chart</h4>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontWeight: 'bold' }}>Gender:</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input
                  type="checkbox"
                  checked={showMale}
                  onChange={(e) => setShowMale(e.target.checked)}
                />
                Male
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input
                  type="checkbox"
                  checked={showFemale}
                  onChange={(e) => setShowFemale(e.target.checked)}
                />
                Female
              </label>
            </div>
  
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontWeight: 'bold' }}>Veteran:</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input
                  type="checkbox"
                  checked={showVeteranYes}
                  onChange={(e) => setShowVeteranYes(e.target.checked)}
                />
                Yes
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input
                  type="checkbox"
                  checked={showVeteranNo}
                  onChange={(e) => setShowVeteranNo(e.target.checked)}
                />
                No
              </label>
            </div>
          </div>
  
          <div style={{ height: '400px', width: '100%' }}>
              <Chart style={{ height: '100%' }}>
                  <ChartCategoryAxis>
                      <ChartCategoryAxisItem categories={categories} />
                  </ChartCategoryAxis>
                  <ChartValueAxis>
                      <ChartValueAxisItem title={{ text: 'Retention Rate (%)' }} min={0} max={100} />
                  </ChartValueAxis>
                  <ChartSeries>
                      {Array.isArray(chartSeries) && chartSeries
                          .filter(s => s && s.name && Array.isArray(s.data))
                          .map((series, index) => (
                              <ChartSeriesItem
                                  key={series.name || `series-${index}`}
                                  type="line"
                                  data={series.data}
                                  field="rate"
                                  categoryField="year"
                                  name={series.name || `Series ${index + 1}`}
                                  color={series.color}
                                  markers={{ visible: true }}
                              />
                          ))}
                  </ChartSeries>
                  <ChartTooltip render={tooltipRender} />
              </Chart>
          </div>
      </div>
  );
}