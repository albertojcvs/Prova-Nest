import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavePermissionDTO } from './dto/SavePermissionDTO';
import { PermissionNotFound } from './exceptions/PermissionNotFound.exception';
import { PermissionAttributeAlreadyExists } from './exceptions/PermissiontAttributesAlreadyExists.exception';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  private async validateIfPermissionRequiredAttrbutesExists({
    name,
  }: SavePermissionDTO) {
    const nameAlreadyExists = await this.permissionsRepository.findOne({
      where: { name },
    });

    if (nameAlreadyExists) throw new PermissionAttributeAlreadyExists('name');
  }

  async create(data: SavePermissionDTO) {
    await this.validateIfPermissionRequiredAttrbutesExists(data);

    const permission = this.permissionsRepository.create(data);

    return await this.permissionsRepository.save(permission);
  }

  async getAll() {
    return await this.permissionsRepository.find();
  }

  async getOne(id: string) {
    const permission = await this.permissionsRepository.findOne(id);

    if (!permission) throw new PermissionNotFound();

    return permission;
  }

  async update(id: string, data: SavePermissionDTO) {
    await this.validateIfPermissionRequiredAttrbutesExists(data);

    await this.permissionsRepository.update(id, data);

    const permission = await this.permissionsRepository.findOne(id);

    if (!permission) throw new PermissionNotFound();

    return permission;
  }

  async delete(id: string) {
    const permission = await this.permissionsRepository.findOne(id);

    if (!permission) throw new PermissionNotFound();

    await this.permissionsRepository.delete(id);
  }
}
