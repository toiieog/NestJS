import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ) { }

    async login(userName: string, pass: string) {
        // Mã hóa mật khẩu truyền lên thành chuẩn Base64 (để khớp với mô tả client gửi lên đã mã hóa)
        const encodedPassword = Buffer.from(pass).toString('base64');

        // Tìm kiếm user trong MySQL theo cột username
        const user = await this.userRepository.findOne({ where: { username: userName } });

        if (!user || user.password !== encodedPassword) {
            throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
        }

        const payload = { username: user.username, role: 'admin' };
        const accessToken = this.jwtService.sign(payload);

        // Lưu token ngược lại vào cột token trong database
        user.token = accessToken;
        await this.userRepository.save(user);

        return {
            access_token: accessToken,
        };
    }
}
