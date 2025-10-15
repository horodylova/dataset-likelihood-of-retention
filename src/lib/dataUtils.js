export function parseDate(dateValue) {
  if (!dateValue || dateValue === '' || dateValue === 'N/A') {
    return null;
  }
  
  if (dateValue instanceof Date) {
    return dateValue;
  }
  
  if (typeof dateValue === 'string') {
    const cleanDate = dateValue.trim();
    
    if (cleanDate === '' || cleanDate.toLowerCase() === 'n/a') {
      return null;
    }
    
    const mmddyyyyPattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = cleanDate.match(mmddyyyyPattern);
    
    if (match) {
      const month = parseInt(match[1], 10) - 1;
      const day = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);
      
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    
    const parsed = new Date(cleanDate);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  
  if (typeof dateValue === 'number') {
    const date = new Date(dateValue);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  
  return null;
}

export function processRawData(rawData) {
  if (!rawData || rawData.length === 0) return [];
  
  const headers = rawData[0];
  const moveInIndex = headers.findIndex(h => h && h.toLowerCase().includes('move-in'));
  const moveOutIndex = headers.findIndex(h => h && h.toLowerCase().includes('move-out'));
  
  if (moveInIndex === -1) {
    throw new Error('Move-in date column not found. Available columns: ' + headers.join(', '));
  }
  
  const processed = rawData.slice(1).map((row, index) => {
    const moveInRaw = row[moveInIndex];
    const moveOutRaw = moveOutIndex !== -1 ? row[moveOutIndex] : null;
    
    const moveInDate = parseDate(moveInRaw);
    const moveOutDate = parseDate(moveOutRaw);
    
    return {
      id: index,
      rawData: row,
      moveInDate,
      moveOutDate,
      moveInRaw,
      moveOutRaw,
      isCurrentResident: !moveOutDate
    };
  });
   
  return processed;
}

export function calculateYearsLived(moveInDate, moveOutDate = null) {
  const endDate = moveOutDate || new Date();
  const diffTime = endDate.getTime() - moveInDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return Math.max(0, diffDays / 365);
}

export function calculateRetentionByYear(processedData) {
  const retentionByYear = {};
  const maxYears = 10;
  
  for (let year = 1; year <= maxYears; year++) {
    retentionByYear[`Year ${year}`] = {
      eligible: 0,
      retained: 0,
      rate: 0
    };
  }
  
  processedData.forEach(resident => {
     
    const yearsLived = resident.moveInDate
      ? calculateYearsLived(resident.moveInDate, resident.moveOutDate)
      : 0;
    
    for (let year = 1; year <= maxYears; year++) {
      if (yearsLived >= year) {
        retentionByYear[`Year ${year}`].eligible++;
        
        if (yearsLived >= year + 1) {
          retentionByYear[`Year ${year}`].retained++;
        }
      }
    }
  });
  
  Object.keys(retentionByYear).forEach(year => {
    const data = retentionByYear[year];
    data.rate = data.eligible > 0 ? (data.retained / data.eligible) * 100 : 0;
  });
  
  return retentionByYear;
}

export function getChartData(retentionData) {
  return Object.entries(retentionData)
    .map(([year, data]) => ({
      year: year,
      rate: data.rate,
      eligible: data.eligible,
      retained: data.retained
    }));
}

export function calculateRetentionByFilter(processedData, filterColumn, filterValue) {
  const retentionByYear = {};
  const maxYears = 10;
  
  for (let year = 1; year <= maxYears; year++) {
    retentionByYear[`Year ${year}`] = {
      eligible: 0,
      retained: 0,
      rate: 0
    };
  }
  
  const filteredData = processedData.filter(resident => {
    if (!resident[filterColumn]) return false;
    const columnValue = resident[filterColumn].toString().toLowerCase();
    const searchValue = filterValue.toString().toLowerCase();
    return columnValue.includes(searchValue);
  });
  
  filteredData.forEach(resident => {
    if (!resident.moveInDate) return;
    
    const yearsLived = calculateYearsLived(resident.moveInDate, resident.moveOutDate);
    
    for (let year = 1; year <= maxYears; year++) {
      if (yearsLived >= year) {
        retentionByYear[`Year ${year}`].eligible++;
        
        if (yearsLived >= year + 1) {
          retentionByYear[`Year ${year}`].retained++;
        }
      }
    }
  });
  
  Object.keys(retentionByYear).forEach(year => {
    const data = retentionByYear[year];
    data.rate = data.eligible > 0 ? (data.retained / data.eligible) * 100 : 0;
  });
  
  return retentionByYear;
}