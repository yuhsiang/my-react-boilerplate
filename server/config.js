const dotenv = require('dotenv');

const config = {
  init: () => {
    dotenv.config();
  },
};
module.exports = config;
