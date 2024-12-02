import { Test } from '@nestjs/testing';
import { CiclistaService } from './ciclista.service';
import { CiclistaRepository } from './domain/ciclista.repository';
import { Ciclista, CiclistaStatus } from './domain/ciclista';
import CreateCiclistaDto from './dto/create-ciclista.dto';

describe('CiclistaService', () => {
  let ciclistaService: CiclistaService;
  let mockRepository: CiclistaRepository;
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
    mockRepository = {
      ciclistaExists: jest.fn(),
      create: jest.fn(),
      activateCiclista: jest.fn(),
      update: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        CiclistaService,
        {
          provide: 'CiclistaRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    ciclistaService = module.get(CiclistaService);
    mockRepository = module.get('CiclistaRepository');
  });

  it('should create ciclista', async () => {
    jest.spyOn(mockRepository, 'ciclistaExists').mockResolvedValue(null);
    jest.spyOn(mockRepository, 'create').mockResolvedValue(ciclista);
    await expect(
      ciclistaService.createCiclista(createCiclista),
    ).resolves.toStrictEqual(ciclista);
  });

  it('should not create ciclista when ciclista already exists', async () => {
    jest.spyOn(mockRepository, 'ciclistaExists').mockResolvedValue(true);
    await expect(
      ciclistaService.createCiclista(createCiclista),
    ).rejects.toThrow('Ciclista já cadastrado!\n');
  });

  it('should return true if the email exists', async () => {
    const email = 'user@example.com';
    jest.spyOn(mockRepository, 'ciclistaExists').mockResolvedValue(true);

    await expect(ciclistaService.emailExists(email)).resolves.toBe(true);
    expect(mockRepository.ciclistaExists).toHaveBeenCalledWith({ email });
  });

  it('should return false if the email does not exist', async () => {
    const email = 'nonexistent@example.com';
    jest.spyOn(mockRepository, 'ciclistaExists').mockResolvedValue(false);

    await expect(ciclistaService.emailExists(email)).resolves.toBe(false);
    expect(mockRepository.ciclistaExists).toHaveBeenCalledWith({ email });
  });

  it('should activate a ciclista with a valid ID', async () => {
    const id = ciclista.id;
    jest.spyOn(mockRepository, 'ciclistaExists').mockResolvedValue(true);
    jest.spyOn(mockRepository, 'activateCiclista').mockResolvedValue(ciclista);

    await expect(ciclistaService.activateCiclista(id)).resolves.toEqual(
      ciclista,
    );
    expect(mockRepository.ciclistaExists).toHaveBeenCalledWith({ id });
    expect(mockRepository.activateCiclista).toHaveBeenCalledWith(id);
  });

  it('should throw an error if ciclista does not exist', async () => {
    const id = 123;
    jest.spyOn(mockRepository, 'ciclistaExists').mockResolvedValue(false);

    await expect(ciclistaService.activateCiclista(id)).rejects.toThrowError(
      'Ciclista não encontrado!',
    );
    expect(mockRepository.activateCiclista).not.toHaveBeenCalled();
  });
});
