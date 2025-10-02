import React from 'react';
import { Chart, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartSeries, ChartSeriesItem, ChartTooltip, ChartLegend } from '@progress/kendo-react-charts';

function OutputsChart({ series, categories, tooltipRender }) {
  return (
    <Chart style={{ height: '100%', width: '100%' }}>
      <ChartLegend position="top" orientation="horizontal" align="center" />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem categories={categories} />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem title={{ text: 'Retention Rate (%)' }} min={0} max={100} />
      </ChartValueAxis>
      <ChartSeries>
        {series.map((s) => (
          <ChartSeriesItem
            key={s.name}
            type="line"
            data={s.data}
            field="rate"
            categoryField="year"
            name={s.name}
            color={s.color}
            markers={{ visible: true }}
          />
        ))}
      </ChartSeries>
      <ChartTooltip render={tooltipRender} />
    </Chart>
  );
}

export default React.memo(OutputsChart);