import { InputType, Int, Field, ID } from'@nestjs/graphql';
import { CreateUserInput } from 'src/admin/users/dto/create-user.input';

@InputType()
export class AssignProject {
    @Field(() => ID)
    userId: string;

    @Field(() => ID)
    projectId: string;
}