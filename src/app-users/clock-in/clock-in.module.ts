import { Module } from '@nestjs/common';
import { ClockInService } from './clock-in.service';
import { ClockInResolver } from './clock-in.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ClockInSchema } from './clockin-schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ClockIn', schema: ClockInSchema }])],

  providers: [ClockInResolver, ClockInService]
})
export class ClockInModule {}
