const padTwoDigit = (num) => `0${num}`.slice(-2);
export const getDate = (time) => {
  const d = new Date(time);
  return `${d.getFullYear()}/${padTwoDigit(d.getMonth() + 1)}/${padTwoDigit(d.getDate())}`;
};
