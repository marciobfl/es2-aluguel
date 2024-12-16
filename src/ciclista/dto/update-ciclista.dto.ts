import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import PassaporteDto from './passaporte.dto';

export default class UpdateCiclistaDto {
  @IsNotEmpty()
  @IsString()
  nome: string;
  @IsNotEmpty()
  @IsString()
  cpf: string;
  @IsNotEmpty()
  @IsString()
  nacionalidade: string;
  @IsNotEmpty()
  @IsString()
  nascimento: string;
  @IsNotEmpty()
  @IsEmail({}, { message: 'O email informado é inválido.' })
  email: string;
  @IsNotEmpty()
  @IsString()
  urlFotoDocumento: string;
  @IsNotEmpty()
  passaporte: PassaporteDto;
  @IsNotEmpty()
  @IsString()
  senha: string;
}
