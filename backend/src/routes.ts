import { Router } from 'express'
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from './controller'

const router = Router()

// Criar um novo usuário
router.post('/', createUser)

// Listar todos os usuários
router.get('/', getUsers)

// Obter um usuário pelo ID
router.get('/:id', getUserById)

// Atualizar um usuário pelo ID
router.put('/:id', updateUser)

// Deletar um usuário pelo ID
router.delete('/:id', deleteUser)

export default router
