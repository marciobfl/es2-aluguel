import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import CreateFuncionarioDto from './dto/create-funcionario.dto';
import { FuncionarioService } from './funcionario.service';
import UpdateFuncionarioDto from './dto/update-funcionario.dto';

@Controller('funcionario')
export default class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post('/')
  createFuncionario(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.createFuncionario(createFuncionarioDto);
  }

  @Delete(':idFuncionario')
  async deleteFuncionario(
    @Param('idFuncionario', ParseIntPipe) idFuncionario: number,
  ) {
    await this.funcionarioService.deleteFuncionario({ id: idFuncionario });
  }

  @Put(':idFuncionario')
  updateFuncionario(
    @Param('idFuncionario') idFuncionario: number,
    @Body() data: UpdateFuncionarioDto,
  ) {
    return this.funcionarioService.updateFuncionario(idFuncionario, data);
  }

  @Get('/')
  async findAll() {
    return this.funcionarioService.findAll();
  }

  @Get(':idFuncionario')
  async findBy(@Param('idFuncionario') idFuncionario: number) {
    return this.funcionarioService.findBy(idFuncionario);
  }
}
