import { IsNumber } from 'class-validator';

export default class DeleteFuncionarioDto {
  @IsNumber()
  id: number;
}
