import { Test, TestingModule } from '@nestjs/testing';
import CartaoDeCreditoController from './cartao-de-credito.controller';
import { CartaoDeCreditoService } from './cartao-de-credito.service';
import UpdateCartaoDeCreditoDto from './dto/update-cartao-de-credito.dto';
import { AppError, AppErrorType } from 'src/common/domain/app-error';

describe('CartaoDeCreditoController', () => {
  let controller: CartaoDeCreditoController;
  let service: CartaoDeCreditoService;

  const mockService = {
    getCartaoDeCredito: jest.fn(),
    updateCartaoDeCredito: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartaoDeCreditoController],
      providers: [
        {
          provide: CartaoDeCreditoService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CartaoDeCreditoController>(
      CartaoDeCreditoController,
    );
    service = module.get<CartaoDeCreditoService>(CartaoDeCreditoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCartaoDeCredito', () => {
    it('should return cartao de credito if found', async () => {
      const cartaoMock = {
        id: 1,
        nomeTitular: 'John Doe',
        numero: '1234567890123456',
      };
      mockService.getCartaoDeCredito.mockResolvedValue(cartaoMock);

      const result = await controller.getCartaoDeCredito(1);

      expect(service.getCartaoDeCredito).toHaveBeenCalledWith(1);
      expect(result).toEqual(cartaoMock);
    });

    it('should throw an error if cartao de credito not found', async () => {
      mockService.getCartaoDeCredito.mockRejectedValue(
        new AppError(
          'Cartão não encontrado!\n',
          AppErrorType.RESOURCE_NOT_FOUND,
        ),
      );

      await expect(controller.getCartaoDeCredito(1)).rejects.toThrow(
        'Cartão não encontrado!',
      );
      expect(service.getCartaoDeCredito).toHaveBeenCalledWith(1);
    });
  });

  describe('updateCartaoDeCredito', () => {
    it('should update cartao de credito if valid data is provided', async () => {
      const dto: UpdateCartaoDeCreditoDto = {
        nomeTitular: 'Jane Doe',
        numero: '6543210987654321',
        validade: '12/25',
        cvv: '123',
      };

      mockService.updateCartaoDeCredito.mockResolvedValue(undefined);

      await controller.updateCartaoDeCredito(1, dto);

      expect(service.updateCartaoDeCredito).toHaveBeenCalledWith(1, dto);
    });

    it('should throw an error if cartao de credito not found', async () => {
      const dto: UpdateCartaoDeCreditoDto = {
        nomeTitular: 'Jane Doe',
        numero: '6543210987654321',
        validade: '12/25',
        cvv: '123',
      };

      mockService.updateCartaoDeCredito.mockRejectedValue(
        new AppError(
          'Cartão não encontrado!\n',
          AppErrorType.RESOURCE_NOT_FOUND,
        ),
      );

      await expect(controller.updateCartaoDeCredito(1, dto)).rejects.toThrow(
        'Cartão não encontrado!',
      );
      expect(service.updateCartaoDeCredito).toHaveBeenCalledWith(1, dto);
    });
  });
});
