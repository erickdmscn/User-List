import { Router } from 'express'
import {
  createUser,
  getUsers,
  deleteUser
} from './controller'

const router = Router()

router.post('/', createUser)

router.get('/', getUsers)

router.delete('/:id', deleteUser)

export default router