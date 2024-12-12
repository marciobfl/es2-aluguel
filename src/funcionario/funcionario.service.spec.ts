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
  let repository: FuncionarioRepository;

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
    repository = module.get<FuncionarioRepository>('FuncionarioRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFuncionario', () => {
    it('should throw an error if the employee already exists', async () => {
      jest.spyOn(repository, 'findBy').mockResolvedValueOnce(funcionario);

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

    it('should create a new employee if they do not exist', async () => {
      jest.spyOn(repository, 'findBy').mockResolvedValueOnce(null);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(funcionario);
      await expect(
        service.createFuncionario(new CreateFuncionarioDto()),
      ).resolves.toStrictEqual(funcionarioDomain);
      expect(repository.findBy).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('deleteFuncionario', () => {
    it('should throw an error if the employee does not exist', async () => {
      jest.spyOn(repository, 'findBy').mockResolvedValueOnce(null);

      await expect(
        service.deleteFuncionario(new DeleteFuncionarioDto()),
      ).rejects.toThrow(
        new AppError(
          'Funcionário não cadastrado!\n',
          AppErrorType.RESOURCE_NOT_FOUND,
        ),
      );
    });

    it('should delete the employee if they exist', async () => {
      jest.spyOn(repository, 'findBy').mockResolvedValueOnce(funcionario);
      await expect(
        service.deleteFuncionario(new DeleteFuncionarioDto()),
      ).resolves.toBeUndefined();
      expect(repository.delete).toHaveBeenCalled();
    });
  });

  describe('updateFuncionario', () => {
    it('should throw an error if the employee does not exist', async () => {
      jest.spyOn(repository, 'findBy').mockResolvedValueOnce(null);
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

    it('should update the employee if they exist', async () => {
      jest.spyOn(repository, 'findBy').mockResolvedValueOnce(funcionario);
      await expect(
        service.updateFuncionario(1, new UpdateFuncionarioDto()),
      ).resolves.toBeUndefined();
      expect(repository.findBy).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all employees', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValueOnce([funcionario]);
      await expect(service.findAll()).resolves.toStrictEqual([
        funcionarioDomain,
      ]);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findBy', () => {
    it('should return the employee by id', async () => {
      jest.spyOn(repository, 'findBy').mockResolvedValueOnce(funcionario);
      await expect(service.findBy(1)).resolves.toStrictEqual(funcionarioDomain);
      expect(repository.findBy).toHaveBeenCalled();
    });
  });
});
