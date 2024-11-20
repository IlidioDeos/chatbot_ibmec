# E-Commerce Platform

Uma plataforma de e-commerce completa com sistema de gerenciamento de produtos, controle de saldo de clientes e dashboard administrativo.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- Swagger UI para documentação da API

### Frontend
- React
- TypeScript
- Recharts para visualização de dados
- Docker para containerização

## 💻 Pré-requisitos

Antes de começar, verifique se você tem os seguintes requisitos instalados:

- Docker
- Docker Compose
- Git

## 🎲 Rodando o Projeto

```bash
# Clone este repositório
$ git clone <url-do-seu-repositorio>

# Acesse a pasta do projeto
$ cd project

# Execute os containers com Docker Compose
$ docker compose up -d

# O servidor iniciará na porta:3000 - acesse http://localhost:3000
# O frontend iniciará na porta:5173 - acesse http://localhost:5173
```

## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger UI.

- URL do Swagger: http://localhost:3000/api-docs

### Principais Endpoints

#### Produtos
- GET /api/products - Lista todos os produtos
- GET /api/products/:id - Obtém detalhes de um produto específico

#### Clientes
- GET /api/customers - Lista todos os clientes
- GET /api/customers/:id - Obtém detalhes de um cliente específico
- GET /api/customers/:id/balance - Obtém o saldo de um cliente

#### Compras
- POST /api/purchases - Realiza uma nova compra
- GET /api/purchases/report - Obtém relatório de vendas (requer autenticação de admin)

## 🔐 Contas para Teste

### Cliente
- Email: cliente@example.com
- Nome: Cliente Teste
- Saldo inicial: R$ 10.000,00

### Administrador
- Email: admin@example.com
- Nome: Administrador

## 📊 Funcionalidades

- ✅ Catálogo de produtos
- ✅ Sistema de autenticação
- ✅ Controle de saldo de clientes
- ✅ Realização de compras
- ✅ Dashboard administrativo com:
  - Relatórios de vendas
  - Gráficos de desempenho
  - Estatísticas de produtos

## 🗂️ Estrutura do Projeto

```
project/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── App.tsx       # Componente principal
│   │   └── ...
│   └── package.json
├── server/                # Backend Node.js
│   ├── src/
│   │   ├── controllers/  # Controladores da API
│   │   ├── models/      # Modelos Sequelize
│   │   ├── routes/     # Rotas da API
│   │   └── ...
│   └── package.json
└── docker-compose.yml    # Configuração Docker
```

## 🔧 Configuração do Ambiente de Desenvolvimento

O projeto utiliza variáveis de ambiente para configuração. Crie um arquivo `.env` na raiz do projeto server com as seguintes variáveis:

```env
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=ecommerce
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
