const NEW_LINE = '\r\n';

export const escapeColumn = (column) => {
  if (column === null || typeof column === 'undefined') {
    return '';
  }
  if (Number.isFinite(column)) {
    return column;
  }
  const res = column.replace(/"/g, '""'); // prevent double escape
  if (res.search(/("|,|\n)/g) >= 0) {
    return `"${res}"`;
  }
  return res;
};

export const allRowDataToCSVString = (rowData) => {
  let res = '';
  if (rowData && !rowData.size) {
    return res;
  }
  rowData.forEach((data, index) => {
    const name = data.get('name');
    if (index === 0) {
      res += `${name}${NEW_LINE}${rowDataToCSVString(data)}${NEW_LINE}`;
      return;
    }
    res += `${NEW_LINE}${NEW_LINE}${name}${NEW_LINE}${rowDataToCSVString(data)}${NEW_LINE}`;
  });
  return res;
};

export const rowDataToCSVString = (selectedRowData) => {
  const rows = selectedRowData.get('rows');
  const headerNames = selectedRowData.get('header_names');
  const res = `${headerNames.join(',')}${NEW_LINE}${rows.map(((row) => row.map(escapeColumn).join(','))).join(NEW_LINE)}`;
  return res;
};

export const downloadCSV = (csvString, fname) => {
  const link = window.document.createElement('a');
  link.setAttribute('href', `data:text/csv;charset=utf-8,%EF%BB%BF${encodeURI(csvString)}`);
  link.setAttribute('download', `${fname}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadBlob = (blob, fname = 'export.zip') => {
  if (!window || !window.document || !window.URL) {
    return;
  }
  const link = window.document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', fname);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
