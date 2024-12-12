import { FuncionarioFuncao } from '../domain/funcionario';
import CreateFuncionarioDto from './create-funcionario.dto';

describe('CreateFuncionarioDto', () => {
  let createFuncionarioDto: CreateFuncionarioDto;

  beforeEach(() => {
    createFuncionarioDto = new CreateFuncionarioDto();
    createFuncionarioDto.nome = 'Carlos Silva';
    createFuncionarioDto.idade = 30;
    createFuncionarioDto.email = 'carlos.silva@example.com';
    createFuncionarioDto.cpf = '123.456.789-00';
    createFuncionarioDto.funcao = FuncionarioFuncao.REPARADOR;
    createFuncionarioDto.senha = 'senhaSegura123';
    createFuncionarioDto.confirmacaoSenha = 'senhaSegura123';
  });

  it('deve criar uma instância válida de CreateFuncionarioDto', () => {
    expect(createFuncionarioDto).toBeDefined();
    expect(createFuncionarioDto.nome).toBe('Carlos Silva');
    expect(createFuncionarioDto.idade).toBe(30);
    expect(createFuncionarioDto.email).toBe('carlos.silva@example.com');
    expect(createFuncionarioDto.cpf).toBe('123.456.789-00');
    expect(createFuncionarioDto.funcao).toBe(FuncionarioFuncao.REPARADOR);
    expect(createFuncionarioDto.senha).toBe('senhaSegura123');
    expect(createFuncionarioDto.confirmacaoSenha).toBe('senhaSegura123');
  });

  it('deve permitir alterar os valores das propriedades', () => {
    createFuncionarioDto.nome = 'Ana Oliveira';
    createFuncionarioDto.idade = 28;
    createFuncionarioDto.email = 'ana.oliveira@example.com';
    createFuncionarioDto.cpf = '987.654.321-00';
    createFuncionarioDto.funcao = FuncionarioFuncao.ADMINISTRADOR;
    createFuncionarioDto.senha = 'novaSenha456';
    createFuncionarioDto.confirmacaoSenha = 'novaSenha456';

    expect(createFuncionarioDto.nome).toBe('Ana Oliveira');
    expect(createFuncionarioDto.idade).toBe(28);
    expect(createFuncionarioDto.email).toBe('ana.oliveira@example.com');
    expect(createFuncionarioDto.cpf).toBe('987.654.321-00');
    expect(createFuncionarioDto.funcao).toBe(FuncionarioFuncao.ADMINISTRADOR);
    expect(createFuncionarioDto.senha).toBe('novaSenha456');
    expect(createFuncionarioDto.confirmacaoSenha).toBe('novaSenha456');
  });

  it('deve falhar se senha e confirmacaoSenha forem diferentes', () => {
    createFuncionarioDto.senha = 'senha1';
    createFuncionarioDto.confirmacaoSenha = 'senha2';

    expect(createFuncionarioDto.senha).not.toBe(
      createFuncionarioDto.confirmacaoSenha,
    );
  });
});
