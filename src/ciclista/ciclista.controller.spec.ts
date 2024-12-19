import { Test, TestingModule } from '@nestjs/testing';
import CiclistaController from './ciclista.controller';
import { CiclistaService } from './ciclista.service';
import CreateCiclistaDto from './dto/create-ciclista.dto';
import UpdateCiclistaDto from './dto/update-ciclista.dto';
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
    },
  };

  const updateCiclistaDto: UpdateCiclistaDto = {
    nome: 'João Silva Atualizado',
    cpf: '12345678900',
    nacionalidade: 'Brasileira',
    nascimento: '1990-01-01',
    email: 'joao.silva.atualizado@example.com',
    urlFotoDocumento: 'https://example.com/documento-atualizado.jpg',
    senha: 'senhaSegura123',
    passaporte: {
      numero: 'P1234567',
      validade: '2030-01-01',
      pais: 'BR',
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
      updateCiclista: jest.fn(),
      findBy: jest.fn(),
      allowAluguel: jest.fn(),
      rentedBicicleta: jest.fn(),
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

  it('should update a ciclista', async () => {
    const idCiclista = 1;
    const updatedCiclista = { ...ciclista, ...updateCiclistaDto };

    ciclistaService.updateCiclista.mockResolvedValueOnce(updatedCiclista);

    const result = await ciclistaController.updateCiclista(
      idCiclista,
      updateCiclistaDto,
    );

    expect(result).toEqual(updatedCiclista);
    expect(ciclistaService.updateCiclista).toHaveBeenCalledWith(
      idCiclista,
      updateCiclistaDto,
    );
  });

  it('should find a ciclista by id', async () => {
    const idCiclista = 1;
    ciclistaService.findBy.mockResolvedValueOnce(ciclista);

    const result = await ciclistaController.findBy(idCiclista);

    expect(result).toEqual(ciclista);
    expect(ciclistaService.findBy).toHaveBeenCalledWith(idCiclista);
  });

  it('should check if ciclista is allowed to rent a bicicleta', async () => {
    const idCiclista = 1;
    ciclistaService.allowAluguel.mockResolvedValueOnce(true);

    const result = await ciclistaController.allowAluguel(idCiclista);

    expect(result).toBe(true);
    expect(ciclistaService.allowAluguel).toHaveBeenCalledWith(idCiclista);
  });

  it('should check the rented bicicleta of a ciclista', async () => {
    const idCiclista = 1;
    const bicicleta = { id: 1, model: 'Mountain Bike' };
    ciclistaService.rentedBicicleta.mockResolvedValueOnce(bicicleta);

    const result = await ciclistaController.rentedBicicleta(idCiclista);

    expect(result).toEqual(bicicleta);
    expect(ciclistaService.rentedBicicleta).toHaveBeenCalledWith(idCiclista);
  });
});
