import { Inject, Injectable } from '@nestjs/common';
import CreateFuncionarioDto from './dto/create-funcionario.dto';
import { FuncionarioRepository } from './domain/funcionario.repository';
import FuncionarioEntity from './domain/funcionario.entity';
import DeleteFuncionarioDto from './dto/delete-funcionario.dto';
import UpdateFuncionarioDto from './dto/update-funcionario.dto';
import { AppError, AppErrorType } from 'src/common/domain/app-error';

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
      throw new AppError(
        'Funcionário já cadastrado!\n',
        AppErrorType.RESOURCE_CONFLICT,
      );
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
      throw new AppError(
        'Funcionário não cadastrado!\n',
        AppErrorType.RESOURCE_NOT_FOUND,
      );
    }

    await this.funcionarioRepository.delete(deleteFuncionarioDto.id);
  }

  async updateFuncionario(idFuncionario: number, data: UpdateFuncionarioDto) {
    const funcionario = await this.funcionarioRepository.findBy({
      id: idFuncionario,
    });

    if (!funcionario) {
      throw new AppError(
        'Funcionário não cadastrado!\n',
        AppErrorType.RESOURCE_NOT_FOUND,
      );
    }

    await this.funcionarioRepository.update({ ...data, id: funcionario.id });
  }

  async findAll() {
    const funcionarios = await this.funcionarioRepository.findAll();
    return funcionarios.map((funcionario) =>
      FuncionarioEntity.toDomain(funcionario),
    );
  }

  async findBy(idFuncionario: number) {
    const funcionario = await this.funcionarioRepository.findBy({
      id: idFuncionario,
    });

    if (!funcionario) {
      throw new AppError(
        'Funcionário não cadastrado!\n',
        AppErrorType.RESOURCE_NOT_FOUND,
      );
    }
    return FuncionarioEntity.toDomain(funcionario);
  }

  generateMatricula() {
    const currentYear = new Date().getFullYear();
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `${currentYear}${randomNumber}`;
  }
}
