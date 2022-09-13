import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { ProjectResponse } from './dto/project.response';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ProjectListResponse } from './dto/projectList.response';

@Resolver(() => ProjectResponse)
@UseGuards(JwtGuard)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Mutation(() => ProjectResponse)
  @UseGuards(JwtGuard)
  async createProject(
    @Args('projectInput') projectInput: CreateProjectInput,
  ): Promise<ProjectResponse> {
    const project = await this.projectService.createProject(projectInput);
    return project;
  }

  @Query(() => [ProjectListResponse])
  async projects(): Promise<ProjectListResponse[]> {
    const projects = this.projectService.findAll();
    return projects;
  }

  @Mutation(() => ProjectResponse)
  updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectService.updateProject(
      updateProjectInput._id,
      updateProjectInput,
    );
  }
}
