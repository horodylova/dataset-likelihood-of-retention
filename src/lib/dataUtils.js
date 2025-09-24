export function parseDate(dateValue) {
  if (!dateValue || dateValue === '' || dateValue === 'N/A') {
    return null;
  }
  
  if (dateValue instanceof Date) {
    return dateValue;
  }
  
  if (typeof dateValue === 'string') {
    const cleanDate = dateValue.trim();
    
    const formats = [
      /^\d{4}-\d{2}-\d{2}$/,
      /^\d{2}\/\d{2}\/\d{4}$/,
      /^\d{1,2}\/\d{1,2}\/\d{4}$/,
      /^\d{2}-\d{2}-\d{4}$/,
      /^\d{1,2}-\d{1,2}-\d{4}$/
    ];
    
    for (const format of formats) {
      if (format.test(cleanDate)) {
        const parsed = new Date(cleanDate);
        if (!isNaN(parsed.getTime())) {
          return parsed;
        }
      }
    }
    
    const parsed = new Date(cleanDate);
    if (!isNaN(parsed.getTime())) {
      return parsed;
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
  
  return rawData.slice(1).map((row, index) => {
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
  }).filter(item => item.moveInDate);
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
    data.rate = data.eligible > 0 ? Math.round((data.retained / data.eligible) * 100 * 100) / 100 : 0;
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