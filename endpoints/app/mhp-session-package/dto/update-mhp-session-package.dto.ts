import { PartialType } from '@nestjs/swagger';

import { CreateMhpSessionPackageDto } from './create-mhp-session-package.dto';

export class UpdateMhpSessionPackageDto extends PartialType(CreateMhpSessionPackageDto) {}
