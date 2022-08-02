import { SessionPackageStatus } from '@empath/enums';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateMhpSessionPackageDto {
  @IsUUID()
  readonly mental_health_professional_id: string;

  @IsUUID()
  readonly session_package_id: string;

  @IsString()
  readonly name: string;

  @IsNumber()
  readonly duration_in_minutes: number;

  @IsEnum(SessionPackageStatus)
  readonly status: SessionPackageStatus;
}
