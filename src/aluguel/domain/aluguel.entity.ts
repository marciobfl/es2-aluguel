import { Aluguel } from './aluguel';

export default class AluguelEntity {
  id: number;
  bicicleta: number;
  horaInicio: Date;
  horaFim: Date;
  trancaFim: number;
  cobranca: number;
  ciclista: number;
  trancaInicio: number;

  static toDomain(aluguelEntity: AluguelEntity) {
    if (!aluguelEntity) {
      return null;
    }

    const aluguel = new Aluguel();
    aluguel.id = aluguelEntity.id;
    aluguel.bicicleta = aluguelEntity.bicicleta;
    aluguel.horaInicio = aluguelEntity.horaInicio.toISOString();
    aluguel.horaFim = aluguelEntity.horaFim
      ? aluguelEntity.horaFim.toISOString()
      : '';
    aluguel.trancaFim = aluguelEntity.trancaFim;
    aluguel.cobranca = aluguelEntity.cobranca;
    aluguel.ciclista = aluguelEntity.ciclista;
    aluguel.trancaInicio = aluguelEntity.trancaInicio;

    return aluguel;
  }
}
