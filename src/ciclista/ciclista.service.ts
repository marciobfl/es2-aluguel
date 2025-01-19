import { Inject, Injectable } from '@nestjs/common';
import { CiclistaRepository } from './domain/ciclista.repository';
import CreateCiclistaDto from './dto/create-ciclista.dto';
import CiclistaEntity from './domain/ciclista.entity';
import { CiclistaStatus } from './domain/ciclista';
import { AppError, AppErrorType } from 'src/common/domain/app-error';
import UpdateCiclistaDto from './dto/update-ciclista.dto';
import { ExternoService } from 'src/common/external/externo.service';
import { AluguelRepository } from 'src/aluguel/domain/aluguel.repository';
import { EquipamentoService } from 'src/common/external/equipamento.service';

@Injectable()
export class CiclistaService {
  constructor(
    @Inject('CiclistaRepository')
    private readonly ciclistaRepository: CiclistaRepository,
    @Inject('AluguelRepository')
    private readonly aluguelRepository: AluguelRepository,
    @Inject('ExternoService')
    private readonly externoService: ExternoService,
    @Inject('EquipamentoService')
    private readonly equipamentoService: EquipamentoService,
  ) {}

  async createCiclista(createCiclistaDto: CreateCiclistaDto) {
    const { ciclista, meioDePagamento } = createCiclistaDto;
    const ciclistaAlreadyExists = await this.ciclistaRepository.findBy({
      email: ciclista.email,
    });

    if (ciclistaAlreadyExists) {
      throw new AppError(
        'Ciclista já cadastrado!\n',
        AppErrorType.RESOURCE_CONFLICT,
      );
    }

    await this.externoService.sendEmail(
      ciclista.email,
      'Vá de Bicicleta - Confirme seu cadastro',
      'Cadastro realizado com sucesso! Agora, ative seu perfil.',
    );

    const newCiclista = await this.ciclistaRepository.save({
      ...ciclista,
      cartaoDeCredito: meioDePagamento,
      status: CiclistaStatus.CONFIRMACAO_PENDENTE,
    });

    return CiclistaEntity.toDomain(newCiclista);
  }

  async emailExists(email: string) {
    const emailExists = await this.ciclistaRepository.findBy({ email });
    return !!emailExists;
  }

  async activateCiclista(idCiclista: number) {
    const ciclista = await this.ciclistaRepository.findBy({
      id: idCiclista,
    });

    if (!ciclista) {
      throw new AppError(
        'Ciclista não encontrado!\n',
        AppErrorType.RESOURCE_NOT_FOUND,
      );
    }

    if (ciclista.status == CiclistaStatus.ATIVADO) {
      throw new AppError(
        'Ciclista já ativado!\n',
        AppErrorType.RESOURCE_CONFLICT,
      );
    }

    ciclista.status = CiclistaStatus.ATIVADO;
    const activatedCiclista = await this.ciclistaRepository.save(ciclista);

    return CiclistaEntity.toDomain(activatedCiclista);
  }

  async updateCiclista(idCiclista: number, data: UpdateCiclistaDto) {
    const ciclista = await this.ciclistaRepository.findBy({
      id: idCiclista,
    });

    if (!ciclista) {
      throw new AppError(
        'Ciclista não encontrado!\n',
        AppErrorType.RESOURCE_NOT_FOUND,
      );
    }

    if (ciclista.status != CiclistaStatus.ATIVADO) {
      throw new AppError(
        'Ciclista não ativado!\n',
        AppErrorType.RESOURCE_CONFLICT,
      );
    }

    const updatedCiclista = await this.ciclistaRepository.update(
      idCiclista,
      data,
    );

    await this.externoService.sendEmail(
      ciclista.email,
      'Vá de Bicicleta - Cadastro atualizado',
      'Cadastro atualizado com sucesso!',
    );

    return CiclistaEntity.toDomain(updatedCiclista);
  }

  async findBy(idCiclista: number) {
    const ciclistaidCiclistas = await this.ciclistaRepository.findBy({
      id: idCiclista,
    });

    if (!ciclistaidCiclistas) {
      throw new AppError(
        'Ciclista não encontrado!\n',
        AppErrorType.RESOURCE_NOT_FOUND,
      );
    }

    return CiclistaEntity.toDomain(ciclistaidCiclistas);
  }

  async allowAluguel(idCiclista: number) {
    const ciclista = await this.ciclistaRepository.findBy({ id: idCiclista });

    if (!ciclista) {
      throw new AppError(
        'Ciclista não encontrado!\n',
        AppErrorType.RESOURCE_NOT_FOUND,
      );
    }

    if (ciclista.status != CiclistaStatus.ATIVADO) {
      throw new AppError(
        'Ciclista não ativado!\n',
        AppErrorType.RESOURCE_CONFLICT,
      );
    }

    const aluguel = await this.aluguelRepository.findBy({
      ciclista: idCiclista,
    });

    if (aluguel && aluguel.trancaFim == 0 && !aluguel.horaFim) {
      return false;
    }

    return true;
  }

  async rentedBicicleta(idCiclista: number) {
    const ciclista = await this.ciclistaRepository.findBy({ id: idCiclista });

    if (!ciclista) {
      throw new AppError(
        'Ciclista não encontrado!\n',
        AppErrorType.RESOURCE_NOT_FOUND,
      );
    }

    if (ciclista.status != CiclistaStatus.ATIVADO) {
      throw new AppError(
        'Ciclista não ativado!\n',
        AppErrorType.RESOURCE_CONFLICT,
      );
    }

    const aluguel = await this.aluguelRepository.findBy({
      ciclista: idCiclista,
    });

    if (!aluguel) {
      return {};
    }

    return this.equipamentoService.getBicicletaById(aluguel.bicicleta);
  }
}
