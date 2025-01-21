import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateAluguelDto } from './dto/create-aluguel.dto';
import { AluguelService } from './aluguel.service';
import { ReturnBicicletaAluguelDto } from './dto/return-bicicleta-aluguel.dto';

@Controller()
export default class AluguelController {
  constructor(private readonly aluguelService: AluguelService) {}

  @Post('/aluguel')
  @HttpCode(200)
  createAluguel(@Body() createAluguelDto: CreateAluguelDto) {
    return this.aluguelService.createAluguel(createAluguelDto);
  }

  @Post('/devolucao')
  @HttpCode(200)
  returnBicicletaAluguel(
    @Body() returnBicicletaAluguelDto: ReturnBicicletaAluguelDto,
  ) {
    return this.aluguelService.returnBicicletaAluguel(
      returnBicicletaAluguelDto,
    );
  }
}
