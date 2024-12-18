import { Test, TestingModule } from '@nestjs/testing';
import { AluguelService } from './aluguel.service';
import { CreateAluguelDto } from './dto/create-aluguel.dto';
import { ReturnBicicletaAluguelDto } from './dto/return-bicicleta-aluguel.dto';
import AluguelController from './aluguel.controller';
import { Aluguel } from './domain/aluguel';

describe('AluguelController', () => {
  let aluguelController: AluguelController;
  let mockAluguelService: jest.Mocked<Partial<AluguelService>>;

  let aluguel: Aluguel;

  beforeEach(async () => {
    mockAluguelService = {
      createAluguel: jest.fn(),
      returnBicicletaAluguel: jest.fn(),
    };

    aluguel = {
      bicicleta: 1,
      ciclista: 1,
      cobranca: 10,
      horaFim: '',
      horaInicio: new Date().toISOString(),
      id: 1,
      trancaFim: 0,
      trancaInicio: 1,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AluguelController],
      providers: [
        {
          provide: AluguelService,
          useValue: mockAluguelService,
        },
      ],
    }).compile();

    aluguelController = module.get<AluguelController>(AluguelController);
  });

  it('should be defined', () => {
    expect(aluguelController).toBeDefined();
  });

  describe('createAluguel', () => {
    it('should call aluguelService.createAluguel with correct data', async () => {
      const createAluguelDto: CreateAluguelDto = {
        trancaInicio: 1,
        ciclista: 1,
      };

      jest
        .spyOn(mockAluguelService, 'createAluguel')
        .mockResolvedValue(aluguel);

      const result = await aluguelController.createAluguel(createAluguelDto);

      expect(result).toEqual(aluguel);
      expect(mockAluguelService.createAluguel).toHaveBeenCalledWith(
        createAluguelDto,
      );
    });
  });

  describe('returnBicicletaAluguel', () => {
    it('should call aluguelService.returnBicicletaAluguel with correct data', async () => {
      const returnBicicletaAluguelDto: ReturnBicicletaAluguelDto = {
        idTranca: 1,
        idBicicleta: 1,
      };

      aluguel.horaFim = new Date().toISOString();
      aluguel.trancaFim = 1;

      jest
        .spyOn(mockAluguelService, 'returnBicicletaAluguel')
        .mockResolvedValue(aluguel);

      const result = await aluguelController.returnBicicletaAluguel(
        returnBicicletaAluguelDto,
      );

      expect(result).toEqual(aluguel);
      expect(mockAluguelService.returnBicicletaAluguel).toHaveBeenCalledWith(
        returnBicicletaAluguelDto,
      );
    });
  });
});
