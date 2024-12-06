import CartaoDeCreditoEntity from './cartao-de-credito.entity';

export type UpdateCartaoDeCredito = Partial<Omit<CartaoDeCreditoEntity, 'id'>>;
export type CartaoDeCreditoCriteria = {
  id?: number;
  ciclista?: {
    id: number;
  };
};

export interface CartaoDeCreditoRepository {
  save(cartaoDeCredito: CartaoDeCreditoEntity): Promise<CartaoDeCreditoEntity>;
  update(
    id: number,
    cartaoDeCredito: Partial<UpdateCartaoDeCredito>,
  ): Promise<void>;
  findBy(criteria: CartaoDeCreditoCriteria): Promise<CartaoDeCreditoEntity>;
}
