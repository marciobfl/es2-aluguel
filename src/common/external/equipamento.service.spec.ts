import { EquipamentoService } from './equipamento.service';
import { BicicletaStatus } from '../domain/bicicleta';
import { TrancaStatus } from '../domain/tranca';

describe('EquipamentoService', () => {
  let equipamentoService: EquipamentoService;

  beforeEach(() => {
    equipamentoService = new EquipamentoService();
  });

  describe('getBicicletaById', () => {
    it('deve retornar uma bicicleta pelo ID', async () => {
      const idBicicleta = 1;
      const bicicleta = await equipamentoService.getBicicletaById(idBicicleta);

      expect(bicicleta).toEqual({
        id: idBicicleta,
        marca: 'Caloi',
        modelo: 'Mountain Bike',
        ano: '2019',
        numero: 500,
        status: BicicletaStatus.EM_USO,
      });
    });
  });

  describe('getTrancaById', () => {
    it('deve retornar uma tranca pelo ID', async () => {
      const idTranca = 1;
      const tranca = await equipamentoService.getTrancaById(idTranca);

      expect(tranca).toEqual({
        id: idTranca,
        bicicleta: 1,
        anoDeFabricacao: '2024',
        localizacao: 'Urca',
        modelo: 'tranca ',
        numero: 500,
        status: TrancaStatus.LIVRE,
      });
    });
  });

  describe('unlockTranca', () => {
    it('deve desbloquear uma tranca e retornar os dados atualizados', async () => {
      const unlockTranca = { idTranca: 1, idBicicleta: 10 };
      const tranca = await equipamentoService.unlockTranca(unlockTranca);

      expect(tranca).toEqual({
        id: unlockTranca.idTranca,
        bicicleta: unlockTranca.idBicicleta,
        anoDeFabricacao: '2024',
        localizacao: 'Urca',
        modelo: 'tranca ',
        numero: 500,
        status: TrancaStatus.LIVRE,
      });
    });
  });

  describe('lockTranca', () => {
    it('deve bloquear uma tranca e retornar os dados atualizados', async () => {
      const lockTranca = { idTranca: 1, idBicicleta: 10 };
      const tranca = await equipamentoService.lockTranca(lockTranca);

      expect(tranca).toEqual({
        id: lockTranca.idTranca,
        bicicleta: lockTranca.idBicicleta,
        anoDeFabricacao: '2024',
        localizacao: 'Urca',
        modelo: 'tranca ',
        numero: 500,
        status: TrancaStatus.OCUPADA,
      });
    });
  });
});
