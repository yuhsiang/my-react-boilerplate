export const addCommaToSize = (value) => (
  value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
);

export const isFloat = (value) => {
  if (!value) {
    return true;
  }
  return /^[0-9]*\.?[0-9]*([eE]?[-+]?[0-9]+)?$/.test(value);
};

export const isNumber = (value) => {
  const reg = /^-?([1-9][0-9]*)?$/;

  if (value === '') {
    return true;
  }
  if ((!isNaN(value) && reg.test(value)) || value === '-') {
    const number = parseInt(value, 10);
    return !isNaN(number);
  }
  return false;
};

/**
 * @param {string} type Math function, you can use 'round' 'floor' 'ceil'
 * @param {number} inputVal the number you would like to round
 * @param {number} inputExp rounding to nearest 10^x
 * examples
 * roundValueToNearest('round', 123.4567, 1) => 120
 * roundValueToNearest('round', 123.4567, -1) => 123.5
 */
export const roundValueToNearest = (type, inputVal, inputExp) => {
  // If the exp is undefined or zero...
  if (typeof inputExp === 'undefined' || +inputExp === 0) {
    return Math[type](inputVal);
  }
  let value = +inputVal;
  const exp = +inputExp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(`${value[0]}e${(value[1] ? (+value[1] - exp) : -exp)}`));
  // Shift back
  value = value.toString().split('e');
  return +(`${value[0]}e${(value[1] ? (+value[1] + exp) : exp)}`);
};
