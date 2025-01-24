import CiclistaEntity from 'src/ciclista/domain/ciclista.entity';
import { CiclistaStatus } from 'src/ciclista/domain/ciclista';
import Passaporte from './passaporte';

describe('CiclistaEntity', () => {
  describe('toDomain', () => {
    const passaporte: Passaporte = {
      numero: '12345678',
      pais: 'Brasil',
      validade: '11/07',
    };

    it('should map a ciclistaEntity to Ciclista object', () => {
      const ciclistaEntity = new CiclistaEntity();
      ciclistaEntity.id = 1;
      ciclistaEntity.nome = 'Jose das Couves';
      ciclistaEntity.nascimento = '1990-01-01';
      ciclistaEntity.cpf = '123.456.789-00';
      ciclistaEntity.email = 'user@example.com';
      ciclistaEntity.urlFotoDocumento = 'http://example.com/documento.jpg';
      ciclistaEntity.senha = 'password1234';
      ciclistaEntity.status = CiclistaStatus.AGUARDANDO_CONFIRMACAO;
      ciclistaEntity.passaporte = passaporte;
      ciclistaEntity.cartaoDeCredito = null;

      const ciclistaDomain = CiclistaEntity.toDomain(ciclistaEntity);

      expect(ciclistaDomain.id).toBe(ciclistaEntity.id);
      expect(ciclistaDomain.nome).toBe(ciclistaEntity.nome);
      expect(ciclistaDomain.nascimento).toBe(ciclistaEntity.nascimento);
      expect(ciclistaDomain.cpf).toBe(ciclistaEntity.cpf);
      expect(ciclistaDomain.email).toBe(ciclistaEntity.email);
      expect(ciclistaDomain.urlFotoDocumento).toBe(
        ciclistaEntity.urlFotoDocumento,
      );
      expect(ciclistaDomain.status).toBe(ciclistaEntity.status);
      expect(ciclistaDomain.passaporte).toEqual(ciclistaEntity.passaporte);
    });

    it('must return null when the parameter is null', () => {
      const ciclistaEntity = null;
      const ciclistaDomain = CiclistaEntity.toDomain(ciclistaEntity);

      expect(ciclistaDomain).toBeNull();
    });
  });
});
