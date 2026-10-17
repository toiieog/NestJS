import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './auth/user.entity';
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Tên user MySQL
      password: '',     // Mật khẩu MySQL
      database: 'exam', // Tên database
      entities: [UserEntity, ProductEntity],
      synchronize: false,
    }),
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}