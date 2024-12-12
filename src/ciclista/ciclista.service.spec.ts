import { Test } from '@nestjs/testing';
import { CiclistaService } from './ciclista.service';
import { CiclistaRepository } from './domain/ciclista.repository';
import { Ciclista, CiclistaStatus } from './domain/ciclista';
import CreateCiclistaDto from './dto/create-ciclista.dto';
import TypeormCiclistaEntity from './infra/typeorm/entities/typeorm-ciclista.entity';
import TypeormCartaoDeCreditoEntity from 'src/cartao-de-credito/infra/typeorm/entities/typeorm-cartao-de-credito.entity';
import CiclistaEntity from './domain/ciclista.entity';

describe('CiclistaService', () => {
  let ciclistaService: CiclistaService;
  let mockRepository: CiclistaRepository;

  const createCiclista: CreateCiclistaDto = {
    ciclista: {
      nome: 'Jose das Couves',
      nascimento: '1990-01-01',
      cpf: '123.456.789-01',
      passaporte: {
        numero: 'P1234567',
        validade: '2030-01-01',
        pais: 'BR',
      },
      nacionalidade: 'string',
      email: 'user@example.com',
      urlFotoDocumento: 'string',
      senha: 'string',
    },
    meioDePagamento: {
      nomeTitular: 'Jose das Couves',
      numero: '5284 2540 4664 6997',
      validade: '12/25',
      cvv: '123',
      id: 0,
    },
  };
  let ciclista: TypeormCiclistaEntity;
  let ciclistaDomain: Ciclista;

  beforeEach(async () => {
    ciclista = {
      id: 1,
      nome: 'Jose das Couves',
      nascimento: '1990-01-01',
      cpf: '123.456.789-01',
      passaporte: {
        numero: 'P1234567',
        validade: '2030-01-01',
        pais: 'BR',
        id: 1,
      },
      nacionalidade: 'Brasileiro',
      email: 'user@example.com',
      urlFotoDocumento: 'http://example.com/documento.jpg',
      status: CiclistaStatus.CONFIRMACAO_PENDENTE,
      senha: '',
      cartaoDeCredito: new TypeormCartaoDeCreditoEntity(),
    };

    ciclistaDomain = CiclistaEntity.toDomain(ciclista);

    mockRepository = {
      findBy: jest.fn(),
      save: jest.fn(),
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
    jest.spyOn(mockRepository, 'findBy').mockResolvedValue(null);
    jest.spyOn(mockRepository, 'save').mockResolvedValue(ciclista);
    await expect(
      ciclistaService.createCiclista(createCiclista),
    ).resolves.toStrictEqual(ciclistaDomain);
  });
  it('should not create ciclista when ciclista already exists', async () => {
    jest.spyOn(mockRepository, 'findBy').mockResolvedValue(ciclista);
    await expect(
      ciclistaService.createCiclista(createCiclista),
    ).rejects.toThrow('Ciclista já cadastrado!\n');
  });
  it('should return true if the email exists', async () => {
    const email = 'user@example.com';
    jest.spyOn(mockRepository, 'findBy').mockResolvedValue(ciclista);
    await expect(ciclistaService.emailExists(email)).resolves.toBe(true);
    expect(mockRepository.findBy).toHaveBeenCalledWith({ email });
  });
  it('should throw an error if the ciclista status is already ativado', async () => {
    const id = ciclista.id;
    jest.spyOn(mockRepository, 'findBy').mockResolvedValue(ciclista);
    ciclista.status = CiclistaStatus.ATIVADO;
    jest.spyOn(mockRepository, 'save').mockResolvedValue(ciclista);
    await expect(ciclistaService.activateCiclista(id)).rejects.toThrow(
      'Ciclista já cadastrado!\n',
    );
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
  it('should return false if the email does not exist', async () => {
    const email = 'nonexistent@example.com';
    jest.spyOn(mockRepository, 'findBy').mockResolvedValue(null);
    await expect(ciclistaService.emailExists(email)).resolves.toBe(false);
    expect(mockRepository.findBy).toHaveBeenCalledWith({ email });
  });
  it('should activate a ciclista with a valid ID', async () => {
    const id = ciclista.id;
    jest.spyOn(mockRepository, 'findBy').mockResolvedValue(ciclista);
    jest.spyOn(mockRepository, 'save').mockResolvedValue(ciclista);
    ciclistaDomain.status = CiclistaStatus.ATIVADO;
    await expect(ciclistaService.activateCiclista(id)).resolves.toEqual(
      ciclistaDomain,
    );
    expect(mockRepository.findBy).toHaveBeenCalled();
    expect(mockRepository.save).toHaveBeenCalled();
  });
  it('should throw an error if ciclista does not exist', async () => {
    const id = 123;
    jest.spyOn(mockRepository, 'findBy').mockResolvedValue(null);
    await expect(ciclistaService.activateCiclista(id)).rejects.toThrow(
      'Ciclista não encontrado!',
    );
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});
