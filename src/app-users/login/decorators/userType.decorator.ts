import { SetMetadata } from '@nestjs/common';

export const UserType = (...userType: string[]) =>
  SetMetadata('userType', userType);
