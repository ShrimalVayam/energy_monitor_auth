import { Response } from 'express';
import logger from './logger';

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export function handleError(res: Response, err: unknown, label = 'Error') {
  const message = err instanceof Error ? err.message : 'Unexpected error';
  const statusCode = err instanceof CustomError ? err.statusCode : 500;

  logger.error(`${label}: ${message}`);
  return res.status(statusCode).json({ error: message });
}
