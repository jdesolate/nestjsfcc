import { Test, TestingModule } from '@nestjs/testing';

import { MhpSessionPackageService } from './mhp-session-package.service';

describe('MhpSessionPackageService', () => {
  let service: MhpSessionPackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MhpSessionPackageService],
    }).compile();

    service = module.get<MhpSessionPackageService>(MhpSessionPackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
