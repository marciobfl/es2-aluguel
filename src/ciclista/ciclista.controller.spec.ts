import { Test, TestingModule } from '@nestjs/testing';
import CiclistaController from './ciclista.controller';
import { CiclistaService } from './ciclista.service';
import CreateCiclistaDto from './dto/create-ciclista.dto';
import { Ciclista, CiclistaStatus } from './domain/ciclista';

describe('CiclistaController', () => {
  let ciclistaController: CiclistaController;
  let ciclistaService: jest.Mocked<CiclistaService>;

  const createCiclistaDto: CreateCiclistaDto = {
    ciclista: {
      nome: 'João Silva',
      nascimento: '1990-01-01',
      cpf: '12345678900',
      passaporte: {
        numero: 'P1234567',
        validade: '2030-01-01',
        pais: 'BR',
      },
      nacionalidade: 'Brasileira',
      email: 'joao.silva@example.com',
      urlFotoDocumento: 'https://example.com/documento.jpg',
      senha: 'senhaSegura123',
    },
    meioDePagamento: {
      nomeTitular: 'João Silva',
      numero: '4111111111111111',
      validade: '2030-01',
      cvv: '123',
      id: 0,
    },
  };

  const ciclista: Ciclista = {
    id: 1,
    nome: 'Jose das Couves',
    nascimento: '1990-01-01',
    cpf: '12345678900',
    passaporte: {
      numero: 'P1234567',
      validade: '2030-01-01',
      pais: 'BR',
    },
    nacionalidade: 'Brasileiro',
    email: 'user@example.com',
    urlFotoDocumento: 'https://example.com/documento.jpg',
    status: CiclistaStatus.CONFIRMACAO_PENDENTE,
  };

  beforeEach(async () => {
    const mockService = {
      createCiclista: jest.fn(),
      emailExists: jest.fn(),
      activateCiclista: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiclistaController],
      providers: [
        {
          provide: CiclistaService,
          useValue: mockService,
        },
      ],
    }).compile();

    ciclistaController = module.get<CiclistaController>(CiclistaController);
    ciclistaService = module.get<CiclistaService>(
      CiclistaService,
    ) as jest.Mocked<CiclistaService>;
  });

  it('should create a new ciclista', async () => {
    ciclistaService.createCiclista.mockResolvedValueOnce(ciclista);

    const result = await ciclistaController.createCiclista(createCiclistaDto);

    expect(result).toEqual(ciclista);
    expect(ciclistaService.createCiclista).toHaveBeenCalledWith(
      createCiclistaDto,
    );
  });

  it('should check if an email exists', async () => {
    const email = 'joao.silva@example.com';
    ciclistaService.emailExists.mockResolvedValueOnce(true);

    const result = await ciclistaController.emailExists(email);

    expect(result).toBe(true);
    expect(ciclistaService.emailExists).toHaveBeenCalledWith(email);
  });

  it('should activate a ciclista', async () => {
    const idCiclista = 1;
    const activatedCiclista = {
      ...ciclista,
      status: CiclistaStatus.ATIVADO,
    };
    ciclistaService.activateCiclista.mockResolvedValueOnce(activatedCiclista);

    const result = await ciclistaController.activateCiclista(idCiclista);

    expect(result).toEqual(activatedCiclista);
    expect(ciclistaService.activateCiclista).toHaveBeenCalledWith(idCiclista);
  });
});
