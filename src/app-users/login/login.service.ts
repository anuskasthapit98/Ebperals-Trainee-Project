import { Injectable } from '@nestjs/common';
import { CreateLoginInput } from './dto/create-login.input';

@Injectable()
export class LoginService {
  create(createLoginInput: CreateLoginInput) {
    return 'This action adds a new login';
  }
}
