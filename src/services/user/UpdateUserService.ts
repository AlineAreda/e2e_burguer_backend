import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UpdateUserRequest {
  userId: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
  isGestao?: boolean; // Novo campo
}

class UpdateUserService {
  async execute({ userId, name, password, confirmPassword, isGestao }: UpdateUserRequest) {
    if (!userId) {
      throw new Error('ID do usuário é obrigatório.');
    }

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    let updatedData: { name?: string; password?: string; isGestao?: boolean } = {};
    if (name) {
      if (name.trim().split(' ').length < 2) {
        throw new Error('Preencha com nome e sobrenome.');
      }
      updatedData.name = name;
    }

    if (password) {
      const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
      if (!PASSWORD_REGEX.test(password)) {
        throw new Error(
          'Senha inválida. A senha deve conter entre 8 e 12 caracteres, incluindo pelo menos uma letra maiúscula, um número e um caractere especial.'
        );
      }

      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem.');
      }

      updatedData.password = await hash(password, 8);
    }

    if (isGestao !== undefined) {
      updatedData.isGestao = isGestao; // Atualiza o campo
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: updatedData,
      select: {
        id: true,
        name: true,
        email: true,
        isGestao: true, // Retorna o campo atualizado
      },
    });

    return updatedUser;
  }
}

export { UpdateUserService };
