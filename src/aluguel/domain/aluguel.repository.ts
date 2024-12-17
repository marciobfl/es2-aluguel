import AluguelEntity from './aluguel.entity';

export type UpdateAluguel = {
  id?: number;
  bicicleta?: number;
  horaInicio?: string;
  trancaFim?: number;
  cobranca?: number;
  ciclista?: number;
  trancaInicio?: number;
};
export interface AluguelRepository {
  save(aluguel: AluguelEntity): Promise<AluguelEntity>;
  update(id: number, data: UpdateAluguel): Promise<AluguelEntity>;
  findBy(id: number): Promise<AluguelEntity>;
}
