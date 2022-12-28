import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './dto/admin.response';
import { CreateAdminInput } from './dto/create-admin.input';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
  ) {}

  async createAdmin(adminInput: CreateAdminInput): Promise<Admin> {
    adminInput.password = await bcrypt.hash(adminInput.password, 10);
    const createdUser = await this.adminModel.create(adminInput);
    return createdUser.save();
  }

  async findAll(): Promise<Admin[]> {
    const admins = await this.adminModel.find().exec();
    return admins;
  }

  async findOne(id: string) {
    const admin = await this.adminModel.findOne({ _id: id }).exec();
    if (!admin) {
      throw new NotFoundException(`Admin ${id} not found`);
    }
    return admin;
  }

  async remove(id: string) {
    const admin = await this.findOne(id);
    return admin.remove();
  }

  async findAdminByEmail(email: string) {
    const admin = await this.adminModel.findOne({ email: email }).exec();
    if (!admin) {
      throw new NotFoundException(`admin ${email} not found`);
    }
    return admin;
  }
}
