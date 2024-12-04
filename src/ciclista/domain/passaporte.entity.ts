import Passaporte from 'src/ciclista/domain/passaporte';

export default class PassaporteEntity {
  id?: number;
  numero: string;
  validade: string;
  pais: string;

  static toDomain(passaporteEntity: PassaporteEntity) {
    if (!passaporteEntity) {
      return null;
    }

    const passaporte = new Passaporte();
    passaporte.numero = passaporteEntity.numero;
    passaporte.validade = passaporteEntity.validade.toString();
    passaporte.pais = passaporteEntity.pais;

    return passaporte;
  }
}
