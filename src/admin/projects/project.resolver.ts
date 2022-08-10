import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './dto/project.response';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Mutation(() => Project)
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
