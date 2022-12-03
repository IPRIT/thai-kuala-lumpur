import { colorify, debugLog, EFontStyle } from '@server/lib';

export async function onProcessMessage(msg: string) {
  debugLog('Got a message from the process', colorify(msg, EFontStyle.RED));

  if (msg === 'shutdown') {
    process.exit(0);
  }
}
