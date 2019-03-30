import {
  SORT_DIRECT_DOWN,
  SORT_DIRECT_UP,
} from 'Provider/dataReducer/constants';

export const sortDesc = (fnGetValue) => (a, b) => {
  const prev = fnGetValue(a);
  const cur = fnGetValue(b);
  if (prev === cur) return 0;
  return prev < cur ? 1 : -1;
};
export const sortAsce = (fnGetValue) => (a, b) => {
  const prev = fnGetValue(a);
  const cur = fnGetValue(b);
  if (prev === cur) return 0;
  return prev > cur ? 1 : -1;
};

export const sortList = (sortOption, list) => {
  const id = sortOption.get('id');
  const type = sortOption.get('type');
  const valueGetter = (item) => item.get(id);
  if (type === SORT_DIRECT_DOWN) {
    return list.sort(sortDesc(valueGetter));
  }
  if (type === SORT_DIRECT_UP) {
    return list.sort(sortAsce(valueGetter));
  }
  return list;
};
