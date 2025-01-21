import { EquipamentoService } from './equipamento.service';
import { AxiosInstance } from 'axios';
import Bicicleta, { BicicletaStatus } from '../domain/bicicleta';
import { Tranca, TrancaStatus } from '../domain/tranca';

jest.mock('axios'); // Mock da biblioteca axios

const mockAxios = {
  get: jest.fn(),
  post: jest.fn(),
} as unknown as AxiosInstance;

describe('EquipamentoService', () => {
  let service: EquipamentoService;

  let bicicletaMock: Bicicleta;
  let trancaMock: Tranca;

  beforeEach(() => {
    service = new EquipamentoService(mockAxios);
    bicicletaMock = {
      id: 1,
      modelo: 'Mountain Bike',
      ano: '2000',
      marca: 'Caloi',
      numero: 111,
      status: BicicletaStatus.DISPONIVEL,
    };
    trancaMock = {
      id: 1,
      status: TrancaStatus.LIVRE,
      bicicleta: 2,
      anoDeFabricacao: '2000',
      localizacao: 'Rj',
      modelo: 'Caloi',
      numero: 1230,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBicicletaById', () => {
    it('should return a bicicleta when request is successful', async () => {
      jest
        .spyOn(mockAxios, 'get')
        .mockResolvedValueOnce({ data: bicicletaMock });

      const result = await service.getBicicletaById(1);

      expect(mockAxios.get).toHaveBeenCalledWith('/bicicleta/1');
      expect(result).toEqual(bicicletaMock);
    });

    it('should return null when request fails', async () => {
      jest
        .spyOn(mockAxios, 'get')
        .mockRejectedValueOnce(new Error('Network Error'));

      const result = await service.getBicicletaById(1);

      expect(mockAxios.get).toHaveBeenCalledWith('/bicicleta/1');
      expect(result).toBeNull();
    });
  });

  describe('getTrancaById', () => {
    it('should return a tranca when request is successful', async () => {
      jest.spyOn(mockAxios, 'get').mockResolvedValueOnce({ data: trancaMock });

      const result = await service.getTrancaById(1);

      expect(mockAxios.get).toHaveBeenCalledWith('/tranca/1');
      expect(result).toEqual(trancaMock);
    });

    it('should return null and log error when request fails', async () => {
      jest.spyOn(mockAxios, 'get').mockRejectedValueOnce({
        response: { status: 404, data: 'Not Found' },
      });

      const result = await service.getTrancaById(1);

      expect(mockAxios.get).toHaveBeenCalledWith('/tranca/1');
      expect(result).toBeNull();
    });
  });

  describe('unlockTranca', () => {
    it('should return tranca when unlock is successful', async () => {
      const unlockTranca = { idTranca: 1, idBicicleta: 2 };
      jest.spyOn(mockAxios, 'post').mockResolvedValueOnce({ data: trancaMock });

      const result = await service.unlockTranca(unlockTranca);

      expect(mockAxios.post).toHaveBeenCalledWith('/tranca/1/destrancar', {
        bicicleta: 2,
      });
      expect(result).toEqual(trancaMock);
    });

    it('should return null when unlock fails', async () => {
      jest
        .spyOn(mockAxios, 'post')
        .mockRejectedValueOnce(new Error('Network Error'));
      const unlockTranca = { idTranca: 1, idBicicleta: 2 };

      const result = await service.unlockTranca(unlockTranca);

      expect(mockAxios.post).toHaveBeenCalledWith('/tranca/1/destrancar', {
        bicicleta: 2,
      });
      expect(result).toBeNull();
    });
  });

  describe('lockTranca', () => {
    it('should return tranca when lock is successful', async () => {
      const lockTranca = { idTranca: 1, idBicicleta: 2 };
      jest.spyOn(mockAxios, 'post').mockResolvedValueOnce({ data: trancaMock });

      const result = await service.lockTranca(lockTranca);

      expect(mockAxios.post).toHaveBeenCalledWith('/tranca/1/trancar', {
        bicicleta: 2,
      });
      expect(result).toEqual(trancaMock);
    });

    it('should return null when lock fails', async () => {
      jest
        .spyOn(mockAxios, 'post')
        .mockRejectedValueOnce(new Error('Network Error'));
      const lockTranca = { idTranca: 1, idBicicleta: 2 };

      const result = await service.lockTranca(lockTranca);

      expect(mockAxios.post).toHaveBeenCalledWith('/tranca/1/trancar', {
        bicicleta: 2,
      });
      expect(result).toBeNull();
    });
  });
});
