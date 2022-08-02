
import { SessionPackageStatus } from '@empath/enums';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { MentalHealthProfessional } from '../../mental-health-professional/entities/mental-health-professional.entity';

import { SessionPackage } from '../../session-package/entities/session-package.entity';

@Entity('mhp_session_package')
export class MhpSessionPackage {
    @CreateDateColumn({ type: 'timestamptz' })
      created_at: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
      deleted_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
      updated_at: Date;

    @PrimaryGeneratedColumn('uuid')
      id: string;

    @Column()
      duration_in_minutes: number;

    @Column()
      name: string;

    @Column()
      status: SessionPackageStatus;

    @OneToOne(() => SessionPackage)
    @JoinColumn({ name: 'session_package_id' })
      session_package: SessionPackage;

    @OneToOne(() => MentalHealthProfessional)
    @JoinColumn({name: 'mental_health_professional_id' })
      mental_health_professional: MentalHealthProfessional;
}
