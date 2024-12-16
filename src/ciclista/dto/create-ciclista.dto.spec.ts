import Passaporte from '../domain/passaporte';
import CartaoDeCredito from 'src/cartao-de-credito/domain/cartao-de-credito';
import CreateCiclistaDto from './create-ciclista.dto';

describe('CreateCiclistaDto', () => {
  let passaporte: Passaporte;
  let cartaoDeCredito: CartaoDeCredito;
  let createCiclistaDto: CreateCiclistaDto;

  beforeEach(() => {
    passaporte = {
      numero: '123456789',
      validade: '2030-12-31',
      pais: 'Brasil',
    };

    cartaoDeCredito = {
      id: 1,
      numero: '4111111111111111',
      validade: '2030-12',
      cvv: '123',
      nomeTitular: 'João da Silva',
    };

    createCiclistaDto = {
      ciclista: {
        nome: 'João da Silva',
        cpf: '123.456.789-00',
        nacionalidade: 'Brasileira',
        nascimento: '1990-01-01',
        email: 'joao.silva@example.com',
        urlFotoDocumento: 'http://example.com/documento.jpg',
        passaporte: passaporte,
        senha: 'senhaSegura123',
      },
      meioDePagamento: cartaoDeCredito,
    };
  });

  it('deve criar uma instância válida de CreateCiclistaDto', () => {
    expect(createCiclistaDto).toBeDefined();
    expect(createCiclistaDto.ciclista).toBeDefined();
    expect(createCiclistaDto.meioDePagamento).toBeDefined();
  });

  it('deve conter as informações corretas do ciclista', () => {
    expect(createCiclistaDto.ciclista.nome).toBe('João da Silva');
    expect(createCiclistaDto.ciclista.cpf).toBe('123.456.789-00');
    expect(createCiclistaDto.ciclista.nacionalidade).toBe('Brasileira');
    expect(createCiclistaDto.ciclista.nascimento).toBe('1990-01-01');
    expect(createCiclistaDto.ciclista.email).toBe('joao.silva@example.com');
    expect(createCiclistaDto.ciclista.urlFotoDocumento).toBe(
      'http://example.com/documento.jpg',
    );
    expect(createCiclistaDto.ciclista.passaporte).toEqual(passaporte);
    expect(createCiclistaDto.ciclista.senha).toBe('senhaSegura123');
  });

  it('deve conter as informações corretas do meio de pagamento', () => {
    expect(createCiclistaDto.meioDePagamento.numero).toBe('4111111111111111');
    expect(createCiclistaDto.meioDePagamento.validade).toBe('2030-12');
    expect(createCiclistaDto.meioDePagamento.cvv).toBe('123');
    expect(createCiclistaDto.meioDePagamento.nomeTitular).toBe('João da Silva');
  });
});
