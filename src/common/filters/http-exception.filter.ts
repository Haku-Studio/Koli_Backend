/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BusinessLogService } from 'src/business-log/business-log.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly businessLogService: BusinessLogService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    // Logging des erreurs critiques
    await this.businessLogService.log({
      userId: request['user']?.['id'] || 0,
      action: `ERROR_${status}`,
      entity: request.url,
      meta: {
        method: request.method,
        ip: request['ip'],
        body: request['body'],
        query: request['query'],
        error:
          exception instanceof Error
            ? exception.message
            : JSON.stringify(exception),
      },
    });

    // Réponse uniforme
    response.status(status).json({
      statusCode: status,
      message,
      data: null,
    });
  }
}
