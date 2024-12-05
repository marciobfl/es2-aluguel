import { FuncionarioFuncao } from 'src/funcionario/domain/funcionario';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('funcionarios')
export default class TypeormFuncionarioEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  matricula: string;
  @Column()
  nome: string;
  @Column()
  idade: number;
  @Column()
  email: string;
  @Column()
  cpf: string;
  @Column({ type: 'varchar' })
  funcao: FuncionarioFuncao;
  @Column()
  senha: string;
  @Column()
  confirmacaoSenha: string;
}
