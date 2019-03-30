
import storage from '.';

const TOKEN = 'token';
const KEY_USER = 'user';

export const setAuthToken = (token) => storage.saveItem(TOKEN, token);
export const getAuthToken = () => storage.getItem(TOKEN);

export const isLoggedIn = () => {
  if (typeof window.localStorage === 'undefined') {
    return false;
  }
  const token = getAuthToken();
  return token !== null && token !== '';
};

export const removeSession = () => {
  storage.removeItem(TOKEN);
  storage.removeItem(KEY_USER);
};
