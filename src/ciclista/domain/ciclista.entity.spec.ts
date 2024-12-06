import CiclistaEntity from 'src/ciclista/domain/ciclista.entity';
import PassaporteEntity from 'src/ciclista/domain/passaporte.entity';
import { CiclistaStatus } from 'src/ciclista/domain/ciclista';

describe('CiclistaEntity.toDomain', () => {
  it('deve retornar um objeto Ciclista corretamente mapeado', () => {
    const passaporteMock: PassaporteEntity = {
      numero: '12345678',
      pais: 'Brasil',
      validade: '11/07',
    };

    const ciclistaEntityMock: CiclistaEntity = {
      id: 1,
      nome: 'João Silva',
      nascimento: '1990-01-01',
      cpf: '123.456.789-00',
      nacionalidade: 'Brasileiro',
      email: 'joao@example.com',
      urlFotoDocumento: 'http://example.com/documento.jpg',
      senha: 'senhaSegura123',
      status: CiclistaStatus.CONFIRMACAO_PENDENTE,
      passaporte: passaporteMock,
      cartaoDeCredito: null,
    };

    const ciclistaDomain = CiclistaEntity.toDomain(ciclistaEntityMock);
    expect(ciclistaDomain).toEqual({
      id: ciclistaEntityMock.id,
      nome: ciclistaEntityMock.nome,
      nascimento: ciclistaEntityMock.nascimento,
      cpf: ciclistaEntityMock.cpf,
      nacionalidade: ciclistaEntityMock.nacionalidade,
      email: ciclistaEntityMock.email,
      urlFotoDocumento: ciclistaEntityMock.urlFotoDocumento,
      status: CiclistaStatus.CONFIRMACAO_PENDENTE,
      passaporte: passaporteMock,
    });
  });

  it('deve retornar null quando o parâmetro for null', () => {
    const result = CiclistaEntity.toDomain(null);
    expect(result).toBeNull();
  });
});
