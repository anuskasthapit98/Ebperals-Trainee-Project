import { Injectable } from '@nestjs/common';
import { CreateClockInInput } from './dto/create-clock-in.input';

@Injectable()
export class ClockInService {
  create(createClockInInput: CreateClockInInput) {
    return 'This action adds a new clockIn';
  }
}
