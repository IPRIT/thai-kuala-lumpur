import type http from 'http';
import { logError } from '@server/lib';

// eslint-disable-next-line no-undef
import ErrnoException = NodeJS.ErrnoException;

/**
 * Event listener for HTTP server "error" event.
 */
export function onError(server: http.Server, error: ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logError('%s requires elevated privileges', bind);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logError('%s is already in use', bind);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
