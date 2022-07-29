import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentUpdateRequestModule } from './appointment-update-request/appointment-update-request.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AvailabilityOverrideModule } from './availability-override/availability-override.module';
import { AvailabilityModule } from './availability/availability.module';
import { ClientModule } from './client/client.module';
import { CommonModule } from './common/common.module';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { EducationModule } from './education/education.module';
import { ExperienceModule } from './experience/experience.module';
import { FileModule } from './file/file.module';
import { HealthModule } from './health/health.module';
import { IntakeFormModule } from './intake-form/intake-form.module';
import { LicenseModule } from './license/license.module';
import { MentalHealthProfessionalModule } from './mental-health-professional/mental-health-professional.module';
import { MhpSessionPackageModule } from './mhp-session-package/mhp-session-package.module';
import { OrganizationModule } from './organization/organization.module';
import { PartnerModule } from './partner/partner.module';
import { PaymentModule } from './payment/payment.module';
import { PostAppointmentModule } from './post-appointment/post-appointment.module';
import { ReportModule } from './report/report.module';
import { SessionPackageAvailedModule } from './session-package-availed/session-package-availed.module';
import { SessionPackageModule } from './session-package/session-package.module';
import { UserModule } from './user/user.module';
import { WarmupModule } from './warmup/warmup.module';

@Module({
  controllers: [AppController],
  imports: [
    AppointmentModule,
    AppointmentUpdateRequestModule,
    AvailabilityModule,
    AvailabilityOverrideModule,
    ClientModule,
    CommonModule,
    ConfigModule.forRoot(),
    EducationModule,
    ExperienceModule,
    FileModule,
    HealthModule,
    IntakeFormModule,
    LicenseModule,
    MentalHealthProfessionalModule,
    OrganizationModule,
    PartnerModule,
    PaymentModule,
    PostAppointmentModule,
    ReportModule,
    SessionPackageAvailedModule,
    SessionPackageModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        host: configService.get('DB_HOST'),
        password: configService.get('DB_PASSWORD'),
        port: +configService.get<number>('DB_PORT'),
        synchronize: false,
        type: 'postgres',
        username: configService.get('DB_USERNAME'),
      }),
    }),
    UserModule,
    WarmupModule,
    PartnerModule,
    MhpSessionPackageModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
