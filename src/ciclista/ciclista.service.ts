import { Inject, Injectable } from '@nestjs/common';
import { CiclistaRepository } from './domain/ciclista.repository';
import CreateCiclistaDto from './dto/create-ciclista.dto';
import CiclistaEntity from './domain/ciclista.entity';
import { CiclistaStatus } from './domain/ciclista';
import { AppError, AppErrorType } from 'src/common/domain/app-error';
import { EmailService } from 'src/common/utils/email.service';
import UpdateCiclistaDto from './dto/update-ciclista.dto';

@Injectable()
export class CiclistaService {
  constructor(
    @Inject('CiclistaRepository')
    private readonly ciclistaRepository: CiclistaRepository,
    private readonly emailService: EmailService,
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

    await this.emailService.sendEmail(
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

    return CiclistaEntity.toDomain(updatedCiclista);
  }

  async findBy(idCiclista: number) {
    const ciclistaidCiclistas = await this.ciclistaRepository.findBy({
      id: idCiclista,
    });
    return CiclistaEntity.toDomain(ciclistaidCiclistas);
  }
}
