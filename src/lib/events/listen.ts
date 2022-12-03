import { colorify, EFontStyle, log } from '@server/lib';
import type http from 'http';

/**
 * Event listener for HTTP server "listening" event.
 */
export function onListening(server: http.Server): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;

  log(
    `${colorify('Listening on %s', EFontStyle.GREEN)} ` + `(${colorify('%s', EFontStyle.CYAN)})`,
    bind,
    process.env.NODE_ENV
  );
}
