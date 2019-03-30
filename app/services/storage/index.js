const saveItem = (key, item) => {
  if (typeof localStorage === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.warn(e);
  }
};

const getItem = (key) => {
  if (typeof localStorage === 'undefined') {
    return '';
  }
  if (!key) {
    throw new Error('should provide a valid key');
  }
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.warn(e);
  }
  return '';
};

const removeItem = (key) => {
  if (typeof localStorage === 'undefined') {
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(e);
  }
};

export default {
  saveItem,
  getItem,
  removeItem,
};
