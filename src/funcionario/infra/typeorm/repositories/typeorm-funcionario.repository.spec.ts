import { Repository } from 'typeorm';
import { ExistsFuncionario } from 'src/funcionario/domain/funcionario.repository';
import TypeormFuncionarioEntity from '../entities/typeorm-funcionario.entity';
import FuncionarioEntity from 'src/funcionario/domain/funcionario.entity';
import { FuncionarioFuncao } from 'src/funcionario/domain/funcionario';
import { TypeormFuncionarioRepository } from './typeorm-funcionario.repository';

describe('TypeormFuncionarioRepository', () => {
  let repository: TypeormFuncionarioRepository;
  let mockDatabase: jest.Mocked<Repository<TypeormFuncionarioEntity>>;

  beforeEach(() => {
    mockDatabase = {
      delete: jest.fn(),
      update: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<TypeormFuncionarioEntity>>;

    repository = new TypeormFuncionarioRepository(mockDatabase);
  });

  it('should call delete with correct id', async () => {
    const id = 1;
    await repository.delete(id);
    expect(mockDatabase.delete).toHaveBeenCalledWith(id);
  });

  it('should call update with correct data', async () => {
    const funcionario: TypeormFuncionarioEntity = {
      id: 1,
      nome: 'John Doe',
      idade: 30,
      email: 'john.doe@example.com',
      cpf: '123.456.789-00',
      funcao: FuncionarioFuncao.ADMINISTRADOR,
      senha: 'securePassword123',
      confirmacaoSenha: 'securePassword123',
      matricula: 'MAT123',
    };

    await repository.update(funcionario);
    expect(mockDatabase.update).toHaveBeenCalledWith(
      funcionario.id,
      funcionario,
    );
  });

  it('should call findOne with correct query', async () => {
    const query: ExistsFuncionario = { email: 'john.doe@example.com' };
    const mockResult = new TypeormFuncionarioEntity();
    mockDatabase.findOne.mockResolvedValue(mockResult);

    const result = await repository.findBy(query);
    expect(mockDatabase.findOne).toHaveBeenCalledWith({ where: query });
    expect(result).toBe(mockResult);
  });

  it('should return all funcionarios from findAll', async () => {
    const mockResult = [
      new TypeormFuncionarioEntity(),
      new TypeormFuncionarioEntity(),
    ];
    mockDatabase.find.mockResolvedValue(mockResult);

    const result = await repository.findAll();
    expect(mockDatabase.find).toHaveBeenCalledWith({});
    expect(result).toBe(mockResult);
  });

  it('should call save with correct data', async () => {
    const funcionario: FuncionarioEntity = {
      nome: 'John Doe',
      idade: 30,
      email: 'john.doe@example.com',
      cpf: '123.456.789-00',
      funcao: FuncionarioFuncao.REPARADOR,
      senha: 'securePassword123',
      confirmacaoSenha: 'securePassword123',
      matricula: 'MAT123',
    };

    const mockResult = new TypeormFuncionarioEntity();
    mockDatabase.save.mockResolvedValue(mockResult);

    const result = await repository.save(funcionario);
    expect(mockDatabase.save).toHaveBeenCalledWith(funcionario);
    expect(result).toBe(mockResult);
  });
});
