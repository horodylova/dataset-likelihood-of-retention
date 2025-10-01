import { calculateYearsLived } from '@/lib/dataUtils';

function createEmptyRetentionData() {
  const data = {};
  for (let year = 1; year <= 10; year++) {
    data[`Year ${year}`] = { eligible: 0, retained: 0, rate: 0 };
  }
  return data;
}

export function calculateRetentionByFilter(processedData, rawData, filterColumn, filterValues = null) {
  if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
    return createEmptyRetentionData();
  }

  const headers = rawData[0];
  const filterColumnIndex = headers.findIndex(h => h && h.toLowerCase().trim() === filterColumn.toLowerCase().trim());

  if (filterColumnIndex === -1) {
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
  if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
    return createEmptyRetentionData();
  }

  const headers = rawData[0];
  const veteranColumnIndex = headers.findIndex(h => h && h.toLowerCase().trim() === 'veteran');

  if (veteranColumnIndex === -1) {
    return createEmptyRetentionData();
  }

  const retentionData = {
    Yes: createEmptyRetentionData(),
    No: createEmptyRetentionData(),
    combined: createEmptyRetentionData()
  };

  const yesData = processedData.filter(resident => {
    const cellValue = resident.rawData[veteranColumnIndex];
    return cellValue && cellValue.toString().toLowerCase().trim() === 'yes';
  });

  const noData = processedData.filter(resident => {
    const cellValue = resident.rawData[veteranColumnIndex];
    return !cellValue || cellValue.toString().toLowerCase().trim() !== 'yes';
  });

  calculateRetentionForData(yesData, retentionData.Yes);
  calculateRetentionForData(noData, retentionData.No);
  calculateRetentionForData(processedData, retentionData.combined);

  return retentionData;
}

export function calculateRetentionByVisualImpairment(processedData, rawData) {
  return calculateYesNoColumn(processedData, rawData, 'visual');
}

export function calculateRetentionByHearing(processedData, rawData) {
  if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
    return createEmptyRetentionData();
  }

  const headers = rawData[0];
  const hearingColumnIndex = headers.findIndex(h => h && h.toLowerCase().trim() === 'hearing');

  if (hearingColumnIndex === -1) {
    return createEmptyRetentionData();
  }

  const retentionData = {
    Yes: createEmptyRetentionData(),
    No: createEmptyRetentionData(),
    combined: createEmptyRetentionData()
  };

  const yesData = processedData.filter(resident => {
    const cellValue = resident.rawData[hearingColumnIndex];
    return cellValue && cellValue.toString().toLowerCase().trim() === 'yes';
  });

  const noData = processedData.filter(resident => {
    const cellValue = resident.rawData[hearingColumnIndex];
    return !cellValue || cellValue.toString().toLowerCase().trim() !== 'yes';
  });

  calculateRetentionForData(yesData, retentionData.Yes);
  calculateRetentionForData(noData, retentionData.No);
  calculateRetentionForData(processedData, retentionData.combined);

  return retentionData;
}

export function calculateRetentionBySubstanceAbuse(processedData, rawData) {
  if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
    return createEmptyRetentionData();
  }

  const headers = rawData[0];
  const columnIndex = headers.findIndex(h => h && h.toLowerCase().trim() === 'substance abuse');

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

export function calculateRetentionByFelonies(processedData, rawData) {
  if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
    return createEmptyRetentionData();
  }

  const headers = rawData[0];
  const columnIndex = headers.findIndex(h => h && h.toLowerCase().trim() === 'felonies');

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
    return cellValue && cellValue.toString().toLowerCase().trim() === 'no';
  });

  const yesNoOnlyData = processedData.filter(resident => {
    const cellValue = resident.rawData[columnIndex];
    const v = cellValue ? cellValue.toString().toLowerCase().trim() : '';
    return v === 'yes' || v === 'no';
  });

  calculateRetentionForData(yesData, retentionData.Yes);
  calculateRetentionForData(noData, retentionData.No);
  calculateRetentionForData(yesNoOnlyData, retentionData.combined);

  return retentionData;
}

export function calculateRetentionByDT(processedData, rawData) {
  if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
    return createEmptyRetentionData();
  }

  const headers = rawData[0];
  const columnIndex = headers.findIndex(h => h && h.toLowerCase().trim() === 'dt');

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
    const v = cellValue ? cellValue.toString().toLowerCase().trim() : '';
    return v === 'no' || v === '';
  });

  const yesNoOnlyData = [...yesData, ...noData];

  calculateRetentionForData(yesData, retentionData.Yes);
  calculateRetentionForData(noData, retentionData.No);
  calculateRetentionForData(yesNoOnlyData, retentionData.combined);

  return retentionData;
}

