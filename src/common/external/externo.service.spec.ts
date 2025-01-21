import { ExternoService } from './externo.service';
import { AxiosInstance } from 'axios';
import { AppError } from '../domain/app-error';
import Cobranca, { CobrancaStatus } from '../domain/cobranca';

jest.mock('axios'); // Mock da biblioteca axios

const mockAxios = {
  post: jest.fn(),
} as unknown as AxiosInstance;

describe('ExternoService', () => {
  let service: ExternoService;

  beforeEach(() => {
    service = new ExternoService(mockAxios);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendEmail', () => {
    it('should send an email successfully', async () => {
      jest.spyOn(mockAxios, 'post').mockResolvedValueOnce({});

      await expect(
        service.sendEmail('test@example.com', 'Subject', 'Body'),
      ).resolves.not.toThrow();

      expect(mockAxios.post).toHaveBeenCalledWith('/enviarEmail', {
        email: 'test@example.com',
        assunto: 'Subject',
        mensagem: 'Body',
      });
    });

    it('should throw an AppError when email sending fails', async () => {
      jest
        .spyOn(mockAxios, 'post')
        .mockRejectedValueOnce(new Error('Network Error'));

      await expect(
        service.sendEmail('test@example.com', 'Subject', 'Body'),
      ).rejects.toThrow(AppError);
      expect(mockAxios.post).toHaveBeenCalledWith('/enviarEmail', {
        email: 'test@example.com',
        assunto: 'Subject',
        mensagem: 'Body',
      });
    });
  });

  describe('authorizeCobranca', () => {
    it('should return cobranca when authorization is successful', async () => {
      const cobrancaMock: Cobranca = {
        id: 1,
        valor: 100,
        ciclista: 2,
        horaFinalizacao: '',
        horaSolicitacao: '',
        status: CobrancaStatus.PAGA,
      };
      const createCobranca = { valor: 100, ciclista: 2 };
      jest
        .spyOn(mockAxios, 'post')
        .mockResolvedValueOnce({ data: cobrancaMock });

      const result = await service.authorizeCobranca(createCobranca);

      expect(mockAxios.post).toHaveBeenCalledWith('/cobranca', {
        valor: 100,
        ciclista: 2,
      });
      expect(result).toEqual(cobrancaMock);
    });

    it('should throw an AppError when authorization fails', async () => {
      const createCobranca = { valor: 100, ciclista: 2 };
      jest
        .spyOn(mockAxios, 'post')
        .mockRejectedValueOnce(new Error('Network Error'));

      await expect(service.authorizeCobranca(createCobranca)).rejects.toThrow(
        AppError,
      );
      expect(mockAxios.post).toHaveBeenCalledWith('/cobranca', {
        valor: 100,
        ciclista: 2,
      });
    });
  });
});
