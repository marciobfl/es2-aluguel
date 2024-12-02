import {
  CiclistaRepository,
  CreateCiclista,
  ExistsCiclista,
} from 'src/ciclista/domain/ciclista.repository';
import { Repository } from 'typeorm';
import CiclistaEntity from '../entities/ciclista.entity';
import { Ciclista, CiclistaStatus } from 'src/ciclista/domain/ciclista';

export class CiclistaRepositoryImpl implements CiclistaRepository {
  constructor(private readonly ciclistaDatabase: Repository<CiclistaEntity>) {}
  async ciclistaExists(query: ExistsCiclista): Promise<boolean> {
    const ciclista = await this.ciclistaDatabase.findOneBy(query);

    return !!ciclista;
  }
  async activateCiclista(id: number): Promise<Ciclista> {
    const ciclista = await this.ciclistaDatabase.findOne({
      where: { id },
      relations: { cartaoDeCredito: true, passaporte: true },
    });
    ciclista.status = CiclistaStatus.ATIVADO;
    await this.ciclistaDatabase.save(ciclista);

    return CiclistaEntity.toDomain(ciclista);
  }
  async create(ciclista: CreateCiclista): Promise<Ciclista> {
    const createdCiclista = await this.ciclistaDatabase.save({
      ...ciclista,
      status: CiclistaStatus.CONFIRMACAO_PENDENTE,
    });
    return CiclistaEntity.toDomain(createdCiclista);
  }
  update(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
