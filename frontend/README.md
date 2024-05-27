# LLZ Frontend

Esta é uma aplicação front-end construída com React e Vite. Ela consome dados de dois microserviços Spring Boot: Boleto e Pessoa.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior) ou yarn (versão 1.22 ou superior)
- Java 11 ou superior (para os microserviços)
- Maven 3.6.3 ou superior (para os microserviços)
- PostgreSQL (para os microserviços)

## Configuração dos Microserviços

Antes de rodar a aplicação React, é necessário configurar e rodar os microserviços BoletoApp e PessoaApp.


## Configuração e Execução da Aplicação React

1. Clone o repositório da aplicação React:

```bash
git clone https://github.com/Gustavoohrq/llz-desafio.git
cd frontend
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto e adicione as URLs dos microserviços:

```env
VITE_API_BOLETO_URL=http://localhost:8080/api/boleto
VITE_API_PESSOA_URL=http://localhost:8090/api/pessoa
```

4. Execute a aplicação:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Scripts Disponíveis

- `npm run dev` ou `yarn dev`: Inicia a aplicação em modo de desenvolvimento.
- `npm run build` ou `yarn build`: Compila a aplicação para produção.
- `npm run serve` ou `yarn serve`: Serve a aplicação em modo de produção.


