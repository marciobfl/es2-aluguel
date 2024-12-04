import TypeormCiclistaEntity from 'src/ciclista/infra/database/entities/typeorm-ciclista.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('cartoes-de-credito')
export default class TypeormCartaoDeCreditoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  numero: string;
  @Column()
  validade: string;
  @Column()
  cvv: string;
  @Column()
  nomeTitular: string;
  @OneToOne(() => TypeormCiclistaEntity, (ciclista) => ciclista.cartaoDeCredito)
  ciclista: TypeormCiclistaEntity;
  @Column({ nullable: true })
  @RelationId(
    (cartaoDeCredito: TypeormCartaoDeCreditoEntity) => cartaoDeCredito.ciclista,
  )
  ciclistaId: number;
}
