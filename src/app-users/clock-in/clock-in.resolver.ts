import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrentUser } from '../login/decorators/current-user.decorator';
import { ClockInService } from './clock-in.service';
import { ClockIn } from './dto/clockin.response';
import { CreateClockInInput } from './dto/create-clock-in.input';

@Resolver(() => ClockIn)
export class ClockInResolver {
  constructor(private clockInService: ClockInService) {}

  @Mutation(() => ClockIn)
  async addClockIn(
    @CurrentUser() CurrentUser: any,
    @Args('clockInInput') clockInInput: CreateClockInInput,
  ): Promise<ClockIn> {
    const clockIn = await this.clockInService.addClockIn(
      CurrentUser.userId,
      clockInInput,
    );
    return clockIn;
  }
  @Query(() => [ClockIn])
  async clockIns(): Promise<ClockIn[]> {
    const clockIn = this.clockInService.findAll();
    return clockIn;
  }
}
