import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/permission.entity';
import { Repository } from 'typeorm';
import { SaveUserDTO } from './dto/SaveUserDTO';
import { UserAttributeAlreadyExistsExecetion } from './exceptions/UserAttrubuteAlreayExists.exeception';
import { UserNotFoundException } from './exceptions/UserNotFound.exception';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersReposository: Repository<User>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  private async validateUserRequiredAttributesExists({ email }: SaveUserDTO) {
    const emailAlreadyExists = await this.usersReposository.findOne({
      where: { email },
    });

    if (emailAlreadyExists)
      throw new UserAttributeAlreadyExistsExecetion('email');
  }

  async create(data: SaveUserDTO) {
    await this.validateUserRequiredAttributesExists(data);

    const userPermission = await this.permissionsRepository.findOne({
      where: { name: 'player' },
    });

    const user = this.usersReposository.create(data);

    user.permissions = [userPermission];

    return await this.usersReposository.save(user);
  }

  async getAll() {
    return await this.usersReposository.find();
  }

  async getOne(id: string) {
    const user = await this.usersReposository.findOne(id);
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async getOneBy(key: string, value: any) {
    const whereOptions = {};
    whereOptions[key] = value;
    const user = await this.usersReposository.findOne(whereOptions);
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async update(id: string, data: SaveUserDTO) {
    await this.validateUserRequiredAttributesExists(data);

    await this.usersReposository.update(id, data);

    const user = await this.usersReposository.findOne(id);

    if (!user) throw new UserNotFoundException();

    return user;
  }

  async delete(id: string) {
    const user = await this.usersReposository.findOne(id);

    if (!user) new UserNotFoundException();

    await this.usersReposository.delete(id);
    return { succes: { message: 'User deleted!' } };
  }
}
