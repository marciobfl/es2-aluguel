import { DataSource } from 'typeorm';
import { TypeormAluguelRepository } from './infra/typeorm/repositories/typeorm-aluguel.repository';
import { AluguelService } from './aluguel.service';
import AluguelController from './aluguel.controller';
import TypeormAluguelEntity from './infra/typeorm/entities/typeorm-aluguel.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeormCiclistaEntity from 'src/ciclista/infra/typeorm/entities/typeorm-ciclista.entity';
import { EquipamentoService } from 'src/common/external/equipamento.service';
import { ExternoService } from 'src/common/external/externo.service';
import { TypeormCiclistaRepository } from 'src/ciclista/infra/typeorm/repositories/typeorm-ciclista.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeormCiclistaEntity])],
  controllers: [AluguelController],
  providers: [
    AluguelService,
    EquipamentoService,
    ExternoService,
    {
      provide: 'AluguelRepository',
      inject: [DataSource],
      useFactory: (dataSource: DataSource) => {
        return new TypeormAluguelRepository(
          dataSource.getRepository(TypeormAluguelEntity),
        );
      },
    },
    {
      provide: 'CiclistaRepository',
      inject: [DataSource],
      useFactory: (dataSource: DataSource) => {
        return new TypeormCiclistaRepository(
          dataSource.getRepository(TypeormCiclistaEntity),
        );
      },
    },
  ],
})
export default class AluguelModule {}
