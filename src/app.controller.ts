import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard) // Bắt buộc phải có token mới gọi được
  @ApiBearerAuth() // Hiển thị nút nhập Token trên giao diện Swagger
  @ApiOperation({ summary: 'API Hello World được bảo vệ bởi JWT Middleware' })
  getHello(): string {
    return this.appService.getHello();
  }
}
