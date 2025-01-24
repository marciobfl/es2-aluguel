import Passaporte from './passaporte';

export enum CiclistaStatus {
  AGUARDANDO_CONFIRMACAO = 'AGUARDANDO_CONFIRMACAO',
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

export class Ciclista {
  id: number;
  status: CiclistaStatus;
  nome: string;
  cpf: string;
  nacionalidade: string;
  nascimento: string;
  email: string;
  urlFotoDocumento: string;
  passaporte: Passaporte;
}
