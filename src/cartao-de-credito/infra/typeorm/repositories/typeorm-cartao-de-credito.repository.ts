import { Repository } from 'typeorm';
import TypeormCartaoDeCreditoEntity from '../entities/typeorm-cartao-de-credito.entity';
import {
  CartaoDeCreditoCriteria,
  CartaoDeCreditoRepository,
  UpdateCartaoDeCredito,
} from 'src/cartao-de-credito/domain/cartao-de-credito.repository';
import CartaoDeCreditoEntity from 'src/cartao-de-credito/domain/cartao-de-credito.entity';

export class TypeormCartaoDeCreditoRepository
  implements CartaoDeCreditoRepository
{
  constructor(
    private readonly cartaoDeCreditoDatabase: Repository<TypeormCartaoDeCreditoEntity>,
  ) {}

  async update(
    id: number,
    cartaoDeCredito: Partial<UpdateCartaoDeCredito>,
  ): Promise<void> {
    await this.cartaoDeCreditoDatabase.update({ id }, cartaoDeCredito);
  }

  save(cartaoDeCredito: CartaoDeCreditoEntity): Promise<CartaoDeCreditoEntity> {
    return this.cartaoDeCreditoDatabase.save(cartaoDeCredito);
  }

  findBy(query: CartaoDeCreditoCriteria): Promise<CartaoDeCreditoEntity> {
    return this.cartaoDeCreditoDatabase.findOne({ where: query });
  }
}
