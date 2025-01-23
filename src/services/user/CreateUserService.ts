import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UserRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isGestao: boolean; 
}

class CreateUserService {
  async execute({ name, email, password, confirmPassword, isGestao }: UserRequest) {
    if (!name) {
      throw new Error('Preencha todos oc campos para prosseguir com o cadastro!');
    }

    if (!name || name.trim().split(' ').length < 2) {
      throw new Error('Preencha com nome e sobrenome.');
    }

    email = email.toLowerCase();

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !EMAIL_REGEX.test(email)) {
      throw new Error('Formato de e-mail inválido.');
    }

    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    if (!password || !PASSWORD_REGEX.test(password)) {
      throw new Error(
        'Senha inválida. A senha deve conter entre 8 e 12 caracteres, incluindo ao menos uma letra maiúscula, ao menos um número e ao menos um caractere especial.'
      );
    }

    if (password !== confirmPassword) {
      throw new Error('As senhas não coincidem.');
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (userAlreadyExists) {
      throw new Error('E-mail já cadastrado.');
    }

    const passwordHash = await hash(password, 8);
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        isGestao, 
      },
      select: {
        id: true,
        name: true,
        email: true,
        isGestao: true, 
      },
    });

    return user;
  }
}

export { CreateUserService };
