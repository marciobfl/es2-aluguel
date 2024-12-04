import CiclistaEntity from './ciclista.entity';

export type UpdateCiclista = Partial<Omit<CiclistaEntity, 'cartaoDeCredito'>>;
export type ExistsCiclista = { email?: string; id?: number };
export interface CiclistaRepository {
  save(ciclista: CiclistaEntity): Promise<CiclistaEntity>;
  update(data: MakeRequired<CiclistaEntity, 'id'>): Promise<void>;
  findBy(query: ExistsCiclista): Promise<CiclistaEntity>;
}
