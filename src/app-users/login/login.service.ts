import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../admin/users/dto/user.response';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../admin/users/users.service';
import { UserLoginInput } from './dto/create-login.input';
import { UserTokens } from './dto/tokens.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

let saltRounds = 10;
@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async logoutUser(email: string): Promise<boolean> {
    await this.userModel.findByIdAndUpdate(
      { email: email },
      { refreshToken: null },
    );
    return true;
  }

  async loginUser(data: UserLoginInput): Promise<UserTokens> {
    const user = await this.userService.findOneByEmail(data.email);
    if (!user) return;

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) return;
    else {
      const payload = {
        userId: user.id,
        email: user.email,
        userType: user.userType,
      };
      const tokens = await this.createTokens(payload);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashRefreshToken = await bcrypt.hash(refreshToken, saltRounds);
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: hashRefreshToken,
    });
  }

  async createTokens(payload: any): Promise<UserTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      await this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('REFRESH_SECRET'),
        expiresIn: '90d',
      }),
    ]);
    return { accessToken, refreshToken };
  }

  public validateUser(id: string): Promise<User> {
    return this.userService.findOne(id).catch(() => {
      throw new UnauthorizedException();
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const payload = {
      userId: user.id,
      email: user.email,
    };
    const tokens = await this.createTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    if (tokens) return tokens;
  }
  catch(err) {
    throw new InternalServerErrorException('Error in login');
  }
}
