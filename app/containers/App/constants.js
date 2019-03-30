/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// Redux types
export const KEY = 'APP';

export const APP_INIT_LOAD = `${KEY}/APP_INIT_LOAD`;
export const APP_LOGOUT = `${KEY}/APP_LOGOUT`;

export const DEFAULT_LOCALE = 'en';
