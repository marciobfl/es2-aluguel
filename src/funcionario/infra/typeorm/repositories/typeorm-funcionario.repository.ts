import { Repository } from 'typeorm';
import {
  ExistsFuncionario,
  FuncionarioRepository,
} from 'src/funcionario/domain/funcionario.repository';
import TypeormFuncionarioEntity from '../entities/typeorm-funcionario.entity';
import FuncionarioEntity from 'src/funcionario/domain/funcionario.entity';

export class TypeormFuncionarioRepository implements FuncionarioRepository {
  constructor(
    private readonly funcionarioDatabase: Repository<TypeormFuncionarioEntity>,
  ) {}
  async delete(funcionarioId: number): Promise<void> {
    await this.funcionarioDatabase.delete(funcionarioId);
  }
  async update(data: MakeRequired<FuncionarioEntity, 'id'>): Promise<void> {
    await this.funcionarioDatabase.update(data.id, data);
  }
  findBy(query: ExistsFuncionario): Promise<FuncionarioEntity> {
    return this.funcionarioDatabase.findOne({
      where: query,
    });
  }
  save(funcionario: FuncionarioEntity): Promise<FuncionarioEntity> {
    return this.funcionarioDatabase.save(funcionario);
  }
}
