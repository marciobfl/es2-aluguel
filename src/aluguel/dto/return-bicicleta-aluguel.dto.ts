import { IsNotEmpty } from 'class-validator';

export class ReturnBicicletaAluguelDto {
  @IsNotEmpty()
  idTranca: number;
  @IsNotEmpty()
  idBicicleta: number;
}
