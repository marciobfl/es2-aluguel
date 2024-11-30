import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CartaoDeCreditoEntity from 'src/cartao-de-credito/infrastructure/typeorm/cartao-de-credito.entity';
import PassaporteEntity from './passaporte.entity';
import { Ciclista, CiclistaStatus } from 'src/ciclista/domain/ciclista';

@Entity('ciclistas')
export default class CiclistaEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
  @Column()
  nascimento: Date;
  @Column()
  cpf: string;
  @Column()
  passaporteId: string;
  @Column()
  nacionalidade: string;
  @Column()
  email: string;
  @Column()
  urlFotoDocumento: string;
  @Column()
  senha: string;
  @Column({
    type: 'varchar',
    default: CiclistaStatus.CONFIRMACAO_PENDENTE,
  })
  status: CiclistaStatus;
  @OneToOne(() => PassaporteEntity, {
    cascade: true,
  })
  @JoinColumn()
  passaporte: PassaporteEntity;
  @OneToOne(() => CartaoDeCreditoEntity, { cascade: true })
  @JoinColumn()
  cartaoDeCredito: CartaoDeCreditoEntity;

  static toDomain(ciclistaEntity: CiclistaEntity): Ciclista {
    const ciclista = new Ciclista();
    ciclista.id = ciclistaEntity.id;
    ciclista.status = ciclistaEntity.status;
    ciclista.nome = ciclistaEntity.nome;
    ciclista.cpf = ciclistaEntity.cpf;
    ciclista.nacionalidade = ciclistaEntity.nacionalidade;
    ciclista.email = ciclistaEntity.email;
    ciclista.urlFotoDocumento = ciclistaEntity.urlFotoDocumento;
    ciclista.nascimento = ciclistaEntity.nascimento.toString();
    ciclista.passaporte = PassaporteEntity.toDomain(ciclistaEntity.passaporte);

    return ciclista;
  }
}
