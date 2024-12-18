import { IsNotEmpty } from 'class-validator';

export class CreateAluguelDto {
  @IsNotEmpty()
  trancaInicio: number;
  @IsNotEmpty()
  ciclista: number;
}
