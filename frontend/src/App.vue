<template>
  <div class="container">
    <h1>Cadastro de Usuários</h1>

    <form @submit.prevent="registerUser" class="form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="newUser.email" required class="input" />
      </div>
      <div class="form-group">
        <label for="name">Nome:</label>
        <input type="text" v-model="newUser.name" required class="input" />
      </div>
      <button type="submit" class="button">Cadastrar</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>

    <h2>Usuários Cadastrados</h2>
    <ul class="user-list">
      <li v-for="user in users" :key="user._id" class="user-item">
        <div class="user-info">
          <p>Nome: {{ user.name }}</p>
          <p>E-mail: {{ user.email }}</p>
        </div>
        <button @click="destroyUser(user._id)" class="destroy-button">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import apiClient from 'axios'

interface User {
  _id: string
  email: string
  name: string
}

export default defineComponent({
  name: 'UserComponent',
  setup() {
    const newUser = ref<{ email: string; name: string }>({ email: '', name: '' })
    const users = ref<User[]>([])
    const errorMessage = ref<string | null>(null)

    const fetchUsers = async () => {
      try {
        const response = await apiClient.get<User[]>('/api/users')
        users.value = response.data
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
      }
    }

    const registerUser = async () => {
      try {
        errorMessage.value = null

        await apiClient.post('/api/users', newUser.value)
        newUser.value = { email: '', name: '' }
        await fetchUsers()
      } catch (error: any) {
        if (error.response && error.response.data) {
          errorMessage.value = error.response.data.message
        } else {
          errorMessage.value = 'Erro ao criar usuário. Tente novamente.'
        }
      }
    }

    const destroyUser = async (userId: string) => {
      try {
        await apiClient.delete(`/api/users/${userId}`)
        await fetchUsers()
      } catch (error) {
        console.error('Erro ao deletar usuário:', error)
      }
    }

    fetchUsers()

    return {
      newUser,
      users,
      errorMessage,
      registerUser,
      destroyUser
    }
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 600px;
  margin: auto;
}

h1,
h2 {
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.button {
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}

.error-message {
  margin-bottom: -1.9rem; 
  min-height: 0.5rem; 
}


.user-list {
  list-style: none;
  padding: 0;
}

.user-list {
  list-style: none;
  padding: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  margin-bottom: 1.5rem; 
  padding: 1.5rem; 
  border-radius: 0.75rem; 
  font-size: 1.25rem; 
  gap: 3.3rem
}

.user-info {
  display: flex;
  flex-direction: column; 
  gap: 0.5rem; 
}

.user-item p {
  margin: 0;
}

.destroy-button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease; 
}

.destroy-button:hover {
  background-color: rgb(112, 16, 16);
}

.destroy-button:active {
  background-color: #f75252; 
}
</style>
