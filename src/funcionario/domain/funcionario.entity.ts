import Funcionario, { FuncionarioFuncao } from './funcionario';

export default class FuncionarioEntity {
  id?: number;
  matricula: string;
  nome: string;
  idade: number;
  email: string;
  cpf: string;
  funcao: FuncionarioFuncao;
  senha: string;
  confirmacaoSenha: string;

  static toDomain(funcionarioEntity: FuncionarioEntity) {
    if (!funcionarioEntity) {
      return null;
    }

    const funcionario = new Funcionario();
    funcionario.nome = funcionarioEntity.nome;
    funcionario.email = funcionarioEntity.email;
    funcionario.cpf = funcionarioEntity.cpf;
    funcionario.idade = funcionarioEntity.idade;
    funcionario.funcao = funcionarioEntity.funcao;
    funcionario.matricula = funcionarioEntity.matricula;
    funcionario.senha = funcionarioEntity.senha;
    funcionario.confirmacaoSenha = funcionarioEntity.confirmacaoSenha;

    return funcionario;
  }
}