export function calculateRetentionByFC(processedData, rawData) {
  if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
    return createEmptyRetentionData();
  }

  const headers = rawData[0];
  const columnIndex = headers.findIndex(h => h && h.toLowerCase().trim() === 'fc');

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

export function calculateRetentionByAlzheimer(processedData, rawData) {
  return calculateYesNoColumn(processedData, rawData, "alzheimer's / dementia");
}

export function calculateRetentionByHIV(processedData, rawData) {
  return calculateYesNoColumn(processedData, rawData, 'hiv / aids');
}

export function calculateRetentionByPhysicalMedical(processedData, rawData) {
  return calculateYesNoColumn(processedData, rawData, 'physical / medical');
}

export function calculateRetentionByMentalHealth(processedData, rawData) {
  return calculateYesNoColumn(processedData, rawData, 'mental health');
}

export function calculateRetentionByPhysicalMobility(processedData, rawData) {
  return calculateYesNoColumn(processedData, rawData, 'physical / mobility');
}

export function calculateRetentionByAlcoholAbuse(processedData, rawData) {
  return calculateYesNoColumn(processedData, rawData, 'alcohol abuse');
}

export function calculateRetentionByDisabilityCount(processedData, rawData) {
  if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
    return {
      '0': createEmptyRetentionData(),
      '1': createEmptyRetentionData(),
      '2': createEmptyRetentionData(),
      '3': createEmptyRetentionData(),
      '4+': createEmptyRetentionData(),
      combined: createEmptyRetentionData()
    };
  }

  const headers = rawData[0].map(h => (h ? h.toString().toLowerCase().trim() : ''));

  const columns = [
    'visual',
    'hearing',
    "alzheimer's / dementia",
    'hiv / aids',
    'physical / medical',
    'mental health',
    'physical / mobility',
    'alcohol abuse',
    'substance abuse'
  ];

  const indices = columns.map(name => headers.findIndex(h => h === name)).filter(idx => idx !== -1);

  const bucket0 = [];
  const bucket1 = [];
  const bucket2 = [];
  const bucket3 = [];
  const bucket4 = [];

  processedData.forEach(resident => {
    let count = 0;
    indices.forEach(idx => {
      const v = resident.rawData[idx];
      const isYes = v && v.toString().toLowerCase().trim() === 'yes';
      if (isYes) count++;
    });
    if (count >= 4) count = 4;
    if (count === 0) bucket0.push(resident);
    else if (count === 1) bucket1.push(resident);
    else if (count === 2) bucket2.push(resident);
    else if (count === 3) bucket3.push(resident);
    else bucket4.push(resident);
  });

  const retentionData = {
    '0': createEmptyRetentionData(),
    '1': createEmptyRetentionData(),
    '2': createEmptyRetentionData(),
    '3': createEmptyRetentionData(),
    '4+': createEmptyRetentionData(),
    combined: createEmptyRetentionData()
  };

  calculateRetentionForData(bucket0, retentionData['0']);
  calculateRetentionForData(bucket1, retentionData['1']);
  calculateRetentionForData(bucket2, retentionData['2']);
  calculateRetentionForData(bucket3, retentionData['3']);
  calculateRetentionForData(bucket4, retentionData['4+']);
  calculateRetentionForData(processedData, retentionData.combined);

  return retentionData;
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
    yearData.rate = yearData.eligible > 0 ? Math.round((yearData.retained / yearData.eligible) * 100 * 100) / 100 : 0;
  });
}

function calculateYesNoColumn(processedData, rawData, columnNameLower) {
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

export function calculateRetentionByIncomeSource(processedData, rawData) {
  if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
    return {
      'SSI': createEmptyRetentionData(),
      'SSDI': createEmptyRetentionData(),
      'Multiple': createEmptyRetentionData(),
      'Other': createEmptyRetentionData(),
      'None': createEmptyRetentionData(),
      'Unknown': createEmptyRetentionData(),
      combined: createEmptyRetentionData()
    };
  }

  const headers = rawData[0];
  const incomeColumnIndex = headers.findIndex(h => h && (
    h.toLowerCase().trim() === 'income source' || 
    h.toLowerCase().trim() === 'income'
  ));

  if (incomeColumnIndex === -1) {
    return {
      'SSI': createEmptyRetentionData(),
      'SSDI': createEmptyRetentionData(),
      'Multiple': createEmptyRetentionData(),
      'Other': createEmptyRetentionData(),
      'None': createEmptyRetentionData(),
      'Unknown': createEmptyRetentionData(),
      combined: createEmptyRetentionData()
    };
  }

  const retentionData = {
    'SSI': createEmptyRetentionData(),
    'SSDI': createEmptyRetentionData(),
    'Multiple': createEmptyRetentionData(),
    'Other': createEmptyRetentionData(),
    'None': createEmptyRetentionData(),
    'Unknown': createEmptyRetentionData(),
    combined: createEmptyRetentionData()
  };

  const incomeValues = ['SSI', 'SSDI', 'Multiple', 'Other', 'None', 'Unknown'];

  incomeValues.forEach(incomeValue => {
    const filteredData = processedData.filter(resident => {
      const cellValue = resident.rawData[incomeColumnIndex];
      if (!cellValue) return incomeValue === 'None';
      const normalizedCellValue = cellValue.toString().toLowerCase().trim();
      const normalizedIncomeValue = incomeValue.toString().toLowerCase().trim();
      return normalizedCellValue === normalizedIncomeValue;
    });
    calculateRetentionForData(filteredData, retentionData[incomeValue]);
  });

  calculateRetentionForData(processedData, retentionData.combined);

  return retentionData;
}

