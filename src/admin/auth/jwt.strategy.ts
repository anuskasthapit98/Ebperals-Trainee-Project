import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Admin } from '../admins/dto/admin.response';
import { isMongoId } from 'class-validator';
import { ObjectId } from 'mongodb';
import { jwtConstants } from 'src/common/helper/jwtConstants';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  jwtConstants.AdminRef,
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

  public validate(payload: any): Promise<Admin> {
    const id = payload.sub;
    if (!id && !isMongoId(id)) throw new UnauthorizedException();
    return this.authService.validateAdmin(id);
  }
}
