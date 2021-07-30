import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './shared/config/config.service';
import { ROUTES } from './shared/config/routes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(configService.getValidationOptions());
  app.setGlobalPrefix(ROUTES.MAIN);

  const config = new DocumentBuilder()
    .setTitle('Users and messages')
    .setDescription('Users and messages API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access_token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'My API Docs',
  };
  SwaggerModule.setup(`${ROUTES.MAIN}/docs`, app, document, customOptions);

  await app.listen(configService.getPort());
}
bootstrap();
