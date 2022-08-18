import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Admin } from '../admins/dto/admin.response';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from '../admins/admin.service';
import { LoginInput } from './dto/create-login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(dto: LoginInput): Promise<string> {
    const user = await this.adminService.findOneByEmail(dto.email);
    if (!user) throw new BadRequestException(`Incorrect email`);
    const isPassCorrect = await bcrypt.compare(dto.password, user.password);
    if (!isPassCorrect) throw new BadRequestException('Incorrect password');
    return this.jwtService.sign({ sub: user._id });
  }

  public validateUser(id: string): Promise<Admin> {
    return this.adminService.findOne(id).catch(() => {
      throw new UnauthorizedException();
    });
  }


  
}
