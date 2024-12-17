import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import PassaporteDto from './passaporte.dto';

export class CiclistaDto {
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
    (o: CiclistaDto) => o.nacionalidade.toUpperCase() !== 'BRASILEIRO',
  )
  @IsNotEmpty()
  passaporte: PassaporteDto;
  @IsNotEmpty()
  @IsString()
  senha: string;
}
