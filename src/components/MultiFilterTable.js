import React, { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';

export default function MultiFilterTable({ onSubmit, onReset }) {
  const filters = [
    { column: 'Status', name: 'Status', options: ['Current Residents', 'Former Residents'] },
    { column: 'Gender', name: 'Gender', options: ['Male', 'Female'] },
    { column: 'Veteran', name: 'Veteran', options: ['Yes', 'No'] },
    { column: 'FC', name: 'FC', options: ['Yes', 'No'] },
    { column: 'Visual', name: 'Visual', options: ['Yes', 'No'] },
    { column: 'Hearing', name: 'Hearing', options: ['Yes', 'No'] },
    { column: "Alzheimer's / Dementia", name: "Alzheimer's / Dementia", options: ['Yes', 'No'] },
    { column: 'HIV / AIDS', name: 'HIV / AIDS', options: ['Yes', 'No'] },
    { column: 'Physical / Medical', name: 'Physical / Medical', options: ['Yes', 'No'] },
    { column: 'Mental Health', name: 'Mental Health', options: ['Yes', 'No'] },
    { column: 'Physical / Mobility', name: 'Physical / Mobility', options: ['Yes', 'No'] },
    { column: 'Alcohol Abuse', name: 'Alcohol Abuse', options: ['Yes', 'No'] },
    { column: 'Substance Abuse', name: 'Substance Abuse', options: ['Yes', 'No'] },
    { column: 'Felonies', name: 'Felonies', options: ['Yes', 'No'] },
    { column: 'DT', name: 'DT', options: ['Yes', 'No'] },
    { column: 'Disability Count', name: 'Disability Count', options: ['0', '1', '2', '3', '4+'] },
    { column: 'Income', name: 'Income Source', options: ['SSI', 'SSDI', 'Multiple', 'Other', 'None'] },
  ];

  const [selected, setSelected] = useState({});

  const toggleOption = (filterName, opt) => {
    setSelected(prev => {
      const curr = new Set(prev[filterName] || []);
      if (curr.has(opt)) curr.delete(opt);
      else curr.add(opt);
      return { ...prev, [filterName]: curr };
    });
  };

  const clearSelection = () => {
    setSelected({});
    if (onReset) onReset();  
  };

  const buildSpecsAndSubmit = () => {
    const specs = [];
    filters.forEach(f => {
      const chosen = Array.from(selected[f.name] || []);
      if (chosen.length > 0) {
        // Передаём колонку для расчёта и отдельное поле display для красивого заголовка
        specs.push({ column: f.column, values: chosen, display: f.name });
      }
    });
    if (onSubmit) onSubmit(specs);
  };

  const styles = {
    container: {
      width: '100%', // make it fit the sidebar width
      minWidth: '360px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '12px',
      border: '1px solid #e9ecef',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '8px',
    },
    title: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#384C9E',
    },
    selectionBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      padding: '10px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '6px',
      marginBottom: '10px'
    },
    selectionText: {
      fontSize: '13px',
      color: '#495057',
      flex: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    actions: {
      display: 'flex',
      gap: '8px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      textAlign: 'left',
      fontSize: '13px',
      color: '#6c757d',
      fontWeight: 600,
      padding: '8px',
      borderBottom: '1px solid #f0f0f0',
      backgroundColor: '#f8f9fa',
      position: 'sticky',
      top: 0,
      zIndex: 1,
    },
    tr: { borderBottom: '1px solid #f5f5f5' },
    tdName: {
      width: '200px',
      padding: '8px',
      fontSize: '13px',
      color: '#343a40',
      fontWeight: 500,
      whiteSpace: 'nowrap',
    },
    tdOptions: { padding: '6px' },
    optionWrap: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
    pill: (active, disabled) => ({
      padding: '6px 10px',
      borderRadius: '999px',
      border: `1px solid ${active ? '#384C9E' : '#dee2e6'}`,
      backgroundColor: active ? '#e9f0ff' : '#f8f9fa',
      fontSize: '12px',
      color: disabled ? '#adb5bd' : '#495057',
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
    }),
    footer: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'flex-end',
      marginTop: '10px',
      borderTop: '1px solid #f1f3f5',
      paddingTop: '10px',
    },
    btnPrimary: {
      padding: '10px 18px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      boxShadow: '0 2px 4px rgba(0, 123, 255, 0.2)',
    },
    btnSuccess: {
      padding: '10px 18px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      boxShadow: '0 2px 4px rgba(40, 167, 69, 0.2)',
    },
  };

  return (
    <div style={styles.container}>
      {/* Заголовок "Multi-Filter Retention" удален */}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Filter</th>
            <th style={styles.th}>Options</th>
          </tr>
        </thead>
        <tbody>
          {filters.map(f => (
            <tr key={f.name} style={styles.tr}>
              <td style={styles.tdName}>{f.name}{f.disabled ? ' (derived)' : ''}</td>
              <td style={styles.tdOptions}>
                <div style={styles.optionWrap}>
                  {f.options.map(opt => {
                    const isActive = (selected[f.name] || new Set()).has(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        style={styles.pill(isActive, !!f.disabled)}
                        onClick={() => toggleOption(f.name, opt, !!f.disabled)}
                        title={f.disabled ? 'Not selectable' : 'Toggle option'}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Панель выбора перенесена вниз под таблицу без изменений */}
      <div style={styles.selectionBar}>
        <div style={styles.selectionText}>
          You have selected: {
            Object.entries(selected)
              .filter(([_, set]) => set && set.size > 0)
              .map(([label, set]) => `${label}: ${Array.from(set).join(', ')}`)
              .join('; ') || 'None'
          }
        </div>
        <div style={styles.actions}>
          <Button
            onClick={clearSelection}
            className="k-button k-button-solid k-rounded-md"
            style={{
              padding: '8px 14px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              boxShadow: '0 2px 4px rgba(0, 123, 255, 0.2)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 123, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 123, 255, 0.2)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px) scale(1)';
            }}
            title="Clear selection"
          >
            Reset
          </Button>
          <Button
            onClick={buildSpecsAndSubmit}
            className="k-button k-button-solid k-rounded-md"
            style={{
              padding: '8px 14px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              boxShadow: '0 2px 4px rgba(40, 167, 69, 0.2)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(40, 167, 69, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(40, 167, 69, 0.2)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px) scale(1)';
            }}
            title="Submit filters and compute retention"
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Нижние две кнопки полностью удалены */}
    </div>
  );
}