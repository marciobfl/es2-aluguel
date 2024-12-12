import { Test, TestingModule } from '@nestjs/testing';
import { FuncionarioService } from './funcionario.service';
import CreateFuncionarioDto from './dto/create-funcionario.dto';
import UpdateFuncionarioDto from './dto/update-funcionario.dto';
import { FuncionarioFuncao } from './domain/funcionario';
import { BadRequestException } from '@nestjs/common';
import FuncionarioController from './funcionario.controller';

describe('FuncionarioController', () => {
  let controller: FuncionarioController;
  let service: FuncionarioService;

  const mockFuncionarioService = {
    createFuncionario: jest.fn(),
    deleteFuncionario: jest.fn(),
    updateFuncionario: jest.fn(),
    findAll: jest.fn(),
    findBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuncionarioController],
      providers: [
        {
          provide: FuncionarioService,
          useValue: mockFuncionarioService,
        },
      ],
    }).compile();

    controller = module.get<FuncionarioController>(FuncionarioController);
    service = module.get<FuncionarioService>(FuncionarioService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createFuncionario', () => {
    it('should call service.createFuncionario with correct parameters', async () => {
      const dto: CreateFuncionarioDto = {
        nome: 'Test Name',
        idade: 30,
        email: 'test@example.com',
        cpf: '12345678900',
        funcao: FuncionarioFuncao.ADMINISTRADOR,
        senha: 'password123',
        confirmacaoSenha: 'password123',
      };

      await controller.createFuncionario(dto);
      expect(service.createFuncionario).toHaveBeenCalledWith(dto);
    });
  });

  describe('deleteFuncionario', () => {
    it('should call service.deleteFuncionario with correct id', async () => {
      const idFuncionario = 1;

      await controller.deleteFuncionario(idFuncionario);
      expect(service.deleteFuncionario).toHaveBeenCalledWith({
        id: idFuncionario,
      });
    });

    it('should throw a BadRequestException if id is invalid', async () => {
      jest.spyOn(service, 'deleteFuncionario').mockImplementation(() => {
        throw new BadRequestException('Invalid ID');
      });

      await expect(controller.deleteFuncionario(NaN)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('updateFuncionario', () => {
    it('should call service.updateFuncionario with correct parameters', async () => {
      const idFuncionario = 1;
      const dto: UpdateFuncionarioDto = {
        nome: 'Updated Name',
        idade: 35,
        email: 'updated@example.com',
        cpf: '09876543210',
        funcao: FuncionarioFuncao.REPARADOR,
        senha: 'newpassword123',
        confirmacaoSenha: 'newpassword123',
      };

      await controller.updateFuncionario(idFuncionario, dto);
      expect(service.updateFuncionario).toHaveBeenCalledWith(
        idFuncionario,
        dto,
      );
    });
  });

  describe('findAll', () => {
    it('should call service.findAll and return its result', async () => {
      const result = [
        {
          id: 1,
          matricula: 'A123',
          nome: 'Test Name',
          idade: 30,
          email: 'test@example.com',
          cpf: '12345678900',
          funcao: FuncionarioFuncao.ADMINISTRADOR,
          senha: 'password123',
          confirmacaoSenha: 'password123',
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      const response = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(response).toBe(result);
    });
  });

  describe('findBy', () => {
    it('should call service.findBy with correct id and return its result', async () => {
      const idFuncionario = 1;
      const result = {
        id: 1,
        matricula: 'A123',
        nome: 'Test Name',
        idade: 30,
        email: 'test@example.com',
        cpf: '12345678900',
        funcao: FuncionarioFuncao.REPARADOR,
        senha: 'password123',
        confirmacaoSenha: 'password123',
      };
      jest.spyOn(service, 'findBy').mockResolvedValue(result);

      const response = await controller.findBy(idFuncionario);
      expect(service.findBy).toHaveBeenCalledWith(idFuncionario);
      expect(response).toBe(result);
    });

    it('should throw a BadRequestException if id is invalid', async () => {
      jest.spyOn(service, 'findBy').mockImplementation(() => {
        throw new BadRequestException('Invalid ID');
      });

      await expect(controller.findBy(NaN)).rejects.toThrow(BadRequestException);
    });
  });
});
