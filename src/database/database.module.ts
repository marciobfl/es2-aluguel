import { Global, Module } from '@nestjs/common';
import TypeormCartaoDeCreditoEntity from 'src/cartao-de-credito/infra/typeorm/entities/typeorm-cartao-de-credito.entity';
import TypeormCiclistaEntity from 'src/ciclista/infra/typeorm/entities/typeorm-ciclista.entity';
import TypeormPassaporteEntity from 'src/ciclista/infra/typeorm/entities/typeorm-passaporte.entity';
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
            TypeormPassaporteEntity,
            TypeormFuncionarioEntity,
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
