import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsService } from 'src/modules/permissions/permissions.service';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { SaveUserDTO } from './dto/SaveUserDTO';
import { UserAttributeAlreadyExistsExecetion } from './exceptions/UserAttrubuteAlreayExists.exeception';
import { UserNotFoundException } from './exceptions/UserNotFound.exception';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersReposository: Repository<User>,
    private mailService: MailService,
    @Inject(forwardRef(() => PermissionsService))
    private permissionsService: PermissionsService,
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

    const userPermission = await this.permissionsService.getOneBy(
      'name',
      'player',
    );

    const user = this.usersReposository.create(data);

    user.permissions = [userPermission];

    await this.mailService.sendNewUserEmail(
      {
        from: 'loteria@loteria.com',
        to: user.email,
        subject: null,
      },
      user,
    );

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
    const user = await this.usersReposository.findOne({ where: whereOptions });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async update(id: string, data: SaveUserDTO) {
    await this.validateUserRequiredAttributesExists(data);

    await this.usersReposository.update(id, {...data});

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
