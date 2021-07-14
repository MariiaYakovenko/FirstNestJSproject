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

  // const config=new DocumentBuilder()
  //   .setTitle('Users and messages')
  //   .setDescription('Users and messages API description')
  //   .setVersion('1.0')
  //   .addTag('users')
  //   .build();
  // const document=SwaggerModule.createDocument(app,config);
  // SwaggerModule.setup('api', app, document);
  //
  // await  app.listen(3000);
}
bootstrap();
