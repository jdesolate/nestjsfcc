import { IsUUID } from 'class-validator';

export class CreateMhpSessionPackageDto {
  @IsUUID()
  readonly mental_health_professional_id: string;

  @IsUUID()
  readonly session_package_id: string;
}
