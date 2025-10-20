'use client'

import React, { useState, useEffect } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Chart, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartSeries, ChartSeriesItem, ChartTooltip, ChartLegend } from '@progress/kendo-react-charts';
import { Button } from '@progress/kendo-react-buttons';
import dynamic from 'next/dynamic';

const PDFExport = dynamic(() => import('@progress/kendo-react-pdf').then(m => m.PDFExport), { ssr: false });

function OutputsSection({ loading, retentionData = [], chartData, refreshKey = 0, onClearOutputs }) {
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedLegendItems, setSelectedLegendItems] = useState(new Set());
  const [chartSeries, setChartSeries] = useState([]);


  const pdfExportRef = React.useRef(null);
  const gridWrapperRef = React.useRef(null);

  const expandedData = React.useMemo(() => {
    if (!Array.isArray(retentionData)) return [];
    
    const makeYearFieldsFromRetention = (ret, field) => {
      const out = {};
      for (let i = 0; i <= 9; i++) {
        const yearIndex = i + 1;
        const v = ret?.[`Year ${yearIndex}`]?.[field];
        out[`year${i}`] = Number(v || 0);
      }
      return out;
    };

    const makeEligibleAbsoluteFields = (ret) => {
      const out = {};
      for (let i = 0; i <= 9; i++) {
        const yearIndex = i + 1;
        const eligible = Number(ret?.[`Year ${yearIndex}`]?.eligible || 0);
        out[`year${i}`] = eligible;
      }
      return out;
    };

    return retentionData.flatMap(row => {
      const ret = row?._retention || null;

      const percentYearFields = {};
      for (let i = 0; i <= 9; i++) {
        const yearIndex = i + 1;
        const retentionData = ret?.[`Year ${yearIndex}`];
        if (retentionData && retentionData.eligible > 0) {
          const rate = (retentionData.retained / retentionData.eligible) * 100;
          percentYearFields[`year${i}`] = `${rate.toFixed(2)}%`;
        } else {
          percentYearFields[`year${i}`] = '';
        }
      }

      const baseCount = ret ? Number(ret['Year 0']?.eligible || 0) : 0;

       
      const percentRow = {
        filter: `${row.filter} — Percent`,
        count: baseCount,
        ...percentYearFields
      };

      const eligibleRow = {
        filter: `${row.filter} — Eligible`,
        count: '',  
        ...(ret
          ? makeEligibleAbsoluteFields(ret)
          : Array.from({ length: 10 }, (_, i) => ({ [`year${i}`]: 0 }))
              .reduce((acc, curr) => ({ ...acc, ...curr }), {})
        )
      };

      const retainedRow = {
        filter: `${row.filter} — Retained`,
        count: '',  
        ...(ret
          ? makeYearFieldsFromRetention(ret, 'retained')
          : Array.from({ length: 10 }, (_, i) => ({ [`year${i}`]: 0 }))
              .reduce((acc, curr) => ({ ...acc, ...curr }), {})
        )
      };

      return [percentRow, eligibleRow, retainedRow];
    });
  }, [retentionData]);

  // Разбиваем данные на страницы по 18 строк (6 сетов × 3 строки)
  const pdfPages = React.useMemo(() => {
    const pages = [];
    const rowsPerPage = 18; // 6 сетов × 3 строки = 18 строк на страницу
    
    for (let i = 0; i < expandedData.length; i += rowsPerPage) {
      pages.push(expandedData.slice(i, i + rowsPerPage));
    }
    
    return pages;
  }, [expandedData]);


  const makeYearCell = (field) => {
    const YearCell = (props) => {
      const { dataItem, className, style } = props;
      const isPercentRow = (dataItem?.filter || '').includes('— Percent');
      const raw = dataItem?.[field];

      if (isPercentRow) {
        const num = Number(raw);
        const display = Number.isFinite(num)
          ? `${num.toFixed(2)}%`
          : (typeof raw === 'string' ? raw : '');
        return (
          <td className={className} style={style}>
            {display}
          </td>
        );
      }

      const v = Number(raw || 0);
      return (
        <td className={className} style={style}>
          {v}
        </td>
      );
    };
    YearCell.displayName = `YearCell_${field}`;
    return YearCell;
  };
 
  const CountCell = (props) => {
    const { dataItem, className, style } = props;
    const raw = dataItem?.count;
    const v = Number(raw || 0);
    return <td className={className} style={style}>{v > 0 ? v : ''}</td>;
  };
  CountCell.displayName = 'CountCell';
  const handleColumnClick = (column) => {
    setSelectedColumn(prev => (prev === column ? null : column));
  };

  // Убрано: const [isMobile, setIsMobile] = useState(false);
  // Убрано: useEffect с window.addEventListener('resize', ...)

  const categories = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'];
  const uiCategoriesShort = ['Y 1', 'Y 2', 'Y 3', 'Y 4', 'Y 5', 'Y 6', 'Y 7', 'Y 8', 'Y 9', 'Y 10'];
  const colors = [
    '#28a745', '#FF5E00', '#384C9E', '#dc3545', '#6f42c1',
    '#fd7e14', '#20c997', '#e83e8c', '#6610f2', '#007bff',
    '#ffc107', '#17a2b8', '#343a40', '#6c757d', '#e91e63'
  ];
  const valueAxisMax = 110;
  const valueAxisMin = -10;

  // --- Минимальная правка: короткие подписи на мобильных через labels.content ---
  const formatCategoryLabel = (value) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 640) {
      const m = /^Year\s*(\d+)/.exec(value);
      return m ? `Y${m[1]}` : value;
    }
    return value;
  };
  // --- конец минимальной правки ---

  useEffect(() => {
    if (retentionData && retentionData.length > 0) {
      const newSelected = new Set();
      retentionData.forEach(item => {
        if (item && item.filter) newSelected.add(item.filter);
      });
      setSelectedLegendItems(newSelected);
    } else {
      setSelectedLegendItems(new Set());
    }
  }, [retentionData]);

  const prepareChartSeries = () => {
    if (!retentionData || retentionData.length === 0) return [];
    if (selectedLegendItems.size === 0) return [];

    const series = [];
    retentionData.forEach((item, index) => {
      if (!item || !item.filter) return;
      if (!selectedLegendItems.has(item.filter)) return;

      const data = categories.map((year, yearIndex) => ({
        year,
        rate: item[`year${yearIndex}`] || 0
      }));

      series.push({
        name: item.filter,
        data,
        color: colors[index % colors.length]
      });
    });
    return series;
  };

  useEffect(() => {
    if (!retentionData || retentionData.length === 0) {
      setChartSeries([]);
      return;
    }
    setChartSeries(prepareChartSeries());
  }, [refreshKey, retentionData, selectedLegendItems]);

  const scrollToLatestRow = React.useCallback(() => {
    const wrapper = gridWrapperRef.current;
    if (!wrapper) return;
    const content = wrapper.querySelector('.k-grid-content');
    if (!content) return;
    requestAnimationFrame(() => {
      content.scrollTop = content.scrollHeight;
      const rows = content.querySelectorAll('tbody tr');
      const last = rows[rows.length - 1];
      if (last) last.scrollIntoView({ block: 'end' });
    });
  }, []);

  useEffect(() => {
    scrollToLatestRow();
  }, [retentionData.length, scrollToLatestRow]);

  const tooltipRender = (e) => {
    const seriesName = e?.series?.name ?? e?.point?.series?.name ?? '';
   
    let rawValue = e?.value;
    if (rawValue == null) {
        const pv = e?.point?.value;
        
        rawValue = Array.isArray(pv) ? pv[1] : pv;
    }
    const num = typeof rawValue === 'number' ? rawValue : Number(rawValue);
    const valueStr = Number.isFinite(num) ? num.toFixed(1) : '';
    return seriesName ? `${seriesName}: ${valueStr}%` : `${valueStr}%`;
  };

  const handleExportPDF = () => {
    if (pdfExportRef.current) {
      pdfExportRef.current.save();
    }
  };

  return (
    <>
      <style jsx>{`
        .outputs-grid :global(.k-grid .k-table-thead .k-table-th) {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          color: white !important;
          font-weight: 900 !important;
          font-size: 14px !important;
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
        .outputs-grid :global(.k-grid .k-table-tbody tr:nth-child(3n) .k-table-td) {
          border-bottom-width: 3px !important;
          border-bottom-color: #000 !important;
        }
        /* Центровка колонки Count */
        .outputs-grid :global(.count-column) {
          text-align: center !important;
        }
      `}</style>

    <div style={{ position: 'absolute', left: '-10000px', top: 0, width: '1200px' }}>
        <PDFExport
          ref={pdfExportRef}
          paperSize="A4"
          landscape={true}
          margin={{ top: '15mm', left: '10mm', right: '10mm', bottom: '15mm' }}
          fileName={`Retention-Outputs.pdf`}
          scale={0.85}
        >
          <style>
            {`
              .pdf-grid .k-grid .k-table-thead .k-table-th {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                color: white !important;
                font-weight: bold !important;
                font-size: 10px !important;
                padding: 6px 4px !important;
                border: 1px solid rgba(255, 255, 255, 0.3) !important;
              }
              .pdf-grid .k-grid .k-table-tbody .k-table-td {
                padding: 5px 4px !important;
                font-size: 9px !important;
                border: 1px solid #ddd !important;
              }
              .pdf-grid .k-grid {
                border: 1px solid #ddd !important;
              }
              .pdf-grid .k-grid .k-table-tbody tr:nth-child(3n) .k-table-td {
                border-bottom-width: 3px !important;
                border-bottom-color: #000 !important;
              }
              .pdf-page-break {
                page-break-after: always !important;
              }
            `}
          </style>

          {pdfPages.map((pageData, pageIndex) => (
            <React.Fragment key={pageIndex}>
              <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#000' }}>
                Output: {retentionData.length} rows{pageIndex > 0 ? ' (continued)' : ''}
              </div>
              <div className="pdf-grid" style={{ width: 'fit-content', marginBottom: '20px' }}>
                <Grid
                  data={pageData}
                  style={{ width: 'auto' }}
                  scrollable={false}
                >
                  <GridColumn field="filter" title="Filter" width="120px" />
                  <GridColumn field="count" title="Count" width="55px" cell={CountCell} />
                  <GridColumn field="year0" title={categories[0]} width="60px" cell={makeYearCell('year0')} />
                  <GridColumn field="year1" title={categories[1]} width="60px" cell={makeYearCell('year1')} />
                  <GridColumn field="year2" title={categories[2]} width="60px" cell={makeYearCell('year2')} />
                  <GridColumn field="year3" title={categories[3]} width="60px" cell={makeYearCell('year3')} />
                  <GridColumn field="year4" title={categories[4]} width="60px" cell={makeYearCell('year4')} />
                  <GridColumn field="year5" title={categories[5]} width="60px" cell={makeYearCell('year5')} />
                  <GridColumn field="year6" title={categories[6]} width="60px" cell={makeYearCell('year6')} />
                  <GridColumn field="year7" title={categories[7]} width="60px" cell={makeYearCell('year7')} />
                  <GridColumn field="year8" title={categories[8]} width="60px" cell={makeYearCell('year8')} />
                  <GridColumn field="year9" title={categories[9]} width="60px" cell={makeYearCell('year9')} />
                </Grid>
              </div>
              {pageIndex < pdfPages.length - 1 && <div className="pdf-page-break"></div>}
            </React.Fragment>
          ))}

          <div className="pdf-page-break"></div>

          <div style={{ width: '800px', height: '400px', overflow: 'hidden', margin: '0 auto' }}>
            <Chart style={{ height: '100%', width: '100%' }}>
              <ChartLegend position="top" orientation="horizontal" align="center" />
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={categories} />
              </ChartCategoryAxis>
              <ChartValueAxis>
                <ChartValueAxisItem title={{ text: 'Retention Rate (%)' }} min={valueAxisMin} max={valueAxisMax} axisCrossingValue={valueAxisMin - 1} labels={{ content: (e) => (e.value < 0 ? '' : `${e.value}%`) }} />
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

      <div style={{
        width: '100%',
        height: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible'
      }}>
        <div style={{
          margin: '0 0 20px 0',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'nowrap'
        }}>
          <span style={{ fontSize: '20px', fontWeight: 600 }}>
            Output: {retentionData.length} rows
          </span>
          <Button
            onClick={() => onClearOutputs && onClearOutputs()}
            className="k-button k-button-solid k-button-solid-base k-rounded-md"
            style={{ padding: '6px 12px' }}
          >
            Clear Output
          </Button>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a href="/sheet-viewer">
              <Button
                className="k-button k-button-solid k-button-solid-secondary k-rounded-md"
                style={{ padding: '6px 12px' }}
              >
                Open Sheet Viewer
              </Button>
            </a>
            <Button
              onClick={handleExportPDF}
              className="k-button k-button-solid k-button-solid-secondary k-rounded-md"
              style={{ padding: '6px 12px' }}
            >
              Download PDF
            </Button>
          </div>
        </div>

        {loading && (
          <div style={{ marginBottom: '10px', flexShrink: 0 }}>
            Loading data from Google Sheets...
          </div>
        )}

        <div style={{ flexShrink: 0, marginBottom: '30px' }}>
          <div
            className="outputs-grid"
            ref={gridWrapperRef}
            style={{
              width: 'fit-content',
              maxWidth: '100%',
              height: '360px',
              overflowX: 'auto',
              overflowY: 'auto',
              flexShrink: 0,
              marginBottom: '30px'
            }}
          >
            <Grid 
              data={expandedData} 
              style={{ width: 'auto', height: '100%' }} 
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
                field="count"
                title="Count"
                width="100px"
                cell={CountCell}
                headerClassName={selectedColumn === 'count' ? 'selected-column count-column' : 'count-column'}
                className={selectedColumn === 'count' ? 'selected-column count-column' : 'count-column'}
                onHeaderClick={() => handleColumnClick('count')}
              />
              <GridColumn
                field="year0"
                title="Year 1"
                width="100px"
                cell={makeYearCell('year0')}
                headerClassName={selectedColumn === 'year0' ? 'selected-column' : ''}
                className={selectedColumn === 'year0' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year0')}
              />
              <GridColumn
                field="year1"
                title="Year 2"
                width="100px"
                cell={makeYearCell('year1')}
                headerClassName={selectedColumn === 'year1' ? 'selected-column' : ''}
                className={selectedColumn === 'year1' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year1')}
              />
              <GridColumn
                field="year2"
                title="Year 3"
                width="100px"
                cell={makeYearCell('year2')}
                headerClassName={selectedColumn === 'year2' ? 'selected-column' : ''}
                className={selectedColumn === 'year2' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year2')}
              />
              <GridColumn
                field="year3"
                title="Year 4"
                width="100px"
                cell={makeYearCell('year3')}
                headerClassName={selectedColumn === 'year3' ? 'selected-column' : ''}
                className={selectedColumn === 'year3' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year3')}
              />
              <GridColumn
                field="year4"
                title="Year 5"
                width="100px"
                cell={makeYearCell('year4')}
                headerClassName={selectedColumn === 'year4' ? 'selected-column' : ''}
                className={selectedColumn === 'year4' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year4')}
              />
              <GridColumn
                field="year5"
                title="Year 6"
                width="100px"
                cell={makeYearCell('year5')}
                headerClassName={selectedColumn === 'year5' ? 'selected-column' : ''}
                className={selectedColumn === 'year5' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year5')}
              />
              <GridColumn
                field="year6"
                title="Year 7"
                width="100px"
                cell={makeYearCell('year6')}
                headerClassName={selectedColumn === 'year6' ? 'selected-column' : ''}
                className={selectedColumn === 'year6' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year6')}
              />
              <GridColumn
                field="year7"
                title="Year 8"
                width="100px"
                cell={makeYearCell('year7')}
                headerClassName={selectedColumn === 'year7' ? 'selected-column' : ''}
                className={selectedColumn === 'year7' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year7')}
              />
              <GridColumn
                field="year8"
                title="Year 9"
                width="100px"
                cell={makeYearCell('year8')}
                headerClassName={selectedColumn === 'year8' ? 'selected-column' : ''}
                className={selectedColumn === 'year8' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year8')}
              />
              <GridColumn
                field="year9"
                title="Year 10"
                width="100px"
                cell={makeYearCell('year9')}
                headerClassName={selectedColumn === 'year9' ? 'selected-column' : ''}
                className={selectedColumn === 'year9' ? 'selected-column' : ''}
                onHeaderClick={() => handleColumnClick('year9')}
              />
            </Grid>
          </div>
        </div>

        <div style={{ flex: 1, minHeight: '300px', marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '420px', width: '100%' }}>
                <Chart
                    key={refreshKey}
                    style={{ height: '100%', width: '100%' }}
                >
                    <ChartLegend position="top" orientation="horizontal" align="center" />
                    <ChartCategoryAxis>
                        <ChartCategoryAxisItem
                          categories={categories}
                          labels={{ content: (e) => formatCategoryLabel(e.value) }} // минимальная правка для мобильных
                        />
                    </ChartCategoryAxis>
                    <ChartValueAxis>
                        <ChartValueAxisItem title={{ text: 'Retention Rate (%)' }} min={valueAxisMin} max={valueAxisMax} axisCrossingValue={valueAxisMin - 1} labels={{ content: (e) => (e.value < 0 ? '' : `${e.value}%`) }} />
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
        </div>

      </div>
    </>
  );
}

export default React.memo(OutputsSection);

