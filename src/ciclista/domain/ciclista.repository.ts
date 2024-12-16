import { CiclistaStatus } from './ciclista';
import CiclistaEntity from './ciclista.entity';
import Passaporte from './passaporte';

export type UpdateCiclista = {
  status?: CiclistaStatus;
  nome?: string;
  cpf?: string;
  nacionalidade?: string;
  nascimento?: string;
  email?: string;
  urlFotoDocumento?: string;
  passaporte?: Passaporte;
  senha?: string;
};
export type ExistsCiclista = { email?: string; id?: number };
export interface CiclistaRepository {
  save(ciclista: CiclistaEntity): Promise<CiclistaEntity>;
  update(id: number, data: UpdateCiclista): Promise<CiclistaEntity>;
  findBy(query: ExistsCiclista): Promise<CiclistaEntity>;
}
