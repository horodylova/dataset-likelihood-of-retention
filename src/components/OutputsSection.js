'use client'

import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Chart, ChartTitle, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';
import { useState } from 'react';
import Legend from './Legend';

export default function OutputsSection({ loading, retentionData, chartData }) {
  const [selectedColumn, setSelectedColumn] = useState(null);
  const emptyData = [];
  const categories = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'];

  const handleColumnClick = (columnField) => {
    setSelectedColumn(selectedColumn === columnField ? null : columnField);
  };

  return (
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
        <h4 style={{ 
          margin: '0 0 10px 0'
        }}>Retention by Population</h4>
        <div style={{
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
              field="population" 
              title="Population" 
              headerClassName={selectedColumn === 'population' ? 'selected-column' : ''}
              className={selectedColumn === 'population' ? 'selected-column' : ''}
              onHeaderClick={() => handleColumnClick('population')}
            />
            <GridColumn 
              field="count" 
              title="Count" 
              headerClassName={selectedColumn === 'count' ? 'selected-column' : ''}
              className={selectedColumn === 'count' ? 'selected-column' : ''}
              onHeaderClick={() => handleColumnClick('count')}
            />
            <GridColumn 
              field="year1" 
              title="Year 1" 
              format="{0:n2}%" 
              headerClassName={selectedColumn === 'year1' ? 'selected-column' : ''}
              className={selectedColumn === 'year1' ? 'selected-column' : ''}
              onHeaderClick={() => handleColumnClick('year1')}
            />
            <GridColumn 
              field="year2" 
              title="Year 2" 
              format="{0:n2}%" 
              headerClassName={selectedColumn === 'year2' ? 'selected-column' : ''}
              className={selectedColumn === 'year2' ? 'selected-column' : ''}
              onHeaderClick={() => handleColumnClick('year2')}
            />
            <GridColumn 
              field="year3" 
              title="Year 3" 
              format="{0:n2}%" 
              headerClassName={selectedColumn === 'year3' ? 'selected-column' : ''}
              className={selectedColumn === 'year3' ? 'selected-column' : ''}
              onHeaderClick={() => handleColumnClick('year3')}
            />
            <GridColumn 
              field="year4" 
              title="Year 4" 
              format="{0:n2}%" 
              headerClassName={selectedColumn === 'year4' ? 'selected-column' : ''}
              className={selectedColumn === 'year4' ? 'selected-column' : ''}
              onHeaderClick={() => handleColumnClick('year4')}
            />
            <GridColumn 
              field="year5" 
              title="Year 5" 
              format="{0:n2}%" 
              headerClassName={selectedColumn === 'year5' ? 'selected-column' : ''}
              className={selectedColumn === 'year5' ? 'selected-column' : ''}
              onHeaderClick={() => handleColumnClick('year5')}
            />
            <GridColumn 
              field="year6" 
              title="Year 6" 
              format="{0:n2}%" 
              headerClassName={selectedColumn === 'year6' ? 'selected-column' : ''}
              className={selectedColumn === 'year6' ? 'selected-column' : ''}
              onHeaderClick={() => handleColumnClick('year6')}
            />
            <GridColumn 
              field="year7" 
              title="Year 7" 
              format="{0:n2}%" 
              headerClassName={selectedColumn === 'year7' ? 'selected-column' : ''}
              className={selectedColumn === 'year7' ? 'selected-column' : ''}
              onHeaderClick={() => handleColumnClick('year7')}
            />
            <GridColumn 
              field="year8" 
              title="Year 8" 
              format="{0:n2}%" 
              headerClassName={selectedColumn === 'year8' ? 'selected-column' : ''}
              className={selectedColumn === 'year8' ? 'selected-column' : ''}
              onHeaderClick={() => handleColumnClick('year8')}
            />
            <GridColumn 
              field="year9" 
              title="Year 9" 
              format="{0:n2}%" 
              headerClassName={selectedColumn === 'year9' ? 'selected-column' : ''}
              className={selectedColumn === 'year9' ? 'selected-column' : ''}
              onHeaderClick={() => handleColumnClick('year9')}
            />
            <GridColumn 
              field="year10" 
              title="Year 10" 
              format="{0:n2}%" 
              headerClassName={selectedColumn === 'year10' ? 'selected-column' : ''}
              className={selectedColumn === 'year10' ? 'selected-column' : ''}
              onHeaderClick={() => handleColumnClick('year10')}
            />
          </Grid>
        </div>
      </div>
      
      <Legend />
      
      <div style={{
        flex: '1',
        minHeight: '0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h4 style={{ 
          margin: '0 0 10px 0',
          flexShrink: 0
        }}>Retention by Year</h4>
        <div style={{
          flex: '1',
          minHeight: '300px',
          overflow: 'hidden',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          backgroundColor: '#ffffff'
        }}>
          <Chart style={{ 
            width: '100%',
            height: '100%'
          }}>
            <ChartTitle text="" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem 
                categories={categories}
                labels={{
                  font: '11px Arial, sans-serif',
                  color: '#666666',
                  rotation: -45
                }}
                line={{
                  color: '#e9ecef',
                  width: 1
                }}
                majorGridLines={{
                  color: '#f8f9fa',
                  width: 1
                }}
              />
            </ChartCategoryAxis>
            <ChartValueAxis>
              <ChartValueAxisItem 
                min={0} 
                max={100}
                labels={{
                  font: '11px Arial, sans-serif',
                  color: '#666666',
                  format: '{0}%'
                }}
                line={{
                  color: '#e9ecef',
                  width: 1
                }}
                majorGridLines={{
                  color: '#f8f9fa',
                  width: 1
                }}
              />
            </ChartValueAxis>
            <ChartSeries>
              <ChartSeriesItem 
                type="line" 
                data={emptyData} 
                color="#28a745"
                width={2}
                markers={{
                  visible: true,
                  size: 4
                }}
              />
              <ChartSeriesItem 
                type="line" 
                data={emptyData} 
                color="#FF5E00"
                width={2}
                markers={{
                  visible: true,
                  size: 4
                }}
              />
              <ChartSeriesItem 
                type="line" 
                data={emptyData} 
                color="#384C9E"
                width={2}
                markers={{
                  visible: true,
                  size: 4
                }}
              />
              <ChartSeriesItem 
                type="line" 
                data={emptyData} 
                color="#dc3545"
                width={2}
                markers={{
                  visible: true,
                  size: 4
                }}
              />
            </ChartSeries>
          </Chart>
        </div>
      </div>
    </div>
  );
}