import { Inject, Injectable } from '@nestjs/common';
import { CiclistaRepository } from './domain/ciclista.repository';
import CreateCiclistaDto from './dto/create-ciclista.dto';
import CiclistaEntity from './domain/ciclista.entity';
import { CiclistaStatus } from './domain/ciclista';

@Injectable()
export class CiclistaService {
  constructor(
    @Inject('CiclistaRepository')
    private readonly ciclistaRepository: CiclistaRepository,
  ) {}

  async createCiclista(createCiclistaDto: CreateCiclistaDto) {
    const { ciclista, meioDePagamento } = createCiclistaDto;
    const ciclistaAlreadyExists = await this.ciclistaRepository.findBy({
      email: ciclista.email,
    });

    if (ciclistaAlreadyExists) {
      throw new Error('Ciclista já cadastrado!\n');
    }

    const newCiclista = await this.ciclistaRepository.save({
      ...ciclista,
      cartaoDeCredito: meioDePagamento,
      status: CiclistaStatus.CONFIRMACAO_PENDENTE,
    });

    return CiclistaEntity.toDomain(newCiclista);
  }

  async emailExists(email: string) {
    const emailExists = await this.ciclistaRepository.findBy({ email });
    return !!emailExists;
  }

  async activateCiclista(idCiclista: number) {
    const ciclista = await this.ciclistaRepository.findBy({
      id: idCiclista,
    });

    if (!ciclista) {
      throw new Error('Ciclista não encontrado!\n');
    }

    if (ciclista.status == CiclistaStatus.ATIVADO) {
      throw new Error('Ciclista já foi ativado!\n');
    }

    ciclista.status = CiclistaStatus.ATIVADO;
    const activatedCiclista = await this.ciclistaRepository.save(ciclista);

    return CiclistaEntity.toDomain(activatedCiclista);
  }
}
