import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './projects.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Projects', schema: ProjectSchema }]),
  ],
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
