import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { Admin } from './dto/admin.response';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private adminService: AdminService) {}

  @Mutation(() => Admin)
  async createAdmin(
    @Args('adminInput') adminInput: CreateAdminInput,
  ): Promise<Admin> {
    const admin = await this.adminService.createAdmin(adminInput);
    return admin;
  }

  @Query(() => [Admin])
  async admins(): Promise<Admin[]> {
    const admins = this.adminService.findAll();
    return admins;
  }

  @Mutation(() => Admin)
  updateAdmin(@Args('updateAdminInput') updateAdminInput: UpdateAdminInput) {
    return this.adminService.updateAdmin(
      updateAdminInput._id,
      updateAdminInput,
    );
  }
}
