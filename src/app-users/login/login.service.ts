import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../admin/users/dto/user.response';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../admin/users/users.service';
import { LoginInput } from './dto/create-login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(dto: LoginInput): Promise<string> {
    const user = await this.userService.findOneByEmail(dto.email);
    if (!user) throw new BadRequestException(`Incorrect email`);
    const isPassCorrect = await bcrypt.compare(dto.password, user.password);
    if (!isPassCorrect) throw new BadRequestException('Incorrect password');
    return this.jwtService.sign({ sub: user._id });
  }

  public validateUser(id: string): Promise<User> {
    return this.userService.findOne(id).catch(() => {
      throw new UnauthorizedException();
    });
  }
}
