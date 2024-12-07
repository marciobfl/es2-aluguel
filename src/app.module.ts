import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import CiclistaModule from './ciclista/ciclista.module';
import CartaoDeCreditoModule from './cartao-de-credito/cartao-de-credito.module';
import FuncionarioModule from './funcionario/funcionario.module';

@Module({
  imports: [
    DatabaseModule,
    CiclistaModule,
    CartaoDeCreditoModule,
    FuncionarioModule,
  ],
})
export class AppModule {}
