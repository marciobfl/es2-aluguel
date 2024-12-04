import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CartaoDeCreditoService } from './cartao-de-credito.service';
import CartaoDeCredito from './domain/cartao-de-credito';
import UpdateCartaoDeCreditoDto from './dto/update-cartao-de-credito.dto';

@Controller('cartaoDeCredito')
export default class CartaoDeCreditoController {
  constructor(
    private readonly cartaoDeCreditoService: CartaoDeCreditoService,
  ) {}

  @Get('/:idCiclista')
  getCartaoDeCredito(@Param('idCiclista') idCiclista: number) {
    return this.cartaoDeCreditoService.getCartaoDeCredito(idCiclista);
  }

  @Put('/:idCiclista')
  updateCartaoDeCredito(
    @Param('idCiclista') idCiclista: number,
    @Body() data: UpdateCartaoDeCreditoDto,
  ) {
    return this.cartaoDeCreditoService.updateCartaoDeCredito(idCiclista, data);
  }
}
