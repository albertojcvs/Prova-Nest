import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './carts.entity';
import { CreateCartDTO } from './dto/CreateCartDTO';
import { CartAttributeAlreadyExistsException } from './exceptions/CartAttributeAçerayExists.exception';
import { CartNotFoundException } from './exceptions/CartNotFound.exception';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
  ) {}

  private async validateIfCartUniqueAttributsAlreadyExists({
    minValue,
  }: CreateCartDTO) {
    const minValueAlreadyExists = await this.cartsRepository.findOne({ where: { minValue } });
    if(minValueAlreadyExists) throw new CartAttributeAlreadyExistsException('minValue')
  }

  async getAll() {
    return await this.cartsRepository.find();
  }

  async getOne(id: string) {
    const cart = await this.cartsRepository.findOne({ where: { id } });
    if (!cart) throw new CartNotFoundException();
    return cart;
  }

  async create(data: CreateCartDTO) {
    await this.validateIfCartUniqueAttributsAlreadyExists(data);

    const cart = this.cartsRepository.create(data);

    return await this.cartsRepository.save(cart);
  }

  async delete(id: string) {
    const cart = await this.cartsRepository.findOne({ where: { id } });
    if (!cart) throw new CartNotFoundException();

    await this.cartsRepository.delete(id);
  }
}
