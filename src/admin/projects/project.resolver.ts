import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './dto/project.response';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { jwtConstants } from 'src/common/helper/jwtConstants';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/dto/user.response';


@Resolver(() => Project)
@UseGuards(JwtGuard)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}


  @Mutation(() => Project)
  @UseGuards(JwtGuard)
  async createProject(
    @Args('projectInput') projectInput: CreateProjectInput,
  ): Promise<Project> {
    const project = await this.projectService.createProject(projectInput);
    return project;
  }

  @Query(() => [Project])
  async projects(): Promise<Project[]> {
    const projects = this.projectService.findAll();
    return projects;
  }

  @Mutation(() => Project)
  updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectService.updateProject(
      updateProjectInput._id,
      updateProjectInput,
    );
  }
}
