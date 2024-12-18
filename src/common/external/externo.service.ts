import { Injectable } from '@nestjs/common';
import Cobranca, { CobrancaStatus } from '../domain/cobranca';

export type CreateCobranca = {
  ciclista: number;
  valor: number;
};

@Injectable()
export class ExternoService {
  async sendEmail(to: string, subject: string, body: string): Promise<string> {
    if (!to || !subject || !body) {
      throw new Error('Todos os campos são obrigatórios.');
    }
    console.log(
      `Envio de email para: ${to},
       Assunto: ${subject},
       Corpo: ${body}`,
    );
    return 'sucesso';
  }
  async authorizeCobranca(cobranca: CreateCobranca): Promise<Cobranca> {
    return {
      ciclista: cobranca.ciclista,
      valor: cobranca.valor,
      id: 1,
      status: CobrancaStatus.PAGA,
      horaSolicitacao: new Date().toISOString(),
      horaFinalizacao: new Date().toISOString(),
    };
  }
}
