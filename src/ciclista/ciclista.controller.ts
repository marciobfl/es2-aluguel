import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CiclistaService } from './ciclista.service';
import CreateCiclistaDto from './dto/create-ciclista.dto';

@Controller('ciclista')
export default class CiclistaController {
  constructor(private readonly ciclistaService: CiclistaService) {}

  @Post()
  createCiclista(@Body() createCiclistaDto: CreateCiclistaDto) {
    return this.ciclistaService.createCiclista(createCiclistaDto);
  }

  @Get('/existeEmail/:email')
  emailExists(@Param('email') email: string) {
    return this.ciclistaService.emailExists(email);
  }

  @Post('/:idCiclista/ativar')
  activateCiclista(@Param('idCiclista') idCiclista: number) {
    return this.ciclistaService.activateCiclista(idCiclista);
  }
}
