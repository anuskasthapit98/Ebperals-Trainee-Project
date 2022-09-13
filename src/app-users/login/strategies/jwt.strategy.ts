import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAuthService } from '../login.service';
import { User } from '../../../admin/users/dto/user.response';
import { isMongoId } from 'class-validator';
import { ObjectId } from 'mongodb';
import { jwtConstants } from 'src/common/helper/jwtConstants';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(
  Strategy,
  jwtConstants.UserRef,
) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: UserAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('ACCESS_SECRET'),
    });
  }

  public validate(payload: any): Promise<User> {
    const id = payload.sub;
    if (!id && !isMongoId(id)) throw new UnauthorizedException();
    return this.authService.validateUser(new id());
  }
}