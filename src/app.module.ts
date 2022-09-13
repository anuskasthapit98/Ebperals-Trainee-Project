import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './admin/users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectModule } from './admin/projects/project.module';
import { TaskModule } from './app-users/task/task.module';
import { ClockInModule } from './app-users/clock-in/clock-in.module';
import { LoginModule } from './app-users/login/login.module';
import { AuthModule } from './admin/auth/auth.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/nest'),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    // }),

    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        return {
          context: ({ req }) => ({ req }),
          autoSchemaFile: config.get('GQL_SCHEMA_PATH'),
          debug: config.get('GQL_DEBUG') === 'true',
        };
      },
      inject: [ConfigService],
    }),

    UsersModule,
    ProjectModule,
    TaskModule,
    ClockInModule,
    LoginModule,
    AuthModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
