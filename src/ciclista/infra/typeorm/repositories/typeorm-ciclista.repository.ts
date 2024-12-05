import CiclistaEntity from 'src/ciclista/domain/ciclista.entity';
import {
  CiclistaRepository,
  ExistsCiclista,
} from 'src/ciclista/domain/ciclista.repository';
import { Repository } from 'typeorm';
import TypeormCiclistaEntity from '../entities/typeorm-ciclista.entity';

export class TypeormCiclistaRepository implements CiclistaRepository {
  constructor(
    private readonly ciclistaDatabase: Repository<TypeormCiclistaEntity>,
  ) {}
  async update(data: MakeRequired<CiclistaEntity, 'id'>): Promise<void> {
    await this.ciclistaDatabase.update(data.id, data);
  }
  findBy(query: ExistsCiclista): Promise<CiclistaEntity> {
    return this.ciclistaDatabase.findOne({
      where: query,
      relations: { cartaoDeCredito: true, passaporte: true },
    });
  }
  save(ciclista: CiclistaEntity): Promise<CiclistaEntity> {
    return this.ciclistaDatabase.save(ciclista);
  }
}
