import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dto/user.response';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-users.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // Create new user
  async createUser(userInput: CreateUserInput): Promise<User> {
    const createUser = await this.userModel.create(userInput);
    return createUser.save();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async updateUser(id: String, updateUserInput: UpdateUserInput) {
    const updateUser = await this.userModel
      .findOneAndUpdate({ _id: id }, { $set: updateUserInput }, { new: true })
      .exec();

    if (!updateUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return updateUser;
  }
}
