import { DataSource } from 'typeorm';
import { TypeormAluguelRepository } from './infra/typeorm/repositories/typeorm-aluguel.repository';
import { AluguelService } from './aluguel.service';
import AluguelController from './aluguel.controller';
import TypeormAluguelEntity from './infra/typeorm/entities/typeorm-aluguel.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeormCiclistaEntity from 'src/ciclista/infra/typeorm/entities/typeorm-ciclista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeormCiclistaEntity])],
  controllers: [AluguelController],
  providers: [
    AluguelService,
    {
      provide: 'AluguelRepository',
      inject: [DataSource],
      useFactory: (dataSource: DataSource) => {
        return new TypeormAluguelRepository(
          dataSource.getRepository(TypeormAluguelEntity),
        );
      },
    },
  ],
})
export default class AluguelModule {}
