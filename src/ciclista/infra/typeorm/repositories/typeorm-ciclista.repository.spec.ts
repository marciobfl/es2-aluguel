import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TypeormCiclistaRepository } from './typeorm-ciclista.repository';
import TypeormCiclistaEntity from '../entities/typeorm-ciclista.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CiclistaStatus } from 'src/ciclista/domain/ciclista';

describe('TypeormCiclistaRepository', () => {
  let repository: TypeormCiclistaRepository;
  let ciclistaDatabase: jest.Mocked<Repository<TypeormCiclistaEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeormCiclistaRepository,
        {
          provide: getRepositoryToken(TypeormCiclistaEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    ciclistaDatabase = module.get<Repository<TypeormCiclistaEntity>>(
      getRepositoryToken(TypeormCiclistaEntity),
    ) as jest.Mocked<Repository<TypeormCiclistaEntity>>;
    repository = new TypeormCiclistaRepository(ciclistaDatabase);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('update', () => {
    it('should update a ciclista', async () => {
      const ciclista: TypeormCiclistaEntity = {
        id: 1,
        nome: 'Test',
        nascimento: '2000-01-01',
        cpf: '12345678900',
        nacionalidade: 'Brasileiro',
        email: 'test@example.com',
        urlFotoDocumento: 'url',
        senha: 'senha',
        status: CiclistaStatus.CONFIRMACAO_PENDENTE,
        passaporte: null,
        cartaoDeCredito: null,
      };

      jest
        .spyOn(ciclistaDatabase, 'update')
        .mockResolvedValue({ affected: 1 } as any);

      jest.spyOn(ciclistaDatabase, 'findOne').mockResolvedValue(ciclista);

      const result = await repository.update(ciclista.id, ciclista);

      expect(ciclistaDatabase.update).toHaveBeenCalledWith(
        ciclista.id,
        ciclista,
      );

      expect(ciclistaDatabase.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            id: ciclista.id,
          }),
        }),
      );
      expect(result).toEqual(ciclista);
    });
  });

  describe('findBy', () => {
    it('should find a ciclista by query', async () => {
      const query = { email: 'test@example.com' };
      const expectedResult: TypeormCiclistaEntity = {
        id: 1,
        nome: 'Test',
        nascimento: '2000-01-01',
        cpf: '12345678900',
        nacionalidade: 'Brasileiro',
        email: 'test@example.com',
        urlFotoDocumento: 'url',
        senha: 'senha',
        status: CiclistaStatus.CONFIRMACAO_PENDENTE,
        passaporte: null,
        cartaoDeCredito: null,
      };

      jest.spyOn(ciclistaDatabase, 'findOne').mockResolvedValue(expectedResult);

      const result = await repository.findBy(query);

      expect(ciclistaDatabase.findOne).toHaveBeenCalledWith({
        where: query,
        relations: { cartaoDeCredito: true, passaporte: true },
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('save', () => {
    it('should save a ciclista', async () => {
      const ciclista: TypeormCiclistaEntity = {
        id: 1,
        nome: 'Test',
        nascimento: '2000-01-01',
        cpf: '12345678900',
        nacionalidade: 'Brasileiro',
        email: 'test@example.com',
        urlFotoDocumento: 'url',
        senha: 'senha',
        status: CiclistaStatus.CONFIRMACAO_PENDENTE,
        passaporte: null,
        cartaoDeCredito: null,
      };

      jest.spyOn(ciclistaDatabase, 'save').mockResolvedValue(ciclista);

      const result = await repository.save(ciclista);

      expect(ciclistaDatabase.save).toHaveBeenCalledWith(ciclista);
      expect(result).toEqual(ciclista);
    });
  });
});
