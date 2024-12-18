import { Body, Controller, Post } from '@nestjs/common';
import { CreateAluguelDto } from './dto/create-aluguel.dto';
import { AluguelService } from './aluguel.service';
import { ReturnBicicletaAluguelDto } from './dto/return-bicicleta-aluguel.dto';

@Controller()
export default class AluguelController {
  constructor(private readonly aluguelService: AluguelService) {}

  @Post('/aluguel')
  createAluguel(@Body() createAluguelDto: CreateAluguelDto) {
    return this.aluguelService.createAluguel(createAluguelDto);
  }

  @Post('/devolucao')
  returnBicicletaAluguel(
    @Body() returnBicicletaAluguelDto: ReturnBicicletaAluguelDto,
  ) {
    return this.aluguelService.returnBicicletaAluguel(
      returnBicicletaAluguelDto,
    );
  }
}
