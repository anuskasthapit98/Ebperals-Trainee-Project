import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserAuthService } from '../login.service';
import { jwtConstants } from 'src/common/helper/jwtConstants';

@Injectable()
export class UserRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  jwtConstants.Refresh,
) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: UserAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
