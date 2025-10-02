import React, { useEffect, useRef, useCallback } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { makeYearCell } from './utils';

function OutputsGrid({ data, selectedColumn, onHeaderClick }) {
  const gridWrapperRef = useRef(null);

  // Автопрокрутка вниз при добавлении новых данных
  const scrollToLatestRow = useCallback(() => {
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
  }, [data.length, scrollToLatestRow]);

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
        .outputs-grid :global(.k-grid .k-table-tbody tr:nth-child(3n) .k-table-td) {
          border-bottom-width: 3px !important;
          border-bottom-color: #000 !important;
        }
      `}</style>
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
        <Grid data={data} style={{ width: 'auto', height: '100%' }} scrollable={true}>
          <GridColumn
            field="filter"
            title="Filter"
            width="200px"
            headerClassName={selectedColumn === 'filter' ? 'selected-column' : ''}
            className={selectedColumn === 'filter' ? 'selected-column' : ''}
            onHeaderClick={() => onHeaderClick('filter')}
          />
          <GridColumn field="year1" title="Year 1" width="100px" cell={makeYearCell('year1')}
            headerClassName={selectedColumn === 'year1' ? 'selected-column' : ''}
            className={selectedColumn === 'year1' ? 'selected-column' : ''}
            onHeaderClick={() => onHeaderClick('year1')} />
          <GridColumn field="year2" title="Year 2" width="100px" cell={makeYearCell('year2')}
            headerClassName={selectedColumn === 'year2' ? 'selected-column' : ''}
            className={selectedColumn === 'year2' ? 'selected-column' : ''}
            onHeaderClick={() => onHeaderClick('year2')} />
          <GridColumn field="year3" title="Year 3" width="100px" cell={makeYearCell('year3')}
            headerClassName={selectedColumn === 'year3' ? 'selected-column' : ''}
            className={selectedColumn === 'year3' ? 'selected-column' : ''}
            onHeaderClick={() => onHeaderClick('year3')} />
          <GridColumn field="year4" title="Year 4" width="100px" cell={makeYearCell('year4')}
            headerClassName={selectedColumn === 'year4' ? 'selected-column' : ''}
            className={selectedColumn === 'year4' ? 'selected-column' : ''}
            onHeaderClick={() => onHeaderClick('year4')} />
          <GridColumn field="year5" title="Year 5" width="100px" cell={makeYearCell('year5')}
            headerClassName={selectedColumn === 'year5' ? 'selected-column' : ''}
            className={selectedColumn === 'year5' ? 'selected-column' : ''}
            onHeaderClick={() => onHeaderClick('year5')} />
          <GridColumn field="year6" title="Year 6" width="100px" cell={makeYearCell('year6')}
            headerClassName={selectedColumn === 'year6' ? 'selected-column' : ''}
            className={selectedColumn === 'year6' ? 'selected-column' : ''}
            onHeaderClick={() => onHeaderClick('year6')} />
          <GridColumn field="year7" title="Year 7" width="100px" cell={makeYearCell('year7')}
            headerClassName={selectedColumn === 'year7' ? 'selected-column' : ''}
            className={selectedColumn === 'year7' ? 'selected-column' : ''}
            onHeaderClick={() => onHeaderClick('year7')} />
          <GridColumn field="year8" title="Year 8" width="100px" cell={makeYearCell('year8')}
            headerClassName={selectedColumn === 'year8' ? 'selected-column' : ''}
            className={selectedColumn === 'year8' ? 'selected-column' : ''}
            onHeaderClick={() => onHeaderClick('year8')} />
          <GridColumn field="year9" title="Year 9" width="100px" cell={makeYearCell('year9')}
            headerClassName={selectedColumn === 'year9' ? 'selected-column' : ''}
            className={selectedColumn === 'year9' ? 'selected-column' : ''}
            onHeaderClick={() => onHeaderClick('year9')} />
          <GridColumn field="year10" title="Year 10" width="100px" cell={makeYearCell('year10')}
            headerClassName={selectedColumn === 'year10' ? 'selected-column' : ''}
            className={selectedColumn === 'year10' ? 'selected-column' : ''}
            onHeaderClick={() => onHeaderClick('year10')} />
        </Grid>
      </div>
    </>
  );
}

export default React.memo(OutputsGrid);