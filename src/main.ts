import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { BusinessLogService } from './business-log/business-log.service';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  // Intercepteur de réponse
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Filtre global d'erreurs (avec injection manuelle)
  const businessLogService = app.get(BusinessLogService);
  app.useGlobalFilters(new GlobalExceptionFilter(businessLogService));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
