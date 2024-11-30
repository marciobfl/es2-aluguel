import CartaoDeCredito from 'src/cartao-de-credito/domain/cartao-de-credito';
import { Ciclista } from '../domain/ciclista';

export default class CreateCiclistaDto {
  ciclista: Ciclista;
  meioDePagamento: CartaoDeCredito;
}
