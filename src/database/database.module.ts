import { Global, Module } from '@nestjs/common';
import CartaoDeCreditoEntity from 'src/cartao-de-credito/infrastructure/typeorm/entities/typeorm-cartao-de-credito.entity';
import TypeormCiclistaEntity from 'src/ciclista/infra/database/entities/typeorm-ciclista.entity';
import TypeormPassaporteEntity from 'src/ciclista/infra/database/entities/typeorm-passaporte.entity';
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
            CartaoDeCreditoEntity,
            TypeormPassaporteEntity,
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
