import { Test } from '@nestjs/testing';
import { AluguelService } from './aluguel.service';
import { AluguelRepository } from './domain/aluguel.repository';
import { CiclistaRepository } from 'src/ciclista/domain/ciclista.repository';
import { ExternoService } from 'src/common/external/externo.service';
import { EquipamentoService } from 'src/common/external/equipamento.service';
import { CiclistaStatus } from 'src/ciclista/domain/ciclista';
import { Tranca, TrancaStatus } from 'src/common/domain/tranca';
import Bicicleta, { BicicletaStatus } from 'src/common/domain/bicicleta';
import AluguelEntity from './domain/aluguel.entity';
import CiclistaEntity from 'src/ciclista/domain/ciclista.entity';
import Cobranca, { CobrancaStatus } from 'src/common/domain/cobranca';

describe('AluguelService', () => {
  let aluguelService: AluguelService;
  let mockAluguelRepository: AluguelRepository;
  let mockCiclistaRepository: CiclistaRepository;
  let mockEquipamentoService: EquipamentoService;
  let mockExternoService: ExternoService;

  let ciclista: CiclistaEntity;
  let aluguel: AluguelEntity;
  let bicicleta: Bicicleta;
  let tranca: Tranca;
  let cobranca: Cobranca;

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
      },
      nacionalidade: 'string',
      email: 'user@example.com',
      urlFotoDocumento: 'string',
      senha: 'string',
      cartaoDeCredito: null,
      status: CiclistaStatus.ATIVO,
    };

    bicicleta = {
      ano: '2022',
      id: 1,
      marca: 'caloi',
      modelo: 'bmx',
      numero: 123,
      status: BicicletaStatus.EM_USO,
    };

    tranca = {
      id: 1,
      bicicleta: 0,
      anoDeFabricacao: '2024',
      localizacao: 'Urca',
      modelo: 'tranca ',
      numero: 1,
      status: TrancaStatus.LIVRE,
    };

    aluguel = {
      bicicleta: bicicleta.id,
      ciclista: ciclista.id,
      cobranca: 10,
      horaFim: null,
      horaInicio: new Date(),
      id: 1,
      trancaFim: 0,
      trancaInicio: 1,
    };

    cobranca = {
      ciclista: ciclista.id,
      horaSolicitacao: new Date().toISOString(),
      horaFinalizacao: new Date().toISOString(),
      id: 1,
      status: CobrancaStatus.PAGA,
      valor: 10,
    };

    mockAluguelRepository = {
      findBy: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    mockCiclistaRepository = {
      findBy: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    mockEquipamentoService = {
      getTrancaById: jest.fn(),
      getBicicletaById: jest.fn(),
      lockTranca: jest.fn(),
      unlockTranca: jest.fn(),
    } as unknown as EquipamentoService;

    mockExternoService = {
      authorizeCobranca: jest.fn(),
      sendEmail: jest.fn(),
    } as unknown as ExternoService;

    const module = await Test.createTestingModule({
      providers: [
        AluguelService,
        { provide: 'AluguelRepository', useValue: mockAluguelRepository },
        { provide: 'CiclistaRepository', useValue: mockCiclistaRepository },
        { provide: EquipamentoService, useValue: mockEquipamentoService },
        { provide: ExternoService, useValue: mockExternoService },
      ],
    }).compile();

    aluguelService = module.get(AluguelService);
  });

  describe('createAluguel', () => {
    it('should throw an error if tranca does not exist', async () => {
      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(ciclista);
      jest
        .spyOn(mockEquipamentoService, 'getTrancaById')
        .mockResolvedValue(null);

      await expect(
        aluguelService.createAluguel({
          trancaInicio: 1,
          ciclista: 1,
        }),
      ).rejects.toThrow('Tranca não existe!\n');
    });

    it('should throw an error if ciclista has rented a bike and is not finished', async () => {
      aluguel.horaFim = null;

      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(ciclista);
      jest.spyOn(mockAluguelRepository, 'findBy').mockResolvedValue(aluguel);

      await expect(
        aluguelService.createAluguel({
          trancaInicio: 1,
          ciclista: 1,
        }),
      ).rejects.toThrow('Aluguel não permitido!\n');
    });

    it('should throw an error if tranca is not occupied', async () => {
      tranca.status = TrancaStatus.LIVRE;
      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(ciclista);
      jest
        .spyOn(mockEquipamentoService, 'getTrancaById')
        .mockResolvedValue(tranca);

      await expect(
        aluguelService.createAluguel({
          trancaInicio: 1,
          ciclista: 1,
        }),
      ).rejects.toThrow('Tranca indisponível!\n');
    });

    it('should throw an error if bicicleta does not exist', async () => {
      tranca.status = TrancaStatus.OCUPADA;
      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(ciclista);

      jest
        .spyOn(mockEquipamentoService, 'getTrancaById')
        .mockResolvedValue(tranca);

      jest
        .spyOn(mockEquipamentoService, 'getBicicletaById')
        .mockResolvedValue(null);

      await expect(
        aluguelService.createAluguel({
          trancaInicio: 1,
          ciclista: 1,
        }),
      ).rejects.toThrow('Bicicleta não existe!\n');
    });

    it('should throw an error if bicicleta is not available', async () => {
      tranca.status = TrancaStatus.OCUPADA;
      bicicleta.status = BicicletaStatus.APOSENTADA;

      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(ciclista);

      jest
        .spyOn(mockEquipamentoService, 'getTrancaById')
        .mockResolvedValue(tranca);
      jest
        .spyOn(mockEquipamentoService, 'getBicicletaById')
        .mockResolvedValue(bicicleta);

      await expect(
        aluguelService.createAluguel({
          trancaInicio: 1,
          ciclista: 1,
        }),
      ).rejects.toThrow('Bicicleta indisponível!\n');
    });

    it('should throw an error if ciclista does not exist', async () => {
      tranca.status = TrancaStatus.OCUPADA;
      bicicleta.status = BicicletaStatus.DISPONIVEL;

      jest
        .spyOn(mockEquipamentoService, 'getTrancaById')
        .mockResolvedValue(tranca);
      jest
        .spyOn(mockEquipamentoService, 'getBicicletaById')
        .mockResolvedValue(bicicleta);
      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(null);

      await expect(
        aluguelService.createAluguel({
          trancaInicio: 1,
          ciclista: 1,
        }),
      ).rejects.toThrow('Ciclista não encontrado!\n');
    });

    it('should throw an error if ciclista is not activated', async () => {
      tranca.status = TrancaStatus.OCUPADA;
      bicicleta.status = BicicletaStatus.DISPONIVEL;
      ciclista.status = CiclistaStatus.AGUARDANDO_CONFIRMACAO;

      jest
        .spyOn(mockEquipamentoService, 'getTrancaById')
        .mockResolvedValue(tranca);
      jest
        .spyOn(mockEquipamentoService, 'getBicicletaById')
        .mockResolvedValue(bicicleta);
      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(ciclista);

      await expect(
        aluguelService.createAluguel({
          trancaInicio: 1,
          ciclista: 1,
        }),
      ).rejects.toThrow('Ciclista não ativado!\n');
    });

    it('should create aluguel successfully', async () => {
      tranca.bicicleta = bicicleta.id;
      tranca.status = TrancaStatus.OCUPADA;
      bicicleta.status = BicicletaStatus.DISPONIVEL;

      jest
        .spyOn(mockEquipamentoService, 'getTrancaById')
        .mockResolvedValue(tranca);

      jest
        .spyOn(mockEquipamentoService, 'getBicicletaById')
        .mockResolvedValue(bicicleta);

      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(ciclista);

      jest
        .spyOn(mockExternoService, 'authorizeCobranca')
        .mockResolvedValue(cobranca);

      aluguel = {
        ...aluguel,
        horaInicio: new Date(),
        trancaInicio: 1,
      };

      jest.spyOn(mockAluguelRepository, 'save').mockResolvedValue(aluguel);

      const result = await aluguelService.createAluguel({
        trancaInicio: 1,
        ciclista: 1,
      });

      expect(result).toEqual(AluguelEntity.toDomain(aluguel));
    });
  });

  describe('returnBicicletaAluguel', () => {
    it('should throw an error if bicicleta does not exist', async () => {
      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(ciclista);
      jest.spyOn(mockAluguelRepository, 'findBy').mockResolvedValue(aluguel);

      jest
        .spyOn(mockEquipamentoService, 'getBicicletaById')
        .mockResolvedValue(null);

      await expect(
        aluguelService.returnBicicletaAluguel({
          idBicicleta: 1,
          idTranca: 1,
        }),
      ).rejects.toThrow('Bicicleta não existe!');
    });

    it('should throw an error if bicicleta is not being used', async () => {
      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(ciclista);
      jest.spyOn(mockAluguelRepository, 'findBy').mockResolvedValue(aluguel);

      bicicleta.status = BicicletaStatus.EM_REPARO;
      jest
        .spyOn(mockEquipamentoService, 'getBicicletaById')
        .mockResolvedValue(bicicleta);

      await expect(
        aluguelService.returnBicicletaAluguel({
          idBicicleta: 1,
          idTranca: 1,
        }),
      ).rejects.toThrow('Bicicleta indisponível!\n');
    });

    it('should throw an error if ciclista does not exist', async () => {
      jest.spyOn(mockAluguelRepository, 'findBy').mockResolvedValue(aluguel);
      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(null);

      await expect(
        aluguelService.returnBicicletaAluguel({
          idBicicleta: 1,
          idTranca: 1,
        }),
      ).rejects.toThrow('Ciclista não encontrado!\n');
    });

    it('should throw an error if ciclista is not activated', async () => {
      ciclista.status = CiclistaStatus.AGUARDANDO_CONFIRMACAO;

      jest.spyOn(mockAluguelRepository, 'findBy').mockResolvedValue(aluguel);
      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(ciclista);

      await expect(
        aluguelService.returnBicicletaAluguel({
          idBicicleta: 1,
          idTranca: 1,
        }),
      ).rejects.toThrow('Ciclista não ativado!\n');
    });

    it('should throw an error if tranca does not exists', async () => {
      tranca.status = TrancaStatus.OCUPADA;

      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(ciclista);
      jest.spyOn(mockAluguelRepository, 'findBy').mockResolvedValue(aluguel);

      jest
        .spyOn(mockEquipamentoService, 'getBicicletaById')
        .mockResolvedValue(bicicleta);
      jest
        .spyOn(mockEquipamentoService, 'getTrancaById')
        .mockResolvedValue(null);

      await expect(
        aluguelService.returnBicicletaAluguel({
          idBicicleta: 1,
          idTranca: 1,
        }),
      ).rejects.toThrow('Tranca não existe!\n');
    });

    it('should throw an error if tranca is not available', async () => {
      tranca.status = TrancaStatus.OCUPADA;

      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(ciclista);
      jest.spyOn(mockAluguelRepository, 'findBy').mockResolvedValue(aluguel);

      jest
        .spyOn(mockEquipamentoService, 'getBicicletaById')
        .mockResolvedValue(bicicleta);
      jest
        .spyOn(mockEquipamentoService, 'getTrancaById')
        .mockResolvedValue(tranca);

      await expect(
        aluguelService.returnBicicletaAluguel({
          idBicicleta: 1,
          idTranca: 1,
        }),
      ).rejects.toThrow('Tranca indisponível!\n');
    });

    it('should throw an error if aluguel does not exists', async () => {
      jest.spyOn(mockAluguelRepository, 'findBy').mockResolvedValue(null);

      await expect(
        aluguelService.returnBicicletaAluguel({
          idBicicleta: 1,
          idTranca: 1,
        }),
      ).rejects.toThrow('Aluguel não existe!\n');
    });

    it('should complete aluguel successfully', async () => {
      tranca.status = TrancaStatus.LIVRE;
      ciclista.status = CiclistaStatus.ATIVO;

      jest.spyOn(mockCiclistaRepository, 'findBy').mockResolvedValue(ciclista);

      jest
        .spyOn(mockEquipamentoService, 'getBicicletaById')
        .mockResolvedValue(bicicleta);
      jest
        .spyOn(mockEquipamentoService, 'getTrancaById')
        .mockResolvedValue(tranca);
      jest.spyOn(mockAluguelRepository, 'findBy').mockResolvedValue(aluguel);
      jest
        .spyOn(mockExternoService, 'authorizeCobranca')
        .mockResolvedValue(cobranca);

      aluguel = {
        ...aluguel,
        horaFim: new Date(),
        trancaFim: 1,
        cobranca: 10,
      };

      jest.spyOn(mockAluguelRepository, 'update').mockResolvedValue(aluguel);

      const result = await aluguelService.returnBicicletaAluguel({
        idBicicleta: 1,
        idTranca: 1,
      });

      expect(result).toEqual(AluguelEntity.toDomain(aluguel));
    });
  });
});
