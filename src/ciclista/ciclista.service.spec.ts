import { Test } from '@nestjs/testing';
import { CiclistaService } from './ciclista.service';
import { CiclistaRepository } from './domain/ciclista.repository';
import { Ciclista, CiclistaStatus } from './domain/ciclista';
import CreateCiclistaDto from './dto/create-ciclista.dto';
import TypeormCartaoDeCreditoEntity from 'src/cartao-de-credito/infra/typeorm/entities/typeorm-cartao-de-credito.entity';
import CiclistaEntity from './domain/ciclista.entity';
import { ExternoService } from 'src/common/external/externo.service';
import { AluguelRepository } from 'src/aluguel/domain/aluguel.repository';
import { EquipamentoService } from 'src/common/external/equipamento.service';
import AluguelEntity from 'src/aluguel/domain/aluguel.entity';
import Bicicleta, { BicicletaStatus } from 'src/common/domain/bicicleta';

describe('CiclistaService', () => {
  let ciclistaService: CiclistaService;
  let mockRepository: CiclistaRepository;
  let mockAluguelRepository: AluguelRepository;
  let mockEquipamentoService: EquipamentoService;
  let mockExternoService: ExternoService;

  let createCiclista: CreateCiclistaDto;
  let ciclista: CiclistaEntity;
  let ciclistaDomain: Ciclista;
  let aluguel: AluguelEntity;
  let bicicleta: Bicicleta;

  beforeEach(async () => {
    createCiclista = {
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
      },
    };

    ciclista = {
      id: 1,
      ...createCiclista.ciclista,
      status: CiclistaStatus.AGUARDANDO_CONFIRMACAO,
      cartaoDeCredito: new TypeormCartaoDeCreditoEntity(),
    };

    ciclistaDomain = CiclistaEntity.toDomain(ciclista);

    aluguel = {
      bicicleta: 1,
      ciclista: ciclista.id,
      cobranca: 10,
      horaFim: null,
      horaInicio: new Date(),
      id: 1,
      trancaFim: 0,
      trancaInicio: 1,
    };

    bicicleta = {
      ano: '2022',
      id: 1,
      marca: 'caloi',
      modelo: 'bmx',
      numero: 123,
      status: BicicletaStatus.DISPONIVEL,
    };

    mockRepository = {
      findBy: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    mockAluguelRepository = {
      findBy: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    mockExternoService = {
      sendEmail: jest.fn(),
      authorizeCobranca: jest.fn(),
    } as unknown as ExternoService;

    mockEquipamentoService = {
      getBicicletaById: jest.fn(),
      getTrancaById: jest.fn(),
      lockTranca: jest.fn(),
      unlockTranca: jest.fn(),
    } as unknown as EquipamentoService;

    const module = await Test.createTestingModule({
      providers: [
        CiclistaService,
        { provide: 'CiclistaRepository', useValue: mockRepository },
        { provide: 'AluguelRepository', useValue: mockAluguelRepository },
        { provide: ExternoService, useValue: mockExternoService },
        { provide: EquipamentoService, useValue: mockEquipamentoService },
      ],
    }).compile();

    mockRepository = module.get('CiclistaRepository');
    mockAluguelRepository = module.get('AluguelRepository');
    ciclistaService = module.get(CiclistaService);
    mockEquipamentoService = module.get(EquipamentoService);
    mockExternoService = module.get(ExternoService);
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
    ciclista.status = CiclistaStatus.ATIVO;
    jest.spyOn(mockRepository, 'save').mockResolvedValue(ciclista);
    await expect(ciclistaService.activateCiclista(id)).rejects.toThrow(
      'Ciclista já ativado!\n',
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
    ciclistaDomain.status = CiclistaStatus.ATIVO;
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

  it('should return the employee by id', async () => {
    jest.spyOn(mockRepository, 'findBy').mockResolvedValueOnce(ciclista);
    await expect(ciclistaService.findBy(1)).resolves.toStrictEqual(
      ciclistaDomain,
    );
    expect(mockRepository.findBy).toHaveBeenCalled();
  });

  describe('updateCiclista', () => {
    it('should throw an error if ciclista does not exist', async () => {
      jest.spyOn(mockRepository, 'findBy').mockResolvedValue(null);
      await expect(
        ciclistaService.updateCiclista(123, ciclista),
      ).rejects.toThrow('Ciclista não encontrado!\n');
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it('should throw an error if ciclista is not activated', async () => {
      ciclista.status = CiclistaStatus.AGUARDANDO_CONFIRMACAO;
      jest.spyOn(mockRepository, 'findBy').mockResolvedValue(ciclista);

      await expect(
        ciclistaService.updateCiclista(ciclista.id, ciclista),
      ).rejects.toThrow('Ciclista não ativado!\n');
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it('should update ciclista when ciclista is found and activated', async () => {
      ciclista.status = CiclistaStatus.ATIVO;
      jest.spyOn(mockRepository, 'findBy').mockResolvedValue(ciclista);

      ciclista.nome = 'teste';
      jest.spyOn(mockRepository, 'update').mockResolvedValue(ciclista);

      const result = await ciclistaService.updateCiclista(
        ciclista.id,
        ciclista,
      );

      expect(result).toStrictEqual(CiclistaEntity.toDomain(ciclista));
    });
  });

  describe('allowAluguel', () => {
    it('should return false if the ciclista has an ongoing rental', async () => {
      ciclista.status = CiclistaStatus.ATIVO;
      jest.spyOn(mockRepository, 'findBy').mockResolvedValue(ciclista);
      jest.spyOn(mockAluguelRepository, 'findBy').mockResolvedValue(aluguel);
      await expect(ciclistaService.allowAluguel(ciclista.id)).resolves.toBe(
        false,
      );
    });

    it('should return true if the ciclista has no ongoing rental', async () => {
      ciclista.status = CiclistaStatus.ATIVO;
      jest.spyOn(mockRepository, 'findBy').mockResolvedValue(ciclista);
      jest.spyOn(mockAluguelRepository, 'findBy').mockResolvedValue(null);
      await expect(ciclistaService.allowAluguel(ciclista.id)).resolves.toBe(
        true,
      );
    });

    it('should throw an error if ciclista does not exist', async () => {
      jest.spyOn(mockRepository, 'findBy').mockResolvedValue(null);
      await expect(ciclistaService.allowAluguel(ciclista.id)).rejects.toThrow(
        'Ciclista não encontrado!\n',
      );
    });

    it('should throw an error if ciclista is not activated', async () => {
      ciclista.status = CiclistaStatus.AGUARDANDO_CONFIRMACAO;
      jest.spyOn(mockRepository, 'findBy').mockResolvedValue(ciclista);
      await expect(ciclistaService.allowAluguel(ciclista.id)).rejects.toThrow(
        'Ciclista não ativado!\n',
      );
    });
  });

  describe('rentedBicicleta', () => {
    it('should return bicicleta details if the ciclista has an active rental', async () => {
      ciclista.status = CiclistaStatus.ATIVO;

      jest.spyOn(mockRepository, 'findBy').mockResolvedValue(ciclista);
      jest.spyOn(mockAluguelRepository, 'findBy').mockResolvedValue(aluguel);
      jest
        .spyOn(mockEquipamentoService, 'getBicicletaById')
        .mockResolvedValue(bicicleta);

      await expect(
        ciclistaService.rentedBicicleta(ciclista.id),
      ).resolves.toEqual(bicicleta);
    });

    it('should return an empty object if the ciclista has no active rental', async () => {
      ciclista.status = CiclistaStatus.ATIVO;

      jest.spyOn(mockRepository, 'findBy').mockResolvedValue(ciclista);
      jest.spyOn(mockAluguelRepository, 'findBy').mockResolvedValue(null);

      await expect(
        ciclistaService.rentedBicicleta(ciclista.id),
      ).resolves.toEqual({});
    });

    it('should throw an error if ciclista does not exist', async () => {
      jest.spyOn(mockRepository, 'findBy').mockResolvedValue(null);
      await expect(
        ciclistaService.rentedBicicleta(ciclista.id),
      ).rejects.toThrow('Ciclista não encontrado!\n');
    });

    it('should throw an error if ciclista is not activated', async () => {
      jest.spyOn(mockRepository, 'findBy').mockResolvedValue(ciclista);
      await expect(
        ciclistaService.rentedBicicleta(ciclista.id),
      ).rejects.toThrow('Ciclista não ativado!\n');
    });
  });
});
