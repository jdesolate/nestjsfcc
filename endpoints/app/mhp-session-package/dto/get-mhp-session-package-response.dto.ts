import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto';
import { MhpSessionPackage } from '../entities/mhp-session-package.entity';

export class GetMhpSessionPackageResponseDto extends PaginatedResponseDto {
  readonly mhp_session_packages: MhpSessionPackage[];
}
