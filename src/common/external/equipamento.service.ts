import { Injectable } from '@nestjs/common';
import Bicicleta from '../domain/bicicleta';
import { Tranca } from '../domain/tranca';
import { AxiosError, AxiosInstance } from 'axios';

export type TypeTranca = {
  idTranca: number;
  idBicicleta: number;
};

@Injectable()
export class EquipamentoService {
  constructor(private readonly client: AxiosInstance) {}

  async getBicicletaById(idBicicleta: number): Promise<Bicicleta> {
    try {
      const response = await this.client.get('/bicicleta/' + idBicicleta);
      return response.data;
    } catch {
      return null;
    }
  }

  async getTrancaById(idTranca: number): Promise<Tranca> {
    try {
      const response = await this.client.get('/tranca/' + idTranca);
      return response.data;
    } catch (error) {
      console.log((error as AxiosError).response);
      return null;
    }
  }

  async unlockTranca(unlockTranca: TypeTranca): Promise<Tranca> {
    try {
      const response = await this.client.post(
        '/tranca/' + unlockTranca.idTranca + '/destrancar',
        { bicicleta: unlockTranca.idBicicleta },
      );
      return response.data;
    } catch {
      return null;
    }
  }

  async lockTranca(lockTranca: TypeTranca): Promise<Tranca> {
    try {
      const response = await this.client.post(
        '/tranca/' + lockTranca.idTranca + '/trancar',
        { bicicleta: lockTranca.idBicicleta },
      );
      return response.data;
    } catch {
      return null;
    }
  }
}
