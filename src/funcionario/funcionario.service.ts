import { Inject, Injectable } from '@nestjs/common';
import CreateFuncionarioDto from './dto/create-funcionario.dto';
import { FuncionarioRepository } from './domain/funcionario.repository';
import FuncionarioEntity from './domain/funcionario.entity';
import DeleteFuncionarioDto from './dto/delete-funcionario.dto';

@Injectable()
export class FuncionarioService {
  constructor(
    @Inject('FuncionarioRepository')
    private readonly funcionarioRepository: FuncionarioRepository,
  ) {}

  async createFuncionario(createFuncionarioDto: CreateFuncionarioDto) {
    const funcionarioAlreadyExists = await this.funcionarioRepository.findBy({
      email: createFuncionarioDto.email,
    });

    if (funcionarioAlreadyExists) {
      throw new Error('Funcionário já cadastrado!\n');
    }

    const funcionarioMatricula = this.generateMatricula();

    const newFuncionario = await this.funcionarioRepository.save({
      ...createFuncionarioDto,
      matricula: funcionarioMatricula,
    });

    return FuncionarioEntity.toDomain(newFuncionario);
  }

  async deleteFuncionario(deleteFuncionarioDto: DeleteFuncionarioDto) {
    const funcionarioAlreadyExists = await this.funcionarioRepository.findBy({
      id: deleteFuncionarioDto.id,
    });

    if (!funcionarioAlreadyExists) {
      throw new Error('Funcionário não cadastrado!\n');
    }

    await this.funcionarioRepository.delete(deleteFuncionarioDto.id);
  }

  generateMatricula() {
    const currentYear = new Date().getFullYear();
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `${currentYear}${randomNumber}`;
  }
}
