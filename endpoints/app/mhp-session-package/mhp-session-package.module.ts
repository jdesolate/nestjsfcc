import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesModule } from '../roles/roles.module';

import { MhpSessionPackage } from './entities/mhp-session-package.entity';
import { MhpSessionPackageController } from './mhp-session-package.controller';
import { MhpSessionPackageService } from './mhp-session-package.service';

@Module({
  controllers: [MhpSessionPackageController],
  exports: [MhpSessionPackageService],
  imports: [RolesModule, TypeOrmModule.forFeature([MhpSessionPackage])],
  providers: [MhpSessionPackageService],
})
export class MhpSessionPackageModule {}
