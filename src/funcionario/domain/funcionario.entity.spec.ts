import Funcionario, { FuncionarioFuncao } from './funcionario';
import FuncionarioEntity from './funcionario.entity';

describe('FuncionarioEntity', () => {
  it('should map FuncionarioEntity to Funcionario domain object correctly', () => {
    const entity = new FuncionarioEntity();
    entity.id = 1;
    entity.matricula = 'MAT123';
    entity.nome = 'John Doe';
    entity.idade = 30;
    entity.email = 'john.doe@example.com';
    entity.cpf = '123.456.789-00';
    entity.funcao = FuncionarioFuncao.ADMINISTRADOR;
    entity.senha = 'securePassword123';
    entity.confirmacaoSenha = 'securePassword123';

    const domainObject = FuncionarioEntity.toDomain(entity);

    expect(domainObject).toBeInstanceOf(Funcionario);
    expect(domainObject.nome).toBe(entity.nome);
    expect(domainObject.email).toBe(entity.email);
    expect(domainObject.cpf).toBe(entity.cpf);
    expect(domainObject.idade).toBe(entity.idade);
    expect(domainObject.funcao).toBe(entity.funcao);
    expect(domainObject.matricula).toBe(entity.matricula);
    expect(domainObject.senha).toBe(entity.senha);
    expect(domainObject.confirmacaoSenha).toBe(entity.confirmacaoSenha);
  });

  it('should return null when mapping a null entity', () => {
    const domainObject = FuncionarioEntity.toDomain(null);
    expect(domainObject).toBeNull();
  });

  it('should handle partial entities gracefully', () => {
    const entity = new FuncionarioEntity();
    entity.nome = 'Partial Name';

    const domainObject = FuncionarioEntity.toDomain(entity);

    expect(domainObject).toBeInstanceOf(Funcionario);
    expect(domainObject.nome).toBe(entity.nome);
    expect(domainObject.email).toBeUndefined();
    expect(domainObject.cpf).toBeUndefined();
  });
});
