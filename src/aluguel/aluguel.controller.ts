import { Body, Controller, Post } from '@nestjs/common';
import { CreateAluguelDto } from './dto/create-aluguel.dto';
import { AluguelService } from './aluguel.service';

@Controller('aluguel')
export default class AluguelController {
  constructor(private readonly aluguelService: AluguelService) {}

  @Post()
  createAluguel(@Body() createAluguelDto: CreateAluguelDto) {
    return this.aluguelService.createAluguel(createAluguelDto);
  }
}
