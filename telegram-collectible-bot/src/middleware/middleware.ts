import { Request, Response, NextFunction } from "express";
import httpContext from 'express-http-context';

export function loggingBefore(
  request: Request,
  response: Response,
  next: NextFunction,
): any {
  httpContext.set('traceId', 123);
  console.log("do something Before...");
  next();
}

export function loggingAfter(
  request: Request,
  response: Response,
  next: NextFunction,
): any {
  console.log("do something After...");
  console.log(httpContext.get('traceId'));
  next();
}
