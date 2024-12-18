import { Test, TestingModule } from '@nestjs/testing';
import { ExternoService } from './externo.service';

describe('ExternoService', () => {
  let service: ExternoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternoService],
    }).compile();

    service = module.get<ExternoService>(ExternoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return "sucesso" when email is sent', async () => {
    const to = 'test@example.com';
    const subject = 'Test Subject';
    const body = 'This is a test email.';

    const result = await service.sendEmail(to, subject, body);

    expect(result).toBe('sucesso');
  });

  it('should log email details', async () => {
    const to = 'test@example.com';
    const subject = 'Log Test';
    const body = 'Check if logs are correct.';

    const consoleSpy = jest.spyOn(console, 'log');

    await service.sendEmail(to, subject, body);

    expect(consoleSpy).toHaveBeenCalledWith(
      `Envio de email para: ${to},\n       Assunto: ${subject},\n       Corpo: ${body}`,
    );

    consoleSpy.mockRestore();
  });

  it('should throw an error if inputs are invalid', async () => {
    await expect(service.sendEmail('', 'Test', 'Test body')).rejects.toThrow(
      'Todos os campos são obrigatórios.',
    );
  });
});
