/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {

  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host, tunnelStarted) => {
    console.log(`Server started ! ${chalk.green('✓')}`);

    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
(tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : '')}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },

  reqHeaderLog: (req) => {
    const {
      headers, body,
    } = req;
    // const logString = JSON.stringify(obj, null, 2);
    let output = '';
    if (!req) {
      output = `Receiving ${headers} object`;
      logger.error(output);
      return;
    }
    output += `${chalk.bold('---REQUEST---')}
${chalk.bold(chalk.magenta('REQ URL'))}: ${chalk.underline(chalk.bold(chalk.green(`${req.protocol}://${req.get('host')}${req.originalUrl}`)))}
`;

    Object.keys(headers).forEach((key) => {
      let keyColor = requestKeyColorMap[key];
      let valueColor = requestValueColorMap[key];
      if (!keyColor) {
        keyColor = 'magenta';
      }
      if (!valueColor) {
        valueColor = 'cyan';
      }
      output += `${chalk.bold(chalk[keyColor](key))}: ${chalk[valueColor](headers[key])}\n`;
    });

    console.log(output);
    if (body) {
      console.log(body);
    }
  },
};

const requestKeyColorMap = {
  authorization: 'green',
  referer: 'green',
};
const requestValueColorMap = {
  authorization: 'yellow',
  referer: 'yellow',
};

module.exports = logger;
