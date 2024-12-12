import { validate } from 'class-validator';
import DeleteFuncionarioDto from './delete-funcionario.dto';

describe('DeleteFuncionarioDto', () => {
  it('should pass validation when id is a number', async () => {
    const dto = new DeleteFuncionarioDto();
    dto.id = 1;

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation when id is not a number', async () => {
    const dto = new DeleteFuncionarioDto();
    dto.id = 'not-a-number' as any;

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('id');
  });

  it('should fail validation when id is undefined', async () => {
    const dto = new DeleteFuncionarioDto();

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('id');
  });
});
