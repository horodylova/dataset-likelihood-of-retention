import React from 'react';
import { Button } from '@progress/kendo-react-buttons';

function OutputsHeader({ count, loading, onClear, onDownloadPDF, showRawData, onToggleRawData }) {
  return (
    <>
      <div style={{ margin: '0 0 20px 0', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'nowrap' }}>
        <span style={{ fontSize: '20px', fontWeight: 600 }}>
          Output: {count} rows
        </span>
        <Button
          onClick={() => onClear && onClear()}
          className="k-button k-button-solid k-button-solid-base k-rounded-md"
          style={{ padding: '6px 12px' }}
        >
          Clear Output
        </Button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            onClick={onToggleRawData}
            className="k-button k-button-solid k-button-solid-primary k-rounded-md"
            style={{ padding: '6px 12px' }}
          >
            {showRawData ? 'Hide Raw Data' : 'Show Raw Data'}
          </Button>
          <Button
            onClick={onDownloadPDF}
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
    </>
  );
}

export default React.memo(OutputsHeader);