import { MhpSessionPackageFilter } from '@empath/enums';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Brackets, Repository, SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';

import { MHP_SESSION_PACKAGE, SESSION_PACKAGE } from '../constants/table-aliases';

import { MENTAL_HEALTH_PROFESSIONAL_USER } from './../constants/table-aliases';

import { CreateMhpSessionPackageDto } from './dto/create-mhp-session-package.dto';
import { GetMhpSessionPackageResponseDto } from './dto/get-mhp-session-package-response.dto';
import { GetMhpSessionPackageDto } from './dto/get-session-package-availed.dto';
import { UpdateMhpSessionPackageDto } from './dto/update-mhp-session-package.dto';
import { MhpSessionPackage } from './entities/mhp-session-package.entity';

@QueryService(MhpSessionPackage)
@Injectable()
export class MhpSessionPackageService extends TypeOrmQueryService<MhpSessionPackage> {
  constructor(
    @InjectRepository(MhpSessionPackage)
    private readonly mhpSessionPackageRepository: Repository<MhpSessionPackage>
  ) {
    super(mhpSessionPackageRepository, { useSoftDelete: true });
  }

  async create(
    createMhpSessionPackageDto: CreateMhpSessionPackageDto
  ): Promise<MhpSessionPackage> {
    const mhpSessionPackage = this.mhpSessionPackageRepository.create({
      ...createMhpSessionPackageDto,
      mental_health_professional: { id: createMhpSessionPackageDto.mental_health_professional_id },
      session_package: { id: createMhpSessionPackageDto.session_package_id },
    });

    return this.mhpSessionPackageRepository.save(mhpSessionPackage);
  }

  async delete(id: string): Promise<MhpSessionPackage> {
    const existingMhpSessionPackage = await this.mhpSessionPackageRepository.findOne(id);

    return this.mhpSessionPackageRepository.softRemove(existingMhpSessionPackage);
  }

  findOne(id: string): Promise<MhpSessionPackage> {
    return this.mhpSessionPackageRepository.findOne({ id }, {
      relations: [MENTAL_HEALTH_PROFESSIONAL_USER, SESSION_PACKAGE]
    });
  }

  async get(
    getMhpSessionPackageDto: GetMhpSessionPackageDto
  ): Promise<GetMhpSessionPackageResponseDto> {
    const { limit, page } = getMhpSessionPackageDto;
    const selectQuery =
      this.mhpSessionPackageRepository.createQueryBuilder(SESSION_PACKAGE);
    const filteredMhpSessionPackage = this.applyFilters(
      getMhpSessionPackageDto,
      selectQuery
    );

    const sessionPackages = await filteredMhpSessionPackage
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy({ name: 'ASC' })
      .getManyAndCount();

    return {
      count: sessionPackages[1],
      current_page: page,
      limit: limit,
      mhp_session_packages: sessionPackages[0],
    };
  }

  async getBasicInformation(
    getMhpSessionPackageDto: GetMhpSessionPackageDto
  ): Promise<GetMhpSessionPackageResponseDto> {
    const { limit, page } = getMhpSessionPackageDto;
    const selectQuery = this.mhpSessionPackageRepository.createQueryBuilder(MHP_SESSION_PACKAGE)
      .leftJoinAndSelect(`${MHP_SESSION_PACKAGE}.${SESSION_PACKAGE}`, SESSION_PACKAGE)
      .innerJoinAndSelect(`${MHP_SESSION_PACKAGE}.${MENTAL_HEALTH_PROFESSIONAL_USER}`, MENTAL_HEALTH_PROFESSIONAL_USER);
    const filteredMhpSessionPackage = this.applyFilters(getMhpSessionPackageDto, selectQuery);

    const sessionPackages = await filteredMhpSessionPackage
      .skip((page - 1) * limit).take(limit)
      .getManyAndCount();

    return {
      count: sessionPackages[1],
      current_page: page,
      limit: limit,
      mhp_session_packages: sessionPackages[0],
    };
  }

