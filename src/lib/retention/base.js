import { calculateYearsLived } from '@/lib/dataUtils';

export function createEmptyRetentionData() {
  const data = {};
  for (let year = 0; year <= 9; year++) {
    data[`Year ${year}`] = { eligible: 0, retained: 0, rate: 0 };
  }
  return data;
}

export function getUniqueFilterValues(processedData, columnIndex) {
  const values = new Set();
  processedData.forEach(resident => {
    const cellValue = resident.rawData[columnIndex];
    if (cellValue && cellValue !== '') {
      values.add(cellValue.toString().trim());
    }
  });
  return Array.from(values);
}

export function calculateRetentionForData(data, retentionObject) {
  data.forEach(resident => {
     const yearsLived = resident.moveInDate ? calculateYearsLived(resident.moveInDate, resident.moveOutDate) : 0;

     retentionObject['Year 0'].eligible++;
    if (yearsLived >= 1) {
      retentionObject['Year 0'].retained++;
    }

     for (let year = 1; year <= 9; year++) {
      if (yearsLived >= year) {
        retentionObject[`Year ${year}`].eligible++;
        if (yearsLived >= year + 1) {
          retentionObject[`Year ${year}`].retained++;
        }
      }
    }
  });

  Object.keys(retentionObject).forEach(year => {
    const yearData = retentionObject[year];
    yearData.rate = yearData.eligible > 0
      ? Math.round((yearData.retained / yearData.eligible) * 100 * 100) / 100
      : 0;
  });
}

export function calculateYesNoColumn(processedData, rawData, columnNameLower) {
  if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
    return createEmptyRetentionData();
  }
  const headers = rawData[0];
  const columnIndex = headers.findIndex(h => h && h.toLowerCase().trim() === columnNameLower);
  if (columnIndex === -1) {
    return createEmptyRetentionData();
  }
  const retentionData = {
    Yes: createEmptyRetentionData(),
    No: createEmptyRetentionData(),
    combined: createEmptyRetentionData()
  };
  const yesData = processedData.filter(resident => {
    const cellValue = resident.rawData[columnIndex];
    return cellValue && cellValue.toString().toLowerCase().trim() === 'yes';
  });
  const noData = processedData.filter(resident => {
    const cellValue = resident.rawData[columnIndex];
    return !cellValue || cellValue.toString().toLowerCase().trim() !== 'yes';
  });
  calculateRetentionForData(yesData, retentionData.Yes);
  calculateRetentionForData(noData, retentionData.No);
  calculateRetentionForData(processedData, retentionData.combined);
  return retentionData;
}