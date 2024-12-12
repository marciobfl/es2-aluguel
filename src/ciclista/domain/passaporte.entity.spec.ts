import PassaporteEntity from './passaporte.entity';
import Passaporte from 'src/ciclista/domain/passaporte';

describe('PassaporteEntity', () => {
  describe('toDomain', () => {
    it('should convert PassaporteEntity to Passaporte domain object', () => {
      const passaporteEntity = {
        id: 1,
        numero: 'P1234567',
        validade: '2030-01-01',
        pais: 'BR',
      };

      const result = PassaporteEntity.toDomain(passaporteEntity);

      expect(result).toBeInstanceOf(Passaporte);
      expect(result.numero).toBe(passaporteEntity.numero);
      expect(result.validade).toBe(passaporteEntity.validade);
      expect(result.pais).toBe(passaporteEntity.pais);
    });

    it('should return null when converting a null PassaporteEntity', () => {
      const result = PassaporteEntity.toDomain(null);

      expect(result).toBeNull();
    });
  });
});
