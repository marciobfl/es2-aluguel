import CartaoDeCreditoEntity from './cartao-de-credito.entity';

export type ExistsCartaoDeCredito = {
  id?: number;
  ciclista?: {
    id?: number;
  };
};

export interface CartaoDeCreditoRepository {
  save(cartaoDeCredito: CartaoDeCreditoEntity): Promise<CartaoDeCreditoEntity>;
  update(data: MakeRequired<CartaoDeCreditoEntity, 'id'>): Promise<void>;
  findBy(query: ExistsCartaoDeCredito): Promise<CartaoDeCreditoEntity>;
}
