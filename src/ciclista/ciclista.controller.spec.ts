import { Test, TestingModule } from '@nestjs/testing';
import CiclistaController from './ciclista.controller';
import { CiclistaService } from './ciclista.service';
import CreateCiclistaDto from './dto/create-ciclista.dto';
import { Ciclista, CiclistaStatus } from './domain/ciclista';

describe('CiclistaController', () => {
  let ciclistaController: CiclistaController;
  let ciclistaService: CiclistaService;

  const mockCiclistaService = {
    createCiclista: jest.fn(),
    emailExists: jest.fn(),
    activateCiclista: jest.fn(),
  };

  const createCiclista: CreateCiclistaDto = {
    ciclista: {
      nome: 'string',
      nascimento: '2024-11-30',
      cpf: '78830917946',
      passaporte: {
        numero: 'string',
        validade: '2024-11-30',
        pais: 'WJ',
      },
      nacionalidade: 'string',
      email: 'user@example.com',
      urlFotoDocumento: 'string',
      senha: 'string',
    },
    meioDePagamento: {
      nomeTitular: 'string',
      numero: '1234123412341234',
      validade: '2024-11-30',
      cvv: '1270',
    },
  };

  const ciclista: Ciclista = {
    id: 0,
    nome: 'string',
    nascimento: '2024-11-30',
    cpf: '78830917946',
    passaporte: {
      numero: 'string',
      validade: '2024-11-30',
      pais: 'WJ',
    },
    nacionalidade: 'string',
    email: 'user@example.com',
    urlFotoDocumento: 'string',
    status: CiclistaStatus.CONFIRMACAO_PENDENTE,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiclistaController],
      providers: [
        {
          provide: CiclistaService,
          useValue: mockCiclistaService,
        },
      ],
    }).compile();

    ciclistaController = module.get<CiclistaController>(CiclistaController);
    ciclistaService = module.get<CiclistaService>(CiclistaService);
  });

  describe('createCiclista', () => {
    it('should call createCiclista on CiclistaService and return the result', async () => {
      jest.spyOn(ciclistaService, 'createCiclista').mockResolvedValue(ciclista);

      await expect(
        ciclistaController.createCiclista(createCiclista),
      ).resolves.toBe(ciclista);
      expect(ciclistaService.createCiclista).toHaveBeenCalledWith(
        createCiclista,
      );
    });
  });

  describe('emailExists', () => {
    it('should return true when email exists', async () => {
      const email = 'user@example.com';
      jest.spyOn(ciclistaService, 'emailExists').mockResolvedValue(true);

      await expect(ciclistaController.emailExists(email)).resolves.toBe(true);
      expect(ciclistaService.emailExists).toHaveBeenCalledWith(email);
    });

    it('should return false when email does not exist', async () => {
      const email = 'nonexistent@example.com';
      jest.spyOn(ciclistaService, 'emailExists').mockResolvedValue(false);

      await expect(ciclistaController.emailExists(email)).resolves.toBe(false);
      expect(ciclistaService.emailExists).toHaveBeenCalledWith(email);
    });
  });

  describe('activateCiclista', () => {
    it('should activate a ciclista and return the updated object', async () => {
      const idCiclista = 1;
      const activatedCiclista = {
        ...ciclista,
        status: CiclistaStatus.ATIVADO,
      };
      jest
        .spyOn(ciclistaService, 'activateCiclista')
        .mockResolvedValue(activatedCiclista);

      await expect(
        ciclistaController.activateCiclista(idCiclista),
      ).resolves.toBe(activatedCiclista);
      expect(ciclistaService.activateCiclista).toHaveBeenCalledWith(idCiclista);
    });
  });
});
