import { Inject, Injectable } from '@nestjs/common';
import { CreateAluguelDto } from './dto/create-aluguel.dto';
import { AluguelRepository } from './domain/aluguel.repository';
import { CiclistaRepository } from 'src/ciclista/domain/ciclista.repository';
import { AppError, AppErrorType } from 'src/common/domain/app-error';
import { CiclistaStatus } from 'src/ciclista/domain/ciclista';
import { ExternoService } from 'src/common/external/externo.service';
import { EquipamentoService } from 'src/common/external/equipamento.service';
import { TrancaStatus } from 'src/common/domain/tranca';
import { BicicletaStatus } from 'src/common/domain/bicicleta';
import AluguelEntity from './domain/aluguel.entity';
import { ReturnBicicletaAluguelDto } from './dto/return-bicicleta-aluguel.dto';

@Injectable()
export class AluguelService {
  constructor(
    @Inject('AluguelRepository')
    private readonly aluguelRepository: AluguelRepository,
    @Inject('CiclistaRepository')
    private readonly ciclistaRepository: CiclistaRepository,
    private readonly externoService: ExternoService,
    private readonly equipamentoService: EquipamentoService,
  ) {}

  private readonly COBRANCA_BASE_VALUE = 10;
  private readonly COBRANCA_PER_HALF_HOUR_VALUE = 5;

  async createAluguel(createAluguelDto: CreateAluguelDto) {
    const ciclista = await this.ciclistaRepository.findBy({
      id: createAluguelDto.ciclista,
    });

    if (!ciclista) {
      throw new AppError(
        'Ciclista não encontrado!\n',
        AppErrorType.RESOURCE_INVALID,
      );
    }

    if (ciclista.status != CiclistaStatus.ATIVADO) {
      throw new AppError(
        'Ciclista não ativado!\n',
        AppErrorType.RESOURCE_INVALID,
      );
    }

    const aluguel = await this.aluguelRepository.findBy({
      ciclista: createAluguelDto.ciclista,
    });

    if (aluguel && !aluguel.horaFim) {
      throw new AppError(
        'Aluguel não permitido!\n',
        AppErrorType.RESOURCE_INVALID,
      );
    }

    const tranca = await this.equipamentoService.getTrancaById(
      createAluguelDto.trancaInicio,
    );

    if (!tranca) {
      throw new AppError('Tranca não existe!\n', AppErrorType.RESOURCE_INVALID);
    }

    if (tranca.status != TrancaStatus.OCUPADA) {
      throw new AppError(
        'Tranca indisponível!\n',
        AppErrorType.RESOURCE_INVALID,
      );
    }

    const bicicleta = await this.equipamentoService.getBicicletaById(
      tranca.bicicleta,
    );

    if (!bicicleta) {
      throw new AppError(
        'Bicicleta não existe!\n',
        AppErrorType.RESOURCE_INVALID,
      );
    }

    if (bicicleta.status != BicicletaStatus.DISPONIVEL) {
      throw new AppError(
        'Bicicleta indisponível!\n',
        AppErrorType.RESOURCE_INVALID,
      );
    }

    const cobranca = await this.externoService.authorizeCobranca({
      ciclista: createAluguelDto.ciclista,
      valor: this.COBRANCA_BASE_VALUE,
    });

    const createdAluguel = await this.aluguelRepository.save({
      ciclista: createAluguelDto.ciclista,
      trancaInicio: createAluguelDto.trancaInicio,
      horaInicio: new Date(),
      bicicleta: bicicleta.id,
      cobranca: cobranca.id,
    });

    await this.equipamentoService.unlockTranca({
      idTranca: tranca.id,
      idBicicleta: bicicleta.id,
    });

    await this.externoService.sendEmail(
      ciclista.email,
      'Vá de Bicicleta - Aluguel realizado',
      'Aluguel realizado com sucesso!',
    );

    return AluguelEntity.toDomain(createdAluguel);
  }

  async returnBicicletaAluguel(
    returnBicicletaAluguelDto: ReturnBicicletaAluguelDto,
  ) {
    const aluguel = await this.aluguelRepository.findBy({
      bicicleta: returnBicicletaAluguelDto.idBicicleta,
      horaFim: null,
      trancaFim: null,
    });

    if (!aluguel) {
      throw new AppError(
        'Aluguel não existe!\n',
        AppErrorType.RESOURCE_INVALID,
      );
    }

    const ciclista = await this.ciclistaRepository.findBy({
      id: aluguel.ciclista,
    });

    if (!ciclista) {
      throw new AppError(
        'Ciclista não encontrado!\n',
        AppErrorType.RESOURCE_INVALID,
      );
    }

    if (ciclista.status != CiclistaStatus.ATIVADO) {
      throw new AppError(
        'Ciclista não ativado!\n',
        AppErrorType.RESOURCE_INVALID,
      );
    }

    const bicicleta = await this.equipamentoService.getBicicletaById(
      returnBicicletaAluguelDto.idBicicleta,
    );

    if (!bicicleta) {
      throw new AppError(
        'Bicicleta não existe!\n',
        AppErrorType.RESOURCE_INVALID,
      );
    }

    if (bicicleta.status != BicicletaStatus.EM_USO) {
      throw new AppError(
        'Bicicleta indisponível!\n',
        AppErrorType.RESOURCE_INVALID,
      );
    }

    const tranca = await this.equipamentoService.getTrancaById(
      returnBicicletaAluguelDto.idTranca,
    );

    if (!tranca) {
      throw new AppError('Tranca não existe!\n', AppErrorType.RESOURCE_INVALID);
    }

    if (tranca.status != TrancaStatus.LIVRE) {
      throw new AppError(
        'Tranca indisponível!\n',
        AppErrorType.RESOURCE_INVALID,
      );
    }

    const horaFim = new Date();
    let tempoAluguel = horaFim.getTime() - aluguel.horaInicio.getTime();
    tempoAluguel = tempoAluguel / (1000 * 60);

    const tempoExcedido = Math.ceil(tempoAluguel / 30);
    const valorRestante =
      (tempoExcedido - 1) * this.COBRANCA_PER_HALF_HOUR_VALUE;

    console.log(tempoAluguel, valorRestante, tempoExcedido);

    if (tempoExcedido > 0) {
      await this.externoService.authorizeCobranca({
        ciclista: aluguel.ciclista,
        valor: valorRestante,
      });
    }

    await this.equipamentoService.lockTranca({
      idTranca: tranca.id,
      idBicicleta: bicicleta.id,
    });

    const returnedAluguel = await this.aluguelRepository.update(aluguel.id, {
      trancaFim: tranca.id,
      horaFim,
    });

    await this.externoService.sendEmail(
      ciclista.email,
      'Vá de Bicicleta - Devolução realizada',
      'Devolução realizada com sucesso!',
    );

    return AluguelEntity.toDomain(returnedAluguel);
  }
}
