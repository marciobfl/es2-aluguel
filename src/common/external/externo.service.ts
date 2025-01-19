import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { AppError, AppErrorType } from '../domain/app-error';
import Cobranca from '../domain/cobranca';

export type CreateCobranca = {
  ciclista: number;
  valor: number;
};

@Injectable()
export class ExternoService {
  constructor(private readonly cliente: AxiosInstance) {}

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      await this.cliente.post('/enviarEmail', {
        email: to,
        assunto: subject,
        mensagem: body,
      });
    } catch {
      throw new AppError('ERRO!', AppErrorType.RESOURCE_CONFLICT);
    }
  }
  async authorizeCobranca(cobranca: CreateCobranca): Promise<Cobranca> {
    try {
      const response = await this.cliente.post('/cobranca', {
        valor: cobranca.valor,
        ciclista: cobranca.ciclista,
      });

      return response.data;
    } catch {
      throw new AppError('ERRO!', AppErrorType.RESOURCE_CONFLICT);
    }
  }
}
