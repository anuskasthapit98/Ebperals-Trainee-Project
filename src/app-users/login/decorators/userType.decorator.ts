import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/admin/users/users.schema';

export const HasUserType = (...userTypes: UserType[]) =>
  SetMetadata('userTypes', userTypes);
