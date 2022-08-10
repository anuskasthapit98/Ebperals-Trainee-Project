import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClockInService } from './clock-in.service';
import { ClockIn } from './dto/clockin.response';
import { CreateClockInInput } from './dto/create-clock-in.input';

@Resolver(() => ClockIn)
export class ClockInResolver {
  constructor(private clockInService: ClockInService) {}

  @Mutation(() => ClockIn)
  async addClockIn(
    @Args('clockInInput') clockInInput: CreateClockInInput,
  ): Promise<ClockIn> {
    const clockIn = await this.clockInService.addClockIn(clockInInput);
    return clockIn;
  }
  @Query(() => [ClockIn])
  async clockIns(): Promise<ClockIn[]> {
    const clockIn = this.clockInService.findAll();
    return clockIn;
  }
}
