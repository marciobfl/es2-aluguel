import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CustomValidationPipe from './common/pipes/error-validation.pipe';
import { AppErrorFilter } from './common/filters/app-error.filter';
import { CustomErrorValidationFilter } from './common/filters/error-validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    preflightContinue: true,
  });
  app.useGlobalPipes(CustomValidationPipe);
  app.useGlobalFilters(new AppErrorFilter());
  app.useGlobalFilters(new CustomErrorValidationFilter());
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
