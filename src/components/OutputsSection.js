'use client'

import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Chart, ChartTitle, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';
import { useState } from 'react';
import Legend from './Legend';

export default function OutputsSection({ loading, retentionData = [], chartData }) {
  const [selectedColumn, setSelectedColumn] = useState(null);
  const categories = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'];

  console.log('OutputsSection render - retentionData:', retentionData);

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
        
        <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
          Data rows: {retentionData.length}
        </div>
        
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
              field="filter" 
              title="Filter" 
              headerClassName={selectedColumn === 'filter' ? 'selected-column' : ''}
              className={selectedColumn === 'filter' ? 'selected-column' : ''}
              onHeaderClick={() => handleColumnClick('filter')}
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
        flex: 1,
        minHeight: '300px',
        marginTop: '20px'
      }}>
        <h4 style={{ 
          margin: '0 0 10px 0'
        }}>Retention Rate Chart</h4>
        <Chart style={{ height: '100%' }}>
          <ChartTitle text="Retention Rates by Year" />
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={categories} />
          </ChartCategoryAxis>
          <ChartValueAxis>
            <ChartValueAxisItem />
          </ChartValueAxis>
          <ChartSeries>
            <ChartSeriesItem 
              type="line" 
              data={chartData || []} 
              field="rate"
              categoryField="year"
            />
          </ChartSeries>
        </Chart>
      </div>
    </div>
  );
}
