const minimist = require('minimist');
const colors = require('colors/safe');
const AWSPasswordReset = require('./src/lib');

const args = minimist(process.argv.slice(2));
console.log(args);
const { username }  = args;

/* eslint-disable no-console */
if (!username) {
  console.error(colors.red('Username is required'));
  process.exit(1);
}

AWSPasswordReset
  .reset(username)
  .then(() => {
    console.log(colors.green('Done'));
  });

process.on('uncaughtException', ({ stack }, origin) => {
  console.log(
    colors.red(`Uncaught Exception from ${origin}: ${stack}`),
  );
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.log(
    colors.red(`Unhandled Promise Rejection: ${JSON.stringify(error)}`),
  );
  process.exit(1);
});
