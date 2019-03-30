import {
  mixinSideMenuSize,
  WIDTH_SMALL_SCREEN,
} from 'containers/MainPage/Styled';

export const NUM_ITEM_PER_PAGE = 20;
export const LIMIT_LIST = [
  10, 20, 40, 100,
];

const DEFAULT_TABLE_MIN_WIDTH = 768;

export const getTableMinimumWidth = (isMenuOpen) => {
  let width = DEFAULT_TABLE_MIN_WIDTH;
  if (window) {
    if (window.innerWidth > WIDTH_SMALL_SCREEN) {
      width = window.innerWidth - mixinSideMenuSize({ isMenuOpen });
    } else {
      width = window.innerWidth - mixinSideMenuSize({ isMenuOpen: false });
    }
  }
  if (width < DEFAULT_TABLE_MIN_WIDTH) {
    return DEFAULT_TABLE_MIN_WIDTH;
  }
  return width;
};

export const selectedIdsToList = (selectedIds) => {
  if (!selectedIds) {
    return null;
  }
  const list = selectedIds.keySeq().toList();
  return list.filter((item) => selectedIds.get(item) && item !== 'all');
};
