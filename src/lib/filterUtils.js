import { calculateYearsLived } from '@/lib/dataUtils';

export function calculateRetentionByFilter(processedData, rawData, filterColumn, filterValues = null) {
  if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
    return createEmptyRetentionData();
  }

  const headers = rawData[0];
  const filterColumnIndex = headers.findIndex(h => 
    h && h.toLowerCase().trim() === filterColumn.toLowerCase().trim()
  );

  if (filterColumnIndex === -1) {
    console.warn(`Column "${filterColumn}" not found in headers:`, headers);
    return createEmptyRetentionData();
  }

  if (!filterValues) {
    filterValues = getUniqueFilterValues(processedData, filterColumnIndex);
  }

  const retentionData = {};
  const matchedResidentIds = new Set();
  
  filterValues.forEach(value => {
    retentionData[value] = createEmptyRetentionData();
  });

  retentionData.combined = createEmptyRetentionData();

  filterValues.forEach(filterValue => {
    const filteredData = processedData.filter(resident => {
      const cellValue = resident.rawData[filterColumnIndex];
      if (!cellValue || cellValue === '') return false;
      
      const normalizedCellValue = cellValue.toString().toLowerCase().trim();
      const normalizedFilterValue = filterValue.toString().toLowerCase().trim();
      
      return normalizedCellValue === normalizedFilterValue;
    });

    calculateRetentionForData(filteredData, retentionData[filterValue]);
    
    filteredData.forEach(resident => {
      matchedResidentIds.add(resident.id);
    });
  });

  const allMatchedData = processedData.filter(resident => 
    matchedResidentIds.has(resident.id)
  );

  calculateRetentionForData(allMatchedData, retentionData.combined);

  return retentionData;
}

export function calculateRetentionByGender(processedData, rawData) {
  return calculateRetentionByFilter(processedData, rawData, 'Gender');
}

export function calculateRetentionByVeteran(processedData, rawData) {
  return calculateRetentionByFilter(processedData, rawData, 'Veteran');
}

export function calculateRetentionByVisualImpairment(processedData, rawData) {
  return calculateRetentionByFilter(processedData, rawData, 'Visual');
}

function createEmptyRetentionData() {
  const data = {};
  for (let year = 1; year <= 10; year++) {
    data[`Year ${year}`] = {
      eligible: 0,
      retained: 0,
      rate: 0
    };
  }
  return data;
}

function getUniqueFilterValues(processedData, columnIndex) {
  const values = new Set();
  
  processedData.forEach(resident => {
    const cellValue = resident.rawData[columnIndex];
    if (cellValue && cellValue !== '') {
      values.add(cellValue.toString().trim());
    }
  });
  
  return Array.from(values);
}

function calculateRetentionForData(data, retentionObject) {
  data.forEach(resident => {
    if (!resident.moveInDate) return;
    
    const yearsLived = calculateYearsLived(resident.moveInDate, resident.moveOutDate);
    
    for (let year = 1; year <= 10; year++) {
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
    yearData.rate = yearData.eligible > 0 ? 
      Math.round((yearData.retained / yearData.eligible) * 100 * 100) / 100 : 0;
  });
}