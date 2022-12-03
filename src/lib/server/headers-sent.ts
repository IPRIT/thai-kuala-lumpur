import type { Response } from 'express';

export function headersSent(res: Response): boolean {
  return typeof res.headersSent !== 'boolean'
    ? // @ts-ignore
      Boolean(res._header)
    : res.headersSent;
}
