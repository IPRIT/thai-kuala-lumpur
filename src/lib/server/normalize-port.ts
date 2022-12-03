/**
 * Normalize a port into a number, string, or false.
 */
export function normalizePort(value: string) {
  const p = parseInt(value, 10);

  if (isNaN(p)) {
    // named pipe
    return value;
  }

  if (p >= 0) {
    // port number
    return p;
  }

  return false;
}
