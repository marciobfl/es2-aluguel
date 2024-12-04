import { Repository } from 'typeorm';
import TypeormCartaoDeCreditoEntity from '../entities/typeorm-cartao-de-credito.entity';
import {
  CartaoDeCreditoRepository,
  ExistsCartaoDeCredito,
} from 'src/cartao-de-credito/domain/cartao-de-credito.repository';
import CartaoDeCreditoEntity from 'src/cartao-de-credito/domain/cartao-de-credito.entity';

export class TypeormCartaoDeCreditoRepository
  implements CartaoDeCreditoRepository
{
  constructor(
    private readonly cartaoDeCreditoDatabase: Repository<TypeormCartaoDeCreditoEntity>,
  ) {}
  save(cartaoDeCredito: CartaoDeCreditoEntity): Promise<CartaoDeCreditoEntity> {
    return this.cartaoDeCreditoDatabase.save(cartaoDeCredito);
  }
  async update(data: MakeRequired<CartaoDeCreditoEntity, 'id'>): Promise<void> {
    await this.cartaoDeCreditoDatabase.update(data.id, data);
  }
  findBy(query: ExistsCartaoDeCredito): Promise<CartaoDeCreditoEntity> {
    return this.cartaoDeCreditoDatabase.findOne({ where: query });
  }
}
