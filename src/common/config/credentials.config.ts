import { ConfigService } from '@nestjs/config';
import { fetchSecrets } from '../@aws/secrets';

export default async () => {
  const configService = new ConfigService();
  if (configService.get('NODE_ENV') === 'aws-prod') {
    const secretName = 'prod/es2-aluguel';
    const secrets = await fetchSecrets(secretName);

    return {
      EQUIPAMENTO_SERVICE_URL: secrets.EQUIPAMENTO_SERVICE_URL,
      EXTERNO_SERVICE_URL: secrets.EXTERNO_SERVICE_URL,
    };
  }

  return {
    EXTERNO_SERVICE_URL: configService.get('EXTERNO_SERVICE_URL'),
    EQUIPAMENTO_SERVICE_URL: configService.get('EQUIPAMENTO_SERVICE_URL'),
  };
};
