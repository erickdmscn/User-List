import { Request, Response } from 'express'
import {UserModel, IUser} from './UserModel'
import validator from 'validator'

export const createUser = async (req: Request, res: Response): Promise<Response> => { // Altere Promise<void> para Promise<Response>
  try {
    const { email, name } = req.body

    // Verifica se o e-mail é válido
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'E-mail inválido.' })
    }

    // Verifica se o e-mail já existe
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já existente.' })
    }

    // Valida o nome
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 3 || trimmedName.length > 50 || !/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      return res.status(400).json({ message: 'Insira um nome válido.' })
    }

    // Cria novo usuário
    const newUser = new UserModel({ email, name })
    await newUser.save()

    return res.status(201).json({ message: 'Usuário criado com sucesso.', newUser })
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ message: 'Erro ao criar usuário.', error })
  }
}

// Lista todos os usuários
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error })
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: IUser | null = await UserModel.findByIdAndDelete(req.params.id)
    if (!deletedUser) {
      res.status(404).json({ message: 'Usuário não encontrado' })
      return
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error })
  }
}