import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Dịch vụ đăng nhập trả về JWT Token' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                userName: { type: 'string', example: '' },
                pass: { type: 'string', example: '' },
            },
        },
    })
    async login(@Body() body: { userName: string; pass: string }) {
        return this.authService.login(body.userName, body.pass);
    }
}
