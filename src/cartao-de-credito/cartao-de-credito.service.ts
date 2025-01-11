import { Inject, Injectable } from '@nestjs/common';
import { CartaoDeCreditoRepository } from './domain/cartao-de-credito.repository';
import CartaoDeCreditoEntity from './domain/cartao-de-credito.entity';
import UpdateCartaoDeCreditoDto from './dto/update-cartao-de-credito.dto';
import { AppError, AppErrorType } from 'src/common/domain/app-error';

@Injectable()
export class CartaoDeCreditoService {
  constructor(
    @Inject('CartaoDeCreditoRepository')
    private readonly cartaoDeCreditoRepository: CartaoDeCreditoRepository,
  ) {}

  async getCartaoDeCredito(ciclistaId: number) {
    const cartaoDeCredito = await this.cartaoDeCreditoRepository.findBy({
      ciclista: {
        id: ciclistaId,
      },
    });

    if (!cartaoDeCredito) {
      throw new AppError(
        'Ciclista não encontrado!\n',
        AppErrorType.RESOURCE_NOT_FOUND,
      );
    }

    return CartaoDeCreditoEntity.toDomain(cartaoDeCredito);
  }

  async updateCartaoDeCredito(
    ciclistaId: number,
    data: UpdateCartaoDeCreditoDto,
  ) {
    const cartaoDeCredito = await this.cartaoDeCreditoRepository.findBy({
      ciclista: {
        id: ciclistaId,
      },
    });

    if (!cartaoDeCredito) {
      throw new AppError(
        'Ciclista não encontrado!\n',
        AppErrorType.RESOURCE_NOT_FOUND,
      );
    }

    await this.cartaoDeCreditoRepository.update(cartaoDeCredito.id, data);
  }
}
