import { IsNotEmpty } from 'class-validator';

export class CreateAluguelDto {
  id: number;
  @IsNotEmpty()
  trancaInicio: number;
  @IsNotEmpty()
  ciclista: number;
}
