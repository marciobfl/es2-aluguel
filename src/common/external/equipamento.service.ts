import { Injectable } from '@nestjs/common';
import Bicicleta, { BicicletaStatus } from '../domain/bicicleta';
import { Tranca, TrancaStatus } from '../domain/tranca';

export type TypeTranca = {
  idTranca: number;
  idBicicleta: number;
};

@Injectable()
export class EquipamentoService {
  async getBicicletaById(idBicicleta: number): Promise<Bicicleta> {
    return {
      id: idBicicleta,
      marca: 'Caloi',
      modelo: 'Mountain Bike',
      ano: '2019',
      numero: 500,
      status: BicicletaStatus.EM_USO,
    };
  }

  async getTrancaById(idTranca: number): Promise<Tranca> {
    return {
      id: idTranca,
      bicicleta: 1,
      anoDeFabricacao: '2024',
      localizacao: 'Urca',
      modelo: 'tranca ',
      numero: 500,
      status: TrancaStatus.LIVRE,
    };
  }

  async unlockTranca(unlockTranca: TypeTranca): Promise<Tranca> {
    return {
      id: unlockTranca.idTranca,
      bicicleta: unlockTranca.idBicicleta,
      anoDeFabricacao: '2024',
      localizacao: 'Urca',
      modelo: 'tranca ',
      numero: 500,
      status: TrancaStatus.LIVRE,
    };
  }

  async lockTranca(lockTranca: TypeTranca): Promise<Tranca> {
    return {
      id: lockTranca.idTranca,
      bicicleta: lockTranca.idBicicleta,
      anoDeFabricacao: '2024',
      localizacao: 'Urca',
      modelo: 'tranca ',
      numero: 500,
      status: TrancaStatus.OCUPADA,
    };
  }
}
