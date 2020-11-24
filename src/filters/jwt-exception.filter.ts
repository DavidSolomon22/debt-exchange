import { JsonWebTokenError } from 'jsonwebtoken';
import { Response } from 'express';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(JsonWebTokenError)
export class JwtExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(JwtExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = HttpStatus.UNAUTHORIZED;

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    this.logger.log(
      `jsonwebtoken.${exception.name}: ${exception.message}`,
      exception.stack,
    );

    res.status(status).json({
      statusCode: status,
      message: `jsonwebtoken.${exception.name}: ${exception.message}`,
      error: 'Unauthorized',
    });
  }
}
