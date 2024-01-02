import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup swagger docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Edusex')
    .setDescription('Edusex API Documentation')
    .setVersion('1.0')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDoc, {
    swaggerOptions: {
      // Hide schema
      defaultModelsExpandDepth: -1,
    },
  });

  app.enableCors({
    origin: ['https://edusex.vercel.app'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
