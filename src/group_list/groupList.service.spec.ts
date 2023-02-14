import { Test, TestingModule } from '@nestjs/testing';
import { GroupListService } from './groupList.service';

describe('GroupListService', () => {
  let service: GroupListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupListService],
    }).compile();

    service = module.get<GroupListService>(GroupListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
