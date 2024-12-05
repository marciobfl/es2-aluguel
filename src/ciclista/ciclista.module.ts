import { Module } from '@nestjs/common';
import CiclistaController from './ciclista.controller';
import { CiclistaService } from './ciclista.service';
import { TypeormCiclistaRepository } from './infra/typeorm/repositories/typeorm-ciclista.repository';
import { DataSource } from 'typeorm';
import TypeormCiclistaEntity from './infra/typeorm/entities/typeorm-ciclista.entity';

@Module({
  controllers: [CiclistaController],
  providers: [
    CiclistaService,
    {
      provide: 'CiclistaRepository',
      useFactory: (dataSource: DataSource) => {
        return new TypeormCiclistaRepository(
          dataSource.getRepository(TypeormCiclistaEntity),
        );
      },
      inject: [DataSource],
    },
  ],
})
export default class CiclistaModule {}
