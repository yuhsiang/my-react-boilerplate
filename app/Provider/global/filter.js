export const TYPE_INPUT = 'input';
export const TYPE_SELECTION = 'selection';
export const TYPE_TIME = 'time';
export const TYPE_SEARCH = 'search';
export const TYPE_RANGE = 'range';
export const TYPE_CUSTOM = 'custom';

export const convertFilterToFetchData = (filter, globalFilter, customQuery = () => {}) => {
  const res = [];
  if (globalFilter) {
    res.push(globalFilter);
  }
  for (let i = 0; i < filter.size; i += 1) {
    const item = filter.get(i);
    const type = item.get('type');
    if (TYPE_INPUT === type) {
      if (item.getIn(['detail', 'input'])) {
        res.push(getQueryByInputType(item));
      }
    } else if (TYPE_SELECTION === type) {
      res.push(...getQueriesBySelectionType(item));
    } else if (TYPE_SEARCH === type) {
      res.push(...getQueriesBySearchType(item));
    } else if (TYPE_TIME === type) {
      const query = getQueryByTimeType(item);
      if (query) {
        res.push(query);
      }
    } else if (TYPE_CUSTOM === type) {
      const query = customQuery(item);
      if (query) {
        res.push(query);
      }
    } else {
      res.push(item);
    }
  }
  return res;
};

const getQueryByInputType = (item) => (
  {
    field: item.get('value'),
    operator: item.getIn(['operation', 'value']),
    value: item.getIn(['detail', 'input']),
  }
);

const getQueryByTimeType = (item) => {
  const time = item.getIn(['detail', 'time']);
  let value = null;

  if (time !== null) {
    value = parseTimeToDateTime(time.valueOf()) / 1000;
    return {
      field: item.get('value'),
      operator: item.getIn(['operation', 'value']),
      value,
    };
  }
  return null;
};

const parseTimeToDateTime = (time) => {
  const temp = new Date(time);
  const date = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
  return date.getTime();
};

const getQueriesBySelectionType = (item) => {
  const res = [];
  const selected = item.getIn(['detail', 'selected']);
  for (let i = 0; i < selected.size; i += 1) {
    const select = selected.get(i);
    const operator = item.getIn(['operation', 'value']) || 'EQ';

    // only in availability
    // bad code should be fixed
    const query = {
      field: select.get('value'),
      operator,
      value: 1,
    };
    res.push(query);
  }
  return res;
};

const getQueriesBySearchType = (item) => {
  const res = [];
  const inputs = item.getIn(['detail', 'input']);
  for (let i = 0; i < inputs.size; i += 1) {
    const adId = inputs.get(i);
    const operator = item.getIn(['operation', 'value']) || 'EQ';
    const query = {
      field: item.get('value'),
      operator,
    };
    query.value = adId;
    res.push(query);
  }
  return res;
};
