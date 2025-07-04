﻿```text
# Trabalho Prático 1 - Gestão de Alunos IPVC**Autor:** Hélio Sanches Brito (Número: 32444)

##Publicação- **Repositório:** https://github.com/PWEB-2425/trab1-restapi-Helio32444.git
- **Frontend:** https://apis-psi-green.vercel.app/
- **Backend:** https://apis-a0du.onrender.com/api/alunos
- **Documentação Swagger:** https://apis-a0du.onrender.com/api-docs

##Instalação e Execução### Pré-requisitos- Node.js (v18+)
- npm (v9+)
- MongoDB Atlas (conta gratuita)

### Passo a Passo1. Clonar repositório:
```bash
git clone https://github.com/PWEB-2425/trab1-restapi-Helio32444.git
```

1. Configurar backend:

bash

```text
cd backend
npm install
npm install express mongoose cors dotenv
```

1. Criar ficheiro **`.env`** com:
env
```text
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<database>
PORT=3001
```

1. Iniciar servidor backend:

bash

```text
node server.js
```

1. Aceder frontend:

bash



```
cd ../frontend
# Abrir index.html no navegador
```

### **Executar API simulada (JSON-Server)**

bash



```
cd mock-server
npm install
npm start  # Acessível em http://localhost:3000
```

## **Base de Dados (MongoDB Atlas)**

### **Modelo `Aluno`**

javascript



```
{
  nome: String,        // Nome do aluno
  apelido: String,     // Apelido do aluno
  curso: String,       // Nome do curso
  anoCurricular: String // Ano curricular
}
```

### **Modelo `Curso`**

javascript



```
{
  nomeDoCurso: String  // Nome do curso
}
```

## **Endpoints da API (Node.js + Express)**

### **Rotas de Alunos (`/api/alunos`)**

| **Método** | **Endpoint** | **Descrição** | **Códigos de Estado** |
| --- | --- | --- | --- |
| GET | /api/alunos | Listar todos os alunos | 200, 500 |
| GET | /api/alunos/:id | Obter aluno por ID | 200, 400, 404 |
| POST | /api/alunos | Criar novo aluno | 201, 400 |
| PUT | /api/alunos/:id | Atualizar aluno | 200, 400, 404 |
| DELETE | /api/alunos/:id | Remover aluno | 200, 400, 404 |

### **Rotas de Cursos (`/api/cursos`)**

| **Método** | **Endpoint** | **Descrição** | **Códigos de Estado** |
| --- | --- | --- | --- |
| GET | /api/cursos | Listar todos os cursos | 200, 500 |
| POST | /api/cursos | Criar novo curso | 201, 400 |

### **Documentação Swagger**

- Acessível em **`/api-docs`**
- Documentação completa com:
    - Descrição de todos os endpoints
    - Schemas de Aluno e Curso
    - Exemplos de pedido/resposta
    - Possibilidade de testar endpoints diretamente na UI

## **🖥️ Frontend (Single Page Application)**

- **Tecnologias:** HTML, CSS, JavaScript
- **Bibliotecas:**
    - Bootstrap 5 para UI
    - SweetAlert2 para modais interativos
- **Funcionalidades:**
    - Listagem completa de alunos
    - Adição de novos alunos via modal
    - Edição de alunos existentes
    - Remoção com confirmação
    - Atualização automática da tabela

**Estrutura do Frontend:**

- **`index.html`**: Estrutura principal da página
- **`style.css`**: Estilos personalizados
- **`script.js`**: Lógica da aplicação (consumo da API)

**Funções principais em `script.js`:**

javascript



```
const APIURL = "https://apis-a0du.onrender.com/api/alunos";

// Funções principais:
mostraNomes()       // Buscar e mostrar alunos
showUserCreateBox() // Modal para criar aluno
addAluno()          // POST para criar aluno
deleteAluno()       // DELETE para remover aluno
showUserEditBox()   // Modal para editar aluno
updateAluno()       // PUT para atualizar aluno
```

## **Estrutura do Projeto**

```
projeto-raiz/
├── backend/               # API Node.js + Express
│   ├── server.js          # Configuração do servidor
│   ├── docs/
│   │   └── swagger.js     # Configuração do Swagger
│   ├── models/            # Modelos Mongoose
│   │   ├── Aluno.js       # Schema de Aluno
│   │   └── Curso.js       # Schema de Curso
│   ├── routes/            # Controladores de rotas
│   │   ├── alunos.js      # Rotas CRUD para alunos
│   │   └── cursos.js      # Rotas para cursos
│   └── .env               # Variáveis de ambiente
├── frontend/              # Interface web
│   ├── index.html         # Página principal
│   ├── style.css          # Estilos CSS
│   └── script.js          # Lógica da aplicação
├── mock-data/           # JSON-Server
│   ├── db.json            # Dados iniciais
│   └── package.json       # Configuração
├── tests/                 # Coleção Postman
└── README.md              # Documentação
```

## **Dependências Principais**

| **Módulo** | **Versão** | **Utilização** |
| --- | --- | --- |
| express | ^4.18 | Framework web |
| mongoose | ^7.0 | ODM para MongoDB |
| cors | ^2.8.5 | Middleware CORS |
| swagger-jsdoc | ^6.2.8 | Geração da documentação |
| swagger-ui-express | ^5.0.0 | UI da documentação |
| json-server | ^0.17 | API simulada (mock-server) |

## **Bónus Implementados**

- **Documentação Swagger**: Completa e interativa
- **Arquitetura MVC**: Models + Routes
- **Validação de Dados**: No frontend e backend
- **Tratamento de Erros**: Respostas adequadas para diferentes cenários
- **Implementação em Produção**: Backend no Render

## **Testes**

- Coleção Postman disponível em **`/tests/`** com:
    - Testes para todas operações CRUD
    - Validação de códigos de estado
    - Verificação de estruturas de resposta

## **Conclusão**

Este projeto implementa uma solução completa para gestão de alunos, com:

- Backend robusto em Node.js + Express + MongoDB
- Frontend intuitivo com operações CRUD
- Documentação API com Swagger
- Testes via Postman
- Implementação em produção
