import { debug as debugFn } from 'debug';
import path from 'path';

const cwd = process.cwd();
const ns = path.basename(cwd);

const stdout = createStdout(ns);
const stderr = createStderr(ns);

export const debugLog = stdout.extend('debug');
export const log = stdout.extend('log');
export const logError = stderr.extend('log').extend('error');

export function createStderr(namespace: string) {
  return debugWithLog(namespace, console.error.bind(console));
}

export function createStdout(namespace: string) {
  return debugWithLog(namespace, console.log.bind(console));
}

export function debugWithLog(namespace: string, logFn: any) {
  const output = debugFn(namespace);
  output.log = logFn;
  return output;
}
