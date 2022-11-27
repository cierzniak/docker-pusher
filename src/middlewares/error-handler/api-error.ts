export class ApiError extends Error {
  readonly statusCode: number;

  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
    Error.captureStackTrace(this, this.constructor);
  }
}
