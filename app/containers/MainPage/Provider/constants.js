/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */


export const KEY_REDUCER = 'MainPage';

export const GET_INDEX_PAGE = `${KEY_REDUCER}/GET_INDEX_PAGE`;
export const SET_INDEX_PAGE = `${KEY_REDUCER}/SET_INDEX_PAGE`;

export const GET_PAGE = `${KEY_REDUCER}/GET_PAGE`;

export const KEY_LIST_STATE = 'listState';
export const KEY_DETAIL_STATE = 'detailState';

export const OPEN_DETAIL = `${KEY_REDUCER}/OPEN_DETAIL`;
export const CLOSE_DETAIL = `${KEY_REDUCER}/CLOSE_DETAIL`;
export const SET_DETAIL = `${KEY_REDUCER}/SET_DETAIL`;

export const FETCH_DETAIL = `${KEY_REDUCER}/FETCH_DETAIL`;
