import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClockInService } from './clock-in.service';
import { ClockIn } from './clockin-schema';
import { CreateClockInInput } from './dto/create-clock-in.input';

@Resolver(() => ClockIn)
export class ClockInResolver {
  constructor(private readonly clockInService: ClockInService) {}

  @Mutation(() => ClockIn)
  createClockIn(@Args('createClockInInput') createClockInInput: CreateClockInInput) {
    return this.clockInService.create(createClockInInput);
  }

}
