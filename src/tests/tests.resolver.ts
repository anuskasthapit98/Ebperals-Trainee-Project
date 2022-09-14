import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TestsService } from './tests.service';
import { Test } from './entities/test.entity';
import { CreateTestInput } from './dto/create-test.input';
import { UpdateTestInput } from './dto/update-test.input';

@Resolver(() => Test)
export class TestsResolver {
  constructor(private readonly testsService: TestsService) {}

  @Mutation(() => Test)
  createTest(@Args('createTestInput') createTestInput: CreateTestInput) {
    return this.testsService.create(createTestInput);
  }

  @Query(() => [Test], { name: 'tests' })
  findAll() {
    return this.testsService.findAll();
  }

  @Query(() => Test, { name: 'test' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.testsService.findOne(id);
  }

  @Mutation(() => Test)
  updateTest(@Args('updateTestInput') updateTestInput: UpdateTestInput) {
    return this.testsService.update(updateTestInput.id, updateTestInput);
  }

  @Mutation(() => Test)
  removeTest(@Args('id', { type: () => Int }) id: number) {
    return this.testsService.remove(id);
  }
}
