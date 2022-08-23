import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Admin } from '../admins/dto/admin.response';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from '../admins/admin.service';
import { LoginInput } from './dto/create-login.input';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Tokens } from './dto/tokens.dto';
import { InjectModel } from '@nestjs/mongoose';
import { jwtConstants } from 'src/common/helper/jwtConstants';

let saltRounds = 10;
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async logoutUser(email: string): Promise<boolean> {
    await this.adminModel.findByIdAndUpdate(
      { email: email },
      { refreshToken: null },
    );
    return true;
  }

  async loginUser(data: LoginInput): Promise<Tokens> {
    const user = await this.adminService.findOneByEmail(data.email);

    if (!user) return;

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) return;
    else {
      const payload = {
        userId: user.id,
        email: user.email,
      };

      const tokens = await this.createTokens(payload);

      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    }
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<boolean> {
    const user = await this.adminModel.findById(userId);
    console.log(user);
    const hashRefreshToken = await bcrypt.hash(refreshToken, saltRounds);
    const newUser = await await this.adminModel.findByIdAndUpdate(userId, {
      refreshToken: hashRefreshToken,
    });

    // const newUser = await this.userModel.findById(userId)
    console.log(await newUser.save());

    return true;
  }

  async createTokens(payload: any): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: '15m',
      }),
      await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: '90d',
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async refreshToken(email: string): Promise<Tokens> {
    const tokens = await this.createTokens(email);

    await this.updateRefreshToken(email, tokens.refreshToken);
    return tokens;
  }

  public validateAdmin(id: string): Promise<Admin> {
    return this.adminService.findOne(id).catch(() => {
      throw new UnauthorizedException();
    });
  }
}
