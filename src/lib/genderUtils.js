export function calculateRetentionByGender(processedData) {
  const genderRetention = {
    male: {},
    female: {},
    combined: {}
  };
  
  const maxYears = 10;
  
  ['male', 'female', 'combined'].forEach(category => {
    for (let year = 1; year <= maxYears; year++) {
      genderRetention[category][`Year ${year}`] = {
        eligible: 0,
        retained: 0,
        rate: 0
      };
    }
  });
  
  const maleData = processedData.filter(resident => {
    if (!resident.sex) return false;
    const sexLower = resident.sex.toLowerCase();
    return sexLower.includes('m') || sexLower.includes('male');
  });
  
  const femaleData = processedData.filter(resident => {
    if (!resident.sex) return false;
    const sexLower = resident.sex.toLowerCase();
    return sexLower.includes('f') || sexLower.includes('female');
  });
  
  const calculateForGender = (data, category) => {
    data.forEach(resident => {
      if (!resident.moveInDate) return;
      
      const yearsLived = calculateYearsLived(resident.moveInDate, resident.moveOutDate);
      
      for (let year = 1; year <= maxYears; year++) {
        if (yearsLived >= year) {
          genderRetention[category][`Year ${year}`].eligible++;
          
          if (yearsLived >= year + 1) {
            genderRetention[category][`Year ${year}`].retained++;
          }
        }
      }
    });
    
    Object.keys(genderRetention[category]).forEach(year => {
      const data = genderRetention[category][year];
      data.rate = data.eligible > 0 ? Math.round((data.retained / data.eligible) * 100 * 100) / 100 : 0;
    });
  };
  
  calculateForGender(maleData, 'male');
  calculateForGender(femaleData, 'female');
  calculateForGender([...maleData, ...femaleData], 'combined');
  
  return genderRetention;
}

function calculateYearsLived(moveInDate, moveOutDate = null) {
  if (!moveInDate) return 0;
  
  const endDate = moveOutDate || new Date();
  const diffTime = Math.abs(endDate - moveInDate);
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  
  return Math.floor(diffYears);
}