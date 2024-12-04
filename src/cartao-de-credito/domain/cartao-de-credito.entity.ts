import CartaoDeCredito from './cartao-de-credito';

export default class CartaoDeCreditoEntity {
  id?: number;
  numero: string;
  validade: string;
  cvv: string;
  nomeTitular: string;
  ciclistaId?: number;

  static toDomain(cartaoDeCreditoEntity: CartaoDeCreditoEntity) {
    if (!cartaoDeCreditoEntity) {
      return null;
    }

    const cartaoDeCredito = new CartaoDeCredito();
    cartaoDeCredito.cvv = cartaoDeCreditoEntity.cvv;
    cartaoDeCredito.nomeTitular = cartaoDeCreditoEntity.nomeTitular;
    cartaoDeCredito.numero = cartaoDeCreditoEntity.numero;
    cartaoDeCredito.validade = cartaoDeCreditoEntity.validade;
    cartaoDeCredito.id = cartaoDeCreditoEntity.id;

    return cartaoDeCredito;
  }
}
