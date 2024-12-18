import {
  AluguelRepository,
  FindAluguel,
  UpdateAluguel,
} from 'src/aluguel/domain/aluguel.repository';
import { Repository } from 'typeorm';
import TypeormAluguelEntity from '../entities/typeorm-aluguel.entity';
import AluguelEntity from 'src/aluguel/domain/aluguel.entity';

export class TypeormAluguelRepository implements AluguelRepository {
  constructor(
    private readonly aluguelDatabase: Repository<TypeormAluguelEntity>,
  ) {}
  save(aluguel: Partial<AluguelEntity>): Promise<AluguelEntity> {
    return this.aluguelDatabase.save(aluguel);
  }
  async update(id: number, data: UpdateAluguel): Promise<AluguelEntity> {
    await this.aluguelDatabase.update(id, data);
    return this.aluguelDatabase.findOne({
      where: {
        id: id,
      },
    });
  }
  findBy(data: FindAluguel): Promise<AluguelEntity> {
    return this.aluguelDatabase.findOne({
      where: data,
    });
  }
}
