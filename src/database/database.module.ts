import { Global, Module } from '@nestjs/common';
import TypeormAluguelEntity from 'src/aluguel/infra/typeorm/entities/typeorm-aluguel.entity';
import TypeormCartaoDeCreditoEntity from 'src/cartao-de-credito/infra/typeorm/entities/typeorm-cartao-de-credito.entity';
import TypeormCiclistaEntity from 'src/ciclista/infra/typeorm/entities/typeorm-ciclista.entity';
import TypeormFuncionarioEntity from 'src/funcionario/infra/typeorm/entities/typeorm-funcionario.entity';
import { DataSource } from 'typeorm';

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource({
          entities: [
            TypeormCiclistaEntity,
            TypeormCartaoDeCreditoEntity,
            TypeormFuncionarioEntity,
            TypeormAluguelEntity,
          ],
          type: 'sqlite',
          database: __dirname + '/../../db.sqlite',
          synchronize: true,
        });
        await dataSource.initialize();
        return dataSource;
      },
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
