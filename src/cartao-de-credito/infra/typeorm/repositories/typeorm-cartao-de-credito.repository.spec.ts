import { Repository } from 'typeorm';
import TypeormCartaoDeCreditoEntity from '../entities/typeorm-cartao-de-credito.entity';
import {
  CartaoDeCreditoCriteria,
  UpdateCartaoDeCredito,
} from 'src/cartao-de-credito/domain/cartao-de-credito.repository';
import CartaoDeCreditoEntity from 'src/cartao-de-credito/domain/cartao-de-credito.entity';
import { TypeormCartaoDeCreditoRepository } from './typeorm-cartao-de-credito.repository';

describe('TypeormCartaoDeCreditoRepository', () => {
  let repository: TypeormCartaoDeCreditoRepository;
  let mockDatabase: jest.Mocked<Repository<TypeormCartaoDeCreditoEntity>>;

  beforeEach(() => {
    mockDatabase = {
      update: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    } as unknown as jest.Mocked<Repository<TypeormCartaoDeCreditoEntity>>;

    repository = new TypeormCartaoDeCreditoRepository(mockDatabase);
  });

  it('should call update with correct id and data', async () => {
    const id = 1;
    const updateData: Partial<UpdateCartaoDeCredito> = {
      numero: '1234 5678 9012 3456',
      validade: '12/25',
    };

    await repository.update(id, updateData);
    expect(mockDatabase.update).toHaveBeenCalledWith({ id }, updateData);
  });

  it('should save a cartaoDeCredito entity', async () => {
    const cartaoDeCredito: CartaoDeCreditoEntity = {
      id: 1,
      numero: '1234 5678 9012 3456',
      validade: '12/25',
      cvv: '123',
      nomeTitular: 'John Doe',
    };

    const mockResult = new TypeormCartaoDeCreditoEntity();
    mockDatabase.save.mockResolvedValue(mockResult);

    const result = await repository.save(cartaoDeCredito);
    expect(mockDatabase.save).toHaveBeenCalledWith(cartaoDeCredito);
    expect(result).toBe(mockResult);
  });

  it('should find a cartaoDeCredito by criteria', async () => {
    const query: CartaoDeCreditoCriteria = { id: 1 };
    const mockResult = new TypeormCartaoDeCreditoEntity();
    mockDatabase.findOne.mockResolvedValue(mockResult);

    const result = await repository.findBy(query);
    expect(mockDatabase.findOne).toHaveBeenCalledWith({ where: query });
    expect(result).toBe(mockResult);
  });
});
