import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cartoes-de-credito')
export default class CartaoDeCreditoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  numero: string;
  @Column()
  validade: Date;
  @Column()
  cvv: string;
  @Column()
  nomeTitular: string;
}
