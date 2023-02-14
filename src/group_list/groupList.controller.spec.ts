import { Test, TestingModule } from '@nestjs/testing';
import { GroupListController } from './groupList.controller';



describe('GroupListController', () => {
  let controller: GroupListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupListController],
    }).compile();

    controller = module.get<GroupListController>(GroupListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});