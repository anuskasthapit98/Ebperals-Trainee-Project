import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

import { jwtConstants } from 'src/common/helper/jwtConstants';
import { Admin } from 'src/admin/admins/dto/admin.response';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('ACCESS_SECRET'),
    });
  }

  validate(payload: any): Promise<Admin> {
    console.log(payload);
    const id = payload.adminId;
    if (!id) throw new UnauthorizedException();
    return this.authService.validateAdmin(id);
  }
}
