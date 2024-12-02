import CartaoDeCredito from 'src/cartao-de-credito/domain/cartao-de-credito';
import { Ciclista } from './ciclista';
import Passaporte from './passaporte';

export type CreateCiclista = {
  nome: string;
  cpf: string;
  nacionalidade: string;
  nascimento: string;
  email: string;
  urlFotoDocumento: string;
  passaporte: Passaporte;
  cartaoDeCredito: CartaoDeCredito;
};
export type ExistsCiclista = { email?: string; id?: number };

export interface CiclistaRepository {
  create(ciclista: CreateCiclista): Promise<Ciclista>;
  update(): Promise<void>;
  ciclistaExists(query: ExistsCiclista): Promise<boolean>;
  activateCiclista(id: number): Promise<Ciclista>;
}
