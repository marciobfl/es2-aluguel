import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CiclistaService } from './ciclista.service';
import CreateCiclistaDto from './dto/create-ciclista.dto';
import UpdateCiclistaDto from './dto/update-ciclista.dto';

@Controller('ciclista')
export default class CiclistaController {
  constructor(private readonly ciclistaService: CiclistaService) {}

  @Post()
  @HttpCode(201)
  createCiclista(@Body() createCiclistaDto: CreateCiclistaDto) {
    return this.ciclistaService.createCiclista(createCiclistaDto);
  }

  @Get('/existeEmail/:email')
  emailExists(@Param('email') email: string) {
    return this.ciclistaService.emailExists(email);
  }

  @Post('/:idCiclista/ativar')
  @HttpCode(200)
  activateCiclista(@Param('idCiclista') idCiclista: number) {
    return this.ciclistaService.activateCiclista(idCiclista);
  }

  @Put('/:idCiclista')
  @HttpCode(200)
  updateCiclista(
    @Param('idCiclista') idCiclista: number,
    @Body() updateCiclistaDto: UpdateCiclistaDto,
  ) {
    return this.ciclistaService.updateCiclista(idCiclista, updateCiclistaDto);
  }

  @Get(':idCiclista')
  async findBy(@Param('idCiclista') idCiclista: number) {
    return this.ciclistaService.findBy(idCiclista);
  }

  @Get('/:idCiclista/permiteAluguel')
  async allowAluguel(@Param('idCiclista') idCiclista: number) {
    return this.ciclistaService.allowAluguel(idCiclista);
  }

  @Get('/:idCiclista/bicicletaAlugada')
  async rentedBicicleta(@Param('idCiclista') idCiclista: number) {
    return this.ciclistaService.rentedBicicleta(idCiclista);
  }
}
