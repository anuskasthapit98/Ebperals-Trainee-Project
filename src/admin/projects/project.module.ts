import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './projects.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Projects', schema: ProjectSchema }]),
    UsersModule,
  ],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
