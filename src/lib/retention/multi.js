import { createEmptyRetentionData, calculateRetentionForData } from '@/lib/retention/base';

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

    // Status: derived from moveOutDate
    if (columnName === 'status') {
      const values = Array.isArray(spec.values) ? spec.values.map(normalize) : [];
      if (spec.combined || values.length === 0) return true;
      const statusLabel = resident.moveOutDate ? 'former residents' : 'current residents';
      return values.includes(statusLabel);
    }

    // Disability Count: count "Yes" across disability columns, bucket: 0,1,2,3,4+
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

    // Age: compute from Birth Year; buckets align with UI names
    if (columnName === 'age') {
      const birthYearIndex = headers.findIndex(h => h === 'birth year');
      if (birthYearIndex === -1) return false;

      const rawBirthYear = resident.rawData[birthYearIndex];
      const birthYear = rawBirthYear ? parseInt(rawBirthYear.toString().trim(), 10) : NaN;
      if (Number.isNaN(birthYear)) return false;

      const nowYear = new Date().getFullYear();
      const age = nowYear - birthYear;

      let bucket = '';
      if (age >= 18 && age <= 24) bucket = 'young adult';
      else if (age >= 25 && age <= 34) bucket = 'youth';
      else if (age >= 35 && age <= 44) bucket = 'mid-age';
      else if (age >= 45 && age <= 54) bucket = 'mid-age +';
      else if (age >= 55 && age <= 64) bucket = 'mature';
      else if (age >= 65) bucket = 'seniors';

      const values = Array.isArray(spec.values) ? spec.values.map(normalize) : [];
      if (spec.combined) return true;
      if (values.length === 0) return bucket !== '';
      return values.includes(bucket);
    }

    // AB Score: numeric bucket to None, 1-6, 7-9, 10-12, 13+
    if (columnName === 'ab score') {
      const abIndex = headers.findIndex(h => h === 'ab score');
      if (abIndex === -1) return false;

      const raw = resident.rawData[abIndex];
      const str = raw ? raw.toString().trim() : '';
      const values = Array.isArray(spec.values) ? spec.values.map(normalize) : [];
      if (spec.combined) return true;
      if (values.length === 0) return true;

      const normStr = normalize(str);
      let bucket = 'none';
      if (normStr !== '' && normStr !== 'none') {
        const n = parseInt(str, 10);
        if (!Number.isNaN(n)) {
          if (n >= 13) bucket = '13+';
          else if (n >= 10) bucket = '10-12';
          else if (n >= 7) bucket = '7-9';
          else if (n >= 1) bucket = '1-6';
          else bucket = 'none';
        } else {
          bucket = 'none';
        }
      }
      return values.includes(bucket.toLowerCase());
    }

    // YCH: numeric bucket to 1-2, 3-4, 5-7, 8-14, 15+
    if (columnName === 'ych') {
      const ychIndex = headers.findIndex(h => h === 'ych');
      if (ychIndex === -1) return false;

      const raw = resident.rawData[ychIndex];
      const str = raw ? raw.toString().trim() : '';
      const values = Array.isArray(spec.values) ? spec.values.map(normalize) : [];
      if (spec.combined) return true;
      if (values.length === 0) return str !== '';

      const n = parseInt(str, 10);
      if (Number.isNaN(n)) return false;

      let bucket = '';
      if (n >= 15) bucket = '15+';
      else if (n >= 8) bucket = '8-14';
      else if (n >= 5) bucket = '5-7';
      else if (n >= 3) bucket = '3-4';
      else if (n >= 1) bucket = '1-2';

      if (bucket === '') return false;
      return values.includes(bucket.toLowerCase());
    }

    // Deceased: inferred from Move-Out Reason
    if (columnName === 'deceased') {
      const moveOutReasonIndex = headers.findIndex(h => h === 'move-out reason' || h === 'move out reason');
      if (moveOutReasonIndex === -1) return false;
      const raw = resident.rawData[moveOutReasonIndex];
      const val = raw ? raw.toString().trim() : '';
      const values = Array.isArray(spec.values) ? spec.values.map(normalize) : [];
      if (spec.combined) return true;
      if (values.length === 0) return true;
      const norm = normalize(val);
      const hasYes = values.includes('yes');
      const hasNo = values.includes('no');
      if (hasYes && hasNo) return true;
      if (hasYes) return norm.includes('deceased');
      if (hasNo) return norm === '' || !norm.includes('deceased');
      return false;
    }

    // Agency: CM Agency column with None/Unknown support
    if (columnName === 'agency' || columnName === 'cm agency') {
      const cmIndex = headers.findIndex(h => h === 'cm agency');
      if (cmIndex === -1) return false;

      const rawCell = resident.rawData[cmIndex];
      const cellValue = normalize(rawCell ? rawCell.toString().trim() : '');
      const values = Array.isArray(spec.values) ? spec.values.map(normalize) : [];
      if (spec.combined) return true;
      if (values.length === 0) return cellValue !== '';

      for (const v of values) {
        if (v === 'none') {
          if (cellValue === 'none') return true;
          continue;
        }
        if (v === 'unknown') {
          if (cellValue === 'unknown') return true;
          continue;
        }
        if (cellValue === v) return true;
      }
      return false;
    }

    // Monthly Income: parse numeric and bucket to $0, $1-750, $751-1000, $1001-1500, $1501+
    if (columnName === 'monthly income') {
      const incomeIndex = headers.findIndex(h =>
        h === 'monthly income' ||
        h === 'income $' ||
        h === 'monthly income $' ||
        (h.includes('income') && h.includes('$'))
      );
      if (incomeIndex === -1) return false;

      const raw = resident.rawData[incomeIndex];
      const str = raw ? raw.toString().trim() : '';
      const values = Array.isArray(spec.values) ? spec.values.map(normalize) : [];

      if (spec.combined) return true;
      if (values.length === 0) {
        const digits = str.replace(/[^0-9]/g, '');
        const n = digits ? parseInt(digits, 10) : null;
        return n != null && !Number.isNaN(n);
      }

      const digits = str.replace(/[^0-9]/g, '');
      const n = digits ? parseInt(digits, 10) : null;
      if (n == null || Number.isNaN(n)) return false;

      let bucket = '';
      if (n === 0) bucket = '$0';
      else if (n >= 1 && n <= 750) bucket = '$1-750';
      else if (n >= 751 && n <= 1000) bucket = '$751-1000';
      else if (n >= 1001 && n <= 1500) bucket = '$1001-1500';
      else if (n >= 1501) bucket = '$1501+';

      return values.includes(bucket.toLowerCase());
    }

    // Generic Yes/No and equality handling for other columns
    const columnIndex = headers.findIndex(h => h === columnName);
    if (columnIndex === -1) return false;

    let cellValue = normalize(resident.rawData[columnIndex]);
    if (columnName === 'dt' && cellValue === 'y') {
      cellValue = 'yes';
    }
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
      // special-case: Income Source "None" should match empty/None
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

  const filteredResidents = [];
  const excludedResidents = [];

  processedData.forEach(resident => {
    const allMatch = filterSpecs.every(spec => matchesSpec(resident, spec));
    if (allMatch) {
      filteredResidents.push(resident);
    } else {
      const failures = filterSpecs
        .filter(spec => !matchesSpec(resident, spec))
        .map(spec => {
          const col = normalize(spec.column);
          const specValues = Array.isArray(spec.values) ? spec.values : [];

          if (col === 'age') {
            const birthYearIndex = headers.findIndex(h => h === 'birth year');
            const rawBirthYear = birthYearIndex !== -1 ? resident.rawData[birthYearIndex] : null;
            const birthYear = rawBirthYear ? parseInt(rawBirthYear.toString().trim(), 10) : NaN;
            const nowYear = new Date().getFullYear();
            const age = Number.isNaN(birthYear) ? null : nowYear - birthYear;
            let bucket = '';
            if (age != null) {
              if (age >= 18 && age <= 24) bucket = 'young adult';
              else if (age >= 25 && age <= 34) bucket = 'youth';
              else if (age >= 35 && age <= 44) bucket = 'mid-age';
              else if (age >= 45 && age <= 54) bucket = 'mid-age +';
              else if (age >= 55 && age <= 64) bucket = 'mature';
              else if (age >= 65) bucket = 'seniors';
            }
            return { column: spec.column, values: specValues, birthYear: rawBirthYear ?? null, age, bucket };
          }

          if (col === 'disability count') {
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
            return { column: spec.column, values: specValues, count, bucket };
          }

          if (col === 'status') {
            const statusLabel = resident.moveOutDate ? 'former residents' : 'current residents';
            return { column: spec.column, values: specValues, statusLabel };
          }

          if (col === 'ab score') {
            const abIndex = headers.findIndex(h => h === 'ab score');
            const raw = abIndex !== -1 ? resident.rawData[abIndex] : null;
            const str = raw ? raw.toString().trim() : '';
            const normStr = normalize(str);
            let bucket = 'none';
            let parsed = null;

            if (normStr !== '' && normStr !== 'none') {
              const n = parseInt(str, 10);
              parsed = Number.isNaN(n) ? null : n;
              if (parsed != null) {
                if (parsed >= 13) bucket = '13+';
                else if (parsed >= 10) bucket = '10-12';
                else if (parsed >= 7) bucket = '7-9';
                else if (parsed >= 1) bucket = '1-6';
                else bucket = 'none';
              } else {
                bucket = 'none';
              }
            }

            return { column: spec.column, values: specValues, rawValue: str, parsed, bucket };
          }

          if (col === 'ych') {
            const ychIndex = headers.findIndex(h => h === 'ych');
            const raw = ychIndex !== -1 ? resident.rawData[ychIndex] : null;
            const str = raw ? raw.toString().trim() : '';
            const n = parseInt(str, 10);
            let bucket = '';
            const parsed = Number.isNaN(n) ? null : n;

            if (parsed != null) {
              if (parsed >= 15) bucket = '15+';
              else if (parsed >= 8) bucket = '8-14';
              else if (parsed >= 5) bucket = '5-7';
              else if (parsed >= 3) bucket = '3-4';
              else if (parsed >= 1) bucket = '1-2';
            }

            return { column: spec.column, values: specValues, rawValue: str, parsed, bucket };
          }

          if (col === 'deceased') {
            const moveOutReasonIndex = headers.findIndex(h => h === 'move-out reason' || h === 'move out reason');
            const raw = moveOutReasonIndex !== -1 ? resident.rawData[moveOutReasonIndex] : null;
            const str = raw ? raw.toString().trim() : '';
            const hasDeceased = normalize(str).includes('deceased');
            return { column: spec.column, values: specValues, rawValue: str, hasDeceased };
          }

          const columnIndex = headers.findIndex(h => h === col);
          const cell = columnIndex !== -1 ? resident.rawData[columnIndex] : null;
          const cellValue = cell ? cell.toString().toLowerCase().trim() : '';
          return { column: spec.column, values: specValues, cellValue };
        });

      excludedResidents.push({ resident, failures });
    }
  });

  const retention = createEmptyRetentionData();
  calculateRetentionForData(filteredResidents, retention);
  return retention;
}
