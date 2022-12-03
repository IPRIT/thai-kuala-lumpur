import { PM2_ENABLED } from '@server/const';
import { log } from '@server/lib';

export function onReady () {
  if (PM2_ENABLED) {
    process.send?.('ready');
  }

  log('ready');
}
