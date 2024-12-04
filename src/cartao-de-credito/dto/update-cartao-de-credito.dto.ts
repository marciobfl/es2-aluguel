import { IsString } from 'class-validator';

export default class UpdateCartaoDeCreditoDto {
  @IsString()
  nomeTitular: string;
  @IsString()
  numero: string;
  @IsString()
  validade: string;
  @IsString()
  cvv: string;
}
