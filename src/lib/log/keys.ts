import type { Debugger } from 'debug';
import { debugLog } from './logger';

export function keys(instance: any, debugFn?: Debugger) {
  const log = debugFn ?? debugLog;
  const keys = getKeys(instance);

  log(keys);
}

function getKeys(instance: any): any {
  if (instance.then) {
    return instance.then(getKeys);
  }

  if (Array.isArray(instance)) {
    return instance.map((item) => getKeys(item));
  }

  // eslint-disable-next-line no-proto
  return Object.keys(instance.__proto__);
}
