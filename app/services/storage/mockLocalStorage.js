/* eslint-disable no-proto */
const mockLocalStorage = () => {
  const originalProto = {
    getItem: window.localStorage.__proto__.getItem,
    setItem: window.localStorage.__proto__.setItem,
    removeItem: window.localStorage.__proto__.removeItem,
  };

  const storage = {};

  window.localStorage.__proto__.getItem = jest.fn((key) => storage[key]);
  window.localStorage.__proto__.setItem = jest.fn((key, value) => { storage[key] = value; });
  window.localStorage.__proto__.removeItem = jest.fn((key) => delete storage[key]);

  return () => {
    window.localStorage.__proto__.getItem = originalProto.getItem;
    window.localStorage.__proto__.setItem = originalProto.setItem;
    window.localStorage.__proto__.removeItem = originalProto.removeItem;
  };
};
export default mockLocalStorage;
