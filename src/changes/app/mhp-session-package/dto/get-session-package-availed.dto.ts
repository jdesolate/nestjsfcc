import { IntersectionType } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';

import { GlobalSearchDto } from '../../common/dto/global-search.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class GetMhpSessionPackageDto extends IntersectionType(GlobalSearchDto, PaginationQueryDto) {
  @IsDateString()
  @IsOptional()
  readonly date_added_from?: string;

  @IsDateString()
  @IsOptional()
  readonly date_added_to?: string;

  @IsUUID()
  @IsOptional()
  readonly mental_health_professional_id?: string;

  @IsString()
  @IsOptional()
  readonly mental_health_professional_name?: string;

  @IsUUID()
  @IsOptional()
  readonly session_package_id?: string;

  @IsString()
  @IsOptional()
  readonly session_package_name?: string;
}
