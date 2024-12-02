import CartaoDeCredito from 'src/cartao-de-credito/domain/cartao-de-credito';
import Passaporte from '../domain/passaporte';

export default class CreateCiclistaDto {
  ciclista: {
    nome: string;
    cpf: string;
    nacionalidade: string;
    nascimento: string;
    email: string;
    urlFotoDocumento: string;
    passaporte: Passaporte;
    senha: string;
  };
  meioDePagamento: CartaoDeCredito;
}
