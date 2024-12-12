import UpdateCartaoDeCreditoDto from './update-cartao-de-credito.dto';

describe('UpdateCartaoDeCreditoDto', () => {
  let updateCartaoDeCreditoDto: UpdateCartaoDeCreditoDto;

  beforeEach(() => {
    updateCartaoDeCreditoDto = new UpdateCartaoDeCreditoDto();
    updateCartaoDeCreditoDto.nomeTitular = 'João da Silva';
    updateCartaoDeCreditoDto.numero = '4111111111111111';
    updateCartaoDeCreditoDto.validade = '2030-12';
    updateCartaoDeCreditoDto.cvv = '123';
  });

  it('deve criar uma instância válida de UpdateCartaoDeCreditoDto', () => {
    expect(updateCartaoDeCreditoDto).toBeDefined();
    expect(updateCartaoDeCreditoDto.nomeTitular).toEqual('João da Silva');
    expect(updateCartaoDeCreditoDto.numero).toEqual('4111111111111111');
    expect(updateCartaoDeCreditoDto.validade).toEqual('2030-12');
    expect(updateCartaoDeCreditoDto.cvv).toEqual('123');
  });

  it('deve permitir alterar os valores das propriedades', () => {
    updateCartaoDeCreditoDto.nomeTitular = 'Maria Oliveira';
    updateCartaoDeCreditoDto.numero = '4222222222222222';
    updateCartaoDeCreditoDto.validade = '2031-01';
    updateCartaoDeCreditoDto.cvv = '456';

    expect(updateCartaoDeCreditoDto.nomeTitular).toBe('Maria Oliveira');
    expect(updateCartaoDeCreditoDto.numero).toBe('4222222222222222');
    expect(updateCartaoDeCreditoDto.validade).toBe('2031-01');
    expect(updateCartaoDeCreditoDto.cvv).toBe('456');
  });
});
