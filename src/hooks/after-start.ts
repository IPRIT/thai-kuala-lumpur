import { debugLog } from '@server/lib';

const log = debugLog.extend('after-start');

export function onAfterStart () {
  log('done');
}
