import { Test, TestingModule } from '@nestjs/testing';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioRepository } from './domain/funcionario.repository';
import { AppError, AppErrorType } from 'src/common/domain/app-error';
import CreateFuncionarioDto from './dto/create-funcionario.dto';
import DeleteFuncionarioDto from './dto/delete-funcionario.dto';
import UpdateFuncionarioDto from './dto/update-funcionario.dto';
import { FuncionarioFuncao } from './domain/funcionario';
import FuncionarioEntity from './domain/funcionario.entity';

describe('FuncionarioService', () => {
  let service: FuncionarioService;
  let repository: jest.Mocked<FuncionarioRepository>;

  const funcionario: FuncionarioEntity = {
    confirmacaoSenha: '1234',
    cpf: '12312312312',
    email: 'test@gmail.com',
    funcao: FuncionarioFuncao.REPARADOR,
    idade: 43,
    matricula: '3244234532',
    nome: 'test',
    senha: '1234',
    id: 1,
  };

  const funcionarioDomain = FuncionarioEntity.toDomain(funcionario);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FuncionarioService,
        {
          provide: 'FuncionarioRepository',
          useValue: {
            findBy: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FuncionarioService>(FuncionarioService);
    repository = module.get<jest.Mocked<FuncionarioRepository>>(
      'FuncionarioRepository',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFuncionario', () => {
    it('should throw an error if funcionario already exists', async () => {
      repository.findBy.mockResolvedValueOnce(funcionario);

      await expect(
        service.createFuncionario(new CreateFuncionarioDto()),
      ).rejects.toThrow(
        new AppError(
          'Funcionário já cadastrado!\n',
          AppErrorType.RESOURCE_CONFLICT,
        ),
      );

      expect(repository.findBy).toHaveBeenCalled();
    });

    it('should create a new funcionario if they do not exist', async () => {
      repository.findBy.mockResolvedValueOnce(null);
      repository.save.mockResolvedValueOnce(funcionario);

      await expect(
        service.createFuncionario(new CreateFuncionarioDto()),
      ).resolves.toStrictEqual(funcionarioDomain);

      expect(repository.findBy).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('deleteFuncionario', () => {
    it('should throw an error if funcionario does not exist', async () => {
      repository.findBy.mockResolvedValueOnce(null);

      await expect(
        service.deleteFuncionario(new DeleteFuncionarioDto()),
      ).rejects.toThrow(
        new AppError(
          'Funcionário não cadastrado!\n',
          AppErrorType.RESOURCE_NOT_FOUND,
        ),
      );

      expect(repository.findBy).toHaveBeenCalled();
    });

    it('should delete funcionario if they exist', async () => {
      repository.findBy.mockResolvedValueOnce(funcionario);

      await expect(
        service.deleteFuncionario(new DeleteFuncionarioDto()),
      ).resolves.toBeUndefined();

      expect(repository.findBy).toHaveBeenCalled();
      expect(repository.delete).toHaveBeenCalled();
    });
  });

  describe('updateFuncionario', () => {
    it('should throw an error if funcionario does not exist', async () => {
      repository.findBy.mockResolvedValueOnce(null);

      await expect(
        service.updateFuncionario(1, new UpdateFuncionarioDto()),
      ).rejects.toThrow(
        new AppError(
          'Funcionário não cadastrado!\n',
          AppErrorType.RESOURCE_NOT_FOUND,
        ),
      );

      expect(repository.findBy).toHaveBeenCalled();
    });

    it('should update funcionario if they exist', async () => {
      repository.findBy.mockResolvedValueOnce(funcionario);

      await expect(
        service.updateFuncionario(1, new UpdateFuncionarioDto()),
      ).resolves.toBeUndefined();

      expect(repository.findBy).toHaveBeenCalled();
      expect(repository.update).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all funcionarios', async () => {
      repository.findAll.mockResolvedValueOnce([funcionario]);

      await expect(service.findAll()).resolves.toStrictEqual([
        funcionarioDomain,
      ]);

      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findBy', () => {
    it('should throw an error if funcionario is not found', async () => {
      jest.spyOn(repository, 'findBy').mockResolvedValueOnce(null);

      await expect(service.findBy(123)).rejects.toThrow(
        new AppError(
          'Funcionário não cadastrado!\n',
          AppErrorType.RESOURCE_NOT_FOUND,
        ),
      );

      expect(repository.findBy).toHaveBeenCalled();
    });

    it('should return funcionario by id if found', async () => {
      jest.spyOn(repository, 'findBy').mockResolvedValueOnce(funcionario);

      const result = await service.findBy(1);
      expect(result).toStrictEqual(funcionarioDomain);

      expect(repository.findBy).toHaveBeenCalled();
    });
  });
});
