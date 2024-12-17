import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, body: string): Promise<string> {
    if (!to || !subject || !body) {
      throw new Error('Todos os campos são obrigatórios.');
    }
    // console.log(
    //   `Envio de email para: ${to},
    //    Assunto: ${subject},
    //    Corpo: ${body}`,
    // );
    return 'sucesso';
  }
}
