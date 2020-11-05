import { MongoError } from 'mongodb';
import { Response } from 'express';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    res.status(status).json({
      statusCode: status,
      message: `${exception.name}: ${exception.message}`,
      error: 'Bad Request',
    });
  }
}
