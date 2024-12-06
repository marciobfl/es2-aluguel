import CartaoDeCreditoEntity from 'src/cartao-de-credito/domain/cartao-de-credito.entity';

describe('CartaoDeCreditoEntity.toDomain', () => {
  it('deve retornar um objeto CartaoDeCredito corretamente mapeado', () => {
    const cartaoDeCreditoEntityMock: CartaoDeCreditoEntity = {
      id: 1,
      numero: '4111111111111111',
      validade: '12/25',
      cvv: '123',
      nomeTitular: 'João Silva',
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
