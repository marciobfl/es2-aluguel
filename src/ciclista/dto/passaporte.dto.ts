import { IsNotEmpty, IsString } from 'class-validator';

export default class PassaporteDto {
  @IsNotEmpty()
  @IsString()
  numero: string;
  @IsNotEmpty()
  @IsString()
  pais: string;
  @IsNotEmpty()
  @IsString()
  validade: string;
}
