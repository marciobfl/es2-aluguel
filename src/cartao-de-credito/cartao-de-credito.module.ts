import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import TypeormCartaoDeCreditoEntity from './infrastructure/typeorm/entities/typeorm-cartao-de-credito.entity';
import { TypeormCartaoDeCreditoRepository } from './infrastructure/typeorm/repositories/typeorm-cartao-de-credito.repository';
import CartaoDeCreditoController from './cartao-de-credito.controller';
import { CartaoDeCreditoService } from './cartao-de-credito.service';

@Module({
  controllers: [CartaoDeCreditoController],
  providers: [
    CartaoDeCreditoService,
    {
      provide: 'CartaoDeCreditoRepository',
      useFactory: (dataSource: DataSource) => {
        return new TypeormCartaoDeCreditoRepository(
          dataSource.getRepository(TypeormCartaoDeCreditoEntity),
        );
      },
      inject: [DataSource],
    },
  ],
})
export default class CartaoDeCreditoModule {}
