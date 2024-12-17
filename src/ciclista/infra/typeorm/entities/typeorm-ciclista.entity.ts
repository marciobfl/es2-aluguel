import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CiclistaStatus } from 'src/ciclista/domain/ciclista';
import TypeormCartaoDeCreditoEntity from 'src/cartao-de-credito/infra/typeorm/entities/typeorm-cartao-de-credito.entity';
import Passaporte from 'src/ciclista/domain/passaporte';

@Entity('ciclistas')
export default class TypeormCiclistaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  nascimento: string;

  @Column()
  cpf: string;

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

  @Column({
    type: 'json',
    nullable: true,
  })
  passaporte: Passaporte | null;

  @OneToOne(
    () => TypeormCartaoDeCreditoEntity,
    (cartaoDeCredito) => cartaoDeCredito.ciclista,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  cartaoDeCredito: TypeormCartaoDeCreditoEntity;
}
