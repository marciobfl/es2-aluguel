import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('passaportes')
export default class TypeormPassaporteEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  numero: string;
  @Column()
  validade: string;
  @Column()
  pais: string;
}
