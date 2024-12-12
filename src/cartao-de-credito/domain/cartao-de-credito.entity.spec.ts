import CartaoDeCreditoEntity from 'src/cartao-de-credito/domain/cartao-de-credito.entity';

describe('CartaoDeCreditoEntity.toDomain', () => {
  it('deve retornar um objeto CartaoDeCredito corretamente mapeado', () => {
    const cartaoDeCreditoEntityMock: CartaoDeCreditoEntity = {
      id: 1,
      numero: '5284 2540 4664 6997',
      validade: '12/25',
      cvv: '123',
      nomeTitular: 'Jose das Couves',
      ciclista: undefined,
    };

    const cartaoDeCreditoDomain = CartaoDeCreditoEntity.toDomain(
      cartaoDeCreditoEntityMock,
    );

    expect(cartaoDeCreditoDomain).toEqual({
      id: 1,
      numero: cartaoDeCreditoEntityMock.numero,
      validade: cartaoDeCreditoEntityMock.validade,
      cvv: cartaoDeCreditoEntityMock.cvv,
      nomeTitular: cartaoDeCreditoEntityMock.nomeTitular,
    });
  });

  it('deve retornar null quando o parâmetro for null', () => {
    const result = CartaoDeCreditoEntity.toDomain(null);
    expect(result).toBeNull();
  });
});
