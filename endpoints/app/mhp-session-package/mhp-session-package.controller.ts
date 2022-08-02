import { Role } from '@empath/enums';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

import { CreateMhpSessionPackageDto } from './dto/create-mhp-session-package.dto';
import { DeleteMhpSessionPackageResponseDto } from './dto/delete-mhp-session-package.dto';
import { GetMhpSessionPackageResponseDto } from './dto/get-mhp-session-package-response.dto';
import { GetMhpSessionPackageDto } from './dto/get-mhp-session-package.dto';
import { UpdateMhpSessionPackageDto } from './dto/update-mhp-session-package.dto';
import { MhpSessionPackage } from './entities/mhp-session-package.entity';
import { MhpSessionPackageService } from './mhp-session-package.service';

@ApiTags('mhp-session-package')
@Controller('mhp-session-package')
export class MhpSessionPackageController {
  constructor(private readonly mhpSessionPackageService: MhpSessionPackageService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.MHP)
  @Post()
  async createMhpSessionPackage(
    @Body() createMhpSessionPackageDto: CreateMhpSessionPackageDto
  ): Promise<MhpSessionPackage> {
    console.log('Create Controller: ', createMhpSessionPackageDto);

    return this.mhpSessionPackageService.create(
      createMhpSessionPackageDto
    );
  }

  @UseGuards(RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ORG_ADMIN, Role.MHP)
  @Get('/basic-information')
  async getBasicInformation(
    @Query() getMhpSessionPackageDto: GetMhpSessionPackageDto
  ): Promise<GetMhpSessionPackageResponseDto> {
    return this.mhpSessionPackageService.getBasicInformation(getMhpSessionPackageDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.MHP)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<MhpSessionPackage> {
    return this.mhpSessionPackageService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ORG_ADMIN, Role.MHP)
  @Get()
  async get(
    @Query() getMhpSessionPackageDto: GetMhpSessionPackageDto
  ): Promise<GetMhpSessionPackageResponseDto> {
    return this.mhpSessionPackageService.get(getMhpSessionPackageDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.MHP)
  @Patch('/:id')
  async updateMhpSessionPackageDetails(
    @Body() updateMhpSessionPackageDto: UpdateMhpSessionPackageDto): Promise<MhpSessionPackage> {
    return this.mhpSessionPackageService.updateMhpSessionPackageDetails(updateMhpSessionPackageDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.MHP)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<DeleteMhpSessionPackageResponseDto> {
    const deleteMhpSessionPackage = await this.mhpSessionPackageService.delete(id);

    return { id: deleteMhpSessionPackage.id };
  }
}
