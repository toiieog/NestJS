import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy token từ Header dạng Bearer Token
      ignoreExpiration: false,
      secretOrKey: 'BI_MAT_CUA_NHOM',
    });
  }

  async validate(payload: any) {
    return { username: payload.username, role: payload.role };
  }
}