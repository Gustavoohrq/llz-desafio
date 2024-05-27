
# Pessoa MS

Pessoa MS é uma aplicação Spring Boot que gerencia informações de pessoas. Utiliza PostgreSQL como banco de dados.

## Pré-requisitos

- Java 11 ou superior
- Maven 3.6.3 ou superior
- PostgreSQL

## Configuração do Banco de Dados

1. Instale e configure o PostgreSQL.
2. Crie um banco de dados chamado `pessoa`.

```sql
CREATE DATABASE pessoa;
```

3. Atualize as configurações de banco de dados no arquivo `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/pessoa
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

## Construção e Execução

1. Clone o repositório:

```bash
git clone https://github.com/Gustavoohrq/llz-desafio.git
cd backend/pessoa-ms
```

2. Compile e execute a aplicação usando Maven:

```bash
mvn clean install
mvn spring-boot:run
```

A aplicação estará disponível em `http://localhost:8080`.

## API Endpoints
- **POST /api/pessoa**: Criar uma nova pessoa
- **GET /api/pessoa**: Obter todas as pessoas
- **GET /api/pessoa/{id}**: Obter pessoa por ID
- **GET /api/pessoa/boletos/{id}**: Obter boletos por ID da pessoa
- **PUT /api/pessoa/{id}**: Atualizar uma pessoa
- **DELETE /api/pessoa/{id}**: Excluir uma pessoa

## Testes

Para executar os testes, utilize o comando:

```bash
mvn test
```

