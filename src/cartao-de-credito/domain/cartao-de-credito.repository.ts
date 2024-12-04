import CartaoDeCreditoEntity from './cartao-de-credito.entity';

export type ExistsCartaoDeCredito = {
  email?: string;
  id?: number;
  ciclistaId?: number;
};
export interface CartaoDeCreditoRepository {
  save(cartaoDeCredito: CartaoDeCreditoEntity): Promise<CartaoDeCreditoEntity>;
  update(data: MakeRequired<CartaoDeCreditoEntity, 'id'>): Promise<void>;
  findBy(query: ExistsCartaoDeCredito): Promise<CartaoDeCreditoEntity>;
}
