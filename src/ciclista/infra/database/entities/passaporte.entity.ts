import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import Passaporte from 'src/ciclista/domain/passaporte';

@Entity('passaportes')
export default class PassaporteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  numero: string;
  @Column()
  validade: Date;
  @Column()
  pais: string;

  static toDomain(passaporteEntity: PassaporteEntity): Passaporte {
    const passaporte = new Passaporte();
    passaporte.numero = passaporteEntity.numero;
    passaporte.validade = passaporteEntity.validade.toString();
    passaporte.pais = passaporteEntity.pais;

    return passaporte;
  }
}
