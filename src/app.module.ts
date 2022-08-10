import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './admin/users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProjectModule } from './admin/projects/project.module';
import { TaskModule } from './admin/task/task.module';
import { ClockInModule } from './app-users/clock-in/clock-in.module';
import { LoginModule } from './app-users/login/login.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UsersModule,
    ProjectModule,
    TaskModule,
    ClockInModule,
    // LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
