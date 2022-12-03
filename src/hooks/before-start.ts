import { debugLog } from '@server/lib';

const log = debugLog.extend('before-start');

export function onBeforeStart () {
  log('done');
}
