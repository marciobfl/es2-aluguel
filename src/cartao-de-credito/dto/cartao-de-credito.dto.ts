import { IsNotEmpty, IsString } from 'class-validator';

export default class CartaoDeCreditoDto {
  @IsString()
  @IsNotEmpty()
  nomeTitular: string;
  @IsString()
  @IsNotEmpty()
  numero: string;
  @IsString()
  @IsNotEmpty()
  validade: string;
  @IsString()
  @IsNotEmpty()
  cvv: string;
}
