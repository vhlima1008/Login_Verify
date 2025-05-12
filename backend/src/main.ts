import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1.  HABILITE CORS **antes** de app.listen(...)
  app.enableCors({
    origin: 'http://localhost:5173',   // front Vite
    methods: 'GET,POST,PUT,DELETE',
    credentials: true                 // se um dia precisar de cookies
    // allowedHeaders: 'Content-Type,Authorization', // opcional
  });

  await app.listen(3000);
  console.log('API ouvindo em http://localhost:3000');
}
bootstrap();
