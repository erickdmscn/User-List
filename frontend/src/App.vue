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
        <input type="name" v-model="newUser.name" required class="input" />
      </div>
      <button type="submit" class="button">Cadastrar</button>
    </form>

    <h2>Usuários Cadastrados</h2>
    <ul class="user-list">
      <li v-for="user in users" :key="user._id" class="user-item">
        {{ user.email }}
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
  password: string
}

export default defineComponent({
  name: 'UserComponent',
  setup() {
    const newUser = ref<{ email: string; name: string }>({ email: '', name: '' })
    const users = ref<User[]>([])

    const fetchUsers = async () => {
      try {
        const response = await apiClient.get<User[]>('/api/users')
        users.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
      }
    }

    const registerUser = async () => {
      try {
        await apiClient.post('/api/users', newUser.value)
        newUser.value = { email: '', name: '' } 
        await fetchUsers() 
      } catch (error) {
        console.error('Erro ao criar usuário:', error)
      }
    };
    
    fetchUsers()

    return {
      newUser,
      users,
      registerUser
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

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 400px;
}

.user-item {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
}

.user-item:last-child {
  border-bottom: none;
}
</style>
