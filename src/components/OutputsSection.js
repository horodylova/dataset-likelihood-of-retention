'use client'

import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Chart, ChartTitle, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartSeries, ChartSeriesItem, ChartTooltip, ChartLegend } from '@progress/kendo-react-charts';
import { useState, useMemo, useEffect } from 'react';

export default function OutputsSection({ loading, retentionData = [], chartData }) {
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedLegendItems, setSelectedLegendItems] = useState(new Set());
  
  const categories = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'];

  const colors = [
    '#28a745', '#FF5E00', '#384C9E', '#dc3545', '#6f42c1', 
    '#fd7e14', '#20c997', '#e83e8c', '#6610f2', '#007bff',
    '#ffc107', '#17a2b8', '#343a40', '#6c757d', '#e91e63'
  ];

  console.log('OutputsSection render - retentionData:', retentionData);

  useEffect(() => {
    if (retentionData.length > 0) {
      const newSelected = new Set();
      retentionData.forEach(item => {
        newSelected.add(item.filter);
      });
      setSelectedLegendItems(newSelected);
    }
  }, [retentionData]);

  const prepareChartSeries = () => {
    if (selectedLegendItems.size === 0) return [];

    const series = [];
    
    retentionData.forEach((item, index) => {
      if (selectedLegendItems.has(item.filter)) {
        const data = categories.map((year, yearIndex) => ({
          year: year,
          rate: item[`year${yearIndex + 1}`] || 0
        }));

        series.push({
          name: item.filter,
          data: data,
          color: colors[index % colors.length]
        });
      }
    });

    return series;
  };

  const chartSeries = prepareChartSeries();

  const tooltipRender = (e) => {
    if (!e || !e.point || !e.point.dataItem) return '';
    const seriesName = e.point.series.name || 'Unknown';
    const value = e.point.dataItem.rate || 0;
    return `${seriesName}: ${value.toFixed(1)}%`;
  };

  const handleColumnClick = (columnField) => {
    setSelectedColumn(selectedColumn === columnField ? null : columnField);
  };

  const gridStyles = {
    '.k-grid .k-table-thead .k-table-th': {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontWeight: '600',
      fontSize: '13px',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      padding: '12px 8px',
      transition: 'all 0.3s ease'
    },
    '.k-grid .k-table-thead .k-table-th:hover': {
      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4c93 100%)',
      color: 'white',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)'
    },
    '.k-grid .k-table-thead .k-table-th.selected-column': {
      background: 'linear-gradient(135deg, #FF5E00 0%, #e55400 100%)',
      color: 'white',
      boxShadow: '0 2px 8px rgba(255, 94, 0, 0.4)'
    }
  };

  return (
    <>
      <style jsx>{`
        .outputs-grid :global(.k-grid .k-table-thead .k-table-th) {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          color: white !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          padding: 12px 8px !important;
          transition: all 0.3s ease !important;
        }
        
        .outputs-grid :global(.k-grid .k-table-thead .k-table-th:hover) {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4c93 100%) !important;
          color: white !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4) !important;
        }
        
        .outputs-grid :global(.k-grid .k-table-thead .k-table-th.selected-column) {
          background: linear-gradient(135deg, #FF5E00 0%, #e55400 100%) !important;
          color: white !important;
          box-shadow: 0 2px 8px rgba(255, 94, 0, 0.4) !important;
        }
        
        .outputs-grid :global(.k-grid .k-table-tbody .k-table-td.selected-column) {
          background-color: rgba(56, 76, 158, 0.1) !important;
          border-left: 3px solid #384C9E !important;
          border-right: 3px solid #384C9E !important;
        }
      `}</style>
      
      <div style={{ 
        width: '100%',
        height: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <h3 style={{ 
          margin: '0 0 20px 0',
          flexShrink: 0
        }}>Outputs</h3>
        
        {loading && (
          <div style={{ 
            marginBottom: '10px',
            flexShrink: 0
          }}>Loading data from Google Sheets...</div>
        )}
        
        <div style={{ 
          flexShrink: 0,
          marginBottom: '30px'
        }}>
          <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
            Data rows: {retentionData.length}
          </div>
          
          <div className="outputs-grid" style={{
            height: '200px',
            overflow: 'hidden'
          }}>
            <Grid 
              data={retentionData} 
              style={{ 
                width: '100%',
                height: '100%'
              }}
              scrollable={true}
            >
              <GridColumn 
                field="filter" 
                title="Filter" 
                width="200px"
                headerClassName={selectedColumn === 'filter' ? 'selected-column' : ''}
                className={selectedColumn === 'filter' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('filter')}
              />
              
              <GridColumn 
                field="year1" 
                title="Year 1" 
                width="100px"
                format="{0:n2}%" 
                headerClassName={selectedColumn === 'year1' ? 'selected-column' : ''}
                className={selectedColumn === 'year1' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year1')}
              />
              <GridColumn 
                field="year2" 
                title="Year 2" 
                width="100px"
                format="{0:n2}%" 
                headerClassName={selectedColumn === 'year2' ? 'selected-column' : ''}
                className={selectedColumn === 'year2' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year2')}
              />
              <GridColumn 
                field="year3" 
                title="Year 3" 
                width="100px"
                format="{0:n2}%" 
                headerClassName={selectedColumn === 'year3' ? 'selected-column' : ''}
                className={selectedColumn === 'year3' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year3')}
              />
              <GridColumn 
                field="year4" 
                title="Year 4" 
                width="100px"
                format="{0:n2}%" 
                headerClassName={selectedColumn === 'year4' ? 'selected-column' : ''}
                className={selectedColumn === 'year4' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year4')}
              />
              <GridColumn 
                field="year5" 
                title="Year 5" 
                width="100px"
                format="{0:n2}%" 
                headerClassName={selectedColumn === 'year5' ? 'selected-column' : ''}
                className={selectedColumn === 'year5' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year5')}
              />
              <GridColumn 
                field="year6" 
                title="Year 6" 
                width="100px"
                format="{0:n2}%" 
                headerClassName={selectedColumn === 'year6' ? 'selected-column' : ''}
                className={selectedColumn === 'year6' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year6')}
              />
              <GridColumn 
                field="year7" 
                title="Year 7" 
                width="100px"
                format="{0:n2}%" 
                headerClassName={selectedColumn === 'year7' ? 'selected-column' : ''}
                className={selectedColumn === 'year7' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year7')}
              />
              <GridColumn 
                field="year8" 
                title="Year 8" 
                width="100px"
                format="{0:n2}%" 
                headerClassName={selectedColumn === 'year8' ? 'selected-column' : ''}
                className={selectedColumn === 'year8' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year8')}
              />
              <GridColumn 
                field="year9" 
                title="Year 9" 
                width="100px"
                format="{0:n2}%" 
                headerClassName={selectedColumn === 'year9' ? 'selected-column' : ''}
                className={selectedColumn === 'year9' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year9')}
              />
              <GridColumn 
                field="year10" 
                title="Year 10" 
                width="100px"
                format="{0:n2}%" 
                headerClassName={selectedColumn === 'year10' ? 'selected-column' : ''}
                className={selectedColumn === 'year10' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year10')}
              />
            </Grid>
          </div>
        </div>
        
        <div style={{ 
          flex: 1,
          minHeight: '300px',
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h4 style={{ 
            margin: '0 0 10px 0',
            flexShrink: 0
          }}>Retention Rate Chart</h4>
          <div style={{ 
            flex: 1,
            minHeight: 0,
            width: '100%'
          }}>
            <Chart 
              style={{ 
                height: '100%',
                width: '100%'
              }}
            >
              <ChartLegend 
                position="top" 
                orientation="horizontal"
                align="center"
              />
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={categories} />
              </ChartCategoryAxis>
              <ChartValueAxis>
                <ChartValueAxisItem 
                  title={{ text: 'Retention Rate (%)' }}
                  min={0}
                  max={100}
                />
              </ChartValueAxis>
              <ChartSeries>
                {chartSeries.map((series, index) => (
                  <ChartSeriesItem
                    key={series.name}
                    type="line"
                    data={series.data}
                    field="rate"
                    categoryField="year"
                    name={series.name}
                    color={series.color}
                    markers={{ visible: true }}
                  />
                ))}
              </ChartSeries>
              <ChartTooltip render={tooltipRender} />
            </Chart>
          </div>
        </div>
      </div>
    </>
  );
}