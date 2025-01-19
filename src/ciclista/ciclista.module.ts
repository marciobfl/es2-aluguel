import { Module } from '@nestjs/common';
import CiclistaController from './ciclista.controller';
import { CiclistaService } from './ciclista.service';
import { TypeormCiclistaRepository } from './infra/typeorm/repositories/typeorm-ciclista.repository';
import { DataSource } from 'typeorm';
import TypeormCiclistaEntity from './infra/typeorm/entities/typeorm-ciclista.entity';
import { TypeormAluguelRepository } from 'src/aluguel/infra/typeorm/repositories/typeorm-aluguel.repository';
import TypeormAluguelEntity from 'src/aluguel/infra/typeorm/entities/typeorm-aluguel.entity';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { ExternoService } from 'src/common/external/externo.service';
import { EquipamentoService } from 'src/common/external/equipamento.service';

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
    {
      provide: 'AluguelRepository',
      useFactory: (dataSource: DataSource) => {
        return new TypeormAluguelRepository(
          dataSource.getRepository(TypeormAluguelEntity),
        );
      },
      inject: [DataSource],
    },
    {
      provide: 'ExternoService',
      useFactory: (configService: ConfigService) => {
        const cliente = axios.create({
          baseURL: configService.get('EXTERNO_SERVICE_URL'),
        });
        return new ExternoService(cliente);
      },
      inject: [ConfigService],
    },
    {
      provide: 'EquipamentoService',
      useFactory: (configService: ConfigService) => {
        const cliente = axios.create({
          baseURL: configService.get('EQUIPAMENTO_SERVICE_URL'),
        });
        return new EquipamentoService(cliente);
      },
      inject: [ConfigService],
    },
  ],
})
export default class CiclistaModule {}