export function calculateRetentionByMultiFilters(processedData, rawData, filterSpecs = []) {
 
  if (!processedData || processedData.length === 0 || !rawData || rawData.length === 0) {
    return createEmptyRetentionData();
  }

  const headers = rawData[0].map(h => (h ? h.toString().toLowerCase().trim() : ''));
  const normalize = (v) => (v ? v.toString().toLowerCase().trim() : '');

  const emptyIsNo = new Set([
    'veteran',
    'fc',
    'dt',
    'visual',
    'hearing',
    "alzheimer's / dementia",
    'hiv / aids',
    'physical / medical',
    'mental health',
    'physical / mobility',
    'alcohol abuse',
    'substance abuse'
  ]);

  const matchesSpec = (resident, spec) => {
    if (!spec || !spec.column) return true;

    const columnName = normalize(spec.column);

    // Status: рассчитываем по датам, не по колонке rawData
    if (columnName === 'status') {
      const values = Array.isArray(spec.values) ? spec.values.map(normalize) : [];
      if (spec.combined || values.length === 0) return true;
      const statusLabel = resident.moveOutDate ? 'former residents' : 'current residents';
      return values.includes(statusLabel);
    }

    // Derived "Disability Count"
    if (columnName === 'disability count') {
      const columns = [
        'visual','hearing',"alzheimer's / dementia",'hiv / aids',
        'physical / medical','mental health','physical / mobility',
        'alcohol abuse','substance abuse'
      ];
      const indices = columns.map(name => headers.findIndex(h => h === name)).filter(idx => idx !== -1);
      let count = 0;
      indices.forEach(idx => {
        const v = resident.rawData[idx];
        if (v && v.toString().toLowerCase().trim() === 'yes') count++;
      });
      const bucket = count >= 4 ? '4+' : String(count);
      const values = Array.isArray(spec.values) ? spec.values.map(normalize) : [];
   
      if (spec.combined) return true;
      if (values.length === 0) return true;
      return values.includes(bucket);
    }

    const columnIndex = headers.findIndex(h => h === columnName);
    if (columnIndex === -1) return false;

    const cellValue = normalize(resident.rawData[columnIndex]);
    const values = Array.isArray(spec.values) ? spec.values.map(normalize) : [];
 
    if (spec.combined) {
      if (columnName === 'dt') {
        return cellValue === 'yes' || cellValue === 'no' || cellValue === '';
      }
      if (columnName === 'felonies') {
        return cellValue === 'yes' || cellValue === 'no';
      }
      if (columnName === 'gender') {
        return cellValue === 'male' || cellValue === 'female';
      }
  
      return true;
    }

    if (values.length === 0) {
      return cellValue !== '';
    }

    for (const v of values) {
      if ((columnName === 'income source' || columnName === 'income') && v === 'none') {
        if (cellValue === '' || cellValue === 'none') return true;
      }
      if (columnName === 'felonies') {
        if (v === 'yes' && cellValue === 'yes') return true;
        if (v === 'no' && cellValue === 'no') return true;
        continue;
      }
      if (v === 'yes' && cellValue === 'yes') return true;
      if (v === 'no') {
        if (emptyIsNo.has(columnName)) {
          if (cellValue === 'no' || cellValue === '') return true;
        } else {
          if (cellValue === 'no') return true;
        }
      }
      if (cellValue === v) return true;
    }

    return false;
  };

  const filteredResidents = processedData.filter(resident =>
    filterSpecs.every(spec => matchesSpec(resident, spec))
  );

  const retention = createEmptyRetentionData();
  calculateRetentionForData(filteredResidents, retention);
  return retention;
}