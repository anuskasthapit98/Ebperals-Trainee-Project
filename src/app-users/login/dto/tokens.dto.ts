import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserTokens {
    @Field()
    accessToken: string;

    @Field(() => String)
    refreshToken: string;
}