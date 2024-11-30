import Passaporte from './passaporte';

export enum CiclistaStatus {
  CONFIRMACAO_PENDENTE = 'CONFIRMACAO_PENDENTE',
  ATIVADO = 'ATIVADO',
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
  senha: string;
  passaporte: Passaporte;
}
