import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './shared/config/config.service';
import { ROUTES } from './shared/config/routes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.getPort());

  // app.use(morgan('tiny'));
  // const options = new DocumentBuilder()
  //   .setTitle('ThePij Project REST Docs')
  //   .setDescription('REST docs for ThePij Project Api')
  //   .setVersion('1.0')
  //   .addTag(ROUTES.USER.MAIN)
  //   .addTag(ROUTES.AUTH.MAIN)
  //   .addTag(ROUTES.PROJECT.MAIN)
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('/docs', app, document);
  // app.useGlobalFilters(new DispatchError());
  //
  // await app.listen(configService.getPort());
}
bootstrap();
