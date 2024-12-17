import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import CiclistaModule from './ciclista/ciclista.module';
import CartaoDeCreditoModule from './cartao-de-credito/cartao-de-credito.module';
import FuncionarioModule from './funcionario/funcionario.module';
import AluguelModule from './aluguel/aluguel.module';

@Module({
  imports: [
    DatabaseModule,
    CiclistaModule,
    CartaoDeCreditoModule,
    FuncionarioModule,
    AluguelModule,
  ],
})
export class AppModule {}
