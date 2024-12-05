import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import FuncionarioController from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';
import { TypeormFuncionarioRepository } from './infra/typeorm/repositories/typeorm-funcionario.repository';
import TypeormFuncionarioEntity from './infra/typeorm/entities/typeorm-funcionario.entity';

@Module({
  controllers: [FuncionarioController],
  providers: [
    FuncionarioService,
    {
      provide: 'FuncionarioRepository',
      useFactory: (dataSource: DataSource) => {
        return new TypeormFuncionarioRepository(
          dataSource.getRepository(TypeormFuncionarioEntity),
        );
      },
      inject: [DataSource],
    },
  ],
})
export default class FuncionarioModule {}
