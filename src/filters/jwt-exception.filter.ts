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
    const res = ctx.getResponse<Response>();
    const status = HttpStatus.UNAUTHORIZED;

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.status(status).json({
      statusCode: status,
      message: `jsonwebtoken.${exception.name}: ${exception.message}`,
      error: 'Unauthorized',
    });
  }
}
