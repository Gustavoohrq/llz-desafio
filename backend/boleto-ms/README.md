
# Boleto MS

Boleto MS é uma aplicação Spring Boot que gerencia boletos. Utiliza PostgreSQL como banco de dados.

## Pré-requisitos

- Java 11 ou superior
- Maven 3.6.3 ou superior
- PostgreSQL

## Configuração do Banco de Dados

1. Instale e configure o PostgreSQL.
2. Crie um banco de dados chamado `boleto`.

```sql
CREATE DATABASE boleto;
```

3. Atualize as configurações de banco de dados no arquivo `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/boleto
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
server.port = 8090
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

## Construção e Execução

1. Clone o repositório:

```bash
git clone https://github.com/Gustavoohrq/llz-desafio.git
cd backend/boleto-ms
```

2. Compile e execute a aplicação usando Maven:

```bash
mvn clean install
mvn spring-boot:run
```

A aplicação estará disponível em `http://localhost:8090`.

## API Endpoints

- **POST /api/boleto**: Criar um novo boleto
- **GET /api/boleto**: Buscar todos os boletos
- **GET /api/boleto/{id}**: Obter boleto por ID
- **PUT /api/boleto/pagar/{id}**: Pagar um boleto
- **DELETE /api/boleto/{id}**: Excluir um boleto

## Testes

Para executar os testes, utilize o comando:

```bash
mvn test
```

