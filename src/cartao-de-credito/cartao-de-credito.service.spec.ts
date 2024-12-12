import { Test, TestingModule } from '@nestjs/testing';
import { CartaoDeCreditoService } from './cartao-de-credito.service';
import { CartaoDeCreditoRepository } from './domain/cartao-de-credito.repository';
import CartaoDeCreditoEntity from './domain/cartao-de-credito.entity';
import { AppError, AppErrorType } from 'src/common/domain/app-error';
import UpdateCartaoDeCreditoDto from './dto/update-cartao-de-credito.dto';

describe('CartaoDeCreditoService', () => {
  let service: CartaoDeCreditoService;
  let mockRepository: CartaoDeCreditoRepository;

  const ciclistaId = 1;
  const cartaoDeCreditoEntity: CartaoDeCreditoEntity = {
    id: 1,
    ciclista: null,
    numero: '1234 5678 9012 3456',
    validade: '12/25',
    cvv: '123',
    nomeTitular: 'teste',
  };

  const updateData: UpdateCartaoDeCreditoDto = {
    numero: '6543 2109 8765 4321',
    validade: '11/26',
    cvv: '321',
    nomeTitular: 'teste',
  };

  beforeEach(async () => {
    mockRepository = {
      findBy: jest.fn(),
      update: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartaoDeCreditoService,
        {
          provide: 'CartaoDeCreditoRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CartaoDeCreditoService>(CartaoDeCreditoService);
    mockRepository = module.get('CartaoDeCreditoRepository');
  });

  it('should get cartao de credito successfully', async () => {
    jest
      .spyOn(mockRepository, 'findBy')
      .mockResolvedValue(cartaoDeCreditoEntity);
    await expect(service.getCartaoDeCredito(ciclistaId)).resolves.toEqual(
      CartaoDeCreditoEntity.toDomain(cartaoDeCreditoEntity),
    );
  });

  it('should throw error if cartao de credito not found', async () => {
    jest.spyOn(mockRepository, 'findBy').mockResolvedValue(null);

    await expect(service.getCartaoDeCredito(ciclistaId)).rejects.toThrow(
      new AppError('Cartão não encontrado!\n', AppErrorType.RESOURCE_NOT_FOUND),
    );
  });

  it('should update cartao de credito successfully', async () => {
    jest
      .spyOn(mockRepository, 'findBy')
      .mockResolvedValue(cartaoDeCreditoEntity);
    jest.spyOn(mockRepository, 'update').mockResolvedValue(undefined);

    await expect(
      service.updateCartaoDeCredito(ciclistaId, updateData),
    ).resolves.toBeUndefined();

    expect(mockRepository.update).toHaveBeenCalledWith(
      cartaoDeCreditoEntity.id,
      updateData,
    );
  });

  it('should throw error if cartao de credito not found for update', async () => {
    jest.spyOn(mockRepository, 'findBy').mockResolvedValue(null);

    await expect(
      service.updateCartaoDeCredito(ciclistaId, updateData),
    ).rejects.toThrow(
      new AppError('Cartão não encontrado!\n', AppErrorType.RESOURCE_NOT_FOUND),
    );
  });
});
