import { JsonWebTokenError } from 'jsonwebtoken';
import { Response } from 'express';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch(JsonWebTokenError)
export class JwtExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.UNAUTHORIZED;

    response.status(status).json({
      code: status,
      message: `jsonwebtoken ${exception.name}: ${exception.message}`,
      error: 'Unauthorized',
    });
  }
}
