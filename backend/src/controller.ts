import { Request, Response } from 'express'
import { UserModel, IUser } from './UserModel'

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name } = req.body
    const newUser = new UserModel({ email, name })
    await newUser.save()
    res.status(201).json({ message: 'Usuário criado com sucesso', newUser })
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro ao criar usuário', error })
  }
}

// Listar todos os usuários
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error })
  }
}

// Obter um usuário pelo ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await UserModel.findById(req.params.id)
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' })
      return
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error })
  }
}

// Atualizar um usuário pelo ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name } = req.body
    const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(
      req.params.id,
      { email, name },
      { new: true }
    )
    if (!updatedUser) {
      res.status(404).json({ message: 'Usuário não encontrado' })
      return
    }
    res.status(200).json({ message: 'Usuário atualizado com sucesso', updatedUser })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error })
  }
}

// Deletar um usuário pelo ID
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
