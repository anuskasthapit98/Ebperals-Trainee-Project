import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './dto/task.response';
import { CreateTaskInput } from './dto/create-task.input';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly TaskModel: Model<Task>) {}

  // Create new Task
  async createTask(
    CurrentUser: any,
    TaskInput: CreateTaskInput,
  ): Promise<Task> {
    const userId = CurrentUser._id;
    const task = { ...TaskInput, userId };
    const createTask = await this.TaskModel.create(task);
    return createTask.save();
  }

  async findAll(): Promise<Task[]> {
    const Tasks = await this.TaskModel.find().exec();
    return Tasks;
  }
}
