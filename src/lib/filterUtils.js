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

  const dataWithValidFilter = processedData.filter(resident => {
    const cellValue = resident.rawData[filterColumnIndex];
    return cellValue && cellValue !== '';
  });

  if (!filterValues) {
    if (filterColumn.toLowerCase() === 'gender') {
      filterValues = ['Male', 'Female'];
    } else {
      filterValues = getUniqueFilterValues(dataWithValidFilter, filterColumnIndex);
    }
  }

  const retentionData = {};

  filterValues.forEach(value => {
    retentionData[value] = createEmptyRetentionData();
  });

  retentionData.combined = createEmptyRetentionData();

  const validGenderData = dataWithValidFilter.filter(resident => {
    const cellValue = resident.rawData[filterColumnIndex];
    if (filterColumn.toLowerCase() === 'gender') {
      return cellValue === 'Male' || cellValue === 'Female';
    }
    return true;
  });

  filterValues.forEach(filterValue => {
    const filteredData = validGenderData.filter(resident => {
      const cellValue = resident.rawData[filterColumnIndex];
      const normalizedCellValue = cellValue.toString().toLowerCase().trim();
      const normalizedFilterValue = filterValue.toString().toLowerCase().trim();
      
      return normalizedCellValue === normalizedFilterValue;
    });

    calculateRetentionForData(filteredData, retentionData[filterValue]);
  });

  calculateRetentionForData(validGenderData, retentionData.combined);

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