import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Project } from './dto/project.response';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Projects') private readonly projectModel: Model<Project>,
  ) {}

  // Create new Project
  async createProject(ProjectInput: CreateProjectInput): Promise<Project> {
    const createProject = await this.projectModel.create(ProjectInput);
    return createProject.save();
  }

  async findAll(): Promise<Project[]> {
    const projects = await this.projectModel.find().exec();
    return projects;
  }

  async findOne(id: String) {
    const project = await this.projectModel.findOne({ _id: id }).exec();
    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return project;
  }

  async updateProject(id: String, updateProjectInput: UpdateProjectInput) {
    const updateProject = await this.projectModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateProjectInput },
        { new: true },
      )
      .exec();

    if (!updateProject) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return updateProject;
  }
}
