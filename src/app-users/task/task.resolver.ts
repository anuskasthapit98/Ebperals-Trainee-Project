import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { Task } from './dto/task.response';
import { UserTypeGuard } from '../login/guards/useType.guard';
import { UseGuards } from '@nestjs/common';
import { UserType } from '../login/decorators/userType.decorator';
import { CurrentUser } from '../login/decorators/current-user.decorator';
import { UserJwtGuard } from '../login/guards/jwt.guard';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  @UseGuards(UserJwtGuard)
  @UserType('project manager')
  createTask(
  
    @CurrentUser() CurrentUser: any,
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ) {
    return this.taskService.createTask(CurrentUser, createTaskInput);
  }

  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    const tasks = this.taskService.findAll();
    return tasks;
  }
}
