import { Test, TestingModule } from '@nestjs/testing';

import { MhpSessionPackageController } from './mhp-session-package.controller';
import { MhpSessionPackageService } from './mhp-session-package.service';

describe('MhpSessionPackageController', () => {
  let controller: MhpSessionPackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MhpSessionPackageController],
      providers: [MhpSessionPackageService],
    }).compile();

    controller = module.get<MhpSessionPackageController>(MhpSessionPackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
