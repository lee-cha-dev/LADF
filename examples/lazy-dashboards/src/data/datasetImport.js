const DEFAULT_MAX_ROWS = 5000;
const DEFAULT_PREVIEW_ROWS = 10;

const trimCell = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'string') {
    return value.trim();
  }
  return String(value);
};

export const sanitizeFieldId = (value, index, used) => {
  const raw = trimCell(value);
  let cleaned = raw.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  cleaned = cleaned.replace(/^_+|_+$/g, '');
  if (!cleaned) {
    cleaned = `column_${index + 1}`;
  }
  if (/^\d/.test(cleaned)) {
    cleaned = `col_${cleaned}`;
  }
  let unique = cleaned;
  let counter = 2;
  while (used.has(unique)) {
    unique = `${cleaned}_${counter}`;
    counter += 1;
  }
  used.add(unique);
  return { id: unique, original: raw, wasSanitized: raw !== unique };
};

const isRowEmpty = (row) =>
  !row.some((cell) => trimCell(cell) !== '');

const normalizeTable = (rows, options = {}) => {
  const maxRows = options.maxRows ?? DEFAULT_MAX_ROWS;
  const previewRows = options.previewRows ?? DEFAULT_PREVIEW_ROWS;
  if (!rows.length) {
    return {
      columns: [],
      rows: [],
      preview: [],
      warnings: ['No rows found in the dataset.'],
      rowCount: 0,
      rawRowCount: 0,
      truncated: false,
      sanitizedHeaders: false,
    };
  }

  const maxColumns = rows.reduce(
    (max, row) => Math.max(max, row.length),
    0
  );
  const headerRow = rows[0] || [];
  const used = new Set();
  let sanitizedHeaders = false;
  const columns = Array.from({ length: maxColumns }).map((_, index) => {
    const { id, original, wasSanitized } = sanitizeFieldId(
      headerRow[index],
      index,
      used
    );
    if (wasSanitized) {
      sanitizedHeaders = true;
    }
    return {
      id,
      label: original || id,
      originalHeader: original,
    };
  });

  const dataRows = rows.slice(1).filter((row) => !isRowEmpty(row));
  const rawRowCount = dataRows.length;
  const truncated = rawRowCount > maxRows;
  const limitedRows = truncated ? dataRows.slice(0, maxRows) : dataRows;

  const formattedRows = limitedRows.map((row) => {
    const record = {};
    columns.forEach((column, index) => {
      record[column.id] = trimCell(row[index]);
    });
    return record;
  });

  return {
    columns,
    rows: formattedRows,
    preview: formattedRows.slice(0, previewRows),
    warnings: [],
    rowCount: formattedRows.length,
    rawRowCount,
    truncated,
    sanitizedHeaders,
  };
};

export const parseCsvText = (text, options = {}) => {
  const rows = [];
  let row = [];
  let value = '';
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        const next = text[i + 1];
        if (next === '"') {
          value += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        value += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(value);
        value = '';
      } else if (char === '\n') {
        row.push(value);
        rows.push(row);
        row = [];
        value = '';
      } else if (char !== '\r') {
        value += char;
      }
    }
    i += 1;
  }

  row.push(value);
  rows.push(row);

  return normalizeTable(rows, options);
};

export const parseRowMatrix = (rows, options = {}) =>
  normalizeTable(rows, options);

export const formatBytes = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
};

export const buildDatasetBinding = ({
  fileName,
  fileSize,
  fileType,
  sheetName,
  sheetNames,
  table,
  fieldProfiles,
}) => ({
  id: `dataset_${Date.now().toString(36)}`,
  importedAt: new Date().toISOString(),
  source: {
    fileName,
    fileSize,
    fileType,
    sheetName: sheetName || null,
    sheetNames: sheetNames || [],
  },
  columns: table.columns,
  rows: table.rows,
  previewRows: table.preview,
  rowCount: table.rowCount,
  rawRowCount: table.rawRowCount,
  truncated: table.truncated,
  warnings: table.warnings,
  sanitizedHeaders: table.sanitizedHeaders,
  fieldProfiles: fieldProfiles || [],
});

export const collectDatasetWarnings = (table) => {
  const warnings = [];
  if (table.sanitizedHeaders) {
    warnings.push(
      'Some headers were empty or duplicated, so they were normalized.'
    );
  }
  if (table.truncated) {
    warnings.push(
      `Loaded the first ${table.rowCount} rows to keep editing responsive.`
    );
  }
  if (table.rowCount === 0) {
    warnings.push('No data rows were found after the header row.');
  }
  return warnings;
};
