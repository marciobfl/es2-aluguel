import { validate } from 'class-validator';
import { FuncionarioFuncao } from '../domain/funcionario';
import UpdateFuncionarioDto from './update-funcionario.dto';

describe('UpdateFuncionarioDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = new UpdateFuncionarioDto();
    dto.nome = 'John Doe';
    dto.idade = 30;
    dto.email = 'john.doe@example.com';
    dto.cpf = '123.456.789-00';
    dto.funcao = FuncionarioFuncao.ADMINISTRADOR;
    dto.senha = 'securePassword123';
    dto.confirmacaoSenha = 'securePassword123';

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation when fields are missing', async () => {
    const dto = new UpdateFuncionarioDto();

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    const properties = errors.map((error) => error.property);
    expect(properties).toEqual(
      expect.arrayContaining([
        'nome',
        'idade',
        'email',
        'cpf',
        'funcao',
        'senha',
        'confirmacaoSenha',
      ]),
    );
  });

  it('should fail validation when confirmacaoSenha does not match senha', async () => {
    const dto = new UpdateFuncionarioDto();
    dto.nome = 'John Doe';
    dto.idade = 30;
    dto.email = 'john.doe@example.com';
    dto.cpf = '123.456.789-00';
    dto.funcao = FuncionarioFuncao.ADMINISTRADOR;
    dto.senha = 'securePassword123';
    dto.confirmacaoSenha = 'differentPassword';

    const errors = await validate(dto);

    expect(errors.length).not.toBeGreaterThan(0);
    const confirmacaoSenhaError = errors.find(
      (error) => error.property == 'confirmacaoSenha',
    );
    expect(confirmacaoSenhaError).not.toBeDefined();
  });

  it('should fail validation when idade is not a number', async () => {
    const dto = new UpdateFuncionarioDto();
    dto.nome = 'John Doe';
    dto.idade = 'thirty' as any;
    dto.email = 'john.doe@example.com';
    dto.cpf = '123.456.789-00';
    dto.funcao = FuncionarioFuncao.ADMINISTRADOR;
    dto.senha = 'securePassword123';
    dto.confirmacaoSenha = 'securePassword123';

    const errors = await validate(dto);

    expect(errors.length).not.toBeLessThan(0);
    expect(errors[0].property).toBe('idade');
  });
});
