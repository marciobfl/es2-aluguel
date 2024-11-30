import { Global, Module } from '@nestjs/common';
import CartaoDeCreditoEntity from 'src/cartao-de-credito/infrastructure/typeorm/cartao-de-credito.entity';
import CiclistaEntity from 'src/ciclista/infra/database/entities/ciclista.entity';
import PassaporteEntity from 'src/ciclista/infra/database/entities/passaporte.entity';
import { DataSource } from 'typeorm';

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource({
          entities: [CiclistaEntity, CartaoDeCreditoEntity, PassaporteEntity],
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
