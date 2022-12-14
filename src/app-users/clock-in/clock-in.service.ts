import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClockIn } from './dto/clockin.response';
import { CreateClockInInput } from './dto/create-clock-in.input';
import { CurrentUser } from '../login/decorators/current-user.decorator';
@Injectable()
export class ClockInService {
  constructor(
    @InjectModel('ClockIn') private readonly clockInModel: Model<ClockIn>,
  ) {}

  async addClockIn(
    CurrentUser: any,
    clockIn: CreateClockInInput,
  ): Promise<ClockIn> {
    const userId = CurrentUser._id;
    const newClockIn = { ...clockIn, userId };
    const addClockInData = await this.clockInModel.create(newClockIn);
    return addClockInData.save();
  }

  async findAll(): Promise<ClockIn[]> {
    const clockIn = await this.clockInModel.find().exec();
    return clockIn;
  }
}
