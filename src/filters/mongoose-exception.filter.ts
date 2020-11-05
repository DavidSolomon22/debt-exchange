import { Error } from 'mongoose';
import { Response } from 'express';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch(Error)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    res.status(status).json({
      statusCode: status,
      message: `Mongoose ${exception.name}: ${exception.message}`,
      error: 'Bad Request',
    });
  }
}
