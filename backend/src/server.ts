import express from 'express'
import { v4 as uuid } from 'uuid'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

interface User{
    id: string
    name: string
    email: string
}

const users: User[] = []

app.get('/users', (request, response) => {
    return response.json(['user1', 'user2'])
})

app.put('/users:id', (request, response) => {
    //busca do usuario na base
    const { id } = request.params
    const { name, email } = request.body

    //localiza usuario
    const userIndex = users.findIndex((user) =>  user.id === id )

    if (userIndex < 0) {
        return response.status(404).json({error: 'User not found.'})
    }

    const user = { id, name, email }

    //atualizando usuario
    users[userIndex] = user

    //return atualizado
    return response.json(user)
})

app.post('/users', (request, response) => {
    //recebe dados do novo usuario
    const {name, email} = request.body
    
    //criando novo usuario com id unico
    const user = { id: uuid(), name, email }

    //registra na array
    users.push(user)

    //retorna o usuario
    return response.json(user)
})

app.delete('/users:id', (request, response) => {
    //busca o user
    const { id } = request.params

    const userIndex = users.findIndex((user) =>  user.id === id )

    if (userIndex < 0) {
        return response.status(404).json({error: 'User not found.'})
    }

    //exclui usuario selecionado
    users.splice(userIndex, 1)

    //retorna status de sucesso
    return response.status(204).send()
})

app.listen('3333', () => {
    console.log('teste')
})