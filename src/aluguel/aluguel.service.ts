import { Inject, Injectable } from '@nestjs/common';
import { CreateAluguelDto } from './dto/create-aluguel.dto';
import { AluguelRepository } from './domain/aluguel.repository';
import AluguelEntity from './infra/typeorm/entities/typeorm-aluguel.entity';

@Injectable()
export class AluguelService {
  constructor(
    @Inject('AluguelRepository')
    private readonly aluguelRepository: AluguelRepository,
  ) {}

  async createAluguel(
    createAluguelDto: CreateAluguelDto,
  ): Promise<AluguelEntity> {
    const aluguel = new AluguelEntity();
    aluguel.trancaInicio = createAluguelDto.trancaInicio;
    aluguel.ciclista = createAluguelDto.ciclista;
    aluguel.horaInicio = new Date().toISOString();

    return await this.aluguelRepository.save(aluguel);
  }
}
