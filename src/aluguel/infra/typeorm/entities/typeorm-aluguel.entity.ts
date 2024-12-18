import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('alugueis')
export default class TypeormAluguelEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  bicicleta: number;
  @Column()
  horaInicio: Date;
  @Column({ nullable: true })
  horaFim: Date;
  @Column({ nullable: true })
  trancaFim: number;
  @Column()
  cobranca: number;
  @Column()
  ciclista: number;
  @Column()
  trancaInicio: number;
}
