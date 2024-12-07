import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FuncionarioFuncao } from '../domain/funcionario';

export default class UpdateFuncionarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
  @IsNumber()
  @IsNotEmpty()
  idade: number;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  cpf: string;
  @IsString()
  @IsNotEmpty()
  @IsEnum(FuncionarioFuncao)
  funcao: FuncionarioFuncao;
  @IsString()
  @IsNotEmpty()
  senha: string;
  @IsString()
  @IsNotEmpty()
  confirmacaoSenha: string;
}
