import { IsEmpty, IsEnum, IsNumber, IsString } from 'class-validator';
import { FuncionarioFuncao } from '../domain/funcionario';

export default class CreateFuncionarioDto {
  @IsString()
  @IsEmpty()
  nome: string;
  @IsNumber()
  @IsEmpty()
  idade: number;
  @IsString()
  @IsEmpty()
  email: string;
  @IsString()
  @IsEmpty()
  cpf: string;
  @IsString()
  @IsEmpty()
  @IsEnum(FuncionarioFuncao)
  funcao: FuncionarioFuncao;
  @IsString()
  @IsEmpty()
  senha: string;
  @IsString()
  @IsEmpty()
  confirmacaoSenha: string;
}
