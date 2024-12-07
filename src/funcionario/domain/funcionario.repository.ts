import FuncionarioEntity from './funcionario.entity';

export type UpdateFuncionario = Partial<FuncionarioEntity>;
export type ExistsFuncionario = { email?: string; id?: number };

export interface FuncionarioRepository {
  save(funcionario: FuncionarioEntity): Promise<FuncionarioEntity>;
  update(
    data: MakeRequired<Omit<FuncionarioEntity, 'matricula'>, 'id'>,
  ): Promise<void>;
  delete(funcionarioId: number): Promise<void>;
  findBy(query: ExistsFuncionario): Promise<FuncionarioEntity>;
}