  async updateMhpSessionPackageDetails(
    id: string,
    updateMhpSessionPackageDto: UpdateMhpSessionPackageDto
  ): Promise<MhpSessionPackage> {
    const existingPackage = await this.mhpSessionPackageRepository.preload({
      id: id,
      ...updateMhpSessionPackageDto
    });

    return this.mhpSessionPackageRepository.save(existingPackage);
  }

  private applyFilters(
    getMhpSessionPackageDto: GetMhpSessionPackageDto,
    selectQuery: SelectQueryBuilder<MhpSessionPackage>
  ): SelectQueryBuilder<MhpSessionPackage> {
    const {
      date_added_from,
      date_added_to,
      mental_health_professional_id,
      mental_health_professional_name,
      session_package_id,
      session_package_name,
      search_in,
      search_query
    } = getMhpSessionPackageDto;

    if (search_in && search_query) {
      selectQuery.andWhere(
        new Brackets((queryBuilder) =>
          this.buildGlobalSearchQuery(getMhpSessionPackageDto, queryBuilder)
        )
      );
    }

    if (mental_health_professional_id) {
      selectQuery.andWhere(this.getFilterByMentalHealthProfessionalIdQuery(mental_health_professional_id));
    }

    if (mental_health_professional_name) {
      selectQuery.andWhere(this.getFilterByMentalHealthProfessionalNameQuery(mental_health_professional_name));
    }

    if (session_package_id) {
      selectQuery.andWhere(this.getFilterBySessionPackageIdQuery);
    }

    if (session_package_name) {
      selectQuery.andWhere(this.getFilterByPackageNameQuery(session_package_name));
    }

    if (date_added_from || date_added_to) {
      selectQuery.andWhere(this.getFilterByAvailedDateQuery(date_added_from, date_added_to));
    }

    return selectQuery;
  }

  private buildGlobalSearchQuery(
    getMhpSessionPackageDto: GetMhpSessionPackageDto,
    selectQuery: WhereExpressionBuilder
  ): WhereExpressionBuilder {
    const { search_in, search_query } = getMhpSessionPackageDto;

    if (search_in.includes(MhpSessionPackageFilter.MENTAL_HEALTH_PROFESSIONAL_NAME)) {
      selectQuery.orWhere(this.getFilterByMentalHealthProfessionalNameQuery(search_query));
    }

    if (search_in.includes(MhpSessionPackageFilter.SESSION_PACKAGE_NAME)) {
      selectQuery.orWhere(this.getFilterByPackageNameQuery(search_query));
    }

    return selectQuery;
  }

  private getFilterByMentalHealthProfessionalIdQuery(mentalHealthProfessionalId: string): string {
    return `${MHP_SESSION_PACKAGE}.mental_health_professional_id = '${mentalHealthProfessionalId}'`;
  }

  private getFilterByMentalHealthProfessionalNameQuery(mentalHealthProfessionalName: string): string {
    return `${MENTAL_HEALTH_PROFESSIONAL_USER}.name ILIKE '%${mentalHealthProfessionalName}%'`;
  }

  private getFilterBySessionPackageIdQuery(sessionPackageId: string): string {
    return `${MHP_SESSION_PACKAGE}.session_package_id = '${sessionPackageId}'`;
  }

  private getFilterByPackageNameQuery(packageName: string): string {
    return `${SESSION_PACKAGE}.name ILIKE '%${packageName}%'`;
  }

  private getFilterByAvailedDateQuery(start?: string, end?: string) {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const convertedStart = moment.utc(start).format(dateFormat);
    const convertedEnd = moment.utc(end).format(dateFormat);

    if (start && end) {
      return `${MHP_SESSION_PACKAGE}.created_at between '${convertedStart}' AND '${convertedEnd}'`;
    }

    if (start) {
      return `${MHP_SESSION_PACKAGE}.created_at >= '${convertedStart}'`;
    }

    if (end) {
      return `${MHP_SESSION_PACKAGE}.created_at <= '${convertedEnd}'`;
    }
  }
}
