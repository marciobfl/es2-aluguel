import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import CiclistaModule from './ciclista/ciclista.module';
import CartaoDeCreditoModule from './cartao-de-credito/cartao-de-credito.module';
import FuncionarioModule from './funcionario/funcionario.module';
import AluguelModule from './aluguel/aluguel.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppController from './app.controller';
import AppService from './app.service';
import { DataSource } from 'typeorm';
import { EquipamentoService } from './common/external/equipamento.service';
import axios from 'axios';
import { ExternoService } from './common/external/externo.service';
import credentialsConfig from './common/config/credentials.config';

@Global()
@Module({
  imports: [
    DatabaseModule,
    CiclistaModule,
    CartaoDeCreditoModule,
    FuncionarioModule,
    AluguelModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      ignoreEnvFile: process.env.NODE_ENV === 'aws-prod' ? true : false,
      load: [credentialsConfig],
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useFactory: (dataSource: DataSource) => {
        return new AppService(dataSource);
      },
      inject: [DataSource],
    },
    {
      provide: EquipamentoService,
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('EQUIPAMENTO_SERVICE_URL'));
        const client = axios.create({
          baseURL: configService.get('EQUIPAMENTO_SERVICE_URL'),
        });
        return new EquipamentoService(client);
      },
      inject: [ConfigService],
    },
    {
      provide: ExternoService,
      useFactory: (configService: ConfigService) => {
        const client = axios.create({
          baseURL: configService.get('EXTERNO_SERVICE_URL'),
        });
        return new ExternoService(client);
      },
      inject: [ConfigService],
    },
  ],
  exports: [ExternoService, EquipamentoService],
})
export class AppModule {}
