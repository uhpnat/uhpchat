import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình CORS cho HTTP (REST API)
  app.enableCors({
    origin: 'http://localhost:3000', // Địa chỉ frontend
    methods: ['GET', 'POST'],
    allowedHeaders: '*',
  });

  // Sử dụng IoAdapter để hỗ trợ WebSocket (Socket.IO)
  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(3001);
}
bootstrap();