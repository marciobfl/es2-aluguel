import { Module } from '@nestjs/common';
import CiclistaController from './ciclista.controller';
import { CiclistaService } from './ciclista.service';
import { CiclistaRepositoryImpl } from './infra/database/repositories/ciclista.repository';
import { DataSource } from 'typeorm';
import CiclistaEntity from './infra/database/entities/ciclista.entity';

@Module({
  controllers: [CiclistaController],
  providers: [
    CiclistaService,
    {
      provide: 'CiclistaRepository',
      useFactory: (dataSource: DataSource) => {
        return new CiclistaRepositoryImpl(
          dataSource.getRepository(CiclistaEntity),
        );
      },
      inject: [DataSource],
    },
  ],
})
export default class CiclistaModule {}
