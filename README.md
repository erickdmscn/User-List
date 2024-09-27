# 📝 Lista de Usuários

**Sistema FullStack para Gestão de Usuários**, oferecendo funcionalidades para cadastro, visualização e remoção de usuários, com um frontend moderno usando Vue.js e um backend robusto baseado em Express.js, integrado com um banco de dados MongoDB para persistência de dados.

## 🚀 Como Iniciar o Sistema

Siga as instruções abaixo para instalar as dependências e iniciar os servidores:

### 🗄️ Configuração do MongoDB

Para rodar o banco de dados, você precisa ter sua própria instância do MongoDB. A string de conexão deve ser definida na variável de ambiente `CONNECTIONSTRING`. No arquivo `.env`, você pode especificá-la da seguinte forma:

```bash
CONNECTIONSTRING=mongodb://seu-usuario:senha@seu-host/seu-banco
```

### ⚙️ Backend

Acesse a pasta `backend`, instale as dependências e inicie o servidor de desenvolvimento:

```bash
cd backend
npm install
npm run dev
```


### 🖥️ Frontend

Acesse a pasta `frontend`, instale as dependências e inicie o servidor de desenvolvimento:

```bash
cd frontend
npm install
npm run dev
```

## 🛠️ Tecnologias Empregadas
Este projeto foi desenvolvido com as seguintes tecnologias:

#### Vue.js
#### TypeScript
#### Node.js
#### Express.js
#### MongoDB
