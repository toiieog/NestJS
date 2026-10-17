import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Product Management Service')
    .setDescription('Dịch vụ Quản lý sản phẩm (Bài thực hành số 3 - SOA)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = 3001;
  await app.listen(PORT);
  console.log(`Product Service đang chạy tại: http://localhost:${PORT}/api`);
}
bootstrap();