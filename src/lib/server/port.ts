import { normalizePort } from '@server/lib';

export function getPort() {
  return normalizePort(process.env.PORT ?? '3000');
}
