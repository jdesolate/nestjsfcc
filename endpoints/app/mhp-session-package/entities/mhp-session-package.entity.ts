import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { MentalHealthProfessional } from '../../mental-health-professional/entities/mental-health-professional.entity';

import { Organization } from '../../organization/entities/organization.entity';
import { SessionPackage } from '../../session-package/entities/session-package.entity';

@Entity('mhp_session_package')
export class MhpSessionPackage {
    @CreateDateColumn({ type: 'timestamptz' })
      created_at: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
      deleted_at: Date;

    @PrimaryGeneratedColumn('uuid')
      id: string;

    @ManyToOne(() => SessionPackage, (sessionPackage) => sessionPackage.session_packages_availed)
    @JoinColumn({ name: 'session_package_id' })
      session_package: SessionPackage;

    @ManyToOne(() => MentalHealthProfessional, (mental_health_professional) => mental_health_professional.id)
    @JoinColumn({ name: 'mental_health_professional_id' })
      mental_health_professional: MentalHealthProfessional;
}
