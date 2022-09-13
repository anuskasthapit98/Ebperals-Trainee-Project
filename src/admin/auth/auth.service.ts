import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Admin } from '../admins/dto/admin.response';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from '../admins/admin.service';
import { AdminLoginInput } from './dto/create-login.input';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Tokens } from './dto/tokens.dto';
import { InjectModel } from '@nestjs/mongoose';
import { jwtConstants } from 'src/common/helper/jwtConstants';
import { CreateAdminInput } from '../admins/dto/create-admin.input';
import { ForgotPassword } from './dto/forgot-password.dto';

let saltRounds = 10;
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
    @InjectModel('ForgottenPassword')
    private readonly forgottenPasswordModel: Model<ForgotPassword>,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private config: ConfigService,
  ) {}

  public validateAdmin(id: string): Promise<Admin> {
    return this.adminService.findOne(id).catch(() => {
      throw new UnauthorizedException();
    });
  }

  async addAdmin(createAdmin: CreateAdminInput): Promise<Tokens> {
    // Check if user exists
    const userExists = await this.adminService.findOneByEmail(
      createAdmin.email,
    );

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const newUser = await this.adminService.createAdmin(createAdmin);
    const payload = {
      userId: newUser.id,
      email: newUser.email,
    };
    const tokens = await this.createTokens(payload);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async logoutAdmin(email: string): Promise<boolean> {
    await this.adminModel.findByIdAndUpdate(
      { email: email },
      { refreshToken: null },
    );
    return true;
  }

  async loginAdmin(data: AdminLoginInput): Promise<Tokens> {
    const admin = await this.adminService.findOneByEmail(data.email);
    if (!admin) return;

    const passwordMatch = await bcrypt.compare(data.password, admin.password);
    if (!passwordMatch) return;
    else {
      const payload = {
        adminId: admin.id,
        email: admin.email,
      };
      const tokens = await this.createTokens(payload);
      await this.updateRefreshToken(admin.id, tokens.refreshToken);
      return tokens;
    }
  }

  async updateRefreshToken(adminId: string, refreshToken: string) {
    const hashRefreshToken = await bcrypt.hash(refreshToken, saltRounds);
    await this.adminModel.findByIdAndUpdate(adminId, {
      refreshToken: hashRefreshToken,
    });
  }

  async createTokens(payload: any): Promise<Tokens> {
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

  async refreshTokens(adminId: string, refreshToken: string) {
    const admin = await this.adminService.findOne(adminId);
    if (!admin || !admin.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      admin.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const payload = {
      adminId: admin.id,
      email: admin.email,
    };
    const tokens = await this.createTokens(payload);
    await this.updateRefreshToken(admin.id, tokens.refreshToken);
    if (tokens) return tokens;
  }
  catch(err) {
    throw new InternalServerErrorException('Error in login');
  }
}
