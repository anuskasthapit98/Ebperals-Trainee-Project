import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAuthService } from '../login.service';
import { User } from '../../../admin/users/dto/user.response';


@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: UserAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('USER_ACCESS_SECRET'),
    });
  }

  public validate(payload: any): Promise<User> {
    const id = payload.userId;
    if (!id) throw new UnauthorizedException();
    return this.authService.validateUser(id);
  }
}
