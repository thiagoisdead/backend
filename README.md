# Backend - Okay, Where and When?

Este é um backend desenvolvido em **Node.js** com **Express**, responsável por fornecer os endpoints da aplicação. O backend gerencia a autenticação de usuários, comunicação com o banco de dados e outros serviços essenciais para o funcionamento da aplicação frontend.

## Tecnologias Usadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados dos usuários e eventos.
- **Express**: Framework web minimalista para Node.js.
- **dotenv**: Para configurar variáveis de ambiente de maneira segura.
- **JWT (JSON Web Tokens)**: Para autenticação de usuários.
- **bcrypt**: Encriptação das senhas de usuários.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB em Node.js.

## Funcionalidades

- **Autenticação e Autorização**:
  - Endpoint de registro de usuário.
  - Endpoint de login de usuário (retorna um token JWT).
  - Proteção de endpoints com middleware de autenticação.
  
- **Gerenciamento de Usuários**:
  - CRUD (Create, Read, Update, Delete) para usuários.
  
- **Banco de Dados**:
  - MongoDB com Mongoose para gerenciar os dados dos usuários.

- **Validação de Dados**:
  - Utilização de bibliotecas para validação de entradas como email e senha.