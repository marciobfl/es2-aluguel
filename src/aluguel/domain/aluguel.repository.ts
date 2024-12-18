import AluguelEntity from './aluguel.entity';

export type UpdateAluguel = {
  id?: number;
  bicicleta?: number;
  horaInicio?: Date;
  horaFim?: Date;
  trancaFim?: number;
  cobranca?: number;
  ciclista?: number;
  trancaInicio?: number;
};

export type FindAluguel = {
  id?: number;
  ciclista?: number;
  bicicleta?: number;
  horaFim?: Date;
  trancaFim?: number;
};
export interface AluguelRepository {
  save(aluguel: Partial<AluguelEntity>): Promise<AluguelEntity>;
  update(id: number, data: UpdateAluguel): Promise<AluguelEntity>;
  findBy(data: FindAluguel): Promise<AluguelEntity>;
}
