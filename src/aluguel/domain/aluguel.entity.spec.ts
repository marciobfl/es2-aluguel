import { Aluguel } from './aluguel';
import AluguelEntity from './aluguel.entity';

describe('AluguelEntity.toDomain', () => {
  it('deve converter um AluguelEntity válido para Aluguel corretamente', () => {
    const aluguelEntity: AluguelEntity = {
      id: 1,
      bicicleta: 101,
      horaInicio: new Date('2024-12-18T10:00:00Z'),
      horaFim: new Date('2024-12-18T12:00:00Z'),
      trancaFim: 2,
      cobranca: 20.5,
      ciclista: 3,
      trancaInicio: 1,
    };

    const expectedAluguel: Aluguel = {
      id: 1,
      bicicleta: 101,
      horaInicio: '2024-12-18T10:00:00.000Z',
      horaFim: '2024-12-18T12:00:00.000Z',
      trancaFim: 2,
      cobranca: 20.5,
      ciclista: 3,
      trancaInicio: 1,
    };

    const result = AluguelEntity.toDomain(aluguelEntity);

    expect(result).toEqual(expectedAluguel);
  });

  it('deve retornar horaFim como string vazia se não estiver definida', () => {
    const aluguelEntity: AluguelEntity = {
      id: 2,
      bicicleta: 202,
      horaInicio: new Date('2024-12-18T14:00:00Z'),
      horaFim: null,
      trancaFim: 3,
      cobranca: 10.0,
      ciclista: 4,
      trancaInicio: 2,
    };

    const expectedAluguel: Aluguel = {
      id: 2,
      bicicleta: 202,
      horaInicio: '2024-12-18T14:00:00.000Z',
      horaFim: '',
      trancaFim: 3,
      cobranca: 10.0,
      ciclista: 4,
      trancaInicio: 2,
    };

    const result = AluguelEntity.toDomain(aluguelEntity);

    expect(result).toEqual(expectedAluguel);
  });

  it('deve retornar null se aluguelEntity for null', () => {
    const result = AluguelEntity.toDomain(null);
    expect(result).toBeNull();
  });
});
