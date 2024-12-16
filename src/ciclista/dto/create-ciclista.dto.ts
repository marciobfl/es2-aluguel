import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CiclistaDto } from './ciclista.dto';
import CartaoDeCreditoDto from 'src/cartao-de-credito/dto/cartao-de-credito.dto';

export default class CreateCiclistaDto {
  @ValidateNested()
  @Type(() => CiclistaDto)
  ciclista: CiclistaDto;

  @ValidateNested()
  @Type(() => CartaoDeCreditoDto)
  meioDePagamento: CartaoDeCreditoDto;
}
