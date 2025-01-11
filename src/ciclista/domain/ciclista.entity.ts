import CartaoDeCreditoEntity from 'src/cartao-de-credito/domain/cartao-de-credito.entity';
import { Ciclista, CiclistaStatus } from 'src/ciclista/domain/ciclista';
import Passaporte from './passaporte';

export default class CiclistaEntity {
  id?: number;
  nome: string;
  nascimento: string;
  cpf: string;
  nacionalidade: string;
  email: string;
  urlFotoDocumento: string;
  senha: string;
  status: CiclistaStatus;
  passaporte: Passaporte;
  cartaoDeCredito: CartaoDeCreditoEntity;

  static toDomain(ciclistaEntity: CiclistaEntity) {
    if (!ciclistaEntity) {
      return null;
    }

    const ciclista = new Ciclista();
    ciclista.id = ciclistaEntity.id;
    ciclista.status = ciclistaEntity.status;
    ciclista.nome = ciclistaEntity.nome;
    ciclista.cpf = ciclistaEntity.cpf;
    ciclista.nacionalidade = ciclistaEntity.nacionalidade;
    ciclista.email = ciclistaEntity.email;
    ciclista.urlFotoDocumento = ciclistaEntity.urlFotoDocumento;
    ciclista.nascimento = ciclistaEntity.nascimento.toString();
<<<<<<< HEAD

=======
>>>>>>> 8c54050d35387acd057fb5c1ee8e0b6f75b1f24a
    if (ciclistaEntity.passaporte) {
      ciclista.passaporte = ciclistaEntity.passaporte;
    }

    return ciclista;
  }
}
