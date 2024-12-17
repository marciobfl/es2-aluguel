import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import Passaporte from '../domain/passaporte';

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
  @ValidateIf(
    (o: UpdateCiclistaDto) => o.nacionalidade.toUpperCase() !== 'BRASILEIRO',
  )
  @IsNotEmpty()
  passaporte: Passaporte;
  @IsNotEmpty()
  @IsString()
  senha: string;
}
