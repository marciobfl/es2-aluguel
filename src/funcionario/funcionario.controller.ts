import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import CreateFuncionarioDto from './dto/create-funcionario.dto';
import { FuncionarioService } from './funcionario.service';

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
}
