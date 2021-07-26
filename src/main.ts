import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './shared/config/config.service';
import { ROUTES } from './shared/config/routes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(configService.getValidationOptions());
  app.setGlobalPrefix(ROUTES.MAIN);
  app.useGlobalInterceptors(app.get(Reflector));

  const config = new DocumentBuilder()
    .setTitle('Users and messages')
    .setDescription('Users and messages API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${ROUTES.MAIN}/docs`, app, document);

  await app.listen(configService.getPort());
}
bootstrap();
