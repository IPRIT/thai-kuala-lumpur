import type { Request } from 'express';

export function getIp(req: Request) {
  return (
    req.ip ||
    req.headers['x-forwarded-for'] ||
    // @ts-ignore
    req._remoteAddress ||
    req.connection?.remoteAddress ||
    req.headers['x-real-ip']
  );
}
