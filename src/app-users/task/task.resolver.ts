import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { Task } from './dto/task.response';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.createTask(createTaskInput);
  }

  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    const tasks = this.taskService.findAll();
    return tasks;
  }
}
