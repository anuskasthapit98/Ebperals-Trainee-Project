import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dto/user.response';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-users.input';
// import { CreateAdminInput } from './dto/create-admin.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // Create new user
  async createUser(userInput: CreateUserInput): Promise<User> {
    const user = await this.userModel
      .findOne({ email: userInput.email })
      .exec();
    if (user) {
      throw new NotFoundException(`User with this email already exists`);
    }
    userInput.password = await this.encodePassword(userInput.password);
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

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.remove();
  }

  // async getUsers(paginationQuery: ListUsersInput) {
  //   const count = await this.userModel.count();
  //   const users = await this.findAll(paginationQuery);
  //   return { users, count };
  // }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    return user;
  }

  private async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
