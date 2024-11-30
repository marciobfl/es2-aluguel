import { Inject, Injectable } from '@nestjs/common';
import { CiclistaRepository } from './domain/ciclista.repository';
import CreateCiclistaDto from './dto/create-ciclista.dto';

@Injectable()
export class CiclistaService {
  constructor(
    @Inject('CiclistaRepository')
    private readonly ciclistaRepository: CiclistaRepository,
  ) {}

  async createCiclista(createCiclistaDto: CreateCiclistaDto) {
    const { ciclista, meioDePagamento } = createCiclistaDto;
    const ciclistaExists = await this.ciclistaRepository.ciclistaExists({
      email: ciclista.email,
    });

    if (ciclistaExists) {
      throw new Error('Ciclista já cadastrado!\n');
    }

    return this.ciclistaRepository.create({
      ...ciclista,
      cartaoDeCredito: meioDePagamento,
    });
  }

  async emailExists(email: string) {
    const emailExists = await this.ciclistaRepository.ciclistaExists({ email });

    return emailExists;
  }

  async activateCiclista(idCiclista: number) {
    const idExists = await this.ciclistaRepository.ciclistaExists({
      id: idCiclista,
    });

    if (!idExists) {
      throw new Error('Ciclista já cadastrado!\n');
    }

    return this.ciclistaRepository.activateCiclista(idCiclista);
  }
}
