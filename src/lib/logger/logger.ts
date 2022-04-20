import chalk from 'chalk';
import { __TEST__ } from 'lib/assertion';
import { functionString, runIf } from 'lib/function';
import { prettyString } from 'lib/pretty';
import { Dict } from 'lib/types';

export type LogFunction = (message?: any, ...optionalParams: any[]) => void;

const white = chalk.whiteBright;

/** Using chalk + console + only logging when NODE_ENV is not 'test'
 */
function makeLogFunction(logFunction: LogFunction = console.log, color: chalk.Chalk = white.bold): LogFunction {
  return (...args: Parameters<LogFunction>) => runIf(!__TEST__, () => logFunction('\n' + color(...args) + '\n'));
}

const logFn = (callee: string, args: Dict) => {
  logger.info(functionString(callee, args));
};

const prettyError = (msg: string) => {
  return chalk.redBright.bold(`\n❌ ${prettyString(msg)}\n`);
};

const logError = (msg: any, ...rest: any[]) => {
  logger.error(prettyError(msg), ...rest);
};

const logFnError = (callee: string, args: Dict, error: any) => {
  logger.error(prettyError(functionString(callee, args)), error);
};

export const logger = {
  debug: makeLogFunction(console.log, white.bold),
  info: makeLogFunction(console.info, white),
  warn: makeLogFunction(console.warn, chalk.hex('#ff9900').bold),
  error: logError,
  success: makeLogFunction(console.log, white.bold),
  time: console.time,
  timeEnd: console.timeEnd,
  section: makeLogFunction(console.log),
  fn: logFn,
  fnError: logFnError,
};
