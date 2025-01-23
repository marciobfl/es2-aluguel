import { Body, Controller, Get, HttpCode, Param, Put } from '@nestjs/common';
import { CartaoDeCreditoService } from './cartao-de-credito.service';
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
  @HttpCode(200)
  updateCartaoDeCredito(
    @Param('idCiclista') idCiclista: number,
    @Body() data: UpdateCartaoDeCreditoDto,
  ) {
    return this.cartaoDeCreditoService.updateCartaoDeCredito(idCiclista, data);
  }
}
