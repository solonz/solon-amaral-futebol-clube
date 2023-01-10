// https://javascript.info/custom-errors

import { NextFunction, Request, Response } from 'express';

export default class CustomErrors extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const ErrorUrlMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { status, message } = err as CustomErrors;

  if (status) {
    return res.status(status || 500).json({ message });
  }
};
