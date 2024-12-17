import CiclistaEntity from 'src/ciclista/domain/ciclista.entity';
import {
  CiclistaRepository,
  ExistsCiclista,
  UpdateCiclista,
} from 'src/ciclista/domain/ciclista.repository';
import TypeormCiclistaEntity from '../entities/typeorm-ciclista.entity';
import { Not, Repository } from 'typeorm';
import { CiclistaStatus } from 'src/ciclista/domain/ciclista';

export class TypeormCiclistaRepository implements CiclistaRepository {
  constructor(
    private readonly ciclistaDatabase: Repository<TypeormCiclistaEntity>,
  ) {}
  async update(id: number, data: UpdateCiclista): Promise<CiclistaEntity> {
    await this.ciclistaDatabase.update(id, data);
    return this.ciclistaDatabase.findOne({
      where: {
        id: id,
        status: Not(CiclistaStatus.CONFIRMACAO_PENDENTE),
      },
    });
  }
  findBy(query: ExistsCiclista): Promise<CiclistaEntity> {
    return this.ciclistaDatabase.findOne({
      where: query,
    });
  }
  save(ciclista: CiclistaEntity): Promise<CiclistaEntity> {
    return this.ciclistaDatabase.save(ciclista);
  }
}
