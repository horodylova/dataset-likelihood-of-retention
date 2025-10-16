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

export function calculateDurations(moveInDate, moveOutDate = null) {
  if (!moveInDate) {
    return {
      tenureDays: 0,
      daysSinceMoveIn: 0,
      tenureYears: 0,
      daysSinceMoveInYears: 0,
    };
  }

  const today = new Date();
  const endForTenure = moveOutDate || today;

  const msPerDay = 1000 * 60 * 60 * 24;

  const tenureDays = Math.floor((endForTenure.getTime() - moveInDate.getTime()) / msPerDay);
  const daysSinceMoveIn = Math.floor((today.getTime() - moveInDate.getTime()) / msPerDay);

  return {
    tenureDays,
    daysSinceMoveIn,
    tenureYears: tenureDays / 365,
    daysSinceMoveInYears: daysSinceMoveIn / 365,
  };
}

export function calculateRetentionForData(data, retentionObject) {
  data.forEach(resident => {
    if (!resident.moveInDate) return;

    const yearsLivedEligible = calculateYearsLived(resident.moveInDate, null);
    const yearsLivedRetained = calculateYearsLived(resident.moveInDate, resident.moveOutDate);

    retentionObject['Year 0'].eligible++;
    if (yearsLivedRetained >= 1) {
      retentionObject['Year 0'].retained++;
    }

    for (let year = 1; year <= 9; year++) {
      if (yearsLivedEligible >= year) {
        retentionObject[`Year ${year}`].eligible++;
      }
      
      if (yearsLivedRetained >= year) {
        retentionObject[`Year ${year}`].retained++;
      }
    }
  });

  Object.keys(retentionObject).forEach(year => {
    const yearData = retentionObject[year];
    yearData.rate = yearData.eligible > 0
      ? (yearData.retained / yearData.eligible) * 100
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