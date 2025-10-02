import React from 'react';
import dynamic from 'next/dynamic';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Chart, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartSeries, ChartSeriesItem, ChartTooltip, ChartLegend } from '@progress/kendo-react-charts';
import { makeYearCell } from './utils';

const PDFExport = dynamic(() => import('@progress/kendo-react-pdf').then(m => m.PDFExport), { ssr: false });

const OutputsPDF = React.forwardRef(function OutputsPDF({ count, expandedData, chartSeries, categories, tooltipRender }, ref) {
  return (
    <div style={{ position: 'absolute', left: '-10000px', top: 0, width: '1200px' }}>
      <PDFExport
        ref={ref}
        paperSize="A3"
        landscape={true}
        margin={{ top: '15mm', left: '10mm', right: '10mm', bottom: '15mm' }}
        fileName={`Retention-Outputs.pdf`}
        scale={0.75}
      >
        <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#000' }}>
          Output: {count} rows
        </div>
        <style>
          {`
            .pdf-grid .k-grid .k-table-thead .k-table-th {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
              color: white !important;
              font-weight: 600 !important;
              font-size: 12px !important;
              padding: 10px 8px !important;
              border: 1px solid rgba(255, 255, 255, 0.3) !important;
            }
            .pdf-grid .k-grid .k-table-tbody .k-table-td {
              padding: 8px !important;
              font-size: 11px !important;
              border: 1px solid #ddd !important;
            }
            .pdf-grid .k-grid {
              border: 1px solid #ddd !important;
            }
            .pdf-grid .k-grid .k-table-tbody tr:nth-child(3n) .k-table-td {
              border-bottom-width: 3px !important;
              border-bottom-color: #000 !important;
            }
          `}
        </style>
        <div className="pdf-grid" style={{ width: 'fit-content', marginBottom: '30px' }}>
          <Grid data={expandedData} style={{ width: 'auto' }} scrollable={false}>
            <GridColumn field="filter" title="Filter" width="180px" />
            <GridColumn field="year1" title="Year 1" width="85px" cell={makeYearCell('year1')} />
            <GridColumn field="year2" title="Year 2" width="85px" cell={makeYearCell('year2')} />
            <GridColumn field="year3" title="Year 3" width="85px" cell={makeYearCell('year3')} />
            <GridColumn field="year4" title="Year 4" width="85px" cell={makeYearCell('year4')} />
            <GridColumn field="year5" title="Year 5" width="85px" cell={makeYearCell('year5')} />
            <GridColumn field="year6" title="Year 6" width="85px" cell={makeYearCell('year6')} />
            <GridColumn field="year7" title="Year 7" width="85px" cell={makeYearCell('year7')} />
            <GridColumn field="year8" title="Year 8" width="85px" cell={makeYearCell('year8')} />
            <GridColumn field="year9" title="Year 9" width="85px" cell={makeYearCell('year9')} />
            <GridColumn field="year10" title="Year 10" width="85px" cell={makeYearCell('year10')} />
          </Grid>
        </div>
        <div style={{ width: '100%', height: '400px', pageBreakBefore: 'auto' }}>
          <Chart style={{ height: '100%', width: '100%' }}>
            <ChartLegend position="top" orientation="horizontal" align="center" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={categories} />
            </ChartCategoryAxis>
            <ChartValueAxis>
              <ChartValueAxisItem title={{ text: 'Retention Rate (%)' }} min={0} max={100} />
            </ChartValueAxis>
            <ChartSeries>
              {chartSeries.map((series) => (
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
      </PDFExport>
    </div>
  );
});

export default React.memo(OutputsPDF);