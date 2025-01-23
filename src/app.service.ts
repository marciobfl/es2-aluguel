import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import TypeormFuncionarioEntity from './funcionario/infra/typeorm/entities/typeorm-funcionario.entity';
import TypeormCiclistaEntity from './ciclista/infra/typeorm/entities/typeorm-ciclista.entity';
import TypeormAluguelEntity from './aluguel/infra/typeorm/entities/typeorm-aluguel.entity';
import generateMatricula from './common/utils/generate-matricula';
import { FuncionarioFuncao } from './funcionario/domain/funcionario';
import { CiclistaStatus } from './ciclista/domain/ciclista';

@Injectable()
export default class AppService {
  constructor(
    @Inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async restoreDatabase() {
    await this.dataSource.query('DELETE FROM ciclistas');
    await this.dataSource.query(
      'UPDATE sqlite_sequence SET seq = 0 WHERE name = "ciclistas"',
    );

    await this.dataSource.query('DELETE FROM alugueis');
    await this.dataSource.query(
      'UPDATE sqlite_sequence SET seq = 0 WHERE name = "alugueis"',
    );

    await this.dataSource.query('DELETE FROM "cartoes-de-credito"');
    await this.dataSource.query(
      'UPDATE sqlite_sequence SET seq = 0 WHERE name = "cartoes-de-credito"',
    );

    await this.dataSource.query('DELETE FROM funcionarios');
    await this.dataSource.query(
      'UPDATE sqlite_sequence SET seq = 0 WHERE name = "funcionarios"',
    );

    const funcionariosRepository = this.dataSource.getRepository(
      TypeormFuncionarioEntity,
    );
    const ciclistasRepository = this.dataSource.getRepository(
      TypeormCiclistaEntity,
    );
    const alugueisRepository =
      this.dataSource.getRepository(TypeormAluguelEntity);

    await ciclistasRepository.save({
      status: CiclistaStatus.ATIVADO,
      nome: 'Fulano Beltrano',
      nascimento: '2021-05-02',
      cpf: '78804034009',
      nacionalidade: 'Brasileiro',
      email: 'user@example.com',
      urlFotoDocumento: '',
      senha: 'ABC123',
      cartaoDeCredito: {
        nomeTitular: 'Fulano Beltrano',
        numero: '4539620659922097',
        validade: '2026-12',
        cvv: '123',
      },
    });

    await ciclistasRepository.save({
      status: CiclistaStatus.CONFIRMACAO_PENDENTE,
      nome: 'Fulano Beltrano',
      nascimento: '2021-05-02',
      cpf: '43943488039',
      nacionalidade: 'Brasileiro',
      email: 'user2@example.com',
      urlFotoDocumento: '',
      senha: 'ABC123',
      cartaoDeCredito: {
        nomeTitular: 'Fulano Beltrano',
        numero: '4539620659922097',
        validade: '2026-12',
        cvv: '123',
      },
    });

    const ciclista3 = await ciclistasRepository.save({
      status: CiclistaStatus.ATIVADO,
      nome: 'Fulano Beltrano',
      nascimento: '2021-05-02',
      cpf: '10243164084',
      nacionalidade: 'Brasileiro',
      email: 'user3@example.com',
      urlFotoDocumento: '',
      senha: 'ABC123',
      cartaoDeCredito: {
        nomeTitular: 'Fulano Beltrano',
        numero: '4539620659922097',
        validade: '2026-12',
        cvv: '123',
      },
    });

    const ciclista4 = await ciclistasRepository.save({
      status: CiclistaStatus.ATIVADO,
      nome: 'Fulano Beltrano',
      nascimento: '2021-05-02',
      cpf: '30880150017',
      nacionalidade: 'Brasileiro',
      email: 'user4@example.com',
      urlFotoDocumento: '',
      senha: 'ABC123',
      cartaoDeCredito: {
        nomeTitular: 'Fulano Beltrano',
        numero: '4539620659922097',
        validade: '2026-12',
        cvv: '123',
      },
    });

    await funcionariosRepository.save({
      matricula: generateMatricula(),
      confirmacaoSenha: '123',
      senha: '123',
      nome: 'Beltrano',
      email: 'employee@example.com',
      cpf: '99999999999',
      funcao: FuncionarioFuncao.REPARADOR,
      idade: 25,
    });

    await alugueisRepository.save({
      bicicleta: 3,
      trancaInicio: 2,
      ciclista: ciclista3.id,
      cobranca: 1,
      horaInicio: new Date(new Date().getTime() + 1000),
    });

    await alugueisRepository.save({
      bicicleta: 5,
      trancaInicio: 4,
      ciclista: ciclista4.id,
      cobranca: 2,
      horaInicio: new Date(new Date().getTime() - 1000 * 60 * 60 * 2),
    });

    await alugueisRepository.save({
      bicicleta: 1,
      trancaInicio: 1,
      trancaFim: 2,
      ciclista: ciclista3.id,
      cobranca: 1,
      horaInicio: new Date(new Date().getTime() - 1000 * 60 * 60 * 2),
      horaFim: new Date(),
    });
  }
}
