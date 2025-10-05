import React from 'react';

export function expandRetentionData(retentionData) {
  if (!Array.isArray(retentionData)) return [];

  const makeYearFieldsFromRetention = (ret, field) => {
    const out = {};
    for (let i = 1; i <= 10; i++) {
      const v = ret?.[`Year ${i}`]?.[field];
      out[`year${i}`] = Number(v || 0);
    }
    return out;
  };

  return retentionData.flatMap(row => {
    const ret = row?._retention || null;

    const yearFields = {};
    for (let i = 1; i <= 10; i++) {
      yearFields[`year${i}`] = Number(row[`year${i}`] || 0);
    }

  
    const percentYearFields = {};
    for (let i = 1; i <= 10; i++) {
      const val = Number(row[`year${i}`] || 0);
      percentYearFields[`year${i}`] = Number.isFinite(val) ? `${val.toFixed(2)}%` : '';
    }

    const percentRow = {
      type: 'percent',
      filter: `${row.filter} — Percent`,
      ...percentYearFields
    };

    const eligibleRow = {
      type: 'eligible',
      filter: `${row.filter} — Eligible`,
      ...(ret
        ? makeYearFieldsFromRetention(ret, 'eligible')
        : Array.from({ length: 10 }, (_, i) => ({ [`year${i + 1}`]: 0 }))
            .reduce((a, c) => ({ ...a, ...c }), {}))
    };

    const retainedRow = {
      type: 'retained',
      filter: `${row.filter} — Retained`,
      ...(ret
        ? makeYearFieldsFromRetention(ret, 'retained')
        : Array.from({ length: 10 }, (_, i) => ({ [`year${i + 1}`]: 0 }))
            .reduce((a, c) => ({ ...a, ...c }), {}))
    };

    console.log('[Outputs] expandRetentionData row', {
      baseFilter: row.filter,
      percentType: percentRow.type,
      percentFilter: percentRow.filter,
      percentYear1: percentRow.year1,
      eligibleType: eligibleRow.type,
      eligibleFilter: eligibleRow.filter,
      eligibleYear1: eligibleRow.year1,
      retainedType: retainedRow.type,
      retainedFilter: retainedRow.filter,
      retainedYear1: retainedRow.year1
    });

    return [percentRow, eligibleRow, retainedRow];
  });
}

export function buildChartSeries(retentionData, selectedLegendItems, categories, colors) {
  if (!retentionData || retentionData.length === 0) return [];
  if (!selectedLegendItems || selectedLegendItems.size === 0) return [];

  const series = [];
  retentionData.forEach((item, index) => {
    if (!item || !item.filter) return;
    if (!selectedLegendItems.has(item.filter)) return;

    const data = categories.map((year, yearIndex) => ({
      year,
      rate: item[`year${yearIndex + 1}`] || 0
    }));

    series.push({
      name: item.filter,
      data,
      color: colors[index % colors.length]
    });
  });
  return series;
}

export function makeYearCell(field) {
  const YearCell = (props) => {
    const { dataItem, className, style } = props;
    const filterStr = typeof dataItem?.filter === 'string' ? dataItem.filter : '';
    const isPercentRow = dataItem?.type === 'percent' || /percent/i.test(filterStr);

    const value = dataItem?.[field];
    const valueIsStringPercent = typeof value === 'string' && /\%\s*$/.test(value.trim());
    const vNum = typeof value === 'number' ? value : Number(value);
    const isFiniteNumber = Number.isFinite(vNum);

    console.log('[Outputs] YearCell render', {
      field,
      filter: dataItem?.filter,
      type: dataItem?.type,
      isPercentRow,
      valueRaw: value,
      valueNum: vNum,
      isFiniteNumber
    });

    return (
      <td className={className} style={style}>
        {isPercentRow
          ? (valueIsStringPercent
              ? value
              : (isFiniteNumber ? `${vNum.toFixed(2)}%` : '')
            )
          : (isFiniteNumber ? vNum : (typeof value === 'string' ? value : ''))
        }
      </td>
    );
  };
  YearCell.displayName = `YearCell_${field}`;
  return YearCell;
}

export function chartTooltipRender(e) {
  const seriesName = e?.series?.name ?? e?.point?.series?.name ?? '';
  let rawValue = e?.value;
  if (rawValue == null) {
    const pv = e?.point?.value;
    rawValue = Array.isArray(pv) ? pv[1] : pv;
  }
  const num = typeof rawValue === 'number' ? rawValue : Number(rawValue);
  const valueStr = Number.isFinite(num) ? num.toFixed(1) : '';
  return seriesName ? `${seriesName}: ${valueStr}%` : `${valueStr}%`;
}
