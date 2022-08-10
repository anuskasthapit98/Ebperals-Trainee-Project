import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClockIn } from './dto/clockin.response';
import { CreateClockInInput } from './dto/create-clock-in.input';
@Injectable()
export class ClockInService {
  constructor(
    @InjectModel('ClockIn') private readonly clockInModel: Model<ClockIn>,
  ) {}

  async addClockIn(clockIn: CreateClockInInput): Promise<ClockIn> {
    const addClockInData = await this.clockInModel.create(clockIn);
    return addClockInData.save();
  }

  async findAll(): Promise<ClockIn[]> {
    const clockIn = await this.clockInModel.find().exec();
    return clockIn;
  }
}
