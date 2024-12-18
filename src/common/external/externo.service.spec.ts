import { ExternoService } from './externo.service';
import { CobrancaStatus } from '../domain/cobranca';

describe('ExternoService', () => {
  let externoService: ExternoService;

  beforeEach(() => {
    externoService = new ExternoService();
  });

  describe('sendEmail', () => {
    it('deve retornar "sucesso" ao enviar um email com dados válidos', async () => {
      const to = 'usuario@exemplo.com';
      const subject = 'Teste';
      const body = 'Este é um email de teste';

      const result = await externoService.sendEmail(to, subject, body);

      expect(result).toBe('sucesso');
    });

    it('deve lançar um erro se algum dos campos estiver vazio', async () => {
      await expect(
        externoService.sendEmail('', 'Teste', 'Corpo do email'),
      ).rejects.toThrow('Todos os campos são obrigatórios.');

      await expect(
        externoService.sendEmail('usuario@exemplo.com', '', 'Corpo do email'),
      ).rejects.toThrow('Todos os campos são obrigatórios.');

      await expect(
        externoService.sendEmail('usuario@exemplo.com', 'Teste', ''),
      ).rejects.toThrow('Todos os campos são obrigatórios.');
    });
  });

  describe('authorizeCobranca', () => {
    it('deve autorizar uma cobrança e retornar os dados corretos', async () => {
      const cobrancaInput = { ciclista: 1, valor: 100.0 };
      const result = await externoService.authorizeCobranca(cobrancaInput);

      expect(result).toEqual(
        expect.objectContaining({
          ciclista: cobrancaInput.ciclista,
          valor: cobrancaInput.valor,
          id: expect.any(Number),
          status: CobrancaStatus.PAGA,
          horaSolicitacao: expect.any(String),
          horaFinalizacao: expect.any(String),
        }),
      );

      const horaSolicitacao = new Date(result.horaSolicitacao);
      const horaFinalizacao = new Date(result.horaFinalizacao);
      expect(horaSolicitacao.getTime()).toBeLessThanOrEqual(
        horaFinalizacao.getTime(),
      );
    });
  });
});
