import { Test, TestingModule } from '@nestjs/testing';
import { TestsResolver } from './tests.resolver';
import { TestsService } from './tests.service';

describe('TestsResolver', () => {
  let resolver: TestsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestsResolver, TestsService],
    }).compile();

    resolver = module.get<TestsResolver>(TestsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
