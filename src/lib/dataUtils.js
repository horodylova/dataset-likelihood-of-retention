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
  const moveInIndex = headers.findIndex(h => h === 'Move-In Date');
  const moveOutIndex = headers.findIndex(h => h === 'Move-Out Date');
  
  if (moveInIndex === -1) {
    return [];
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
  if (!processedData || processedData.length === 0) return {};
  
  const retentionByYear = {};
  
  for (let year = 1; year <= 10; year++) {
    const eligible = processedData.filter(resident => {
      const yearsLived = calculateYearsLived(resident.moveInDate, resident.moveOutDate);
      return yearsLived >= year;
    });
    
    const retained = eligible.filter(resident => {
      if (resident.isCurrentResident) {
        const yearsLived = calculateYearsLived(resident.moveInDate);
        return yearsLived >= year;
      } else {
        const yearsLived = calculateYearsLived(resident.moveInDate, resident.moveOutDate);
        return yearsLived >= year;
      }
    });
    
    retentionByYear[`Year ${year}`] = {
      eligible: eligible.length,
      retained: retained.length,
      rate: eligible.length > 0 ? (retained.length / eligible.length) * 100 : 0
    };
  }
  
  return retentionByYear;
}

export function getChartData(retentionData) {
  return Object.entries(retentionData).map(([year, data]) => ({
    year,
    rate: data.rate
  }));
}